"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { digitsOnly, formatCpfCnpjDisplay } from "~/lib/format-cpf-cnpj";

/** Contactos de apoio (substituir via NEXT_PUBLIC_* em produção). */
const SUPPORT_PHONE = process.env.NEXT_PUBLIC_SUPPORT_PHONE ?? "(00) 0000-0000";
const SUPPORT_WHATSAPP =
  process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP ?? "00000000000";

const REDIRECT_DELAY_MS = 400;

function IdDocumentIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 10h8M8 14h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="15" cy="7.5" r="1.25" fill="currentColor" />
    </svg>
  );
}

/**
 * Formulário de entrada apenas com CPF/CNPJ (sem palavra-passe).
 * Máscara visual no cliente; envio normalizado (só dígitos) para o NextAuth.
 */
export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/cobranca";

  const [cpfCnpjDisplay, setCpfCnpjDisplay] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const normalized = digitsOnly(cpfCnpjDisplay);
    if (normalized.length !== 11 && normalized.length !== 14) {
      setError("Introduza um CPF (11 dígitos) ou CNPJ (14 dígitos) válido.");
      return;
    }

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        cpfCnpj: normalized,
        callbackUrl,
        redirect: false,
      });
      if (res?.error) {
        if (res.code === "database_unavailable") {
          setError(
            "Não foi possível ligar à base de dados. Confirme se o PostgreSQL está em execução e se DATABASE_URL no ficheiro .env tem utilizador, palavra-passe e porta corretos (ex.: postgres:password@localhost:5432).",
          );
        } else {
          setError("CPF/CNPJ inválido ou não registado.");
        }
        return;
      }
      if (res?.url) {
        setSuccess(true);
        setLoading(false);
        await new Promise((r) => setTimeout(r, REDIRECT_DELAY_MS));
        window.location.href = res.url;
        return;
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <p
        className="inline-flex w-fit items-center rounded-full border border-[#b8972a]/40 bg-[#fdf8ee] px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-[#6b5a2a] uppercase"
        style={{ fontFamily: "var(--font-login-inter), system-ui, sans-serif" }}
      >
        Etapa 1 — Identificação do titular
      </p>

      {success ? (
        <div
          className="rounded-lg border border-[#a5d6a7] bg-[#e8f5e9] px-4 py-3 text-sm text-[#1b4332]"
          role="status"
        >
          Titular identificado. A redirecionar para o portal…
        </div>
      ) : null}

      {error ? (
        <div
          className="rounded-lg border border-[#ef9a9a] bg-[#ffebee] px-4 py-3 text-sm text-[#b71c1c]"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        <label
          htmlFor="login-cpf-cnpj"
          className="text-[0.85rem] font-semibold text-[#1b4332]"
          style={{
            fontFamily: "var(--font-login-inter), system-ui, sans-serif",
          }}
        >
          CPF ou CNPJ do titular
        </label>
        <div className="flex overflow-hidden rounded-lg border border-[#d4cfc4] bg-[#faf9f6] shadow-inner transition focus-within:border-[#1b5e20] focus-within:ring-2 focus-within:ring-[#1b5e20]/25">
          <span className="flex shrink-0 items-center justify-center border-r border-[#e8e4dc] bg-[#f3f1ec] px-3 text-[#5c6b63]">
            <IdDocumentIcon className="h-5 w-5" />
          </span>
          <input
            id="login-cpf-cnpj"
            type="text"
            inputMode="numeric"
            autoComplete="username"
            required
            disabled={loading || success}
            value={cpfCnpjDisplay}
            onChange={(e) => {
              setCpfCnpjDisplay(formatCpfCnpjDisplay(e.target.value));
              setError(null);
            }}
            placeholder="000.000.000-00"
            className="min-w-0 flex-1 bg-transparent px-3 py-3 text-[0.95rem] text-[#1b4332] outline-none placeholder:text-[#9e9e9e] disabled:opacity-60"
            style={{
              fontFamily: "var(--font-login-inter), system-ui, sans-serif",
            }}
          />
        </div>
        <p className="text-[0.72rem] leading-snug text-[#6b756e]">
          Digite os números; a máscara aplica-se automaticamente.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading || success}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1b5e20] py-3.5 text-[0.8rem] font-bold tracking-widest text-white uppercase shadow-sm transition hover:bg-[#145214] disabled:cursor-not-allowed disabled:opacity-65"
        style={{ fontFamily: "var(--font-login-inter), system-ui, sans-serif" }}
      >
        {loading ? (
          <>
            <span
              className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
              aria-hidden
            />
            A processar…
          </>
        ) : (
          "Acessar portal"
        )}
      </button>

      <p className="text-center text-[0.68rem] text-[#7a847c]">
        <span className="inline-flex items-center gap-1" aria-hidden>
          🔒
        </span>{" "}
        Conexão segura
      </p>

      <div className="relative py-2 text-center text-[0.75rem] text-[#8a938c] before:absolute before:top-1/2 before:left-0 before:h-px before:w-[38%] before:bg-[#e0dcd4] after:absolute after:top-1/2 after:right-0 after:h-px after:w-[38%] after:bg-[#e0dcd4]">
        Dúvidas?
      </div>

      <div className="rounded-xl border border-[#e8e4dc] bg-[#faf7f0] px-4 py-4 text-[0.78rem] leading-relaxed text-[#4a554f]">
        <p className="font-semibold text-[#1b4332]">Apoio ao titular</p>
        <p className="mt-2">
          Telefone:{" "}
          <a
            href={`tel:${SUPPORT_PHONE.replace(/\D/g, "")}`}
            className="font-medium text-[#1b5e20] underline-offset-2 hover:underline"
          >
            {SUPPORT_PHONE}
          </a>
        </p>
        <p className="mt-1">
          WhatsApp:{" "}
          <a
            href={`https://wa.me/${digitsOnly(SUPPORT_WHATSAPP)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#1b5e20] underline-offset-2 hover:underline"
          >
            {SUPPORT_WHATSAPP}
          </a>
        </p>
      </div>
    </form>
  );
}
