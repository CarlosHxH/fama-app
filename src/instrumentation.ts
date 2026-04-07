/**
 * Executado uma vez ao arrancar o servidor Next.js.
 * Regista rejeições não tratadas (útil a diagnosticar falhas de build/cache em dev).
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }

  process.on("unhandledRejection", (reason, promise) => {
    console.error("[unhandledRejection]", reason, promise);
  });

  process.on("uncaughtException", (err) => {
    console.error("[uncaughtException]", err);
  });
}
