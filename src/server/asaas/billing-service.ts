import "server-only";

import { TRPCError } from "@trpc/server";

import { Prisma } from "../../../generated/prisma/client";
import type { User } from "../../../generated/prisma/client";
import { db } from "~/server/db";

import { asaasFetch, AsaasApiError } from "./client";
import { resolveBillingContactEmail } from "./resolve-billing-email";

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
  invoiceUrl?: string;
  bankSlipUrl?: string;
  identificationField?: string;
};

/** Tipos de cobrança suportados na API Asaas (admin). */
export type AsaasBillingType = "PIX" | "BOLETO" | "CREDIT_CARD";

function reaisFromCents(cents: number): number {
  return Math.round(cents) / 100;
}

function formatDueDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export type EnsureAsaasCustomerOptions = {
  cpfCnpjOverride?: string;
  /** Usado quando o perfil ainda não tem e-mail (ex.: login só com CPF). */
  emailOverride?: string;
};

/**
 * Garante que existe cliente Asaas ligado ao utilizador e persiste `asaasCustomerId`.
 */
export async function ensureAsaasCustomer(
  user: User,
  options?: EnsureAsaasCustomerOptions,
): Promise<string> {
  if (user.asaasCustomerId) {
    return user.asaasCustomerId;
  }

  const emailRaw = resolveBillingContactEmail(
    user.email,
    options?.emailOverride,
  );
  if (!emailRaw) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message:
        "É necessário um e-mail para criar cobranças. Indique no formulário abaixo ou registe o e-mail no perfil.",
    });
  }

  const cpfCnpj = options?.cpfCnpjOverride ?? user.cpfCnpj;
  if (!cpfCnpj?.trim()) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message:
        "Informe CPF ou CNPJ (defina no perfil ou envie ao criar a cobrança).",
    });
  }

  const body = {
    name: user.name ?? emailRaw.split("@")[0] ?? "Cliente",
    email: emailRaw,
    cpfCnpj: cpfCnpj.replace(/\D/g, ""),
  };

  try {
    const created = await asaasFetch<AsaasCustomer>("/customers", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const persistEmail = !user.email?.trim() && emailRaw.length > 0;

    try {
      await db.user.update({
        where: { id: user.id },
        data: {
          asaasCustomerId: created.id,
          cpfCnpj: body.cpfCnpj,
          ...(persistEmail ? { email: emailRaw } : {}),
        },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        throw new TRPCError({
          code: "CONFLICT",
          message:
            "Este e-mail já está associado a outra conta. Utilize outro e-mail ou contacte o suporte.",
        });
      }
      throw e;
    }

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
  email?: string;
}) {
  const { user, valueCents, description, dueDate, cpfCnpj, email } = input;

  if (valueCents < 100) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Valor mínimo: R$ 1,00 (100 centavos).",
    });
  }

  const customerId = await ensureAsaasCustomer(user, {
    cpfCnpjOverride: cpfCnpj,
    emailOverride: email,
  });

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
      asaasBillingType: "PIX",
      checkoutUrl: null,
      boletoDigitableLine: null,
      pixCopyPaste: payment.pixCopiaECola ?? null,
      pixQrCodeBase64: payment.encodedImage ?? null,
    },
  });

  return record;
}

/**
 * Cria cobrança Asaas (PIX, boleto ou cartão via link/fatura) e registo em `BillingPayment`.
 * Usado pelo painel admin para gerar pagamentos em nome do cliente.
 */
export async function createAsaasChargeForUser(input: {
  user: User;
  valueCents: number;
  description?: string;
  dueDate: Date;
  cpfCnpj?: string;
  email?: string;
  billingType: AsaasBillingType;
}) {
  const { user, valueCents, description, dueDate, cpfCnpj, email, billingType } =
    input;

  if (valueCents < 100) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Valor mínimo: R$ 1,00 (100 centavos).",
    });
  }

  const customerId = await ensureAsaasCustomer(user, {
    cpfCnpjOverride: cpfCnpj,
    emailOverride: email,
  });

  const payload: Record<string, unknown> = {
    customer: customerId,
    billingType,
    value: reaisFromCents(valueCents),
    dueDate: formatDueDate(dueDate),
    description: description ?? `Cobrança ${billingType}`,
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

  const checkoutUrl =
    payment.invoiceUrl ?? payment.bankSlipUrl ?? undefined;

  const record = await db.billingPayment.create({
    data: {
      userId: user.id,
      asaasPaymentId: payment.id,
      valueCents,
      status: "PENDING",
      description: description ?? null,
      dueDate,
      asaasBillingType: billingType,
      checkoutUrl: checkoutUrl ?? null,
      boletoDigitableLine: payment.identificationField ?? null,
      pixCopyPaste: payment.pixCopiaECola ?? null,
      pixQrCodeBase64: payment.encodedImage ?? null,
    },
  });

  return record;
}
