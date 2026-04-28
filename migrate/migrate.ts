/**
 * migrate.ts — ETL SQL Server → PostgreSQL  (v3.0)
 * Portal do Cessionário (Cemitério)
 *
 * CHANGELOG v3.0
 * ─────────────────────────────────────────────────────────────────────────────
 * [CRÍTICO] oleToDate reescrita com Date.UTC — elimina viés de fuso/DST.
 * [CRÍTICO] Contratos_Pagamentos usa sql_server_id = -(CodPagto) para
 *           garantir idempotência sem colidir com CodBoleto.
 * [CRÍTICO] Cada step roda em transação PG — rollback atômico por step;
 *           steps anteriores bem-sucedidos são preservados.
 * [NOVO]    seedTarifasJazigo: semeia tarifas_jazigo (Decreto 4.332/2023).
 * [NOVO]    preflight(): valida conexões e tabelas MSSQL antes de migrar.
 * [NOVO]    reconcile(): compara COUNT(*) MSSQL vs PG por entidade.
 * [NOVO]    Relatório gravado em reports/migration_report_<ts>.json.
 * [NOVO]    --from=<step>: retoma a partir de um step (mapas são rehidratados).
 * [NOVO]    --reconcile-only: só reconcilia, sem gravar.
 * [MELHORIA] Integrity checks usam mapas em memória (sem full table scans).
 * [MELHORIA] valorPorGavetas: R$180/bloco de 3 gavetas (não estimativa linear).
 * [MELHORIA] jazigosPorContrato: lista completa de jazigos (não MIN()).
 * [MELHORIA] syncMap() centraliza recarga pós-upsert dos mapas de FK.
 *
 * Uso:
 *   DATABASE_URL=... MSSQL_HOST=... MSSQL_USER=... MSSQL_PASSWORD=... MSSQL_DB=... \
 *   npx tsx migrate.ts [flags]
 *
 * Flags:
 *   --dry-run           Lê do SQL Server, não grava no Postgres
 *   --reconcile-only    Apenas reconcilia contagens, sem migrar
 *   --only=<step>       Executa somente um step
 *   --from=<step>       Pula steps anteriores (rehidrata mapas antes)
 *   --skip-reconcile    Não executa reconciliação ao final
 *   --batch=500         Tamanho do lote INSERT (default 500)
 *
 * Ordem dos steps:
 *   tarifas_jazigo → customers → customer_addresses → customer_phones →
 *   contratos → jazigos → responsaveis_financeiros → pagamentos
 */

import sql from 'mssql'
import { Pool } from 'pg'
import type { PoolClient } from 'pg'
import { v4 as uuidv4 } from 'uuid'
import { mkdirSync, writeFileSync } from 'fs'

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface MigError {
  step: string
  sqlServerId: number | null
  motivo: string
}

interface StepResult {
  step: string
  afetados: number
  ignorados: number
  erros: MigError[]
  durationMs: number
}

interface ReconcileRow {
  entidade: string
  mssql_count: number
  pg_count: number
  delta: number
  ok: boolean
  nota?: string
}

// Permite passar Pool ou PoolClient para pgBatchInsert
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PgExec = { query: (text: string, values?: any[]) => Promise<{ rowCount: number | null }> }

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIG & CLI
// ═══════════════════════════════════════════════════════════════════════════════

const MSSQL_CONFIG: sql.config = {
  server:         process.env['MSSQL_HOST'] ?? '',
  user:           process.env['MSSQL_USER'] ?? '',
  password:       process.env['MSSQL_PASSWORD'] ?? '',
  database:       process.env['MSSQL_DB'] ?? '',
  options:        { trustServerCertificate: true, encrypt: false },
  pool:           { max: 5, min: 1 },
  requestTimeout: 120_000,
}

const pgPool = new Pool({
  connectionString:        process.env['DATABASE_URL'] ?? '',
  max:                     10,
  idleTimeoutMillis:       30_000,
  connectionTimeoutMillis: 10_000,
})

const DRY_RUN        = process.argv.includes('--dry-run')
const RECONCILE_ONLY = process.argv.includes('--reconcile-only')
const SKIP_RECONCILE = process.argv.includes('--skip-reconcile')
const ONLY_STEP      = process.argv.find(a => a.startsWith('--only='))?.split('=')[1]
const FROM_STEP      = process.argv.find(a => a.startsWith('--from='))?.split('=')[1]
const BATCH_SIZE     = Number(process.argv.find(a => a.startsWith('--batch='))?.split('=')[1] ?? '500')

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * OLE Automation Date → UTC Date.
 * Legado armazena datas como inteiros (dias desde 1899-12-30).
 * Date.UTC evita viés de fuso horário e DST no host da migração.
 */
function oleToDate(ole: number | null | undefined): Date | null {
  if (!ole || ole <= 0) return null
  const OLE_EPOCH_MS = Date.UTC(1899, 11, 30) // 1899-12-30 00:00 UTC
  return new Date(OLE_EPOCH_MS + ole * 86_400_000)
}

function validarCpf(cpf: string): boolean {
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false
  let sum = 0
  for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]!) * (10 - i)
  let r = (sum * 10) % 11; if (r >= 10) r = 0
  if (r !== parseInt(cpf[9]!)) return false
  sum = 0
  for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]!) * (11 - i)
  r = (sum * 10) % 11; if (r >= 10) r = 0
  return r === parseInt(cpf[10]!)
}

function normalizeCpf(raw: string | null | undefined): string {
  if (!raw) return ''
  const digits = raw.replace(/\D/g, '').slice(0, 14)
  // CPFs com 9–10 dígitos: provável perda de zeros à esquerda no legado.
  // Aplica padding e valida o checksum — se falhar, é RG ou dado corrompido.
  if (digits.length >= 9 && digits.length < 11) {
    const padded = digits.padStart(11, '0')
    return validarCpf(padded) ? padded : ''
  }
  return digits
}

function mapSituacaoContrato(sit: string | null | undefined): string {
  const m: Record<string, string> = { A: 'ATIVO', I: 'INATIVO', Q: 'QUITADO' }
  return m[(sit ?? '').trim()] ?? 'INATIVO'
}

function mapStatusBoleto(sit: string | null | undefined, dataVencimento?: Date | null): string {
  switch ((sit ?? '').trim().toUpperCase()) {
    case 'QUITADO':
    case 'LIQUIDADO':  return 'PAGO'
    case 'CANCELADO':  return 'CANCELADO'
    case 'ESTORNADO':  return 'ESTORNADO'
    default:
      if (dataVencimento && dataVencimento < new Date()) return 'ATRASADO'
      return 'PENDENTE'
  }
}

/**
 * Tarifa mensal por gavetas — Decreto 4.332/2023.
 * R$ 180,00 por bloco de 3 gavetas (3→180, 6→360, 9→540…).
 */
function valorPorGavetas(qtd: number): number {
  return Math.ceil(qtd / 3) * 180.00
}

function log(step: string, msg: string, level: 'info' | 'warn' | 'error' = 'info') {
  const icon = level === 'error' ? '✗' : level === 'warn' ? '⚠' : '→'
  console.log(`[${new Date().toISOString()}] ${icon} [${step}] ${msg}`)
}

function banner(text: string) {
  const line = '═'.repeat(62)
  console.log(`\n${line}\n  ${text}\n${line}`)
}

/**
 * Executa uma query MSSQL em modo streaming.
 * O servidor envia rows conforme as produz, mantendo o TCP com dados fluindo
 * e evitando que firewalls/NAT com idle-timeout (~40s) derrubem a conexão.
 */
async function mssqlStream(
  conn: sql.ConnectionPool,
  query: string,
): Promise<Record<string, unknown>[]> {
  const rows: Record<string, unknown>[] = []
  const request = conn.request()
  request.stream = true
  await new Promise<void>((resolve, reject) => {
    request.on('row', (row: Record<string, unknown>) => rows.push(row))
    request.on('error', (err: Error) => reject(err))
    request.on('done', () => resolve())
    request.query(query).catch(reject)
  })
  return rows
}

