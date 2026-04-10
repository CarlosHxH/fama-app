import { resolveBillingContactEmail } from "./resolve-billing-email";

describe("resolveBillingContactEmail", () => {
  it("prioriza o e-mail do formulário", () => {
    expect(
      resolveBillingContactEmail("a@old.com", "  b@new.com  "),
    ).toBe("b@new.com");
  });

  it("usa o perfil quando o formulário está vazio", () => {
    expect(resolveBillingContactEmail("perfil@x.com", undefined)).toBe(
      "perfil@x.com",
    );
    expect(resolveBillingContactEmail("perfil@x.com", "   ")).toBe(
      "perfil@x.com",
    );
  });

  it("retorna undefined quando ambos faltam", () => {
    expect(resolveBillingContactEmail(null, undefined)).toBeUndefined();
    expect(resolveBillingContactEmail(undefined, "")).toBeUndefined();
  });
});
