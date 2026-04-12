import "server-only";

import { TRPCError } from "@trpc/server";

import { Prisma } from "../../../generated/prisma/client";
import type { Customer } from "../../../generated/prisma/client";
import { db } from "~/server/db";
import { decimalFromCents } from "~/server/billing/money";

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
  emailOverride?: string;
};

/**
 * Garante cliente Asaas e persiste `asaasCustomerId` no `Customer`.
 */
export async function ensureAsaasCustomer(
  customer: Customer,
  options?: EnsureAsaasCustomerOptions,
): Promise<string> {
  if (customer.asaasCustomerId) {
    return customer.asaasCustomerId;
  }

  const emailRaw = resolveBillingContactEmail(
    customer.email,
    options?.emailOverride,
  );
  if (!emailRaw) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message:
        "É necessário um e-mail para criar cobranças. Indique no formulário abaixo ou registe o e-mail no perfil.",
    });
  }

  const cpfCnpj = options?.cpfCnpjOverride ?? customer.cpfCnpj;
  if (!cpfCnpj?.trim()) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message:
        "Informe CPF ou CNPJ (defina no perfil ou envie ao criar a cobrança).",
    });
  }

  const body = {
    name: customer.fullName ?? emailRaw.split("@")[0] ?? "Cliente",
    email: emailRaw,
    cpfCnpj: cpfCnpj.replace(/\D/g, ""),
  };

  try {
    const created = await asaasFetch<AsaasCustomer>("/customers", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const persistEmail = !customer.email?.trim() && emailRaw.length > 0;
    const digitsCpf = body.cpfCnpj;

    try {
      await db.customer.update({
        where: { id: customer.id },
        data: {
          asaasCustomerId: created.id,
          cpfCnpj: digitsCpf,
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

function mapInitialPortalStatus(asaasStatus: string | undefined): string {
  const s = (asaasStatus ?? "PENDING").toUpperCase();
  if (s === "CONFIRMED" || s === "RECEIVED") return "RECEIVED";
  if (s === "OVERDUE") return "OVERDUE";
  return "PENDING";
}

/**
 * Cria cobrança PIX no Asaas e registo em `PortalPayment`.
 */
export async function createPixChargeForCustomer(input: {
  customer: Customer;
  valueCents: number;
  description?: string;
  dueDate: Date;
  cpfCnpj?: string;
  email?: string;
}) {
  const { customer, valueCents, description, dueDate, cpfCnpj, email } = input;

  if (valueCents < 100) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Valor mínimo: R$ 1,00 (100 centavos).",
    });
  }

  const asaasCustomerId = await ensureAsaasCustomer(customer, {
    cpfCnpjOverride: cpfCnpj,
    emailOverride: email,
  });

  const payload = {
    customer: asaasCustomerId,
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

  return db.portalPayment.create({
    data: {
      customerId: customer.id,
      invoiceId: null,
      asaasPaymentId: payment.id,
      paymentMethod: "PIX",
      status: mapInitialPortalStatus(payment.status),
      invoiceUrl: payment.invoiceUrl ?? null,
      bankSlipUrl: payment.bankSlipUrl ?? null,
      pixCopyPaste: payment.pixCopiaECola ?? null,
      value: decimalFromCents(valueCents),
    },
  });
}

/**
 * Cria cobrança Asaas (PIX, boleto ou cartão) e registo em `PortalPayment`.
 */
export async function createAsaasChargeForCustomer(input: {
  customer: Customer;
  valueCents: number;
  description?: string;
  dueDate: Date;
  cpfCnpj?: string;
  email?: string;
  billingType: AsaasBillingType;
}) {
  const {
    customer,
    valueCents,
    description,
    dueDate,
    cpfCnpj,
    email,
    billingType,
  } = input;

  if (valueCents < 100) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Valor mínimo: R$ 1,00 (100 centavos).",
    });
  }

  const asaasCustomerId = await ensureAsaasCustomer(customer, {
    cpfCnpjOverride: cpfCnpj,
    emailOverride: email,
  });

  const payload: Record<string, unknown> = {
    customer: asaasCustomerId,
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

  const checkoutUrl = payment.invoiceUrl ?? payment.bankSlipUrl ?? undefined;

  return db.portalPayment.create({
    data: {
      customerId: customer.id,
      invoiceId: null,
      asaasPaymentId: payment.id,
      paymentMethod: billingType,
      status: mapInitialPortalStatus(payment.status),
      invoiceUrl: checkoutUrl ?? payment.invoiceUrl ?? null,
      bankSlipUrl: payment.bankSlipUrl ?? null,
      pixCopyPaste: payment.pixCopiaECola ?? null,
      value: decimalFromCents(valueCents),
    },
  });
}
