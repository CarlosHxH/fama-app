import {
  type BillingPaymentStatus,
  isBillingPaid,
  isBillingPendingPayment,
} from "./billing-status";

describe("isBillingPaid", () => {
  it("RECEIVED é pago", () => {
    expect(isBillingPaid("RECEIVED")).toBe(true);
  });

  it("outros estados não são pagos", () => {
    const others: BillingPaymentStatus[] = [
      "PENDING",
      "OVERDUE",
      "REFUNDED",
      "CANCELLED",
      "UNKNOWN",
    ];
    for (const s of others) {
      expect(isBillingPaid(s)).toBe(false);
    }
  });
});

describe("isBillingPendingPayment", () => {
  it("PENDING e OVERDUE são pendente de pagamento", () => {
    expect(isBillingPendingPayment("PENDING")).toBe(true);
    expect(isBillingPendingPayment("OVERDUE")).toBe(true);
  });

  it("RECEIVED não é pendente", () => {
    expect(isBillingPendingPayment("RECEIVED")).toBe(false);
  });
});
