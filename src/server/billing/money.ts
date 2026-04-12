import { Prisma } from "../../../generated/prisma/client";

export function decimalFromCents(cents: number): Prisma.Decimal {
  return new Prisma.Decimal(cents).dividedBy(100);
}

export function centsFromDecimal(d: Prisma.Decimal): number {
  return Math.round(Number(d.toString()) * 100);
}
