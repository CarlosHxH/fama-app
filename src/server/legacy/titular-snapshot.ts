import "server-only";

import { db } from "~/server/db";
import { normalizeCpfCnpjDigits } from "~/server/auth/normalize-cpf-cnpj";

export type TitularLegacySnapshot = {
  cessionario: Record<string, unknown> | null;
  cessionariosPlanos: Record<string, unknown>[];
  boletos: Record<string, unknown>[];
};

/* Serialização para JSON puro (BigInt → string). O replacer recebe valores heterogéneos do driver. */
function toJsonSafe(value: unknown): Record<string, unknown> {
  const raw = JSON.stringify(
    value,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- valores do Prisma/Decimal no replacer
    (_k, v) => (typeof v === "bigint" ? v.toString() : v),
  );
  const parsed: unknown = JSON.parse(raw);
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return {};
  }
  return parsed as Record<string, unknown>;
}

/**
 * Resumo a partir dos modelos Postgres (`Customer`, `CustomerPlan`, `Invoice`).
 * O job MSSQL está desativado; estes dados substituem o espelho antigo.
 */
export async function getTitularLegacySnapshot(
  cpfCnpjRaw: string | null | undefined,
): Promise<TitularLegacySnapshot> {
  const digits = normalizeCpfCnpjDigits(cpfCnpjRaw ?? "");
  if (digits.length < 11) {
    return { cessionario: null, cessionariosPlanos: [], boletos: [] };
  }

  const customer = await db.customer.findFirst({
    where: { cpfCnpj: digits },
    include: {
      plans: true,
    },
  });

  if (!customer) {
    return { cessionario: null, cessionariosPlanos: [], boletos: [] };
  }

  const planIds = customer.plans.map((p) => p.id);
  const invoices =
    planIds.length > 0
      ? await db.invoice.findMany({
          where: { planId: { in: planIds } },
        })
      : [];

  const cessionario = toJsonSafe({
    CodCessionario: customer.id,
    fullName: customer.fullName,
    cpfCnpj: customer.cpfCnpj,
    email: customer.email,
  });

  const cessionariosPlanos = customer.plans.map((p) =>
    toJsonSafe({
      CodCessionarioPlano: p.id,
      CodCessionario: p.customerId,
      situacao: p.status,
      setor: p.sector,
      quadra: p.quadra,
      lote: p.lote,
    }),
  );

  const boletos = invoices.map((inv) =>
    toJsonSafe({
      CodBoleto: inv.id,
      CodCessionarioPlano: inv.planId,
      due_date: inv.dueDate,
      valor_titulo: inv.value,
      situacao: inv.status,
    }),
  );

  return { cessionario, cessionariosPlanos, boletos };
}
