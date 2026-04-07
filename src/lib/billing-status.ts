/** Alinhado ao enum Prisma `BillingPaymentStatus`. */
export type BillingPaymentStatus =
  | "PENDING"
  | "RECEIVED"
  | "OVERDUE"
  | "REFUNDED"
  | "CANCELLED"
  | "UNKNOWN";

/** Cobranças consideradas quitadas para UI (parcelas pagas). */
export function isBillingPaid(status: BillingPaymentStatus): boolean {
  return status === "RECEIVED";
}

/** Pode ser selecionada para pagamento PIX pendente. */
export function isBillingPendingPayment(status: BillingPaymentStatus): boolean {
  return status === "PENDING" || status === "OVERDUE";
}
