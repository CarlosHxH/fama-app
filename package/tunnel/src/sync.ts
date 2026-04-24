import axios from "axios";

// Endpoint interno acessível apenas via VPN
const VPN_API_BASE = "http://10.8.0.1"; // ajuste para o IP interno da rede

export interface SyncPayload {
  timestamp: string;
  data: Record<string, unknown>;
}

export async function syncData(payload: SyncPayload): Promise<void> {
  console.log("[SYNC] Enviando dados para a rede interna...");

  const response = await axios.post(`${VPN_API_BASE}/api/sync`, payload, {
    timeout: 10_000,
    headers: { "Content-Type": "application/json" },
  });

  console.log("[SYNC] Resposta:", response.status, response.data);
}

export async function fetchRemoteData<T>(endpoint: string): Promise<T> {
  const response = await axios.get<T>(`${VPN_API_BASE}${endpoint}`, {
    timeout: 10_000,
  });
  return response.data;
}