import sql from "mssql";

import type { JobEnv } from "./job-env";

export type MssqlPool = sql.ConnectionPool;

export async function openMssqlPool(env: JobEnv): Promise<MssqlPool> {
  const connStr = env.MSSQL_CONNECTION_STRING?.trim();
  if (connStr) {
    const pool = new sql.ConnectionPool(connStr);
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
    },
  });
  await pool.connect();
  return pool;
}

export async function closeMssqlPool(pool: MssqlPool): Promise<void> {
  await pool.close();
}
