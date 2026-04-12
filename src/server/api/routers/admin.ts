import { TRPCError } from "@trpc/server";
import type { Prisma } from "../../../../generated/prisma/client";
import { z } from "zod";

import { createAsaasChargeForCustomer } from "~/server/asaas/billing-service";
import {
  buildPaymentBucketWhere,
  type PaymentBucket,
} from "~/server/billing/payment-bucket";
import { centsFromDecimal } from "~/server/billing/money";
import { db } from "~/server/db";
import {
  adminFinanceProcedure,
  adminOperationalProcedure,
  adminProcedure,
  createTRPCRouter,
} from "~/server/api/trpc";

const phoneFields = z.object({
  number: z.string().trim().min(8).max(32),
  type: z.string().max(32).optional(),
  observations: z.string().max(2000).optional(),
});

function parseCustomerId(raw: string): bigint {
  try {
    return BigInt(raw);
  } catch {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Identificador de cliente inválido.",
    });
  }
}

async function requireCustomer(customerId: bigint) {
  const customer = await db.customer.findUnique({ where: { id: customerId } });
  if (!customer) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Cliente não encontrado.",
    });
  }
  return customer;
}

function startOfUtcDay(d: Date): Date {
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
  );
}

function formatDayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function endOfUtcDay(d: Date): Date {
  const x = startOfUtcDay(d);
  x.setUTCDate(x.getUTCDate() + 1);
  x.setUTCMilliseconds(-1);
  return x;
}

const paymentBucketSchema = z.enum([
  "all",
  "overdue",
  "pending",
  "pending_current",
  "received",
]) satisfies z.ZodType<PaymentBucket>;

/**
 * Painel administrativo: listagens e agregados para gráficos.
 */
