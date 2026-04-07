/**
 * Remove caracteres não numéricos do CPF/CNPJ.
 */
export function normalizeCpfCnpjDigits(input: string): string {
  return input.replace(/\D/g, "");
}

/**
 * CPF = 11 dígitos; CNPJ = 14 dígitos.
 */
export function isValidCpfCnpjLength(digits: string): boolean {
  return digits.length === 11 || digits.length === 14;
}
