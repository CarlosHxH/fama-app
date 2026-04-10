import { NextResponse } from "next/server";

import { runSync } from "~/jobs/sqlserver-sync/run-sync";
import { loadJobEnv } from "~/jobs/sqlserver-sync/job-env";
import { db } from "~/server/db";

/**
 * Sincronização MSSQL → Postgres (mesmo fluxo que `npm run job:sync-sqlserver`).
 * Proteger com `CRON_SECRET` (Authorization: Bearer &lt;secret&gt;).
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
    return NextResponse.json(result);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
