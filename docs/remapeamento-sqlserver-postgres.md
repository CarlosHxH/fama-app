# Remapeamento SQL Server → PostgreSQL (`fama-app`)

Este documento descreve como os dados do legado **SQL Server** são espelhados no **PostgreSQL** da aplicação Fama.

## Objetivo

- **Origem:** tabelas `dbo.*` no SQL Server (ex.: `DB_Fama`).
- **Destino:** uma única tabela genérica **`MssqlSyncRecord`** (física: **`registros_sync_mssql`**), com o conteúdo da linha em **`payload` (JSON)**.
- **Auditoria:** cada execução do job regista uma linha em **`SyncRun`** (física: **`execucoes_sincronizacao`**).

Não existe, nesta fase, uma tabela Postgres por tabela SQL Server: o “remapeamento” é **lógico** (identificação por `sourceTable` + `sourceKey`) e **documentado em código** em [`src/jobs/sqlserver-sync/sync-mappings.ts`](../src/jobs/sqlserver-sync/sync-mappings.ts).

## Modelo no Postgres (Prisma)

No PostgreSQL, a tabela física dos espelhos chama-se **`registros_sync_mssql`** (modelo Prisma `MssqlSyncRecord`). As execuções do job ficam em **`execucoes_sincronizacao`** (`SyncRun`). Isto segue o estilo de nomes legíveis do desenho Claude (`cessionarios`, `sync_logs`, etc.), via `@@map` no [`schema.prisma`](../prisma/schema.prisma).

| Campo         | Função |
|---------------|--------|
| `sourceTable` | Identificador estável da origem (ex.: `dbo.Boletos`). |
| `sourceKey`   | Chave natural da linha (uma coluna ou composta, ver abaixo). |
| `payload`     | Objeto JSON com as colunas retornadas pelo `SELECT` (após `transform`, se existir). |
| `syncedAt` / `updatedAt` | Metadados de sincronização. |

Restrição: **`@@unique([sourceTable, sourceKey])`** — reexecuções fazem **upsert** (atualizam o mesmo registo).

## Fluxo do job

1. Carrega variáveis de ambiente ([`src/jobs/sqlserver-sync/job-env.ts`](../src/jobs/sqlserver-sync/job-env.ts)).
2. Opcional: healthcheck TCP até ao SQL Server (VPN/rota).
3. Abre pool MSSQL, percorre os mapeamentos na ordem definida.
4. Para cada mapeamento: `SELECT` com `WITH (NOLOCK)`, uma linha → um **`upsert`** em `MssqlSyncRecord` (sem transação interativa em lote, para evitar timeout em tabelas grandes).
5. Atualiza `SyncRun` com `SUCCESS` ou `FAILED`.

Entrypoint: [`scripts/jobs/sync-sqlserver-to-postgres.ts`](../scripts/jobs/sync-sqlserver-to-postgres.ts)  
Comando típico: `npm run job:sync-sqlserver` ou `bun scripts/jobs/sync-sqlserver-to-postgres.ts`

**Agendamento (ex.: diário):** em ambientes Vercel, existe [`vercel.json`](../vercel.json) com cron às 06:00 UTC para [`GET /api/cron/sync-sqlserver`](../src/app/api/cron/sync-sqlserver/route.ts). Defina `CRON_SECRET` e envie `Authorization: Bearer <CRON_SECRET>`. Em outros hosts, use systemd, Windows Task Scheduler ou o mesmo endpoint com o mesmo segredo.

Variáveis: ver comentários em [`.env.example`](../.env.example) (ex.: `DATABASE_URL`, MSSQL, `SQL_SYNC_BATCH_SIZE` como intervalo de log).

## Chave natural (`sourceKey`)

- **Uma coluna:** `keyColumn` — valor convertido para string (número, bigint, string, `Date` → ISO).
- **Várias colunas:** `keyColumns` — valores concatenados com **`|`** (ex.: `12|3`).

Definição em [`src/jobs/sqlserver-sync/transform.ts`](../src/jobs/sqlserver-sync/transform.ts) (`rowToSourceKeyFromSpec`).

## Tabela de mapeamentos (estático)

Ordem de execução = ordem no array `STATIC_MAPPINGS`. Query padrão: `SELECT * FROM <tabela> WITH (NOLOCK)` salvo indicação contrária.

