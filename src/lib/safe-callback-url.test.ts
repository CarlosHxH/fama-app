import { safeCallbackUrl } from "./safe-callback-url";

describe("safeCallbackUrl", () => {
  it("aceita caminho relativo seguro", () => {
    expect(safeCallbackUrl("/admin", "/cobranca")).toBe("/admin");
  });

  it("rejeita open redirect", () => {
    expect(safeCallbackUrl("//evil.com", "/cobranca")).toBe("/cobranca");
    expect(safeCallbackUrl("https://evil.com", "/cobranca")).toBe("/cobranca");
    expect(safeCallbackUrl(null, "/cobranca")).toBe("/cobranca");
  });
});
