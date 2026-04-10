import { compare } from "bcrypt-ts";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import {
  normalizeAdminLoginEmail,
  shouldRejectAdminLoginBeforeVerify,
} from "~/server/auth/admin-password-auth";
import { db } from "~/server/db";
import { DatabaseUnavailableSignin } from "~/server/auth/database-unavailable-signin";
import { isPrismaConnectionError } from "~/server/auth/is-prisma-connection-error";
import {
  isValidCpfCnpjLength,
  normalizeCpfCnpjDigits,
} from "~/server/auth/normalize-cpf-cnpj";
import type { AdminStaffRole } from "../../../generated/prisma/client";

/** Papel do utilizador na aplicação (espelha Prisma `UserRole`). */
export type AppUserRole = "USER" | "ADMIN";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: AppUserRole;
      cpfCnpj?: string | null;
      /** Só para `role === ADMIN`. */
      adminStaffRole?: AdminStaffRole | null;
    } & DefaultSession["user"];
  }

  interface User {
    role?: AppUserRole;
    cpfCnpj?: string | null;
    adminStaffRole?: AdminStaffRole | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: AppUserRole;
    cpfCnpj?: string | null;
    email?: string | null;
    adminStaffRole?: AdminStaffRole | null;
  }
}

/**
 * Dois providers Credentials:
 * - `credentials` — CPF/CNPJ (titular), sem palavra-passe.
 * - `admin-password` — e-mail + palavra-passe para `role === ADMIN` com `passwordHash` definido.
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
      id: "credentials",
      name: "Credentials",
      credentials: {
        cpfCnpj: { label: "CPF ou CNPJ", type: "text" },
      },
      authorize: async (credentials) => {
        const cpfCnpjRaw = typeof credentials?.cpfCnpj === "string" ? credentials.cpfCnpj : "";
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
          adminStaffRole: null,
        };
      },
    }),
    CredentialsProvider({
      id: "admin-password",
      name: "AdminPassword",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Palavra-passe", type: "password" },
      },
      authorize: async (credentials) => {
        const emailRaw =
          typeof credentials?.email === "string" ? credentials.email : "";
        const passwordRaw =
          typeof credentials?.password === "string"
            ? credentials.password
            : "";
        const email = normalizeAdminLoginEmail(emailRaw);
        if (!email || passwordRaw.length === 0) {
          return null;
        }

        let user;
        try {
          user = await db.user.findUnique({
            where: { email },
          });
        } catch (err) {
          if (isPrismaConnectionError(err)) {
            console.error(
              "[auth] Base de dados indisponível (admin-password) em DATABASE_URL:",
              err,
            );
            throw new DatabaseUnavailableSignin();
          }
          throw err;
        }

        if (!user) return null;
        if (shouldRejectAdminLoginBeforeVerify(user)) {
          return null;
        }

        const hash = user.passwordHash;
        if (!hash) return null;

        const ok = await compare(passwordRaw, hash);
        if (!ok) return null;

        return {
          id: user.id,
          email: user.email ?? undefined,
          name: user.name ?? undefined,
          image: user.image ?? undefined,
          role: "ADMIN" as const,
          cpfCnpj: user.cpfCnpj ?? undefined,
          adminStaffRole: user.adminStaffRole ?? "SUPER_ADMIN",
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
        token.email = user.email ?? null;
        if (r === "ADMIN") {
          token.adminStaffRole =
            "adminStaffRole" in user && user.adminStaffRole
              ? user.adminStaffRole
              : "SUPER_ADMIN";
        } else {
          token.adminStaffRole = null;
        }
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.cpfCnpj = token.cpfCnpj ?? null;
        session.user.adminStaffRole = token.adminStaffRole ?? null;
        if (typeof token.email === "string" && token.email.length > 0) {
          session.user.email = token.email;
        }
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
