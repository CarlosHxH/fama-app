import { z } from "zod";

function boolEnvOptional(defaultValue: boolean) {
  return z
    .union([z.string(), z.undefined()])
    .transform((v) => {
      if (v === undefined || v === "") return defaultValue;
      const t = v.trim().toLowerCase();
      return t === "true" || t === "1" || t === "yes";
    });
}

/**
 * Variáveis de ambiente do job `job:sync-sqlserver` (fora do Next.js).
 * Carregue com `dotenv/config` no entrypoint.
 */
const base = z.object({
  DATABASE_URL: z.string().url(),

  MSSQL_CONNECTION_STRING: z.string().min(1).optional(),

  MSSQL_SERVER: z.string().min(1).optional(),
  MSSQL_DATABASE: z.string().min(1).optional(),
  MSSQL_USER: z.string().min(1).optional(),
  MSSQL_PASSWORD: z.string().min(1).optional(),

  /** TLS (comum em Azure / instâncias com encrypt obrigatório). Valores: true, 1. */
  MSSQL_ENCRYPT: boolEnvOptional(false),
  MSSQL_TRUST_SERVER_CERTIFICATE: boolEnvOptional(false),

  /**
   * Timeouts Tedious (driver `mssql`): ligações lentas/VPN costumam exigir valores maiores.
   * Predefinições evitam `Failed to cancel request in 5000ms` (cancelTimeout Tedious).
   */
  MSSQL_CONNECT_TIMEOUT_MS: z.coerce
    .number()
    .int()
    .min(1_000)
    .max(600_000)
    .default(60_000),
  /** 0 = sem limite de duração por pedido SQL (comportamento Tedious). */
  MSSQL_REQUEST_TIMEOUT_MS: z.coerce
    .number()
    .int()
    .min(0)
    .max(2_147_483_647)
    .default(120_000),
  MSSQL_CANCEL_TIMEOUT_MS: z.coerce
    .number()
    .int()
    .min(1_000)
    .max(300_000)
    .default(30_000),

  /**
   * Intervalo de log de progresso (a cada N linhas gravadas). 0 = sem logs intermédios.
   * (Não agrupa transação — cada upsert é independente.)
   */
  SQL_SYNC_BATCH_SIZE: z.coerce.number().int().min(0).max(10_000).default(500),
  SQL_SYNC_MAX_RETRIES: z.coerce.number().int().min(1).max(100).default(12),
  SQL_SYNC_RETRY_DELAY_MS: z.coerce.number().int().min(100).max(60_000).default(2_000),

  /** Host:porto TCP antes de abrir o pool (ex.: após VPN). Desative se a porta não for fixa. */
  SQL_SYNC_SKIP_HEALTHCHECK: boolEnvOptional(false),
  MSSQL_HEALTHCHECK_HOST: z.string().min(1).optional(),
  MSSQL_HEALTHCHECK_PORT: z.coerce.number().int().min(1).max(65535).optional(),

  /** Query opcional para ativar um mapeamento de demonstração sem editar código. */
  MSSQL_SYNC_DEMO_QUERY: z.string().optional(),
  MSSQL_SYNC_DEMO_SOURCE_TABLE: z.string().optional(),
  MSSQL_SYNC_DEMO_KEY_COLUMN: z.string().optional(),
});

export type JobEnv = z.infer<typeof base>;

function refineMssqlAuth(
  data: z.infer<typeof base>,
  ctx: z.RefinementCtx,
) {
  const hasUrl = Boolean(
    data.MSSQL_CONNECTION_STRING &&
      data.MSSQL_CONNECTION_STRING.trim().length > 0,
  );
  const hasParts = Boolean(
    data.MSSQL_SERVER &&
      data.MSSQL_DATABASE &&
      data.MSSQL_USER &&
      data.MSSQL_PASSWORD,
  );
  if (!hasUrl && !hasParts) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        "Defina MSSQL_CONNECTION_STRING ou o conjunto MSSQL_SERVER + MSSQL_DATABASE + MSSQL_USER + MSSQL_PASSWORD.",
    });
  }
}

export function loadJobEnv(): JobEnv {
  const parsed = base
    .superRefine(refineMssqlAuth)
    .safeParse({
      DATABASE_URL: process.env.DATABASE_URL,
      MSSQL_CONNECTION_STRING: process.env.MSSQL_CONNECTION_STRING,
      MSSQL_SERVER: process.env.MSSQL_SERVER,
      MSSQL_DATABASE: process.env.MSSQL_DATABASE,
      MSSQL_USER: process.env.MSSQL_USER,
      MSSQL_PASSWORD: process.env.MSSQL_PASSWORD,
      MSSQL_ENCRYPT: process.env.MSSQL_ENCRYPT,
      MSSQL_TRUST_SERVER_CERTIFICATE: process.env.MSSQL_TRUST_SERVER_CERTIFICATE,
      MSSQL_CONNECT_TIMEOUT_MS: process.env.MSSQL_CONNECT_TIMEOUT_MS,
      MSSQL_REQUEST_TIMEOUT_MS: process.env.MSSQL_REQUEST_TIMEOUT_MS,
      MSSQL_CANCEL_TIMEOUT_MS: process.env.MSSQL_CANCEL_TIMEOUT_MS,
      SQL_SYNC_BATCH_SIZE: process.env.SQL_SYNC_BATCH_SIZE,
      SQL_SYNC_MAX_RETRIES: process.env.SQL_SYNC_MAX_RETRIES,
      SQL_SYNC_RETRY_DELAY_MS: process.env.SQL_SYNC_RETRY_DELAY_MS,
      SQL_SYNC_SKIP_HEALTHCHECK: process.env.SQL_SYNC_SKIP_HEALTHCHECK,
      MSSQL_HEALTHCHECK_HOST: process.env.MSSQL_HEALTHCHECK_HOST,
      MSSQL_HEALTHCHECK_PORT: process.env.MSSQL_HEALTHCHECK_PORT,
      MSSQL_SYNC_DEMO_QUERY: process.env.MSSQL_SYNC_DEMO_QUERY,
      MSSQL_SYNC_DEMO_SOURCE_TABLE: process.env.MSSQL_SYNC_DEMO_SOURCE_TABLE,
      MSSQL_SYNC_DEMO_KEY_COLUMN: process.env.MSSQL_SYNC_DEMO_KEY_COLUMN,
    });

  if (!parsed.success) {
    const msg = parsed.error.flatten().fieldErrors;
    throw new Error(
      `Variáveis de ambiente inválidas: ${JSON.stringify(msg, null, 2)}`,
    );
  }
  return parsed.data;
}

export function resolveHealthcheckTarget(env: JobEnv): {
  host: string;
  port: number;
} | null {
  if (env.SQL_SYNC_SKIP_HEALTHCHECK) return null;
  const fromExplicit = env.MSSQL_HEALTHCHECK_HOST?.trim();
  const fromServer = env.MSSQL_SERVER?.trim();
  const host =
    (fromExplicit && fromExplicit.length > 0 ? fromExplicit : null) ??
    (fromServer && fromServer.length > 0 ? fromServer : null);
  if (!host) return null;
  const port = env.MSSQL_HEALTHCHECK_PORT ?? 1433;
  return { host, port };
}
