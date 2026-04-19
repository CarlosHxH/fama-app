"use client";

import { CreditCard, FileText, Lock, Loader2, Zap } from "lucide-react";

import type { BillingListItem } from "./parcelas-list";
import { isBillingPaid, isBillingPendingPayment } from "~/lib/billing-status";

export type PayMethod = "pix" | "card" | "boleto";

/** Alinha seleção da UI com o tipo gravado no Asaas / `BillingPayment`. */
export function billingTypeToPayMethod(
  t: string | null | undefined,
): PayMethod {
  switch (t) {
    case "BOLETO":
      return "boleto";
    case "CREDIT_CARD":
      return "card";
    default:
      return "pix";
  }
}

export type CheckoutPanelProps = {
  payerName: string;
  selected: BillingListItem | null;
  itemsOpen: boolean;
  onToggleItems: () => void;
  centsToBrl: (cents: number) => string;
  payMethod: PayMethod;
  onPayMethod: (m: PayMethod) => void;
  onConfirmPayment: () => void;
  confirmDisabled: boolean;
  listLoading: boolean;
  initiatePending?: boolean;
  initiateError?: string | null;
  /** A jazigo was selected in the accordion for a new charge. */
  jazigoSelected?: boolean;
  createPending?: boolean;
  createError?: string | null;
};

/**
 * Coluna de checkout — classes do protótipo (`checkout-card`, `pay-option`, …).
 */
