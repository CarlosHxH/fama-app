import {
  isValidCpfCnpjLength,
  normalizeCpfCnpjDigits,
  isValidCpfCnpjChecksum,
} from "./normalize-cpf-cnpj";

describe("normalizeCpfCnpjDigits", () => {
  it("remove máscara", () => {
    expect(normalizeCpfCnpjDigits("123.456.789-01")).toBe("12345678901");
  });
});

describe("isValidCpfCnpjLength", () => {
  it("aceita 11 e 14 dígitos", () => {
    expect(isValidCpfCnpjLength("12345678901")).toBe(true);
    expect(isValidCpfCnpjLength("12345678000199")).toBe(true);
    expect(isValidCpfCnpjLength("123")).toBe(false);
  });
});

describe("isValidCpfCnpjChecksum", () => {
  it("aceita CPF válido", () => {
    expect(isValidCpfCnpjChecksum("52998224725")).toBe(true);
  });
  it("rejeita CPF com dígito verificador errado", () => {
    expect(isValidCpfCnpjChecksum("52998224724")).toBe(false);
  });
  it("rejeita CPF com todos dígitos iguais", () => {
    expect(isValidCpfCnpjChecksum("00000000000")).toBe(false);
    expect(isValidCpfCnpjChecksum("11111111111")).toBe(false);
  });
  it("aceita CNPJ válido", () => {
    expect(isValidCpfCnpjChecksum("11222333000181")).toBe(true);
  });
  it("rejeita CNPJ com dígito verificador errado", () => {
    expect(isValidCpfCnpjChecksum("11222333000182")).toBe(false);
  });
  it("rejeita CNPJ com todos dígitos iguais", () => {
    expect(isValidCpfCnpjChecksum("00000000000000")).toBe(false);
  });
  it("rejeita comprimento errado", () => {
    expect(isValidCpfCnpjChecksum("123")).toBe(false);
  });
});
