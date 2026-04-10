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

  it("rejeita USER", () => {
    expect(
      shouldRejectAdminLoginBeforeVerify({
        role: "USER",
        passwordHash: "$2a$12$xxx",
      }),
    ).toBe(true);
  });

  it("rejeita ADMIN sem passwordHash", () => {
    expect(
      shouldRejectAdminLoginBeforeVerify({
        role: "ADMIN",
        passwordHash: null,
      }),
    ).toBe(true);
  });

  it("aceita ADMIN com hash", () => {
    expect(
      shouldRejectAdminLoginBeforeVerify({
        role: "ADMIN",
        passwordHash: "$2a$12$hashed",
      }),
    ).toBe(false);
  });
});
