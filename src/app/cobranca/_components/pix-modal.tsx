"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Clock, Loader2, Zap } from "lucide-react";

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
const PIX_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

function usePixCountdown(open: boolean, expirationDate: string | null | undefined) {
  const [secsLeft, setSecsLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!open) { setSecsLeft(null); return; }

    const maxDeadline = Date.now() + PIX_TIMEOUT_MS;
    const parsed = expirationDate ? new Date(expirationDate).getTime() : NaN;
    const deadline = !isNaN(parsed) ? Math.min(parsed, maxDeadline) : maxDeadline;

    function tick() {
      const remaining = Math.max(0, Math.round((deadline - Date.now()) / 1000));
      setSecsLeft(remaining);
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [open, expirationDate]);

  return secsLeft;
}

function formatCountdown(secs: number): string {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function PixModal({
  open,
  payment,
  onClose,
  centsToBrl,
}: PixModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const secsLeft = usePixCountdown(open, payment?.pixExpirationDate);
  const expired = secsLeft !== null && secsLeft <= 0;

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
            <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "center" }}>
              <Zap size={32} color="var(--green-mid)" />
            </div>
            <h3
              id="pix-modal-title"
              style={{ color: "var(--green-dark)", marginBottom: "0.5rem" }}
            >
              {expired ? "Código PIX expirado" : "Aguardando Pagamento"}
            </h3>

            {/* Countdown timer */}
            {secsLeft !== null && !expired ? (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: secsLeft <= 60 ? "#fef2f2" : "#f0fdf4",
                  border: `1px solid ${secsLeft <= 60 ? "#fca5a5" : "#bbf7d0"}`,
                  borderRadius: "999px",
                  padding: "0.3rem 0.85rem",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: secsLeft <= 60 ? "#b91c1c" : "#166534",
                  marginBottom: "1rem",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <Clock size={14} />
                {formatCountdown(secsLeft)}
              </div>
            ) : null}

            {expired ? (
              <div
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fca5a5",
                  borderRadius: "8px",
                  padding: "1rem",
                  marginBottom: "1rem",
                  fontSize: "0.85rem",
                  color: "#b91c1c",
                }}
              >
                O código PIX expirou. Feche este modal e gere uma nova cobrança.
              </div>
            ) : (
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
            )}
            {!expired && qrSrc ? (
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
            ) : !expired ? (
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-mid)",
                  marginBottom: "1rem",
                }}
              >
                QR Code ainda não disponível; use o código copia e cola.
              </p>
            ) : null}

            {!expired && payment.pixCopyPaste ? (
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

            {!expired ? (
              <>
                <button
                  type="button"
                  className="btn-primary"
                  style={{ background: "var(--green-mid)", marginBottom: "0.5rem" }}
                  disabled={!payment.pixCopyPaste}
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
              </>
            ) : null}

            <button
              type="button"
              className="btn-secondary"
              style={{ marginTop: "1rem", width: "100%" }}
              onClick={onClose}
            >
              {expired ? "Fechar" : "Fechar (continua em aberto)"}
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
