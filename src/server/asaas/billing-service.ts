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

type AsaasPixQrCodeResponse = {
  encodedImage: string;
  payload: string;
  expirationDate?: string | null;
};

/** Busca QR Code PIX após criação do pagamento (endpoint separado no Asaas). */
async function fetchPixQrCode(paymentId: string): Promise<AsaasPixQrCodeResponse | null> {
  try {
    return await asaasFetch<AsaasPixQrCodeResponse>(`/payments/${paymentId}/pixQrCode`);
  } catch {
    return null;
  }
}

/** Busca detalhes completos do pagamento (inclui identificationField, invoiceUrl, bankSlipUrl). */
async function fetchPaymentDetails(paymentId: string): Promise<AsaasPaymentCreateResponse | null> {
  try {
    return await asaasFetch<AsaasPaymentCreateResponse>(`/payments/${paymentId}`);
  } catch {
    return null;
  }
}

/** Cancela um pagamento Asaas (soft-delete). Não lança se já cancelado. */
export async function cancelAsaasCharge(asaasId: string): Promise<void> {
  try {
    await asaasFetch(`/payments/${asaasId}`, { method: "DELETE" });
  } catch (e) {
    if (e instanceof AsaasApiError && (e.status === 404 || e.status === 409)) return;
    if (e instanceof TRPCError) return;
    throw e;
  }
}

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

  const cpfCnpj = options?.cpfCnpjOverride ?? customer.cpfCnpj;
  if (!cpfCnpj?.trim()) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message:
        "CPF ou CNPJ não encontrado. Contacte o suporte.",
    });
  }

  const body: Record<string, string> = {
    name: options?.nameOverride ?? customer.nome ?? cpfCnpj.replace(/\D/g, ""),
    cpfCnpj: cpfCnpj.replace(/\D/g, ""),
  };
  if (emailRaw) body.email = emailRaw;

  try {
    const created = await asaasFetch<AsaasCustomer>("/customers", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const persistEmail = !customer.email?.trim() && !!emailRaw;
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
  jazigoId?: string;
  contratoId?: string;
}) {
  const { customer, valueCents, description, dueDate, cpfCnpj, email, jazigoId, contratoId } = input;

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

  const [jazigo, pixQr] = await Promise.all([
    jazigoId
      ? db.jazigo.findUnique({
          where: { id: jazigoId },
          select: { id: true, quantidadeGavetas: true, valorMensalidade: true },
        })
      : Promise.resolve(null),
    fetchPixQrCode(payment.id),
  ]);

  const webhookData = {
    ...payment,
    ...(pixQr ? { encodedImage: pixQr.encodedImage, pixCopiaECola: pixQr.payload } : {}),
  };

  return db.pagamento.create({
    data: {
      customerId: customer.id,
      valorTitulo: decimalFromCents(valueCents),
      dataVencimento: utcNoonDate(dueDate),
      tipo: jazigoId ? "MANUTENCAO" : "TAXA_SERVICO",
      status: mapAsaasToStatusPagamento(payment.status),
      asaasId: payment.id,
      invoiceUrl: payment.invoiceUrl ?? payment.bankSlipUrl ?? null,
      metodoPagamento: "PIX",
      contratoId: contratoId ?? null,
      jazigoId: jazigo?.id ?? jazigoId ?? null,
      gavetasNaEpoca: jazigo?.quantidadeGavetas ?? null,
      valorNaEpoca: jazigo?.valorMensalidade ?? null,
      webhookData: webhookData as unknown as Prisma.InputJsonValue,
      webhookRecebidoEm: new Date(),
    },
  });
}

/**
 * Cria cobrança Asaas (PIX, boleto ou cartão) e registo em `Pagamento`.
 *
 * `customer` é sempre o TITULAR DO CONTRATO.
 * `payerCustomer` é o PAGADOR EFETIVO quando difere do titular (ex.: responsável financeiro do jazigo).
 * Quando `payerCustomer` é fornecido, `Pagamento.customerId` fica com o pagador e
 * `Pagamento.titularContratoId` fica com o titular.
 */
