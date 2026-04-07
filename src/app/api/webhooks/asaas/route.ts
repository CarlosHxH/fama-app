import { NextResponse } from "next/server";
import { z } from "zod";

import { env } from "~/env";
import { db } from "~/server/db";
import {
  mapAsaasPaymentStatusToBilling,
  resolveStatusTransition,
} from "~/server/billing/asaas-payment-status";

const webhookBodySchema = z.object({
  event: z.string(),
  payment: z
    .object({
      id: z.string(),
      status: z.string(),
      clientPaymentDate: z.string().optional(),
      paymentDate: z.string().optional(),
    })
    .optional(),
});

/**
 * Webhook Asaas: atualiza `BillingPayment` de forma idempotente.
 * Configure o mesmo token em `ASAAS_WEBHOOK_TOKEN` e no painel Asaas (header `asaas-access-token`).
 */
export async function POST(request: Request) {
  try {
    if (env.ASAAS_WEBHOOK_TOKEN) {
      const token = request.headers.get("asaas-access-token");
      if (token !== env.ASAAS_WEBHOOK_TOKEN) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
      }
    }

    let json: unknown;
    try {
      json = await request.json();
    } catch {
      return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
    }

    const parsed = webhookBodySchema.safeParse(json);
    if (!parsed.success || !parsed.data.payment) {
      return NextResponse.json({ ok: true });
    }

    const { payment } = parsed.data;
    const row = await db.billingPayment.findUnique({
      where: { asaasPaymentId: payment.id },
    });

    if (!row) {
      return NextResponse.json({ ok: true });
    }

    const mapped = mapAsaasPaymentStatusToBilling(payment.status);
    const transition = resolveStatusTransition(row.status, mapped);
    const nextStatus = transition ?? row.status;

    const paidAtStr = payment.clientPaymentDate ?? payment.paymentDate;
    const paidAtDate =
      mapped === "RECEIVED" && !row.paidAt
        ? paidAtStr
          ? new Date(paidAtStr)
          : new Date()
        : undefined;

    await db.billingPayment.update({
      where: { id: row.id },
      data: {
        status: nextStatus,
        ...(paidAtDate ? { paidAt: paidAtDate } : {}),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[webhook asaas]", error);
    return NextResponse.json(
      { error: "Falha ao processar webhook", code: "WEBHOOK_ERROR" },
      { status: 500 },
    );
  }
}
