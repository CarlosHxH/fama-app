import { isPrismaConnectionError } from "./is-prisma-connection-error";

describe("isPrismaConnectionError", () => {
  it("detecta mensagem de autenticação PostgreSQL inválida", () => {
    expect(
      isPrismaConnectionError(
        new Error(
          "Authentication failed against database server, the provided database credentials for `postgres` are not valid.",
        ),
      ),
    ).toBe(true);
  });

  it("detecta PrismaClientInitializationError pelo name", () => {
    const e = new Error("init");
    Object.assign(e, { name: "PrismaClientInitializationError" });
    expect(isPrismaConnectionError(e)).toBe(true);
  });

  it("detecta códigos P1000 / P1001", () => {
    expect(isPrismaConnectionError({ code: "P1000", message: "" })).toBe(true);
    expect(isPrismaConnectionError({ code: "P1001", message: "" })).toBe(true);
  });

  it("não trata erro genérico como ligação", () => {
    expect(isPrismaConnectionError(new Error("outro"))).toBe(false);
    expect(isPrismaConnectionError(null)).toBe(false);
  });
});
