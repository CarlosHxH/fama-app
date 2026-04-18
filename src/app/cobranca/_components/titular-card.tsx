"use client";

import { useState } from "react";
import { Pencil, Plus, User } from "lucide-react";

type SessionUser = {
  name?: string | null;
  email?: string | null;
  cpfCnpj?: string | null;
};

type TitularCardProps = {
  user: SessionUser | undefined;
  onOpenEditTitular?: () => void;
  onOpenResp?: () => void;
};

/**
 * Cartão do titular — estrutura e classes de cobranca-jazigo.html.
 */
export function TitularCard({
  user,
  onOpenEditTitular,
  onOpenResp,
}: TitularCardProps) {
  const [expanded, setExpanded] = useState(false);

  const nome = user?.name ?? "—";
  const doc = user?.cpfCnpj ?? "—";

  return (
    <div className="card" id="titular-card" style={{ marginBottom: "1.5rem" }}>
      <div className="card-header" style={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <User size={16} style={{ flexShrink: 0 }} />
          <span className="hide-on-mobile">
            Dados do Titular (Cessionário) / Pagador
          </span>
          <span className="show-on-mobile">Dados Titular</span>
        </div>
        <div
          style={{ display: "flex", gap: "0.5rem" }}
          id="titular-controls-top"
        >
          <button
            type="button"
            className="collapsible-btn"
            id="titular-expand-btn"
            aria-expanded={expanded}
            aria-controls="titular-card-body"
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.3)",
              fontWeight: "bold",
              padding: "0.3rem 0.6rem",
              fontSize: "0.7rem",
            }}
            onClick={() => setExpanded((e) => !e)}
          >
            {expanded ? "Recolher" : "Ver Detalhes"}
          </button>
          <button
            type="button"
            className="collapsible-btn"
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.3)",
              fontWeight: "bold",
              padding: "0.3rem 0.6rem",
              fontSize: "0.7rem",
            }}
            onClick={() => onOpenEditTitular?.()}
          >
            <Pencil size={12} style={{ display: "inline", marginRight: 4 }} />Editar
          </button>
        </div>
      </div>

      <div
        id="titular-mini-info"
        style={{
          padding: "1rem 1.5rem",
          background: "var(--cream)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}
          >
            <div
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                color: "var(--text-light)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Titular (Cessionário)
            </div>
            <div
              id="mini-nome"
              style={{
                fontWeight: 800,
                color: "var(--green-dark)",
                fontSize: "1rem",
              }}
            >
              {nome}
            </div>
            <div
              id="mini-doc"
              style={{
                fontSize: "0.8rem",
                color: "var(--text-mid)",
                fontWeight: 600,
              }}
            >
              {doc}
            </div>
          </div>
          <div id="mini-resp-section" style={{ display: "none" }} />
          <div id="mini-add-resp-container" style={{ display: "none" }} />
        </div>
      </div>

      <div
        className="card-body"
        id="titular-card-body"
        style={{
          display: expanded ? "block" : "none",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="info-grid">
          <div className="info-field full">
            <label>Nome Completo</label>
            <div className="value" id="titular-nome">
              {nome}
            </div>
          </div>
          <div className="info-field">
            <label>CPF / CNPJ</label>
            <div className="value" id="titular-doc">
              {doc}
            </div>
          </div>
          <div className="info-field">
            <label>Data de Nascimento</label>
            <div className="value" id="titular-nasc">
              —
            </div>
          </div>
          <div className="info-field full">
            <label>Telefone(s)</label>
            <div className="value" id="titular-fones" style={{ lineHeight: 1.5 }}>
              —
            </div>
          </div>
          <div className="info-field full">
            <label>Endereço de Cobrança</label>
            <div className="value" id="titular-end">
              —
            </div>
          </div>
        </div>

        <div
          id="full-add-resp-container"
          style={{
            marginTop: "1.25rem",
            paddingTop: "1.25rem",
            borderTop: "1px dashed var(--border)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            className="btn-primary"
            id="btn-add-resp-full"
            style={{
              background: "transparent",
              color: "var(--green-mid)",
              border: "1.5px solid var(--green-mid)",
              fontWeight: 700,
              maxWidth: "280px",
              padding: "0.6rem 1.2rem",
              fontSize: "0.85rem",
              boxShadow: "none",
            }}
            onClick={() => onOpenResp?.()}
          >
            <Plus size={14} style={{ display: "inline", marginRight: 4 }} />ADICIONAR RESPONSÁVEL FINANCEIRO
          </button>
          <p
            style={{
              fontSize: "0.68rem",
              color: "var(--text-light)",
              marginTop: "0.5rem",
              letterSpacing: "0.01em",
            }}
          >
            Deseja que outra pessoa realize o pagamento?
          </p>
        </div>

        <div className="info-field full" id="resp-info-display" style={{ display: "none" }} />
        <div id="resp-history-container" style={{ display: "none" }} />
      </div>
    </div>
  );
}
