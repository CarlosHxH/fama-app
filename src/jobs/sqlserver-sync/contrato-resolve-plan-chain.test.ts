import {
  resolveContratoFromPlanOrChainImpl,
  type ContratoHead,
} from "./contrato-resolve-plan-chain";

describe("resolveContratoFromPlanOrChainImpl", () => {
  const fromPlano: ContratoHead = { id: "plan-uuid", customerId: "cust-1" };
  const fromChain: ContratoHead = { id: "chain-uuid", customerId: "cust-2" };

  it("prioriza plano quando ambos existem", async () => {
    const find = jest.fn(async (id: number) => {
      if (id === 100) return fromPlano;
      if (id === 200) return fromChain;
      return null;
    });
    const r = await resolveContratoFromPlanOrChainImpl(
      { planSqlId: 100, contratoSqlId: 200 },
      find,
    );
    expect(r).toEqual(fromPlano);
    expect(find).toHaveBeenCalledWith(100);
    expect(find).not.toHaveBeenCalledWith(200);
  });

  it("usa CodContrato quando o plano não resolve", async () => {
    const find = jest.fn(async (id: number) => {
      if (id === 100) return null;
      if (id === 200) return fromChain;
      return null;
    });
    const r = await resolveContratoFromPlanOrChainImpl(
      { planSqlId: 100, contratoSqlId: 200 },
      find,
    );
    expect(r).toEqual(fromChain);
    expect(find).toHaveBeenCalledWith(100);
    expect(find).toHaveBeenCalledWith(200);
  });

  it("retorna null quando nenhum resolve", async () => {
    const find = jest.fn(async () => null);
    const r = await resolveContratoFromPlanOrChainImpl(
      { planSqlId: 1, contratoSqlId: 2 },
      find,
    );
    expect(r).toBeNull();
  });
});
