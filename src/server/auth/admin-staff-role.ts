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
  return staffRole ?? "ATENDENTE";
}

/** Quem pode emitir cobranças Asaas (painel). */
export function canIssueCharges(staffRole: Role | null): boolean {
  return staffRole === "ADMIN" || staffRole === "FINANCEIRO";
}

/** Quem pode alterar contactos de clientes. */
export function canEditCustomerContacts(staffRole: Role | null): boolean {
  return staffRole === "ADMIN" || staffRole === "FINANCEIRO";
}

/** Criar, editar ou desativar contas de funcionários (`User`). Apenas ADMIN. */
export function canManageStaffUsers(staffRole: Role | null): boolean {
  return staffRole === "ADMIN";
}
