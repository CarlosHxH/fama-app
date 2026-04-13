# Remapeamento SQL Server → PostgreSQL (`fama-app`)

Este documento descreve como os dados do legado **SQL Server** são sincronizados nas **tabelas de domínio** do **PostgreSQL** da aplicação Fama.

## Objetivo

- **Origem:** tabelas `dbo.*` no SQL Server (ex.: `DB_Fama`).
- **Destino:** modelos Prisma com `@@map` em português/inglês alinhados à BD: `Customer` (`customers`), `CustomerPlan` (`customer_plans`), `Invoice` (tabela física **`fatura`**, PK `cod_boleto`), `FinancialResponsible`, `Address`, `Phone`, etc.
- **Auditoria:** cada execução do job regista uma linha em **`SyncRun`** (tabela **`sync_runs`**, campo `job_name` típico `sync-sqlserver-to-postgres`).

O conjunto de queries e ordem de execução está em [`src/jobs/sqlserver-sync/sync-mappings.ts`](../src/jobs/sqlserver-sync/sync-mappings.ts) e [`src/jobs/sqlserver-sync/domain-sync-order.ts`](../src/jobs/sqlserver-sync/domain-sync-order.ts). O mapeamento por linha e upserts ficam em [`src/jobs/sqlserver-sync/domain-upsert.ts`](../src/jobs/sqlserver-sync/domain-upsert.ts).

**Nota:** o id do mapeamento ETL **`boletos`** refere-se apenas à **fonte** `dbo.Boletos`; os dados gravam-se na tabela Postgres **`fatura`** (model Prisma `Invoice`).

## Modelo no Postgres (Prisma)

Ver [`prisma/schema.prisma`](../prisma/schema.prisma). Destaques:

| Origem MSSQL (exemplo) | Destino Prisma / t física |
|------------------------|---------------------------|
| `dbo.Cessionarios` | `Customer` → `customers` |
| `dbo.Cessionarios_Planos` | `CustomerPlan` → `customer_plans` |
| `dbo.Boletos` | `Invoice` → **`fatura`** |
| `dbo.Cessionarios_Planos_Responsavel` | `FinancialResponsible` → `financial_responsible` |
| `dbo.Cessionarios_Enderecos` / `Fones` | `Address` / `Phone` |

Colunas reais de `dbo.Cessionarios` no export de schema: nome em **`Cessionario`**, documento em **`CPF`**, contacto em **`Email`** (não assumir apenas `Nome` / `CpfCnpj`).

## Fluxo do job

1. Carrega variáveis de ambiente ([`src/jobs/sqlserver-sync/job-env.ts`](../src/jobs/sqlserver-sync/job-env.ts)).
2. Opcional: healthcheck TCP até ao SQL Server (VPN/rota).
3. Cria registo `sync_runs` em estado `RUNNING`.
4. Abre pool MSSQL, percorre só os mapeamentos de domínio (ordem em `domain-sync-order.ts`).
5. Por linha: `transform` (datas legadas) → upsert Prisma na tabela de domínio correspondente.
6. Atualiza `sync_runs` com `SUCCESS`, `PARTIAL` ou `FAILED`.

Entrypoint: [`scripts/jobs/sync-sqlserver-to-postgres.ts`](../scripts/jobs/sync-sqlserver-to-postgres.ts)  
Comando típico: `npm run job:sync-sqlserver`

**Agendamento:** [`GET /api/cron/sync-sqlserver`](../src/app/api/cron/sync-sqlserver/route.ts) com `Authorization: Bearer <CRON_SECRET>`.

Variáveis: [`.env.example`](../.env.example) (`DATABASE_URL`, MSSQL, `SQL_SYNC_BATCH_SIZE`, etc.).

## Chave natural (`sourceKey`)

Usada para logs e idempotência lógica; ver [`src/jobs/sqlserver-sync/transform.ts`](../src/jobs/sqlserver-sync/transform.ts) (`rowToSourceKeyFromSpec`). A chave é case-insensitive relativamente às colunas do resultset.

## Tabela de mapeamentos (estático)

Ordem de execução no job de domínio ≠ ordem completa em `STATIC_MAPPINGS` (catálogos podem existir na lista mas não serem executados pelo ETL de domínio).

| ID (`id`) | Tabela SQL Server | Chave | Notas |
|-----------|-------------------|-------|--------|
| `cessionarios` | `dbo.Cessionarios` | `CodCessionario` | → `customers` |
| `cessionarios-planos` | `dbo.Cessionarios_Planos` | `CodCessionarioPlano` | → `customer_plans`; datas YYYYMMDD → `*_as_isodate` |
| `cessionarios-planos-responsavel` | `dbo.Cessionarios_Planos_Responsavel` | `CodCessionarioPlano` | → `financial_responsible` |
| `boletos` | `dbo.Boletos` | `CodBoleto` | → **`fatura`** / `Invoice`; datas YYYYMMDD → `*_as_isodate` |
| `cessionarios-enderecos` | `dbo.Cessionarios_Enderecos` | composta | → `addresses` (replace por cliente) |
| `cessionarios-fones` | `dbo.Cessionarios_Fones` | `CodFone` | → `phones` (replace por cliente) |

Outros ids em `STATIC_MAPPINGS` (`planos`, `cfg-*`, …) podem servir de referência ou futuras extensões.

### Mapeamento opcional via ambiente

Se `MSSQL_SYNC_DEMO_QUERY` estiver definida, é acrescentado um mapeamento extra `env-demo`. O pipeline de domínio não o inclui por defeito.

## Datas legadas (inteiro `YYYYMMDD`)

[`src/jobs/sqlserver-sync/legacy-dates.ts`](../src/jobs/sqlserver-sync/legacy-dates.ts): `dbo.Boletos` e `dbo.Cessionarios_Planos` — campos auxiliares `*_as_isodate`.

## Consultas úteis no Postgres

```sql
-- Últimas execuções do job
SELECT * FROM sync_runs ORDER BY started_at DESC LIMIT 20;

-- Amostra de faturas (tabela física fatura)
SELECT cod_boleto, plan_id, due_date, status, valor_titulo
FROM fatura
ORDER BY cod_boleto DESC
LIMIT 20;
```

## Ficheiros relacionados

| Ficheiro | Papel |
|----------|--------|
| [`sync-mappings.ts`](../src/jobs/sqlserver-sync/sync-mappings.ts) | Queries MSSQL e ids de mapeamento |
| [`domain-sync-order.ts`](../src/jobs/sqlserver-sync/domain-sync-order.ts) | Ordem dos mapeamentos de domínio |
| [`domain-upsert.ts`](../src/jobs/sqlserver-sync/domain-upsert.ts) | Upserts Prisma |
| [`run-sync.ts`](../src/jobs/sqlserver-sync/run-sync.ts) | Pool, `sync_runs`, loop |
| [`job-env.ts`](../src/jobs/sqlserver-sync/job-env.ts) | Env do job |
| [`prisma/schema.prisma`](../prisma/schema.prisma) | Modelos e `@@map` (`fatura`, …) |
