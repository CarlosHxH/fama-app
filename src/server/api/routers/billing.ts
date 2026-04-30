import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Prisma } from "../../../../generated/prisma/client";

import { db } from "~/server/db";
import {
  createAsaasChargeForCustomer,
  createPixChargeForCustomer,
  attachAsaasChargeToPayment,
  cancelAsaasCharge,
} from "~/server/asaas/billing-service";
import { serializePortalPayment } from "~/server/billing/serialize-portal-payment";
import { centsFromDecimal } from "~/server/billing/money";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

/** Returns a due date 3 days from now at noon UTC. */
function defaultDueDate(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  d.setUTCHours(12, 0, 0, 0);
  return d;
}

function requirePortalSession(
  ctx: { session: { user: { accountKind: string; id: string } } },
) {
  if (ctx.session.user.accountKind !== "portal") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Cobrança disponível apenas para sessão de cliente (portal).",
    });
  }
}

function capacidadeLabel(gavetas: number): string {
  if (gavetas === 1) return "Simples";
  if (gavetas === 2) return "Duplo";
  if (gavetas === 3) return "Triplo";
  if (gavetas === 6) return "Sextuplo";
  return `${gavetas} gavetas`;
}

/**
 * Retorna o filtro Prisma de pagamentos visíveis ao cliente:
 * - pagamentos onde ele é o pagador (customerId)
 * - pagamentos de jazigos onde ele é responsável financeiro direto
 * - pagamentos de jazigos onde ele é responsável financeiro via contrato (legado)
 */
function wherePaymentVisibleTo(customerId: string): Prisma.PagamentoWhereInput {
  return {
    valorTitulo: { gt: 0 },
    OR: [
      { customerId },
      { jazigo: { responsavelFinanceiroCustomerId: customerId } },
      { jazigo: { contrato: { responsavelFinanceiro: { customerId } } } },
    ],
  };
}

/**
 * API de cobrança para o cliente autenticado (Asaas: PIX, boleto, cartão).
 */
