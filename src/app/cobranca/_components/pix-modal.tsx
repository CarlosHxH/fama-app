"use client";

import { useEffect, useRef } from "react";

import type { BillingListItem } from "./parcelas-list";
import { isBillingPaid } from "~/lib/billing-status";

type PixModalProps = {
  open: boolean;
  payment: BillingListItem | null;
  onClose: () => void;
  centsToBrl: (cents: number) => string;
};

/**
 * Modal de pagamento PIX (QR + copia e cola + estado de sucesso).
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
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget && paid) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pix-modal-title"
        tabIndex={-1}
        className="max-h-[min(90vh,640px)] w-full max-w-[450px] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {paid ? (
          <>
            <div className="text-center text-3xl" aria-hidden>
              ✅
            </div>
            <h3
              id="pix-modal-title"
              className="mt-2 text-center text-[1.15rem] font-extrabold text-[#1a3a2a]"
            >
              Pagamento confirmado
            </h3>
            <p className="mt-3 text-center text-[0.85rem] leading-relaxed text-[#4a4a4a]">
              Recebemos o PIX com sucesso. Valor:{" "}
              <strong>{centsToBrl(payment.valueCents)}</strong>.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-lg bg-[#1a3a2a] py-3 text-[0.85rem] font-bold text-white hover:bg-[#2d5a3d]"
            >
              Concluir
            </button>
          </>
        ) : (
          <>
            <div className="text-center text-2xl" aria-hidden>
              ⚡
            </div>
            <h3
              id="pix-modal-title"
              className="mt-2 text-center text-[1.05rem] font-extrabold text-[#1a3a2a]"
            >
              Aguardando pagamento
            </h3>
            <p className="mt-2 text-center text-[0.8rem] text-[#4a4a4a]">
              Escaneie o QR Code ou copie a chave Pix no seu banco. Valor:{" "}
              <strong>{centsToBrl(payment.valueCents)}</strong>
            </p>
            {qrSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrSrc}
                alt="QR Code PIX"
                className="mx-auto mt-4 max-w-[200px] rounded-xl border border-[#ddd9d0] bg-white p-2"
              />
            ) : (
              <p className="mt-4 text-center text-[0.75rem] text-amber-800">
                QR Code ainda não disponível; use o código copia e cola abaixo.
              </p>
            )}
            {payment.pixCopyPaste ? (
              <div className="mt-4 rounded-lg border border-dashed border-[#2d5a3d] bg-[#f8faf9] p-3">
                <p className="text-[0.6rem] font-bold text-[#2d5a3d] uppercase">
                  Pix copia e cola
                </p>
                <pre className="mt-1 max-h-28 overflow-auto font-mono text-[0.7rem] break-all text-[#1c1c1c]">
                  {payment.pixCopyPaste}
                </pre>
                <button
                  type="button"
                  onClick={() =>
                    void navigator.clipboard.writeText(payment.pixCopyPaste!)
                  }
                  className="mt-2 w-full rounded-lg bg-[#2d5a3d] py-2 text-[0.75rem] font-bold text-white"
                >
                  Copiar código
                </button>
              </div>
            ) : null}
            <p className="mt-4 flex items-center justify-center gap-2 text-[0.72rem] text-[#7a7a7a]">
              <span aria-hidden>⏳</span>A verificar pagamento…
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 w-full rounded-lg border border-[#ddd9d0] py-2.5 text-[0.8rem] font-semibold text-[#4a4a4a] hover:bg-[#f5f2ed]"
            >
              Fechar (continua em aberto)
            </button>
          </>
        )}
      </div>
    </div>
  );
}
