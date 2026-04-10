declare module "node-openvpn" {
  import type { EventEmitter } from "node:events";

  export interface OpenVpnConnectParams {
    host?: string;
    port?: number;
    /** Segundos no `telnet-client` (ex.: 2). */
    timeout?: number;
    shellPrompt?: string;
    logpath?: string;
  }

  export interface OpenVpnAuth {
    user: string;
    pass: string;
  }

  interface OpenVpnManager {
    connect: (params: OpenVpnConnectParams) => EventEmitter;
    connectAndKill: (params: OpenVpnConnectParams) => EventEmitter;
    authorize: (auth: OpenVpnAuth) => Promise<void>;
    disconnect: () => Promise<void>;
    destroy: () => void;
    cmd: (cmd: string) => Promise<unknown>;
  }

  const openvpnManager: OpenVpnManager;
  export default openvpnManager;
}
