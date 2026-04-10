import {
  enrichLegacyIntDates,
  legacyIntDateToIso,
  LEGACY_DATE_COLUMNS_BOLETOS,
} from "./legacy-dates";

describe("legacyIntDateToIso", () => {
  it("converte YYYYMMDD inteiro para ISO", () => {
    expect(legacyIntDateToIso(20250408)).toBe("2025-04-08");
  });

  it("devolve null para inválido", () => {
    expect(legacyIntDateToIso(0)).toBeNull();
    expect(legacyIntDateToIso(20251399)).toBeNull();
  });
});

describe("enrichLegacyIntDates", () => {
  it("acrescenta *_as_isodate sem remover original", () => {
    const row = { DataVencimento: 20250115, Outro: 1 };
    const out = enrichLegacyIntDates(row, LEGACY_DATE_COLUMNS_BOLETOS);
    expect(out.DataVencimento).toBe(20250115);
    expect(out.DataVencimento_as_isodate).toBe("2025-01-15");
  });
});
