"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  CheckCircle2,
  CreditCard,
  Loader2,
  MessageCircle,
  Phone,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import { digitsOnly, formatCpfCnpjDisplay } from "~/lib/format-cpf-cnpj";
import { safeCallbackUrl } from "~/lib/safe-callback-url";

const DEFAULT_SUPPORT_PHONE_DISPLAY = "62 3211-1444";
const DEFAULT_SUPPORT_WHATSAPP_LINK = "https://wa.me/5562992511416";
const DEFAULT_SUPPORT_WHATSAPP_LABEL = "62 9 9251-1416";

const SUPPORT_PHONE_DISPLAY =
  process.env.NEXT_PUBLIC_SUPPORT_PHONE ?? DEFAULT_SUPPORT_PHONE_DISPLAY;
const SUPPORT_WHATSAPP_URL =
  process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP_URL ?? DEFAULT_SUPPORT_WHATSAPP_LINK;
const SUPPORT_WHATSAPP_LABEL =
  process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP_LABEL ?? DEFAULT_SUPPORT_WHATSAPP_LABEL;

const REDIRECT_DELAY_MS = 400;

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = safeCallbackUrl(
    searchParams.get("callbackUrl"),
    "/cobranca",
  );

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
      setError("Informe um CPF (11 dígitos) ou CNPJ (14 dígitos) válido.");
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
            "Não foi possível conectar ao banco de dados. Verifique se o PostgreSQL está em execução e se DATABASE_URL no .env está correto.",
          );
        } else {
          setError("Documento não encontrado em nossa base.");
        }
        return;
      }
      if (res && !res.error) {
        setSuccess(true);
        setLoading(false);
        await new Promise((r) => setTimeout(r, REDIRECT_DELAY_MS));
        window.location.assign(callbackUrl);
        return;
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="step-badge">Etapa 1 — Identificação do Titular</div>

      <div className={`error-box ${error ? "show" : ""}`} role="alert" aria-live="polite">
        <XCircle size={16} aria-hidden style={{ flexShrink: 0 }} />
        <span id="error-msg">{error}</span>
      </div>

      <div className={`success-box ${success ? "show" : ""}`} role="status">
        <CheckCircle2 size={16} aria-hidden style={{ flexShrink: 0 }} />
        <div>
          <div>Titular identificado com sucesso!</div>
          <div className="s-name" id="success-name" />
          <div style={{ fontSize: "0.78rem", color: "var(--text-light)" }}>
            Redirecionando para o portal...
          </div>
        </div>
      </div>

      <div className="field">
        <label htmlFor="doc-input">CPF ou CNPJ do Titular</label>
        <div className="input-wrap">
          <span className="input-icon" aria-hidden>
            <CreditCard size={18} />
          </span>
          <input
            type="text"
            id="doc-input"
            name="doc"
            placeholder="000.000.000-00 ou 00.000.000/0000-00"
            maxLength={18}
            autoComplete="off"
            inputMode="numeric"
            disabled={loading || success}
            className={error ? "error" : undefined}
            value={cpfCnpjDisplay}
            onChange={(e) => {
              setCpfCnpjDisplay(formatCpfCnpjDisplay(e.target.value));
              setError(null);
            }}
          />
        </div>
        <div className="field-hint">
          Digite apenas os números — a máscara é aplicada automaticamente.
        </div>
      </div>

      <button type="submit" className="btn-entrar" id="btn-entrar" disabled={loading || success}>
        {loading ? (
          <Loader2 size={18} className="animate-spin" aria-hidden style={{ flexShrink: 0 }} />
        ) : null}
        <span id="btn-text">{loading ? "Verificando..." : "ACESSAR PORTAL"}</span>
      </button>

      <div className="security-note">
        <ShieldCheck size={14} aria-hidden style={{ flexShrink: 0 }} />
        <span>Conexão segura — seus dados estão protegidos</span>
      </div>

      <div className="divider">Dúvidas?</div>

      <div className="help-box" style={{ textAlign: "center", background: "#fdfaf5" }}>
        <strong
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.4rem",
            marginBottom: "0.6rem",
            color: "var(--green-dark)",
          }}
        >
          <Phone size={15} aria-hidden /> Precisa de ajuda com o acesso?
        </strong>
        <p style={{ fontSize: "0.8rem", color: "var(--text-mid)", marginBottom: "0.8rem" }}>
          Fale com nossa equipe administrativa:
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontWeight: 700,
              color: "var(--green-dark)",
              fontSize: "1rem",
            }}
          >
            <Phone size={15} aria-hidden />
            {SUPPORT_PHONE_DISPLAY}{" "}
            <span style={{ fontWeight: 400, fontSize: "0.7rem", color: "var(--text-light)" }}>
              (Fixo)
            </span>
          </div>
          <a
            href={SUPPORT_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="help-wa"
          >
            <MessageCircle size={15} aria-hidden /> WhatsApp: {SUPPORT_WHATSAPP_LABEL}
          </a>
        </div>
      </div>
    </form>
  );
}
