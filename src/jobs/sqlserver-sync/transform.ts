import { type Prisma } from "../../../generated/prisma/client";

/**
 * Extrai a chave natural da linha SQL Server para `MssqlSyncRecord.sourceKey`.
 */
export function rowToSourceKey(
  keyColumn: string,
  row: Record<string, unknown>,
): string {
  const v = row[keyColumn];
  if (v === undefined || v === null) {
    throw new Error(
      `Coluna de chave em falta ou nula: "${keyColumn}" em ${JSON.stringify(row)}`,
    );
  }
  if (typeof v === "string" || typeof v === "number" || typeof v === "bigint") {
    return String(v);
  }
  if (v instanceof Date) {
    return v.toISOString();
  }
  return JSON.stringify(v);
}

export type KeySpec =
  | { keyColumn: string; keyColumns?: never }
  | { keyColumns: string[]; keyColumn?: never };

/**
 * Chave única ou composta (`a|b`) para `MssqlSyncRecord.sourceKey`.
 */
export function rowToSourceKeyFromSpec(
  spec: KeySpec,
  row: Record<string, unknown>,
): string {
  const cols =
    spec.keyColumns && spec.keyColumns.length > 0
      ? spec.keyColumns
      : spec.keyColumn
        ? [spec.keyColumn]
        : [];
  if (cols.length === 0) {
    throw new Error("Defina keyColumn ou keyColumns no mapeamento.");
  }
  return cols.map((c) => rowToSourceKey(c, row)).join("|");
}

/**
 * Converte a linha num objeto JSON seguro para Prisma `Json` (sem funções).
 */
export function rowToJsonPayload(
  row: Record<string, unknown>,
  transform?: (
    r: Record<string, unknown>,
  ) => Record<string, unknown>,
): Prisma.InputJsonValue {
  const obj = transform ? transform({ ...row }) : { ...row };
  return JSON.parse(JSON.stringify(obj)) as Prisma.InputJsonValue;
}
