import { buildPaymentBucketWhere } from "./payment-bucket";

describe("buildPaymentBucketWhere", () => {
  it("retorna undefined para all", () => {
    expect(buildPaymentBucketWhere("all")).toBeUndefined();
  });

  it("pending filtra status PENDENTE", () => {
    const w = buildPaymentBucketWhere("pending");
    expect(w).toEqual({ status: "PENDENTE" });
  });

  it("received filtra PAGO", () => {
    expect(buildPaymentBucketWhere("received")).toEqual({
      status: "PAGO",
    });
  });

  it("overdue inclui ATRASADO ou PENDENTE com vencimento passado", () => {
    const w = buildPaymentBucketWhere("overdue");
    expect(w).toBeDefined();
    expect(w?.OR).toHaveLength(2);
    expect(w?.OR?.[0]).toEqual({ status: "ATRASADO" });
    const second = w?.OR?.[1] as
      | { AND: [{ status: string }, { dataVencimento: { lt: Date } }] }
      | undefined;
    expect(second?.AND?.[0]).toEqual({ status: "PENDENTE" });
    const due = second?.AND?.[1] as { dataVencimento: { lt: Date } };
    expect(due.dataVencimento.lt).toBeInstanceOf(Date);
  });
});
