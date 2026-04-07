import { z } from "zod";

import { db } from "~/server/db";
import { adminProcedure, createTRPCRouter } from "~/server/api/trpc";

function startOfUtcDay(d: Date): Date {
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
  );
}

function formatDayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/**
 * Painel administrativo: listagens e agregados para gráficos.
 */
export const adminRouter = createTRPCRouter({
  listPayments: adminProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(50),
        cursor: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const items = await db.billingPayment.findMany({
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { email: true, name: true } },
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

    const [groupStatus, receivedRows, totals] = await Promise.all([
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

    const pendingSum = await db.billingPayment.aggregate({
      _sum: { valueCents: true },
      where: { status: "PENDING" },
    });

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
    };
  }),
});
