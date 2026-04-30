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

function cpfChecksum(digits: string): boolean {
  // Rejeita sequências repetidas (000...0, 111...1, etc.)
  if (/^(\d)\1{10}$/.test(digits)) return false;

  const calc = (len: number, offset: number): number => {
    let sum = 0;
    for (let i = 0; i < len; i++) {
      sum += Number(digits[i]) * (len + 1 + offset - i);
    }
    const rem = (sum * 10) % 11;
    return rem === 10 ? 0 : rem;
  };

  return (
    calc(9, 0) === Number(digits[9]) &&
    calc(10, 0) === Number(digits[10])
  );
}

function cnpjChecksum(digits: string): boolean {
  if (/^(\d)\1{13}$/.test(digits)) return false;

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const calc = (w: number[]): number => {
    const sum = w.reduce((acc, wt, i) => acc + Number(digits[i]) * wt, 0);
    const rem = sum % 11;
    return rem < 2 ? 0 : 11 - rem;
  };

  return (
    calc(weights1) === Number(digits[12]) &&
    calc(weights2) === Number(digits[13])
  );
}

/**
 * Valida CPF (11 dígitos) ou CNPJ (14 dígitos) incluindo dígitos verificadores.
 * Retorna false para sequências repetidas ou checksums incorretos.
 */
export function isValidCpfCnpjChecksum(digits: string): boolean {
  if (digits.length === 11) return cpfChecksum(digits);
  if (digits.length === 14) return cnpjChecksum(digits);
  return false;
}
