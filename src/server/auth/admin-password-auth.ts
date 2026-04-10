/**
 * Login admin por e-mail + palavra-passe (provider NextAuth `admin-password`).
 */

export type UserRowForAdminPassword = {
  role: string;
  passwordHash: string | null;
} | null;

/**
 * Normaliza o e-mail para lookup; devolve `null` se inválido para login.
 */
export function normalizeAdminLoginEmail(raw: string): string | null {
  const t = raw.trim().toLowerCase();
  if (t.length === 0 || t.length > 320) return null;
  if (!t.includes("@")) return null;
  return t;
}

/**
 * Rejeita antes de `bcrypt.compare` (evita timing desnecessário ou mensagens distintas).
 * `true` = não autenticar (credenciais inválidas genéricas).
 */
export function shouldRejectAdminLoginBeforeVerify(
  user: UserRowForAdminPassword,
): boolean {
  if (!user) return true;
  if (user.role !== "ADMIN") return true;
  if (!user.passwordHash?.trim()) return true;
  return false;
}
