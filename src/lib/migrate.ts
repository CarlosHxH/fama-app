/**
 * migrate.ts — ETL SQL Server → PostgreSQL
 * Portal do Cessionário (Cemitério)
 *
 * Estratégia: leitura direta via mssql + inserção em bulk via pg COPY
 * (fallback para INSERT em batch de 500 se COPY não for viável)
 *
 * Ordem de execução (respeita FKs):
 *   1. customers            ← Cessionarios
 *   2. customer_addresses   ← Cessionarios_Enderecos + Cidades
 *   3. customer_phones      ← Cessionarios_Fones
 *   4. contratos            ← Contratos + Contratos_Cessionarios
 *   5. jazigos              ← Jazigos + Contratos_Jazigos + Gavetas (contagem)
 *   6. responsaveis_fin.    ← Cessionarios_Planos + Cessionarios_Planos_Responsavel
 *   7. pagamentos           ← Boletos (manutenção) + Contratos_Pagamentos (aquisição)
 *   8. sync_logs            ← registro automático ao final
 *
 * Transformações críticas:
 *   - CPF: remove pontos/traços, mantém só dígitos
 *   - Datas OLE Automation (INT dias desde 1899-12-30) → ISO Date
 *   - Situacao contrato: 'A'→ATIVO, 'I'→INATIVO, 'Q'→QUITADO
 *   - Status boleto: QUITADO→PAGO, CANCELADO→CANCELADO, default→PENDENTE
 *   - valorMensalidade: deduzido da quantidade de gavetas (Decreto 4.332/2023)
 *
 * Pré-requisitos:
 *   npm install mssql pg uuid
 *   npm install -D @types/mssql @types/pg tsx
 *
 * Uso:
 *   DATABASE_URL=postgres://... \
 *   MSSQL_HOST=... MSSQL_USER=... MSSQL_PASSWORD=... MSSQL_DB=... \
 *   npx tsx migrate.ts
 *
 *   Flags opcionais:
 *     --dry-run      Lê do SQL Server, não escreve no Postgres
 *     --only=step    Executa apenas um step (ex: --only=customers)
 *     --batch=500    Tamanho do batch INSERT (default 500)
 */

import sql from 'mssql'
import { Pool } from 'pg'
import { v4 as uuidv4 } from 'uuid'

// ─── Config ──────────────────────────────────────────────────────────────────

const MSSQL_CONFIG: sql.config = {
  server:   process.env.MSSQL_HOST!,
  user:     process.env.MSSQL_USER!,
  password: process.env.MSSQL_PASSWORD!,
  database: process.env.MSSQL_DB!,
  options:  { trustServerCertificate: true, encrypt: false },
  pool:     { max: 5, min: 1 },
}

const pg = new Pool({ connectionString: process.env.DATABASE_URL! })

const DRY_RUN   = process.argv.includes('--dry-run')
const ONLY_STEP = process.argv.find(a => a.startsWith('--only='))?.split('=')[1]
const BATCH     = parseInt(process.argv.find(a => a.startsWith('--batch='))?.split('=')[1] ?? '500')

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Converte OLE Automation Date (INT, dias desde 1899-12-30) para Date.
 * Retorna null se o valor for 0 ou negativo (campo vazio no legado).
 */
function oleToDate(ole: number | null): Date | null {
  if (!ole || ole <= 0) return null
  const base = new Date(1899, 11, 30) // 1899-12-30
  return new Date(base.getTime() + ole * 86_400_000)
}

/**
 * Normaliza CPF/CNPJ: remove tudo que não é dígito, retorna string.
 * Retorna string vazia se nulo/vazio — tratar no chamador.
 */
function normalizeCpf(raw: string | null): string {
  if (!raw) return ''
  return raw.replace(/\D/g, '')
}

/**
 * Mapa de situação do contrato vindo do SQL Server.
 */
function mapSituacaoContrato(sit: string): string {
  const m: Record<string, string> = { A: 'ATIVO', I: 'INATIVO', Q: 'QUITADO' }
  return m[sit?.trim()] ?? 'INATIVO'
}

/**
 * Mapa de situação do boleto → StatusPagamento Postgres.
 */
function mapStatusBoleto(sit: string): string {
  const s = sit?.trim().toUpperCase()
  if (s === 'QUITADO')   return 'PAGO'
  if (s === 'CANCELADO') return 'CANCELADO'
  if (s === 'ESTORNADO') return 'ESTORNADO'
  return 'PENDENTE'
}

/**
 * Valor mensalidade conforme Decreto 4.332/2023.
 */
