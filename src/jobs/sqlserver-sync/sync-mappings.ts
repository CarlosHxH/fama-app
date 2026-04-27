import type { JobEnv } from "./job-env";
import {
  enrichLegacyIntDates,
  LEGACY_DATE_COLUMNS_BOLETOS,
  LEGACY_DATE_COLUMNS_CESSIONARIOS_PLANOS,
} from "./legacy-dates";
import type { KeySpec } from "./transform";

/**
 * Mapeamentos SQL Server → linhas de domínio Prisma (`Customer`, `Contrato`, `Jazigo`, `Pagamento`, …).
 *
 * O job `runSync` executa apenas o subconjunto definido em `domain-sync-order.ts`; as restantes
 * entradas servem de referência ou para extensões futuras.
 */
export type SyncMapping = KeySpec & {
  id: string;
  sourceQuery: string;
  /** Ex.: `dbo.Boletos` — identifica o payload em `MssqlSyncRecord.sourceTable`. */
  sourceTable: string;
  transform?: (row: Record<string, unknown>) => Record<string, unknown>;
};

/**
 * Fase 1 (núcleo) + Fase 2 (catálogos, bancos, contactos, responsável financeiro) + Jazigos.
 */
export const STATIC_MAPPINGS: SyncMapping[] = [
  /* --- Fase 1: catálogos antes dos factos (opcional para FK lógica) --- */
  {
    id: "cfg-formas-pagto",
    sourceTable: "dbo.Cfg_Formas_Pagto",
    keyColumn: "CodForma",
    sourceQuery: `SELECT * FROM dbo.Cfg_Formas_Pagto WITH (NOLOCK)`,
  },
  {
    id: "cfg-periodicidade",
    sourceTable: "dbo.Cfg_Periodicidade",
    keyColumn: "CodPeriodicidade",
    sourceQuery: `SELECT * FROM dbo.Cfg_Periodicidade WITH (NOLOCK)`,
  },
  {
    id: "planos",
    sourceTable: "dbo.Planos",
    keyColumn: "CodPlano",
    sourceQuery: `SELECT * FROM dbo.Planos WITH (NOLOCK)`,
  },
  {
    id: "cessionarios",
    sourceTable: "dbo.Cessionarios",
    keyColumn: "CodCessionario",
    sourceQuery: `SELECT * FROM dbo.Cessionarios WITH (NOLOCK)`,
  },
  {
    id: "cessionarios-planos",
    sourceTable: "dbo.Cessionarios_Planos",
    keyColumn: "CodCessionarioPlano",
    sourceQuery: `SELECT * FROM dbo.Cessionarios_Planos WITH (NOLOCK)`,
    transform: (row) =>
      enrichLegacyIntDates(row, LEGACY_DATE_COLUMNS_CESSIONARIOS_PLANOS),
  },
  {
    /** Origem MSSQL; no Postgres os registos vão para `pagamentos`. */
    id: "boletos",
    sourceTable: "dbo.Boletos",
    keyColumn: "CodBoleto",
    sourceQuery: `
SELECT b.*,
  (
    SELECT TOP 1 cc.CodContrato
    FROM dbo.Cessionarios_Planos cp WITH (NOLOCK)
    INNER JOIN dbo.Contratos_Cessionarios cc WITH (NOLOCK)
      ON cp.CodCessionario = cc.CodCessionario
    WHERE cp.CodCessionarioPlano = b.CodCessionarioPlano
    ORDER BY cc.CodContrato
  ) AS CodContrato
FROM dbo.Boletos b WITH (NOLOCK)
`.trim(),
    transform: (row) => enrichLegacyIntDates(row, LEGACY_DATE_COLUMNS_BOLETOS),
  },

  /* --- Fase 2 --- */
  {
    id: "par-taxas",
    sourceTable: "dbo.Par_Taxas",
    keyColumn: "CodTaxa",
    sourceQuery: `SELECT * FROM dbo.Par_Taxas WITH (NOLOCK)`,
  },
  {
    id: "planos-taxas-manutencao",
    sourceTable: "dbo.Planos_TaxasManutencao",
    keyColumns: ["CodPlano", "CodPeriodicidade"],
    sourceQuery: `SELECT * FROM dbo.Planos_TaxasManutencao WITH (NOLOCK)`,
  },
  {
    id: "cad-bancos",
    sourceTable: "dbo.Cad_Bancos",
    keyColumn: "NumBanco",
    sourceQuery: `SELECT * FROM dbo.Cad_Bancos WITH (NOLOCK)`,
  },
  {
    id: "cad-bancos-contas",
    sourceTable: "dbo.Cad_Bancos_Contas",
    keyColumn: "CodConta",
    sourceQuery: `SELECT * FROM dbo.Cad_Bancos_Contas WITH (NOLOCK)`,
  },
  {
    id: "cidades",
    sourceTable: "dbo.Cidades",
    keyColumn: "CodCidade",
    sourceQuery: `SELECT * FROM dbo.Cidades WITH (NOLOCK)`,
  },
  {
    id: "cessionarios-enderecos",
    sourceTable: "dbo.Cessionarios_Enderecos",
    keyColumns: ["CodCessionario", "TipoEndereco"],
    sourceQuery: `
SELECT e.*,
  c.Cidade,
  c.UF
FROM dbo.Cessionarios_Enderecos e WITH (NOLOCK)
LEFT JOIN dbo.Cidades c WITH (NOLOCK) ON e.CodCidade = c.CodCidade
`.trim(),
  },
  {
    id: "cessionarios-fones",
    sourceTable: "dbo.Cessionarios_Fones",
    keyColumn: "CodFone",
    sourceQuery: `SELECT * FROM dbo.Cessionarios_Fones WITH (NOLOCK)`,
  },
  {
    id: "cessionarios-planos-responsavel",
    sourceTable: "dbo.Cessionarios_Planos_Responsavel",
    keyColumn: "CodCessionarioPlano",
    sourceQuery: `
SELECT r.*,
  (
    SELECT TOP 1 cc.CodContrato
    FROM dbo.Cessionarios_Planos cp WITH (NOLOCK)
    INNER JOIN dbo.Contratos_Cessionarios cc WITH (NOLOCK)
      ON cp.CodCessionario = cc.CodCessionario
    WHERE cp.CodCessionarioPlano = r.CodCessionarioPlano
    ORDER BY cc.CodContrato
  ) AS CodContrato
FROM dbo.Cessionarios_Planos_Responsavel r WITH (NOLOCK)
`.trim(),
  },
  {
    id: "cessionarios-planos-responsavel-fones",
    sourceTable: "dbo.Cessionarios_Planos_Responsavel_Fones",
    keyColumn: "CodFone",
    sourceQuery: `SELECT * FROM dbo.Cessionarios_Planos_Responsavel_Fones WITH (NOLOCK)`,
  },
  /**
   * Contrato na cadeia legada `dbo.Contratos` + cessionário titular (`Contratos_Cessionarios`).
   * Um `CodContrato` pode ter vários cessionários; usa-se o menor `CodCessionario` como titular sintético.
   */
  {
    id: "contratos",
    sourceTable: "dbo.Contratos",
    keyColumn: "CodContrato",
    sourceQuery: `
SELECT c.CodContrato, c.NumContrato, c.Valor, c.Situacao, x.CodCessionario
FROM dbo.Contratos c WITH (NOLOCK)
INNER JOIN (
  SELECT CodContrato, MIN(CodCessionario) AS CodCessionario
  FROM dbo.Contratos_Cessionarios WITH (NOLOCK)
  GROUP BY CodContrato
) x ON c.CodContrato = x.CodContrato
`.trim(),
  },
  /**
   * Vínculo real jazigo ↔ contrato (`Contratos_Jazigos`) + dados do jazigo e da quadra.
   */
  {
    id: "contratos-jazigos",
    sourceTable: "dbo.Contratos_Jazigos",
    keyColumns: ["CodContrato", "CodJazigo"],
    sourceQuery: `
SELECT
  cj.CodContrato,
  cj.CodJazigo,
  cj.Valor AS ValorVinculoContratoJazigo,
  j.CodQuadra,
  j.Jazigo,
  j.Obs AS ObsJazigo,
  q.Quadra AS NomeQuadra,
  (
    SELECT TOP 1 cp.CodCessionarioPlano
    FROM dbo.Contratos_Cessionarios cc WITH (NOLOCK)
    INNER JOIN dbo.Cessionarios_Planos cp WITH (NOLOCK)
      ON cp.CodCessionario = cc.CodCessionario
    WHERE cc.CodContrato = cj.CodContrato
    ORDER BY cp.CodCessionarioPlano
  ) AS CodCessionarioPlano
FROM dbo.Contratos_Jazigos cj WITH (NOLOCK)
INNER JOIN dbo.Jazigos j WITH (NOLOCK) ON cj.CodJazigo = j.CodJazigo
LEFT JOIN dbo.Quadras q WITH (NOLOCK) ON j.CodQuadra = q.CodQuadra
`.trim(),
  },
  /**
   * Referência: jazigos sem vínculo em `Contratos_Jazigos` não entram no sync de domínio
   * (Prisma exige `contratoId`). Mantido para extensões / demo env.
   */
  {
    id: "jazigos",
    sourceTable: "dbo.Jazigos",
    keyColumn: "CodJazigo",
    sourceQuery: `SELECT * FROM dbo.Jazigos WITH (NOLOCK)`,
  },
];

export function getSyncMappings(env: JobEnv): SyncMapping[] {
  const fromEnv: SyncMapping[] = [];
  const q = env.MSSQL_SYNC_DEMO_QUERY?.trim();
  if (q) {
    const st = env.MSSQL_SYNC_DEMO_SOURCE_TABLE?.trim();
    const kc = env.MSSQL_SYNC_DEMO_KEY_COLUMN?.trim();
    fromEnv.push({
      id: "env-demo",
      sourceQuery: q,
      sourceTable: st && st.length > 0 ? st : "demo",
      keyColumn: kc && kc.length > 0 ? kc : "id",
    });
  }
  return [...STATIC_MAPPINGS, ...fromEnv];
}
