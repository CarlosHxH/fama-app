import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Junta classes Tailwind sem conflitos (útil com Radix + `className`). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
