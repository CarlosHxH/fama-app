/**
 * patch-phones.ts — Insere no PostgreSQL os telefones ignorados na migração
 * cujo customer agora existe (lookup por sql_server_id = CodCessionario).
 *
 * Uso:
 *   npx tsx --env-file=.env patch-phones.ts [--csv=<caminho>] [--dry-run]
 *
 * O CSV de entrada é o customer_phones__sem_customer.csv gerado por export-ignored.ts.
 */

import { Pool } from 'pg'
import { readFileSync, writeFileSync } from 'fs'
import { v4 as uuidv4 } from 'uuid'

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════════════════════

const pgPool = new Pool({
  connectionString:        process.env['DATABASE_URL'] ?? '',
  max:                     5,
  idleTimeoutMillis:       30_000,
  connectionTimeoutMillis: 10_000,
})

const CSV_PATH = process.argv.find(a => a.startsWith('--csv='))?.split('=')[1]
  ?? 'reports/ignoreds/ignored-2026-04-18T06-31-00/customer_phones__sem_customer.csv'

const DRY_RUN = process.argv.includes('--dry-run')

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

function parseCsv(path: string): Record<string, string>[] {
  const lines = readFileSync(path, 'utf8').split('\n').filter(l => l.trim())
  const headers = lines[0]!.split(',')
  return lines.slice(1).map(line => {
    // CSV simples — sem aspas complexas neste arquivo
    const vals = line.split(',')
    return Object.fromEntries(headers.map((h, i) => [h, (vals[i] ?? '').trim()]))
  })
}

function mapTipo(raw: string): 'WHATSAPP' | 'CELULAR' | 'FIXO' {
  const u = raw.toUpperCase()
  if (u.includes('WHATSAPP') || u.includes('WAPP')) return 'WHATSAPP'
  if (u.includes('CELULAR')  || u.includes('CEL'))  return 'CELULAR'
  return 'FIXO'
}

function log(msg: string) {
  console.log(`[${new Date().toISOString()}] ${msg}`)
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log('\n══════════════════════════════════════════════════════════════')
  console.log('  Patch: telefones ignorados → PostgreSQL')
  console.log(`  CSV:     ${CSV_PATH}`)
  console.log(`  Modo:    ${DRY_RUN ? 'DRY RUN' : 'PRODUÇÃO'}`)
  console.log('══════════════════════════════════════════════════════════════\n')

  const rows = parseCsv(CSV_PATH)
  log(`${rows.length} telefones lidos do CSV`)

  // Coleta CodCessionarios únicos e busca UUIDs no PG via sql_server_id
  const codIds = [...new Set(rows.map(r => Number(r['CodCessionario'])))]

  const pgRes = await pgPool.query<{ id: string; sql_server_id: number }>(
    `SELECT id, sql_server_id FROM customers WHERE sql_server_id = ANY($1)`,
    [codIds]
  )
  const sqlIdToUuid = new Map<number, string>()
  for (const r of pgRes.rows) sqlIdToUuid.set(r['sql_server_id'], r['id'])

  log(`${sqlIdToUuid.size} de ${codIds.length} CodCessionarios encontrados no PG`)

  const toInsert:  typeof rows = []
  const semMatch:  typeof rows = []

  for (const r of rows) {
    const uuid = sqlIdToUuid.get(Number(r['CodCessionario']))
    if (uuid) toInsert.push({ ...r, _customerId: uuid })
    else      semMatch.push(r)
  }

  log(`→ ${toInsert.length} telefones com customer no PG`)
  log(`→ ${semMatch.length} telefones SEM customer no PG (irrecuperáveis agora)`)

  // ── Inserção ────────────────────────────────────────────────────────────────
  let inseridos  = 0
  let duplicados = 0
  const now = new Date()

  if (!DRY_RUN && toInsert.length > 0) {
    const client = await pgPool.connect()
    try {
      await client.query('BEGIN')

      for (const r of toInsert) {
        const res = await client.query(
          `INSERT INTO customer_phones
             (id, sql_server_id, customer_id, tipo, numero, observacoes, synced_at, created_at, updated_at)
           VALUES ($1, $2, $3, $4::\"TipoTelefone\", $5, $6, $7, $7, $7)
           ON CONFLICT (sql_server_id) DO NOTHING`,
          [
            uuidv4(),
            Number(r['CodFone']),
            r['_customerId'],
            mapTipo(r['Tipo'] ?? ''),
            r['Numero'] ?? '',
            r['Obs'] || null,
            now,
          ]
        )
        if ((res.rowCount ?? 0) > 0) inseridos++
        else duplicados++
      }

      await client.query('COMMIT')
    } catch (err) {
      await client.query('ROLLBACK')
      throw err
    } finally {
      client.release()
    }
  } else if (DRY_RUN) {
    inseridos = toInsert.length
    log('(dry-run — nada gravado)')
  }

  // ── Relatório ───────────────────────────────────────────────────────────────
  console.log('\n══════════════════════════════════════════════════════════════')
  console.log(`  Inseridos:           ${inseridos}`)
  console.log(`  Já existiam (skip):  ${duplicados}`)
  console.log(`  Sem customer no PG:  ${semMatch.length}`)
  console.log('══════════════════════════════════════════════════════════════\n')

  // Salva CSV residual com os que ainda não têm customer
  if (semMatch.length > 0) {
    const outPath = CSV_PATH.replace('.csv', '__residual.csv')
    const header  = Object.keys(semMatch[0]!).join(',')
    const body    = semMatch.map(r => Object.values(r).join(',')).join('\n')
    writeFileSync(outPath, `${header}\n${body}\n`, 'utf8')
    log(`Residual salvo em ${outPath}`)
  }

  await pgPool.end()
}

main().catch(err => {
  console.error('\n✗ Erro fatal:', err)
  process.exit(1)
})
