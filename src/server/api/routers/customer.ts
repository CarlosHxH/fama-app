import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Prisma } from "../../../../generated/prisma/client";

import { db } from "~/server/db";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

function requirePortal(ctx: { session: { user: { accountKind: string; id: string } } }) {
  if (ctx.session.user.accountKind !== "portal") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Disponível apenas para clientes." });
  }
  return ctx.session.user.id;
}

export const customerRouter = createTRPCRouter({
  getMyProfile: protectedProcedure.query(async ({ ctx }) => {
    const customerId = requirePortal(ctx);
    const customer = await db.customer.findUnique({
      where: { id: customerId },
      select: {
        id: true,
        nome: true,
        email: true,
        cpfCnpj: true,
        telefones: {
          select: { id: true, numero: true, tipo: true, observacoes: true },
          orderBy: { createdAt: "asc" },
        },
        enderecos: {
          select: {
            id: true,
            tipo: true,
            logradouro: true,
            numero: true,
            complemento: true,
            bairro: true,
            cidade: true,
            uf: true,
            cep: true,
            correspondencia: true,
          },
          orderBy: { correspondencia: "desc" },
        },
        contratos: {
          select: {
            responsavelFinanceiro: {
              select: {
                id: true,
                motivo: true,
                customer: { select: { id: true, nome: true, cpfCnpj: true, email: true } },
              },
            },
          },
        },
      },
    });
    if (!customer) throw new TRPCError({ code: "NOT_FOUND", message: "Cliente não encontrado." });

    const responsaveis = customer.contratos
      .map((c) => c.responsavelFinanceiro)
      .filter((r) => r !== null)
      .filter(
        (r, i, arr) =>
          arr.findIndex((x) => x.customer.id === r.customer.id) === i,
      );

    return { ...customer, contratos: undefined, responsaveis };
  }),

  updateMyProfile: protectedProcedure
    .input(
      z.object({
        nome: z.string().trim().min(1).max(160).optional(),
        email: z.string().trim().email().max(120).or(z.literal("")).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const customerId = requirePortal(ctx);
      const data: Record<string, unknown> = {};
      if (input.nome !== undefined) data.nome = input.nome;
      if (input.email !== undefined) data.email = input.email === "" ? null : input.email;
      if (Object.keys(data).length === 0) return;
      try {
        await db.customer.update({ where: { id: customerId }, data });
      } catch (e) {
        if (
          e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === "P2002"
        ) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Este e-mail já está associado a outra conta.",
          });
        }
        throw e;
      }
    }),

  upsertMyPhone: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        numero: z.string().trim().min(6).max(20),
        tipo: z.enum(["CELULAR", "FIXO", "WHATSAPP"]).default("CELULAR"),
        observacoes: z.string().trim().max(500).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const customerId = requirePortal(ctx);
      if (input.id) {
        const phone = await db.customerPhone.findUnique({ where: { id: input.id } });
        if (phone?.customerId !== customerId) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Telefone não encontrado." });
        }
        return db.customerPhone.update({
          where: { id: input.id },
          data: { numero: input.numero, tipo: input.tipo, observacoes: input.observacoes ?? null },
        });
      }
      return db.customerPhone.create({
        data: {
          customerId,
          numero: input.numero,
          tipo: input.tipo,
          observacoes: input.observacoes ?? null,
        },
      });
    }),

  deleteMyPhone: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const customerId = requirePortal(ctx);
      const phone = await db.customerPhone.findUnique({ where: { id: input.id } });
      if (phone?.customerId !== customerId) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Telefone não encontrado." });
      }
      await db.customerPhone.delete({ where: { id: input.id } });
    }),

  upsertMyAddress: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        tipo: z.enum(["RESIDENCIAL", "COMERCIAL"]).optional(),
        logradouro: z.string().trim().max(200).optional(),
        numero: z.string().trim().max(10).optional(),
        complemento: z.string().trim().max(100).optional(),
        bairro: z.string().trim().max(100).optional(),
        cidade: z.string().trim().max(120).optional(),
        uf: z.string().trim().max(2).optional(),
        cep: z.string().trim().max(10).optional(),
        correspondencia: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const customerId = requirePortal(ctx);
      const { id, ...fields } = input;
      const data: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(fields)) {
        if (v !== undefined) data[k] = v === "" ? null : v;
      }
      if (id) {
        const addr = await db.customerAddress.findUnique({ where: { id } });
        if (addr?.customerId !== customerId) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Endereço não encontrado." });
        }
        return db.customerAddress.update({ where: { id }, data });
      }
      return db.customerAddress.create({
        data: { customerId, correspondencia: true, cidade: "—", ...data },
      });
    }),
});
