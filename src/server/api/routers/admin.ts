import { TRPCError } from "@trpc/server";
import type { Prisma } from "../../../../generated/prisma/client";
import { z } from "zod";

import { createAsaasChargeForCustomer } from "~/server/asaas/billing-service";
import {
  buildPaymentBucketWhere,
  type PaymentBucket,
} from "~/server/billing/payment-bucket";
import { centsFromDecimal } from "~/server/billing/money";
import { SYNC_SQLSERVER_JOB_NAME } from "~/jobs/sqlserver-sync/sync-constants";
import { db } from "~/server/db";
import {
  adminFinanceProcedure,
  adminOperationalProcedure,
  adminProcedure,
  createTRPCRouter,
} from "~/server/api/trpc";

const phoneFields = z.object({
  number: z.string().trim().min(8).max(32),
  tipo: z.enum(["CELULAR", "FIXO", "WHATSAPP"]).optional(),
});

function parseCustomerId(raw: string): string {
  const parsed = z.string().uuid().safeParse(raw);
  if (!parsed.success) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Identificador de cliente inválido.",
    });
  }
  return parsed.data;
}

async function requireCustomer(customerId: string) {
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

function ensureDueDateIsFuture(dueDate: Date): void {
  const due = startOfUtcDay(dueDate).getTime();
  const today = startOfUtcDay(new Date()).getTime();
  if (due <= today) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "A data de vencimento deve ser futura.",
    });
  }
}

