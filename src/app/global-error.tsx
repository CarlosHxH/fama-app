"use client";

/**
 * Limite de erro na raiz (inclui falhas no layout). Não usa o layout principal.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d1f14",
          color: "#f5f2e8",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{ textAlign: "center", padding: "1.5rem", maxWidth: "24rem" }}
        >
          <h1 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>
            Erro crítico
          </h1>
          <p
            style={{
              fontSize: "0.875rem",
              opacity: 0.85,
              marginBottom: "1.25rem",
            }}
          >
            A aplicação encontrou um problema grave. Tente recarregar a página.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "#2e7d32",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Tentar novamente
          </button>
          {process.env.NODE_ENV === "development" ? (
            <pre
              style={{
                marginTop: "1rem",
                fontSize: "0.7rem",
                textAlign: "left",
                opacity: 0.7,
                overflow: "auto",
                maxHeight: "6rem",
              }}
            >
              {error.message}
            </pre>
          ) : null}
        </div>
      </body>
    </html>
  );
}
