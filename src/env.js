import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

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
    ASAAS_API_KEY: z.string().min(1).default("$aact_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmJhMTA5ZTE2LTg0MDgtNDc1My1hM2ZmLWVhMWZmODFhMzkxZjo6JGFhY2hfMDEwNjZiNTQtNzdkZi00NTU0LTkwYmMtMTQ1ZDAyMzRmYjcy"),
    ASAAS_API_URL: z.string().url().default("https://sandbox.asaas.com/api/v3"),
    ASAAS_WEBHOOK_TOKEN: z.string().optional(),
  },
  client: {},
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    ASAAS_API_KEY: process.env.ASAAS_API_KEY,
    ASAAS_API_URL: process.env.ASAAS_API_URL,
    ASAAS_WEBHOOK_TOKEN: process.env.ASAAS_WEBHOOK_TOKEN,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
