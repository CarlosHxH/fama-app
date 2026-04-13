/**
 * Job de sincronização SQL Server → Postgres (tabelas de domínio + `sync_logs`).
 *
 * Executar com `npm run job:sync` (Node + tsx). Evitar Bun: o stack mssql/tedious
 * pode falhar de forma inconsistente (ECONNRESET, "socket hang up", estado interno).
 */
import "dotenv/config";

import { loadJobEnv } from "../../src/jobs/sqlserver-sync/job-env";
import { createJobPrisma } from "../../src/jobs/sqlserver-sync/prisma-job";
import { runSync } from "../../src/jobs/sqlserver-sync/run-sync";

async function main() {
  const prisma = createJobPrisma();
  const env = loadJobEnv();
  try {
    const result = await runSync(prisma, env);
    console.info("[sync-sqlserver] concluído:", result);
    if (result.status === "FALHA") {
      process.exitCode = 1;
    }
  } finally {
    await prisma.$disconnect();
  }
}

void main();
