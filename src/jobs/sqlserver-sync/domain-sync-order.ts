import type { JobEnv } from "./job-env";
import { getSyncMappings, type SyncMapping } from "./sync-mappings";

/**
 * Ordem respeitando FKs: cliente → contrato → jazigo → responsável → pagamentos →
 * endereços/telefones (replace por cliente).
 */
const DOMAIN_SYNC_IDS: readonly string[] = [
  "cessionarios",
  "cessionarios-planos",
  "jazigos",
  "cessionarios-planos-responsavel",
  "boletos",
  "cessionarios-enderecos",
  "cessionarios-fones",
] as const;

export function getDomainSyncMappings(env: JobEnv): SyncMapping[] {
  const all = getSyncMappings(env);
  const byId = new Map(all.map((m) => [m.id, m]));
  return DOMAIN_SYNC_IDS.map((id) => byId.get(id)).filter(
    (m): m is SyncMapping => m !== undefined,
  );
}
