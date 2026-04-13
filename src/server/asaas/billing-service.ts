import "server-only";

import { TRPCError } from "@trpc/server";

import { Prisma } from "../../../generated/prisma/client";
import type { Customer } from "../../../generated/prisma/client";
import { db } from "~/server/db";
import { decimalFromCents } from "~/server/billing/money";
import { mapAsaasToStatusPagamento } from "~/server/billing/asaas-payment-status";
import { assertPagamentoManutencaoTemJazigo } from "~/server/billing/validate-pagamento";

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

function utcNoonDate(d: Date): Date {
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 12, 0, 0),
  );
}

function metodoFromBillingType(
  billingType: AsaasBillingType,
): "PIX" | "BOLETO" | "CARTAO_CREDITO" {
  if (billingType === "BOLETO") return "BOLETO";
  if (billingType === "CREDIT_CARD") return "CARTAO_CREDITO";
  return "PIX";
}

export type EnsureAsaasCustomerOptions = {
  cpfCnpjOverride?: string;
  emailOverride?: string;
  nameOverride?: string;
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
    name: options?.nameOverride ?? customer.nome ?? emailRaw.split("@")[0] ?? "Cliente",
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

/**
 * Cria cobrança PIX no Asaas e registo em `Pagamento`.
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

  return db.pagamento.create({
    data: {
      customerId: customer.id,
      valorTitulo: decimalFromCents(valueCents),
      dataVencimento: utcNoonDate(dueDate),
      tipo: "TAXA_SERVICO",
      status: mapAsaasToStatusPagamento(payment.status),
      asaasId: payment.id,
      invoiceUrl: payment.invoiceUrl ?? payment.bankSlipUrl ?? null,
      metodoPagamento: "PIX",
      webhookData: payment as unknown as Prisma.InputJsonValue,
      webhookRecebidoEm: new Date(),
    },
  });
}

/**
 * Cria cobrança Asaas (PIX, boleto ou cartão) e registo em `Pagamento`.
 */
export async function createAsaasChargeForCustomer(input: {
  customer: Customer;
  valueCents: number;
  description?: string;
  dueDate: Date;
  cpfCnpj?: string;
  email?: string;
  billingType: AsaasBillingType;
  tipoPagamento: "MANUTENCAO" | "TAXA_SERVICO" | "AQUISICAO";
  contratoId?: string;
  jazigoId?: string;
  responsavelFinanceiro?: {
    nome: string;
    cpf: string;
    email?: string | null;
  } | null;
}) {
  const {
    customer,
    valueCents,
    description,
    dueDate,
    cpfCnpj,
    email,
    billingType,
    tipoPagamento,
    contratoId,
    jazigoId,
    responsavelFinanceiro,
  } = input;

  if (valueCents < 100) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Valor mínimo: R$ 1,00 (100 centavos).",
    });
  }

  assertPagamentoManutencaoTemJazigo({
    tipo: tipoPagamento,
    jazigoId,
  });

  const payerEmail = responsavelFinanceiro?.email ?? email;
  const payerCpf = responsavelFinanceiro?.cpf ?? cpfCnpj;
  const payerName = responsavelFinanceiro?.nome;

  const asaasCustomerId = await ensureAsaasCustomer(customer, {
    cpfCnpjOverride: payerCpf,
    emailOverride: payerEmail,
    nameOverride: payerName,
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

  const jazigo = jazigoId
    ? await db.jazigo.findUnique({
        where: { id: jazigoId },
        select: { id: true, quantidadeGavetas: true, valorMensalidade: true },
      })
    : null;

  return db.pagamento.create({
    data: {
      customerId: customer.id,
      valorTitulo: decimalFromCents(valueCents),
      dataVencimento: utcNoonDate(dueDate),
      tipo: tipoPagamento,
      status: mapAsaasToStatusPagamento(payment.status),
      asaasId: payment.id,
      invoiceUrl: checkoutUrl ?? payment.invoiceUrl ?? null,
      metodoPagamento: metodoFromBillingType(billingType),
      contratoId: contratoId ?? null,
      jazigoId: jazigo?.id ?? jazigoId ?? null,
      gavetasNaEpoca: jazigo?.quantidadeGavetas ?? null,
      valorNaEpoca: jazigo?.valorMensalidade ?? null,
      webhookData: payment as unknown as Prisma.InputJsonValue,
      webhookRecebidoEm: new Date(),
    },
  });
}
