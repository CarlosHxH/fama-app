import type { AdminStaffRole } from "../../../generated/prisma/client";

/**
 * Papel efetivo no painel admin. Se `adminStaffRole` for null na BD, trata-se como SUPER_ADMIN.
 */
export function resolveAdminStaffRole(
  appRole: "USER" | "ADMIN",
  staff: AdminStaffRole | null | undefined,
): AdminStaffRole | null {
  if (appRole !== "ADMIN") return null;
  return staff ?? "SUPER_ADMIN";
}