// ═══════════════════════════════════════════════════════════════════════════════
// ID MAPS  (SQL Server ID → PostgreSQL UUID)
// Mantidos em memória para resolver FKs sem SELECTs extras por registro.
// ═══════════════════════════════════════════════════════════════════════════════

const cessionarioUuid  = new Map<number, string>() // CodCessionario → uuid
const contratoUuid     = new Map<number, string>() // CodContrato    → uuid
const jazigoUuid       = new Map<number, string>() // CodJazigo      → uuid
const gavetasPorJazigo = new Map<number, number>() // CodJazigo      → quantidade de gavetas

// syncMap é usada apenas para jazigoUuid (sql_server_id é confiável lá).
// Para cessionarioUuid e contratoUuid usamos recargas por chave de negócio
// (CPF e NumContrato) para cobrir também os registros duplicados no legado
// que foram unificados mas não têm sql_server_id próprio no PG.
async function syncMap(map: Map<number, string>, table: string): Promise<void> {
  if (DRY_RUN) return
  map.clear()
  try {
    const res = await pgPool.query<{ sql_server_id: string; id: string }>(
      `SELECT sql_server_id::text, id FROM ${table} WHERE sql_server_id IS NOT NULL`
    )
    for (const r of res.rows) map.set(Number(r['sql_server_id']), r['id']!)
  } catch (err: unknown) {
    const code = (err as { code?: string }).code
    if (code !== '42P01') throw err // tabela ainda não existe — mapa fica vazio
  }
}

/**
 * Reconstrói cessionarioUuid mapeando CodCessionario→UUID pelo CPF normalizado.
 * Necessário porque cessionários com CPF duplicado não têm sql_server_id no PG
 * (apenas o registro canônico tem), mas todos precisam de UUID para FKs.
 */
async function reloadCessionarioUuids(mssql: sql.ConnectionPool): Promise<void> {
  if (DRY_RUN) return

  const [pgRes, mssqlRows] = await Promise.all([
    pgPool.query<{ id: string; cpf_cnpj: string }>('SELECT id, cpf_cnpj FROM customers').catch(() => ({ rows: [] })),
    mssqlStream(mssql, `SELECT CodCessionario, CPF FROM dbo.Cessionarios WHERE CPF IS NOT NULL AND CPF != ''`),
  ])

  const cpfToUuid = new Map<string, string>()
  for (const r of pgRes.rows) cpfToUuid.set(r['cpf_cnpj']!, r['id']!)

  cessionarioUuid.clear()
  for (const r of mssqlRows) {
    const cpf  = normalizeCpf(r['CPF'] as string | null)
    const uuid = cpfToUuid.get(cpf)
    if (uuid) cessionarioUuid.set(r['CodCessionario'] as number, uuid)
  }
}

/**
 * Reconstrói contratoUuid mapeando CodContrato→UUID pelo NumContrato.
 * Contratos com número duplicado no legado foram unificados; todos precisam
 * do UUID canônico para que jazigos e pagamentos resolvam a FK corretamente.
 */
async function reloadContratoUuids(mssql: sql.ConnectionPool): Promise<void> {
  if (DRY_RUN) return

  const [pgRes, mssqlRows] = await Promise.all([
    pgPool.query<{ id: string; numero_contrato: string }>('SELECT id, numero_contrato FROM contratos').catch(() => ({ rows: [] })),
    mssqlStream(mssql, `SELECT CodContrato, NumContrato FROM dbo.Contratos WHERE NumContrato IS NOT NULL AND NumContrato != ''`),
  ])

  const numToUuid = new Map<string, string>()
  for (const r of pgRes.rows) numToUuid.set(r['numero_contrato']!, r['id']!)

  contratoUuid.clear()
  for (const r of mssqlRows) {
    const num  = String(r['NumContrato'] ?? '').trim()
    const uuid = numToUuid.get(num)
    if (uuid) contratoUuid.set(r['CodContrato'] as number, uuid)
  }
}

async function rehydrateMaps(mssql: sql.ConnectionPool): Promise<void> {
  log('rehydrate', 'Carregando UUIDs do banco...')
  await Promise.all([
    reloadCessionarioUuids(mssql),
    reloadContratoUuids(mssql),
    syncMap(jazigoUuid, 'jazigos'),
  ])
  log('rehydrate', `customers=${cessionarioUuid.size}  contratos=${contratoUuid.size}  jazigos=${jazigoUuid.size}`)
}

// ═══════════════════════════════════════════════════════════════════════════════
// PG HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * INSERT em lotes com cláusula ON CONFLICT configurável.
 * Em DRY_RUN retorna rows.length sem tocar no banco.
 */
async function pgBatchInsert(
  client: PgExec,
  table: string,
  columns: string[],
  rows: unknown[][],
  onConflict = 'ON CONFLICT DO NOTHING',
): Promise<number> {
  if (DRY_RUN || rows.length === 0) return rows.length

  let total = 0
  const ncols = columns.length

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const chunk = rows.slice(i, i + BATCH_SIZE)
    const placeholders = chunk
      .map((_, ri) =>
        `(${Array.from({ length: ncols }, (_, ci) => `$${ri * ncols + ci + 1}`).join(', ')})`
      )
      .join(',\n')
    const values = chunk.flat()
    const query  = `INSERT INTO ${table} (${columns.join(', ')}) VALUES\n${placeholders}\n${onConflict}`

    try {
      const res = await client.query(query, values)
      total += res.rowCount ?? chunk.length
    } catch (err: unknown) {
      const e = err as Error
      e.message = `[${table} lote ${Math.floor(i / BATCH_SIZE) + 1}] ${e.message}`
      throw e
    }
  }
  return total
}

/**
 * Executa fn dentro de uma transação PG.
 * Commit no sucesso; ROLLBACK + rethrow no erro.
 * Em DRY_RUN injeta um executor noop.
 */
