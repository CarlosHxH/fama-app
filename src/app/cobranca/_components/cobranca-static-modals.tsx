"use client";

import { CreditCard, FileText, Pencil, User } from "lucide-react";

import type { BillingListItem } from "./parcelas-list";

type SessionUser = {
  name?: string | null;
  cpfCnpj?: string | null;
};

type CobrancaStaticModalsProps = {
  user: SessionUser | undefined;
  /** Cobrança selecionada — links Asaas para cartão/boleto. */
  payment?: BillingListItem | null;
  openTitular: boolean;
  openResp: boolean;
  openCard: boolean;
  openBoleto: boolean;
  onCloseTitular: () => void;
  onCloseResp: () => void;
  onCloseCard: () => void;
  onCloseBoleto: () => void;
  cardModalTotal: string;
};

/**
 * Modais estáticos alinhados ao HTML (edição titular, responsável, cartão, boleto — demonstração).
 */
export function CobrancaStaticModals({
  user,
  payment,
  openTitular,
  openResp,
  openCard,
  openBoleto,
  onCloseTitular,
  onCloseResp,
  onCloseCard,
  onCloseBoleto,
  cardModalTotal,
}: CobrancaStaticModalsProps) {
  return (
    <>
      <div
        className={`modal-overlay${openTitular ? " open" : ""}`}
        id="modal-titular"
        role="presentation"
        onClick={(e) => {
          if (e.target === e.currentTarget) onCloseTitular();
        }}
      >
        <div
          className="modal"
          style={{ textAlign: "left", padding: "1.5rem", maxWidth: "500px" }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-titular-title"
          onClick={(ev) => ev.stopPropagation()}
        >
          <h3
            id="modal-titular-title"
            style={{
              marginBottom: "0.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "1.2rem",
            }}
          >
            <Pencil size={18} style={{ flexShrink: 0 }} /> Atualizar Dados do Titular
          </h3>
          <p
            style={{
              fontSize: "0.8rem",
              marginBottom: "1.25rem",
              color: "var(--text-mid)",
              lineHeight: 1.5,
            }}
          >
            Mantenha seus telefones e endereço atualizados. O documento não pode
            ser modificado.
          </p>
          <div className="field" style={{ marginBottom: "1rem" }}>
            <label
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              Nome completo
            </label>
            <input
              type="text"
              readOnly
              value={user?.name ?? ""}
              style={{
                width: "100%",
                padding: "0.7rem",
                border: "2px solid var(--border)",
                borderRadius: "6px",
                fontSize: "0.9rem",
                background: "var(--cream)",
              }}
            />
          </div>
          <div className="field" style={{ marginBottom: "1rem" }}>
            <label
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              CPF / CNPJ
            </label>
            <input
              type="text"
              disabled
              value={user?.cpfCnpj ?? ""}
              style={{
                width: "100%",
                padding: "0.7rem",
                border: "2px solid var(--border)",
                borderRadius: "6px",
                fontSize: "0.9rem",
                opacity: 0.8,
              }}
            />
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>
            Alteração completa pelo portal será disponibilizada em versão futura.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
            <button
              type="button"
              className="btn-secondary"
              style={{ marginTop: 0, flex: 1, padding: "0.7rem" }}
              onClick={onCloseTitular}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>

      <div
        className={`modal-overlay${openResp ? " open" : ""}`}
        id="modal-resp"
        role="presentation"
        onClick={(e) => {
          if (e.target === e.currentTarget) onCloseResp();
        }}
      >
        <div
          className="modal"
          style={{ textAlign: "left", padding: "1.5rem", maxWidth: "500px" }}
          role="dialog"
          aria-modal="true"
          onClick={(ev) => ev.stopPropagation()}
        >
          <h3
            style={{
              marginBottom: "0.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "1.2rem",
            }}
          >
            <User size={18} style={{ flexShrink: 0 }} /> Novo Responsável Financeiro
          </h3>
          <p
            style={{
              fontSize: "0.8rem",
              marginBottom: "1.25rem",
              color: "var(--text-mid)",
            }}
          >
            Funcionalidade de cadastro em desenvolvimento.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
            <button
              type="button"
              className="btn-secondary"
              style={{ flex: 1, padding: "0.7rem" }}
              onClick={onCloseResp}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>

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
          <p style={{ fontSize: "0.85rem", color: "var(--text-mid)" }}>
            {payment?.checkoutUrl
              ? "Abra o link seguro do Asaas para concluir o pagamento com cartão."
              : "O link de pagamento ainda não está disponível. Aguarde alguns segundos e tente de novo ou contacte o suporte."}
          </p>
          <div
            style={{
              background: "var(--cream)",
              border: "1px solid var(--border)",
              padding: "1rem",
              borderRadius: "10px",
              textAlign: "center",
              marginTop: "1rem",
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
              id="card-modal-total"
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
              Abrir página de pagamento
            </a>
          ) : null}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            <button
              type="button"
              className="btn-primary"
              style={{ background: "#e2e8f0", color: "var(--text-dark)" }}
              onClick={onCloseCard}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>

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
          <div id="boleto-generating-state">
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
              {payment?.boletoDigitableLine || payment?.checkoutUrl
                ? "Copie a linha digitável ou abra o PDF no site do Asaas."
                : "Linha digitável ainda não disponível. Aguarde ou tente mais tarde."}
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
