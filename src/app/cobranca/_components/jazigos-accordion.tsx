"use client";

import { useState } from "react";

/** Dados de demonstração (espelho de PaginaCobranca/js/cobranca-jazigo.js). */
const LISTAGEM_JAZIGOS = [
  {
    id: 1,
    codigo: "Contrato: 1785-A | Quadra: C | Jazigo: 766",
    data: "27/01/2023",
    capacidade: "Duplo",
    ocupacao: "3",
    aquisicao: "27/Jan/2023",
    sepultados: [
      { initials: "JM", name: "José Marcos da Silva", dates: "1942 - 2019" },
    ],
  },
  {
    id: 2,
    codigo: "Contrato: 1785-A | Quadra: B | Jazigo: 122",
    data: "27/01/2023",
    capacidade: "Simples",
    ocupacao: "1",
    aquisicao: "Jan/2015",
    sepultados: [
      { initials: "RS", name: "Ricardo Santos", dates: "1930 - 2015" },
    ],
  },
  {
    id: 3,
    codigo: "Contrato: 1785-A | Quadra: A | Jazigo: 045",
    data: "27/01/2023",
    capacidade: "Simples",
    ocupacao: "0",
    aquisicao: "Jul/2010",
    sepultados: [] as { initials: string; name: string; dates: string }[],
  },
] as const;

/**
 * Secção “Consultar Jazigos & Detalhes” com acordeão como no HTML estático.
 */
export function JazigosAccordion() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="card" id="card-jazigos" style={{ marginBottom: "1.5rem" }}>
      <div className="card-header">
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span className="icon">🔍</span> Consultar Jazigos &amp; Detalhes
        </div>
      </div>
      <div className="card-body">
        <div
          id="jazigos-accordion-list"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {LISTAGEM_JAZIGOS.map((j) => {
            const isExpanded = openId === j.id;
            return (
              <div
                key={j.id}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isExpanded ? null : j.id)}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    textAlign: "left",
                    background: "#f9f6f0",
                    padding: "0.75rem 1rem",
                    border: "none",
                    borderBottom: isExpanded
                      ? "1px solid var(--border)"
                      : "none",
                    fontWeight: 600,
                    color: "var(--green-dark)",
                  }}
                >
                  <div style={{ fontSize: "0.8rem" }}>
                    <span className="icon">🏛️</span> {j.codigo}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--green-mid)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    <span>{isExpanded ? "Recolher" : "Ver Detalhes"}</span>
                    <span>{isExpanded ? "▲" : "▼"}</span>
                  </div>
                </button>
                <div
                  className={`collapsible-content${isExpanded ? "" : " collapsed"}`}
                  style={{ background: "var(--white)" }}
                >
                  <div style={{ padding: "1.25rem" }}>
                    <div
                      className="jazigo-details"
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(110px, 1fr))",
                        gap: "1rem",
                        marginBottom: "1.5rem",
                        background: "#f9f9f9",
                        padding: "1rem",
                        borderRadius: "6px",
                      }}
                    >
                      <div className="detail-box">
                        <label>Capacidade</label>
                        <div className="val">{j.capacidade}</div>
                      </div>
                      <div className="detail-box">
                        <label>Ocupação</label>
                        <div className="val">{j.ocupacao}</div>
                      </div>
                      <div className="detail-box">
                        <label>Aquisição</label>
                        <div className="val">{j.aquisicao}</div>
                      </div>
                    </div>
                    <div
                      className="sepultados-section"
                      style={{
                        borderTop: "1px solid var(--border)",
                        paddingTop: "1rem",
                      }}
                    >
                      <div
                        className="sep-title"
                        style={{
                          fontWeight: 700,
                          color: "var(--green-dark)",
                          marginBottom: "1rem",
                          fontSize: "0.8rem",
                          textTransform: "uppercase",
                        }}
                      >
                        🕯️ Memoriais (Sepultados no local)
                      </div>
                      <div className="sepultados-list">
                        {j.sepultados.length === 0 ? (
                          <p
                            style={{
                              textAlign: "center",
                              color: "var(--text-light)",
                              padding: "1rem",
                            }}
                          >
                            Sem sepultamentos registrados.
                          </p>
                        ) : (
                          j.sepultados.map((s) => (
                            <div key={s.name} className="sepultado-item">
                              <div className="sep-avatar">{s.initials}</div>
                              <div className="sep-info">
                                <div className="name">{s.name}</div>
                                <div className="dates">{s.dates}</div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
