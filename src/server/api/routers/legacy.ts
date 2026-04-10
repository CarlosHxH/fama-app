import { db } from "~/server/db";
import { getTitularLegacySnapshot } from "~/server/legacy/titular-snapshot";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

/**
 * Dados espelhados do SQL Server (`MssqlSyncRecord`) para o titular autenticado.
 */
export const legacyRouter = createTRPCRouter({
  titularSnapshot: protectedProcedure.query(async ({ ctx }) => {
    const user = await db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: { cpfCnpj: true, role: true },
    });
    if (user?.role !== "USER") {
      return {
        cessionario: null,
        cessionariosPlanos: [] as Record<string, unknown>[],
        boletos: [] as Record<string, unknown>[],
      };
    }
    return getTitularLegacySnapshot(user.cpfCnpj);
  }),
});
