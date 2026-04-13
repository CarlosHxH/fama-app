import sql from "mssql";

import type { JobEnv } from "./job-env";

export type MssqlPool = sql.ConnectionPool;

/** Opções Tedious: `cancelTimeout` por defeito é 5s e causa `Failed to cancel request in 5000ms` em redes lentas. */
function tediousTimeoutsFromEnv(env: JobEnv) {
  return {
    connectTimeout: env.MSSQL_CONNECT_TIMEOUT_MS,
    requestTimeout: env.MSSQL_REQUEST_TIMEOUT_MS,
    cancelTimeout: env.MSSQL_CANCEL_TIMEOUT_MS,
  };
}

export async function openMssqlPool(env: JobEnv): Promise<MssqlPool> {
  const t = tediousTimeoutsFromEnv(env);
  const connStr = env.MSSQL_CONNECTION_STRING?.trim();
  if (connStr) {
    const parsed = sql.ConnectionPool.parseConnectionString(connStr);
    const pool = new sql.ConnectionPool({
      ...parsed,
      options: {
        ...parsed.options,
        ...t,
      },
    });
    await pool.connect();
    return pool;
  }

  const pool = new sql.ConnectionPool({
    server: env.MSSQL_SERVER!,
    database: env.MSSQL_DATABASE!,
    user: env.MSSQL_USER!,
    password: env.MSSQL_PASSWORD!,
    options: {
      encrypt: env.MSSQL_ENCRYPT,
      trustServerCertificate: env.MSSQL_TRUST_SERVER_CERTIFICATE,
      ...t,
    },
  });
  await pool.connect();
  return pool;
}

export async function closeMssqlPool(pool: MssqlPool): Promise<void> {
  await pool.close();
}
