import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

function normalizeDigits(input: string): string {
  return input.replace(/\D/g, "");
}

/**
 * Cria ou atualiza um utilizador admin (login só com CPF/CNPJ, sem palavra-passe).
 */
async function main() {
  const rawCpfCnpj = process.env.SEED_ADMIN_CPF_CNPJ ?? "24971563792";
  const cpfCnpj = normalizeDigits(rawCpfCnpj);
  if (cpfCnpj.length !== 11 && cpfCnpj.length !== 14) {
    throw new Error(
      "SEED_ADMIN_CPF_CNPJ deve ter 11 dígitos (CPF) ou 14 (CNPJ) após normalização.",
    );
  }

  const emailRaw = process.env.SEED_ADMIN_EMAIL?.trim();
  const email = emailRaw && emailRaw.length > 0 ? emailRaw.toLowerCase() : null;

  await prisma.user.upsert({
    where: { cpfCnpj },
    create: {
      cpfCnpj,
      name: "Administrador",
      role: "ADMIN",
      ...(email ? { email } : {}),
    },
    update: {
      role: "ADMIN",
      ...(email ? { email } : {}),
    },
  });

  console.info(
    `Seed: admin disponível com CPF/CNPJ ${cpfCnpj}${email ? ` e email ${email}` : ""}`,
  );
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
