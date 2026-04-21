import { hash } from "bcrypt-ts";
import { PrismaClient } from "../generated/prisma/client";

const db = new PrismaClient();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function env(key: string, fallback?: string): string {
  const val = process.env[key] ?? fallback;
  if (!val) throw new Error(`Variável de ambiente obrigatória ausente: ${key}`);
  return val;
}

// ---------------------------------------------------------------------------
// Admin
// ---------------------------------------------------------------------------

async function seedAdmin() {
  const email = "admin@fama.com";
  const password = "fama2025!";
  const senhaHash = await hash(password, 12);
    console.log(senhaHash)
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

seedAdmin();