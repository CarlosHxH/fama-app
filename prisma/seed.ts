import "dotenv/config";

import { hash } from "bcrypt-ts";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Prisma } from "../generated/prisma/client";

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

const SEED_ASAAS_PENDING = "seed_asaas_pay_pending_001";
const SEED_ASAAS_RECEIVED = "seed_asaas_pay_received_001";

const SEED_CUSTOMER_ID = 1n;

/**
 * Dados de teste: staff `User` (admin) e `Customer` (portal) + pagamentos de exemplo.
 *
 * - SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD — login em /admin/login
 * - SEED_TITULAR_CPF_CNPJ (default 52998224725) — login em /login (portal)
 * - SEED_ONLY_ADMIN=1 — só cria staff admin
 */
async function main() {
  const onlyAdmin = process.env.SEED_ONLY_ADMIN === "1";

  const adminEmailRaw = process.env.SEED_ADMIN_EMAIL?.trim();
  const adminPasswordPlain = process.env.SEED_ADMIN_PASSWORD?.trim();

  let adminPasswordHashed: string | undefined;
  if (adminPasswordPlain && adminPasswordPlain.length > 0) {
    adminPasswordHashed = await hash(adminPasswordPlain, 12);
  }

  const adminEmailDefault = "admin@seed.local";
  let adminEmail: string | null =
    adminEmailRaw && adminEmailRaw.length > 0
      ? adminEmailRaw.toLowerCase()
      : null;
  if (adminPasswordHashed && !adminEmail) {
    adminEmail = adminEmailDefault;
    console.warn(
      `[seed] SEED_ADMIN_EMAIL não definido — a usar ${adminEmailDefault} para /admin/login.`,
    );
  }

  if (!adminEmail || !adminPasswordHashed) {
    throw new Error(
      "Defina SEED_ADMIN_EMAIL e SEED_ADMIN_PASSWORD para criar o utilizador staff (tabela users).",
    );
  }

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    create: {
      email: adminEmail,
      name: "Administrador (seed)",
      password: adminPasswordHashed,
      role: "ADMIN",
      active: true,
    },
    update: {
      name: "Administrador (seed)",
      password: adminPasswordHashed,
      role: "ADMIN",
      active: true,
    },
  });

  console.info(
    `[seed] Staff admin: id=${admin.id} email=${admin.email} (login /admin/login)`,
  );

  if (onlyAdmin) {
    console.info("[seed] SEED_ONLY_ADMIN=1 — cliente portal ignorado.");
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

  await prisma.customer.upsert({
    where: { id: SEED_CUSTOMER_ID },
    create: {
      id: SEED_CUSTOMER_ID,
      fullName: "Titular de teste (seed)",
      cpfCnpj: titularCpf,
      email: titularEmail,
    },
    update: {
      fullName: "Titular de teste (seed)",
      cpfCnpj: titularCpf,
      ...(titularEmail ? { email: titularEmail } : {}),
    },
  });

  const phoneCount = await prisma.phone.count({
    where: { customerId: SEED_CUSTOMER_ID },
  });
  if (phoneCount === 0) {
    await prisma.phone.create({
      data: {
        customerId: SEED_CUSTOMER_ID,
        number: "11987654321",
        type: "CELULAR",
        observations: "Contacto de exemplo (seed)",
      },
    });
    console.info("[seed] Telefone de exemplo criado para o cliente.");
  }

  const dueSoon = new Date();
  dueSoon.setDate(dueSoon.getDate() + 7);

  await prisma.portalPayment.upsert({
    where: { asaasPaymentId: SEED_ASAAS_PENDING },
    create: {
      customerId: SEED_CUSTOMER_ID,
      invoiceId: null,
      asaasPaymentId: SEED_ASAAS_PENDING,
      paymentMethod: "PIX",
      status: "PENDING",
      value: new Prisma.Decimal("150.50"),
    },
    update: {
      status: "PENDING",
      value: new Prisma.Decimal("150.50"),
      paymentMethod: "PIX",
    },
  });

  await prisma.portalPayment.upsert({
    where: { asaasPaymentId: SEED_ASAAS_RECEIVED },
    create: {
      customerId: SEED_CUSTOMER_ID,
      invoiceId: null,
      asaasPaymentId: SEED_ASAAS_RECEIVED,
      paymentMethod: "PIX",
      status: "RECEIVED",
      value: new Prisma.Decimal("89.90"),
    },
    update: {
      status: "RECEIVED",
      value: new Prisma.Decimal("89.90"),
      paymentMethod: "PIX",
    },
  });

  console.info(
    `[seed] Cliente portal cod_cessionario=${SEED_CUSTOMER_ID} CPF=${titularCpf}`,
  );
  console.info(
    `[seed] Pagamentos exemplo: ${SEED_ASAAS_PENDING} (PENDING), ${SEED_ASAAS_RECEIVED} (RECEIVED)`,
  );
  console.info("\n[seed] Concluído.");
  console.info(`  • /admin/login: ${adminEmail} + SEED_ADMIN_PASSWORD`);
  console.info(`  • /login (portal): CPF/CNPJ ${titularCpf}`);
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
