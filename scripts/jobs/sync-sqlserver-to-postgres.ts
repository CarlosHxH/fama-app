/**
 * Job de sincronização SQL Server → Postgres.
 *
 * Desativado: o schema Prisma atual não inclui `SyncRun` / `MssqlSyncRecord`.
 * Quando o ETL for redesenhado para `Customer` / `Invoice`, volte a ligar este script.
 */
import "dotenv/config";

async function main() {
  console.info(
    "[sync-sqlserver] Job desativado — modelo de fila ETL removido do schema.",
  );
  process.exitCode = 0;
}

void main();
