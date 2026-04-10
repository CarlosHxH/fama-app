import type { JobEnv } from "./job-env";
import {
  enrichLegacyIntDates,
  LEGACY_DATE_COLUMNS_BOLETOS,
  LEGACY_DATE_COLUMNS_CESSIONARIOS_PLANOS,
} from "./legacy-dates";
import type { KeySpec } from "./transform";

/**
 * Mapeamentos SQL Server → `MssqlSyncRecord` (payload JSON por linha).
 *
 * **Cobrança (Fase 1–2):** núcleo `Boletos` ↔ `Cessionarios_Planos` ↔ `Cessionarios` + catálogos
 * e satélites (ver schema exportado `schema_20260409_004629.json`).
 *
 * **Armazenamento:** mantém-se **apenas** `MssqlSyncRecord` + `SyncRun`; não são criados
 * modelos Prisma espelhados por tabela legada nesta fase. Para relatórios tipados ou
 * integração Asaas, pode-se acrescentar depois ETL para tabelas Postgres dedicadas.
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
    id: "boletos",
    sourceTable: "dbo.Boletos",
    keyColumn: "CodBoleto",
    sourceQuery: `SELECT * FROM dbo.Boletos WITH (NOLOCK)`,
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
    sourceQuery: `SELECT * FROM dbo.Cessionarios_Enderecos WITH (NOLOCK)`,
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
    sourceQuery: `SELECT * FROM dbo.Cessionarios_Planos_Responsavel WITH (NOLOCK)`,
  },
  {
    id: "cessionarios-planos-responsavel-fones",
    sourceTable: "dbo.Cessionarios_Planos_Responsavel_Fones",
    keyColumn: "CodFone",
    sourceQuery: `SELECT * FROM dbo.Cessionarios_Planos_Responsavel_Fones WITH (NOLOCK)`,
  },
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
