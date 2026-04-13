import { normalizeCpfCnpjDigits, pickRow, str } from "./row-utils";

/**
 * Forma de linha típica de `dbo.Cessionarios` (nomes de colunas do export schema_*.json).
 */
describe("mapeamento de linha MSSQL → campos Customer", () => {
  const row: Record<string, unknown> = {
    CodCessionario: 42,
    Cessionario: "Maria Silva",
    CPF: "123.456.789-01",
    Email: "maria@exemplo.pt",
  };

  it("resolve nome em Cessionario", () => {
    const nome =
      str(
        pickRow(row, [
          "Cessionario",
          "cessionario",
          "Nome",
          "nome",
          "RazaoSocial",
          "razaoSocial",
        ]),
        500,
      ) || "Sem nome";
    expect(nome).toBe("Maria Silva");
  });

  it("resolve CPF na coluna CPF", () => {
    const cpf = normalizeCpfCnpjDigits(
      pickRow(row, [
        "CPF",
        "cpf",
        "CpfCnpj",
        "cpfCnpj",
        "NumCpfCnpj",
        "numCpfCnpj",
        "CpfCgc",
      ]),
    );
    expect(cpf).toBe("12345678901");
  });

  it("resolve Email", () => {
    const emailRaw = str(pickRow(row, ["Email", "email"]), 320);
    expect(emailRaw).toBe("maria@exemplo.pt");
  });
});
