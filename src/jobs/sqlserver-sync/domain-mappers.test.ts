import {
  mapLegacyBoletoToStatusPagamento,
  parseSqlServerDate,
} from "./domain-mappers";

describe("mapLegacyBoletoToStatusPagamento", () => {
  it("mapeia liquidado para PAGO", () => {
    expect(mapLegacyBoletoToStatusPagamento("LIQUIDADO")).toBe("PAGO");
    expect(mapLegacyBoletoToStatusPagamento("pago")).toBe("PAGO");
  });

  it("mapeia vencido e cancelado", () => {
    expect(mapLegacyBoletoToStatusPagamento("VENCIDO")).toBe("ATRASADO");
    expect(mapLegacyBoletoToStatusPagamento("cancelada")).toBe("CANCELADO");
  });

  it("default PENDENTE", () => {
    expect(mapLegacyBoletoToStatusPagamento("")).toBe("PENDENTE");
    expect(mapLegacyBoletoToStatusPagamento("DESCONHECIDO")).toBe("PENDENTE");
  });
});

describe("parseSqlServerDate", () => {
  it("usa campo *_as_isodate", () => {
    const d = parseSqlServerDate(
      { DataVencimento_as_isodate: "2025-04-08" },
      "DataVencimento",
    );
    expect(d?.toISOString().slice(0, 10)).toBe("2025-04-08");
  });

  it("aceita inteiro YYYYMMDD", () => {
    const d = parseSqlServerDate({ DataVencimento: 20250408 }, "DataVencimento");
    expect(d?.toISOString().slice(0, 10)).toBe("2025-04-08");
  });
});
