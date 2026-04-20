/**
 * Indica falha de ligação / autenticação na base (Prisma), em vez de erro de credenciais do utilizador.
 *
 * Códigos Prisma cobertos:
 *   P1000 — autenticação falhou
 *   P1001 — servidor não acessível
 *   P1002 — timeout de ligação
 *   P1008 — timeout de operação
 *   P1009 — base não existe
 *   P1010 — acesso negado
 *   P1017 — servidor fechou a ligação
 */
export function isPrismaConnectionError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const o = err as { name?: string; code?: string; message?: string };
  if (
    o.name === "PrismaClientInitializationError" ||
    o.name === "PrismaClientRustPanicError"
  ) return true;
  const CONNECTION_CODES = new Set(["P1000", "P1001", "P1002", "P1008", "P1009", "P1010", "P1017"]);
  if (o.code && CONNECTION_CODES.has(o.code)) return true;
  const m = o.message ?? "";
  if (m.includes("Authentication failed against database")) return true;
  if (m.includes("Can't reach database server")) return true;
  if (m.includes("Connection refused")) return true;
  if (m.includes("ECONNREFUSED") || m.includes("ETIMEDOUT")) return true;
  return false;
}
