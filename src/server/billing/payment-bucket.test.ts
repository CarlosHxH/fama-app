import { buildPaymentBucketWhere } from "./payment-bucket";

describe("buildPaymentBucketWhere", () => {
  it("retorna undefined para all", () => {
    expect(buildPaymentBucketWhere("all")).toBeUndefined();
  });

  it("pending filtra status PENDING", () => {
    const w = buildPaymentBucketWhere("pending");
    expect(w).toEqual({ status: "PENDING" });
  });

  it("received filtra RECEIVED", () => {
    expect(buildPaymentBucketWhere("received")).toEqual({
      status: "RECEIVED",
    });
  });

  it("overdue inclui OVERDUE ou PENDING vencido", () => {
    const w = buildPaymentBucketWhere("overdue");
    expect(w).toBeDefined();
    expect(w?.OR).toHaveLength(2);
    expect(w?.OR?.[0]).toEqual({ status: "OVERDUE" });
    expect(w?.OR?.[1]).toMatchObject({ status: "PENDING" });
  });
});
