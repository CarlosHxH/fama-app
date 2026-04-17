import {
  syncLogStatusBadgeClassName,
  syncLogStatusLabel,
} from "./sync-log-ui";

describe("syncLogStatusLabel", () => {
  it("mapeia estados conhecidos do Prisma SyncStatus", () => {
    expect(syncLogStatusLabel("SUCESSO")).toBe("Sucesso");
    expect(syncLogStatusLabel("FALHA")).toBe("Falha");
    expect(syncLogStatusLabel("PROCESSANDO")).toBe("Em execução");
  });

  it("devolve o valor bruto quando o estado é desconhecido", () => {
    expect(syncLogStatusLabel("OUTRO")).toBe("OUTRO");
  });
});

describe("syncLogStatusBadgeClassName", () => {
  it("retorna classes distintas por estado", () => {
    expect(syncLogStatusBadgeClassName("SUCESSO")).toContain("jardim-green");
    expect(syncLogStatusBadgeClassName("FALHA")).toContain("red-");
    expect(syncLogStatusBadgeClassName("PROCESSANDO")).toContain("amber-");
  });
});
