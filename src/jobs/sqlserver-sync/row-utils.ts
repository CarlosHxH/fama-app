function asTrimmedString(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value === "bigint") return value.toString();
  if (typeof value === "boolean") return value ? "true" : "false";
  if (value instanceof Date) return value.toISOString();
  return "";
}

/**
 * Obtém o primeiro valor definido entre chaves possíveis (case-insensitive aos nomes no `row`).
 */
export function pickRow(
  row: Record<string, unknown>,
  keys: string[],
): unknown {
  const lowerToActual = new Map(
    Object.keys(row).map((k) => [k.toLowerCase(), k] as const),
  );
  for (const key of keys) {
    const actual = lowerToActual.get(key.toLowerCase());
    if (actual !== undefined) {
      const v = row[actual];
      if (v !== undefined && v !== null && v !== "") return v;
    }
  }
  return undefined;
}

export function toBigInt(value: unknown): bigint | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "bigint") return value;
  if (typeof value === "number" && Number.isFinite(value)) {
    return BigInt(Math.trunc(value));
  }
  const s = asTrimmedString(value);
  if (!s) return null;
  const intPart = s.split(/[.,]/)[0] ?? s;
  try {
    return BigInt(intPart);
  } catch {
    return null;
  }
}

/** Identificadores `Cod*` do SQL Server como inteiro seguro (32 bits). */
export function toSqlServerInt(value: unknown): number | null {
  const b = toBigInt(value);
  if (b === null) return null;
  const n = Number(b);
  return Number.isSafeInteger(n) ? n : null;
}

/** Apenas dígitos; `null` se vazio. */
export function normalizeCpfCnpjDigits(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  const d = asTrimmedString(value).replace(/\D/g, "");
  if (d.length < 11) return null;
  return d.length > 14 ? d.slice(0, 14) : d;
}

export function str(value: unknown, maxLen?: number): string {
  const s = asTrimmedString(value);
  if (maxLen !== undefined && s.length > maxLen) return s.slice(0, maxLen);
  return s;
}
