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
 * Filtro por “atraso / pendente / em dia / recebido” para listagens admin.
 */
export function buildPaymentBucketWhere(
  bucket: PaymentBucket | undefined,
): Prisma.BillingPaymentWhereInput | undefined {
  const today = startOfUtcDay(new Date());
  switch (bucket) {
    case "overdue":
      return {
        OR: [
          { status: "OVERDUE" },
          {
            status: "PENDING",
            dueDate: { lt: today },
          },
        ],
      };
    case "pending":
      return { status: "PENDING" };
    case "pending_current":
      return {
        status: "PENDING",
        OR: [{ dueDate: null }, { dueDate: { gte: today } }],
      };
    case "received":
      return { status: "RECEIVED" };
    case "all":
    default:
      return undefined;
  }
}
