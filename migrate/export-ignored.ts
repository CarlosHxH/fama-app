/**
 * export-ignored.ts — Exporta para CSV os registros do SQL Server ignorados/não-mapeados
 * durante a migração ETL, para análise manual de reconciliação.
 *
 * Uso:
 *   npm run export-ignored
 *   npx tsx --env-file=.env export-ignored.ts [--out=./reports/ignored-<timestamp>]
 *
 * Saída: pasta ./reports/ignored-<timestamp>/ com um CSV por categoria de ignorados.
 */

import sql from 'mssql'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════════════════════

const MSSQL_CONFIG: sql.config = {
  server:         process.env['MSSQL_HOST'] ?? '',
  user:           process.env['MSSQL_USER'] ?? '',
  password:       process.env['MSSQL_PASSWORD'] ?? '',
  database:       process.env['MSSQL_DB'] ?? '',
  options:        { trustServerCertificate: true, encrypt: false },
  pool:           { max: 3, min: 1 },
  requestTimeout: 120_000,
}

const OUT_DIR = process.argv.find(a => a.startsWith('--out='))?.split('=')[1]
  ?? `reports/ignored-${new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)}`

// Helper SQL para normalizar CPF (espelha normalizeCpf() do migrate.ts)
const STRIP_CPF = (col: string) =>
  `REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(${col},' ',''),'.',''),'-',''),'/',''),',','')`
const CPF_VALIDO = `LEN(${STRIP_CPF('c.CPF')}) >= 9`

// ═══════════════════════════════════════════════════════════════════════════════
// CSV
// ═══════════════════════════════════════════════════════════════════════════════

function toCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return ''
  const cols = Object.keys(rows[0]!)
  const escape = (v: unknown): string => {
    if (v === null || v === undefined) return ''
    const s = String(v)
    return s.includes(',') || s.includes('"') || s.includes('\n')
      ? `"${s.replace(/"/g, '""')}"` : s
  }
  const header = cols.join(',')
  const body   = rows.map(r => cols.map(c => escape(r[c])).join(',')).join('\n')
  return `${header}\n${body}\n`
}

function writeCsv(dir: string, filename: string, rows: Record<string, unknown>[]) {
  const path = join(dir, filename)
  writeFileSync(path, toCsv(rows), 'utf8')
  console.log(`  ✓  ${filename.padEnd(55)} ${String(rows.length).padStart(6)} linhas`)
}

function log(msg: string) {
  console.log(`[${new Date().toISOString()}] ${msg}`)
}

// ═══════════════════════════════════════════════════════════════════════════════
// QUERIES POR CATEGORIA
// ═══════════════════════════════════════════════════════════════════════════════

