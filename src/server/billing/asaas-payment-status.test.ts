import {
  mapAsaasToStatusPagamento,
  resolvePagamentoStatusTransition,
} from "./asaas-payment-status";

describe("mapAsaasToStatusPagamento", () => {
  it("mapeia CONFIRMED para PAGO", () => {
    expect(mapAsaasToStatusPagamento("CONFIRMED")).toBe("PAGO");
  });

  it("mapeia estados cancelados", () => {
    expect(mapAsaasToStatusPagamento("DELETED")).toBe("CANCELADO");
  });
});

describe("resolvePagamentoStatusTransition", () => {
  it("não altera quando o estado é igual", () => {
    expect(
      resolvePagamentoStatusTransition("PENDENTE", "PENDENTE"),
    ).toBeNull();
  });

  it("não regredir de PAGO para PENDENTE", () => {
    expect(
      resolvePagamentoStatusTransition("PAGO", "PENDENTE"),
    ).toBeNull();
  });

  it("avança de PENDENTE para PAGO", () => {
    expect(
      resolvePagamentoStatusTransition("PENDENTE", "PAGO"),
    ).toBe("PAGO");
  });
});
