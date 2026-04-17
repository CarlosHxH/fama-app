import { createEnv } from "@t3-oss/env-nextjs";
import { config as dotenvConfig } from "dotenv";
import { z } from "zod";

// Garante carregamento de `.env.local`/`.env` quando o processo não vem
// com variáveis já injetadas (ex.: scripts Node / alguns ambientes de deploy).
// Next.js normalmente faz isso, mas este fallback evita crash em boot quando não faz.
dotenvConfig({ path: ".env.local", override: false });
dotenvConfig({ path: ".env", override: false });

export const env = createEnv({
  server: {
    AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    ASAAS_API_KEY: z.string().min(1),
    ASAAS_API_URL: z.string().url(),
    ASAAS_WEBHOOK_TOKEN: z.string().optional(),
  },
  client: {},
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET || "bXVkZS1lc3RhLWNoYXZlLXNlY3JldGEtZW0tcHJvZHVjYW8tdXNlLTI1NmJpdHMhIQ==",
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/fama_app",
    NODE_ENV: process.env.NODE_ENV || "development",
    ASAAS_API_KEY: process.env.ASAAS_API_KEY || "pay_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmJhMTA5ZTE2LTg0MDgtNDc1My1hM2ZmLWVhMWZmODFhMzkxZjo6JGFhY2hfMDEwNjZiNTQtNzdkZi00NTU0LTkwYmMtMTQ1ZDAyMzRmYjcy",
    ASAAS_API_URL: process.env.ASAAS_API_URL || "https://sandbox.asaas.com/api/v3",
    ASAAS_WEBHOOK_TOKEN: process.env.ASAAS_WEBHOOK_TOKEN || "token-secreto-webhook",
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
