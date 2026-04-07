import { CredentialsSignin } from "@auth/core/errors";

/**
 * Sinaliza indisponibilidade da base no fluxo Credentials (código em URL / resposta signIn).
 */
export class DatabaseUnavailableSignin extends CredentialsSignin {
  override code = "database_unavailable";
}
