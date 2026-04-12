import { getTitularLegacySnapshot } from "~/server/legacy/titular-snapshot";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

/**
 * Dados do titular a partir do modelo Postgres (substitui o espelho MSSQL).
 */
export const legacyRouter = createTRPCRouter({
  titularSnapshot: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.session.user.accountKind !== "portal") {
      return {
        cessionario: null,
        cessionariosPlanos: [] as Record<string, unknown>[],
        boletos: [] as Record<string, unknown>[],
      };
    }
    const cpf = ctx.session.user.cpfCnpj;
    return getTitularLegacySnapshot(cpf);
  }),
});
