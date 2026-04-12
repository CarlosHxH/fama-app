import { buildPaymentBucketWhere } from "./payment-bucket";

describe("buildPaymentBucketWhere", () => {
  it("retorna undefined para all", () => {
    expect(buildPaymentBucketWhere("all")).toBeUndefined();
  });

  it("pending filtra status PENDING", () => {
    const w = buildPaymentBucketWhere("pending");
    expect(w).toEqual({ status: "PENDING" });
  });

  it("received filtra RECEIVED ou CONFIRMED", () => {
    expect(buildPaymentBucketWhere("received")).toEqual({
      OR: [{ status: "RECEIVED" }, { status: "CONFIRMED" }],
    });
  });

  it("overdue inclui OVERDUE ou PENDING com fatura vencida", () => {
    const w = buildPaymentBucketWhere("overdue");
    expect(w).toBeDefined();
    expect(w?.OR).toHaveLength(2);
    expect(w?.OR?.[0]).toEqual({ status: "OVERDUE" });
    const second = w?.OR?.[1] as
      | { AND: [{ status: string }, { invoice: unknown }] }
      | undefined;
    expect(second?.AND?.[0]).toEqual({ status: "PENDING" });
    const invoiceFilter = second?.AND?.[1] as {
      invoice: { is: { dueDate: { lt: Date } } };
    };
    expect(invoiceFilter.invoice.is.dueDate.lt).toBeInstanceOf(Date);
  });
});
