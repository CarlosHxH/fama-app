import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "~/server/db";
import { DatabaseUnavailableSignin } from "~/server/auth/database-unavailable-signin";
import { isPrismaConnectionError } from "~/server/auth/is-prisma-connection-error";
import {
  isValidCpfCnpjLength,
  normalizeCpfCnpjDigits,
} from "~/server/auth/normalize-cpf-cnpj";

/** Papel do utilizador na aplicação (espelha Prisma `UserRole`). */
export type AppUserRole = "USER" | "ADMIN";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: AppUserRole;
      cpfCnpj?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role?: AppUserRole;
    cpfCnpj?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: AppUserRole;
    cpfCnpj?: string | null;
  }
}

/**
 * Login apenas com CPF/CNPJ (sem palavra-passe).
 * Qualquer pessoa que conheça o documento pode aceder à conta associada — use apenas em cenários controlados.
 *
 * @see https://authjs.dev/guides/providers/credentials
 */
export const authConfig = {
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        cpfCnpj: { label: "CPF ou CNPJ", type: "text" },
      },
      authorize: async (credentials) => {
        const cpfCnpjRaw =
          typeof credentials?.cpfCnpj === "string" ? credentials.cpfCnpj : "";
        const cpfCnpj = normalizeCpfCnpjDigits(cpfCnpjRaw);
        if (!isValidCpfCnpjLength(cpfCnpj)) {
          return null;
        }

        let user;
        try {
          user = await db.user.findUnique({
            where: { cpfCnpj },
          });
        } catch (err) {
          if (isPrismaConnectionError(err)) {
            console.error(
              "[auth] Base de dados indisponível ou credenciais inválidas em DATABASE_URL:",
              err,
            );
            throw new DatabaseUnavailableSignin();
          }
          throw err;
        }

        if (!user) return null;

        const role: AppUserRole = user.role === "ADMIN" ? "ADMIN" : "USER";

        return {
          id: user.id,
          email: user.email ?? undefined,
          name: user.name ?? undefined,
          image: user.image ?? undefined,
          role,
          cpfCnpj: user.cpfCnpj ?? undefined,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id ?? "";
        const r = user.role;
        token.role = r === "ADMIN" || r === "USER" ? r : "USER";
        token.cpfCnpj = user.cpfCnpj ?? null;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.cpfCnpj = token.cpfCnpj ?? null;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
