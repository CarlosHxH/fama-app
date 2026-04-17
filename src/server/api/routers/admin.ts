import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt-ts";
import { Prisma } from "../../../../generated/prisma/client";
import { z } from "zod";

import { createAsaasChargeForCustomer } from "~/server/asaas/billing-service";
import {
  buildPaymentBucketWhere,
  type PaymentBucket,
} from "~/server/billing/payment-bucket";
import { centsFromDecimal } from "~/server/billing/money";
import {
  resolveResponsavelFinanceiroPayloadForAsaas,
  responsavelCobrancaComFonte,
} from "~/server/billing/resolve-payer-for-charge";
import { loadJobEnv } from "~/jobs/sqlserver-sync/job-env";
import { runSync } from "~/jobs/sqlserver-sync/run-sync";
import { SYNC_SQLSERVER_JOB_NAME } from "~/jobs/sqlserver-sync/sync-constants";
import {
  canEditCustomerContacts,
  canIssueCharges,
  canManageStaffUsers,
  resolveStaffRole,
} from "~/server/auth/admin-staff-role";
import { db } from "~/server/db";
import {
  adminFinanceProcedure,
  adminManageStaffProcedure,
  adminOperationalProcedure,
  adminProcedure,
  createTRPCRouter,
} from "~/server/api/trpc";

const phoneFields = z.object({
  number: z.string().trim().min(8).max(32),
  tipo: z.enum(["CELULAR", "FIXO", "WHATSAPP"]).optional(),
  /** Texto livre; vazio não grava o campo na criação. */
  observacoes: z.string().trim().max(2000).optional(),
});

/**
 * Garante que não se remove o último administrador ativo do sistema.
 */
