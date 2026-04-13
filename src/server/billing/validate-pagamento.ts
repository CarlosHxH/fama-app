import { TRPCError } from "@trpc/server";

import type { TipoPagamento } from "../../../generated/prisma/client";

/**
 * Regra de domínio: manutenção exige jazigo (validação na API, não no DDL).
 */
export function assertPagamentoManutencaoTemJazigo(input: {
  tipo: TipoPagamento;
  jazigoId: string | null | undefined;
}): void {
  if (input.tipo === "MANUTENCAO" && !input.jazigoId) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message:
        "Pagamentos do tipo MANUTENCAO devem estar associados a um jazigo (jazigoId).",
    });
  }
}