export const adminRouter = createTRPCRouter({
  /**
   * Clientes (cessionários) para o painel.
   */
  listUsers: adminProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(40),
        cursor: z.string().optional(),
        search: z.string().max(200).optional(),
      }),
    )
    .query(async ({ input }) => {
      const search = input.search?.trim();
      const digits = search?.replace(/\D/g, "") ?? "";

      const where: Prisma.CustomerWhereInput = {
        ...(search && search.length > 0
          ? {
              OR: [
                { email: { contains: search, mode: "insensitive" as const } },
                {
                  fullName: { contains: search, mode: "insensitive" as const },
                },
                ...(digits.length >= 3
                  ? [{ cpfCnpj: { contains: digits } }]
                  : []),
              ],
            }
          : {}),
      };

      const items = await db.customer.findMany({
        where,
        take: input.limit + 1,
        cursor: input.cursor ? { id: BigInt(input.cursor) } : undefined,
        orderBy: { id: "desc" },
        select: {
          id: true,
          fullName: true,
          email: true,
          cpfCnpj: true,
          asaasCustomerId: true,
          _count: {
            select: { payments: true, phones: true },
          },
        },
      });

      let nextCursor: string | undefined;
      if (items.length > input.limit) {
        const next = items.pop();
        nextCursor = next?.id.toString();
      }

      const mapped = items.map((u) => ({
        id: u.id.toString(),
        name: u.fullName,
        email: u.email,
        cpfCnpj: u.cpfCnpj,
        asaasCustomerId: u.asaasCustomerId,
        _count: {
          billingPayments: u._count.payments,
          phones: u._count.phones,
        },
      }));

      return { items: mapped, nextCursor };
    }),

  createPaymentForUser: adminFinanceProcedure
    .input(
      z.object({
        userId: z.string(),
        valueCents: z.number().int().min(100).max(1_000_000_000),
        description: z.string().max(500).optional(),
        dueDate: z.coerce.date(),
        billingType: z.enum(["PIX", "BOLETO", "CREDIT_CARD"]),
        email: z.string().email().max(320).optional(),
        cpfCnpj: z.string().max(22).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const customerId = parseCustomerId(input.userId);
      const customer = await requireCustomer(customerId);

      return createAsaasChargeForCustomer({
        customer,
        valueCents: input.valueCents,
        description: input.description,
        dueDate: input.dueDate,
        cpfCnpj: input.cpfCnpj,
        email: input.email,
        billingType: input.billingType,
      });
    }),

  listUserPhones: adminProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const customerId = parseCustomerId(input.userId);
      await requireCustomer(customerId);
      return db.phone.findMany({
        where: { customerId },
        orderBy: { id: "desc" },
      });
    }),

  createUserPhone: adminOperationalProcedure
    .input(
      z
        .object({
          userId: z.string(),
        })
        .merge(phoneFields),
    )
    .mutation(async ({ input }) => {
      const customerId = parseCustomerId(input.userId);
      await requireCustomer(customerId);
      const obsTrim = input.observations?.trim();
      const typeTrim = input.type?.trim();
      return db.phone.create({
        data: {
          customerId,
          number: input.number,
          type: typeTrim && typeTrim.length > 0 ? typeTrim : null,
          observations:
            obsTrim !== undefined && obsTrim.length > 0 ? obsTrim : null,
        },
      });
    }),

  updateUserPhone: adminOperationalProcedure
    .input(
      z.object({
        id: z.number().int(),
        number: z.string().trim().min(8).max(32).optional(),
        type: z.string().max(32).nullable().optional(),
        observations: z.string().max(2000).nullable().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const row = await db.phone.findUnique({
        where: { id: input.id },
      });
      if (!row) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Telefone não encontrado.",
        });
      }
      const data: {
        number?: string;
        type?: string | null;
        observations?: string | null;
      } = {};
      if (input.number !== undefined) data.number = input.number;
      if (input.type !== undefined) {
        data.type =
          input.type === null || input.type.trim() === ""
            ? null
            : input.type.trim();
      }
      if (input.observations !== undefined) {
        data.observations =
          input.observations === null || input.observations.trim() === ""
            ? null
            : input.observations.trim();
      }
      if (Object.keys(data).length === 0) {
        return row;
      }
      return db.phone.update({
        where: { id: input.id },
        data,
      });
    }),

  deleteUserPhone: adminOperationalProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ input }) => {
      const row = await db.phone.findUnique({
        where: { id: input.id },
      });
      if (!row) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Telefone não encontrado.",
        });
      }
      await db.phone.delete({ where: { id: input.id } });
      return { ok: true as const };
    }),

  listPayments: adminProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(50),
        cursor: z.string().optional(),
        bucket: paymentBucketSchema.optional().default("all"),
        dueFrom: z.coerce.date().optional(),
        dueTo: z.coerce.date().optional(),
        search: z.string().max(200).optional(),
      }),
    )
    .query(async ({ input }) => {
      const search = input.search?.trim();
      const digits = search?.replace(/\D/g, "") ?? "";

      const and: Prisma.PortalPaymentWhereInput[] = [];
      const bucketW = buildPaymentBucketWhere(input.bucket);
      if (bucketW) and.push(bucketW);

      if (input.dueFrom || input.dueTo) {
        and.push({
          invoice: {
            is: {
              dueDate: {
                ...(input.dueFrom ? { gte: startOfUtcDay(input.dueFrom) } : {}),
                ...(input.dueTo ? { lte: endOfUtcDay(input.dueTo) } : {}),
              },
            },
          },
        });
      }

      if (search && search.length > 0) {
        and.push({
          OR: [
            { asaasPaymentId: { contains: search, mode: "insensitive" } },
            {
              customer: {
                OR: [
                  {
                    fullName: { contains: search, mode: "insensitive" },
                  },
                  { email: { contains: search, mode: "insensitive" } },
                  ...(digits.length >= 3
                    ? [{ cpfCnpj: { contains: digits } }]
                    : []),
                ],
              },
            },
          ],
        });
      }

      const where: Prisma.PortalPaymentWhereInput =
        and.length > 0 ? { AND: and } : {};

      const items = await db.portalPayment.findMany({
        where,
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: {
          customer: {
            select: { email: true, fullName: true, cpfCnpj: true },
          },
        },
      });

      let nextCursor: string | undefined;
      if (items.length > input.limit) {
        const next = items.pop();
        nextCursor = next?.id;
      }

      const serialized = items.map(({ customer: c, ...rest }) => ({
        ...rest,
        valueCents: centsFromDecimal(rest.value),
        user: {
          email: c.email,
          name: c.fullName,
          cpfCnpj: c.cpfCnpj,
        },
      }));

      return { items: serialized, nextCursor };
    }),

  dashboardStats: adminProcedure.query(async () => {
    const since = new Date();
    since.setUTCDate(since.getUTCDate() - 30);

    const overdueWhere = buildPaymentBucketWhere("overdue")!;
    const pendingCurrentWhere = buildPaymentBucketWhere("pending_current")!;

    const [
      groupStatus,
      receivedRows,
      totals,
      pendingSum,
      overdueCount,
      pendingOpenCount,
      receivedCountAll,
    ] = await Promise.all([
      db.portalPayment.groupBy({
        by: ["status"],
        _sum: { value: true },
        _count: true,
      }),
      db.portalPayment.findMany({
        where: {
          OR: [{ status: "RECEIVED" }, { status: "CONFIRMED" }],
          updatedAt: { gte: since },
        },
        select: { updatedAt: true, value: true },
      }),
      db.portalPayment.aggregate({
        _sum: { value: true },
        where: { OR: [{ status: "RECEIVED" }, { status: "CONFIRMED" }] },
      }),
      db.portalPayment.aggregate({
        _sum: { value: true },
        where: { status: "PENDING" },
      }),
      db.portalPayment.count({ where: overdueWhere }),
      db.portalPayment.count({ where: pendingCurrentWhere }),
      db.portalPayment.count({
        where: { OR: [{ status: "RECEIVED" }, { status: "CONFIRMED" }] },
      }),
    ]);

    const revenueByDay = new Map<string, number>();
    for (const row of receivedRows) {
      const key = formatDayKey(startOfUtcDay(row.updatedAt));
      const cents = centsFromDecimal(row.value);
      revenueByDay.set(key, (revenueByDay.get(key) ?? 0) + cents);
    }

    const chartRevenue = [...revenueByDay.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, valueCents]) => ({ date, valueCents }));

    return {
      byStatus: groupStatus.map((g) => ({
        status: g.status,
        totalCents: g._sum.value ? centsFromDecimal(g._sum.value) : 0,
        count: g._count,
      })),
      chartRevenue,
      totalReceivedCents: totals._sum.value
        ? centsFromDecimal(totals._sum.value)
        : 0,
      pendingCents: pendingSum._sum.value
        ? centsFromDecimal(pendingSum._sum.value)
        : 0,
      receivedCountLast30Days: receivedRows.length,
      overdueCount,
      pendingOpenCount,
      receivedCountAll,
      lastSyncRuns: [] as {
        id: string;
        startedAt: Date;
        finishedAt: Date | null;
        status: string;
        rowsRead: number;
        rowsWritten: number;
      }[],
    };
  }),
});
