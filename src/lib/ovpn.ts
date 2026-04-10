import "server-only";

import type { EventEmitter } from "node:events";
import openvpnManagerRaw from "node-openvpn";

/**
 * Cliente para a **interface de gestão** do OpenVPN (Telnet), via `node-openvpn`.
 *
 * Isto **não** arranca o binário `openvpn` nem lê o `.ovpn` sozinho. O processo OpenVPN
 * tem de estar a correr com `management <host> <port>` na config (ex.: `management 127.0.0.1 1337`).
 *
 * Variáveis de ambiente opcionais: `OVPN_MANAGEMENT_HOST`, `OVPN_MANAGEMENT_PORT`,
 * `OVPN_USERNAME`, `OVPN_PASSWORD` (para {@link authorizeOpenVpn} após `connected`).
 */

export type OpenVpnManagementOptions = {
  host?: string;
  port?: number;
  /** Timeout da ligação Telnet (ms), conforme `telnet-client` / pacote. */
  timeout?: number;
  logpath?: string;
};

export type OpenVpnCredentials = {
  user: string;
  pass: string;
};

/** API do pacote `node-openvpn` (CommonJS; cast explícito para o type-aware ESLint). */
type OpenVpnManagerApi = {
  connect: (params: OpenVpnManagementOptions) => EventEmitter;
  authorize: (auth: OpenVpnCredentials) => Promise<void>;
  disconnect: () => Promise<void>;
  destroy: () => void;
};

const openvpnManager = openvpnManagerRaw as OpenVpnManagerApi;

function resolveManagementOptions(
  overrides?: OpenVpnManagementOptions,
): OpenVpnManagementOptions {
  const host =
    overrides?.host ?? process.env.OVPN_MANAGEMENT_HOST ?? "127.0.0.1";
  const portStr =
    overrides?.port?.toString() ?? process.env.OVPN_MANAGEMENT_PORT ?? "1337";
  const port = Number(portStr);
  const timeoutStr =
    overrides?.timeout?.toString() ??
    process.env.OVPN_MANAGEMENT_TIMEOUT_MS ??
    "";
  const timeout = timeoutStr === "" ? undefined : Number(timeoutStr);
  const logpath = overrides?.logpath ?? process.env.OVPN_LOG_PATH;

  return {
    host,
    port: Number.isFinite(port) ? port : 1337,
    ...(timeout !== undefined && Number.isFinite(timeout) ? { timeout } : {}),
    ...(logpath ? { logpath } : {}),
  };
}

/**
 * Credenciais VPN a partir do ambiente (ambas obrigatórias se usar auth por utilizador).
 */
export function getOpenVpnCredentialsFromEnv(): OpenVpnCredentials | null {
  const user = process.env.OVPN_USERNAME;
  const pass = process.env.OVPN_PASSWORD;
  if (user === undefined || user === "" || pass === undefined || pass === "") {
    return null;
  }
  return { user, pass };
}

/**
 * Liga à consola de gestão. O emitter emite `connected`, `console-output`, `state-change`,
 * `error`, `disconnected`, etc., conforme `node-openvpn`.
 *
 * Após `connected`, se precisar de user/pass, chame {@link authorizeOpenVpn}
 * (por exemplo com {@link getOpenVpnCredentialsFromEnv}).
 */
export function connectOpenVpnManagement(
  overrides?: OpenVpnManagementOptions,
): EventEmitter {
  const opts = resolveManagementOptions(overrides);
  return openvpnManager.connect(opts);
}

export function authorizeOpenVpn(auth: OpenVpnCredentials): Promise<void> {
  return openvpnManager.authorize(auth);
}

export function disconnectOpenVpn(): Promise<void> {
  return openvpnManager.disconnect();
}

export function destroyOpenVpnManager(): void {
  openvpnManager.destroy();
}