const paymentBucketSchema = z.enum([
  "all",
  "overdue",
  "pending",
  "pending_current",
  "received",
]) satisfies z.ZodType<PaymentBucket>;
const dueWindowSchema = z.enum([
  "all",
  "today",
  "next_7_days",
  "overdue_30_plus",
]);

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
        cursor: z.string().uuid().optional(),
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
                  nome: { contains: search, mode: "insensitive" as const },
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
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          nome: true,
          email: true,
          cpfCnpj: true,
          asaasCustomerId: true,
          _count: {
            select: { pagamentos: true, telefones: true },
          },
        },
      });

      let nextCursor: string | undefined;
      if (items.length > input.limit) {
        const next = items.pop();
        nextCursor = next?.id;
      }

      const mapped = items.map((u) => ({
        id: u.id,
        name: u.nome,
        email: u.email,
        cpfCnpj: u.cpfCnpj,
        asaasCustomerId: u.asaasCustomerId,
        _count: {
          billingPayments: u._count.pagamentos,
          phones: u._count.telefones,
        },
      }));

      return { items: mapped, nextCursor };
    }),

  paymentContextForUser: adminFinanceProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .query(async ({ input }) => {
      const customerId = parseCustomerId(input.userId);
      await requireCustomer(customerId);
      const contratos = await db.contrato.findMany({
        where: { customerId },
        orderBy: { numeroContrato: "asc" },
        select: {
          id: true,
          numeroContrato: true,
          situacao: true,
          responsavelFinanceiro: {
            select: {
              nome: true,
              cpf: true,
              email: true,
              telefone: true,
            },
          },
          jazigos: {
            select: {
              id: true,
              codigo: true,
              quadra: true,
              setor: true,
              quantidadeGavetas: true,
              valorMensalidade: true,
            },
            orderBy: { codigo: "asc" },
          },
        },
      });
      return { contratos };
    }),

  createPaymentForUser: adminFinanceProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        valueCents: z.number().int().min(100).max(1_000_000_000),
        description: z.string().max(500).optional(),
        dueDate: z.coerce.date(),
        billingType: z.enum(["PIX", "BOLETO", "CREDIT_CARD"]),
        tipoPagamento: z.enum(["MANUTENCAO", "TAXA_SERVICO", "AQUISICAO"]),
        contratoId: z.string().uuid().optional(),
        jazigoId: z.string().uuid().optional(),
        email: z.string().email().max(320).optional(),
        cpfCnpj: z.string().max(22).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const customerId = parseCustomerId(input.userId);
      const customer = await requireCustomer(customerId);
      ensureDueDateIsFuture(input.dueDate);

      const contrato =
        input.contratoId && input.contratoId.length > 0
          ? await db.contrato.findFirst({
              where: { id: input.contratoId, customerId: customer.id },
              include: { responsavelFinanceiro: true },
            })
          : null;
      if (input.contratoId && !contrato) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Contrato inválido para o cliente selecionado.",
        });
      }

      const jazigo =
        input.jazigoId && input.jazigoId.length > 0
          ? await db.jazigo.findFirst({
              where: {
                id: input.jazigoId,
                ...(contrato ? { contratoId: contrato.id } : {}),
              },
              select: { id: true, contratoId: true },
            })
          : null;
      if (input.jazigoId && !jazigo) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Jazigo inválido para o contrato selecionado.",
        });
      }

      return createAsaasChargeForCustomer({
        customer,
        valueCents: input.valueCents,
        description: input.description,
        dueDate: input.dueDate,
        cpfCnpj: input.cpfCnpj,
        email: input.email,
        billingType: input.billingType,
        tipoPagamento: input.tipoPagamento,
        contratoId: contrato?.id,
        jazigoId: jazigo?.id,
        responsavelFinanceiro: contrato?.responsavelFinanceiro
          ? {
              nome: contrato.responsavelFinanceiro.nome,
              cpf: contrato.responsavelFinanceiro.cpf,
              email: contrato.responsavelFinanceiro.email,
            }
          : null,
      });
    }),

  listUserPhones: adminProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .query(async ({ input }) => {
      const customerId = parseCustomerId(input.userId);
      await requireCustomer(customerId);
      return db.customerPhone.findMany({
        where: { customerId },
        orderBy: { createdAt: "desc" },
      });
    }),

  createUserPhone: adminOperationalProcedure
    .input(
      z
        .object({
          userId: z.string().uuid(),
        })
        .merge(phoneFields),
    )
    .mutation(async ({ input }) => {
      const customerId = parseCustomerId(input.userId);
      await requireCustomer(customerId);
      return db.customerPhone.create({
        data: {
          customerId,
          numero: input.number,
          tipo: input.tipo ?? "CELULAR",
        },
      });
    }),

  updateUserPhone: adminOperationalProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        number: z.string().trim().min(8).max(32).optional(),
        tipo: z.enum(["CELULAR", "FIXO", "WHATSAPP"]).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const row = await db.customerPhone.findUnique({
        where: { id: input.id },
      });
      if (!row) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Telefone não encontrado.",
        });
      }
      const data: {
        numero?: string;
        tipo?: "CELULAR" | "FIXO" | "WHATSAPP";
      } = {};
      if (input.number !== undefined) data.numero = input.number;
      if (input.tipo !== undefined) data.tipo = input.tipo;
      if (Object.keys(data).length === 0) {
        return row;
      }
      return db.customerPhone.update({
        where: { id: input.id },
        data,
      });
    }),

  deleteUserPhone: adminOperationalProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ input }) => {
      const row = await db.customerPhone.findUnique({
        where: { id: input.id },
      });
      if (!row) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Telefone não encontrado.",
        });
      }
      await db.customerPhone.delete({ where: { id: input.id } });
      return { ok: true as const };
    }),

  listPayments: adminProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(50),
        cursor: z.string().uuid().optional(),
        bucket: paymentBucketSchema.optional().default("all"),
        dueWindow: dueWindowSchema.optional().default("all"),
        dueFrom: z.coerce.date().optional(),
        dueTo: z.coerce.date().optional(),
        search: z.string().max(200).optional(),
      }),
    )
    .query(async ({ input }) => {
      const search = input.search?.trim();
      const digits = search?.replace(/\D/g, "") ?? "";

      const and: Prisma.PagamentoWhereInput[] = [];
      const bucketW = buildPaymentBucketWhere(input.bucket);
      if (bucketW) and.push(bucketW);
      const today = startOfUtcDay(new Date());
      const plus7 = startOfUtcDay(new Date(today));
      plus7.setUTCDate(plus7.getUTCDate() + 7);

      if (input.dueFrom || input.dueTo) {
        and.push({
          dataVencimento: {
            ...(input.dueFrom ? { gte: startOfUtcDay(input.dueFrom) } : {}),
            ...(input.dueTo ? { lte: endOfUtcDay(input.dueTo) } : {}),
          },
        });
      }
      if (input.dueWindow === "today") {
        and.push({ dataVencimento: { gte: today, lte: endOfUtcDay(today) } });
      } else if (input.dueWindow === "next_7_days") {
        and.push({ dataVencimento: { gte: today, lte: endOfUtcDay(plus7) } });
      } else if (input.dueWindow === "overdue_30_plus") {
        const old = startOfUtcDay(new Date(today));
        old.setUTCDate(old.getUTCDate() - 30);
        and.push({
          AND: [
            { dataVencimento: { lte: old } },
            { OR: [{ status: "PENDENTE" }, { status: "ATRASADO" }] },
          ],
        });
      }

      if (search && search.length > 0) {
        and.push({
          OR: [
            { asaasId: { contains: search, mode: "insensitive" } },
            {
              customer: {
                OR: [
                  {
                    nome: { contains: search, mode: "insensitive" },
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

      const where: Prisma.PagamentoWhereInput =
        and.length > 0 ? { AND: and } : {};

      const items = await db.pagamento.findMany({
        where,
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: {
          customer: {
            select: { email: true, nome: true, cpfCnpj: true },
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
        valueCents: centsFromDecimal(rest.valorTitulo),
        paymentMethod: rest.metodoPagamento,
        user: {
          email: c.email,
          name: c.nome,
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
      dueTodayCount,
      dueNext7Count,
      overdue30Count,
      overdue30Amount,
      lastSyncRuns,
    ] = await Promise.all([
      db.pagamento.groupBy({
        by: ["status"],
        _sum: { valorTitulo: true },
        _count: true,
      }),
      db.pagamento.findMany({
        where: {
          status: "PAGO",
          updatedAt: { gte: since },
        },
        select: { updatedAt: true, valorTitulo: true },
      }),
      db.pagamento.aggregate({
        _sum: { valorTitulo: true },
        where: { status: "PAGO" },
      }),
      db.pagamento.aggregate({
        _sum: { valorTitulo: true },
        where: { status: "PENDENTE" },
      }),
      db.pagamento.count({ where: overdueWhere }),
      db.pagamento.count({ where: pendingCurrentWhere }),
      db.pagamento.count({
        where: { status: "PAGO" },
      }),
      db.pagamento.count({
        where: {
          dataVencimento: { gte: startOfUtcDay(new Date()), lte: endOfUtcDay(new Date()) },
          status: "PENDENTE",
        },
      }),
      db.pagamento.count({
        where: {
          dataVencimento: {
            gte: startOfUtcDay(new Date()),
            lte: endOfUtcDay(
              new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            ),
          },
          status: "PENDENTE",
        },
      }),
      db.pagamento.count({
        where: {
          dataVencimento: {
            lte: startOfUtcDay(
              new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            ),
          },
          OR: [{ status: "PENDENTE" }, { status: "ATRASADO" }],
        },
      }),
      db.pagamento.aggregate({
        _sum: { valorTitulo: true },
        where: {
          dataVencimento: {
            lte: startOfUtcDay(
              new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            ),
          },
          OR: [{ status: "PENDENTE" }, { status: "ATRASADO" }],
        },
      }),
      db.syncLog.findMany({
        where: { jobName: SYNC_SQLSERVER_JOB_NAME },
        orderBy: { dataInicio: "desc" },
        take: 20,
        select: {
          id: true,
          dataInicio: true,
          dataFim: true,
          status: true,
          registrosNovos: true,
          registrosAtualizados: true,
          falhas: true,
        },
      }),
    ]);

    const revenueByDay = new Map<string, number>();
    for (const row of receivedRows) {
      const key = formatDayKey(startOfUtcDay(row.updatedAt));
      const cents = centsFromDecimal(row.valorTitulo);
      revenueByDay.set(key, (revenueByDay.get(key) ?? 0) + cents);
    }

    const chartRevenue = [...revenueByDay.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, valueCents]) => ({ date, valueCents }));

    return {
      byStatus: groupStatus.map((g) => ({
        status: g.status,
        totalCents: g._sum.valorTitulo
          ? centsFromDecimal(g._sum.valorTitulo)
          : 0,
        count: g._count,
      })),
      chartRevenue,
      totalReceivedCents: totals._sum.valorTitulo
        ? centsFromDecimal(totals._sum.valorTitulo)
        : 0,
      pendingCents: pendingSum._sum.valorTitulo
        ? centsFromDecimal(pendingSum._sum.valorTitulo)
        : 0,
      receivedCountLast30Days: receivedRows.length,
      overdueCount,
      pendingOpenCount,
      receivedCountAll,
      dueTodayCount,
      dueNext7Count,
      overdue30Count,
      overdue30AmountCents: overdue30Amount._sum.valorTitulo
        ? centsFromDecimal(overdue30Amount._sum.valorTitulo)
        : 0,
      lastSyncRuns: lastSyncRuns.map((r) => ({
        id: r.id,
        startedAt: r.dataInicio,
        finishedAt: r.dataFim,
        status:
          r.status === "SUCESSO"
            ? "SUCCESS"
            : r.status === "FALHA"
              ? "FAILED"
              : "RUNNING",
        rowsRead:
          r.registrosNovos + r.registrosAtualizados + r.falhas,
        rowsWritten: r.registrosNovos + r.registrosAtualizados,
      })),
    };
  }),
});