export async function createAsaasChargeForCustomer(input: {
  customer: Customer;
  payerCustomer?: Customer | null;
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
    payerCustomer,
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

  // Entidade de faturação: pagador efetivo quando disponível, senão o titular.
  // Quando há payerCustomer, usamos os dados do Customer do DB — sem overrides de CPF/email.
  // Quando apenas responsavelFinanceiro (slice sem entidade) está disponível, aplicamos overrides no titular.
  const billingEntity = payerCustomer ?? customer;
  const hasSeparatePayer = !!payerCustomer;

  const cpfOverride = cpfCnpj ?? (!hasSeparatePayer ? responsavelFinanceiro?.cpf : undefined);
  const emailOverride = email ?? (!hasSeparatePayer ? (responsavelFinanceiro?.email ?? undefined) : undefined);
  const nameOverride = !hasSeparatePayer ? (responsavelFinanceiro?.nome ?? undefined) : undefined;

  const asaasCustomerId = await ensureAsaasCustomer(billingEntity, {
    cpfCnpjOverride: cpfOverride,
    emailOverride,
    nameOverride,
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

  const [jazigo, fullDetails, pixQr] = await Promise.all([
    jazigoId
      ? db.jazigo.findUnique({
          where: { id: jazigoId },
          select: { id: true, quantidadeGavetas: true, valorMensalidade: true },
        })
      : Promise.resolve(null),
    fetchPaymentDetails(payment.id),
    billingType === "PIX" ? fetchPixQrCode(payment.id) : Promise.resolve(null),
  ]);

  const merged = { ...payment, ...(fullDetails ?? {}) };
  const webhookData = {
    ...merged,
    ...(pixQr ? { encodedImage: pixQr.encodedImage, pixCopiaECola: pixQr.payload, expirationDate: pixQr.expirationDate } : {}),
  };
  const checkoutUrl = merged.invoiceUrl ?? merged.bankSlipUrl ?? null;

  return db.pagamento.create({
    data: {
      // customerId = PAGADOR EFETIVO (pode ser diferente do titular do contrato)
      customerId: billingEntity.id,
      // titularContratoId = TITULAR DO CONTRATO para rastreabilidade (sempre definido em cobranças novas)
      titularContratoId: customer.id,
      valorTitulo: decimalFromCents(valueCents),
      dataVencimento: utcNoonDate(dueDate),
      tipo: tipoPagamento,
      status: mapAsaasToStatusPagamento(payment.status),
      asaasId: payment.id,
      invoiceUrl: checkoutUrl,
      metodoPagamento: metodoFromBillingType(billingType),
      contratoId: contratoId ?? null,
      jazigoId: jazigo?.id ?? jazigoId ?? null,
      gavetasNaEpoca: jazigo?.quantidadeGavetas ?? null,
      valorNaEpoca: jazigo?.valorMensalidade ?? null,
      webhookData: webhookData as unknown as Prisma.InputJsonValue,
      webhookRecebidoEm: new Date(),
    },
  });
}

/**
 * Associa uma cobrança Asaas a um registro `Pagamento` já existente no banco
 * que ainda não possui `asaasId`.  Útil para pagamentos importados do legado.
 */
export async function attachAsaasChargeToPayment(input: {
  pagamentoId: string;
  valorTitulo: Prisma.Decimal;
  dataVencimento: Date;
  customer: Customer;
  billingType: AsaasBillingType;
  description?: string;
  cpfCnpj?: string;
  email?: string;
}) {
  const {
    pagamentoId,
    valorTitulo,
    dataVencimento,
    customer,
    billingType,
    description,
    cpfCnpj,
    email,
  } = input;

  const valueCents = Math.round(Number(valorTitulo.toString()) * 100);
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

  // Asaas rejects past due dates — forward legacy overdue payments to today+3.
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const effectiveDueDate = dataVencimento < today
    ? (() => { const d = new Date(); d.setDate(d.getDate() + 3); d.setUTCHours(12, 0, 0, 0); return d; })()
    : dataVencimento;

  const payload = {
    customer: asaasCustomerId,
    billingType,
    value: reaisFromCents(valueCents),
    dueDate: formatDueDate(effectiveDueDate),
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

  const [pixQr, fullDetails] = await Promise.all([
    billingType === "PIX" ? fetchPixQrCode(payment.id) : Promise.resolve(null),
    billingType !== "PIX" ? fetchPaymentDetails(payment.id) : Promise.resolve(null),
  ]);

  const merged = { ...payment, ...(fullDetails ?? {}) };
  const webhookData = {
    ...merged,
    ...(pixQr ? { encodedImage: pixQr.encodedImage, pixCopiaECola: pixQr.payload, expirationDate: pixQr.expirationDate } : {}),
  };
  const checkoutUrl = merged.invoiceUrl ?? merged.bankSlipUrl ?? null;

  return db.pagamento.update({
    where: { id: pagamentoId },
    data: {
      asaasId: payment.id,
      invoiceUrl: checkoutUrl,
      metodoPagamento: metodoFromBillingType(billingType),
      status: mapAsaasToStatusPagamento(payment.status),
      webhookData: webhookData as unknown as Prisma.InputJsonValue,
      webhookRecebidoEm: new Date(),
    },
  });
}