| ID (`id`) | Tabela SQL Server (`sourceTable`) | Chave (`keyColumn` / `keyColumns`) | Transformação de payload |
|-----------|-----------------------------------|------------------------------------|---------------------------|
| `cfg-formas-pagto` | `dbo.Cfg_Formas_Pagto` | `CodForma` | — |
| `cfg-periodicidade` | `dbo.Cfg_Periodicidade` | `CodPeriodicidade` | — |
| `planos` | `dbo.Planos` | `CodPlano` | — |
| `cessionarios` | `dbo.Cessionarios` | `CodCessionario` | — |
| `cessionarios-planos` | `dbo.Cessionarios_Planos` | `CodCessionarioPlano` | Datas legadas (YYYYMMDD) → campos `*_as_isodate` |
| `boletos` | `dbo.Boletos` | `CodBoleto` | Datas legadas (YYYYMMDD) → campos `*_as_isodate` |
| `par-taxas` | `dbo.Par_Taxas` | `CodTaxa` | — |
| `planos-taxas-manutencao` | `dbo.Planos_TaxasManutencao` | `CodPlano`, `CodPeriodicidade` (composta) | — |
| `cad-bancos` | `dbo.Cad_Bancos` | `NumBanco` | — |
| `cad-bancos-contas` | `dbo.Cad_Bancos_Contas` | `CodConta` | — |
| `cidades` | `dbo.Cidades` | `CodCidade` | — |
| `cessionarios-enderecos` | `dbo.Cessionarios_Enderecos` | `CodCessionario`, `TipoEndereco` (composta) | — |
| `cessionarios-fones` | `dbo.Cessionarios_Fones` | `CodFone` | — |
| `cessionarios-planos-responsavel` | `dbo.Cessionarios_Planos_Responsavel` | `CodCessionarioPlano` | — |
| `cessionarios-planos-responsavel-fones` | `dbo.Cessionarios_Planos_Responsavel_Fones` | `CodFone` | — |
| `jazigos` | `dbo.Jazigos` | `CodJazigo` | — |

### Mapeamento opcional via ambiente

Se `MSSQL_SYNC_DEMO_QUERY` estiver definida, é acrescentado um mapeamento extra `env-demo` (com `MSSQL_SYNC_DEMO_SOURCE_TABLE` e `MSSQL_SYNC_DEMO_KEY_COLUMN` opcionais). Útil para testes sem alterar código.

## Datas legadas (inteiro `YYYYMMDD`)

Em [`src/jobs/sqlserver-sync/legacy-dates.ts`](../src/jobs/sqlserver-sync/legacy-dates.ts):

- **`dbo.Boletos`:** `DataVencimento`, `DataLiquid`, `DataCredito` — para cada valor inteiro válido, acrescenta-se no JSON `DataVencimento_as_isodate`, etc. (string `YYYY-MM-DD`). O valor original mantém-se.
- **`dbo.Cessionarios_Planos`:** `DataInclusao`, `DataEncerramento` — idem com `*_as_isodate`.

Colunas como `DiaBase` / `MesReferencia` **não** são tratadas como data completa neste passo.

## Consultas úteis no Postgres

```sql
-- Últimos registos por tabela de origem (tabela física: registros_sync_mssql)
SELECT "sourceTable", COUNT(*) 
FROM "registros_sync_mssql" 
GROUP BY "sourceTable" 
ORDER BY 1;

-- Exemplo: um boleto pela chave natural
SELECT * FROM "registros_sync_mssql"
WHERE "sourceTable" = 'dbo.Boletos' AND "sourceKey" = '<CodBoleto>';

-- Últimas execuções do job (tabela física: execucoes_sincronizacao)
SELECT * FROM "execucoes_sincronizacao" ORDER BY "startedAt" DESC LIMIT 20;
```

## Extensão futura

Para relatórios ou integrações (ex.: Asaas) com tipagem forte, pode evoluir para **ETL** que leia `MssqlSyncRecord.payload` e preencha tabelas Postgres dedicadas, ou novos modelos Prisma — mantendo este job como camada de **ingestão bruta** consistente.

## Ficheiros relacionados

| Ficheiro | Papel |
|----------|--------|
| [`sync-mappings.ts`](../src/jobs/sqlserver-sync/sync-mappings.ts) | Lista de mapeamentos e queries |
| [`transform.ts`](../src/jobs/sqlserver-sync/transform.ts) | `sourceKey` e serialização JSON |
| [`legacy-dates.ts`](../src/jobs/sqlserver-sync/legacy-dates.ts) | Enriquecimento YYYYMMDD → ISO |
| [`run-sync.ts`](../src/jobs/sqlserver-sync/run-sync.ts) | Loop de leitura MSSQL e upserts |
| [`job-env.ts`](../src/jobs/sqlserver-sync/job-env.ts) | Validação de env do job |
| [`prisma/schema.prisma`](../prisma/schema.prisma) | `MssqlSyncRecord`, `SyncRun` |
