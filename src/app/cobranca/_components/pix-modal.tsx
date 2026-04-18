"use client";

import { useEffect, useRef } from "react";
import { CheckCircle2, Loader2, Zap } from "lucide-react";

import type { BillingListItem } from "./parcelas-list";
import { isBillingPaid } from "~/lib/billing-status";

type PixModalProps = {
  open: boolean;
  payment: BillingListItem | null;
  onClose: () => void;
  centsToBrl: (cents: number) => string;
};

/**
 * Modal PIX — estrutura próxima a `#modal-pix` do HTML estático.
 */
export function PixModal({
  open,
  payment,
  onClose,
  centsToBrl,
}: PixModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.focus();
    }
  }, [open]);

  if (!open || !payment) return null;

  const paid = isBillingPaid(payment.status);
  const qrSrc = payment.pixQrCodeBase64
    ? payment.pixQrCodeBase64.startsWith("data:")
      ? payment.pixQrCodeBase64
      : `data:image/png;base64,${payment.pixQrCodeBase64}`
    : null;

  return (
    <div
      className="modal-overlay open"
      id="modal-pix"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget && paid) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="modal"
        style={{ maxWidth: "450px" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pix-modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {!paid ? (
          <div id="pix-waiting-state">
            <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "center" }}><Zap size={32} color="var(--green-mid)" /></div>
            <h3
              id="pix-modal-title"
              style={{
                color: "var(--green-dark)",
                marginBottom: "0.5rem",
              }}
            >
              Aguardando Pagamento
            </h3>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--text-mid)",
                marginBottom: "1.5rem",
              }}
            >
              Escaneie o QR Code abaixo ou copie a chave Pix para realizar o
              pagamento no seu aplicativo bancário. Valor:{" "}
              <strong>{centsToBrl(payment.valueCents)}</strong>
            </p>
            {qrSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrSrc}
                alt="QR Code PIX"
                className="pix-qr"
                style={{
                  marginBottom: "1.5rem",
                  width: "180px",
                  height: "180px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  padding: "10px",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  background: "white",
                }}
              />
            ) : (
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-mid)",
                  marginBottom: "1rem",
                }}
              >
                QR Code ainda não disponível; use o código copia e cola.
              </p>
            )}
            {payment.pixCopyPaste ? (
              <div
                style={{
                  background: "#f8faf9",
                  border: "1px dashed var(--green-mid)",
                  padding: "1rem",
                  borderRadius: "8px",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "var(--green-mid)",
                    marginBottom: "0.4rem",
                    textAlign: "left",
                  }}
                >
                  Chave Pix (Copia e Cola)
                </div>
                <div
                  id="pix-key-text"
                  style={{
                    fontSize: "0.75rem",
                    fontFamily: "monospace",
                    wordBreak: "break-all",
                    textAlign: "left",
                    color: "var(--text-dark)",
                  }}
                >
                  {payment.pixCopyPaste}
                </div>
              </div>
            ) : null}
            <button
              type="button"
              className="btn-primary"
              style={{ background: "var(--green-mid)", marginBottom: "0.5rem" }}
              onClick={() =>
                payment.pixCopyPaste &&
                void navigator.clipboard.writeText(payment.pixCopyPaste)
              }
            >
              Copiar Chave Pix
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                color: "var(--text-light)",
                fontSize: "0.75rem",
              }}
            >
              <Loader2 size={14} className="animate-spin" style={{ display: "inline" }} /> Verificando pagamento em
              tempo real...
            </div>
            <button
              type="button"
              className="btn-secondary"
              style={{ marginTop: "1rem", width: "100%" }}
              onClick={onClose}
            >
              Fechar (continua em aberto)
            </button>
          </div>
        ) : (
          <div id="pix-success-state">
            <div className="checkmark" style={{ display: "flex", justifyContent: "center" }}><CheckCircle2 size={48} color="var(--green-mid)" /></div>
            <h3
              id="pix-modal-title"
              style={{ color: "var(--green-dark)" }}
            >
              Pagamento Confirmado!
            </h3>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--text-mid)",
                margin: "1rem 0",
              }}
            >
              Recebemos seu Pix com sucesso. Valor:{" "}
              <strong>{centsToBrl(payment.valueCents)}</strong>.
            </p>
            <button type="button" className="btn-primary" onClick={onClose}>
              Concluir
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
