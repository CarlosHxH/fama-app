import {
  normalizeAdminLoginEmail,
  shouldRejectAdminLoginBeforeVerify,
} from "./admin-password-auth";

describe("normalizeAdminLoginEmail", () => {
  it("normaliza e minúsculas", () => {
    expect(normalizeAdminLoginEmail("  Admin@EXAMPLE.com ")).toBe(
      "admin@example.com",
    );
  });

  it("rejeita sem @", () => {
    expect(normalizeAdminLoginEmail("not-an-email")).toBeNull();
  });

  it("rejeita vazio", () => {
    expect(normalizeAdminLoginEmail("   ")).toBeNull();
  });
});

describe("shouldRejectAdminLoginBeforeVerify", () => {
  it("rejeita utilizador inexistente", () => {
    expect(shouldRejectAdminLoginBeforeVerify(null)).toBe(true);
  });

  it("rejeita inativo", () => {
    expect(
      shouldRejectAdminLoginBeforeVerify({
        role: "ADMIN",
        password: "$2a$12$xxx",
        active: false,
      }),
    ).toBe(true);
  });

  it("rejeita sem password", () => {
    expect(
      shouldRejectAdminLoginBeforeVerify({
        role: "ADMIN",
        password: "",
        active: true,
      }),
    ).toBe(true);
  });

  it("aceita staff com password", () => {
    expect(
      shouldRejectAdminLoginBeforeVerify({
        role: "ADMIN",
        password: "$2a$12$hashed",
        active: true,
      }),
    ).toBe(false);
  });
});
