/**
 * E-mail usado no cliente Asaas: formulário tem prioridade sobre o perfil.
 */
export function resolveBillingContactEmail(
  profileEmail: string | null | undefined,
  formEmail: string | undefined,
): string | undefined {
  const fromForm = formEmail?.trim();
  const fromProfile = profileEmail?.trim();
  const out =
    fromForm && fromForm.length > 0 ? fromForm : fromProfile;
  return out && out.length > 0 ? out : undefined;
}
