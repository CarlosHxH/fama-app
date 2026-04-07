/**
 * Estados persistidos em `BillingPayment.status` (alinhados ao Prisma).
 */
export type BillingPaymentStatus =
  | "PENDING"
  | "RECEIVED"
  | "OVERDUE"
  | "REFUNDED"
  | "CANCELLED"
  | "UNKNOWN";

/**
 * Converte o campo `status` devolvido pela API Asaas (cobrança) para o enum interno.
 *
 * @param asaasStatus - Valor textual do Asaas (ex.: RECEIVED, PENDING).
 * @returns Estado persistido em `BillingPayment.status`.
 */
export function mapAsaasPaymentStatusToBilling(
  asaasStatus: string,
): BillingPaymentStatus {
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
 * Decide o novo estado da cobrança de forma idempotente (webhooks repetidos).
 *
 * @param current - Estado atual na base de dados.
 * @param incoming - Estado derivado do evento Asaas.
 * @returns `null` se não deve atualizar o campo `status`.
 */
export function resolveStatusTransition(
  current: BillingPaymentStatus,
  incoming: BillingPaymentStatus,
): BillingPaymentStatus | null {
  if (incoming === "UNKNOWN") {
    return null;
  }
  if (current === incoming) {
    return null;
  }
  if (current === "RECEIVED" && incoming === "PENDING") {
    return null;
  }
  if (current === "REFUNDED" || current === "CANCELLED") {
    return null;
  }
  return incoming;
}
