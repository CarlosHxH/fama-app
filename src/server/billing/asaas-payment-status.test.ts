import {
  mapAsaasPaymentStatusToPortal,
  resolvePortalStatusTransition,
} from "./asaas-payment-status";

describe("mapAsaasPaymentStatusToPortal", () => {
  it("mapeia CONFIRMED para RECEIVED", () => {
    expect(mapAsaasPaymentStatusToPortal("CONFIRMED")).toBe("RECEIVED");
  });

  it("mapeia estados cancelados", () => {
    expect(mapAsaasPaymentStatusToPortal("DELETED")).toBe("CANCELLED");
  });
});

describe("resolvePortalStatusTransition", () => {
  it("não altera quando o estado é igual", () => {
    expect(resolvePortalStatusTransition("PENDING", "PENDING")).toBeNull();
  });

  it("não regredir de RECEIVED para PENDING", () => {
    expect(resolvePortalStatusTransition("RECEIVED", "PENDING")).toBeNull();
  });

  it("avança de PENDING para RECEIVED", () => {
    expect(resolvePortalStatusTransition("PENDING", "RECEIVED")).toBe(
      "RECEIVED",
    );
  });
});
