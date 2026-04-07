/**
 * Indica falha de ligação / autenticação na base (Prisma), em vez de erro de credenciais do utilizador.
 */
export function isPrismaConnectionError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const o = err as { name?: string; code?: string; message?: string };
  if (o.name === "PrismaClientInitializationError") return true;
  if (o.code === "P1000" || o.code === "P1001" || o.code === "P1017")
    return true;
  const m = o.message ?? "";
  if (m.includes("Authentication failed against database")) return true;
  if (m.includes("Can't reach database server")) return true;
  return false;
}
