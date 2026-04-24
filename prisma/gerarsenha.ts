import { hash } from "bcrypt-ts";
import { PrismaClient } from "../generated/prisma/client";

const db = new PrismaClient();

async function main():Promise<void> {
  const email = "admin@fama.com";
  const password = "fama2025!";
  const senhaHash = await hash(password, 12);
  await db.user.upsert({
    where: { email },
    update: { senha: senhaHash },
    create: {
      email,
      nome: "Administrador",
      senha: senhaHash,
      role: "ADMIN",
      ativo: true,
    },
  });

  console.log(`✓ Admin: ${email}`);
}

void main().catch((err) => {
  console.error('\n✗ Erro fatal:', err);
  process.exit(1);
});