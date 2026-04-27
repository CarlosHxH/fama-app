"use client";

import { CreditCard, ExternalLink, FileText } from "lucide-react";

import type { BillingListItem } from "./parcelas-list";

type CobrancaStaticModalsProps = {
  payment?: BillingListItem | null;
  openCard: boolean;
  openBoleto: boolean;
  onCloseCard: () => void;
  onCloseBoleto: () => void;
  cardModalTotal: string;
};

/**
 * Modais de pagamento: cartão (link externo) e boleto (linha digitável / PDF).
 */
export function CobrancaStaticModals({
  payment,
  openCard,
  openBoleto,
  onCloseCard,
  onCloseBoleto,
  cardModalTotal,
}: CobrancaStaticModalsProps) {
  return (
    <>
      {/* ── Cartão ── */}
      <div
        className={`modal-overlay${openCard ? " open" : ""}`}
        id="modal-card"
        role="presentation"
        onClick={(e) => {
          if (e.target === e.currentTarget) onCloseCard();
        }}
      >
        <div
          className="modal"
          style={{ maxWidth: "450px", textAlign: "left", padding: "1.5rem" }}
          role="dialog"
          aria-modal="true"
          onClick={(ev) => ev.stopPropagation()}
        >
          <h3
            style={{
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "1.2rem",
            }}
          >
            <CreditCard size={18} style={{ flexShrink: 0 }} /> Pagamento com cartão
          </h3>
          <div
            style={{
              background: "var(--cream)",
              border: "1px solid var(--border)",
              padding: "1rem",
              borderRadius: "10px",
              textAlign: "center",
              marginTop: "0.5rem",
            }}
          >
            <div
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "var(--text-light)",
              }}
            >
              Total
            </div>
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "var(--green-dark)",
              }}
            >
              {cardModalTotal}
            </div>
          </div>

          {payment?.checkoutUrl ? (
            <>
              <p style={{ fontSize: "0.85rem", color: "var(--text-mid)", marginTop: "1rem" }}>
                Clique no botão abaixo para acessar a página segura de pagamento com cartão.
              </p>
              <a
                href={payment.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  textAlign: "center",
                  marginTop: "0.75rem",
                  textDecoration: "none",
                  padding: "0.75rem 1rem",
                }}
              >
                <ExternalLink size={16} />
                Pagar com cartão
              </a>
            </>
          ) : (
            <p style={{ fontSize: "0.85rem", color: "#b91c1c", marginTop: "1rem", background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "8px", padding: "0.75rem" }}>
              Link de pagamento indisponível. Feche e tente novamente ou contacte o suporte.
            </p>
          )}

          <button
            type="button"
            className="btn-secondary"
            style={{ marginTop: "1rem", width: "100%" }}
            onClick={onCloseCard}
          >
            Fechar
          </button>
        </div>
      </div>

      {/* ── Boleto ── */}
      <div
        className={`modal-overlay${openBoleto ? " open" : ""}`}
        id="modal-boleto"
        role="presentation"
        onClick={(e) => {
          if (e.target === e.currentTarget) onCloseBoleto();
        }}
      >
        <div
          className="modal"
          style={{ maxWidth: "450px" }}
          role="dialog"
          aria-modal="true"
          onClick={(ev) => ev.stopPropagation()}
        >
          <div>
            <div
              style={{
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <FileText size={40} color="var(--green-mid)" />
            </div>
            <h3 style={{ color: "var(--green-dark)" }}>Boleto bancário</h3>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--text-mid)",
                marginTop: "0.5rem",
              }}
            >
              {payment?.boletoDigitableLine
                ? "Copie a linha digitável abaixo ou abra o PDF."
                : payment?.checkoutUrl
                  ? "Acesse o link para visualizar e imprimir o boleto."
                  : "Boleto em processamento. Aguarde alguns segundos e feche para atualizar."}
            </p>
            {payment?.boletoDigitableLine ? (
              <div
                style={{
                  background: "#f8faf9",
                  border: "1px dashed var(--green-mid)",
                  padding: "1rem",
                  borderRadius: "8px",
                  marginTop: "1rem",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "var(--green-mid)",
                    marginBottom: "0.4rem",
                  }}
                >
                  Linha digitável
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontFamily: "monospace",
                    wordBreak: "break-all",
                  }}
                >
                  {payment.boletoDigitableLine}
                </div>
                <button
                  type="button"
                  className="btn-primary"
                  style={{
                    marginTop: "0.75rem",
                    background: "var(--green-mid)",
                  }}
                  onClick={() =>
                    void navigator.clipboard.writeText(
                      payment.boletoDigitableLine ?? "",
                    )
                  }
                >
                  Copiar linha
                </button>
              </div>
            ) : null}
            {payment?.checkoutUrl ? (
              <a
                href={payment.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: "1rem",
                  textDecoration: "none",
                  padding: "0.75rem 1rem",
                }}
              >
                Abrir boleto / fatura
              </a>
            ) : null}
            <button
              type="button"
              className="btn-primary"
              style={{
                marginTop: "1.5rem",
                background: "#e2e8f0",
                color: "var(--text-dark)",
              }}
              onClick={onCloseBoleto}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
