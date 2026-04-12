import type { Role } from "../../../generated/prisma/client";

export type AppSessionRole = "USER" | "ADMIN";

/**
 * Papel efetivo na API (sessão admin). Portal usa `staffRole === null`.
 */
export function resolveStaffRole(
  accountKind: "portal" | "admin",
  staffRole: Role | null | undefined,
): Role | null {
  if (accountKind !== "admin") return null;
  return staffRole ?? "EMPLOYEE";
}

/** Quem pode emitir cobranças Asaas (painel). */
export function canIssueCharges(staffRole: Role | null): boolean {
  return staffRole === "ADMIN" || staffRole === "MANAGER";
}

/** Quem pode alterar contactos de clientes. */
export function canEditCustomerContacts(staffRole: Role | null): boolean {
  return staffRole === "ADMIN" || staffRole === "MANAGER";
}
