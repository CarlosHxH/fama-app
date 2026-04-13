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
import { pickRow, toSqlServerInt } from "./row-utils";
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
  motivo: string;
  /** Chave natural da linha (simples ou composta `a|b`). */
  sourceKey?: string;
  codCessionario?: number | null;
  codCessionarioPlano?: number | null;
  codContrato?: number | null;
  codJazigo?: number | null;
  codBoleto?: number | null;
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
          const origem = originKeysFromRow(transformed);
          erroDetalhes.push({
            entidade: mapping.id,
            motivo: msg,
            sourceKey: key,
            ...origem,
          });
          console.error(
            `[${SYNC_SQLSERVER_JOB_NAME}] falha linha mapping=${mapping.id} key=${key}:`,
            err,
          );
        }
        logProgress(env, mapping.id, totalRead, totalWritten);
      }
    }

    const [nContratos, nJazigos, nResp, nPagamentos] = await Promise.all([
      prisma.contrato.count(),
      prisma.jazigo.count(),
      prisma.responsavelFinanceiro.count(),
      prisma.pagamento.count(),
    ]);
    console.info(
      `[${SYNC_SQLSERVER_JOB_NAME}] pós-sync contagens: contratos=${nContratos} jazigos=${nJazigos} responsaveis_financeiros=${nResp} pagamentos=${nPagamentos}`,
    );

    return await finish("SUCESSO", null);
  } catch (e) {
    const msg = formatSyncJobFailureMessage(e);
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

function formatSyncJobFailureMessage(e: unknown): string {
  let msg = e instanceof Error ? e.message : String(e);
  const code =
    e && typeof e === "object" && "code" in e
      ? String((e as { code?: unknown }).code)
      : "";
  const original =
    e && typeof e === "object" && "originalError" in e
      ? (e as { originalError?: { code?: unknown; message?: unknown } })
          .originalError
      : undefined;
  const originalCode =
    original && typeof original === "object" && "code" in original
      ? String(original.code)
      : "";

  const isTimeout =
    code === "ETIMEOUT" ||
    originalCode === "ETIMEOUT" ||
    msg.includes("ETIMEOUT") ||
    msg.includes("Failed to cancel request");

  const msgLower = msg.toLowerCase();
  const isConnReset =
    code === "ECONNRESET" ||
    originalCode === "ECONNRESET" ||
    code === "ESOCKET" ||
    originalCode === "ESOCKET" ||
    msg.includes("ECONNRESET") ||
    msg.includes("ECONNREFUSED") ||
    msgLower.includes("socket hang up");

  if (isTimeout) {
    msg = `${msg} — Sugestão: verificar VPN/firewall, MSSQL_ENCRYPT / MSSQL_TRUST_SERVER_CERTIFICATE, e aumentar MSSQL_CONNECT_TIMEOUT_MS, MSSQL_REQUEST_TIMEOUT_MS ou MSSQL_CANCEL_TIMEOUT_MS no .env.`;
  } else if (isConnReset) {
    msg = `${msg} — Sugestão: o servidor ou a rede fechou a ligação TCP (firewall, proxy, VPN instável, ou TLS). Confirmar MSSQL_SERVER/porta, MSSQL_ENCRYPT e MSSQL_TRUST_SERVER_CERTIFICATE se for Azure/SSL; testar com sqlcmd ou SSMS na mesma máquina. Para correr o job, prefira npm run job:sync (Node/tsx): o Bun costuma expor bugs do driver tedious (ex.: "No event socketError in state Final").`;
  }
  return msg;
}

/**
 * Chaves de origem MSSQL mais usadas nos mapeamentos (para `erroDetalhes` e suporte).
 */
function originKeysFromRow(row: Record<string, unknown>): Pick<
  RowErrorDetail,
  | "codCessionario"
  | "codCessionarioPlano"
  | "codContrato"
  | "codJazigo"
  | "codBoleto"
> {
  return {
    codCessionario: toSqlServerInt(
      pickRow(row, ["CodCessionario", "codCessionario"]),
    ),
    codCessionarioPlano: toSqlServerInt(
      pickRow(row, ["CodCessionarioPlano", "codCessionarioPlano"]),
    ),
    codContrato: toSqlServerInt(pickRow(row, ["CodContrato", "codContrato"])),
    codJazigo: toSqlServerInt(pickRow(row, ["CodJazigo", "codJazigo"])),
    codBoleto: toSqlServerInt(pickRow(row, ["CodBoleto", "codBoleto"])),
  };
}
