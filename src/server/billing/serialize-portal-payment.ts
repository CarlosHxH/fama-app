import type { Prisma } from "../../../generated/prisma/client";
import type { BillingPaymentStatus } from "~/lib/billing-status";
import { centsFromDecimal } from "~/server/billing/money";

// cspell:ignore Titulo

type PagamentoLike = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  valorTitulo: Prisma.Decimal;
  status: string;
  metodoPagamento: string | null;
  invoiceUrl: string | null;
  webhookData: unknown;
  [key: string]: unknown;
};

type PaymentMeta = {
  pixCopyPaste: string | null;
  pixQrCodeBase64: string | null;
  boletoDigitableLine: string | null;
  description: string | null;
};

function mapMetodoToUi(
  m: PagamentoLike["metodoPagamento"],
): "PIX" | "BOLETO" | "CREDIT_CARD" | null {
  if (!m) return null;
  if (m === "PIX") return "PIX";
  if (m === "BOLETO") return "BOLETO";
  if (m === "CARTAO_DEBITO") return "CREDIT_CARD";
  return "CREDIT_CARD";
}

function mapStatusToBillingUi(
  status: PagamentoLike["status"],
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

export function readPaymentMeta(webhookData: PagamentoLike["webhookData"]): PaymentMeta {
  if (
    webhookData === null ||
    typeof webhookData !== "object" ||
    Array.isArray(webhookData)
  ) {
    return {
      pixCopyPaste: null,
      pixQrCodeBase64: null,
      boletoDigitableLine: null,
      description: null,
    };
  }
  const meta = webhookData as Record<string, unknown>;
  return {
    pixCopyPaste: typeof meta.pixCopiaECola === "string" ? meta.pixCopiaECola : null,
    pixQrCodeBase64: typeof meta.encodedImage === "string" ? meta.encodedImage : null,
    boletoDigitableLine:
      typeof meta.identificationField === "string" ? meta.identificationField : null,
    description: typeof meta.description === "string" ? meta.description : null,
  };
}

export function serializePortalPayment(row: PagamentoLike) {
  const { pixCopyPaste, pixQrCodeBase64, boletoDigitableLine, description } =
    readPaymentMeta(row.webhookData);

  return {
    ...row,
    status: mapStatusToBillingUi(row.status),
    valueCents: centsFromDecimal(row.valorTitulo),
    asaasBillingType: mapMetodoToUi(row.metodoPagamento),
    description,
    checkoutUrl: row.invoiceUrl ?? null,
    boletoDigitableLine,
    pixQrCodeBase64,
    pixCopyPaste,
  };
}
