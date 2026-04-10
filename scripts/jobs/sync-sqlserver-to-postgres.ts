/**
 * Job: sincronização SQL Server → Postgres (via VPN quando aplicável).
 *
 * Pré-requisitos:
 * 1. OpenVPN com túnel ativo (ou rota até o SQL Server).
 * 2. Variáveis de ambiente (ver `.env.example`).
 * 3. Postgres com tabelas `SyncRun` e `MssqlSyncRecord` (Prisma migrate/db push).
 *
 * Execução: `npm run job:sync-sqlserver`
 */
import "dotenv/config";

import { createJobPrisma } from "../../src/jobs/sqlserver-sync/prisma-job";
import { loadJobEnv } from "../../src/jobs/sqlserver-sync/job-env";
import { runSync } from "../../src/jobs/sqlserver-sync/run-sync";

async function main() {
  const env = loadJobEnv();
  const prisma = createJobPrisma();
  try {
    const result = await runSync(prisma, env);
    console.info(
      `[sync-sqlserver] Concluído: run=${result.syncRunId} lidas=${result.totalRead} gravadas=${result.totalWritten} mapeamentos=${result.mappingsRun}`,
    );
    process.exitCode = 0;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[sync-sqlserver] Falha:", msg);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

void main();
