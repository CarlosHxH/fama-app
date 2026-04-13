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
      nome: "Administrador (seed)",
      senha: adminPasswordHashed,
      role: "ADMIN",
      ativo: true,
    },
    update: {
      nome: "Administrador (seed)",
      senha: adminPasswordHashed,
      role: "ADMIN",
      ativo: true,
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

  const customer = await prisma.customer.upsert({
    where: { cpfCnpj: titularCpf },
    create: {
      nome: "Titular de teste (seed)",
      cpfCnpj: titularCpf,
      email: titularEmail,
      primeiroAcesso: true,
    },
    update: {
      nome: "Titular de teste (seed)",
      ...(titularEmail ? { email: titularEmail } : {}),
    },
  });

  const phoneCount = await prisma.customerPhone.count({
    where: { customerId: customer.id },
  });
  if (phoneCount === 0) {
    await prisma.customerPhone.create({
      data: {
        customerId: customer.id,
        numero: "11987654321",
        tipo: "CELULAR",
      },
    });
    console.info("[seed] Telefone de exemplo criado para o cliente.");
  }

  const dueSoon = new Date();
  dueSoon.setDate(dueSoon.getDate() + 7);
  const dueUtc = new Date(
    Date.UTC(
      dueSoon.getUTCFullYear(),
      dueSoon.getUTCMonth(),
      dueSoon.getUTCDate(),
      12,
      0,
      0,
    ),
  );

  await prisma.pagamento.upsert({
    where: { asaasId: SEED_ASAAS_PENDING },
    create: {
      customerId: customer.id,
      asaasId: SEED_ASAAS_PENDING,
      metodoPagamento: "PIX",
      status: "PENDENTE",
      tipo: "TAXA_SERVICO",
      valorTitulo: new Prisma.Decimal("150.50"),
      dataVencimento: dueUtc,
    },
    update: {
      status: "PENDENTE",
      valorTitulo: new Prisma.Decimal("150.50"),
      metodoPagamento: "PIX",
    },
  });

  const paidDay = new Date();
  paidDay.setUTCDate(paidDay.getUTCDate() - 2);
  const paidUtc = new Date(
    Date.UTC(
      paidDay.getUTCFullYear(),
      paidDay.getUTCMonth(),
      paidDay.getUTCDate(),
      12,
      0,
      0,
    ),
  );

  await prisma.pagamento.upsert({
    where: { asaasId: SEED_ASAAS_RECEIVED },
    create: {
      customerId: customer.id,
      asaasId: SEED_ASAAS_RECEIVED,
      metodoPagamento: "PIX",
      status: "PAGO",
      tipo: "TAXA_SERVICO",
      valorTitulo: new Prisma.Decimal("89.90"),
      dataVencimento: paidUtc,
      dataPagamento: paidUtc,
    },
    update: {
      status: "PAGO",
      valorTitulo: new Prisma.Decimal("89.90"),
      metodoPagamento: "PIX",
      dataPagamento: paidUtc,
    },
  });

  console.info(
    `[seed] Cliente portal id=${customer.id} CPF=${titularCpf}`,
  );
  console.info(
    `[seed] Pagamentos exemplo: ${SEED_ASAAS_PENDING} (PENDENTE), ${SEED_ASAAS_RECEIVED} (PAGO)`,
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
