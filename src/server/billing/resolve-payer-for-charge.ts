/**
 * Resolução do **pagador** para cobrança Asaas (admin), centralizada em `customers`.
 *
 * **Precedência:** `Jazigo.responsavelFinanceiroCustomer` → `Contrato.responsavelFinanceiro` (sync legado)
 * → titular (`Customer` do contexto).
 *
 * **Performance:** usar um único `findFirst` / `include` com `responsavelFinanceiroCustomer` e
 * `contrato.responsavelFinanceiro` — evita N+1 e reutiliza índices em `customers.cpf_cnpj` / FK em `jazigos`.
 *
 * **Escalabilidade:** qualquer evolução (ex.: outro nível de precedência) entra aqui e nos testes.
 */

export type CustomerPayerSlice = {
  id: string;
  nome: string;
  cpfCnpj: string;
  email: string | null;
} | null;

export type LegacyResponsavelSlice = {
  nome: string;
  cpf: string;
  email: string | null;
} | null;

export type TitularSlice = {
  nome: string;
  cpfCnpj: string | null;
  email: string | null;
};

/** Formato esperado por `createAsaasChargeForCustomer` / `ensureAsaasCustomer` (nome + CPF legado 14 chars). */
export type ResponsavelFinanceiroPayload = {
  nome: string;
  cpf: string;
  email: string | null;
};

export type ResponsavelCobrancaFonte = "customer_jazigo" | "contrato_legado" | "titular";

function cpfAsaasFromCustomer(cpfCnpj: string): string {
  const d = cpfCnpj.replace(/\D/g, "");
  return d.padStart(14, "0").slice(0, 14);
}

/**
 * Monta o payload para o Asaas a partir da precedência jazigo (customer) → contrato legado → null (titular).
 */
export function resolveResponsavelFinanceiroPayloadForAsaas(
  jazigoPayerCustomer: CustomerPayerSlice,
  contratoLegacy: LegacyResponsavelSlice,
): ResponsavelFinanceiroPayload | null {
  if (jazigoPayerCustomer) {
    return {
      nome: jazigoPayerCustomer.nome,
      cpf: cpfAsaasFromCustomer(jazigoPayerCustomer.cpfCnpj),
      email: jazigoPayerCustomer.email,
    };
  }
  if (contratoLegacy) {
    return {
      nome: contratoLegacy.nome,
      cpf: contratoLegacy.cpf,
      email: contratoLegacy.email,
    };
  }
  return null;
}

/**
 * Responsável efetivo para UI (inclui titular quando não há override).
 */
export function responsavelCobrancaComFonte(
  jazigoPayerCustomer: CustomerPayerSlice,
  contratoLegacy: LegacyResponsavelSlice,
  titular: TitularSlice,
): {
  fonte: ResponsavelCobrancaFonte;
  nome: string;
  cpf: string | null;
  email: string | null;
} {
  const p = resolveResponsavelFinanceiroPayloadForAsaas(
    jazigoPayerCustomer,
    contratoLegacy,
  );
  if (p) {
    return {
      fonte: jazigoPayerCustomer ? "customer_jazigo" : "contrato_legado",
      nome: p.nome,
      cpf: p.cpf,
      email: p.email,
    };
  }
  return {
    fonte: "titular",
    nome: titular.nome,
    cpf: titular.cpfCnpj,
    email: titular.email,
  };
}