const EXPORTS: Array<{ file: string; label: string; query: string }> = [

  // ── customers ────────────────────────────────────────────────────────────────

  {
    file:  'customers__sem_cpf.csv',
    label: 'Cessionários sem CPF ou irrecuperáveis (< 9 dígitos — padding não resolve)',
    query: `
      SELECT
        c.CodCessionario,
        c.Cessionario   AS Nome,
        c.CPF           AS CPF_Original,
        ${STRIP_CPF('c.CPF')} AS CPF_Normalizado,
        LEN(${STRIP_CPF('c.CPF')}) AS CPF_Digitos,
        c.Email,
        c.DataAtualizacao
      FROM dbo.Cessionarios c
      WHERE c.CPF IS NULL
         OR LTRIM(RTRIM(c.CPF)) = ''
         OR LEN(${STRIP_CPF('c.CPF')}) < 9
      ORDER BY c.CodCessionario
    `,
  },

  {
    file:  'customers__cpf_duplicado.csv',
    label: 'Cessionários com CPF duplicado (não-canônicos — unificados na migração)',
    query: `
      WITH cpf_norm AS (
        SELECT
          CodCessionario,
          Cessionario AS Nome,
          CPF         AS CPF_Original,
          ${STRIP_CPF('CPF')} AS CPF_Normalizado,
          Email
        FROM dbo.Cessionarios
        WHERE CPF IS NOT NULL AND LEN(${STRIP_CPF('CPF')}) >= 9
      ),
      cpf_contagem AS (
        SELECT CPF_Normalizado, COUNT(*) AS Ocorrencias
        FROM cpf_norm
        GROUP BY CPF_Normalizado
        HAVING COUNT(*) > 1
      ),
      canonico AS (
        -- O canônico é o de menor CodCessionario (primeiro inserido) por CPF
        SELECT MIN(cn.CodCessionario) AS CodCanônico, cn.CPF_Normalizado
        FROM cpf_norm cn
        INNER JOIN cpf_contagem cc ON cc.CPF_Normalizado = cn.CPF_Normalizado
        GROUP BY cn.CPF_Normalizado
      )
      SELECT
        cn.CodCessionario,
        cn.Nome,
        cn.CPF_Original,
        cn.CPF_Normalizado,
        cc.Ocorrencias       AS Total_Ocorrencias_CPF,
        ca.CodCanônico       AS CodCessionario_Canonico,
        CASE WHEN cn.CodCessionario = ca.CodCanônico THEN 'Canônico' ELSE 'Duplicado/Ignorado' END AS Status
      FROM cpf_norm cn
      INNER JOIN cpf_contagem cc ON cc.CPF_Normalizado = cn.CPF_Normalizado
      INNER JOIN canonico     ca ON ca.CPF_Normalizado = cn.CPF_Normalizado
      ORDER BY cn.CPF_Normalizado, cn.CodCessionario
    `,
  },

  // ── customer_addresses ───────────────────────────────────────────────────────

  {
    file:  'customer_addresses__sem_customer.csv',
    label: 'Endereços de cessionários ignorados (sem CPF válido)',
    query: `
      SELECT
        e.CodCessionario,
        c.Cessionario    AS Nome,
        c.CPF            AS CPF_Original,
        e.TipoEndereco,
        e.Endereco,
        e.Complemento,
        e.Setor          AS Bairro,
        ci.Cidade,
        ci.UF,
        e.CEP,
        e.Correspondencia
      FROM dbo.Cessionarios_Enderecos e
      INNER JOIN dbo.Cessionarios c ON c.CodCessionario = e.CodCessionario
      LEFT  JOIN dbo.Cidades      ci ON ci.CodCidade     = e.CodCidade
      WHERE c.CPF IS NULL
         OR LTRIM(RTRIM(c.CPF)) = ''
         OR LEN(${STRIP_CPF('c.CPF')}) < 9
      ORDER BY e.CodCessionario
    `,
  },

  // ── customer_phones ──────────────────────────────────────────────────────────

  {
    file:  'customer_phones__sem_customer.csv',
    label: 'Telefones de cessionários ignorados (sem CPF válido)',
    query: `
      SELECT
        f.CodFone,
        f.CodCessionario,
        c.Cessionario AS Nome,
        c.CPF         AS CPF_Original,
        f.Tipo,
        f.Numero,
        f.Obs
      FROM dbo.Cessionarios_Fones f
      INNER JOIN dbo.Cessionarios c ON c.CodCessionario = f.CodCessionario
      WHERE c.CPF IS NULL
         OR LTRIM(RTRIM(c.CPF)) = ''
         OR LEN(${STRIP_CPF('c.CPF')}) < 9
      ORDER BY f.CodCessionario, f.CodFone
    `,
  },

  // ── contratos ────────────────────────────────────────────────────────────────

  {
    file:  'contratos__sem_numero.csv',
    label: 'Contratos sem NumContrato (ignorados)',
    query: `
      SELECT
        ct.CodContrato,
        ct.NumContrato,
        ct.Situacao,
        cc.CodCessionario,
        c.Cessionario AS Nome_Cessionario,
        c.CPF
      FROM dbo.Contratos ct
      LEFT JOIN (
        SELECT CodContrato, CodCessionario,
               ROW_NUMBER() OVER (PARTITION BY CodContrato ORDER BY DtContrato DESC) AS rn
        FROM dbo.Contratos_Cessionarios
      ) cc ON cc.CodContrato = ct.CodContrato AND cc.rn = 1
      LEFT JOIN dbo.Cessionarios c ON c.CodCessionario = cc.CodCessionario
      WHERE ct.NumContrato IS NULL OR LTRIM(RTRIM(ct.NumContrato)) = ''
      ORDER BY ct.CodContrato
    `,
  },

  {
    file:  'contratos__sem_customer_valido.csv',
    label: 'Contratos cujo cessionário mais recente não tem CPF válido',
    query: `
      SELECT
        ct.CodContrato,
        ct.NumContrato,
        ct.Situacao,
        cc.CodCessionario,
        c.Cessionario AS Nome_Cessionario,
        c.CPF         AS CPF_Original,
        LEN(${STRIP_CPF('c.CPF')}) AS CPF_Digitos,
        cc.DtContrato
      FROM dbo.Contratos ct
      INNER JOIN (
        SELECT CodContrato, CodCessionario, DtContrato,
               ROW_NUMBER() OVER (PARTITION BY CodContrato ORDER BY DtContrato DESC) AS rn
        FROM dbo.Contratos_Cessionarios
      ) cc ON cc.CodContrato = ct.CodContrato AND cc.rn = 1
      INNER JOIN dbo.Cessionarios c ON c.CodCessionario = cc.CodCessionario
      WHERE ct.NumContrato IS NOT NULL AND LTRIM(RTRIM(ct.NumContrato)) != ''
        AND (
          c.CPF IS NULL
          OR LTRIM(RTRIM(c.CPF)) = ''
          OR LEN(${STRIP_CPF('c.CPF')}) < 9
        )
      ORDER BY ct.CodContrato
    `,
  },

  {
    file:  'contratos__numero_duplicado.csv',
    label: 'Contratos com NumContrato duplicado (não-canônicos — unificados na migração)',
    query: `
      WITH num_contagem AS (
        SELECT LTRIM(RTRIM(NumContrato)) AS Num, COUNT(*) AS Ocorrencias
        FROM dbo.Contratos
        WHERE NumContrato IS NOT NULL AND LTRIM(RTRIM(NumContrato)) != ''
        GROUP BY LTRIM(RTRIM(NumContrato))
        HAVING COUNT(*) > 1
      ),
      canonico AS (
        SELECT MIN(ct.CodContrato) AS CodCanônico, LTRIM(RTRIM(ct.NumContrato)) AS Num
        FROM dbo.Contratos ct
        INNER JOIN num_contagem nc ON nc.Num = LTRIM(RTRIM(ct.NumContrato))
        GROUP BY LTRIM(RTRIM(ct.NumContrato))
      )
      SELECT
        ct.CodContrato,
        ct.NumContrato,
        ct.Situacao,
        nc.Ocorrencias    AS Total_Ocorrencias,
        ca.CodCanônico    AS CodContrato_Canonico,
        CASE WHEN ct.CodContrato = ca.CodCanônico THEN 'Canônico' ELSE 'Duplicado/Ignorado' END AS Status
      FROM dbo.Contratos ct
      INNER JOIN num_contagem nc ON nc.Num = LTRIM(RTRIM(ct.NumContrato))
      INNER JOIN canonico     ca ON ca.Num  = LTRIM(RTRIM(ct.NumContrato))
      ORDER BY ct.NumContrato, ct.CodContrato
    `,
  },

  // ── jazigos ───────────────────────────────────────────────────────────────────

  {
    file:  'jazigos__sem_contrato.csv',
    label: 'Jazigos sem vínculo a contrato válido (ignorados)',
    query: `
      SELECT
        j.CodJazigo,
        q.Quadra,
        j.Jazigo                               AS CodigoJazigo,
        CONCAT(q.Quadra, '-', j.Jazigo)        AS Codigo_Completo,
        cj.CodContrato,
        ct.NumContrato,
        ccr.CodCessionario,
        c.Cessionario                          AS Nome_Cessionario,
        c.CPF                                  AS CPF_Original,
        -- motivo do ignore
        CASE
          WHEN cj.CodContrato IS NULL THEN 'Sem Contratos_Jazigos'
          WHEN ct.CodContrato IS NULL THEN 'CodContrato inexistente'
          WHEN ct.NumContrato IS NULL OR LTRIM(RTRIM(ct.NumContrato)) = ''
               THEN 'NumContrato vazio'
          WHEN c.CPF IS NULL OR LEN(${STRIP_CPF('c.CPF')}) < 9
               THEN 'CPF do cessionário inválido'
          ELSE 'Outro'
        END AS Motivo_Ignorado
      FROM dbo.Jazigos j
      INNER JOIN dbo.Quadras q ON q.CodQuadra = j.CodQuadra
      LEFT  JOIN dbo.Contratos_Jazigos cj ON cj.CodJazigo = j.CodJazigo
      LEFT  JOIN dbo.Contratos         ct ON ct.CodContrato = cj.CodContrato
      LEFT  JOIN (
        SELECT CodContrato, CodCessionario,
               ROW_NUMBER() OVER (PARTITION BY CodContrato ORDER BY DtContrato DESC) AS rn
        FROM dbo.Contratos_Cessionarios
      ) ccr ON ccr.CodContrato = ct.CodContrato AND ccr.rn = 1
      LEFT  JOIN dbo.Cessionarios      c  ON c.CodCessionario = ccr.CodCessionario
      WHERE
        -- sem contrato_id no mapa = sem Contratos_Jazigos OU cessionário sem CPF válido
        cj.CodContrato IS NULL
        OR ct.CodContrato IS NULL
        OR (ct.NumContrato IS NULL OR LTRIM(RTRIM(ct.NumContrato)) = '')
        OR (c.CPF IS NULL OR LEN(${STRIP_CPF('c.CPF')}) < 9)
      ORDER BY j.CodJazigo
    `,
  },

  {
    file:  'jazigos__codigo_duplicado.csv',
    label: 'Jazigos com código (Quadra-Jazigo) duplicado (ignorados após o 1º)',
    query: `
      WITH codigos AS (
        SELECT
          j.CodJazigo,
          q.Quadra,
          j.Jazigo                        AS CodigoJazigo,
          CONCAT(q.Quadra,'-',j.Jazigo)   AS Codigo_Completo
        FROM dbo.Jazigos j
        INNER JOIN dbo.Quadras q ON q.CodQuadra = j.CodQuadra
      ),
      dup AS (
        SELECT Codigo_Completo, COUNT(*) AS Ocorrencias
        FROM codigos
        GROUP BY Codigo_Completo
        HAVING COUNT(*) > 1
      ),
      canonico AS (
        SELECT MIN(c.CodJazigo) AS CodCanônico, c.Codigo_Completo
        FROM codigos c
        INNER JOIN dup d ON d.Codigo_Completo = c.Codigo_Completo
        GROUP BY c.Codigo_Completo
      )
      SELECT
        cd.CodJazigo,
        cd.Quadra,
        cd.CodigoJazigo,
        cd.Codigo_Completo,
        d.Ocorrencias,
        ca.CodCanônico AS CodJazigo_Canonico,
        CASE WHEN cd.CodJazigo = ca.CodCanônico THEN 'Canônico' ELSE 'Duplicado/Ignorado' END AS Status
      FROM codigos cd
      INNER JOIN dup     d  ON d.Codigo_Completo = cd.Codigo_Completo
      INNER JOIN canonico ca ON ca.Codigo_Completo = cd.Codigo_Completo
      ORDER BY cd.Codigo_Completo, cd.CodJazigo
    `,
  },

  // ── responsaveis_financeiros ─────────────────────────────────────────────────

  {
    file:  'responsaveis__ignorados.csv',
    label: 'Responsáveis financeiros ignorados (sem CPF, sem plano/contrato, ou contrato duplicado)',
    query: `
      SELECT
        cp.CodCessionarioPlano,
        cp.CodCessionario,
        cpr.Nome          AS Nome_Responsavel,
        cpr.CPF           AS CPF_Responsavel,
        LEN(${STRIP_CPF('cpr.CPF')}) AS CPF_Digitos,
        cpr.Motivo,
        cc.CodContrato,
        ct.NumContrato,
        CASE
          WHEN cpr.CPF IS NULL OR LEN(${STRIP_CPF('cpr.CPF')}) < 9
               THEN 'CPF do responsável inválido'
          WHEN cc.CodContrato IS NULL THEN 'Sem contrato vinculado ao cessionário'
          WHEN ct.NumContrato IS NULL OR LTRIM(RTRIM(ct.NumContrato)) = ''
               THEN 'NumContrato do contrato vazio'
          ELSE 'Contrato duplicado (2º responsável por contrato)'
        END AS Motivo_Ignorado
      FROM dbo.Cessionarios_Planos cp
      INNER JOIN dbo.Cessionarios_Planos_Responsavel cpr
             ON cpr.CodCessionarioPlano = cp.CodCessionarioPlano
      LEFT JOIN (
        SELECT cc2.CodCessionario, cc2.CodContrato
        FROM dbo.Contratos_Cessionarios cc2
        INNER JOIN (
          SELECT CodCessionario, MAX(CodContCess) AS MaxCC
          FROM dbo.Contratos_Cessionarios GROUP BY CodCessionario
        ) mx ON mx.MaxCC = cc2.CodContCess
      ) cc ON cc.CodCessionario = cp.CodCessionario
      LEFT JOIN dbo.Contratos ct ON ct.CodContrato = cc.CodContrato
      WHERE cp.PossuiResponsavelFinanceiro = 1
        AND (
          cpr.CPF IS NULL
          OR LEN(${STRIP_CPF('cpr.CPF')}) < 9
          OR cc.CodContrato IS NULL
          OR ct.NumContrato IS NULL
          OR LTRIM(RTRIM(ct.NumContrato)) = ''
        )
      ORDER BY cp.CodCessionarioPlano
    `,
  },

  // ── pagamentos — boletos ─────────────────────────────────────────────────────

  {
    file:  'boletos__sem_customer.csv',
    label: 'Boletos ignorados — cessionário sem CPF válido',
    query: `
      SELECT
        b.CodBoleto,
        b.NossoNumero,
        b.DataVencimento,
        b.DataLiquid,
        b.ValorTitulo,
        b.ValorRecebido,
        b.Situacao,
        cp.CodCessionario,
        c.Cessionario AS Nome,
        c.CPF         AS CPF_Original,
        LEN(${STRIP_CPF('c.CPF')}) AS CPF_Digitos
      FROM dbo.Boletos b
      INNER JOIN dbo.Cessionarios_Planos cp ON cp.CodCessionarioPlano = b.CodCessionarioPlano
      INNER JOIN dbo.Cessionarios        c  ON c.CodCessionario       = cp.CodCessionario
      WHERE c.CPF IS NULL
         OR LTRIM(RTRIM(c.CPF)) = ''
         OR LEN(${STRIP_CPF('c.CPF')}) < 9
      ORDER BY b.CodBoleto
    `,
  },

  {
    file:  'boletos__sem_vencimento.csv',
    label: 'Boletos ignorados — DataVencimento nula ou zero (data inválida)',
    query: `
      SELECT
        b.CodBoleto,
        b.NossoNumero,
        b.DataVencimento,
        b.DataLiquid,
        b.ValorTitulo,
        b.ValorRecebido,
        b.Situacao,
        cp.CodCessionario,
        c.Cessionario AS Nome,
        c.CPF
      FROM dbo.Boletos b
      INNER JOIN dbo.Cessionarios_Planos cp ON cp.CodCessionarioPlano = b.CodCessionarioPlano
      INNER JOIN dbo.Cessionarios        c  ON c.CodCessionario       = cp.CodCessionario
      WHERE (b.DataVencimento IS NULL OR b.DataVencimento <= 0)
        AND c.CPF IS NOT NULL AND LEN(${STRIP_CPF('c.CPF')}) >= 9
      ORDER BY b.CodBoleto
    `,
  },

  // ── pagamentos — aquisições ───────────────────────────────────────────────────

  {
    file:  'aquisicoes__sem_customer.csv',
    label: 'Contratos_Pagamentos ignorados — cessionário sem CPF válido',
    query: `
      SELECT
        cp2.CodPagto,
        cp2.CodContrato,
        cp2.ValorParcela,
        cp2.Vencimento,
        cc.CodCessionario,
        c.Cessionario AS Nome,
        c.CPF         AS CPF_Original,
        LEN(${STRIP_CPF('c.CPF')}) AS CPF_Digitos
      FROM dbo.Contratos_Pagamentos cp2
      INNER JOIN (
        SELECT cc2.CodContrato, cc2.CodCessionario,
               ROW_NUMBER() OVER (PARTITION BY cc2.CodContrato ORDER BY cc2.DtContrato DESC) AS rn
        FROM dbo.Contratos_Cessionarios cc2
      ) cc ON cc.CodContrato = cp2.CodContrato AND cc.rn = 1
      INNER JOIN dbo.Cessionarios c ON c.CodCessionario = cc.CodCessionario
      WHERE c.CPF IS NULL
         OR LTRIM(RTRIM(c.CPF)) = ''
         OR LEN(${STRIP_CPF('c.CPF')}) < 9
      ORDER BY cp2.CodPagto
    `,
  },

  {
    file:  'aquisicoes__sem_contrato.csv',
    label: 'Contratos_Pagamentos ignorados — CodContrato sem mapeamento (NumContrato vazio ou sem cessionário)',
    query: `
      SELECT
        cp2.CodPagto,
        cp2.CodContrato,
        cp2.ValorParcela,
        cp2.Vencimento,
        ct.NumContrato,
        cc.CodCessionario,
        c.Cessionario AS Nome,
        c.CPF,
        CASE
          WHEN ct.CodContrato IS NULL THEN 'CodContrato inexistente em Contratos'
          WHEN ct.NumContrato IS NULL OR LTRIM(RTRIM(ct.NumContrato)) = ''
               THEN 'NumContrato vazio'
          WHEN cc.CodCessionario IS NULL THEN 'Sem cessionário vinculado'
          ELSE 'CPF do cessionário inválido'
        END AS Motivo_Ignorado
      FROM dbo.Contratos_Pagamentos cp2
      LEFT JOIN dbo.Contratos ct ON ct.CodContrato = cp2.CodContrato
      LEFT JOIN (
        SELECT cc2.CodContrato, cc2.CodCessionario,
               ROW_NUMBER() OVER (PARTITION BY cc2.CodContrato ORDER BY cc2.DtContrato DESC) AS rn
        FROM dbo.Contratos_Cessionarios cc2
      ) cc ON cc.CodContrato = cp2.CodContrato AND cc.rn = 1
      LEFT JOIN dbo.Cessionarios c ON c.CodCessionario = cc.CodCessionario
      WHERE ct.CodContrato IS NULL
         OR ct.NumContrato IS NULL
         OR LTRIM(RTRIM(ct.NumContrato)) = ''
         OR cc.CodCessionario IS NULL
         OR (c.CPF IS NULL OR LEN(${STRIP_CPF('c.CPF')}) < 9)
      ORDER BY cp2.CodPagto
    `,
  },

  {
    file:  'aquisicoes__sem_vencimento.csv',
    label: 'Contratos_Pagamentos ignorados — Vencimento nulo ou zero',
    query: `
      SELECT
        cp2.CodPagto,
        cp2.CodContrato,
        ct.NumContrato,
        cp2.ValorParcela,
        cp2.Vencimento,
        cc.CodCessionario,
        c.Cessionario AS Nome,
        c.CPF
      FROM dbo.Contratos_Pagamentos cp2
      INNER JOIN dbo.Contratos ct ON ct.CodContrato = cp2.CodContrato
      INNER JOIN (
        SELECT cc2.CodContrato, cc2.CodCessionario,
               ROW_NUMBER() OVER (PARTITION BY cc2.CodContrato ORDER BY cc2.DtContrato DESC) AS rn
        FROM dbo.Contratos_Cessionarios cc2
      ) cc ON cc.CodContrato = cp2.CodContrato AND cc.rn = 1
      INNER JOIN dbo.Cessionarios c ON c.CodCessionario = cc.CodCessionario
      WHERE (cp2.Vencimento IS NULL OR cp2.Vencimento <= 0)
        AND ct.NumContrato IS NOT NULL AND LTRIM(RTRIM(ct.NumContrato)) != ''
        AND c.CPF IS NOT NULL AND LEN(${STRIP_CPF('c.CPF')}) >= 9
      ORDER BY cp2.CodPagto
    `,
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log('\n══════════════════════════════════════════════════════════════')
  console.log('  Exportação de registros ignorados — SQL Server → CSV')
  console.log('══════════════════════════════════════════════════════════════')
  console.log(`  Saída: ${OUT_DIR}/\n`)

  mkdirSync(OUT_DIR, { recursive: true })

  const mssql = await sql.connect(MSSQL_CONFIG)
  log('✓ Conectado ao SQL Server')
  console.log()

  const summary: Array<{ file: string; rows: number; ok: boolean; erro?: string }> = []

  for (const exp of EXPORTS) {
    try {
      const result = await mssql.request().query(exp.query)
      const rows   = result.recordset as Record<string, unknown>[]
      writeCsv(OUT_DIR, exp.file, rows)
      summary.push({ file: exp.file, rows: rows.length, ok: true })
    } catch (err) {
      const msg = (err as Error).message
      console.error(`  ✗  ${exp.file.padEnd(55)} ERRO: ${msg}`)
      summary.push({ file: exp.file, rows: 0, ok: false, erro: msg })
    }
  }

  // Salva índice de resumo
  const indexLines = [
    'arquivo,linhas,status,erro',
    ...summary.map(s =>
      `${s.file},${s.rows},${s.ok ? 'OK' : 'ERRO'},"${s.erro ?? ''}"`
    ),
  ]
  writeFileSync(join(OUT_DIR, '_index.csv'), indexLines.join('\n') + '\n', 'utf8')

  const totalLinhas = summary.reduce((acc, s) => acc + s.rows, 0)
  const erros       = summary.filter(s => !s.ok).length

  console.log()
  console.log(`  Total exportado: ${totalLinhas} linhas  |  ${EXPORTS.length - erros} arquivos OK  |  ${erros} erros`)
  console.log(`  Índice:          ${OUT_DIR}/_index.csv`)
  console.log('══════════════════════════════════════════════════════════════\n')

  await mssql.close()
}

main().catch(err => {
  console.error('\n✗ Erro fatal:', err)
  process.exit(1)
})
