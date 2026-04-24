import { promisify } from "util";
import { exec } from "child_process";
import * as net from "net";
import * as path from "path";

const execAsync = promisify(exec);

const MANAGEMENT_HOST = "127.0.0.1";
const MANAGEMENT_PORT = 1337;
const OVPN_CONFIG = path.resolve(__dirname, "../config.ovpn");

export async function startVPN(): Promise<void> {
  console.log("[VPN] Iniciando túnel OpenVPN...");

  // Inicia o openvpn em background (requer sudo no Linux)
  execAsync(`sudo openvpn --config ${OVPN_CONFIG} --daemon`);

  // Aguarda o management socket ficar disponível
  await waitForManagement();
  console.log("[VPN] Túnel ativo e management conectado.");
}

function waitForManagement(
  maxRetries = 20,
  interval = 1500
): Promise<void> {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const try_ = () => {
      const socket = new net.Socket();
      socket.setTimeout(1000);

      socket.connect(MANAGEMENT_PORT, MANAGEMENT_HOST, () => {
        socket.destroy();
        resolve();
      });

      socket.on("error", () => {
        socket.destroy();
        attempts++;
        if (attempts >= maxRetries) {
          reject(new Error("[VPN] Management socket não respondeu a tempo."));
        } else {
          setTimeout(try_, interval);
        }
      });
    };

    try_();
  });
}

export function sendManagementCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const socket = new net.Socket();
    let response = "";

    socket.connect(MANAGEMENT_PORT, MANAGEMENT_HOST, () => {
      socket.write(command + "\n");
    });

    socket.on("data", (data) => {
      response += data.toString();
      if (response.includes("END") || response.includes("SUCCESS")) {
        socket.destroy();
        resolve(response);
      }
    });

    socket.on("error", reject);
    socket.setTimeout(5000, () => {
      socket.destroy();
      resolve(response); // retorna o que tiver
    });
  });
}

export async function getVPNStatus(): Promise<string> {
  return sendManagementCommand("status");
}

export async function stopVPN(): Promise<void> {
  console.log("[VPN] Encerrando túnel...");
  await sendManagementCommand("signal SIGTERM");
}