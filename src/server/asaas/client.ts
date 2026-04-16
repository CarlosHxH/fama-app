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
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "AsaasApiError";
  }
}

const ASAAS_TIMEOUT_MS = 15_000;

function parseAsaasBody(text: string): unknown {
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function asaasErrorMessage(
  status: number,
  statusText: string,
  body: unknown,
): string {
  if (typeof body === "string" && body.trim().length > 0) {
    return body;
  }
  if (body && typeof body === "object" && !Array.isArray(body)) {
    const message = (body as Record<string, unknown>).message;
    if (typeof message === "string" && message.trim().length > 0) {
      return message;
    }
    const errors = (body as Record<string, unknown>).errors;
    if (Array.isArray(errors) && errors.length > 0) {
      const first = errors[0];
      if (first && typeof first === "object" && !Array.isArray(first)) {
        const description = (first as Record<string, unknown>).description;
        if (typeof description === "string" && description.trim().length > 0) {
          return description;
        }
      }
    }
  }
  return statusText || `Erro HTTP ${status}`;
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
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ASAAS_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url, {
      ...init,
      signal: init.signal ?? controller.signal,
      headers: {
        "Content-Type": "application/json",
        access_token: key,
        ...init.headers,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new AsaasApiError(
        504,
        `Timeout ao comunicar com Asaas (${ASAAS_TIMEOUT_MS}ms).`,
      );
    }
    const message =
      error instanceof Error ? error.message : "Falha de rede ao chamar Asaas.";
    throw new AsaasApiError(503, message);
  } finally {
    clearTimeout(timeout);
  }

  const text = await res.text();
  const parsedBody = parseAsaasBody(text);
  if (!res.ok) {
    throw new AsaasApiError(
      res.status,
      asaasErrorMessage(res.status, res.statusText, parsedBody),
      parsedBody,
    );
  }

  if (parsedBody === null) {
    return undefined as T;
  }

  if (typeof parsedBody === "string") {
    throw new AsaasApiError(
      502,
      "Asaas retornou resposta inválida (não JSON).",
      parsedBody,
    );
  }

  return parsedBody as T;
}
