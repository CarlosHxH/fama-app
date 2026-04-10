import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { db } from "~/server/db";
import {
  createAsaasChargeForUser,
  createPixChargeForUser,
} from "~/server/asaas/billing-service";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const createChargeInput = z.object({
  valueCents: z.number().int().min(100).max(1_000_000_000),
  description: z.string().max(500).optional(),
  dueDate: z.coerce.date(),
  cpfCnpj: z.string().max(22).optional(),
  email: z.string().email().max(320).optional(),
  billingType: z.enum(["PIX", "BOLETO", "CREDIT_CARD"]),
});

/**
 * API de cobrança para o utilizador autenticado (Asaas: PIX, boleto, cartão).
 */
export const billingRouter = createTRPCRouter({
  listMine: protectedProcedure.query(async ({ ctx }) => {
    return db.billingPayment.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const row = await db.billingPayment.findFirst({
        where: { id: input.id, userId: ctx.session.user.id },
      });
      if (!row) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return row;
    }),

  /** Preferir `createCharge`; mantido para compatibilidade. */
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
      const user = await db.user.findUnique({
        where: { id: ctx.session.user.id },
      });
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return createPixChargeForUser({
        user,
        valueCents: input.valueCents,
        description: input.description,
        dueDate: input.dueDate,
        cpfCnpj: input.cpfCnpj,
        email: input.email,
      });
    }),

  createCharge: protectedProcedure
    .input(createChargeInput)
    .mutation(async ({ ctx, input }) => {
      const user = await db.user.findUnique({
        where: { id: ctx.session.user.id },
      });
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (input.billingType === "PIX") {
        return createPixChargeForUser({
          user,
          valueCents: input.valueCents,
          description: input.description,
          dueDate: input.dueDate,
          cpfCnpj: input.cpfCnpj,
          email: input.email,
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
});
