import { createEnv } from "@t3-oss/env-nextjs";
import { config as dotenvConfig } from "dotenv";
import { z } from "zod";

// Garante carregamento de `.env.local`/`.env` quando o processo não vem
// com variáveis já injetadas (ex.: scripts Node / alguns ambientes de deploy).
// Next.js normalmente faz isso, mas este fallback evita crash em boot quando não faz.
// dotenvConfig({ path: ".env.local", override: false });
// dotenvConfig({ path: ".env", override: false });

export const env = createEnv({
  client: {
    NEXT_PUBLIC_APP_NAME: z.string().optional(),
    NEXT_PUBLIC_ORG_FOOTER: z.string().optional(),
    NEXT_PUBLIC_SUPPORT_PHONE: z.string().optional(),
    NEXT_PUBLIC_SUPPORT_WHATSAPP_URL: z.string().optional(),
    NEXT_PUBLIC_SUPPORT_WHATSAPP_LABEL: z.string().optional(),
    NEXT_PUBLIC_BASE_PATH: z.string().optional(),
    NEXT_PUBLIC_COBRANCA_LEGAL_URL: z.string().optional(),
  },
  server: {
    AUTH_SECRET: process.env.NODE_ENV === "production" ? z.string() : z.string().optional(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]) .default("development"),
    ASAAS_API_KEY: z.string().min(1),
    ASAAS_API_URL: z.string().url(),
    ASAAS_WEBHOOK_TOKEN: z.string().optional(),
    NEXTAUTH_URL: z.string().url(),
    AUTH_TRUST_HOST: z.boolean().optional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "Fama",
    NEXT_PUBLIC_ORG_FOOTER: process.env.NEXT_PUBLIC_ORG_FOOTER || "Portal de cobrança",
    NEXT_PUBLIC_SUPPORT_PHONE: process.env.NEXT_PUBLIC_SUPPORT_PHONE || "11 99999-9999",
    NEXT_PUBLIC_SUPPORT_WHATSAPP_URL: process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP_URL || "https://wa.me/11999999999",
    NEXT_PUBLIC_SUPPORT_WHATSAPP_LABEL: process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP_LABEL || "WhatsApp",
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || "/",
    NEXT_PUBLIC_COBRANCA_LEGAL_URL: process.env.NEXT_PUBLIC_COBRANCA_LEGAL_URL || "https://www.fama.com.br/politica-de-privacidade",
    AUTH_SECRET: process.env.AUTH_SECRET || "secretsecurity",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "https://sistema.famavida.org.br",
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV || "development",
    ASAAS_API_KEY: process.env.ASAAS_API_KEY || "secretsecurity",
    ASAAS_API_URL: process.env.ASAAS_API_URL || "https://sandbox.asaas.com/api/v3",
    ASAAS_WEBHOOK_TOKEN: process.env.ASAAS_WEBHOOK_TOKEN || "secretsecurity",
    AUTH_TRUST_HOST:  "true",
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
