/**
 * Estados persistidos em `PortalPayment.status` (strings alinhadas ao Asaas).
 */
export type PortalPaymentStatusKey =
  | "PENDING"
  | "RECEIVED"
  | "OVERDUE"
  | "REFUNDED"
  | "CANCELLED"
  | "CONFIRMED"
  | "UNKNOWN";

/**
 * Converte o `status` devolvido pelo Asaas para o valor persistido.
 */
export function mapAsaasPaymentStatusToPortal(
  asaasStatus: string,
): PortalPaymentStatusKey {
  const s = asaasStatus.toUpperCase();
  switch (s) {
    case "PENDING":
      return "PENDING";
    case "RECEIVED":
    case "CONFIRMED":
      return "RECEIVED";
    case "OVERDUE":
      return "OVERDUE";
    case "REFUNDED":
      return "REFUNDED";
    case "DELETED":
    case "CANCELLED":
      return "CANCELLED";
    default:
      return "UNKNOWN";
  }
}

/**
 * Atualização idempotente do status (webhooks repetidos).
 */
export function resolvePortalStatusTransition(
  current: string,
  incoming: PortalPaymentStatusKey,
): PortalPaymentStatusKey | null {
  const c = current.toUpperCase();
  if (incoming === "UNKNOWN") {
    return null;
  }
  if (c === incoming) {
    return null;
  }
  if (
    (c === "RECEIVED" || c === "CONFIRMED") &&
    incoming === "PENDING"
  ) {
    return null;
  }
  if (c === "REFUNDED" || c === "CANCELLED") {
    return null;
  }
  return incoming;
}
