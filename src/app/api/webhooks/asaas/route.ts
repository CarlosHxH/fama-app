import { NextResponse } from "next/server";
import { z } from "zod";

import { Prisma } from "../../../../../generated/prisma/client";
import { env } from "~/env";
import { db } from "~/server/db";
import {
  mapAsaasToStatusPagamento,
  resolvePagamentoStatusTransition,
} from "~/server/billing/asaas-payment-status";

const webhookBodySchema = z.object({
  event: z.string(),
  payment: z
    .object({
      id: z.string(),
      status: z.string(),
      value: z.number().optional(),
      netValue: z.number().optional(),
      clientPaymentDate: z.string().optional(),
      paymentDate: z.string().optional(),
    })
    .optional(),
});

/**
 * Webhook Asaas: atualiza `Pagamento` de forma idempotente.
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
    const row = await db.pagamento.findUnique({
      where: { asaasId: payment.id },
    });

    if (!row) {
      return NextResponse.json({ ok: true });
    }

    const mapped = mapAsaasToStatusPagamento(payment.status);
    const transition = resolvePagamentoStatusTransition(row.status, mapped);
    const nextStatus = transition ?? row.status;

    const isPago = nextStatus === "PAGO";
    const rawDateStr = payment.paymentDate ?? payment.clientPaymentDate;
    const dataPagamento = isPago && rawDateStr ? new Date(rawDateStr) : undefined;
    const valorPago =
      isPago && payment.value != null
        ? new Prisma.Decimal(payment.value)
        : undefined;

    await db.pagamento.update({
      where: { id: row.id },
      data: {
        status: nextStatus,
        webhookRecebidoEm: new Date(),
        webhookData: json as Prisma.InputJsonValue,
        ...(dataPagamento !== undefined ? { dataPagamento } : {}),
        ...(valorPago !== undefined ? { valorPago } : {}),
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
