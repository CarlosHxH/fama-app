/**
 * Resolução de contrato legado: prioriza `CodCessionarioPlano`, depois `CodContrato`.
 * Extraído para testes unitários sem dependência do Prisma.
 *
 * @see `resolveContratoFromPlanOrChain` em `domain-upsert.ts`
 */
export type ContratoHead = { id: string; customerId: string };

export async function resolveContratoFromPlanOrChainImpl(
  row: { planSqlId: number | null; contratoSqlId: number | null },
  findBySqlServerId: (id: number) => Promise<ContratoHead | null>,
): Promise<ContratoHead | null> {
  if (row.planSqlId !== null) {
    const c = await findBySqlServerId(row.planSqlId);
    if (c) return c;
  }
  if (row.contratoSqlId !== null) {
    return findBySqlServerId(row.contratoSqlId);
  }
  return null;
}
