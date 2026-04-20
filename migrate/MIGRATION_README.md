# ETL Migration — SQL Server → PostgreSQL

## Pré-requisitos

```bash
npm install mssql pg uuid
npm install -D @types/mssql @types/pg tsx typescript
```

## Variáveis de ambiente

| Variável          | Exemplo                                      |
|-------------------|----------------------------------------------|
| `DATABASE_URL`    | `postgres://user:pass@localhost:5432/cemiterio` |
| `MSSQL_HOST`      | `192.168.1.10`                               |
| `MSSQL_USER`      | `sa`                                         |
| `MSSQL_PASSWORD`  | `senha_aqui`                                 |
| `MSSQL_DB`        | `CemiterioDB`                                |

## Uso

### Testar sem gravar (dry-run)
```bash
MSSQL_HOST=... MSSQL_USER=... MSSQL_PASSWORD=... MSSQL_DB=... \
DATABASE_URL=postgres://... \
npx tsx migrate.ts --dry-run
```

### Migração completa
```bash
npx tsx migrate.ts
```

### Apenas um step
```bash
npx tsx migrate.ts --only=customers
npx tsx migrate.ts --only=pagamentos
```

### Batch size menor (para conexões lentas)
```bash
npx tsx migrate.ts --batch=100
```

## Ordem dos steps

1. **customers** — Cessionarios → customers
2. **customer_addresses** — Cessionarios_Enderecos + Cidades → customer_addresses
3. **customer_phones** — Cessionarios_Fones → customer_phones
4. **contratos** — Contratos + Contratos_Cessionarios → contratos
5. **jazigos** — Jazigos + Contratos_Jazigos + Gavetas (contagem) → jazigos
6. **responsaveis_financeiros** — Cessionarios_Planos_Responsavel → responsaveis_financeiros (+ cria customers novos)
7. **pagamentos** — Boletos (MANUTENCAO) + Contratos_Pagamentos (AQUISICAO) → pagamentos

## Transformações críticas

| Campo SQL Server | Transformação | Campo Postgres |
|---|---|---|
| `CPF` (com máscara `000.000.000-00`) | Remove pontos/traços | `cpf_cnpj` (só dígitos) |
| `DataVencimento` (INT, OLE Date) | `base(1899-12-30) + N dias` | `data_vencimento` (DATE) |
| `DataLiquid` (INT, OLE Date) | Idem | `data_pagamento` (DATE) |
| `Situacao` contrato (`'A'/'I'/'Q'`) | `A→ATIVO, I→INATIVO, Q→QUITADO` | `SituacaoContrato` enum |
| `Situacao` boleto (`QUITADO/CANCELADO`) | `QUITADO→PAGO, CANCELADO→CANCELADO` | `StatusPagamento` enum |
| Contagem de gavetas | `3 gav → R$180 / 6 gav → R$360` | `valor_mensalidade` |

## Responsáveis financeiros

O step `responsaveis_financeiros` cria automaticamente um `Customer` para cada
responsável que ainda não tem CPF cadastrado no portal, com `primeiroAcesso = true`.
No primeiro login o responsável define sua própria senha.

## Idempotência

Todos os steps usam `ON CONFLICT (sql_server_id) DO UPDATE` — podem ser
reexecutados com segurança sem duplicar dados.

## Após a migração

Execute o job de sync incremental periodicamente apontando para a mesma lógica,
filtrando por `DataAtualizacao > last_synced_at` do `sync_logs`.
