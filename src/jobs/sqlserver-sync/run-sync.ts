import type { PrismaClient } from "../../../generated/prisma/client";

import type { JobEnv } from "./job-env";
import { closeMssqlPool, openMssqlPool, type MssqlPool } from "./sqlserver-pool";
import { waitForTcpReachable } from "./reachability";
import { resolveHealthcheckTarget } from "./job-env";
import { getSyncMappings, type SyncMapping } from "./sync-mappings";
import { rowToJsonPayload, rowToSourceKeyFromSpec } from "./transform";

const JOB_NAME = "sync-sqlserver-to-postgres";

function rowsFromMssqlRecordset(
  recordset: unknown,
): Record<string, unknown>[] {
  if (!Array.isArray(recordset)) {
    return [];
  }
  return recordset as Record<string, unknown>[];
}

async function syncOneMapping(
  prisma: PrismaClient,
  pool: MssqlPool,
  mapping: SyncMapping,
  progressLogEvery: number,
): Promise<{ read: number; written: number }> {
  const result = await pool.request().query(mapping.sourceQuery);
  const rows = rowsFromMssqlRecordset(result.recordset);
  let written = 0;

  /**
   * Um `upsert` por linha (sem `$transaction` em lote). Evita timeout de transação
   * interativa do Prisma em tabelas grandes com Postgres remoto; cada comando é curto.
   */
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]!;
    const sourceKey = rowToSourceKeyFromSpec(mapping, row);
    const payload = rowToJsonPayload(row, mapping.transform);
    await prisma.mssqlSyncRecord.upsert({
      where: {
        sourceTable_sourceKey: {
          sourceTable: mapping.sourceTable,
          sourceKey,
        },
      },
      create: {
        sourceTable: mapping.sourceTable,
        sourceKey,
        payload,
      },
      update: {
        payload,
      },
    });
    written += 1;

    if (
      progressLogEvery > 0 &&
      (i + 1) % progressLogEvery === 0 &&
      i + 1 < rows.length
    ) {
      console.info(
        `[sqlserver-sync] "${mapping.id}" progresso ${i + 1}/${rows.length}`,
      );
    }
  }

  return { read: rows.length, written };
}

export type RunSyncResult = {
  syncRunId: string;
  totalRead: number;
  totalWritten: number;
  mappingsRun: number;
};

/**
 * Executa todos os mapeamentos: MSSQL → `MssqlSyncRecord` no Postgres.
 */
export async function runSync(prisma: PrismaClient, env: JobEnv): Promise<RunSyncResult> {
  const progressLogEvery = env.SQL_SYNC_BATCH_SIZE;
  const mappings = getSyncMappings(env);

  const health = resolveHealthcheckTarget(env);
  if (health) {
    await waitForTcpReachable(health.host, health.port, {
      maxRetries: env.SQL_SYNC_MAX_RETRIES,
      delayMs: env.SQL_SYNC_RETRY_DELAY_MS,
      connectTimeoutMs: 8_000,
    });
  }

  let pool: MssqlPool | undefined;
  const syncRun = await prisma.syncRun.create({
    data: {
      jobName: JOB_NAME,
      status: "RUNNING",
    },
  });

  let totalRead = 0;
  let totalWritten = 0;

  try {
    if (mappings.length === 0) {
      console.warn(
        "[sqlserver-sync] Nenhum mapeamento definido. Adicione entradas em STATIC_MAPPINGS ou defina MSSQL_SYNC_DEMO_QUERY.",
      );
    }

    pool = await openMssqlPool(env);

    for (const mapping of mappings) {
      console.info(`[sqlserver-sync] Mapeamento "${mapping.id}"…`);
      const { read, written } = await syncOneMapping(
        prisma,
        pool,
        mapping,
        progressLogEvery,
      );
      totalRead += read;
      totalWritten += written;
      console.info(
        `[sqlserver-sync] "${mapping.id}": lidas ${read}, gravadas ${written}`,
      );
    }

    await prisma.syncRun.update({
      where: { id: syncRun.id },
      data: {
        status: "SUCCESS",
        finishedAt: new Date(),
        rowsRead: totalRead,
        rowsWritten: totalWritten,
      },
    });

    return {
      syncRunId: syncRun.id,
      totalRead,
      totalWritten,
      mappingsRun: mappings.length,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await prisma.syncRun.update({
      where: { id: syncRun.id },
      data: {
        status: "FAILED",
        finishedAt: new Date(),
        rowsRead: totalRead,
        rowsWritten: totalWritten,
        errorMessage: message.slice(0, 8000),
      },
    });
    throw err;
  } finally {
    if (pool) {
      await closeMssqlPool(pool);
    }
  }
}