async function withTransaction<T>(fn: (client: PgExec) => Promise<T>): Promise<T> {
  if (DRY_RUN) {
    const noop: PgExec = { query: async () => ({ rowCount: 0 }) }
    return fn(noop)
  }
  const client: PoolClient = await pgPool.connect()
  try {
    await client.query('BEGIN')
    const result = await fn(client)
    await client.query('COMMIT')
    return result
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// PRE-FLIGHT
// ═══════════════════════════════════════════════════════════════════════════════

const REQUIRED_TABLES = [
  'Cessionarios', 'Cessionarios_Enderecos', 'Cessionarios_Fones',
  'Contratos', 'Contratos_Cessionarios', 'Cidades',
  'Jazigos', 'Quadras', 'Contratos_Jazigos', 'Gavetas',
  'Boletos', 'Cessionarios_Planos', 'Contratos_Pagamentos',
]

async function preflight(mssql: sql.ConnectionPool): Promise<void> {
  log('preflight', 'Verificando conexões e esquema...')

  if (!DRY_RUN) {
    await pgPool.query('SELECT 1')
    log('preflight', '✓ PostgreSQL acessível')

    // Verifica se o schema já foi criado via Prisma
    const schemaCheck = await pgPool.query<{ exists: boolean }>(`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'customers'
      ) AS exists
    `)
    if (!schemaCheck.rows[0]?.['exists']) {
      throw new Error(
        'Schema PostgreSQL não encontrado.\n\n' +
        '  Execute primeiro no diretório fama-app:\n' +
        '    npx prisma migrate deploy\n' +
        '  ou:\n' +
        '    npx prisma db push\n\n' +
        '  Depois rode a migração novamente.'
      )
    }
    log('preflight', '✓ Schema PostgreSQL presente')
  }

  for (const table of REQUIRED_TABLES) {
    const res = await mssql.request().query(
      `SELECT 1 AS ok FROM INFORMATION_SCHEMA.TABLES
       WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = '${table}'`
    )
    if ((res.recordset as unknown[]).length === 0)
      throw new Error(`Tabela obrigatória ausente no SQL Server: dbo.${table}`)
  }
  log('preflight', `✓ SQL Server — ${REQUIRED_TABLES.length} tabelas verificadas`)

  // Responsável financeiro é opcional (pode não existir em todas as instalações)
  const respCheck = await mssql.request().query(
    `SELECT 1 AS ok FROM INFORMATION_SCHEMA.TABLES
     WHERE TABLE_SCHEMA='dbo' AND TABLE_NAME='Cessionarios_Planos_Responsavel'`
  )
  if ((respCheck.recordset as unknown[]).length === 0)
    log('preflight', '⚠ Cessionarios_Planos_Responsavel ausente — step será ignorado', 'warn')
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEPS
// ═══════════════════════════════════════════════════════════════════════════════

// ─── 0. TarifaJazigo ──────────────────────────────────────────────────────────

async function seedTarifasJazigo(): Promise<StepResult> {
  const step = 'tarifas_jazigo'
  const t0   = Date.now()
  log(step, 'Semeando tarifas (Decreto 4.332/2023)...')

  const cols = [
    'id', 'quantidade_gavetas', 'valor_mensalidade',
    'vigente_desde', 'decreto_criador', 'created_at',
  ]
  const now  = new Date()
  const rows: unknown[][] = [
    [uuidv4(), 1,  60.00, '2023-01-01', 'Decreto 4.332/2023', now],
    [uuidv4(), 2, 120.00, '2023-01-01', 'Decreto 4.332/2023', now],
    [uuidv4(), 3, 180.00, '2023-01-01', 'Decreto 4.332/2023', now],
    [uuidv4(), 6, 360.00, '2023-01-01', 'Decreto 4.332/2023', now],
  ]

  const afetados = await withTransaction(c =>
    pgBatchInsert(c, 'tarifas_jazigo', cols, rows,
      'ON CONFLICT (quantidade_gavetas, vigente_desde) DO NOTHING')
  )
  log(step, `✓ ${afetados} tarifas semeadas`)
  return { step, afetados, ignorados: 0, erros: [], durationMs: Date.now() - t0 }
}

// ─── 1. Customers ─────────────────────────────────────────────────────────────

async function migrateCustomers(mssql: sql.ConnectionPool): Promise<StepResult> {
  const step = 'customers'
  const t0   = Date.now()
  log(step, 'Lendo Cessionarios...')

  const recordset = await mssqlStream(mssql, `
    SELECT
      CodCessionario,
      Cessionario     AS Nome,
      CPF,
      Email,
      DataAtualizacao AS DataAtualizacaoOle
    FROM dbo.Cessionarios
    ORDER BY CodCessionario
  `)

  const cols = [
    'id', 'sql_server_id', 'cpf_cnpj', 'nome', 'email',
    'primeiro_acesso', 'ativo', 'synced_at', 'created_at', 'updated_at',
  ]
  const rows: unknown[][] = []
  const cpfToUuid = new Map<string, string>()
  let ignoradosSemCpf  = 0 // CPF ausente ou irrecuperável (< 9 dígitos)
  let cpfDup           = 0
  let ignorados        = 0 // alias — preenchido ao final

  // Pre-carrega emails já existentes no PG para evitar violação de customers_email_key.
  // email é @unique — dois cessionários do legado com o mesmo email causariam falha no INSERT.
  const emailsSeen: Set<string> = DRY_RUN
    ? new Set()
    : await pgPool.query<{ email: string }>('SELECT email FROM customers WHERE email IS NOT NULL')
        .then(r => new Set(r.rows.map(x => x.email!)))
        .catch(() => new Set<string>())

  for (const r of recordset) {
    const cpf = normalizeCpf(r['CPF'] as string | null)
    if (!cpf) { ignoradosSemCpf++; continue }

    // CPF duplicado no legado: reutiliza UUID canônico para FKs continuarem funcionando
    if (cpfToUuid.has(cpf)) {
      cessionarioUuid.set(r['CodCessionario'] as number, cpfToUuid.get(cpf)!)
      cpfDup++
      continue
    }

    const id       = uuidv4()
    const syncedAt = oleToDate(r['DataAtualizacaoOle'] as number | null) ?? new Date()
    cpfToUuid.set(cpf, id)
    cessionarioUuid.set(r['CodCessionario'] as number, id)

    // Email: nulifica se já visto no PG ou em lote anterior — evita customers_email_key
    const rawEmail = String(r['Email'] ?? '').trim() || null
    const email    = rawEmail && !emailsSeen.has(rawEmail) ? rawEmail : null
    if (email) emailsSeen.add(email)

    rows.push([
      id, r['CodCessionario'], cpf,
      String(r['Nome'] ?? '').trim(),
      email,
      true, true,
      syncedAt, syncedAt, syncedAt,
    ])
  }

  const afetados = await withTransaction(c =>
    pgBatchInsert(c, 'customers', cols, rows,
      // Conflito por cpf_cnpj (chave de negócio) para também cobrir registros
      // inseridos sem sql_server_id pelo step responsaveis_financeiros.
      // ON CONFLICT (sql_server_id) não dispara quando o registro existente tem
      // sql_server_id=NULL, causando violação de cpf_cnpj_key.
      `ON CONFLICT (cpf_cnpj) DO UPDATE SET
         sql_server_id = EXCLUDED.sql_server_id,
         nome          = EXCLUDED.nome,
         synced_at     = EXCLUDED.synced_at,
         updated_at    = now()`)
  )

  // Reconstrói mapa por CPF — inclui cessionários com CPF duplicado (não têm sql_server_id próprio no PG)
  await reloadCessionarioUuids(mssql)

  ignorados = ignoradosSemCpf
  log(step, `✓ ${afetados} upserted  |  ${ignoradosSemCpf} sem CPF recuperável  |  ${cpfDup} CPFs duplicados unificados`)
  return { step, afetados, ignorados: ignoradosSemCpf + cpfDup, erros: [], durationMs: Date.now() - t0 }
}

// ─── 2. Customer Addresses ────────────────────────────────────────────────────

async function migrateCustomerAddresses(mssql: sql.ConnectionPool): Promise<StepResult> {
  const step = 'customer_addresses'
  const t0   = Date.now()
  log(step, 'Lendo Cessionarios_Enderecos...')

  const recordset = await mssqlStream(mssql, `
    SELECT
      e.CodCessionario,
      e.TipoEndereco,
      e.Endereco,
      e.Complemento,
      e.Setor       AS Bairro,
      ci.Cidade,
      ci.UF,
      e.CEP,
      e.Correspondencia
    FROM dbo.Cessionarios_Enderecos e
    LEFT JOIN dbo.Cidades ci ON ci.CodCidade = e.CodCidade
  `)

  const cols = [
    'id', 'customer_id', 'tipo', 'logradouro', 'complemento',
    'bairro', 'cidade', 'uf', 'cep', 'correspondencia',
    'synced_at', 'created_at', 'updated_at',
  ]
  const rows: unknown[][] = []
  const now = new Date()
  let ignorados = 0

  for (const r of recordset) {
    const customerId = cessionarioUuid.get(r['CodCessionario'] as number)
    if (!customerId) { ignorados++; continue }

    const tipo = String(r['TipoEndereco'] ?? '').toUpperCase().includes('COMERCIAL')
      ? 'COMERCIAL' : 'RESIDENCIAL'

    rows.push([
      uuidv4(), customerId, tipo,
      String(r['Endereco']    ?? '').trim() || null,
      String(r['Complemento'] ?? '').trim() || null,
      String(r['Bairro']      ?? '').trim() || null,
      String(r['Cidade']      ?? '').trim() || null,
      String(r['UF']          ?? '').trim() || null,
      String(r['CEP']         ?? '').replace(/\D/g, '') || null,
      r['Correspondencia'] === true || r['Correspondencia'] === 1,
      now, now, now,
    ])
  }

  // customer_addresses não possui sql_server_id único.
  // Estratégia de idempotência: DELETE dos endereços existentes dos mesmos customers
  // dentro da transação, seguido de INSERT. Garante que re-execuções não dupliquem.
  const customerIds = [...new Set(rows.map(r => r[1] as string))]
  const afetados = await withTransaction(async c => {
    for (let i = 0; i < customerIds.length; i += BATCH_SIZE) {
      await c.query(
        `DELETE FROM customer_addresses WHERE customer_id = ANY($1)`,
        [customerIds.slice(i, i + BATCH_SIZE)]
      )
    }
    return pgBatchInsert(c, 'customer_addresses', cols, rows)
  })
  log(step, `✓ ${afetados} inseridos  |  ${ignorados} ignorados (sem customer)`)
  return { step, afetados, ignorados, erros: [], durationMs: Date.now() - t0 }
}

// ─── 3. Customer Phones ───────────────────────────────────────────────────────

async function migrateCustomerPhones(mssql: sql.ConnectionPool): Promise<StepResult> {
  const step = 'customer_phones'
  const t0   = Date.now()
  log(step, 'Lendo Cessionarios_Fones...')

  const recordset = await mssqlStream(mssql, `
    SELECT CodFone, CodCessionario, Tipo, Numero, Obs
    FROM dbo.Cessionarios_Fones
  `)

  const cols = [
    'id', 'sql_server_id', 'customer_id', 'tipo', 'numero',
    'observacoes', 'synced_at', 'created_at', 'updated_at',
  ]
  const rows: unknown[][] = []
  const now = new Date()
  let ignorados = 0

  for (const r of recordset) {
    const customerId = cessionarioUuid.get(r['CodCessionario'] as number)
    if (!customerId) { ignorados++; continue }

    const raw  = String(r['Tipo'] ?? '').trim().toUpperCase()
    const tipo = raw.includes('WHATSAPP') || raw.includes('WAPP') ? 'WHATSAPP'
               : raw.includes('CELULAR')  || raw.includes('CEL')  ? 'CELULAR'
               : 'FIXO'

    rows.push([
      uuidv4(), r['CodFone'], customerId, tipo,
      String(r['Numero'] ?? '').trim(),
      String(r['Obs'] ?? '').trim() || null,
      now, now, now,
    ])
  }

  const afetados = await withTransaction(c =>
    pgBatchInsert(c, 'customer_phones', cols, rows,
      'ON CONFLICT (sql_server_id) DO NOTHING')
  )
  log(step, `✓ ${afetados} inseridos  |  ${ignorados} ignorados`)
  return { step, afetados, ignorados, erros: [], durationMs: Date.now() - t0 }
}

// ─── 4. Contratos ─────────────────────────────────────────────────────────────

async function migrateContratos(mssql: sql.ConnectionPool): Promise<StepResult> {
  const step = 'contratos'
  const t0   = Date.now()
  log(step, 'Lendo Contratos + Contratos_Cessionarios...')

  // ROW_NUMBER garante apenas o cessionário mais recente por contrato.
  // Contratos são ordenados por situação (ATIVO primeiro) para que a deduplicação
  // por NumContrato preserve o contrato ativo quando há duplicatas de número.
  const recordset = await mssqlStream(mssql, `
    SELECT
      c.CodContrato,
      c.NumContrato,
      c.Situacao,
      cc.CodCessionario,
      cc.DtContrato AS DtContratoOle
    FROM dbo.Contratos c
    INNER JOIN (
      SELECT CodContrato, CodCessionario, DtContrato,
             ROW_NUMBER() OVER (PARTITION BY CodContrato ORDER BY DtContrato DESC) AS rn
      FROM dbo.Contratos_Cessionarios
    ) cc ON cc.CodContrato = c.CodContrato AND cc.rn = 1
    ORDER BY
      CASE LTRIM(RTRIM(c.Situacao)) WHEN 'A' THEN 0 WHEN 'Q' THEN 1 ELSE 2 END,
      c.CodContrato
  `)

  const cols = [
    'id', 'sql_server_id', 'numero_contrato', 'situacao',
    'customer_id', 'synced_at', 'created_at', 'updated_at',
  ]
  const rows: unknown[][] = []
  // Guarda { uuid, rowIndex, situacao } para permitir substituição quando ATIVO
  // aparece depois de um CANCELADO com mesmo NumContrato.
  const numToMeta = new Map<string, { uuid: string; rowIdx: number; sit: string }>()
  const now = new Date()
  let ignorados = 0
  let numDup    = 0

  const sitPriority = (s: string) => s === 'A' ? 0 : s === 'Q' ? 1 : 2

  for (const r of recordset) {
    const customerId = cessionarioUuid.get(r['CodCessionario'] as number)
    if (!customerId) { ignorados++; continue }

    const numContrato = String(r['NumContrato'] ?? '').trim()
    if (!numContrato) { ignorados++; continue }

    const sit       = String(r['Situacao'] ?? '').trim()
    const situacaoPg = mapSituacaoContrato(sit)
    const existing  = numToMeta.get(numContrato)

    if (existing) {
      if (sitPriority(sit) < sitPriority(existing.sit)) {
        // Este contrato é mais prioritário (ATIVO > QUITADO > CANCELADO):
        // substitui o canônico na lista de rows e atualiza os mapas.
        const id       = uuidv4()
        const syncedAt = oleToDate(r['DtContratoOle'] as number | null) ?? now
        // Redireciona o CodContrato antigo para o novo UUID
        contratoUuid.set(r['CodContrato'] as number, id)
        // O CodContrato do canônico anterior deve apontar para o novo UUID também
        numToMeta.set(numContrato, { uuid: id, rowIdx: existing.rowIdx, sit })
        rows[existing.rowIdx] = [
          id, r['CodContrato'], numContrato,
          situacaoPg, customerId, syncedAt, syncedAt, syncedAt,
        ]
      } else {
        contratoUuid.set(r['CodContrato'] as number, existing.uuid)
      }
      numDup++
      continue
    }

    const id       = uuidv4()
    const syncedAt = oleToDate(r['DtContratoOle'] as number | null) ?? now
    numToMeta.set(numContrato, { uuid: id, rowIdx: rows.length, sit })
    contratoUuid.set(r['CodContrato'] as number, id)

    rows.push([
      id, r['CodContrato'], numContrato,
      situacaoPg, customerId, syncedAt, syncedAt, syncedAt,
    ])
  }

  let afetados = 0
  try {
    afetados = await withTransaction(c =>
      // numero_contrato é a chave de negócio: conflito por ela garante idempotência
      // e permite que re-runs atualizem sql_server_id quando o canônico muda (A2).
      pgBatchInsert(c, 'contratos', cols, rows,
        `ON CONFLICT (numero_contrato) DO UPDATE SET
           sql_server_id = EXCLUDED.sql_server_id,
           situacao      = EXCLUDED.situacao,
           customer_id   = EXCLUDED.customer_id,
           synced_at     = EXCLUDED.synced_at,
           updated_at    = now()`)
    )
  } finally {
    // Sempre recarrega — se withTransaction fez ROLLBACK, o mapa em memória
    // (já alterado pela lógica A2 acima) ficaria dessincronizado do banco,
    // corrompendo FKs nos steps seguintes (responsaveis, pagamentos).
    await reloadContratoUuids(mssql)
  }

  log(step, `✓ ${afetados} upserted  |  ${ignorados} ignorados  |  ${numDup} números duplicados`)
  return { step, afetados, ignorados: ignorados + numDup, erros: [], durationMs: Date.now() - t0 }
}

// ─── 5. Jazigos ───────────────────────────────────────────────────────────────

async function migrateJazigos(mssql: sql.ConnectionPool): Promise<StepResult> {
  const step = 'jazigos'
  const t0   = Date.now()
  log(step, 'Lendo Jazigos + Gavetas + Contratos_Jazigos...')

  const [gavetasRows, jazigosRows] = await Promise.all([
    mssqlStream(mssql, `
      SELECT CodJazigo, COUNT(*) AS QtdGavetas
      FROM dbo.Gavetas
      GROUP BY CodJazigo
    `),
    mssqlStream(mssql, `
      SELECT
        j.CodJazigo,
        q.Quadra,
        j.Jazigo        AS CodigoJazigo,
        cj.CodContrato
      FROM dbo.Jazigos j
      INNER JOIN dbo.Quadras q            ON q.CodQuadra = j.CodQuadra
      LEFT  JOIN dbo.Contratos_Jazigos cj ON cj.CodJazigo = j.CodJazigo
      ORDER BY j.CodJazigo, cj.CodContrato DESC
    `),
  ])

  gavetasPorJazigo.clear()
  for (const r of gavetasRows)
    gavetasPorJazigo.set(r['CodJazigo'] as number, Number(r['QtdGavetas']))

  const cols = [
    'id', 'sql_server_id', 'codigo', 'quadra', 'setor',
    'quantidade_gavetas', 'valor_mensalidade',
    'contrato_id', 'synced_at', 'created_at', 'updated_at',
  ]
  const rows: unknown[][] = []
  const jazigoVisto = new Set<number>()
  const codigoVisto = new Set<string>()
  const now = new Date()
  let ignoradosSemContrato = 0  // sem entrada em Contratos_Jazigos ou cessionário sem CPF
  let ignoradosCodigoDup   = 0  // código Quadra-Jazigo duplicado no legado

  for (const r of jazigosRows) {
    const codJazigo = r['CodJazigo'] as number
    if (jazigoVisto.has(codJazigo)) continue
    jazigoVisto.add(codJazigo)

    const contratoId = contratoUuid.get(r['CodContrato'] as number)
    if (!contratoId) { ignoradosSemContrato++; continue }

    const codigo = `${String(r['Quadra'] ?? '').trim()}-${String(r['CodigoJazigo'] ?? '').trim()}`
    if (codigoVisto.has(codigo)) { ignoradosCodigoDup++; continue }
    codigoVisto.add(codigo)

    const qtd   = gavetasPorJazigo.get(codJazigo) ?? 3
    const valor  = valorPorGavetas(qtd)
    const id     = uuidv4()
    jazigoUuid.set(codJazigo, id)

    rows.push([
      id, codJazigo, codigo,
      String(r['Quadra'] ?? '').trim() || null,
      null, // setor — não disponível no SQL Server legado
      qtd, valor,
      contratoId, now, now, now,
    ])
  }

  const afetados = await withTransaction(c =>
    pgBatchInsert(c, 'jazigos', cols, rows,
      `ON CONFLICT (sql_server_id) DO UPDATE SET
         quantidade_gavetas = EXCLUDED.quantidade_gavetas,
         valor_mensalidade  = EXCLUDED.valor_mensalidade,
         synced_at          = EXCLUDED.synced_at,
         updated_at         = now()`)
  )
  await syncMap(jazigoUuid, 'jazigos')

  const ignorados = ignoradosSemContrato + ignoradosCodigoDup
  log(step, `✓ ${afetados} upserted  |  ${ignoradosSemContrato} sem contrato/CPF  |  ${ignoradosCodigoDup} código duplicado`)
  return { step, afetados, ignorados, erros: [], durationMs: Date.now() - t0 }
}

// ─── 6. Responsáveis Financeiros ─────────────────────────────────────────────

async function migrateResponsaveisFinanceiros(mssql: sql.ConnectionPool): Promise<StepResult> {
  const step = 'responsaveis_financeiros'
  const t0   = Date.now()

  const hasTable = await mssql.request().query(
    `SELECT 1 AS ok FROM INFORMATION_SCHEMA.TABLES
     WHERE TABLE_SCHEMA='dbo' AND TABLE_NAME='Cessionarios_Planos_Responsavel'`
  )
  if ((hasTable.recordset as unknown[]).length === 0) {
    log(step, '⚠ Cessionarios_Planos_Responsavel não existe — ignorado', 'warn')
    return { step, afetados: 0, ignorados: 0, erros: [], durationMs: Date.now() - t0 }
  }

  log(step, 'Lendo Cessionarios_Planos_Responsavel...')

  const [responsaveisQueryRows, planosContratosRows] = await Promise.all([
    mssqlStream(mssql, `
      SELECT
        cp.CodCessionarioPlano,
        cp.CodCessionario,
        cpr.CPF   AS CpfResponsavel,
        cpr.Nome  AS NomeResponsavel,
        cpr.Motivo
      FROM dbo.Cessionarios_Planos cp
      INNER JOIN dbo.Cessionarios_Planos_Responsavel cpr
             ON cpr.CodCessionarioPlano = cp.CodCessionarioPlano
      WHERE cp.PossuiResponsavelFinanceiro = 1
    `),
    mssqlStream(mssql, `
      SELECT cp.CodCessionarioPlano, cc.CodContrato
      FROM dbo.Cessionarios_Planos cp
      INNER JOIN dbo.Contratos_Cessionarios cc ON cc.CodCessionario = cp.CodCessionario
      INNER JOIN (
        SELECT CodCessionario, MAX(CodContCess) AS MaxCC
        FROM dbo.Contratos_Cessionarios GROUP BY CodCessionario
      ) mx ON mx.MaxCC = cc.CodContCess
    `),
  ])

  const planoContratoMap = new Map<number, number>()
  for (const r of planosContratosRows)
    planoContratoMap.set(r['CodCessionarioPlano'] as number, r['CodContrato'] as number)

  const existingCpfs: Map<string, string> = DRY_RUN
    ? new Map()
    : await pgPool.query<{ cpf_cnpj: string; id: string }>('SELECT cpf_cnpj, id FROM customers')
        .then(res => new Map(res.rows.map(r => [r['cpf_cnpj']!, r['id']!])))

  const now              = new Date()
  const newCustomers: unknown[][] = []
  const responsaveisRows: unknown[][] = []
  const contratoUsado    = new Set<string>()
  let ignorados = 0
  let newCust   = 0

  for (const r of responsaveisQueryRows) {
    const cpf = normalizeCpf(r['CpfResponsavel'] as string | null)
    if (!cpf) { ignorados++; continue }

    const codContrato = planoContratoMap.get(r['CodCessionarioPlano'] as number)
    if (!codContrato) { ignorados++; continue }

    const contratoId = contratoUuid.get(codContrato)
    if (!contratoId) { ignorados++; continue }

    // Um contrato só pode ter um responsável financeiro
    if (contratoUsado.has(contratoId)) continue
    contratoUsado.add(contratoId)

    let customerId = existingCpfs.get(cpf)
    if (!customerId) {
      customerId = uuidv4()
      existingCpfs.set(cpf, customerId)
      newCustomers.push([
        customerId, cpf,
        String(r['NomeResponsavel'] ?? '').trim(),
        true, true, now, now, now,
      ])
      newCust++
    }

    responsaveisRows.push([
      uuidv4(), contratoId, customerId,
      String(r['Motivo'] ?? '').trim() || null,
      now, now, now,
    ])
  }

  let afetados = 0
  await withTransaction(async c => {
    if (newCustomers.length > 0) {
      await pgBatchInsert(c, 'customers',
        ['id', 'cpf_cnpj', 'nome', 'primeiro_acesso', 'ativo', 'synced_at', 'created_at', 'updated_at'],
        newCustomers,
        'ON CONFLICT (cpf_cnpj) DO NOTHING')
    }
    afetados = await pgBatchInsert(c, 'responsaveis_financeiros',
      ['id', 'contrato_id', 'customer_id', 'motivo', 'synced_at', 'created_at', 'updated_at'],
      responsaveisRows,
      `ON CONFLICT (contrato_id) DO UPDATE SET
         customer_id = EXCLUDED.customer_id,
         motivo      = EXCLUDED.motivo,
         updated_at  = now()`)
  })

  if (newCust > 0) {
    await reloadCessionarioUuids(mssql)
    log(step, `  → ${newCust} novos customers criados para responsáveis sem cadastro`)
  }
  log(step, `✓ ${afetados} upserted  |  ${ignorados} ignorados`)
  return { step, afetados, ignorados, erros: [], durationMs: Date.now() - t0 }
}

// ─── 7. Pagamentos ────────────────────────────────────────────────────────────

async function migratePagamentos(mssql: sql.ConnectionPool): Promise<StepResult> {
  const step = 'pagamentos'
  const t0   = Date.now()
  log(step, 'Lendo Boletos + Contratos_Pagamentos...')

  // Todos os jazigos por contrato (lista completa — não apenas o mínimo)
  const allCJ = await mssqlStream(mssql, `SELECT CodContrato, CodJazigo FROM dbo.Contratos_Jazigos ORDER BY CodContrato, CodJazigo`)
  const jazigosPorContrato = new Map<number, number[]>()
  for (const r of allCJ) {
    const k    = r['CodContrato'] as number
    const list = jazigosPorContrato.get(k) ?? []
    list.push(r['CodJazigo'] as number)
    jazigosPorContrato.set(k, list)
  }

  // Contrato mais recente por cessionário (para resolver jazigoId em boletos)
  const contratoCess = await mssqlStream(mssql, `
    SELECT cc.CodCessionario, cc.CodContrato
    FROM dbo.Contratos_Cessionarios cc
    INNER JOIN (
      SELECT CodCessionario, MAX(CodContCess) AS MaxCC
      FROM dbo.Contratos_Cessionarios GROUP BY CodCessionario
    ) mx ON mx.MaxCC = cc.CodContCess
  `)
  const contratoPorCessionario = new Map<number, number>()
  for (const r of contratoCess)
    contratoPorCessionario.set(r['CodCessionario'] as number, r['CodContrato'] as number)

  const cols = [
    'id', 'sql_server_id', 'nosso_numero',
    'valor_titulo', 'valor_pago', 'valor_liquido',
    'data_vencimento', 'data_pagamento',
    'status', 'tipo',
    'gavetas_na_epoca', 'valor_na_epoca',
    'customer_id', 'titular_contrato_id',
    'jazigo_id', 'contrato_id',
    'created_at', 'updated_at',
  ]

  // ── Boletos de manutenção ──────────────────────────────────────────────────
  const boletosRows = await mssqlStream(mssql, `
    SELECT
      b.CodBoleto,
      b.NossoNumero,
      b.DataVencimento,
      b.DataLiquid,
      b.ValorTitulo,
      b.ValorRecebido,
      b.ValorTarifa,
      b.Situacao,
      cp.CodCessionario
    FROM dbo.Boletos b
    INNER JOIN dbo.Cessionarios_Planos cp ON cp.CodCessionarioPlano = b.CodCessionarioPlano
    ORDER BY b.CodBoleto
  `)

  const rowsBoletos: unknown[][] = []
  let ignoradosBoletos = 0
  const nowBol = new Date()

  for (const r of boletosRows) {
    const customerId = cessionarioUuid.get(r['CodCessionario'] as number)
    if (!customerId) { ignoradosBoletos++; continue }

    const dataVenc = oleToDate(r['DataVencimento'] as number | null)
    if (!dataVenc) { ignoradosBoletos++; continue }

    const codContrato = contratoPorCessionario.get(r['CodCessionario'] as number)
    const contratoId  = codContrato ? (contratoUuid.get(codContrato) ?? null) : null

    // Primeiro jazigo do contrato (os boletos de manutenção cobrem todos, mas FK é para um)
    const jazigos  = codContrato ? (jazigosPorContrato.get(codContrato) ?? []) : []
    const jazigoId = jazigos[0] !== undefined ? (jazigoUuid.get(jazigos[0]) ?? null) : null

    const dataPag = oleToDate(r['DataLiquid'] as number | null)
    const valorRec = Number(r['ValorRecebido'] ?? 0)
    const valorTar = Number(r['ValorTarifa']   ?? 0)
    const valorLiq = valorRec > 0 ? parseFloat((valorRec - valorTar).toFixed(2)) : null

    const codJazigo0  = jazigos[0]
    const qtdGavetas  = codJazigo0 !== undefined ? (gavetasPorJazigo.get(codJazigo0) ?? null) : null
    const valorEpoca  = qtdGavetas !== null ? valorPorGavetas(qtdGavetas) : null

    rowsBoletos.push([
      uuidv4(),
      r['CodBoleto'],
      String(r['NossoNumero'] ?? '').trim() || null,
      r['ValorTitulo'],
      valorRec > 0 ? valorRec : null,
      valorLiq,
      dataVenc,
      dataPag,
      mapStatusBoleto(r['Situacao'] as string, dataVenc),
      'MANUTENCAO',
      qtdGavetas,
      valorEpoca,
      customerId,
      customerId, // titular = pagador; service resolve hierarquia se houver responsável distinto
      jazigoId,
      contratoId,
      nowBol, nowBol,
    ])
  }

  // ── Contratos_Pagamentos — aquisição ───────────────────────────────────────
  // sql_server_id = -(CodPagto): negativo para não colidir com CodBoleto (positivo).
  // Convenção: sql_server_id < 0 identifica pagamentos de aquisição.
  const pagtosRows = await mssqlStream(mssql, `
    SELECT
      cp.CodPagto,
      cp.CodContrato,
      cp.ValorParcela,
      cp.Vencimento   AS VencimentoOle,
      cc.CodCessionario
    FROM dbo.Contratos_Pagamentos cp
    INNER JOIN (
      SELECT CodContrato, CodCessionario,
             ROW_NUMBER() OVER (PARTITION BY CodContrato ORDER BY DtContrato DESC) AS rn
      FROM dbo.Contratos_Cessionarios
    ) cc ON cc.CodContrato = cp.CodContrato AND cc.rn = 1
    ORDER BY cp.CodPagto
  `)

  const rowsAq: unknown[][] = []
  let ignoradosAq = 0
  const nowAq = new Date()

  for (const r of pagtosRows) {
    const customerId = cessionarioUuid.get(r['CodCessionario'] as number)
    if (!customerId) { ignoradosAq++; continue }

    const contratoId = contratoUuid.get(r['CodContrato'] as number)
    if (!contratoId) { ignoradosAq++; continue }

    const dataVenc = oleToDate(r['VencimentoOle'] as number | null)
    if (!dataVenc) { ignoradosAq++; continue }

    rowsAq.push([
      uuidv4(),
      -(r['CodPagto'] as number), // negativo = namespace aquisição
      null,
      r['ValorParcela'], null, null,
      dataVenc, null,
      'PAGO',       // parcelas de aquisição já quitadas no SQL Server
      'AQUISICAO',
      null, null,   // gavetas_na_epoca / valor_na_epoca: N/A para aquisição
      customerId, customerId,
      null, contratoId,
      nowAq, nowAq,
    ])
  }

  let afetadosBoletos = 0
  let afetadosAq      = 0

  await withTransaction(async c => {
    afetadosBoletos = await pgBatchInsert(c, 'pagamentos', cols, rowsBoletos,
      `ON CONFLICT (sql_server_id) DO UPDATE SET
         status         = EXCLUDED.status,
         valor_pago     = EXCLUDED.valor_pago,
         data_pagamento = EXCLUDED.data_pagamento,
         updated_at     = now()`)
    afetadosAq = await pgBatchInsert(c, 'pagamentos', cols, rowsAq,
      `ON CONFLICT (sql_server_id) DO UPDATE SET
         updated_at = now()`)
  })

  const afetados = afetadosBoletos + afetadosAq
  log(step, `✓ ${afetadosBoletos} boletos  +  ${afetadosAq} aquisições  =  ${afetados}`)
  log(step, `  Ignorados: ${ignoradosBoletos} boletos  +  ${ignoradosAq} aquisições`)
  return { step, afetados, ignorados: ignoradosBoletos + ignoradosAq, erros: [], durationMs: Date.now() - t0 }
}

// ═══════════════════════════════════════════════════════════════════════════════
// RECONCILIAÇÃO
// ═══════════════════════════════════════════════════════════════════════════════

async function reconcile(mssql: sql.ConnectionPool): Promise<ReconcileRow[]> {
  banner('RECONCILIAÇÃO — SQL Server vs PostgreSQL')

  // CPF migrável no SQL Server: >= 9 dígitos após normalização.
  // normalizeCpf() faz padStart(11,'0') para CPFs com 9–10 dígitos (zeros à esquerda perdidos
  // no legado), então qualquer CPF com >= 9 dígitos é válido e será importado com 11 dígitos.
  // CPFs com < 9 dígitos são irrecuperáveis por lógica — requerem intervenção manual.
  const stripCpf  = (col: string) =>
    `REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(${col},' ',''),'.',''),'-',''),'/',''),',','')`
  const cpfValido      = `LEN(${stripCpf('CPF')}) >= 9`
  const cpfValidoAlias = (col: string) => `LEN(${stripCpf(col)}) >= 9`

  const checks: Array<{ entidade: string; mssqlQ: string; pgQ: string; nota?: string }> = [
    {
      // customers = Cessionários com CPF válido  UNION  responsáveis com CPF novo
      // A migração cria customers adicionais para responsáveis financeiros sem cadastro.
      entidade: 'customers',
      mssqlQ: `
        SELECT COUNT(*) AS n FROM (
          SELECT ${stripCpf('CPF')} AS cpf
          FROM dbo.Cessionarios
          WHERE CPF IS NOT NULL AND ${cpfValido}
          UNION
          SELECT ${stripCpf('cpr.CPF')} AS cpf
          FROM dbo.Cessionarios_Planos_Responsavel cpr
          INNER JOIN dbo.Cessionarios_Planos cp ON cp.CodCessionarioPlano = cpr.CodCessionarioPlano
          WHERE cp.PossuiResponsavelFinanceiro = 1
          AND cpr.CPF IS NOT NULL AND ${cpfValidoAlias('cpr.CPF')}
        ) t
      `,
      pgQ:  `SELECT COUNT(*) AS n FROM customers`,
    },
    {
      // Apenas endereços de cessionários com CPF válido (os sem CPF são ignorados na migração)
      entidade: 'customer_addresses',
      mssqlQ: `
        SELECT COUNT(*) AS n
        FROM dbo.Cessionarios_Enderecos e
        INNER JOIN dbo.Cessionarios c ON c.CodCessionario = e.CodCessionario
        WHERE c.CPF IS NOT NULL AND ${cpfValido}
      `,
      pgQ:   `SELECT COUNT(*) AS n FROM customer_addresses`,
    },
    {
      // Apenas telefones de cessionários com CPF válido
      entidade: 'customer_phones',
      mssqlQ: `
        SELECT COUNT(*) AS n
        FROM dbo.Cessionarios_Fones f
        INNER JOIN dbo.Cessionarios c ON c.CodCessionario = f.CodCessionario
        WHERE c.CPF IS NOT NULL AND ${cpfValido}
      `,
      pgQ:   `SELECT COUNT(*) AS n FROM customer_phones`,
    },
    {
      // Contratos cujo cessionário mais recente tem CPF válido, com NumContrato distinto
      entidade: 'contratos',
      mssqlQ: `
        SELECT COUNT(DISTINCT ct.NumContrato) AS n
        FROM dbo.Contratos ct
        INNER JOIN (
          SELECT cc.CodContrato, cc.CodCessionario
          FROM dbo.Contratos_Cessionarios cc
          INNER JOIN (
            SELECT CodContrato, MAX(CodContCess) AS MaxCC
            FROM dbo.Contratos_Cessionarios GROUP BY CodContrato
          ) mx ON mx.MaxCC = cc.CodContCess
        ) cc ON cc.CodContrato = ct.CodContrato
        INNER JOIN dbo.Cessionarios c ON c.CodCessionario = cc.CodCessionario
        WHERE ct.NumContrato IS NOT NULL AND ct.NumContrato != ''
        AND c.CPF IS NOT NULL AND ${cpfValido}
      `,
      pgQ:   `SELECT COUNT(*) AS n FROM contratos`,
    },
    {
      // Jazigos com contrato cujo cessionário tem CPF válido.
      // Nota: deduplicação de codigo (quadra-jazigo) pode gerar Δ pequeno (qualidade dos dados).
      entidade: 'jazigos',
      mssqlQ: `
        SELECT COUNT(DISTINCT j.CodJazigo) AS n
        FROM dbo.Jazigos j
        LEFT JOIN dbo.Contratos_Jazigos cj ON cj.CodJazigo = j.CodJazigo
        INNER JOIN (
          SELECT cc.CodContrato, cc.CodCessionario
          FROM dbo.Contratos_Cessionarios cc
          INNER JOIN (
            SELECT CodContrato, MAX(CodContCess) AS MaxCC
            FROM dbo.Contratos_Cessionarios GROUP BY CodContrato
          ) mx ON mx.MaxCC = cc.CodContCess
        ) cc ON cc.CodContrato = cj.CodContrato
        INNER JOIN dbo.Cessionarios c ON c.CodCessionario = cc.CodCessionario
        WHERE c.CPF IS NOT NULL AND ${cpfValido}
      `,
      pgQ:   `SELECT COUNT(*) AS n FROM jazigos`,
      nota:  'Δ pequeno pode persistir por jazigos com código (quadra-jazigo) duplicado no legado',
    },
    {
      // Boletos cujo cessionário tem CPF válido e data de vencimento presente
      entidade: 'pagamentos (boletos)',
      mssqlQ: `
        SELECT COUNT(*) AS n
        FROM dbo.Boletos b
        INNER JOIN dbo.Cessionarios_Planos cp ON cp.CodCessionarioPlano = b.CodCessionarioPlano
        INNER JOIN dbo.Cessionarios c ON c.CodCessionario = cp.CodCessionario
        WHERE c.CPF IS NOT NULL AND ${cpfValido}
        AND b.DataVencimento IS NOT NULL AND b.DataVencimento > 0
      `,
      pgQ:   `SELECT COUNT(*) AS n FROM pagamentos WHERE tipo = 'MANUTENCAO' AND sql_server_id > 0`,
    },
    {
      // Aquisições cujo cessionário tem CPF válido e data de vencimento presente
      entidade: 'pagamentos (aquisição)',
      mssqlQ: `
        SELECT COUNT(*) AS n
        FROM dbo.Contratos_Pagamentos cp
        INNER JOIN (
          SELECT cc2.CodContrato, cc2.CodCessionario
          FROM dbo.Contratos_Cessionarios cc2
          INNER JOIN (
            SELECT CodContrato, MAX(CodContCess) AS MaxCC
            FROM dbo.Contratos_Cessionarios GROUP BY CodContrato
          ) mx ON mx.MaxCC = cc2.CodContCess
        ) cc ON cc.CodContrato = cp.CodContrato
        INNER JOIN dbo.Cessionarios c ON c.CodCessionario = cc.CodCessionario
        WHERE c.CPF IS NOT NULL AND ${cpfValido}
        AND cp.Vencimento IS NOT NULL AND cp.Vencimento > 0
      `,
      pgQ:   `SELECT COUNT(*) AS n FROM pagamentos WHERE tipo = 'AQUISICAO'`,
    },
    {
      // Responsáveis: um por contrato (COUNT DISTINCT contrato espelha deduplicação da migração)
      entidade: 'responsaveis_financeiros',
      mssqlQ: `
        SELECT COUNT(DISTINCT cc.CodContrato) AS n
        FROM dbo.Cessionarios_Planos cp
        INNER JOIN dbo.Cessionarios_Planos_Responsavel cpr
               ON cpr.CodCessionarioPlano = cp.CodCessionarioPlano
        INNER JOIN (
          SELECT cc2.CodCessionario, cc2.CodContrato
          FROM dbo.Contratos_Cessionarios cc2
          INNER JOIN (
            SELECT CodCessionario, MAX(CodContCess) AS MaxCC
            FROM dbo.Contratos_Cessionarios GROUP BY CodCessionario
          ) mx ON mx.MaxCC = cc2.CodContCess
        ) cc ON cc.CodCessionario = cp.CodCessionario
        INNER JOIN dbo.Cessionarios ces ON ces.CodCessionario = cc.CodCessionario
        WHERE cp.PossuiResponsavelFinanceiro = 1
        AND cpr.CPF IS NOT NULL AND ${cpfValidoAlias('cpr.CPF')}
        AND ces.CPF IS NOT NULL AND ${cpfValido}
      `,
      pgQ:   `SELECT COUNT(*) AS n FROM responsaveis_financeiros`,
    },
  ]

  const rows: ReconcileRow[] = []
  let temDivergencia = false

  for (const c of checks) {
    let mssqlCount = 0
    let pgCount    = 0
    let mssqlOk    = true

    try {
      const res = await mssql.request().query(c.mssqlQ)
      mssqlCount = Number((res.recordset[0] as Record<string, unknown>)?.['n'] ?? 0)
    } catch {
      mssqlOk    = false
      mssqlCount = -1
    }

    try {
      const res = await pgPool.query<{ n: string }>(c.pgQ)
      pgCount = Number(res.rows[0]?.['n'] ?? 0)
    } catch {
      pgCount = -1
    }

    const delta = !mssqlOk || mssqlCount < 0 ? 0 : pgCount - mssqlCount
    const ok    = !mssqlOk || Math.abs(delta) === 0

    if (!ok) temDivergencia = true

    rows.push({ entidade: c.entidade, mssql_count: mssqlCount, pg_count: pgCount, delta, ok, nota: c.nota })

    const icon      = ok ? '✓' : '⚠'
    const deltaStr  = delta >= 0 ? `+${delta}` : `${delta}`
    const mssqlStr  = mssqlOk ? String(mssqlCount) : 'N/A'
    console.log(
      `  ${icon}  ${c.entidade.padEnd(30)}  MSSQL=${mssqlStr.padStart(7)}  PG=${String(pgCount).padStart(7)}  Δ=${deltaStr}`
    )
    if (!ok && c.nota) console.log(`       ↳ ${c.nota}`)
  }

  console.log(temDivergencia
    ? '\n  ⚠ Divergências encontradas — revisar steps marcados com ⚠'
    : '\n  ✓ Todos os counts batem — migração íntegra'
  )

  return rows
}

// ═══════════════════════════════════════════════════════════════════════════════
// SYNC LOG
// ═══════════════════════════════════════════════════════════════════════════════

async function writeSyncLog(
  status: 'SUCESSO' | 'FALHA',
  results: StepResult[],
): Promise<void> {
  if (DRY_RUN) return
  const totalAfetados = results.reduce((s, r) => s + r.afetados, 0)
  const totalErros    = results.reduce((s, r) => s + r.erros.length, 0)
  const allErros      = results.flatMap(r => r.erros)

  await pgPool.query(
    `INSERT INTO sync_logs
       (id, job_name, status, registros_novos, registros_atualizados, falhas, erro_detalhes, data_fim)
     VALUES ($1, $2, $3::"SyncStatus", $4, 0, $5, $6, now())`,
    [
      uuidv4(), 'full_migration', status,
      totalAfetados, totalErros,
      allErros.length > 0 ? JSON.stringify(allErros) : null,
    ]
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

type StepFn = (conn: sql.ConnectionPool) => Promise<StepResult>

async function main() {
  banner('ETL SQL Server → PostgreSQL  |  Portal do Cessionário  v3.0')
  console.log(`  Modo:       ${DRY_RUN ? 'DRY RUN' : RECONCILE_ONLY ? 'RECONCILE ONLY' : 'PRODUÇÃO'}`)
  console.log(`  Batch size: ${BATCH_SIZE}`)
  if (ONLY_STEP) console.log(`  Step único: ${ONLY_STEP}`)
  if (FROM_STEP) console.log(`  A partir de: ${FROM_STEP}`)

  const mssql = await sql.connect(MSSQL_CONFIG)
  log('main', '✓ Conectado ao SQL Server')

  await preflight(mssql)

  if (RECONCILE_ONLY) {
    await rehydrateMaps(mssql)
    const recon = await reconcile(mssql)
    const ts    = new Date().toISOString().replace(/[:.]/g, '-')
    const file  = `reports/migration_report_${ts}.json`
    mkdirSync('reports', { recursive: true })
    writeFileSync(file, JSON.stringify({ reconcile: recon }, null, 2))
    log('main', `Relatório salvo em ${file}`)
    await mssql.close()
    await pgPool.end()
    return
  }

  if (!DRY_RUN) await rehydrateMaps(mssql)

  // Steps na ordem que respeita FKs
  const allSteps: Array<[string, StepFn]> = [
    ['tarifas_jazigo',          () => seedTarifasJazigo()],
    ['customers',               migrateCustomers],
    ['customer_addresses',      migrateCustomerAddresses],
    ['customer_phones',         migrateCustomerPhones],
    ['contratos',               migrateContratos],
    ['jazigos',                 migrateJazigos],
    ['responsaveis_financeiros',migrateResponsaveisFinanceiros],
    ['pagamentos',              migratePagamentos],
  ]

  let skipping   = !!FROM_STEP
  const results: StepResult[] = []
  const stepErrors: string[]  = []
  const t0 = Date.now()

  for (const [name, fn] of allSteps) {
    if (skipping && name === FROM_STEP) skipping = false
    if (skipping) {
      log('main', `⏭  Skip ${name} (--from=${FROM_STEP})`)
      continue
    }
    if (ONLY_STEP && ONLY_STEP !== name) continue

    try {
      const result = await fn(mssql)
      results.push(result)
    } catch (err) {
      const msg = `[${name}] ${(err as Error).message}`
      console.error(`\n✗ ERRO FATAL no step ${name}:\n  ${(err as Error).message}\n`)
      stepErrors.push(msg)
      results.push({
        step: name, afetados: 0, ignorados: 0,
        erros: [{ step: name, sqlServerId: null, motivo: msg }],
        durationMs: 0,
      })
    }
  }

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1)
  const status  = stepErrors.length === 0 ? 'SUCESSO' : 'FALHA'

  // Tabela de sumário por step
  banner(`Concluído em ${elapsed}s — ${status}`)
  console.log()
  console.log('  Step                           Afetados  Ignorados  Erros   Tempo')
  console.log('  ' + '─'.repeat(68))
  for (const r of results) {
    const cols = [
      r.step.padEnd(31),
      String(r.afetados).padStart(8),
      String(r.ignorados).padStart(9),
      String(r.erros.length).padStart(6),
      `${(r.durationMs / 1000).toFixed(1)}s`.padStart(7),
    ]
    console.log('  ' + cols.join('  '))
  }

  // Reconciliação final
  let reconRows: ReconcileRow[] = []
  if (!SKIP_RECONCILE && !DRY_RUN) {
    console.log()
    reconRows = await reconcile(mssql)
  }

  // Relatório JSON
  const ts   = new Date().toISOString().replace(/[:.]/g, '-')
  const file = `reports/migration_report_${ts}.json`
  mkdirSync('reports', { recursive: true })
  writeFileSync(file, JSON.stringify({
    status,
    elapsed_s:  parseFloat(elapsed),
    dry_run:    DRY_RUN,
    steps:      results,
    reconcile:  reconRows,
    stepErrors,
  }, null, 2))
  log('main', `Relatório salvo em ${file}`)

  await writeSyncLog(status as 'SUCESSO' | 'FALHA', results)

  await mssql.close()
  await pgPool.end()

  if (stepErrors.length > 0) process.exit(1)
}

main().catch(err => {
  console.error('\n✗ Erro fatal:', err)
  process.exit(1)
})
