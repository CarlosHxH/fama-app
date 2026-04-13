/**
 * Evita open redirect: só permite caminhos relativos no mesmo site.
 */
export function safeCallbackUrl(raw: string | null, fallback: string): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return fallback;
  return raw;
}
