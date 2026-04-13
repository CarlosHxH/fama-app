import {
  rowToJsonPayload,
  rowToSourceKey,
  rowToSourceKeyFromSpec,
} from "./transform";

describe("rowToSourceKey", () => {
  it("extrai chave string", () => {
    expect(rowToSourceKey("id", { id: "abc", x: 1 })).toBe("abc");
  });

  it("extrai chave numérica", () => {
    expect(rowToSourceKey("id", { id: 42 })).toBe("42");
  });

  it("resolve coluna com casing diferente", () => {
    expect(rowToSourceKey("CodCessionario", { codcessionario: 7 })).toBe("7");
  });

  it("extrai Date como ISO", () => {
    const d = new Date("2025-01-15T12:00:00.000Z");
    expect(rowToSourceKey("id", { id: d })).toBe(d.toISOString());
  });

  it("lança se chave em falta", () => {
    expect(() => rowToSourceKey("id", { other: 1 })).toThrow(/Coluna de chave/);
  });
});

describe("rowToSourceKeyFromSpec", () => {
  it("usa keyColumn única", () => {
    expect(
      rowToSourceKeyFromSpec(
        { keyColumn: "id" },
        { id: 42, x: "a" },
      ),
    ).toBe("42");
  });

  it("concatena chave composta", () => {
    expect(
      rowToSourceKeyFromSpec(
        { keyColumns: ["CodPlano", "CodPeriodicidade"] },
        { CodPlano: 1, CodPeriodicidade: 2 },
      ),
    ).toBe("1|2");
  });
});

describe("rowToJsonPayload", () => {
  it("serializa objeto sem transform", () => {
    const p = rowToJsonPayload({ a: 1, b: "x" });
    expect(p).toEqual({ a: 1, b: "x" });
  });

  it("aplica transform", () => {
    const p = rowToJsonPayload(
      { a: 1 },
      (r) => ({ doubled: Number(r.a) * 2 }),
    );
    expect(p).toEqual({ doubled: 2 });
  });
});
