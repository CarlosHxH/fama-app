/**
 * O legado DB_Fama guarda várias datas como **inteiro** no formato **YYYYMMDD**
 * (ex.: `20250408`). `DiaBase` / `MesReferencia` não são datas completas — não convertemos aqui.
 *
 * Na sincronização, acrescentamos campos auxiliares `*_as_isodate` (string `YYYY-MM-DD`) para
 * consumo na app sem perder o valor original.
 */

/** Colunas em `dbo.Boletos` tipicamente YYYYMMDD. */
export const LEGACY_DATE_COLUMNS_BOLETOS = [
  "DataVencimento",
  "DataLiquid",
  "DataCredito",
] as const;

/** Colunas em `dbo.Cessionarios_Planos` tipicamente YYYYMMDD. */
export const LEGACY_DATE_COLUMNS_CESSIONARIOS_PLANOS = [
  "DataInclusao",
  "DataEncerramento",
] as const;

/**
 * Converte inteiro YYYYMMDD para data ISO (`YYYY-MM-DD`), ou `null` se inválido.
 */
export function legacyIntDateToIso(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n) || n <= 0) return null;
  const s = String(Math.trunc(Math.abs(n)));
  if (s.length !== 8) return null;
  const y = s.slice(0, 4);
  const m = s.slice(4, 6);
  const d = s.slice(6, 8);
  const mm = Number(m);
  const dd = Number(d);
  if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return null;
  const date = new Date(Date.UTC(Number(y), mm - 1, dd, 12, 0, 0));
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

/**
 * Para cada coluna listada, se for um YYYYMMDD válido, adiciona `{Col}_as_isodate`.
 * Mantém os valores originais intactos.
 */
export function enrichLegacyIntDates(
  row: Record<string, unknown>,
  columnNames: readonly string[],
): Record<string, unknown> {
  const out: Record<string, unknown> = { ...row };
  for (const col of columnNames) {
    const iso = legacyIntDateToIso(out[col]);
    if (iso !== null) {
      out[`${col}_as_isodate`] = iso;
    }
  }
  return out;
}
