import { TRPCError } from "@trpc/server";

import { assertPagamentoManutencaoTemJazigo } from "./validate-pagamento";

describe("assertPagamentoManutencaoTemJazigo", () => {
  it("permite MANUTENCAO com jazigoId", () => {
    expect(() =>
      assertPagamentoManutencaoTemJazigo({
        tipo: "MANUTENCAO",
        jazigoId: "550e8400-e29b-41d4-a716-446655440000",
      }),
    ).not.toThrow();
  });

  it("rejeita MANUTENCAO sem jazigoId", () => {
    expect(() =>
      assertPagamentoManutencaoTemJazigo({ tipo: "MANUTENCAO", jazigoId: null }),
    ).toThrow(TRPCError);
  });

  it("permite TAXA_SERVICO sem jazigo", () => {
    expect(() =>
      assertPagamentoManutencaoTemJazigo({
        tipo: "TAXA_SERVICO",
        jazigoId: null,
      }),
    ).not.toThrow();
  });
});
