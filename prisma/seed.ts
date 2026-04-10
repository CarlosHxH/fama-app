import "dotenv/config";

import { hash } from "bcrypt-ts";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL é obrigatório para executar o seed.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

function normalizeDigits(input: string): string {
  return input.replace(/\D/g, "");
}

/** IDs Asaas fictícios (só para desenvolvimento — não chamam a API). */
const SEED_ASAAS_PENDING = "seed_asaas_pay_pending_001";
const SEED_ASAAS_RECEIVED = "seed_asaas_pay_received_001";

/**
 * Dados de teste idempotentes: admin, titular USER, cobranças de exemplo, post.
 *
 * Variáveis opcionais:
 * - SEED_ADMIN_CPF_CNPJ (default 24971563792)
 * - SEED_ADMIN_EMAIL
 * - SEED_TITULAR_CPF_CNPJ (default 52998224725) — login em /login como titular
 * - SEED_TITULAR_EMAIL (opcional)
 * - SEED_ADMIN_PASSWORD — palavra-passe para /admin/login (e-mail + senha); gera passwordHash
 * - SEED_ONLY_ADMIN=1 — só cria/atualiza o admin
 */
async function main() {
  const onlyAdmin = process.env.SEED_ONLY_ADMIN === "1";

  const adminCpf = normalizeDigits(
    process.env.SEED_ADMIN_CPF_CNPJ ?? "24971563792",
  );
  if (adminCpf.length !== 11 && adminCpf.length !== 14) {
    throw new Error(
      "SEED_ADMIN_CPF_CNPJ deve ter 11 dígitos (CPF) ou 14 (CNPJ).",
    );
  }

  const adminEmailRaw = process.env.SEED_ADMIN_EMAIL?.trim();
  const adminPasswordPlain = process.env.SEED_ADMIN_PASSWORD?.trim();

  let passwordHash: string | undefined;
  if (adminPasswordPlain && adminPasswordPlain.length > 0) {
    passwordHash = await hash(adminPasswordPlain, 12);
  }

  const adminEmailDefault = "admin@seed.local";
  let adminEmail: string | null =
    adminEmailRaw && adminEmailRaw.length > 0
      ? adminEmailRaw.toLowerCase()
      : null;
  if (passwordHash && !adminEmail) {
    adminEmail = adminEmailDefault;
    console.warn(
      `[seed] SEED_ADMIN_EMAIL não definido — a usar ${adminEmailDefault} para login em /admin/login.`,
    );
  }

  const admin = await prisma.user.upsert({
    where: { cpfCnpj: adminCpf },
    create: {
      cpfCnpj: adminCpf,
      name: "Administrador (seed)",
      role: "ADMIN",
      adminStaffRole: "SUPER_ADMIN",
      ...(adminEmail ? { email: adminEmail } : {}),
      ...(passwordHash ? { passwordHash } : {}),
    },
    update: {
      name: "Administrador (seed)",
      role: "ADMIN",
      adminStaffRole: "SUPER_ADMIN",
      ...(adminEmail ? { email: adminEmail } : {}),
      ...(passwordHash ? { passwordHash } : {}),
    },
  });

  console.info(
    `[seed] Admin: cpfCnpj=${admin.cpfCnpj} role=${admin.role}${admin.email ? ` email=${admin.email}` : ""}${passwordHash ? " passwordHash=definido (login /admin/login)" : ""}`,
  );

  if (onlyAdmin) {
    console.info("[seed] SEED_ONLY_ADMIN=1 — titular/cobranças/post ignorados.");
    console.info("\n[seed] Resumo admin:");
    console.info(`  • Login por CPF em /login: ${adminCpf}`);
    if (admin.email && passwordHash) {
      console.info(
        `  • Login em /admin/login: e-mail ${admin.email} + palavra-passe (SEED_ADMIN_PASSWORD)`,
      );
    } else if (!passwordHash) {
      console.info(
        "  • /admin/login: defina SEED_ADMIN_PASSWORD (e SEED_ADMIN_EMAIL opcional) e volte a correr o seed.",
      );
    }
    return;
  }

  const titularCpf = normalizeDigits(
    process.env.SEED_TITULAR_CPF_CNPJ ?? "52998224725",
  );
  if (titularCpf.length !== 11 && titularCpf.length !== 14) {
    throw new Error(
      "SEED_TITULAR_CPF_CNPJ deve ter 11 dígitos (CPF) ou 14 (CNPJ).",
    );
  }

  const titularEmailRaw = process.env.SEED_TITULAR_EMAIL?.trim();
  const titularEmail =
    titularEmailRaw && titularEmailRaw.length > 0
      ? titularEmailRaw.toLowerCase()
      : null;

  const titular = await prisma.user.upsert({
    where: { cpfCnpj: titularCpf },
    create: {
      cpfCnpj: titularCpf,
      name: "Titular de teste (seed)",
      role: "USER",
      ...(titularEmail ? { email: titularEmail } : {}),
    },
    update: {
      name: "Titular de teste (seed)",
      role: "USER",
      ...(titularEmail ? { email: titularEmail } : {}),
    },
  });

  console.info(
    `[seed] Titular: cpfCnpj=${titular.cpfCnpj} — use este documento no /login para testar cobrança.`,
  );

  // O tipo do delegate pode ficar "error typed" no lint deste arquivo fora de `src`.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const phoneCount = await prisma.clientPhone.count({
    where: { userId: titular.id },
  });
  if (phoneCount === 0) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await prisma.clientPhone.create({
      data: {
        userId: titular.id,
        telefone: "11987654321",
        observacoes: "Contacto de exemplo (seed) — preferencial manhã",
      },
    });
    console.info("[seed] Telefone de exemplo criado para o titular.");
  }

  const dueSoon = new Date();
  dueSoon.setDate(dueSoon.getDate() + 7);

  await prisma.billingPayment.upsert({
    where: { asaasPaymentId: SEED_ASAAS_PENDING },
    create: {
      userId: titular.id,
      asaasPaymentId: SEED_ASAAS_PENDING,
      valueCents: 150_50,
      status: "PENDING",
      description: "Cobrança de teste — pendente (seed)",
      dueDate: dueSoon,
    },
    update: {
      valueCents: 150_50,
      status: "PENDING",
      description: "Cobrança de teste — pendente (seed)",
      dueDate: dueSoon,
      paidAt: null,
    },
  });

  const paidAt = new Date();
  paidAt.setDate(paidAt.getDate() - 3);

  await prisma.billingPayment.upsert({
    where: { asaasPaymentId: SEED_ASAAS_RECEIVED },
    create: {
      userId: titular.id,
      asaasPaymentId: SEED_ASAAS_RECEIVED,
      valueCents: 89_90,
      status: "RECEIVED",
      description: "Cobrança de teste — recebida (seed)",
      dueDate: paidAt,
      paidAt,
    },
    update: {
      valueCents: 89_90,
      status: "RECEIVED",
      description: "Cobrança de teste — recebida (seed)",
      paidAt,
    },
  });

  console.info(
    `[seed] Cobranças: ${SEED_ASAAS_PENDING} (PENDING), ${SEED_ASAAS_RECEIVED} (RECEIVED)`,
  );

  console.info("\n[seed] Concluído. Resumo rápido:");
  console.info(`  • Login admin (CPF em /login): ${adminCpf}`);
  if (admin.email && passwordHash) {
    console.info(
      `  • Login admin (/admin/login): e-mail ${admin.email} + palavra-passe (SEED_ADMIN_PASSWORD)`,
    );
  } else if (!passwordHash) {
    console.info(
      "  • Login /admin/login: defina SEED_ADMIN_PASSWORD (e opcionalmente SEED_ADMIN_EMAIL) e volte a correr o seed.",
    );
  }
  console.info(`  • Login titular: CPF/CNPJ ${titularCpf}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
