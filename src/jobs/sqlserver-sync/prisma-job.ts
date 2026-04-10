import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client";

export function createJobPrisma(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL é obrigatório para o job de sincronização.");
  }
  return new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });
}
