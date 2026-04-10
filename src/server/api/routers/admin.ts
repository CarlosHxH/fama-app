import { TRPCError } from "@trpc/server";
import type { Prisma } from "../../../../generated/prisma/client";
import { z } from "zod";

import { createAsaasChargeForUser } from "~/server/asaas/billing-service";
import {
  buildPaymentBucketWhere,
  type PaymentBucket,
} from "~/server/billing/payment-bucket";
import { db } from "~/server/db";
import {
  adminFinanceProcedure,
  adminOperationalProcedure,
  adminProcedure,
  createTRPCRouter,
} from "~/server/api/trpc";

const clientPhoneFields = z.object({
  telefone: z.string().trim().min(8).max(32),
  observacoes: z.string().max(2000).optional(),
});

async function requireTitularUser(userId: string) {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Cliente não encontrado." });
  }
  if (user.role !== "USER") {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Operação só se aplica a titulares (conta cliente).",
    });
  }
  return user;
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
   * Clientes (titulares) para o painel — exclui contas ADMIN.
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

      const where = {
        role: "USER" as const,
        ...(search && search.length > 0
          ? {
              OR: [
                { email: { contains: search, mode: "insensitive" as const } },
                { name: { contains: search, mode: "insensitive" as const } },
                ...(digits.length >= 3
                  ? [{ cpfCnpj: { contains: digits } }]
                  : []),
              ],
            }
          : {}),
      };

      const items = await db.user.findMany({
        where,
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { id: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          cpfCnpj: true,
          asaasCustomerId: true,
          _count: {
            select: { billingPayments: true, phones: true },
          },
        },
      });

      let nextCursor: string | undefined;
      if (items.length > input.limit) {
        const next = items.pop();
        nextCursor = next?.id;
      }

      return { items, nextCursor };
    }),

  /**
   * Gera cobrança Asaas (PIX, boleto ou cartão) para um cliente.
   */
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
      const user = await db.user.findUnique({
        where: { id: input.userId },
      });
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Cliente não encontrado." });
      }
      if (user.role !== "USER") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Só é possível gerar cobrança para titulares (conta cliente).",
        });
      }

      return createAsaasChargeForUser({
        user,
        valueCents: input.valueCents,
        description: input.description,
        dueDate: input.dueDate,
        cpfCnpj: input.cpfCnpj,
        email: input.email,
        billingType: input.billingType,
      });
    }),

  /** Telefones de um titular (ordenados: mais recentes primeiro). */
  listUserPhones: adminProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      await requireTitularUser(input.userId);
      return db.clientPhone.findMany({
        where: { userId: input.userId },
        orderBy: { createdAt: "desc" },
      });
    }),

  createUserPhone: adminOperationalProcedure
    .input(
      z
        .object({
          userId: z.string(),
        })
        .merge(clientPhoneFields),
    )
    .mutation(async ({ input }) => {
      await requireTitularUser(input.userId);
      const obsTrim = input.observacoes?.trim();
      return db.clientPhone.create({
        data: {
          userId: input.userId,
          telefone: input.telefone,
          observacoes:
            obsTrim !== undefined && obsTrim.length > 0 ? obsTrim : null,
        },
      });
    }),

  updateUserPhone: adminOperationalProcedure
    .input(
      z.object({
        id: z.string(),
        telefone: z.string().trim().min(8).max(32).optional(),
        observacoes: z.string().max(2000).nullable().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const row = await db.clientPhone.findUnique({
        where: { id: input.id },
        include: { user: { select: { role: true } } },
      });
      if (!row) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Telefone não encontrado." });
      }
      if (row.user.role !== "USER") {
        throw new TRPCError({ code: "NOT_FOUND", message: "Telefone não encontrado." });
      }
      const data: { telefone?: string; observacoes?: string | null } = {};
      if (input.telefone !== undefined) data.telefone = input.telefone;
      if (input.observacoes !== undefined) {
        data.observacoes =
          input.observacoes === null || input.observacoes.trim() === ""
            ? null
            : input.observacoes.trim();
      }
      if (Object.keys(data).length === 0) {
        return row;
      }
      return db.clientPhone.update({
        where: { id: input.id },
        data,
      });
    }),

  deleteUserPhone: adminOperationalProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const row = await db.clientPhone.findUnique({
        where: { id: input.id },
        include: { user: { select: { role: true } } },
      });
      if (!row) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Telefone não encontrado." });
      }
      if (row.user.role !== "USER") {
        throw new TRPCError({ code: "NOT_FOUND", message: "Telefone não encontrado." });
      }
      await db.clientPhone.delete({ where: { id: input.id } });
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

      const and: Prisma.BillingPaymentWhereInput[] = [];
      const bucketW = buildPaymentBucketWhere(input.bucket);
      if (bucketW) and.push(bucketW);

      if (input.dueFrom || input.dueTo) {
        and.push({
          dueDate: {
            ...(input.dueFrom ? { gte: startOfUtcDay(input.dueFrom) } : {}),
            ...(input.dueTo ? { lte: endOfUtcDay(input.dueTo) } : {}),
          },
        });
      }

      if (search && search.length > 0) {
        and.push({
          OR: [
            { description: { contains: search, mode: "insensitive" } },
            {
              user: {
                OR: [
                  { name: { contains: search, mode: "insensitive" } },
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

      const where: Prisma.BillingPaymentWhereInput =
        and.length > 0 ? { AND: and } : {};

      const items = await db.billingPayment.findMany({
        where,
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { email: true, name: true, cpfCnpj: true } },
        },
      });

      let nextCursor: string | undefined;
      if (items.length > input.limit) {
        const next = items.pop();
        nextCursor = next?.id;
      }

      return { items, nextCursor };
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
      lastSyncRuns,
    ] = await Promise.all([
      db.billingPayment.groupBy({
        by: ["status"],
        _sum: { valueCents: true },
        _count: true,
      }),
      db.billingPayment.findMany({
        where: {
          status: "RECEIVED",
          paidAt: { gte: since },
        },
        select: { paidAt: true, valueCents: true },
      }),
      db.billingPayment.aggregate({
        _sum: { valueCents: true },
        where: { status: "RECEIVED" },
      }),
      db.billingPayment.aggregate({
        _sum: { valueCents: true },
        where: { status: "PENDING" },
      }),
      db.billingPayment.count({ where: overdueWhere }),
      db.billingPayment.count({ where: pendingCurrentWhere }),
      db.billingPayment.count({ where: { status: "RECEIVED" } }),
      db.syncRun.findMany({
        where: { jobName: "sync-sqlserver-to-postgres" },
        orderBy: { startedAt: "desc" },
        take: 7,
        select: {
          id: true,
          startedAt: true,
          finishedAt: true,
          status: true,
          rowsRead: true,
          rowsWritten: true,
        },
      }),
    ]);

    const revenueByDay = new Map<string, number>();
    for (const row of receivedRows) {
      if (!row.paidAt) continue;
      const key = formatDayKey(startOfUtcDay(row.paidAt));
      revenueByDay.set(key, (revenueByDay.get(key) ?? 0) + row.valueCents);
    }

    const chartRevenue = [...revenueByDay.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, valueCents]) => ({ date, valueCents }));

    return {
      byStatus: groupStatus.map((g) => ({
        status: g.status,
        totalCents: g._sum.valueCents ?? 0,
        count: g._count,
      })),
      chartRevenue,
      totalReceivedCents: totals._sum.valueCents ?? 0,
      pendingCents: pendingSum._sum.valueCents ?? 0,
      receivedCountLast30Days: receivedRows.length,
      overdueCount,
      pendingOpenCount,
      receivedCountAll,
      lastSyncRuns,
    };
  }),
});