function valorPorGavetas(qtd: number): number {
  if (qtd <= 3) return 180.00
  if (qtd <= 6) return 360.00
  return qtd * 60.00 // estimativa para jazigos maiores
}

/**
 * Insere registros em batch no Postgres usando INSERT com múltiplos VALUES.
 * Retorna total inserido.
 */
async function pgBatchInsert(
  table: string,
  columns: string[],
  rows: unknown[][],
  onConflict = 'ON CONFLICT DO NOTHING',
): Promise<number> {
  if (DRY_RUN || rows.length === 0) return rows.length

  let total = 0
  for (let i = 0; i < rows.length; i += BATCH) {
    const chunk = rows.slice(i, i + BATCH)
    const placeholders = chunk.map(
      (_, ri) => `(${columns.map((_, ci) => `$${ri * columns.length + ci + 1}`).join(', ')})`
    ).join(',\n')
    const values = chunk.flat()
    const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES\n${placeholders}\n${onConflict}`
    try {
      await pg.query(query, values)
      total += chunk.length
    } catch(err: any) {
      // Re-lança com contexto: qual tabela, qual chunk
      err.message = `[batch ${Math.floor(i/BATCH)+1} de ${table}] ${err.message}`
      throw err
    }
  }
  return total
}

/**
 * Log de progresso no terminal.
 */
function log(step: string, msg: string) {
  console.log(`[${new Date().toISOString()}] [${step}] ${msg}`)
}

// ─── Mapa de IDs (SQL Server ID → UUID Postgres) ──────────────────────────────
// Mantemos em memória para resolver FKs entre steps sem precisar de SELECTs extras.

const cessionarioUuid   = new Map<number, string>() // CodCessionario → uuid
const dbCustomerMap      = new Map<number, string>() // sql_server_id → pg uuid (carregado do banco)
const contratoUuid       = new Map<number, string>() // CodContrato    → uuid
const jazigoUuid         = new Map<number, string>() // CodJazigo      → uuid

/**
 * Rehidrata os mapas de UUID a partir do que já está no banco Postgres.
 * Essencial para re-execuções parciais: garante que os mapas em memória
 * correspondam aos IDs reais gravados, independente de execuções anteriores.
 */
async function rehydrateMaps(): Promise<void> {
  if (DRY_RUN) return

  const [cust, cont, jaz] = await Promise.all([
    pg.query('SELECT sql_server_id, id FROM customers WHERE sql_server_id IS NOT NULL'),
    pg.query('SELECT sql_server_id, id FROM contratos WHERE sql_server_id IS NOT NULL'),
    pg.query('SELECT sql_server_id, id FROM jazigos   WHERE sql_server_id IS NOT NULL'),
  ])

  for (const r of cust.rows) {
    cessionarioUuid.set(Number(r.sql_server_id), r.id)
    dbCustomerMap.set(Number(r.sql_server_id), r.id)
  }
  for (const r of cont.rows)  contratoUuid.set(Number(r.sql_server_id), r.id)
  for (const r of jaz.rows)   jazigoUuid.set(Number(r.sql_server_id), r.id)

  console.log(`  Mapas rehidratados: ${cessionarioUuid.size} customers, ${contratoUuid.size} contratos, ${jazigoUuid.size} jazigos`)
}

// ─── Steps ───────────────────────────────────────────────────────────────────

async function migrateCustomers(conn: sql.ConnectionPool): Promise<void> {
  const step = 'customers'
  log(step, 'Lendo Cessionarios...')

  const result = await conn.request().query(`
    SELECT
      c.CodCessionario,
      c.Cessionario        AS Nome,
      c.CPF,
      c.Email,
      c.DataAtualizacao    AS DataAtualizacaoOle
    FROM dbo.Cessionarios c
    ORDER BY c.CodCessionario
  `)

  const rows: unknown[][] = []
  const cols = [
    'id', 'sql_server_id', 'cpf_cnpj', 'nome', 'email',
    'primeiro_acesso', 'ativo', 'synced_at', 'created_at', 'updated_at',
  ]

  let skipped = 0
  let dupCpf = 0
  // CPF → uuid: deduplica CPFs repetidos dentro do próprio lote.
  // No legado, cônjuges/filhos às vezes foram cadastrados com CPF do titular.
  // Estratégia: primeiro CodCessionario do CPF é o canônico; os demais apontam para o mesmo uuid.
  const cpfToUuid = new Map<string, string>()

  for (const r of result.recordset) {
    const cpf = normalizeCpf(r.CPF)
    if (!cpf) { skipped++; continue }

    if (cpfToUuid.has(cpf)) {
      // CPF duplicado: reusa o uuid já gerado para que FKs continuem funcionando
      cessionarioUuid.set(r.CodCessionario, cpfToUuid.get(cpf)!)
      dupCpf++
      continue
    }

    const id = uuidv4()
    cpfToUuid.set(cpf, id)
    cessionarioUuid.set(r.CodCessionario, id)

    const syncedAt = oleToDate(r.DataAtualizacaoOle) ?? new Date()

    rows.push([
      id,
      r.CodCessionario,
      cpf,
      (r.Nome as string).trim(),
      (r.Email as string)?.trim() || null,
      true,
      true,
      syncedAt,
      syncedAt,
      syncedAt,
    ])
  }

  await pgBatchInsert('customers', cols, rows,
    'ON CONFLICT (sql_server_id) DO UPDATE SET nome = EXCLUDED.nome, email = EXCLUDED.email, synced_at = EXCLUDED.synced_at, updated_at = now()')

  // CRÍTICO: após o upsert, recarregar os UUIDs reais do banco.
  // O ON CONFLICT DO UPDATE não muda o `id` original — os UUIDs gerados
  // em memória nesta execução podem diferir dos gravados em execuções anteriores.
  // Recarregar garante que todos os steps seguintes usem os IDs corretos.
  if (!DRY_RUN) {
    cessionarioUuid.clear()
    dbCustomerMap.clear()
    const res = await pg.query('SELECT sql_server_id, id FROM customers WHERE sql_server_id IS NOT NULL')
    for (const r of res.rows) {
      cessionarioUuid.set(Number(r.sql_server_id), r.id)
      dbCustomerMap.set(Number(r.sql_server_id), r.id)
    }
    log(step, `  Mapa recarregado do banco: ${cessionarioUuid.size} customers`)
  }

  log(step, `✓ ${rows.length} processados  |  ${skipped} sem CPF  |  ${dupCpf} CPFs duplicados unificados`)
}

// ─────────────────────────────────────────────────────────────────────────────

async function migrateCustomerAddresses(conn: sql.ConnectionPool): Promise<void> {
  const step = 'customer_addresses'
  log(step, 'Lendo Cessionarios_Enderecos...')

  const result = await conn.request().query(`
    SELECT
      e.CodCessionario,
      e.TipoEndereco,
      e.Endereco,
      e.Complemento,
      e.Setor         AS Bairro,
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
  let skipped = 0

  for (const r of result.recordset) {
    const customerId = cessionarioUuid.get(r.CodCessionario) ?? dbCustomerMap.get(r.CodCessionario)
    if (!customerId) { skipped++; continue }

    // Tipo: SQL Server usa texto livre ("Residencial", "Comercial", etc.)
    const tipoRaw = (r.TipoEndereco as string)?.trim().toUpperCase() ?? ''
    const tipo = tipoRaw.includes('COMERCIAL') ? 'COMERCIAL' : 'RESIDENCIAL'

    rows.push([
      uuidv4(),
      customerId,
      tipo,
      (r.Endereco as string)?.trim() || null,
      (r.Complemento as string)?.trim() || null,
      (r.Bairro as string)?.trim() || null,
      (r.Cidade as string)?.trim() || null,
      (r.UF as string)?.trim() || null,
      (r.CEP as string)?.replace(/\D/g, '') || null,
      r.Correspondencia === true || r.Correspondencia === 1,
      now, now, now,
    ])
  }

  // Verificar integridade: filtrar linhas cujo customer_id não existe no PG
  if (!DRY_RUN) {
    const pgIds = new Set((await pg.query('SELECT id FROM customers')).rows.map((r: any) => r.id))
    const antes = rows.length
    const rowsFiltradas = rows.filter(row => pgIds.has(row[1] as string))
    const removidos = antes - rowsFiltradas.length
    if (removidos > 0) {
      log(step, `  ⚠ ${removidos} endereços com customer_id inexistente no PG removidos antes do insert`)
    }
    const inserted = await pgBatchInsert('customer_addresses', cols, rowsFiltradas)
    log(step, `✓ ${inserted} inseridos  |  ${skipped} ignorados (sem mapa)  |  ${removidos} sem customer no PG`)
  } else {
    const inserted = await pgBatchInsert('customer_addresses', cols, rows)
    log(step, `✓ ${inserted} inseridos  |  ${skipped} ignorados`)
  }
}

// ─────────────────────────────────────────────────────────────────────────────

async function migrateCustomerPhones(conn: sql.ConnectionPool): Promise<void> {
  const step = 'customer_phones'
  log(step, 'Lendo Cessionarios_Fones...')

  const result = await conn.request().query(`
    SELECT CodFone, CodCessionario, Tipo, Numero, Obs
    FROM dbo.Cessionarios_Fones
  `)

  const cols = [
    'id', 'sql_server_id', 'customer_id', 'tipo', 'numero',
    'observacoes', 'synced_at', 'created_at', 'updated_at',
  ]
  const rows: unknown[][] = []
  const now = new Date()
  let skipped = 0

  for (const r of result.recordset) {
    const customerId = cessionarioUuid.get(r.CodCessionario) ?? dbCustomerMap.get(r.CodCessionario)
    if (!customerId) { skipped++; continue }

    // Mapeia tipo de fone do legado para o enum Postgres
    const tipoRaw = (r.Tipo as string)?.trim().toUpperCase() ?? ''
    let tipo: string
    if (tipoRaw.includes('WHATSAPP') || tipoRaw.includes('WAPP')) tipo = 'WHATSAPP'
    else if (tipoRaw.includes('CELULAR') || tipoRaw.includes('CEL') || tipoRaw.includes('MOVEL')) tipo = 'CELULAR'
    else tipo = 'FIXO'

    rows.push([
      uuidv4(),
      r.CodFone,
      customerId,
      tipo,
      (r.Numero as string)?.trim(),
      (r.Obs as string)?.trim() || null,
      now, now, now,
    ])
  }

  const inserted = await pgBatchInsert('customer_phones', cols, rows,
    'ON CONFLICT (sql_server_id) DO NOTHING')
  log(step, `✓ ${inserted} inseridos  |  ${skipped} ignorados`)
}

// ─────────────────────────────────────────────────────────────────────────────

async function migrateContratos(conn: sql.ConnectionPool): Promise<void> {
  const step = 'contratos'
  log(step, 'Lendo Contratos + Contratos_Cessionarios...')

  // JOIN: Contratos_Cessionarios liga contrato ao cessionário titular.
  // Pode haver mais de um cessionário por contrato (cessão) — pegamos o mais recente.
  const result = await conn.request().query(`
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
    ORDER BY c.CodContrato
  `)

  const cols = [
    'id', 'sql_server_id', 'numero_contrato', 'situacao',
    'customer_id', 'synced_at', 'created_at', 'updated_at',
  ]
  const rows: unknown[][] = []
  let skipped = 0
  const now = new Date()

  // Deduplicar numero_contrato dentro do lote
  const numContratoToUuid = new Map<string, string>()
  let dupContrato = 0

  for (const r of result.recordset) {
    const customerId = cessionarioUuid.get(r.CodCessionario) ?? dbCustomerMap.get(r.CodCessionario)
    if (!customerId) { skipped++; continue }

    const numContrato = (r.NumContrato as string)?.trim()
    if (!numContrato) { skipped++; continue }

    if (numContratoToUuid.has(numContrato)) {
      contratoUuid.set(r.CodContrato, numContratoToUuid.get(numContrato)!)
      dupContrato++
      continue
    }

    const id = uuidv4()
    numContratoToUuid.set(numContrato, id)
    contratoUuid.set(r.CodContrato, id)

    const syncedAt = oleToDate(r.DtContratoOle) ?? now

    rows.push([
      id,
      r.CodContrato,
      numContrato,
      mapSituacaoContrato(r.Situacao),
      customerId,
      syncedAt,
      syncedAt,
      syncedAt,
    ])
  }

  // Verificar integridade: filtrar linhas cujo customer_id não existe no PG
  if (!DRY_RUN) {
    const pgIds = new Set((await pg.query('SELECT id FROM customers')).rows.map((r: any) => r.id))
    const antes = rows.length
    const rowsFiltradas = rows.filter(row => pgIds.has(row[4] as string))
    const removidos = antes - rowsFiltradas.length
    if (removidos > 0) log(step, `  ⚠ ${removidos} contratos com customer_id inexistente removidos`)
    // Atualizar contratoUuid para remover entradas que foram descartadas
    const idsDescartados = new Set(rows.filter(row => !pgIds.has(row[4] as string)).map(row => row[0] as string))
    for (const [k, v] of contratoUuid) { if (idsDescartados.has(v)) contratoUuid.delete(k) }
    const inserted = await pgBatchInsert('contratos', cols, rowsFiltradas,
      'ON CONFLICT (sql_server_id) DO UPDATE SET situacao = EXCLUDED.situacao, synced_at = EXCLUDED.synced_at, updated_at = now()')
    // Recarregar mapa do banco após upsert
    contratoUuid.clear()
    const resC = await pg.query('SELECT sql_server_id, id FROM contratos WHERE sql_server_id IS NOT NULL')
    for (const r of resC.rows) contratoUuid.set(Number(r.sql_server_id), r.id)
    log(step, `  Mapa recarregado do banco: ${contratoUuid.size} contratos`)
    log(step, `✓ ${inserted} inseridos / atualizados  |  ${skipped} ignorados  |  ${dupContrato} duplicados`)
  } else {
    const inserted = await pgBatchInsert('contratos', cols, rows,
      'ON CONFLICT (sql_server_id) DO UPDATE SET situacao = EXCLUDED.situacao, synced_at = EXCLUDED.synced_at, updated_at = now()')
    log(step, `✓ ${inserted} inseridos / atualizados  |  ${skipped} ignorados  |  ${dupContrato} números duplicados unificados`)
  }
}

// ─────────────────────────────────────────────────────────────────────────────

async function migrateJazigos(conn: sql.ConnectionPool): Promise<void> {
  const step = 'jazigos'
  log(step, 'Lendo Jazigos + Contratos_Jazigos + Gavetas...')

  // Contagem de gavetas por jazigo
  const gavetasResult = await conn.request().query(`
    SELECT CodJazigo, COUNT(*) AS QtdGavetas
    FROM dbo.Gavetas
    GROUP BY CodJazigo
  `)
  const gavetasPorJazigo = new Map<number, number>()
  for (const r of gavetasResult.recordset) {
    gavetasPorJazigo.set(r.CodJazigo, r.QtdGavetas)
  }

  // Jazigos com seus contratos (via tabela de ligação)
  const result = await conn.request().query(`
    SELECT
      j.CodJazigo,
      q.Quadra,
      j.Jazigo         AS CodigoJazigo,
      cj.CodContrato,
      cj.Valor         AS ValorContrato
    FROM dbo.Jazigos j
    INNER JOIN dbo.Quadras q ON q.CodQuadra = j.CodQuadra
    LEFT JOIN dbo.Contratos_Jazigos cj ON cj.CodJazigo = j.CodJazigo
    ORDER BY j.CodJazigo
  `)

  const cols = [
    'id', 'sql_server_id', 'codigo', 'quadra', 'setor',
    'quantidade_gavetas', 'valor_mensalidade',
    'contrato_id', 'synced_at', 'created_at', 'updated_at',
  ]
  const rows: unknown[][] = []
  let skipped = 0
  const now = new Date()


  // Um jazigo pode aparecer em múltiplos contratos — processa apenas uma vez por CodJazigo.
  // Também deduplica pelo código (Quadra-Jazigo) que tem constraint UNIQUE no banco.
  const jazigoProcessado = new Set<number>()
  const codigoJazigoVisto = new Set<string>()

  for (const r of result.recordset) {
    if (jazigoProcessado.has(r.CodJazigo)) continue
    jazigoProcessado.add(r.CodJazigo)

    const contratoId = contratoUuid.get(r.CodContrato)
    if (!contratoId) { skipped++; continue }

    const codigo = `${(r.Quadra as string)?.trim()}-${(r.CodigoJazigo as string)?.trim()}`
    if (codigoJazigoVisto.has(codigo)) { skipped++; continue }
    codigoJazigoVisto.add(codigo)

    const qtd = gavetasPorJazigo.get(r.CodJazigo) ?? 3
    const valor = valorPorGavetas(qtd)
    const id = uuidv4()
    jazigoUuid.set(r.CodJazigo, id)

    rows.push([
      id,
      r.CodJazigo,
      codigo,
      (r.Quadra as string)?.trim() || null,
      null,
      qtd,
      valor,
      contratoId,
      now, now, now,
    ])
  }

  await pgBatchInsert('jazigos', cols, rows,
    'ON CONFLICT (sql_server_id) DO UPDATE SET quantidade_gavetas = EXCLUDED.quantidade_gavetas, valor_mensalidade = EXCLUDED.valor_mensalidade, synced_at = EXCLUDED.synced_at, updated_at = now()')

  // Recarregar mapa do banco após upsert — garante UUIDs reais para FKs de pagamentos
  if (!DRY_RUN) {
    jazigoUuid.clear()
    const res = await pg.query('SELECT sql_server_id, id FROM jazigos WHERE sql_server_id IS NOT NULL')
    for (const r of res.rows) jazigoUuid.set(Number(r.sql_server_id), r.id)
    log(step, `  Mapa recarregado do banco: ${jazigoUuid.size} jazigos`)
  }
  log(step, `✓ ${rows.length} processados  |  ${skipped} ignorados`)
}

// ─────────────────────────────────────────────────────────────────────────────

async function migrateResponsaveisFinanceiros(conn: sql.ConnectionPool): Promise<void> {
  const step = 'responsaveis_financeiros'
  log(step, 'Lendo Cessionarios_Planos + Cessionarios_Planos_Responsavel...')

  // Busca planos que possuem responsável financeiro
  const result = await conn.request().query(`
    SELECT
      cp.CodCessionarioPlano,
      cp.CodCessionario,
      cpr.CPF            AS CpfResponsavel,
      cpr.Nome           AS NomeResponsavel,
      cpr.Motivo
    FROM dbo.Cessionarios_Planos cp
    INNER JOIN dbo.Cessionarios_Planos_Responsavel cpr
           ON cpr.CodCessionarioPlano = cp.CodCessionarioPlano
    WHERE cp.PossuiResponsavelFinanceiro = 1
  `)

  // Para cada responsável: verificar se já existe um Customer com esse CPF.
  // Se não existir, criar Customer com primeiroAcesso = true.
  // Depois criar o responsavel_financeiro vinculando pelo contrato.

  // Primeiro, buscar todos os CPFs existentes no Postgres
  const existingCpfs = DRY_RUN
    ? new Map<string, string>()
    : await (async () => {
        const res = await pg.query('SELECT cpf_cnpj, id FROM customers')
        return new Map(res.rows.map((r: { cpf_cnpj: string; id: string }) => [r.cpf_cnpj, r.id]))
      })()

  // Precisamos mapear CodCessionarioPlano → CodContrato
  const planosContratos = await conn.request().query(`
    SELECT cp.CodCessionarioPlano, cc.CodContrato
    FROM dbo.Cessionarios_Planos cp
    -- O plano está vinculado ao cessionário; o contrato é do cessionário mais recente
    INNER JOIN dbo.Contratos_Cessionarios cc ON cc.CodCessionario = cp.CodCessionario
    INNER JOIN (
      SELECT CodCessionario, MAX(CodContCess) AS MaxCC
      FROM dbo.Contratos_Cessionarios GROUP BY CodCessionario
    ) mx ON mx.MaxCC = cc.CodContCess
  `)
  const planoContratoMap = new Map<number, number>()
  for (const r of planosContratos.recordset) {
    planoContratoMap.set(r.CodCessionarioPlano, r.CodContrato)
  }

  // Novos Customers a criar
  const newCustomers: unknown[][] = []
  const newCustomerCols = [
    'id', 'cpf_cnpj', 'nome', 'primeiro_acesso', 'ativo',
    'synced_at', 'created_at', 'updated_at',
  ]

  // Responsaveis a criar
  const responsaveisRows: unknown[][] = []
  const responsaveisCols = [
    'id', 'contrato_id', 'customer_id', 'motivo',
    'synced_at', 'created_at', 'updated_at',
  ]

  const now = new Date()
  let skipped = 0
  let newCust = 0

  for (const r of result.recordset) {
    const cpf = normalizeCpf(r.CpfResponsavel)
    if (!cpf) { skipped++; continue }

    const codContrato = planoContratoMap.get(r.CodCessionarioPlano)
    if (!codContrato) { skipped++; continue }

    const contratoId = contratoUuid.get(codContrato)
    if (!contratoId) { skipped++; continue }

    // Resolve ou cria Customer para o responsável
    let customerId = existingCpfs.get(cpf)
    if (!customerId) {
      customerId = uuidv4()
      existingCpfs.set(cpf, customerId)
      newCustomers.push([
        customerId,
        cpf,
        (r.NomeResponsavel as string)?.trim(),
        true,  // primeiroAcesso = true — definirá senha no 1º login
        true,
        now, now, now,
      ])
      newCust++
    }

    // Deduplicar contrato_id: um contrato pode ter apenas um responsável.
    // Se aparecer mais de uma vez no lote (planos múltiplos), mantém o primeiro.
    const jaExiste = responsaveisRows.some(row => row[1] === contratoId)
    if (!jaExiste) {
      responsaveisRows.push([
        uuidv4(),
        contratoId,
        customerId,
        (r.Motivo as string)?.trim() || null,
        now, now, now,
      ])
    }
  }

  // 1) Inserir novos Customers (responsáveis sem cadastro)
  if (newCustomers.length > 0) {
    await pgBatchInsert('customers', newCustomerCols, newCustomers,
      'ON CONFLICT (cpf_cnpj) DO NOTHING')
    log(step, `  → ${newCust} novos customers criados para responsáveis financeiros`)
  }

  // 2) Inserir ResponsavelFinanceiro
  const inserted = await pgBatchInsert('responsaveis_financeiros', responsaveisCols, responsaveisRows,
    'ON CONFLICT (contrato_id) DO UPDATE SET customer_id = EXCLUDED.customer_id, motivo = EXCLUDED.motivo, updated_at = now()')
  log(step, `✓ ${inserted} inseridos / atualizados  |  ${skipped} ignorados`)
}

// ─────────────────────────────────────────────────────────────────────────────

async function migratePagamentos(conn: sql.ConnectionPool): Promise<void> {
  const step = 'pagamentos'
  log(step, 'Lendo Boletos (manutenção) + Contratos_Pagamentos (aquisição)...')

  // ── Manutenção: Boletos ──────────────────────────────────────────────────
  const boletos = await conn.request().query(`
    SELECT
      b.CodBoleto,
      b.CodCessionarioPlano,
      b.NossoNumero,
      b.DataVencimento,
      b.DataLiquid,
      b.ValorTitulo,
      b.ValorRecebido,
      b.ValorTarifa,
      b.JurosMora,
      b.Multas,
      b.Descontos,
      b.Situacao,
      cp.CodCessionario,
      cp.CodPlano
    FROM dbo.Boletos b
    INNER JOIN dbo.Cessionarios_Planos cp
           ON cp.CodCessionarioPlano = b.CodCessionarioPlano
    ORDER BY b.CodBoleto
  `)

  // Para boletos precisamos saber o jazigo via plano
  // Plano → Contrato → Jazigo (pega o primeiro jazigo do contrato)
  const jazigoDoContrato = await conn.request().query(`
    SELECT cj.CodContrato, MIN(cj.CodJazigo) AS CodJazigo
    FROM dbo.Contratos_Jazigos cj
    GROUP BY cj.CodContrato
  `)
  const jazigoParaContrato = new Map<number, number>()
  for (const r of jazigoDoContrato.recordset) {
    jazigoParaContrato.set(r.CodContrato, r.CodJazigo)
  }

  // Contrato mais recente do cessionário
  const contratoDoCessionario = await conn.request().query(`
    SELECT cc.CodCessionario, cc.CodContrato
    FROM dbo.Contratos_Cessionarios cc
    INNER JOIN (
      SELECT CodCessionario, MAX(CodContCess) AS MaxCC
      FROM dbo.Contratos_Cessionarios GROUP BY CodCessionario
    ) mx ON mx.MaxCC = cc.CodContCess
  `)
  const contratoParaCessionario = new Map<number, number>()
  for (const r of contratoDoCessionario.recordset) {
    contratoParaCessionario.set(r.CodCessionario, r.CodContrato)
  }

  const cols = [
    'id', 'sql_server_id', 'nosso_numero', 'valor_titulo', 'valor_pago',
    'valor_liquido', 'data_vencimento', 'data_pagamento', 'status', 'tipo',
    'customer_id', 'titular_contrato_id', 'jazigo_id', 'contrato_id',
    'created_at', 'updated_at',
  ]
  const rows: unknown[][] = []
  let skipped = 0
  const now = new Date()

  for (const r of boletos.recordset) {
    const customerId = cessionarioUuid.get(r.CodCessionario) ?? dbCustomerMap.get(r.CodCessionario)
    if (!customerId) { skipped++; continue }

    const codContrato = contratoParaCessionario.get(r.CodCessionario)
    const contratoId  = codContrato ? contratoUuid.get(codContrato) ?? null : null

    const codJazigo = codContrato ? jazigoParaContrato.get(codContrato) : null
    const jazigoId  = codJazigo   ? jazigoUuid.get(codJazigo) ?? null : null

    const dataVenc = oleToDate(r.DataVencimento)
    if (!dataVenc) { skipped++; continue } // boleto sem vencimento é inválido

    const dataPag  = oleToDate(r.DataLiquid)
    const status   = mapStatusBoleto(r.Situacao)

    // valorLiquido = recebido − tarifa bancária
    const valorLiquido = r.ValorRecebido > 0
      ? parseFloat((r.ValorRecebido - r.ValorTarifa).toFixed(2))
      : null

    rows.push([
      uuidv4(),
      r.CodBoleto,
      (r.NossoNumero as string)?.trim() || null,
      r.ValorTitulo,
      r.ValorRecebido > 0 ? r.ValorRecebido : null,
      valorLiquido,
      dataVenc,
      dataPag,
      status,
      'MANUTENCAO',
      customerId,
      customerId, // titular = pagador (responsável financeiro resolvido no service se diferente)
      jazigoId,
      contratoId,
      now, now,
    ])
  }

  const insertedBoletos = await pgBatchInsert('pagamentos', cols, rows,
    'ON CONFLICT (sql_server_id) DO UPDATE SET status = EXCLUDED.status, valor_pago = EXCLUDED.valor_pago, data_pagamento = EXCLUDED.data_pagamento, updated_at = now()')
  log(step, `  → ${insertedBoletos} boletos de manutenção inseridos  |  ${skipped} ignorados`)

  // ── Aquisição: Contratos_Pagamentos ────────────────────────────────────────
  const pagtos = await conn.request().query(`
    SELECT
      cp.CodPagto,
      cp.CodContrato,
      cp.ValorParcela,
      cp.Vencimento      AS VencimentoOle,
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
  let skippedAq = 0

  for (const r of pagtos.recordset) {
    const customerId = cessionarioUuid.get(r.CodCessionario) ?? dbCustomerMap.get(r.CodCessionario)
    if (!customerId) { skippedAq++; continue }

    const contratoId = contratoUuid.get(r.CodContrato)
    if (!contratoId) { skippedAq++; continue }

    const dataVenc = oleToDate(r.VencimentoOle)
    if (!dataVenc) { skippedAq++; continue }

    rowsAq.push([
      uuidv4(),
      null,            // sql_server_id — não há CodPagto único aqui
      null,            // nosso_numero
      r.ValorParcela,
      null,            // valor_pago
      null,            // valor_liquido
      dataVenc,
      null,            // data_pagamento
      'PAGO',          // Contratos_Pagamentos = parcelas já pagas da aquisição
      'AQUISICAO',
      customerId,
      customerId,
      null,            // jazigo_id
      contratoId,
      now, now,
    ])
  }

  const insertedAq = await pgBatchInsert('pagamentos', cols, rowsAq)
  log(step, `  → ${insertedAq} pagamentos de aquisição inseridos  |  ${skippedAq} ignorados`)
  log(step, `✓ Total pagamentos: ${insertedBoletos + insertedAq}`)
}

// ─────────────────────────────────────────────────────────────────────────────

async function writeSyncLog(
  jobName: string,
  status: 'SUCESSO' | 'FALHA',
  novos: number,
  atualizados: number,
  falhas: number,
  erros?: object[],
): Promise<void> {
  if (DRY_RUN) return
  await pg.query(`
    INSERT INTO sync_logs (id, job_name, status, registros_novos, registros_atualizados, falhas, erro_detalhes, data_fim)
    VALUES ($1, $2, $3::\"SyncStatus\", $4, $5, $6, $7, now())
  `, [uuidv4(), jobName, status, novos, atualizados, falhas, erros ? JSON.stringify(erros) : null])
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('═══════════════════════════════════════════════════════')
  console.log('  ETL SQL Server → PostgreSQL — Portal do Cessionário')
  console.log(`  Modo: ${DRY_RUN ? 'DRY RUN (somente leitura)' : 'PRODUÇÃO'}`)
  console.log(`  Batch size: ${BATCH}`)
  if (ONLY_STEP) console.log(`  Step único: ${ONLY_STEP}`)
  console.log('═══════════════════════════════════════════════════════\n')

  const mssql = await sql.connect(MSSQL_CONFIG)
  console.log('✓ Conectado ao SQL Server')

  if (!DRY_RUN) {
    await pg.query('SELECT 1')
    console.log('✓ Conectado ao PostgreSQL')
    await rehydrateMaps()
    console.log()
  }

  const steps: Array<[string, (c: sql.ConnectionPool) => Promise<void>]> = [
    ['customers',                migrateCustomers],
    ['customer_addresses',       migrateCustomerAddresses],
    ['customer_phones',          migrateCustomerPhones],
    ['contratos',                migrateContratos],
    ['jazigos',                  migrateJazigos],
    ['responsaveis_financeiros', migrateResponsaveisFinanceiros],
    ['pagamentos',               migratePagamentos],
  ]

  const errors: string[] = []
  const started = Date.now()

  for (const [name, fn] of steps) {
    if (ONLY_STEP && ONLY_STEP !== name) continue
    try {
      await fn(mssql)
    } catch (err) {
      const msg = `[${name}] ${(err as Error).message}`
      console.error(`✗ ERRO: ${msg}`)
      errors.push(msg)
    }
  }

  const elapsed = ((Date.now() - started) / 1000).toFixed(1)
  console.log(`\n══ Concluído em ${elapsed}s ${errors.length ? `(${errors.length} erros)` : '✓ sem erros'} ══`)

  if (!DRY_RUN) {
    await writeSyncLog(
      'full_migration',
      errors.length === 0 ? 'SUCESSO' : 'FALHA',
      0, 0, errors.length,
      errors.map(e => ({ motivo: e })),
    )
  }

  await mssql.close()
  await pg.end()
}

main().catch(err => {
  console.error('Erro fatal:', err)
  process.exit(1)
})
