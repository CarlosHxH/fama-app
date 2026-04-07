"use client";

import type { BillingListItem } from "./parcelas-list";
import { isBillingPaid, isBillingPendingPayment } from "~/lib/billing-status";

export type PayMethod = "pix" | "card" | "boleto";

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
};

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
}: CheckoutPanelProps) {
  const total = selected ? centsToBrl(selected.valueCents) : "R$ 0,00";
  const canPayPix =
    Boolean(selected) &&
    isBillingPendingPayment(selected!.status) &&
    payMethod === "pix";

  return (
    <div className="rounded-xl border border-[#ddd9d0] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.1)] lg:sticky lg:top-[calc(68px+1rem)]">
      <div className="border-b border-[#ede9e0] bg-[#fafaf8] px-4 py-4 sm:px-5">
        <h2 className="text-[1.05rem] font-extrabold text-[#1a3a2a]">
          Resumo do Pagamento
        </h2>
        <p className="mt-1 text-[0.8rem] text-[#4a4a4a]">
          Titular: <strong className="text-[#1a3a2a]">{payerName}</strong>
        </p>
      </div>
      <div className="px-4 py-4 sm:px-5">
        <button
          type="button"
          onClick={onToggleItems}
          className="flex w-full items-center justify-between text-[0.75rem] font-bold text-[#1a3a2a]"
          aria-expanded={itemsOpen}
        >
          <span className="flex items-center gap-2">
            Itens selecionados
            {selected && isBillingPendingPayment(selected.status) ? (
              <span className="rounded-full bg-[#2d5a3d] px-1.5 py-0.5 text-[0.55rem] text-white">
                1
              </span>
            ) : null}
          </span>
          <span className="text-[#2d5a3d]">
            {itemsOpen ? "Ocultar" : "Mostrar"}
          </span>
        </button>
        {itemsOpen ? (
          <div className="mt-2 max-h-48 overflow-y-auto rounded-lg border border-[#ddd9d0] bg-[#f5f2ed] p-2 text-[0.8rem]">
            {selected && isBillingPendingPayment(selected.status) ? (
              <div className="flex justify-between gap-2 rounded-md bg-white px-2 py-2">
                <span className="text-[#4a4a4a]">
                  {selected.description ?? "Cobrança PIX"}
                </span>
                <span className="font-bold text-[#1a3a2a]">
                  {centsToBrl(selected.valueCents)}
                </span>
              </div>
            ) : selected && isBillingPaid(selected.status) ? (
              <p className="px-1 py-2 text-[#4a4a4a]">
                Esta cobrança já está paga. Escolha outra em aberto.
              </p>
            ) : (
              <p className="px-1 py-2 text-[#7a7a7a]">
                Selecione uma parcela em aberto ou gere uma nova cobrança.
              </p>
            )}
          </div>
        ) : null}

        <div className="mt-4 flex items-center justify-between border-t border-[#ddd9d0] pt-3">
          <span className="text-[0.8rem] font-bold text-[#4a4a4a]">
            Total a pagar
          </span>
          <span className="text-[1.2rem] font-extrabold text-[#1a3a2a]">
            {total}
          </span>
        </div>

        <p className="mt-5 text-[0.7rem] font-bold tracking-wide text-[#7a7a7a] uppercase">
          Forma de pagamento
        </p>
        <div className="mt-2 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => onPayMethod("pix")}
            className={`flex items-center gap-3 rounded-xl border-2 px-3 py-3 text-left transition ${
              payMethod === "pix"
                ? "border-[#1a3a2a] bg-[#f0f9f3]"
                : "border-[#ddd9d0] bg-white hover:border-[#2d5a3d]/40"
            }`}
          >
            <span
              className={`flex h-5 w-5 shrink-0 rounded-full border-2 ${
                payMethod === "pix"
                  ? "border-[#2d5a3d] bg-[#2d5a3d]"
                  : "border-[#ccc]"
              }`}
            >
              {payMethod === "pix" ? (
                <span className="m-auto block h-2 w-2 rounded-full bg-white" />
              ) : null}
            </span>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-[#1a3a2a]">PIX</div>
            </div>
            <span aria-hidden>⚡</span>
          </button>

          <button
            type="button"
            disabled
            aria-disabled="true"
            className="flex cursor-not-allowed items-center gap-3 rounded-xl border-2 border-[#ede9e0] bg-[#fafafa] px-3 py-3 text-left opacity-60"
          >
            <span className="flex h-5 w-5 shrink-0 rounded-full border-2 border-[#ddd]" />
            <div className="min-w-0 flex-1">
              <div className="font-bold text-[#7a7a7a]">Cartão de crédito</div>
              <div className="text-[0.65rem] font-semibold text-amber-800">
                Indisponível
              </div>
            </div>
            <span aria-hidden>💳</span>
          </button>

          <button
            type="button"
            disabled
            aria-disabled="true"
            className="flex cursor-not-allowed items-center gap-3 rounded-xl border-2 border-[#ede9e0] bg-[#fafafa] px-3 py-3 text-left opacity-60"
          >
            <span className="flex h-5 w-5 shrink-0 rounded-full border-2 border-[#ddd]" />
            <div className="min-w-0 flex-1">
              <div className="font-bold text-[#7a7a7a]">Boleto bancário</div>
              <div className="text-[0.65rem] font-semibold text-amber-800">
                Indisponível
              </div>
            </div>
            <span aria-hidden>📄</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onConfirmPayment}
          disabled={confirmDisabled || !canPayPix}
          className="mt-5 w-full rounded-lg bg-[#1a3a2a] py-3.5 text-[0.8rem] font-bold tracking-wide text-white uppercase hover:bg-[#2d5a3d] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Confirmar pagamento
        </button>
        <p className="mt-3 text-center text-[0.68rem] text-[#7a7a7a]">
          Ambiente seguro — pagamento via PIX (Asaas).
        </p>
      </div>
    </div>
  );
}
