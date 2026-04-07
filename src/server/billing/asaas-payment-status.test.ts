import {
  mapAsaasPaymentStatusToBilling,
  resolveStatusTransition,
} from "./asaas-payment-status";

describe("mapAsaasPaymentStatusToBilling", () => {
  it("mapeia CONFIRMED para RECEIVED", () => {
    expect(mapAsaasPaymentStatusToBilling("CONFIRMED")).toBe("RECEIVED");
  });

  it("mapeia estados cancelados", () => {
    expect(mapAsaasPaymentStatusToBilling("DELETED")).toBe("CANCELLED");
  });
});

describe("resolveStatusTransition", () => {
  it("não altera quando o estado é igual", () => {
    expect(resolveStatusTransition("PENDING", "PENDING")).toBeNull();
  });

  it("não regredir de RECEIVED para PENDING", () => {
    expect(resolveStatusTransition("RECEIVED", "PENDING")).toBeNull();
  });

  it("avança de PENDING para RECEIVED", () => {
    expect(resolveStatusTransition("PENDING", "RECEIVED")).toBe("RECEIVED");
  });
});
