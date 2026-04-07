import "server-only";

import { env } from "~/env";

/**
 * Cliente HTTP mínimo para a API REST Asaas (v3).
 * A chave fica apenas no servidor; nunca exponha `ASAAS_API_KEY` ao cliente.
 *
 * @see https://docs.asaas.com/reference/comece-por-aqui
 */
export class AsaasApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "AsaasApiError";
  }
}

export async function asaasFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const key = env.ASAAS_API_KEY;
  if (!key) {
    throw new Error("ASAAS_API_KEY não configurada");
  }

  const base = env.ASAAS_API_URL.replace(/\/$/, "");
  const url = `${base}/${path.replace(/^\//, "")}`;

  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      access_token: key,
      ...init.headers,
    },
  });

  const text = await res.text();
  if (!res.ok) {
    throw new AsaasApiError(res.status, text || res.statusText);
  }

  if (!text) {
    return undefined as T;
  }

  return JSON.parse(text) as T;
}
