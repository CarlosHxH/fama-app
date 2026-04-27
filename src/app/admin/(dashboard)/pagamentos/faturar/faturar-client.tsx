"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, FileText, Loader2, Zap } from "lucide-react";

import { api } from "~/trpc/react";

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function FaturarClient() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [confirming, setConfirming] = useState(false);
  const [done, setDone] = useState<{ created: number } | null>(null);

  const preview = api.admin.previewAnnualInvoices.useQuery({ year });

  const generate = api.admin.generateAnnualInvoices.useMutation({
    onSuccess: (data) => {
      setDone(data);
      setConfirming(false);
      void preview.refetch();
    },
  });

  const dueLabel = `30/07/${year}`;

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-6 sm:px-6 lg:py-8">
      <div>
        <h1 className="text-lg font-semibold text-jardim-green-dark sm:text-xl">
          Gerar faturas anuais
        </h1>
        <p className="mt-1 text-sm leading-relaxed text-jardim-text-muted">
          Cria cobranças de manutenção (sem débito Asaas) para todos os jazigos
          com contrato ativo que ainda não têm fatura no ano selecionado.
          Vencimento: {dueLabel}.
        </p>
      </div>

      <section className="overflow-hidden rounded-2xl border border-jardim-border bg-jardim-white shadow-sm">
        <div className="border-b border-jardim-border bg-jardim-cream/50 px-4 py-4 sm:px-6">
          <label
            htmlFor="faturar-year"
            className="block text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted"
          >
            Ano de referência
          </label>
          <input
            id="faturar-year"
            type="number"
            min={2020}
            max={2100}
            value={year}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (v >= 2020 && v <= 2100) {
                setYear(v);
                setDone(null);
                setConfirming(false);
              }
            }}
            className="mt-1 w-32 rounded-xl border border-jardim-border bg-jardim-white px-3 py-2 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
          />
        </div>

        <div className="px-4 py-6 sm:px-6">
          {preview.isLoading ? (
            <div className="flex items-center gap-2 text-sm text-jardim-text-muted">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              A verificar…
            </div>
          ) : preview.error ? (
            <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              {preview.error.message}
            </div>
          ) : preview.data ? (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <Stat
                  label="Jazigos sem fatura"
                  value={preview.data.count.toString()}
                />
                <Stat
                  label="Total a emitir"
                  value={brl.format(preview.data.totalValueCents / 100)}
                />
                <Stat label="Vencimento" value={dueLabel} />
              </div>

              {preview.data.count === 0 ? (
                <div className="flex items-start gap-2 rounded-xl border border-jardim-green-mid/30 bg-jardim-green-mid/5 px-4 py-3 text-sm text-jardim-green-dark">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-jardim-green-mid" aria-hidden />
                  Todos os jazigos ativos já têm fatura para {year}.
                </div>
              ) : !confirming ? (
                <button
                  type="button"
                  disabled={generate.isPending}
                  onClick={() => setConfirming(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-jardim-green-dark px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-jardim-green-mid disabled:opacity-50"
                >
                  <FileText className="h-4 w-4" aria-hidden />
                  Gerar {preview.data.count}{" "}
                  {preview.data.count === 1 ? "fatura" : "faturas"}
                </button>
              ) : (
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-medium text-jardim-text">
                    Confirmar geração de {preview.data.count}{" "}
                    {preview.data.count === 1 ? "fatura" : "faturas"} com
                    vencimento em {dueLabel}?
                  </span>
                  <button
                    type="button"
                    disabled={generate.isPending}
                    onClick={() => generate.mutate({ year })}
                    className="inline-flex items-center gap-2 rounded-xl bg-jardim-green-dark px-4 py-2 text-sm font-semibold text-white transition hover:bg-jardim-green-mid disabled:opacity-50"
                  >
                    {generate.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    ) : (
                      <Zap className="h-4 w-4" aria-hidden />
                    )}
                    Confirmar
                  </button>
                  <button
                    type="button"
                    disabled={generate.isPending}
                    onClick={() => setConfirming(false)}
                    className="inline-flex items-center rounded-xl border border-jardim-border bg-jardim-white px-4 py-2 text-sm font-medium text-jardim-text transition hover:bg-jardim-cream disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                </div>
              )}

              {generate.error ? (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
                  {generate.error.message}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      {done ? (
        <div className="flex items-start gap-3 rounded-2xl border border-jardim-green-mid/30 bg-jardim-green-mid/5 px-5 py-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-jardim-green-mid" aria-hidden />
          <div>
            <p className="text-sm font-semibold text-jardim-green-dark">
              {done.created === 0
                ? "Nenhuma fatura nova gerada."
                : `${done.created} ${done.created === 1 ? "fatura gerada" : "faturas geradas"} com sucesso.`}
            </p>
            <p className="mt-0.5 text-xs text-jardim-text-muted">
              As cobranças ficam pendentes até o titular iniciar o pagamento no portal.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-jardim-border bg-jardim-cream/40 px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
        {label}
      </p>
      <p className="mt-1 text-xl font-bold tabular-nums text-jardim-green-dark">
        {value}
      </p>
    </div>
  );
}
