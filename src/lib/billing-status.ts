/** Estados de cobrança no portal (Asaas → serialização em `billing.listMine`). */
export type BillingPaymentStatus =
  | "PENDING"
  | "RECEIVED"
  | "CONFIRMED"
  | "OVERDUE"
  | "REFUNDED"
  | "CANCELLED"
  | "UNKNOWN";

/** Cobranças consideradas quitadas para UI (parcelas pagas). */
export function isBillingPaid(status: BillingPaymentStatus): boolean {
  return status === "RECEIVED" || status === "CONFIRMED";
}

/** Pode ser selecionada para pagamento PIX pendente. */
export function isBillingPendingPayment(status: BillingPaymentStatus): boolean {
  return status === "PENDING" || status === "OVERDUE";
}
