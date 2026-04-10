/**
 * Executado uma vez ao arrancar o servidor Next.js.
 * Regista rejeições não tratadas (útil a diagnosticar falhas de build/cache em dev).
 *
 * Os handlers que usam `process` ficam num módulo à parte e só são importados em
 * runtime Node — evita que o bundle Edge analise `process.on` (ver aviso Turbopack).
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }

  const { registerNodeErrorHandlers } = await import(
    "./register-node-error-handlers"
  );
  registerNodeErrorHandlers();
}
