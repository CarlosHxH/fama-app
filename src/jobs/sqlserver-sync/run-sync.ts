import type { PrismaClient } from "../../../generated/prisma/client";

import {
  replaceAddressesForCustomers,
  replacePhonesForCustomers,
  upsertDomainRowByMappingId,
} from "./domain-upsert";
import { getDomainSyncMappings } from "./domain-sync-order";
import type { JobEnv } from "./job-env";
import { resolveHealthcheckTarget } from "./job-env";
import { waitForTcpReachable } from "./reachability";
import { closeMssqlPool, openMssqlPool } from "./sqlserver-pool";
import type { SyncMapping } from "./sync-mappings";
import { SYNC_SQLSERVER_JOB_NAME } from "./sync-constants";
import { rowToSourceKeyFromSpec } from "./transform";

export type RunSyncResult = {
  syncLogId: string;
  totalRead: number;
  totalWritten: number;
  mappingsRun: number;
  status: string;
  rowErrors: number;
};

type RowErrorDetail = {
  entidade: string;
  sqlServerId?: number | null;
  motivo: string;
};

/**
 * ETL MSSQL → tabelas de domínio Prisma + registo em `sync_logs`.
 *
 * Erros por linha: regista-se em `erroDetalhes`, incrementa-se `rowErrors` e o job continua.
 */
export async function runSync(
  prisma: PrismaClient,
  env: JobEnv,
): Promise<RunSyncResult> {
  const hc = resolveHealthcheckTarget(env);
  if (hc) {
    await waitForTcpReachable(hc.host, hc.port, {
      maxRetries: env.SQL_SYNC_MAX_RETRIES,
      delayMs: env.SQL_SYNC_RETRY_DELAY_MS,
      connectTimeoutMs: 5_000,
    });
  }

  const syncLog = await prisma.syncLog.create({
    data: {
      jobName: SYNC_SQLSERVER_JOB_NAME,
      status: "PROCESSANDO",
    },
  });

  let pool: Awaited<ReturnType<typeof openMssqlPool>> | null = null;
  let totalRead = 0;
  let totalWritten = 0;
  let mappingsRun = 0;
  let rowErrors = 0;
  const erroDetalhes: RowErrorDetail[] = [];

  const finish = async (
    status: "SUCESSO" | "FALHA",
    jobError: string | null,
  ): Promise<RunSyncResult> => {
    const errors: RowErrorDetail[] = jobError
      ? [{ entidade: "job", motivo: jobError }, ...erroDetalhes]
      : erroDetalhes;

    await prisma.syncLog.update({
      where: { id: syncLog.id },
      data: {
        status,
        dataFim: new Date(),
        registrosNovos: totalWritten,
        registrosAtualizados: 0,
        falhas: rowErrors,
        ...(errors.length > 0 ? { erroDetalhes: errors.slice(0, 200) } : {}),
      },
    });
    return {
      syncLogId: syncLog.id,
      totalRead,
      totalWritten,
      mappingsRun,
      status,
      rowErrors,
    };
  };

  try {
    pool = await openMssqlPool(env);
    const mappings = getDomainSyncMappings(env);

    for (const mapping of mappings) {
      mappingsRun++;
      const result = await pool.request().query(mapping.sourceQuery);
      const recordset = result.recordset as Record<string, unknown>[];

      if (mapping.id === "cessionarios-enderecos") {
        const batch: Record<string, unknown>[] = [];
        for (const raw of recordset) {
          const row = { ...raw };
          const transformed = mapping.transform
            ? mapping.transform(row)
            : row;
          totalRead++;
          batch.push(transformed);
        }
        const n = await replaceAddressesForCustomers(prisma, batch);
        totalWritten += n;
        logProgress(env, mapping.id, totalRead, totalWritten);
        continue;
      }

      if (mapping.id === "cessionarios-fones") {
        const batch: Record<string, unknown>[] = [];
        for (const raw of recordset) {
          const row = { ...raw };
          const transformed = mapping.transform
            ? mapping.transform(row)
            : row;
          totalRead++;
          batch.push(transformed);
        }
        const n = await replacePhonesForCustomers(prisma, batch);
        totalWritten += n;
        logProgress(env, mapping.id, totalRead, totalWritten);
        continue;
      }

      for (const raw of recordset) {
        const row = { ...raw };
        const transformed = mapping.transform
          ? mapping.transform(row)
          : row;
        totalRead++;
        try {
          const written = await upsertDomainRowByMappingId(
            prisma,
            mapping.id,
            transformed,
          );
          totalWritten += written;
        } catch (err) {
          rowErrors++;
          const key = safeSourceKey(mapping, transformed);
          const msg = err instanceof Error ? err.message : String(err);
          erroDetalhes.push({
            entidade: mapping.id,
            motivo: msg,
            sqlServerId: null,
          });
          console.error(
            `[${SYNC_SQLSERVER_JOB_NAME}] falha linha mapping=${mapping.id} key=${key}:`,
            err,
          );
        }
        logProgress(env, mapping.id, totalRead, totalWritten);
      }
    }

    return await finish("SUCESSO", null);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(`[${SYNC_SQLSERVER_JOB_NAME}]`, e);
    return await finish("FALHA", msg);
  } finally {
    if (pool) {
      await closeMssqlPool(pool).catch(() => undefined);
    }
  }
}

function logProgress(
  env: JobEnv,
  mappingId: string,
  totalRead: number,
  totalWritten: number,
): void {
  const step = env.SQL_SYNC_BATCH_SIZE;
  if (step <= 0) return;
  if (totalRead % step !== 0) return;
  console.info(
    `[${SYNC_SQLSERVER_JOB_NAME}] progresso mapping=${mappingId} lidas=${totalRead} gravadas=${totalWritten}`,
  );
}

function safeSourceKey(mapping: SyncMapping, row: Record<string, unknown>): string {
  try {
    return rowToSourceKeyFromSpec(mapping, row);
  } catch {
    return "?";
  }
}
