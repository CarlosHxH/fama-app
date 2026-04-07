import { digitsOnly, formatCpfCnpjDisplay } from "./format-cpf-cnpj";

describe("digitsOnly", () => {
  it("remove caracteres não numéricos", () => {
    expect(digitsOnly("12a3.45-6")).toBe("123456");
  });

  it("retorna string vazia quando não há dígitos", () => {
    expect(digitsOnly("abc")).toBe("");
  });
});

describe("formatCpfCnpjDisplay", () => {
  it("formata CPF progressivamente até 11 dígitos", () => {
    expect(formatCpfCnpjDisplay("123")).toBe("123");
    expect(formatCpfCnpjDisplay("123456")).toBe("123.456");
    expect(formatCpfCnpjDisplay("12345678901")).toBe("123.456.789-01");
  });

  it("formata CNPJ após 11 dígitos (até 14)", () => {
    expect(formatCpfCnpjDisplay("12345678901234")).toBe("12.345.678/9012-34");
  });

  it("ignora não dígitos e limita a 14 dígitos", () => {
    expect(formatCpfCnpjDisplay("123.456.789-0123456789extra")).toBe(
      "12.345.678/9012-34",
    );
  });
});
