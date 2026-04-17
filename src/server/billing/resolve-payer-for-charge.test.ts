import {
  resolveResponsavelFinanceiroPayloadForAsaas,
  responsavelCobrancaComFonte,
} from "./resolve-payer-for-charge";

describe("resolveResponsavelFinanceiroPayloadForAsaas", () => {
  const legacy = {
    nome: "Legado",
    cpf: "00000000000001",
    email: "l@x.com",
  };
  const payer = {
    id: "a",
    nome: "Pagador",
    cpfCnpj: "12345678901",
    email: "p@x.com",
  };

  it("prioriza customer ligado ao jazigo", () => {
    expect(
      resolveResponsavelFinanceiroPayloadForAsaas(payer, legacy)?.nome,
    ).toBe("Pagador");
  });

  it("usa legado do contrato sem payer no jazigo", () => {
    expect(resolveResponsavelFinanceiroPayloadForAsaas(null, legacy)).toEqual({
      nome: "Legado",
      cpf: "00000000000001",
      email: "l@x.com",
    });
  });

  it("retorna null para fallback titular", () => {
    expect(resolveResponsavelFinanceiroPayloadForAsaas(null, null)).toBeNull();
  });
});

describe("responsavelCobrancaComFonte", () => {
  const titular = {
    nome: "Tit",
    cpfCnpj: "999",
    email: "t@t.com",
  };

  it("marca titular quando não há override", () => {
    const r = responsavelCobrancaComFonte(null, null, titular);
    expect(r.fonte).toBe("titular");
    expect(r.nome).toBe("Tit");
  });
});
