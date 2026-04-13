import { TRPCError } from "@trpc/server";
import { z } from "zod";

import type { MetodoPagamento, Pagamento } from "../../../../generated/prisma/client";
import { db } from "~/server/db";
import {
  createAsaasChargeForCustomer,
  createPixChargeForCustomer,
} from "~/server/asaas/billing-service";
import { centsFromDecimal } from "~/server/billing/money";
import type { BillingPaymentStatus } from "~/lib/billing-status";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const createChargeInput = z.object({
  valueCents: z.number().int().min(100).max(1_000_000_000),
  description: z.string().max(500).optional(),
  dueDate: z.coerce.date(),
  cpfCnpj: z.string().max(22).optional(),
  email: z.string().email().max(320).optional(),
  billingType: z.enum(["PIX", "BOLETO", "CREDIT_CARD"]),
});

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

function mapMetodoToUi(
  m: MetodoPagamento | null,
): "PIX" | "BOLETO" | "CREDIT_CARD" | null {
  if (!m) return null;
  if (m === "PIX") return "PIX";
  if (m === "BOLETO") return "BOLETO";
  return "CREDIT_CARD";
}

function mapStatusToBillingUi(
  status: Pagamento["status"],
): BillingPaymentStatus {
  switch (status) {
    case "PENDENTE":
      return "PENDING";
    case "PAGO":
      return "RECEIVED";
    case "ATRASADO":
      return "OVERDUE";
    case "CANCELADO":
      return "CANCELLED";
    case "ESTORNADO":
      return "REFUNDED";
    default:
      return "UNKNOWN";
  }
}

function serializePortalPayment(row: Pagamento) {
  const raw = row.webhookData;
  let pixCopyPaste: string | null = null;
  if (raw !== null && typeof raw === "object" && !Array.isArray(raw)) {
    const o = raw as Record<string, unknown> & { pixCopiaECola?: unknown };
    const v = o.pixCopiaECola;
    pixCopyPaste = typeof v === "string" ? v : null;
  }

  return {
    ...row,
    status: mapStatusToBillingUi(row.status),
    valueCents: centsFromDecimal(row.valorTitulo),
    /** Compat UI antiga (lista de parcelas). */
    asaasBillingType: mapMetodoToUi(row.metodoPagamento),
    description: null as string | null,
    checkoutUrl: row.invoiceUrl ?? null,
    boletoDigitableLine: null as string | null,
    pixQrCodeBase64: null as string | null,
    pixCopyPaste,
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
      where: { customerId },
      orderBy: { createdAt: "desc" },
    });
    return rows.map(serializePortalPayment);
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      requirePortalSession(ctx);
      const customerId = ctx.session.user.id;
      const row = await db.pagamento.findFirst({
        where: { id: input.id, customerId },
      });
      if (!row) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return serializePortalPayment(row);
    }),

  createPix: protectedProcedure
    .input(
      z.object({
        valueCents: z.number().int().min(100).max(1_000_000_000),
        description: z.string().max(500).optional(),
        dueDate: z.coerce.date(),
        cpfCnpj: z.string().max(22).optional(),
        email: z.string().email().max(320).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      requirePortalSession(ctx);
      const customer = await db.customer.findUnique({
        where: { id: ctx.session.user.id },
      });
      if (!customer) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const created = await createPixChargeForCustomer({
        customer,
        valueCents: input.valueCents,
        description: input.description,
        dueDate: input.dueDate,
        cpfCnpj: input.cpfCnpj,
        email: input.email,
      });
      return serializePortalPayment(created);
    }),

  createCharge: protectedProcedure
    .input(createChargeInput)
    .mutation(async ({ ctx, input }) => {
      requirePortalSession(ctx);
      const customer = await db.customer.findUnique({
        where: { id: ctx.session.user.id },
      });
      if (!customer) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (input.billingType === "PIX") {
        const created = await createPixChargeForCustomer({
          customer,
          valueCents: input.valueCents,
          description: input.description,
          dueDate: input.dueDate,
          cpfCnpj: input.cpfCnpj,
          email: input.email,
        });
        return serializePortalPayment(created);
      }

      const created = await createAsaasChargeForCustomer({
        customer,
        valueCents: input.valueCents,
        description: input.description,
        dueDate: input.dueDate,
        cpfCnpj: input.cpfCnpj,
        email: input.email,
        billingType: input.billingType,
        tipoPagamento: "TAXA_SERVICO",
        contratoId: undefined,
        jazigoId: undefined,
        responsavelFinanceiro: null,
      });
      return serializePortalPayment(created);
    }),
});
