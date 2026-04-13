"use client";

import { api } from "~/trpc/react";

/**
 * Resumo dos dados espelhados do legado (após sync MSSQL → Postgres).
 */
export function LegacySnapshotCard() {
  const q = api.legacy.titularSnapshot.useQuery(undefined, {
    staleTime: 60_000,
  });

  if (q.isLoading) {
    return (
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <div className="card-header">
          <span className="icon">📥</span> Dados do sistema legado
        </div>
        <div className="card-body">
          <p style={{ fontSize: "0.85rem", color: "var(--text-mid)" }}>
            A carregar…
          </p>
        </div>
      </div>
    );
  }

  if (q.isError) {
    return (
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <div className="card-header">
          <span className="icon">📥</span> Dados do sistema legado
        </div>
        <div className="card-body">
          <p style={{ fontSize: "0.85rem", color: "#b91c1c" }}>
            {q.error.message}
          </p>
        </div>
      </div>
    );
  }

  const snapshot = q.data ?? {
    cessionario: null,
    contratos: [] as Record<string, unknown>[],
    faturas: [] as Record<string, unknown>[],
  };
  const { cessionario, contratos, faturas } = snapshot;

  const hasData =
    cessionario !== null || contratos.length > 0 || faturas.length > 0;

  return (
    <div className="card" style={{ marginBottom: "1.5rem" }}>
      <div className="card-header">
        <span className="icon">📥</span> Dados sincronizados (legado)
      </div>
      <div className="card-body">
        {!hasData ? (
          <p style={{ fontSize: "0.85rem", color: "var(--text-mid)" }}>
            Ainda não há registos espelhados para o seu documento. Após o job de
            sincronização, o resumo aparece aqui.
          </p>
        ) : (
          <ul
            style={{
              margin: 0,
              paddingLeft: "1.1rem",
              fontSize: "0.85rem",
              color: "var(--text-dark)",
              lineHeight: 1.6,
            }}
          >
            <li>
              Titular no legado:{" "}
              <strong>{cessionario ? "encontrado" : "não encontrado"}</strong>
            </li>
            <li>
              Contratos / jazigos (sync):{" "}
              <strong>{contratos.length}</strong> registo(s)
            </li>
            <li>
              Faturas (legado): <strong>{faturas.length}</strong> registo(s)
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
