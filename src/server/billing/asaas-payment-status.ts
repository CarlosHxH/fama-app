import type { StatusPagamento } from "../../../generated/prisma/client";

/**
 * Converte o `status` devolvido pelo Asaas para `StatusPagamento` persistido.
 */
export function mapAsaasToStatusPagamento(asaasStatus: string): StatusPagamento {
  const s = asaasStatus.toUpperCase();
  switch (s) {
    case "PENDING":
      return "PENDENTE";
    case "RECEIVED":
    case "CONFIRMED":
      return "PAGO";
    case "OVERDUE":
      return "ATRASADO";
    case "REFUNDED":
      return "ESTORNADO";
    case "DELETED":
    case "CANCELLED":
      return "CANCELADO";
    default:
      return "PENDENTE";
  }
}

/**
 * Atualização idempotente do status (webhooks repetidos).
 */
export function resolvePagamentoStatusTransition(
  current: StatusPagamento,
  incoming: StatusPagamento,
): StatusPagamento | null {
  if (incoming === current) {
    return null;
  }
  if (current === "PAGO" && incoming === "PENDENTE") {
    return null;
  }
  if (current === "CANCELADO" || current === "ESTORNADO") {
    return null;
  }
  return incoming;
}
