import { cn } from "~/lib/utils";

/**
 * Rótulo em português para o estado de uma linha em `SyncLog` (Prisma `SyncStatus`).
 */
export function syncLogStatusLabel(status: string): string {
  switch (status) {
    case "SUCESSO":
      return "Sucesso";
    case "FALHA":
      return "Falha";
    case "PROCESSANDO":
      return "Em execução";
    default:
      return status;
  }
}

/**
 * Classes Tailwind para badge de estado na UI de sincronizações.
 */
export function syncLogStatusBadgeClassName(status: string): string {
  switch (status) {
    case "SUCESSO":
      return "bg-jardim-green-mid/12 text-jardim-green-dark ring-jardim-green-mid/25";
    case "FALHA":
      return "bg-red-50 text-red-900 ring-red-200";
    default:
      return "bg-amber-50 text-amber-900 ring-amber-200";
  }
}

export function syncLogStatusBadgeClass(status: string): string {
  return cn(
    "inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
    syncLogStatusBadgeClassName(status),
  );
}
