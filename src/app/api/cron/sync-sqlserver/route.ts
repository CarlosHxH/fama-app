import { NextResponse } from "next/server";

/**
 * Cron MSSQL → Postgres desativado (modelos `SyncRun` / `MssqlSyncRecord` removidos).
 * Proteger com `CRON_SECRET` (Authorization: Bearer &lt;secret&gt;).
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  const auth = req.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.json(
    {
      ok: false,
      message:
        "Sincronização desativada: o schema atual não inclui filas ETL. Use migrações de dados dedicadas quando disponível.",
    },
    { status: 503 },
  );
}