export function CheckoutPanel({
  payerName,
  selected,
  itemsOpen,
  onToggleItems,
  centsToBrl,
  payMethod,
  onPayMethod,
  onConfirmPayment,
  confirmDisabled,
  listLoading,
  initiatePending,
  initiateError,
  jazigoSelected,
  createPending,
  createError,
}: CheckoutPanelProps) {
  const total = selected ? centsToBrl(selected.valueCents) : "R$ 0,00";
  const billingType = selected?.asaasBillingType ?? null;

  const canConfirm =
    Boolean(selected) &&
    isBillingPendingPayment(selected!.status);

  const canCreate = jazigoSelected && !selected;

  const confirmHint = listLoading
    ? "A carregar as suas cobranças…"
    : !selected && !jazigoSelected
      ? "Selecione um jazigo em Consultar Jazigos ou escolha uma parcela em aberto na lista."
      : selected && isBillingPaid(selected.status)
        ? "Esta cobrança já foi paga. Escolha outra em aberto."
        : null;

  const showItem =
    selected &&
    isBillingPendingPayment(selected.status) &&
    itemsOpen;

  return (
    <div className="checkout-col">
      <div className="checkout-card">
        <div className="checkout-header">
          <h2>Resumo do Pagamento</h2>
          <p id="checkout-payer">Titular: {payerName}</p>
        </div>

        <div className="checkout-body">
          <div
            className="co-section-title"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              marginBottom: "0.5rem",
            }}
            role="button"
            tabIndex={0}
            aria-expanded={itemsOpen}
            aria-controls="checkout-items-container"
            onClick={onToggleItems}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onToggleItems();
              }
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span>Itens Selecionados</span>
              <span
                id="checkout-count-badge"
                style={{
                  background: "var(--green-mid)",
                  color: "white",
                  fontSize: "0.6rem",
                  padding: "1px 6px",
                  borderRadius: "10px",
                  fontWeight: 800,
                  display:
                    selected && isBillingPendingPayment(selected.status)
                      ? "inline-block"
                      : "none",
                }}
              >
                1
              </span>
            </div>
            <span
              id="checkout-items-toggle-icon"
              style={{
                fontSize: "0.6rem",
                color: "var(--green-mid)",
                fontWeight: 800,
                letterSpacing: "0.5px",
              }}
            >
              {itemsOpen ? "OCULTAR ▲" : "MOSTRAR ▼"}
            </span>
          </div>

          <div
            id="checkout-items-container"
            style={{
              transition: "all 0.3s ease",
              overflow: "hidden",
              maxHeight: itemsOpen ? "400px" : "0px",
            }}
          >
            <div id="checkout-items">
              {showItem ? (
                <div className="co-line">
                  <span className="label">
                    {selected.description ??
                      (billingType === "BOLETO"
                        ? "Cobrança boleto"
                        : billingType === "CREDIT_CARD"
                          ? "Cobrança cartão"
                          : "Cobrança PIX")}
                  </span>
                  <span className="val">{centsToBrl(selected.valueCents)}</span>
                </div>
              ) : selected && isBillingPaid(selected.status) ? (
                <p style={{ fontSize: "0.82rem", color: "var(--text-mid)" }}>
                  Esta cobrança já está paga. Selecione outra em aberto.
                </p>
              ) : (
                <p style={{ fontSize: "0.82rem", color: "var(--text-light)" }}>
                  Selecione uma parcela em aberto ou gere uma nova cobrança.
                </p>
              )}
            </div>
          </div>

          <div
            className="co-line total-line"
            style={{
              marginTop: "0.25rem",
              paddingTop: "0.75rem",
              borderTop: "1px solid var(--border)",
            }}
          >
            <span className="label">Total a Pagar</span>
            <span className="val" id="total-geral" style={{ fontSize: "1.25rem" }}>
              {total}
            </span>
          </div>

          <div className="co-section-title">Forma de Pagamento</div>

          <div className="pay-options">
            <button
              type="button"
              className={`pay-option${payMethod === "pix" ? " selected" : ""}`}
              id="opt-pix"
              aria-pressed={payMethod === "pix"}
              onClick={() => onPayMethod("pix")}
            >
              <div className="pay-radio" />
              <div className="pay-info">
                <div className="pay-name">PIX</div>
              </div>
              <div className="pay-icons"><Zap size={16} /></div>
            </button>

            <button
              type="button"
              className={`pay-option${payMethod === "card" ? " selected" : ""}`}
              id="opt-cartao"
              aria-pressed={payMethod === "card"}
              onClick={() => onPayMethod("card")}
            >
              <div className="pay-radio" />
              <div className="pay-info">
                <div className="pay-name">Cartão de Crédito / Débito</div>
              </div>
              <div className="pay-icons"><CreditCard size={16} /></div>
            </button>

            <button
              type="button"
              className={`pay-option${payMethod === "boleto" ? " selected" : ""}`}
              id="opt-boleto"
              aria-pressed={payMethod === "boleto"}
              onClick={() => onPayMethod("boleto")}
            >
              <div className="pay-radio" />
              <div className="pay-info">
                <div className="pay-name">Boleto Bancário</div>
              </div>
              <div className="pay-icons"><FileText size={16} /></div>
            </button>
          </div>

          <div id="cartao-detalhes" style={{ display: "none" }} />

          <button
            type="button"
            className="btn-primary"
            id="btn-pagar"
            onClick={onConfirmPayment}
            disabled={confirmDisabled || createPending || (!canConfirm && !canCreate)}
            aria-describedby={
              confirmHint ? "checkout-confirm-hint" : undefined
            }
          >
            {initiatePending || createPending ? (
              <><Loader2 size={15} className="animate-spin" style={{ display: "inline", marginRight: 6 }} />A gerar cobrança…</>
            ) : canCreate ? (
              <><Zap size={15} style={{ display: "inline", marginRight: 6 }} />Gerar cobrança</>
            ) : (
              <><Lock size={15} style={{ display: "inline", marginRight: 6 }} />Confirmar Pagamento</>
            )}
          </button>
          {(initiateError ?? createError) ? (
            <p
              role="alert"
              style={{
                fontSize: "0.78rem",
                color: "#b91c1c",
                textAlign: "center",
                marginTop: "0.65rem",
              }}
            >
              {initiateError ?? createError}
            </p>
          ) : confirmHint ? (
            <p
              id="checkout-confirm-hint"
              style={{
                fontSize: "0.72rem",
                color: "var(--text-light)",
                textAlign: "center",
                marginTop: "0.65rem",
                lineHeight: 1.45,
              }}
            >
              {confirmHint}
            </p>
          ) : null}

          <div className="security-strip" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem" }}><Lock size={13} /> Ambiente 100% Seguro</div>
        </div>
      </div>
    </div>
  );
}
