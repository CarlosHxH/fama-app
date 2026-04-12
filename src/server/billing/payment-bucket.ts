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
 * Filtro por atraso / pendente / em dia / recebido para listagens admin (`PortalPayment`).
 */
export function buildPaymentBucketWhere(
  bucket: PaymentBucket | undefined,
): Prisma.PortalPaymentWhereInput | undefined {
  const today = startOfUtcDay(new Date());
  switch (bucket) {
    case "overdue":
      return {
        OR: [
          { status: "OVERDUE" },
          {
            AND: [
              { status: "PENDING" },
              {
                invoice: {
                  is: { dueDate: { lt: today } },
                },
              },
            ],
          },
        ],
      };
    case "pending":
      return { status: "PENDING" };
    case "pending_current":
      return {
        status: "PENDING",
        OR: [
          { invoiceId: null },
          { invoice: { is: { dueDate: { gte: today } } } },
        ],
      };
    case "received":
      return {
        OR: [{ status: "RECEIVED" }, { status: "CONFIRMED" }],
      };
    case "all":
    default:
      return undefined;
  }
}
