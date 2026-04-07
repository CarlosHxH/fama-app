import {
  isValidCpfCnpjLength,
  normalizeCpfCnpjDigits,
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
