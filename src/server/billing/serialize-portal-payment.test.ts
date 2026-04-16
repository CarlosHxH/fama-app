import {
  readPaymentMeta,
  serializePortalPayment,
} from "./serialize-portal-payment";

function makePagamento(
  overrides: Record<string, unknown> = {},
) {
  return {
    id: "payment-1",
    sqlServerId: null,
    asaasId: "asaas_1",
    nossoNumero: null,
    invoiceUrl: "https://checkout.example/pay",
    valorTitulo: "25.50",
    valorPago: null,
    valorLiquido: null,
    gavetasNaEpoca: null,
    valorNaEpoca: null,
    dataVencimento: new Date("2026-04-15T12:00:00.000Z"),
    dataPagamento: null,
    status: "PENDENTE",
    tipo: "TAXA_SERVICO",
    metodoPagamento: "PIX",
    webhookData: null,
    webhookRecebidoEm: null,
    jazigoId: null,
    contratoId: null,
    customerId: "customer-1",
    createdAt: new Date("2026-04-15T12:00:00.000Z"),
    updatedAt: new Date("2026-04-15T12:00:00.000Z"),
    ...(overrides as object),
  } as const;
}

describe("readPaymentMeta", () => {
  it("extrai campos de PIX e boleto quando presentes no webhook", () => {
    const data = {
      pixCopiaECola: "000201010212...",
      encodedImage: "base64-image",
      identificationField: "34191.79001 01043.510047 91020.150008 2 92270026000",
    };
    expect(readPaymentMeta(data)).toEqual({
      pixCopyPaste: "000201010212...",
      pixQrCodeBase64: "base64-image",
      boletoDigitableLine:
        "34191.79001 01043.510047 91020.150008 2 92270026000",
    });
  });

  it("retorna nulos para payload inválido", () => {
    expect(readPaymentMeta("abc")).toEqual({
      pixCopyPaste: null,
      pixQrCodeBase64: null,
      boletoDigitableLine: null,
    });
  });
});

describe("serializePortalPayment", () => {
  it("serializa valor em centavos e mantém metadados úteis", () => {
    const row = makePagamento({
      webhookData: {
        pixCopiaECola: "pix-code",
        encodedImage: "qr-image",
        identificationField: "boleto-line",
      },
    });

    expect(serializePortalPayment(row)).toMatchObject({
      status: "PENDING",
      valueCents: 2550,
      asaasBillingType: "PIX",
      checkoutUrl: "https://checkout.example/pay",
      pixCopyPaste: "pix-code",
      pixQrCodeBase64: "qr-image",
      boletoDigitableLine: "boleto-line",
    });
  });
});
