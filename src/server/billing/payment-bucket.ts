import type { Prisma } from "../../../generated/prisma/client";

export type PaymentBucket =
  | "all"
  | "overdue"
  | "pending"
  | "pending_current"
  | "received";

function startOfUtcDay(d: Date): Date {
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
  );
}

/**
 * Filtro por atraso / pendente / em dia / recebido para listagens admin (`Pagamento`).
 */
export function buildPaymentBucketWhere(
  bucket: PaymentBucket | undefined,
): Prisma.PagamentoWhereInput | undefined {
  const today = startOfUtcDay(new Date());
  switch (bucket) {
    case "overdue":
      return {
        OR: [
          { status: "ATRASADO" },
          {
            AND: [
              { status: "PENDENTE" },
              { dataVencimento: { lt: today } },
            ],
          },
        ],
      };
    case "pending":
      return { status: "PENDENTE" };
    case "pending_current":
      return {
        status: "PENDENTE",
        dataVencimento: { gte: today },
      };
    case "received":
      return { status: "PAGO" };
    case "all":
    default:
      return undefined;
  }
}
