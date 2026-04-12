import type { PrismaClient } from "../../../generated/prisma/client";

import type { JobEnv } from "./job-env";

export type RunSyncResult = {
  syncRunId: string;
  totalRead: number;
  totalWritten: number;
  mappingsRun: number;
};

/**
 * ETL MSSQL desativado — `MssqlSyncRecord` / `SyncRun` não existem no schema atual.
 */
export async function runSync(
  _prisma: PrismaClient,
  _env: JobEnv,
): Promise<RunSyncResult> {
  throw new Error(
    "sync-sqlserver desativado: volte a adicionar modelos de fila ao schema ou use outro pipeline de dados.",
  );
}