export const billingRouter = createTRPCRouter({
  listMine: protectedProcedure.query(async ({ ctx }) => {
    requirePortalSession(ctx);
    const customerId = ctx.session.user.id;
    const rows = await db.pagamento.findMany({
      where: wherePaymentVisibleTo(customerId),
      orderBy: { createdAt: "desc" },
      include: {
        jazigo: { select: { codigo: true, quadra: true } },
        contrato: { select: { numeroContrato: true } },
      },
    });
    return rows.map((row) => ({
      ...serializePortalPayment(row),
      jazigoCodigo: row.jazigo?.codigo ?? null,
      jazigoQuadra: row.jazigo?.quadra ?? null,
      contratoNumero: row.contrato?.numeroContrato ?? null,
    }));
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      requirePortalSession(ctx);
      const customerId = ctx.session.user.id;
      const row = await db.pagamento.findFirst({
        where: { id: input.id, AND: [wherePaymentVisibleTo(customerId)] },
      });
      if (!row) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return serializePortalPayment(row);
    }),

  /** Jazigos onde o cliente autenticado é titular ou responsável financeiro. */
  listMyJazigos: protectedProcedure.query(async ({ ctx }) => {
    requirePortalSession(ctx);
    const customerId = ctx.session.user.id;

    const jazigos = await db.jazigo.findMany({
      where: {
        OR: [
          { contrato: { customerId } },
          { responsavelFinanceiroCustomerId: customerId },
          { contrato: { responsavelFinanceiro: { customerId } } },
        ],
      },
      include: {
        contrato: {
          select: {
            id: true,
            numeroContrato: true,
            situacao: true,
          },
        },
      },
      orderBy: { codigo: "asc" },
    });

    return jazigos.map((j) => ({
      id: j.id,
      codigo: j.codigo,
      quadra: j.quadra ?? "—",
      setor: j.setor ?? "—",
      quantidadeGavetas: j.quantidadeGavetas,
      capacidadeLabel: capacidadeLabel(j.quantidadeGavetas),
      valorMensalidadeCents: centsFromDecimal(j.valorMensalidade),
      contrato: {
        id: j.contrato.id,
        numeroContrato: j.contrato.numeroContrato,
        situacao: j.contrato.situacao,
      },
    }));
  }),

  /**
   * Inicia ou recupera a cobrança Asaas para um pagamento existente no banco.
   * CPF e e-mail são sempre lidos do registo do cliente — o cliente não os envia.
   */
  initiatePayment: protectedProcedure
    .input(
      z.object({
        paymentId: z.string().uuid(),
        billingType: z.enum(["PIX", "BOLETO", "CREDIT_CARD"]),
        cpfCnpj: z.string().max(22).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      requirePortalSession(ctx);
      const customerId = ctx.session.user.id;

      const payment = await db.pagamento.findFirst({
        where: { id: input.paymentId, AND: [wherePaymentVisibleTo(customerId)] },
      });
      if (!payment) throw new TRPCError({ code: "NOT_FOUND" });

      // Mapeia método local → billingType Asaas para comparação
      const currentBillingType =
        payment.metodoPagamento === "BOLETO" ? "BOLETO"
        : payment.metodoPagamento === "CARTAO_CREDITO" ? "CREDIT_CARD"
        : payment.metodoPagamento === "PIX" ? "PIX"
        : null;

      // Já tem cobrança Asaas com o mesmo método: retorna sem recriar
      if (payment.asaasId && currentBillingType === input.billingType) {
        return serializePortalPayment(payment);
      }

      // Tem cobrança Asaas com método diferente: cancela a anterior
      if (payment.asaasId) {
        await cancelAsaasCharge(payment.asaasId);
        await db.pagamento.update({
          where: { id: payment.id },
          data: {
            asaasId: null,
            metodoPagamento: null,
            invoiceUrl: null,
            webhookData: Prisma.DbNull,
          },
        });
      }

      const customer = await db.customer.findUnique({ where: { id: customerId } });
      if (!customer) throw new TRPCError({ code: "NOT_FOUND" });

      const updated = await attachAsaasChargeToPayment({
        pagamentoId: payment.id,
        valorTitulo: payment.valorTitulo,
        dataVencimento: payment.dataVencimento,
        customer,
        billingType: input.billingType,
        cpfCnpj: input.cpfCnpj,
      });
      return serializePortalPayment(updated);
    }),

  /**
   * Cancela uma cobrança Asaas pendente para que o cliente possa escolher outro método.
   */
  cancelCharge: protectedProcedure
    .input(z.object({ paymentId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      requirePortalSession(ctx);
      const customerId = ctx.session.user.id;

      const payment = await db.pagamento.findFirst({
        where: { id: input.paymentId, AND: [wherePaymentVisibleTo(customerId)] },
      });
      if (!payment) throw new TRPCError({ code: "NOT_FOUND" });
      if (payment.status === "PAGO") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Esta parcela já foi paga e não pode ser cancelada.",
        });
      }

      if (payment.asaasId) {
        await cancelAsaasCharge(payment.asaasId);
      }

      // Cancela apenas a cobrança no Asaas; a parcela continua PENDENTE
      // para que o cliente possa escolher outro método e pagar.
      const updated = await db.pagamento.update({
        where: { id: payment.id },
        data: {
          asaasId: null,
          metodoPagamento: null,
          invoiceUrl: null,
          webhookData: Prisma.DbNull,
        },
      });
      return serializePortalPayment(updated);
    }),

  /**
   * Cria uma nova cobrança para o cliente autenticado a partir de um jazigo.
   * Valor, CPF e data de vencimento derivados do servidor — o cliente só escolhe
   * o jazigo, o método de pagamento e uma descrição opcional.
   */
  createCharge: protectedProcedure
    .input(
      z.object({
        jazigoId: z.string().uuid(),
        billingType: z.enum(["PIX", "BOLETO", "CREDIT_CARD"]),
        description: z.string().max(500).optional(),
        cpfCnpj: z.string().max(22).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      requirePortalSession(ctx);
      const customerId = ctx.session.user.id;

      const jazigo = await db.jazigo.findFirst({
        where: {
          id: input.jazigoId,
          OR: [
            { contrato: { customerId } },
            { responsavelFinanceiroCustomerId: customerId },
            { contrato: { responsavelFinanceiro: { customerId } } },
          ],
        },
        include: {
          contrato: { select: { id: true, numeroContrato: true } },
        },
      });
      if (!jazigo) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Jazigo não encontrado ou sem permissão de acesso.",
        });
      }

      const customer = await db.customer.findUnique({ where: { id: customerId } });
      if (!customer) throw new TRPCError({ code: "NOT_FOUND" });

      const valueCents = centsFromDecimal(jazigo.valorMensalidade);
      const dueDate = defaultDueDate();

      if (input.billingType === "PIX") {
        const created = await createPixChargeForCustomer({
          customer,
          valueCents,
          description: input.description,
          dueDate,
          jazigoId: jazigo.id,
          contratoId: jazigo.contrato.id,
          cpfCnpj: input.cpfCnpj,
        });
        return serializePortalPayment(created);
      }

      const created = await createAsaasChargeForCustomer({
        customer,
        valueCents,
        description: input.description,
        dueDate,
        billingType: input.billingType,
        tipoPagamento: "MANUTENCAO",
        contratoId: jazigo.contrato.id,
        jazigoId: jazigo.id,
        responsavelFinanceiro: null,
        cpfCnpj: input.cpfCnpj,
      });
      return serializePortalPayment(created);
    }),
});
