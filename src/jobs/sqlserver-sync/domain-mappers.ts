import type { StatusPagamento } from "../../../generated/prisma/client";

import { legacyIntDateToIso } from "./legacy-dates";
import { pickRow, str } from "./row-utils";

/**
 * Converte situação legada (SQL Server / texto) para `StatusPagamento`.
 */
export function mapLegacyBoletoToStatusPagamento(raw: unknown): StatusPagamento {
  const s = str(raw, 120).toUpperCase();
  if (s === "LIQUIDADO" || s === "PAGO" || s === "QUITADO") return "PAGO";
  if (s === "VENCIDO") return "ATRASADO";
  if (s === "CANCELADO" || s === "CANCELADA" || s === "DELETED") {
    return "CANCELADO";
  }
  if (s === "ABERTO" || s === "") return "PENDENTE";
  return "PENDENTE";
}

/**
 * Data `@db.Date`: usa `Col_as_isodate` do enrich, ISO string, inteiro YYYYMMDD ou `Date`.
 */
export function parseSqlServerDate(
  row: Record<string, unknown>,
  columnBase: string,
): Date | null {
  const isoKey = `${columnBase}_as_isodate`;
  const isoAlt = Object.keys(row).find(
    (k) => k.toLowerCase() === isoKey.toLowerCase(),
  );
  if (isoAlt !== undefined) {
    const cell = row[isoAlt];
    if (typeof cell === "string") {
      const s = cell;
      if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
        return new Date(`${s}T12:00:00.000Z`);
      }
    }
  }

  const raw = pickRow(row, [columnBase, columnBase.toLowerCase()]);
  if (raw instanceof Date && !Number.isNaN(raw.getTime())) {
    // +12 h neutralises any UTC offset up to ±12 h so getUTCDate() returns the
    // correct calendar day even when the SQL Server host runs in a non-UTC timezone.
    const shifted = new Date(raw.getTime() + 12 * 3_600_000);
    return new Date(
      Date.UTC(
        shifted.getUTCFullYear(),
        shifted.getUTCMonth(),
        shifted.getUTCDate(),
        12,
        0,
        0,
      ),
    );
  }
  const iso = legacyIntDateToIso(raw);
  if (iso) return new Date(`${iso}T12:00:00.000Z`);
  return null;
}
