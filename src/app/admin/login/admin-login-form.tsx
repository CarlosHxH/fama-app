"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { safeCallbackUrl } from "~/lib/safe-callback-url";

const REDIRECT_DELAY_MS = 400;

/**
 * Formulário de entrada administrativa (e-mail + palavra-passe).
 */
export function AdminLoginForm({ defaultCallbackUrl }: { defaultCallbackUrl: string }) {
  const searchParams = useSearchParams();
  const callbackUrl = safeCallbackUrl(
    searchParams.get("callbackUrl"),
    defaultCallbackUrl,
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const em = email.trim().toLowerCase();
    if (!em || !password) {
      setError("Informe e-mail e palavra-passe.");
      return;
    }

    setLoading(true);
    try {
      const res = await signIn("admin-password", {
        email: em,
        password,
        callbackUrl,
        redirect: false,
      });
      if (res?.error) {
        if (res.code === "database_unavailable") {
          setError(
            "Não foi possível conectar ao banco de dados. Verifique DATABASE_URL e se o PostgreSQL está em execução.",
          );
        } else {
          setError("E-mail ou palavra-passe incorretos.");
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
    <form onSubmit={onSubmit} noValidate autoComplete="on">
      <div className="step-badge admin-step-badge">Acesso administrativo</div>

      <div
        className={`error-box ${error ? "show" : ""}`}
        role="alert"
        aria-live="polite"
      >
        <span aria-hidden>❌</span>
        <span>{error ?? ""}</span>
      </div>

      <div className={`success-box ${success ? "show" : ""}`} role="status">
        <div>✅ Acesso autorizado</div>
        <div style={{ fontSize: "0.78rem", color: "var(--text-light)" }}>
          A redirecionar para o painel…
        </div>
      </div>

      <div className="field">
        <label htmlFor="admin-email">E-mail</label>
        <div className="input-wrap">
          <span className="input-icon" aria-hidden>
            ✉️
          </span>
          <input
            id="admin-email"
            name="email"
            type="email"
            autoComplete="username"
            placeholder="admin@exemplo.com"
            disabled={loading || success}
            className={error ? "error" : undefined}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            required
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="admin-password">Palavra-passe</label>
        <div className="input-wrap">
          <span className="input-icon" aria-hidden>
            🔒
          </span>
          <input
            id="admin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            disabled={loading || success}
            className={error ? "error" : undefined}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn-entrar"
        disabled={loading || success}
      >
        <span className={`spinner ${loading ? "show" : ""}`} aria-hidden />
        <span id="admin-btn-text">{loading ? "A entrar…" : "Entrar"}</span>
      </button>

      <div className="security-note">
        <span aria-hidden>🔒</span>
        <span>Acesso restrito a perfis administrativos</span>
      </div>
    </form>
  );
}
