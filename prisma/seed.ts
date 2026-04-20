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
  const email = "admin@fama.com"; //env("SEED_ADMIN_EMAIL", "admin@fama.com");
  const password = "fama2025!"; //env("SEED_ADMIN_PASSWORD", "fama2025!");
  const senhaHash = await hash(password, 12);

  await db.user.upsert({
    where: { email },
    update: {},          // não sobrescreve senha se já existe
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

// ---------------------------------------------------------------------------
// Tarifas — Decreto 4.332/2023
// ---------------------------------------------------------------------------

const TARIFAS = [
  { quantidadeGavetas: 1, valorMensalidade: 60.0,  descricao: "Simples" },
  { quantidadeGavetas: 2, valorMensalidade: 120.0, descricao: "Duplo" },
  { quantidadeGavetas: 3, valorMensalidade: 180.0, descricao: "Triplo" },
  { quantidadeGavetas: 6, valorMensalidade: 360.0, descricao: "Sêxtuplo" },
];

const DECRETO = "Decreto 4.332/2023";
const VIGENCIA = new Date("2023-01-01T00:00:00.000Z");

async function seedTarifas() {
  for (const t of TARIFAS) {
    await db.tarifaJazigo.upsert({
      where: {
        quantidadeGavetas_vigenteDesde: {
          quantidadeGavetas: t.quantidadeGavetas,
          vigenteDesde: VIGENCIA,
        },
      },
      update: {},  // não altera valores já existentes
      create: {
        quantidadeGavetas: t.quantidadeGavetas,
        valorMensalidade: t.valorMensalidade,
        vigenteDesde: VIGENCIA,
        decretoCriador: DECRETO,
        observacoes: `${t.descricao} — R$ ${t.valorMensalidade.toFixed(2)}/mês`,
      },
    });

    console.log(`✓ Tarifa ${t.descricao} (${t.quantidadeGavetas} gav.): R$ ${t.valorMensalidade.toFixed(2)}`);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("Iniciando seed…\n");
  await seedAdmin();
  console.log();
  await seedTarifas();
  console.log("\nSeed concluído.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
