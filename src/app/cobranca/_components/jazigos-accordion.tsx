"use client";

import { useState } from "react";
import { AlertTriangle, Building2, ChevronDown, ChevronUp, CheckCircle2, Search } from "lucide-react";

import { api } from "~/trpc/react";

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function JazigoSkeleton() {
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#f9f6f0",
          padding: "0.75rem 1rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="cobranca-skeleton" style={{ height: 14, width: "55%" }} />
        <div className="cobranca-skeleton" style={{ height: 14, width: 80 }} />
      </div>
    </div>
  );
}

type JazigosAccordionProps = {
  selectedJazigoId?: string;
  onSelectJazigo?: (id: string) => void;
};

export function JazigosAccordion({ selectedJazigoId, onSelectJazigo }: JazigosAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const { data: jazigos, isLoading, isError } = api.billing.listMyJazigos.useQuery();

  return (
    <div className="card" id="card-jazigos" style={{ marginBottom: "1.5rem" }}>
      <div className="card-header">
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <Search size={16} style={{ flexShrink: 0 }} /> Consultar Jazigos &amp; Detalhes
        </div>
      </div>
      <div className="card-body">
        {isError ? (
          <div
            className="cobranca-alert cobranca-alert--error"
            role="alert"
            style={{ margin: "0.5rem 0" }}
          >
            <AlertTriangle size={16} aria-hidden />
            <span>Não foi possível carregar os jazigos. Tente atualizar a página.</span>
          </div>
        ) : null}

        <div
          id="jazigos-accordion-list"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {isLoading ? (
            <>
              <JazigoSkeleton />
              <JazigoSkeleton />
            </>
          ) : !isError && (!jazigos || jazigos.length === 0) ? (
            <div
              className="cobranca-alert cobranca-alert--muted"
              style={{ margin: "0.5rem 0" }}
            >
              <Building2 size={16} aria-hidden />
              <span>Nenhum jazigo encontrado para este cadastro.</span>
            </div>
          ) : (
            jazigos?.map((j) => {
              const isExpanded = openId === j.id;
              const tituloAcordeon = `Contrato: ${j.contrato.numeroContrato} | Quadra: ${j.quadra} | Jazigo: ${j.codigo}`;

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
                      borderBottom: isExpanded ? "1px solid var(--border)" : "none",
                      fontWeight: 600,
                      color: "var(--green-dark)",
                    }}
                  >
                    <div style={{ fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <Building2 size={14} style={{ flexShrink: 0 }} /> {tituloAcordeon}
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
                      <span style={{ color: j.contrato.situacao === "ATIVO" ? "var(--green-dark)" : "var(--red-dark)", height: 14, width: 14, borderRadius: "50%", display: "inline-block", }}></span>
                      <span>{isExpanded ? "Recolher" : "Ver Detalhes"}</span>
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
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
                          gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
                          gap: "1rem",
                          marginBottom: "1rem",
                          background: "#f9f9f9",
                          padding: "1rem",
                          borderRadius: "6px",
                        }}
                      >
                        <div className="detail-box">
                          <label>Capacidade</label>
                          <div className="val">{j.capacidadeLabel}</div>
                        </div>
                        <div className="detail-box">
                          <label>Gavetas</label>
                          <div className="val">{j.quantidadeGavetas}</div>
                        </div>
                        <div className="detail-box">
                          <label>Setor</label>
                          <div className="val">{j.setor}</div>
                        </div>
                        <div className="detail-box">
                          <label>Mensalidade</label>
                          <div className="val">{brl.format(j.valorMensalidadeCents / 100)}</div>
                        </div>
                      </div>

                      {onSelectJazigo ? (
                        <button
                          type="button"
                          onClick={() => onSelectJazigo(j.id)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            width: "100%",
                            padding: "0.65rem 1rem",
                            borderRadius: "6px",
                            border: selectedJazigoId === j.id
                              ? "2px solid var(--green-light)"
                              : "2px solid var(--border)",
                            background: selectedJazigoId === j.id ? "#f0fdf4" : "white",
                            color: selectedJazigoId === j.id ? "var(--green-dark)" : "var(--text-mid)",
                            fontWeight: 700,
                            fontSize: "0.82rem",
                            cursor: "pointer",
                            justifyContent: "center",
                          }}
                        >
                          <CheckCircle2 size={15} />
                          {selectedJazigoId === j.id ? "Jazigo selecionado para cobrança" : "Selecionar para nova cobrança"}
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