async function assertAtLeastOneOtherActiveAdmin(excludeUserId: string) {
  const n = await db.user.count({
    where: {
      role: "ADMIN",
      ativo: true,
      id: { not: excludeUserId },
    },
  });
  if (n === 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message:
        "Tem de existir pelo menos outro administrador ativo. Promova outro utilizador ou crie uma conta de administrador antes de aplicar esta alteração.",
    });
  }
}

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
            select: { pagamentosComoPagador: true, telefones: true },
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
          billingPayments: u._count.pagamentosComoPagador,
          phones: u._count.telefones,
        },
      }));

      return { items: mapped, nextCursor };
    }),

  /**
   * Jazigos sincronizados (quadra/setor/código) com contrato e titular para o painel.
   */
  listJazigos: adminProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(50),
        /** Cursor é o `codigo` do último jazigo retornado (string única, compatível com orderBy). */
        cursor: z.string().optional(),
        search: z.string().max(200).optional(),
      }),
    )
    .query(async ({ input }) => {
      const search = input.search?.trim();
      const digits = search?.replace(/\D/g, "") ?? "";

      const where: Prisma.JazigoWhereInput =
        search && search.length > 0
          ? {
              OR: [
                { codigo: { contains: search, mode: "insensitive" } },
                {
                  quadra: { contains: search, mode: "insensitive" },
                },
                {
                  setor: { contains: search, mode: "insensitive" },
                },
                {
                  contrato: {
                    OR: [
                      {
                        numeroContrato: {
                          contains: search,
                          mode: "insensitive",
                        },
                      },
                      {
                        customer: {
                          nome: {
                            contains: search,
                            mode: "insensitive",
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  responsavelFinanceiroCustomer: {
                    nome: { contains: search, mode: "insensitive" },
                  },
                },
                ...(digits.length >= 3
                  ? [
                      {
                        responsavelFinanceiroCustomer: {
                          cpfCnpj: { contains: digits },
                        },
                      } as const,
                    ]
                  : []),
              ],
            }
          : {};

      const items = await db.jazigo.findMany({
        where,
        take: input.limit + 1,
        cursor: input.cursor ? { codigo: input.cursor } : undefined,
        orderBy: [{ codigo: "asc" }],
        include: {
          contrato: {
            select: {
              id: true,
              numeroContrato: true,
              customer: {
                select: { id: true, nome: true },
              },
              responsavelFinanceiro: {
                select: { customer: { select: { nome: true } } },
              },
            },
          },
          responsavelFinanceiroCustomer: {
            select: { id: true, nome: true, cpfCnpj: true },
          },
        },
      });

      let nextCursor: string | undefined;
      if (items.length > input.limit) {
        const next = items.pop();
        nextCursor = next?.codigo;
      }

      const serialized = items.map((j) => {
        const legacy = j.contrato.responsavelFinanceiro;
        const payer = j.responsavelFinanceiroCustomer;
        let responsavelLabel: string;
        let responsavelFonte: "customer" | "contrato" | "titular";
        if (payer) {
          responsavelLabel = payer.nome;
          responsavelFonte = "customer";
        } else if (legacy) {
          responsavelLabel = `${legacy.customer.nome} (contrato)`;
          responsavelFonte = "contrato";
        } else {
          responsavelLabel = j.contrato.customer.nome;
          responsavelFonte = "titular";
        }
        return {
          id: j.id,
          sqlServerId: j.sqlServerId,
          codigo: j.codigo,
          quadra: j.quadra,
          setor: j.setor,
          quantidadeGavetas: j.quantidadeGavetas,
          valorMensalidadeCents: centsFromDecimal(j.valorMensalidade),
          contratoId: j.contrato.id,
          numeroContrato: j.contrato.numeroContrato,
          customerId: j.contrato.customer.id,
          titularNome: j.contrato.customer.nome,
          responsavelFinanceiroCustomer: payer
            ? { id: payer.id, nome: payer.nome, cpfCnpj: payer.cpfCnpj }
            : null,
          responsavelLabel,
          responsavelFonte,
        };
      });

      return { items: serialized, nextCursor };
    }),

  /**
   * Define o pagador (outro `Customer`) para um jazigo, ou remove (`null`) para voltar ao fallback contrato/titular.
   */
  setJazigoResponsavelFinanceiro: adminFinanceProcedure
    .input(
      z.object({
        jazigoId: z.string().uuid(),
        responsavelCustomerId: z.string().uuid().nullable(),
      }),
    )
    .mutation(async ({ input }) => {
      const row = await db.jazigo.findUnique({ where: { id: input.jazigoId } });
      if (!row) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Jazigo não encontrado.",
        });
      }
      if (input.responsavelCustomerId) {
        const payer = await db.customer.findUnique({
          where: { id: input.responsavelCustomerId },
        });
        if (!payer) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Cliente (pagador) não encontrado.",
          });
        }
      }
      return db.jazigo.update({
        where: { id: input.jazigoId },
        data: {
          responsavelFinanceiroCustomerId: input.responsavelCustomerId,
        },
        select: {
          id: true,
          codigo: true,
          responsavelFinanceiroCustomerId: true,
          responsavelFinanceiroCustomer: {
            select: { id: true, nome: true, cpfCnpj: true },
          },
        },
      });
    }),

  /**
   * Ficha do titular (sem `senhaHash`) + contagens e últimas cobranças.
   */
  getCustomerById: adminProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      const c = await db.customer.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          nome: true,
          email: true,
          cpfCnpj: true,
          sqlServerId: true,
          primeiroAcesso: true,
          ativo: true,
          tentativasLogin: true,
          bloqueadoAte: true,
          asaasCustomerId: true,
          syncedAt: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              pagamentosComoPagador: true,
              telefones: true,
              enderecos: true,
              contratos: true,
            },
          },
        },
      });
      if (!c) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Cliente não encontrado.",
        });
      }

      const recentPayments = await db.pagamento.findMany({
        where: { customerId: input.id },
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true,
          valorTitulo: true,
          status: true,
          dataVencimento: true,
          createdAt: true,
          invoiceUrl: true,
          metodoPagamento: true,
        },
      });

      return {
        ...c,
        recentPayments: recentPayments.map((p) => ({
          id: p.id,
          status: p.status,
          dataVencimento: p.dataVencimento,
          createdAt: p.createdAt,
          invoiceUrl: p.invoiceUrl,
          metodoPagamento: p.metodoPagamento,
          valueCents: centsFromDecimal(p.valorTitulo),
        })),
      };
    }),

  /**
   * Atualiza dados cadastrais do titular (nome, e-mail, estado).
   * Respeita `canEditCustomerContacts` (ADMIN / FINANCEIRO).
   */
  updateCustomer: adminOperationalProcedure
    .input(
      z
        .object({
          id: z.string().uuid(),
          nome: z.string().min(1).max(160).optional(),
          email: z.union([z.string().email().max(120), z.literal("")]).optional(),
          ativo: z.boolean().optional(),
        })
        .refine(
          (d) =>
            d.nome !== undefined ||
            d.email !== undefined ||
            d.ativo !== undefined,
          { message: "Indique pelo menos um campo a alterar." },
        ),
    )
    .mutation(async ({ input }) => {
      const { id, nome, email, ativo } = input;
      await requireCustomer(id);

      const data: Prisma.CustomerUpdateInput = {};
      if (nome !== undefined) data.nome = nome.trim();
      if (email !== undefined) {
        data.email = email === "" ? null : email.trim().toLowerCase();
      }
      if (ativo !== undefined) data.ativo = ativo;

      return db.customer.update({
        where: { id },
        data,
        select: {
          id: true,
          nome: true,
          email: true,
          ativo: true,
          cpfCnpj: true,
          updatedAt: true,
        },
      });
    }),

  paymentContextForUser: adminFinanceProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .query(async ({ input }) => {
      const customerId = parseCustomerId(input.userId);
      const titular = await requireCustomer(customerId);
      const titularSlice = {
        nome: titular.nome,
        cpfCnpj: titular.cpfCnpj,
        email: titular.email,
      };
      const contratos = await db.contrato.findMany({
        where: { customerId },
        orderBy: { numeroContrato: "asc" },
        select: {
          id: true,
          numeroContrato: true,
          situacao: true,
          responsavelFinanceiro: {
            select: {
              motivo: true,
              customer: {
                select: {
                  nome: true,
                  cpfCnpj: true,
                  email: true,
                },
              },
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
              responsavelFinanceiroCustomer: {
                select: {
                  id: true,
                  nome: true,
                  cpfCnpj: true,
                  email: true,
                },
              },
            },
            orderBy: { codigo: "asc" },
          },
        },
      });
      const mapped = contratos.map((c) => {
        const legacy = c.responsavelFinanceiro
          ? {
              nome: c.responsavelFinanceiro.customer.nome,
              cpf: c.responsavelFinanceiro.customer.cpfCnpj,
              email: c.responsavelFinanceiro.customer.email,
            }
          : null;
        return {
          id: c.id,
          numeroContrato: c.numeroContrato,
          situacao: c.situacao,
          responsavelFinanceiro: c.responsavelFinanceiro,
          responsavelCobranca: responsavelCobrancaComFonte(null, legacy, titularSlice),
          jazigos: c.jazigos.map((j) => ({
            id: j.id,
            codigo: j.codigo,
            quadra: j.quadra,
            setor: j.setor,
            quantidadeGavetas: j.quantidadeGavetas,
            valorMensalidade: j.valorMensalidade,
            responsavelFinanceiroCustomer: j.responsavelFinanceiroCustomer,
            responsavelCobranca: responsavelCobrancaComFonte(
              j.responsavelFinanceiroCustomer,
              legacy,
              titularSlice,
            ),
          })),
        };
      });
      return {
        titular: titularSlice,
        contratos: mapped,
      };
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
              include: {
                responsavelFinanceiro: { include: { customer: true } },
              },
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
                contrato: { customerId: customer.id },
                ...(contrato ? { contratoId: contrato.id } : {}),
              },
              include: {
                responsavelFinanceiroCustomer: {
                  select: {
                    id: true,
                    nome: true,
                    cpfCnpj: true,
                    email: true,
                  },
                },
                contrato: {
                  include: {
                    responsavelFinanceiro: { include: { customer: true } },
                  },
                },
              },
            })
          : null;
      if (input.jazigoId && !jazigo) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Jazigo inválido para o contrato selecionado.",
        });
      }

      const legacyResp =
        jazigo?.contrato.responsavelFinanceiro ??
        contrato?.responsavelFinanceiro ??
        null;
      const legacySlice = legacyResp
        ? {
            nome: legacyResp.customer.nome,
            cpf: legacyResp.customer.cpfCnpj,
            email: legacyResp.customer.email,
          }
        : null;

      const responsavelFinanceiro = resolveResponsavelFinanceiroPayloadForAsaas(
        jazigo?.responsavelFinanceiroCustomer ?? null,
        legacySlice,
      );

      return createAsaasChargeForCustomer({
        customer,
        valueCents: input.valueCents,
        description: input.description,
        dueDate: input.dueDate,
        cpfCnpj: input.cpfCnpj,
        email: input.email,
        billingType: input.billingType,
        tipoPagamento: input.tipoPagamento,
        contratoId: contrato?.id ?? jazigo?.contratoId,
        jazigoId: jazigo?.id,
        responsavelFinanceiro,
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
      const obs = input.observacoes?.trim();
      return db.customerPhone.create({
        data: {
          customerId,
          numero: input.number,
          tipo: input.tipo ?? "CELULAR",
          observacoes:
            obs && obs.length > 0 ? obs : null,
        },
      });
    }),

  updateUserPhone: adminOperationalProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        number: z.string().trim().min(8).max(32).optional(),
        tipo: z.enum(["CELULAR", "FIXO", "WHATSAPP"]).optional(),
        /** `""` limpa observações; omitido não altera. */
        observacoes: z.union([z.string().max(2000), z.literal("")]).optional(),
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
        observacoes?: string | null;
      } = {};
      if (input.number !== undefined) data.numero = input.number;
      if (input.tipo !== undefined) data.tipo = input.tipo;
      if (input.observacoes !== undefined) {
        const t = input.observacoes.trim();
        data.observacoes = t.length > 0 ? t : null;
      }
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

  /**
   * Lista pagamentos para tabelas admin (dashboard e histórico), com filtros e cursor.
   * Suporta `useInfiniteQuery` no cliente (`cursor` = último `id` da página anterior).
   */
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

  /**
   * Lista funcionários (`User`) com acesso ao painel administrativo.
   * Não expõe o hash de senha. Requer sessão admin (`adminProcedure`).
   */
  listStaff: adminProcedure
    .input(
      z.object({
        search: z.string().max(200).optional(),
      }),
    )
    .query(async ({ input }) => {
      const search = input.search?.trim();
      const where: Prisma.UserWhereInput =
        search && search.length > 0
          ? {
              OR: [
                { email: { contains: search, mode: "insensitive" } },
                { nome: { contains: search, mode: "insensitive" } },
              ],
            }
          : {};

      const items = await db.user.findMany({
        where,
        orderBy: { nome: "asc" },
        select: {
          id: true,
          email: true,
          nome: true,
          role: true,
          ativo: true,
          createdAt: true,
        },
      });

      return { items };
    }),

  /**
   * Permissões do utilizador atual no painel (para UI e controlo de funcionalidades).
   */
  getCapabilities: adminProcedure.query(({ ctx }) => {
    const r = resolveStaffRole(
      ctx.session.user.accountKind,
      ctx.session.user.staffRole ?? undefined,
    );
    return {
      staffRole: r,
      canManageStaff: canManageStaffUsers(r),
      canIssueCharges: canIssueCharges(r),
      canEditCustomerContacts: canEditCustomerContacts(r),
    };
  }),

  /**
   * Atualiza nome, e-mail, perfil ou estado de um funcionário. Apenas ADMIN.
   */
  updateStaff: adminManageStaffProcedure
    .input(
      z
        .object({
          id: z.string().uuid(),
          nome: z.string().min(1).max(160).optional(),
          email: z.string().email().max(120).optional(),
          role: z.enum(["ADMIN", "FINANCEIRO", "ATENDENTE"]).optional(),
          ativo: z.boolean().optional(),
        })
        .refine(
          (d) =>
            d.nome !== undefined ||
            d.email !== undefined ||
            d.role !== undefined ||
            d.ativo !== undefined,
          { message: "Indique pelo menos um campo a alterar." },
        ),
    )
    .mutation(async ({ input }) => {
      const { id, ...patch } = input;
      const current = await db.user.findUnique({ where: { id } });
      if (!current) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Funcionário não encontrado.",
        });
      }

      const nextRole = patch.role ?? current.role;
      const nextAtivo = patch.ativo ?? current.ativo;
      const emailNorm = patch.email?.trim().toLowerCase();

      if (emailNorm && emailNorm !== current.email) {
        const taken = await db.user.findUnique({
          where: { email: emailNorm },
        });
        if (taken) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Já existe uma conta com este e-mail.",
          });
        }
      }

      if (current.role === "ADMIN" && current.ativo) {
        if (nextRole !== "ADMIN" || !nextAtivo) {
          await assertAtLeastOneOtherActiveAdmin(current.id);
        }
      }

      const updated = await db.user.update({
        where: { id },
        data: {
          ...(patch.nome !== undefined ? { nome: patch.nome } : {}),
          ...(emailNorm !== undefined ? { email: emailNorm } : {}),
          ...(patch.role !== undefined ? { role: patch.role } : {}),
          ...(patch.ativo !== undefined ? { ativo: patch.ativo } : {}),
        },
        select: {
          id: true,
          email: true,
          nome: true,
          role: true,
          ativo: true,
          createdAt: true,
        },
      });

      return updated;
    }),

  /**
   * Cria uma conta de funcionário. Apenas ADMIN.
   */
  createStaff: adminManageStaffProcedure
    .input(
      z.object({
        email: z.string().email().max(120),
        nome: z.string().min(1).max(160),
        senha: z.string().min(8).max(128),
        role: z.enum(["ADMIN", "FINANCEIRO", "ATENDENTE"]),
        ativo: z.boolean().optional().default(true),
      }),
    )
    .mutation(async ({ input }) => {
      const emailNorm = input.email.trim().toLowerCase();
      const exists = await db.user.findUnique({
        where: { email: emailNorm },
      });
      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Já existe uma conta com este e-mail.",
        });
      }
      const senhaHash = await hash(input.senha, 12);
      const created = await db.user.create({
        data: {
          email: emailNorm,
          nome: input.nome.trim(),
          senha: senhaHash,
          role: input.role,
          ativo: input.ativo,
        },
        select: {
          id: true,
          email: true,
          nome: true,
          role: true,
          ativo: true,
          createdAt: true,
        },
      });
      return created;
    }),

  /**
   * Redefine a palavra-passe de um funcionário. Apenas ADMIN.
   */
  updateStaffPassword: adminManageStaffProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        novaSenha: z.string().min(8).max(128),
      }),
    )
    .mutation(async ({ input }) => {
      const row = await db.user.findUnique({ where: { id: input.id } });
      if (!row) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Funcionário não encontrado.",
        });
      }
      const senhaHash = await hash(input.novaSenha, 12);
      await db.user.update({
        where: { id: input.id },
        data: { senha: senhaHash },
      });
      return { ok: true as const };
    }),

  /**
   * Histórico paginado de execuções em `SyncLog` (ex.: SQL Server → Postgres).
   * Por defeito filtra pelo job `sync-sqlserver-to-postgres`; use `allJobs: true` para ver todos os jobs.
   */
  listSyncLogs: adminProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(50),
        /** Página baseada em zero (usa `skip` no Prisma, ordenação por `dataInicio` desc). */
        page: z.number().min(0).default(0),
        allJobs: z.boolean().optional().default(false),
        jobName: z.string().max(80).optional(),
        status: z.enum(["PROCESSANDO", "SUCESSO", "FALHA"]).optional(),
      }),
    )
    .query(async ({ input }) => {
      const where: Prisma.SyncLogWhereInput = {
        ...(!input.allJobs
          ? {
              jobName: input.jobName ?? SYNC_SQLSERVER_JOB_NAME,
            }
          : input.jobName
            ? { jobName: input.jobName }
            : {}),
        ...(input.status ? { status: input.status } : {}),
      };

      const skip = input.page * input.limit;
      const take = input.limit + 1;
      const rows = await db.syncLog.findMany({
        where,
        orderBy: { dataInicio: "desc" },
        skip,
        take,
        select: {
          id: true,
          jobName: true,
          status: true,
          registrosNovos: true,
          registrosAtualizados: true,
          falhas: true,
          erroDetalhes: true,
          dataInicio: true,
          dataFim: true,
        },
      });

      const hasMore = rows.length > input.limit;
      const items = hasMore ? rows.slice(0, input.limit) : rows;

      return {
        items,
        nextPage: hasMore ? input.page + 1 : undefined,
      };
    }),

  /**
   * Indica se o job SQL Server → Postgres está com execução em curso (`PROCESSANDO`).
   */
  sqlServerSyncStatus: adminProcedure.query(async () => {
    const n = await db.syncLog.count({
      where: {
        jobName: SYNC_SQLSERVER_JOB_NAME,
        status: "PROCESSANDO",
      },
    });
    return { isRunning: n > 0 };
  }),

  /**
   * Executa o mesmo ETL que `npm run job:sync` / GET `/api/cron/sync-sqlserver`.
   * Falha com CONFLICT se já existir um `sync_logs` em `PROCESSANDO` para este job.
   */
  triggerSqlServerSync: adminProcedure.mutation(async () => {
    const running = await db.syncLog.count({
      where: {
        jobName: SYNC_SQLSERVER_JOB_NAME,
        status: "PROCESSANDO",
      },
    });
    if (running > 0) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Já existe uma sincronização em execução.",
      });
    }

    const env = loadJobEnv();
    const result = await runSync(db, env);
    return { ok: true as const, ...result };
  }),

  /**
   * Detalhes completos de um jazigo: localização, contrato, titular,
   * responsável financeiro e agregados de pagamentos por status.
   */
  getJazigoById: adminProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      const jazigo = await db.jazigo.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          sqlServerId: true,
          codigo: true,
          quadra: true,
          setor: true,
          quantidadeGavetas: true,
          valorMensalidade: true,
          syncedAt: true,
          createdAt: true,
          updatedAt: true,
          contrato: {
            select: {
              id: true,
              numeroContrato: true,
              situacao: true,
              customer: {
                select: { id: true, nome: true, cpfCnpj: true, email: true },
              },
              responsavelFinanceiro: {
                select: {
                  motivo: true,
                  customer: {
                    select: { id: true, nome: true, cpfCnpj: true, email: true },
                  },
                },
              },
            },
          },
          responsavelFinanceiroCustomer: {
            select: { id: true, nome: true, cpfCnpj: true, email: true },
          },
          _count: { select: { pagamentos: true } },
        },
      });

      if (!jazigo) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Jazigo não encontrado.",
        });
      }

      const paymentStats = await db.pagamento.groupBy({
        by: ["status"],
        where: { jazigoId: input.id },
        _count: true,
        _sum: { valorTitulo: true },
      });

      const byStatus = Object.fromEntries(
        paymentStats.map((s) => [
          s.status,
          {
            count: s._count,
            valueCents: s._sum.valorTitulo
              ? centsFromDecimal(s._sum.valorTitulo)
              : 0,
          },
        ]),
      );

      return {
        ...jazigo,
        valorMensalidadeCents: centsFromDecimal(jazigo.valorMensalidade),
        byStatus: byStatus as Partial<
          Record<
            "PENDENTE" | "PAGO" | "ATRASADO" | "CANCELADO" | "ESTORNADO",
            { count: number; valueCents: number }
          >
        >,
      };
    }),

  /**
   * Lista paginada de pagamentos de um jazigo, com filtro opcional por status.
   */
  listJazigoPayments: adminProcedure
    .input(
      z.object({
        jazigoId: z.string().uuid(),
        limit: z.number().min(1).max(100).default(25),
        cursor: z.string().uuid().optional(),
        status: z
          .enum(["PENDENTE", "PAGO", "ATRASADO", "CANCELADO", "ESTORNADO"])
          .optional(),
      }),
    )
    .query(async ({ input }) => {
      const where: Prisma.PagamentoWhereInput = {
        jazigoId: input.jazigoId,
        ...(input.status ? { status: input.status } : {}),
      };

      const items = await db.pagamento.findMany({
        where,
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { dataVencimento: "desc" },
        select: {
          id: true,
          valorTitulo: true,
          valorPago: true,
          dataVencimento: true,
          dataPagamento: true,
          status: true,
          tipo: true,
          metodoPagamento: true,
          nossoNumero: true,
          asaasId: true,
          invoiceUrl: true,
          gavetasNaEpoca: true,
          valorNaEpoca: true,
          createdAt: true,
        },
      });

      let nextCursor: string | undefined;
      if (items.length > input.limit) {
        const next = items.pop();
        nextCursor = next?.id;
      }

      return {
        items: items.map((p) => ({
          ...p,
          valorTituloCents: centsFromDecimal(p.valorTitulo),
          valorPagoCents: p.valorPago ? centsFromDecimal(p.valorPago) : null,
          valorNaEpocaCents: p.valorNaEpoca
            ? centsFromDecimal(p.valorNaEpoca)
            : null,
        })),
        nextCursor,
      };
    }),

  /**
   * Atualiza gavetas e/ou valor de mensalidade de um jazigo.
   * Requer perfil FINANCEIRO ou ADMIN.
   */
  updateJazigo: adminFinanceProcedure
    .input(
      z
        .object({
          id: z.string().uuid(),
          quantidadeGavetas: z.number().int().min(1).max(99).optional(),
          /** Valor em reais (ex.: 180.00). */
          valorMensalidade: z.number().positive().max(99_999).optional(),
        })
        .refine(
          (d) =>
            d.quantidadeGavetas !== undefined || d.valorMensalidade !== undefined,
          { message: "Indique pelo menos um campo a alterar." },
        ),
    )
    .mutation(async ({ input }) => {
      const jazigo = await db.jazigo.findUnique({ where: { id: input.id } });
      if (!jazigo) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Jazigo não encontrado.",
        });
      }

      const data: Prisma.JazigoUpdateInput = {};
      if (input.quantidadeGavetas !== undefined)
        data.quantidadeGavetas = input.quantidadeGavetas;
      if (input.valorMensalidade !== undefined)
        data.valorMensalidade = new Prisma.Decimal(
          input.valorMensalidade.toFixed(2),
        );

      return db.jazigo.update({
        where: { id: input.id },
        data,
        select: {
          id: true,
          codigo: true,
          quantidadeGavetas: true,
          valorMensalidade: true,
          updatedAt: true,
        },
      });
    }),
});
