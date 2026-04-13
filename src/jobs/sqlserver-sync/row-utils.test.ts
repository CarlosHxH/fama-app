import { normalizeCpfCnpjDigits, pickRow, toBigInt } from "./row-utils";

describe("toBigInt", () => {
  it("converte número e string", () => {
    expect(toBigInt(42n)).toBe(42n);
    expect(toBigInt(10)).toBe(10n);
    expect(toBigInt("123")).toBe(123n);
    expect(toBigInt("1.234,56")).toBe(1n);
  });

  it("devolve null para inválido", () => {
    expect(toBigInt(null)).toBeNull();
    expect(toBigInt("")).toBeNull();
    expect(toBigInt("x")).toBeNull();
  });
});

describe("normalizeCpfCnpjDigits", () => {
  it("remove máscara", () => {
    expect(normalizeCpfCnpjDigits("123.456.789-01")).toBe("12345678901");
  });

  it("null se poucos dígitos", () => {
    expect(normalizeCpfCnpjDigits("123")).toBeNull();
  });
});

describe("pickRow", () => {
  it("é case-insensitive", () => {
    expect(pickRow({ CodFoo: 1 }, ["codfoo", "CodFoo"])).toBe(1);
  });
});
