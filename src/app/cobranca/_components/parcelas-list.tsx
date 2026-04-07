"use client";

import type { RouterOutputs } from "~/trpc/react";

import { isBillingPaid, isBillingPendingPayment } from "~/lib/billing-status";

export type BillingListItem = RouterOutputs["billing"]["listMine"][number];

export type ParcelasListProps = {
  payments: BillingListItem[] | undefined;
  hidePaid: boolean;
  onToggleHidePaid: () => void;
  selectedId: string | null;
  onSelect: (id: string) => void;
  centsToBrl: (cents: number) => string;
  valueReais: string;
  onValueReaisChange: (v: string) => void;
  description: string;
  onDescriptionChange: (v: string) => void;
  cpfCnpj: string;
  onCpfCnpjChange: (v: string) => void;
  onCreateSubmit: (e: React.FormEvent) => void;
  createPending: boolean;
  createError: string | null;
};

function statusLabel(status: string): string {
  const map: Record<string, string> = {
    PENDING: "Em aberto",
    RECEIVED: "Paga",
    OVERDUE: "Vencida",
    REFUNDED: "Estornada",
    CANCELLED: "Cancelada",
    UNKNOWN: "Indefinido",
  };
  return map[status] ?? status;
}

export function ParcelasList(props: ParcelasListProps) {
  const {
    payments,
    hidePaid,
    onToggleHidePaid,
    selectedId,
    onSelect,
    centsToBrl,
    valueReais,
    onValueReaisChange,
    description,
    onDescriptionChange,
    cpfCnpj,
    onCpfCnpjChange,
    onCreateSubmit,
    createPending,
    createError,
  } = props;

  const visible = (payments ?? []).filter(
    (p) => !hidePaid || !isBillingPaid(p.status),
  );

  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-[#ddd9d0] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#2d5a3d] px-4 py-3 text-white">
        <div className="flex items-center gap-2 text-[0.85rem] font-bold">
          <span aria-hidden>💵</span>
          Parcelas
        </div>
        <button
          type="button"
          onClick={onToggleHidePaid}
          className="rounded-md border border-white/30 bg-white/15 px-2 py-1 text-[0.65rem] font-bold hover:bg-white/25"
        >
          {hidePaid ? "Mostrar pagas" : "Ocultar pagas"}
        </button>
      </div>
      <div className="divide-y divide-[#ede9e0] bg-white">
        {visible.length === 0 ? (
          <p className="px-4 py-6 text-center text-[0.85rem] text-[#7a7a7a]">
            Nenhuma parcela nesta vista.
          </p>
        ) : (
          visible.map((p) => {
            const pending = isBillingPendingPayment(p.status);
            const active = selectedId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                disabled={!pending}
                onClick={() => pending && onSelect(p.id)}
                className={`flex w-full flex-col gap-1 px-4 py-3 text-left transition ${
                  pending
                    ? active
                      ? "bg-[#f0f9f3] ring-2 ring-[#1a3a2a]/25 ring-inset"
                      : "hover:bg-[#fafaf8]"
                    : "cursor-default opacity-70"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[0.95rem] font-extrabold text-[#1a3a2a]">
                    {centsToBrl(p.valueCents)}
                  </span>
                  <span
                    className={`rounded px-2 py-0.5 text-[0.6rem] font-bold uppercase ${
                      isBillingPaid(p.status)
                        ? "bg-emerald-100 text-emerald-900"
                        : p.status === "OVERDUE"
                          ? "bg-amber-100 text-amber-900"
                          : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    {statusLabel(p.status)}
                  </span>
                </div>
                <span className="text-[0.72rem] text-[#7a7a7a]">
                  {new Date(p.createdAt).toLocaleString("pt-BR")}
                  {p.description ? ` · ${p.description}` : ""}
                </span>
                {!pending ? (
                  <span className="text-[0.65rem] text-[#7a7a7a]">
                    Apenas cobranças em aberto podem ser pagas.
                  </span>
                ) : null}
              </button>
            );
          })
        )}
      </div>

      <div className="border-t border-[#ddd9d0] bg-[#f5f2ed] px-4 py-4 sm:px-6">
        <p className="text-[0.75rem] font-bold tracking-wide text-[#2d5a3d] uppercase">
          Nova cobrança PIX
        </p>
        <form onSubmit={onCreateSubmit} className="mt-3 flex flex-col gap-3">
          <label className="text-[0.8rem]">
            <span className="font-semibold text-[#4a4a4a]">Valor (R$)</span>
            <input
              value={valueReais}
              onChange={(e) => onValueReaisChange(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#ddd9d0] bg-white px-3 py-2 text-[#1c1c1c]"
              placeholder="10,00"
            />
          </label>
          <label className="text-[0.8rem]">
            <span className="font-semibold text-[#4a4a4a]">
              Descrição (opcional)
            </span>
            <input
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#ddd9d0] bg-white px-3 py-2"
            />
          </label>
          <label className="text-[0.8rem]">
            <span className="font-semibold text-[#4a4a4a]">
              CPF/CNPJ (Asaas, se necessário)
            </span>
            <input
              value={cpfCnpj}
              onChange={(e) => onCpfCnpjChange(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#ddd9d0] bg-white px-3 py-2"
              placeholder="Apenas dígitos ou com máscara"
            />
          </label>
          {createError ? (
            <p className="text-[0.8rem] text-red-700" role="alert">
              {createError}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={createPending}
            className="rounded-lg bg-[#1a3a2a] py-2.5 text-[0.8rem] font-bold text-white hover:bg-[#2d5a3d] disabled:opacity-60"
          >
            {createPending ? "A gerar cobrança…" : "Gerar cobrança PIX"}
          </button>
        </form>
      </div>
    </div>
  );
}
