import {
  canEditCustomerContacts,
  canIssueCharges,
  canManageStaffUsers,
} from "./admin-staff-role";

describe("canManageStaffUsers", () => {
  it("só ADMIN pode gerir funcionários", () => {
    expect(canManageStaffUsers("ADMIN")).toBe(true);
    expect(canManageStaffUsers("FINANCEIRO")).toBe(false);
    expect(canManageStaffUsers("ATENDENTE")).toBe(false);
    expect(canManageStaffUsers(null)).toBe(false);
  });
});

describe("canIssueCharges", () => {
  it("ADMIN e FINANCEIRO podem emitir cobranças", () => {
    expect(canIssueCharges("ADMIN")).toBe(true);
    expect(canIssueCharges("FINANCEIRO")).toBe(true);
    expect(canIssueCharges("ATENDENTE")).toBe(false);
  });
});

describe("canEditCustomerContacts", () => {
  it("alinha-se a contactos de cliente", () => {
    expect(canEditCustomerContacts("ATENDENTE")).toBe(false);
    expect(canEditCustomerContacts("FINANCEIRO")).toBe(true);
  });
});
