import "server-only";

import { db } from "~/server/db";
import { normalizeCpfCnpjDigits } from "~/server/auth/normalize-cpf-cnpj";

const CESSIONARIO_TABLE = "dbo.Cessionarios";

/** Chaves possíveis no JSON legado para o documento do titular. */
const DOC_KEYS = [
  "CpfCnpj",
  "CpfCgc",
  "CgcCpf",
  "NumCpfCnpj",
  "CPF",
  "CNPJ",
] as const;

function primitiveToDigits(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "string" || typeof value === "number") {
    const s = String(value).replace(/\D/g, "");
    return s.length >= 11 ? s : null;
  }
  if (typeof value === "bigint") {
    const s = value.toString().replace(/\D/g, "");
    return s.length >= 11 ? s : null;
  }
  return null;
}

function strKey(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "bigint"
  ) {
    return String(value);
  }
  return "";
}

function docMatchesRow(
  payload: Record<string, unknown>,
  digits: string,
): boolean {
  for (const key of DOC_KEYS) {
    const d = primitiveToDigits(payload[key]);
    if (d === digits) return true;
  }
  return false;
}

export type TitularLegacySnapshot = {
  cessionario: Record<string, unknown> | null;
  cessionariosPlanos: Record<string, unknown>[];
  boletos: Record<string, unknown>[];
};

/**
 * Lê registos espelhados em `MssqlSyncRecord` para o mesmo CPF/CNPJ do titular.
 */
export async function getTitularLegacySnapshot(
  cpfCnpjRaw: string | null | undefined,
): Promise<TitularLegacySnapshot> {
  const digits = normalizeCpfCnpjDigits(cpfCnpjRaw ?? "");
  if (digits.length < 11) {
    return { cessionario: null, cessionariosPlanos: [], boletos: [] };
  }

  const [cessionarios, planos, boletos] = await Promise.all([
    db.mssqlSyncRecord.findMany({
      where: { sourceTable: CESSIONARIO_TABLE },
      select: { payload: true },
    }),
    db.mssqlSyncRecord.findMany({
      where: { sourceTable: "dbo.Cessionarios_Planos" },
      select: { payload: true },
    }),
    db.mssqlSyncRecord.findMany({
      where: { sourceTable: "dbo.Boletos" },
      select: { payload: true },
    }),
  ]);

  let cessionario: Record<string, unknown> | null = null;
  for (const row of cessionarios) {
    const p = row.payload as Record<string, unknown>;
    if (docMatchesRow(p, digits)) {
      cessionario = p;
      break;
    }
  }

  const codTitular =
    cessionario !== null
      ? strKey(cessionario.CodCessionario ?? cessionario.codCessionario)
      : "";

  const cessionariosPlanos: Record<string, unknown>[] = [];
  for (const row of planos) {
    const p = row.payload as Record<string, unknown>;
    const codC = strKey(p.CodCessionario ?? p.codCessionario);
    if (
      codTitular.length > 0 &&
      codC.length > 0 &&
      codC === codTitular
    ) {
      cessionariosPlanos.push(p);
    }
  }

  const codPlanoSet = new Set(
    cessionariosPlanos.map((p) =>
      strKey(p.CodCessionarioPlano ?? p.codCessionarioPlano),
    ),
  );

  const boletosOut: Record<string, unknown>[] = [];
  for (const row of boletos) {
    const p = row.payload as Record<string, unknown>;
    const codPlano = strKey(p.CodCessionarioPlano ?? p.codCessionarioPlano);
    const codCes = strKey(p.CodCessionario ?? p.codCessionario);
    const matchPlano = codPlano.length > 0 && codPlanoSet.has(codPlano);
    const matchCes =
      codTitular.length > 0 && codCes.length > 0 && codCes === codTitular;
    if (matchPlano || matchCes) {
      boletosOut.push(p);
    }
  }

  return { cessionario, cessionariosPlanos, boletos: boletosOut };
}
