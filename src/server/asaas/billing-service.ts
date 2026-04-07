import "server-only";

import { TRPCError } from "@trpc/server";

import type { User } from "../../../generated/prisma";
import { db } from "~/server/db";

import { asaasFetch, AsaasApiError } from "./client";

type AsaasCustomer = {
  id: string;
  name?: string;
  email?: string;
};

type AsaasPaymentCreateResponse = {
  id: string;
  status: string;
  value: number;
  pixCopiaECola?: string;
  encodedImage?: string;
};

function reaisFromCents(cents: number): number {
  return Math.round(cents) / 100;
}

function formatDueDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/**
 * Garante que existe cliente Asaas ligado ao utilizador e persiste `asaasCustomerId`.
 */
export async function ensureAsaasCustomer(
  user: User,
  cpfCnpjOverride?: string,
): Promise<string> {
  if (user.asaasCustomerId) {
    return user.asaasCustomerId;
  }

  const email = user.email;
  if (!email) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "O utilizador precisa de email registado para criar cobranças.",
    });
  }

  const cpfCnpj = cpfCnpjOverride ?? user.cpfCnpj;
  if (!cpfCnpj?.trim()) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message:
        "Informe CPF ou CNPJ (defina no perfil ou envie ao criar a cobrança).",
    });
  }

  const body = {
    name: user.name ?? email.split("@")[0] ?? "Cliente",
    email,
    cpfCnpj: cpfCnpj.replace(/\D/g, ""),
  };

  try {
    const created = await asaasFetch<AsaasCustomer>("/customers", {
      method: "POST",
      body: JSON.stringify(body),
    });

    await db.user.update({
      where: { id: user.id },
      data: {
        asaasCustomerId: created.id,
        cpfCnpj: body.cpfCnpj,
      },
    });

    return created.id;
  } catch (e) {
    if (e instanceof AsaasApiError) {
      throw new TRPCError({
        code: "BAD_GATEWAY",
        message: `Asaas (cliente): ${e.message}`,
      });
    }
    throw e;
  }
}

/**
 * Cria cobrança PIX no Asaas e registo em `BillingPayment`.
 */
export async function createPixChargeForUser(input: {
  user: User;
  valueCents: number;
  description?: string;
  dueDate: Date;
  cpfCnpj?: string;
}) {
  const { user, valueCents, description, dueDate, cpfCnpj } = input;

  if (valueCents < 100) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Valor mínimo: R$ 1,00 (100 centavos).",
    });
  }

  const customerId = await ensureAsaasCustomer(user, cpfCnpj);

  const payload = {
    customer: customerId,
    billingType: "PIX",
    value: reaisFromCents(valueCents),
    dueDate: formatDueDate(dueDate),
    description: description ?? "Cobrança PIX",
  };

  let payment: AsaasPaymentCreateResponse;
  try {
    payment = await asaasFetch<AsaasPaymentCreateResponse>("/payments", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (e) {
    if (e instanceof AsaasApiError) {
      throw new TRPCError({
        code: "BAD_GATEWAY",
        message: `Asaas (cobrança): ${e.message}`,
      });
    }
    throw e;
  }

  const record = await db.billingPayment.create({
    data: {
      userId: user.id,
      asaasPaymentId: payment.id,
      valueCents,
      status: "PENDING",
      description: description ?? null,
      dueDate,
      pixCopyPaste: payment.pixCopiaECola ?? null,
      pixQrCodeBase64: payment.encodedImage ?? null,
    },
  });

  return record;
}
