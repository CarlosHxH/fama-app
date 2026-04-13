import { NextResponse } from "next/server";

import { loadJobEnv } from "~/jobs/sqlserver-sync/job-env";
import { runSync } from "~/jobs/sqlserver-sync/run-sync";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

/**
 * Cron MSSQL → Postgres. Proteger com `CRON_SECRET` (`Authorization: Bearer &lt;secret&gt;`).
 * O agendamento é externo (ex.: Vercel Cron); este ficheiro expõe apenas o handler GET.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  const auth = req.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const env = loadJobEnv();
    const result = await runSync(db, env);
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
