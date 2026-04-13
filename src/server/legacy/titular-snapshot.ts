import "server-only";

import { db } from "~/server/db";
import { normalizeCpfCnpjDigits } from "~/server/auth/normalize-cpf-cnpj";

export type TitularLegacySnapshot = {
  cessionario: Record<string, unknown> | null;
  /** Contratos com jazigos (estrutura legada “planos” substituída por contratos). */
  contratos: Record<string, unknown>[];
  /** Faturas / cobranças (`Pagamento`). */
  faturas: Record<string, unknown>[];
};

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
 * Resumo a partir dos modelos Postgres (`Customer`, `Contrato`, `Jazigo`, `Pagamento`).
 */
export async function getTitularLegacySnapshot(
  cpfCnpjRaw: string | null | undefined,
): Promise<TitularLegacySnapshot> {
  const digits = normalizeCpfCnpjDigits(cpfCnpjRaw ?? "");
  if (digits.length < 11) {
    return { cessionario: null, contratos: [], faturas: [] };
  }

  const customer = await db.customer.findFirst({
    where: { cpfCnpj: digits },
    include: {
      contratos: {
        include: {
          jazigos: true,
          responsavelFinanceiro: true,
        },
      },
      pagamentos: {
        orderBy: { dataVencimento: "desc" },
        take: 100,
      },
    },
  });

  if (!customer) {
    return { cessionario: null, contratos: [], faturas: [] };
  }

  const cessionario = toJsonSafe({
    id: customer.id,
    sqlServerId: customer.sqlServerId,
    nome: customer.nome,
    cpfCnpj: customer.cpfCnpj,
    email: customer.email,
  });

  const contratos = customer.contratos.map((c) =>
    toJsonSafe({
      id: c.id,
      sqlServerId: c.sqlServerId,
      numeroContrato: c.numeroContrato,
      situacao: c.situacao,
      jazigos: c.jazigos.map((j) =>
        toJsonSafe({
          id: j.id,
          sqlServerId: j.sqlServerId,
          codigo: j.codigo,
          quadra: j.quadra,
          setor: j.setor,
          quantidadeGavetas: j.quantidadeGavetas,
          valorMensalidade: j.valorMensalidade,
        }),
      ),
      responsavelFinanceiro: c.responsavelFinanceiro
        ? toJsonSafe(c.responsavelFinanceiro)
        : null,
    }),
  );

  const faturas = customer.pagamentos.map((p) =>
    toJsonSafe({
      id: p.id,
      sqlServerId: p.sqlServerId,
      valorTitulo: p.valorTitulo,
      status: p.status,
      tipo: p.tipo,
      dataVencimento: p.dataVencimento,
      dataPagamento: p.dataPagamento,
      gavetasNaEpoca: p.gavetasNaEpoca,
      valorNaEpoca: p.valorNaEpoca,
    }),
  );

  return { cessionario, contratos, faturas };
}
