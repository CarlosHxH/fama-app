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
import type { Role } from "../../../generated/prisma/client";

/** Portal (titular) vs painel staff. */
export type AccountKind = "portal" | "admin";

/** Papel na UI: portal = USER; painel staff = ADMIN. */
export type AppUserRole = "USER" | "ADMIN";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: AppUserRole;
      accountKind: AccountKind;
      cpfCnpj?: string | null;
      /** Papel na tabela `users` (só `accountKind === 'admin'`). */
      staffRole?: Role | null;
    } & DefaultSession["user"];
  }

  interface User {
    role?: AppUserRole;
    accountKind?: AccountKind;
    cpfCnpj?: string | null;
    staffRole?: Role | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: AppUserRole;
    accountKind: AccountKind;
    cpfCnpj?: string | null;
    email?: string | null;
    staffRole?: Role | null;
  }
}

/**
 * Dois providers Credentials:
 * - `credentials` — CPF/CNPJ (titular / Customer), sem palavra-passe.
 * - `admin-password` — e-mail + palavra-passe para staff em `users`.
 */
export const authConfig = {
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  logger: {
    error(error: Error) {
      // CredentialsSignin é esperado quando o utilizador erra credenciais.
      // No bundle minificado error.name fica "v"; verificar também error.type e error.message.
      const e = error as Error & { type?: string; code?: string };
      if (
        e.type === "CredentialsSignin" ||
        e.code === "credentials" ||
        e.name === "CredentialsSignin" ||
        e.message?.includes("credentialssignin")
      ) return;
      console.error("[auth][error]", error);
    },
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        cpfCnpj: { label: "CPF ou CNPJ", type: "text" },
      },
      authorize: async (credentials) => {
        const cpfCnpjRaw =
          typeof credentials?.cpfCnpj === "string" ? credentials.cpfCnpj : "";
        const cpfCnpj = normalizeCpfCnpjDigits(cpfCnpjRaw);
        if (!isValidCpfCnpjLength(cpfCnpj)) {
          console.warn("[auth][portal] CPF/CNPJ inválido (comprimento):", cpfCnpj.length, "dígitos");
          return null;
        }

        let customer;
        try {
          customer = await db.customer.findUnique({
            where: { cpfCnpj },
          });
        } catch (err) {
          if (isPrismaConnectionError(err)) {
            console.error(
              "[auth][portal] Base de dados indisponível (DATABASE_URL):",
              err,
            );
            throw new DatabaseUnavailableSignin();
          }
          throw err;
        }

        if (!customer) {
          console.warn("[auth][portal] CPF/CNPJ não encontrado:", cpfCnpj.slice(0, 3) + "***");
          return null;
        }

        if (!customer.ativo) {
          console.warn("[auth][portal] Conta inativa — id:", customer.id);
          return null;
        }

        if (customer.bloqueadoAte && customer.bloqueadoAte > new Date()) {
          console.warn("[auth][portal] Conta bloqueada até:", customer.bloqueadoAte, "— id:", customer.id);
          return null;
        }

        return {
          id: customer.id,
          email: customer.email ?? undefined,
          name: customer.nome ?? undefined,
          image: undefined,
          role: "USER" as const,
          accountKind: "portal" as const,
          cpfCnpj: customer.cpfCnpj ?? undefined,
          staffRole: null,
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

        if (!user) {
          console.warn("[auth][admin] E-mail não encontrado:", email);
          return null;
        }

        if (
          shouldRejectAdminLoginBeforeVerify({
            role: user.role,
            password: user.senha,
            active: user.ativo,
          })
        ) {
          console.warn("[auth][admin] Login rejeitado antes de verificar senha — inativo ou sem hash:", email);
          return null;
        }

        const ok = await compare(passwordRaw, user.senha);
        if (!ok) {
          console.warn("[auth][admin] Palavra-passe incorreta para:", email);
          return null;
        }

        return {
          id: user.id,
          email: user.email ?? undefined,
          name: user.nome ?? undefined,
          image: undefined,
          role: "ADMIN" as const,
          accountKind: "admin" as const,
          cpfCnpj: undefined,
          staffRole: user.role,
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
        token.accountKind =
          "accountKind" in user && user.accountKind === "admin"
            ? "admin"
            : "portal";
        token.cpfCnpj = user.cpfCnpj ?? null;
        token.email = user.email ?? null;
        if (token.accountKind === "admin") {
          token.staffRole =
            "staffRole" in user && user.staffRole != null
              ? user.staffRole
              : "ATENDENTE";
        } else {
          token.staffRole = null;
        }
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.accountKind = token.accountKind ?? "portal";
        session.user.cpfCnpj = token.cpfCnpj ?? null;
        session.user.staffRole = token.staffRole ?? null;
        if (typeof token.email === "string" && token.email.length > 0) {
          session.user.email = token.email;
        }
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
