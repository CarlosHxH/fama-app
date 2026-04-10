import { createConnection } from "node:net";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Espera até `host:port` aceitar TCP (útil após subir a VPN).
 */
export async function waitForTcpReachable(
  host: string,
  port: number,
  options: { maxRetries: number; delayMs: number; connectTimeoutMs: number },
): Promise<void> {
  let lastErr: Error | undefined;

  for (let attempt = 0; attempt < options.maxRetries; attempt++) {
    try {
      await new Promise<void>((resolve, reject) => {
        const socket = createConnection({ host, port });
        socket.setTimeout(options.connectTimeoutMs);
        socket.once("connect", () => {
          socket.end();
          resolve();
        });
        socket.once("error", (err) => {
          socket.destroy();
          reject(err);
        });
        socket.once("timeout", () => {
          socket.destroy();
          reject(new Error(`timeout ${options.connectTimeoutMs}ms`));
        });
      });
      return;
    } catch (e) {
      lastErr = e instanceof Error ? e : new Error(String(e));
      if (attempt < options.maxRetries - 1) {
        await sleep(options.delayMs);
      }
    }
  }

  throw new Error(
    `TCP ${host}:${port} indisponível após ${options.maxRetries} tentativas: ${lastErr?.message ?? "erro"}`,
  );
}
