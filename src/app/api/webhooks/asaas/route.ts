import { NextResponse } from "next/server";
import { z } from "zod";

import { env } from "~/env";
import { db } from "~/server/db";
import {
  mapAsaasPaymentStatusToPortal,
  resolvePortalStatusTransition,
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
 * Webhook Asaas: atualiza `PortalPayment` de forma idempotente.
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
    const row = await db.portalPayment.findUnique({
      where: { asaasPaymentId: payment.id },
    });

    if (!row) {
      return NextResponse.json({ ok: true });
    }

    const mapped = mapAsaasPaymentStatusToPortal(payment.status);
    const current = row.status.toUpperCase() as typeof mapped;
    const transition = resolvePortalStatusTransition(current, mapped);
    const nextStatus = transition ?? row.status;

    await db.portalPayment.update({
      where: { id: row.id },
      data: {
        status: nextStatus,
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
