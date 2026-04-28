"use client";

import { useCallback, useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Loader2,
  Zap,
} from "lucide-react";

import { api } from "~/trpc/react";

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const PAGE_SIZE = 50;

function defaultDueDateStr(year: number) {
  return `${year}-07-30`;
}

type PreviewJazigo = {
  id: string;
  codigo: string;
  valorMensalidadeCents: number;
  numeroContrato: string;
  customerNome: string;
  customerCpfCnpj: string;
};

export function FaturarClient() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [dueDateStr, setDueDateStr] = useState(defaultDueDateStr(currentYear));
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(0);
  const [confirming, setConfirming] = useState(false);
  const [done, setDone] = useState<{ created: number } | null>(null);

  const preview = api.admin.previewAnnualInvoices.useQuery({ year });

  const generate = api.admin.generateAnnualInvoices.useMutation({
    onSuccess: (data) => {
      setDone(data);
      setConfirming(false);
      setSelected(new Set());
      void preview.refetch();
    },
  });

  const jazigos = useMemo<PreviewJazigo[]>(
    () => preview.data?.jazigos ?? [],
    [preview.data?.jazigos],
  );
  const allIds = useMemo(() => jazigos.map((j) => j.id), [jazigos]);

  const pageJazigos = useMemo(
    () => jazigos.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [jazigos, page],
  );
  const totalPages = Math.max(1, Math.ceil(jazigos.length / PAGE_SIZE));

  const pageAllSelected =
    pageJazigos.length > 0 && pageJazigos.every((j) => selected.has(j.id));
  const pageIndeterminate =
    !pageAllSelected && pageJazigos.some((j) => selected.has(j.id));
  const allSelected = allIds.length > 0 && allIds.every((id) => selected.has(id));

  const selectedTotal = useMemo(
    () =>
      jazigos
        .filter((j) => selected.has(j.id))
        .reduce((acc, j) => acc + j.valorMensalidadeCents, 0),
    [jazigos, selected],
  );

  const setPageCheckboxIndeterminate = useCallback(
    (el: HTMLInputElement | null) => {
      if (el) el.indeterminate = pageIndeterminate;
    },
    [pageIndeterminate],
  );

  function handleYearChange(v: number) {
    setYear(v);
    setDueDateStr(defaultDueDateStr(v));
    setSelected(new Set());
    setPage(0);
    setDone(null);
    setConfirming(false);
  }

  function togglePageAll() {
    setSelected((prev) => {
      const next = new Set(prev);
      if (pageAllSelected) {
        pageJazigos.forEach((j) => next.delete(j.id));
      } else {
        pageJazigos.forEach((j) => next.add(j.id));
      }
      return next;
    });
  }

  function toggleAll() {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(allIds));
    }
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleGenerate() {
    const dueDate = new Date(`${dueDateStr}T12:00:00Z`);
    generate.mutate({
      year,
      // Se todos selecionados, omite a lista — o backend aplica o filtro completo.
      jazigoIds: allSelected ? undefined : [...selected],
      dueDate,
    });
  }

  const dueDateLabel = useMemo(() => {
    try {
      return new Date(`${dueDateStr}T12:00:00Z`).toLocaleDateString("pt-BR");
    } catch {
      return dueDateStr;
    }
  }, [dueDateStr]);

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6 lg:py-8">
      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold text-jardim-green-dark sm:text-xl">
          Gerar faturas anuais
        </h1>
        <p className="mt-1 text-sm leading-relaxed text-jardim-text-muted">
          Selecione os jazigos e a data de vencimento. Apenas jazigos com contrato
          ativo e sem fatura no ano escolhido são exibidos.
        </p>
      </div>

      {/* Controles + tabela */}
      <section className="overflow-hidden rounded-2xl border border-jardim-border bg-jardim-white shadow-sm">
        {/* Filtros */}
        <div className="grid gap-4 border-b border-jardim-border bg-jardim-cream/50 px-4 py-4 sm:grid-cols-2 sm:px-6">
          <div>
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
                if (v >= 2020 && v <= 2100) handleYearChange(v);
              }}
              className="mt-1 w-28 rounded-xl border border-jardim-border bg-jardim-white px-3 py-2 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
            />
          </div>
          <div>
            <label
              htmlFor="faturar-due"
              className="block text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted"
            >
              Data de vencimento
            </label>
            <input
              id="faturar-due"
              type="date"
              value={dueDateStr}
              onChange={(e) => {
                if (e.target.value) {
                  setDueDateStr(e.target.value);
                  setDone(null);
                  setConfirming(false);
                }
              }}
              className="mt-1 rounded-xl border border-jardim-border bg-jardim-white px-3 py-2 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
            />
          </div>
        </div>

        {/* Barra de seleção */}
        {jazigos.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-jardim-border bg-jardim-cream/20 px-4 py-2.5 sm:px-6">
            <p className="text-sm text-jardim-text-muted">
              <span className="font-bold text-jardim-green-dark tabular-nums">
                {selected.size}
              </span>{" "}
              de{" "}
              <span className="font-bold tabular-nums">{jazigos.length}</span>{" "}
              selecionados
              {selected.size > 0 && (
                <span className="ml-2 text-jardim-text">
                  —{" "}
                  <span className="font-semibold">
                    {brl.format(selectedTotal / 100)}
                  </span>
                </span>
              )}
            </p>
            <button
              type="button"
              onClick={toggleAll}
              className="rounded-lg border border-jardim-border bg-jardim-white px-3 py-1.5 text-sm font-medium text-jardim-text transition hover:bg-jardim-cream"
            >
              {allSelected ? "Desmarcar todos" : "Selecionar todos"}
            </button>
          </div>
        )}

        {/* Estado da query */}
        {preview.isLoading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-jardim-text-muted">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            A carregar jazigos…
          </div>
        ) : preview.error ? (
          <div className="m-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {preview.error.message}
          </div>
        ) : preview.data?.count === 0 ? (
          <div className="m-4 flex items-start gap-2 rounded-xl border border-jardim-green-mid/30 bg-jardim-green-mid/5 px-4 py-3 text-sm text-jardim-green-dark">
            <CheckCircle2
              className="mt-0.5 h-4 w-4 shrink-0 text-jardim-green-mid"
              aria-hidden
            />
            Todos os jazigos ativos já têm fatura para {year}.
          </div>
        ) : (
          /* Tabela */
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-jardim-border bg-jardim-cream/30">
                  <th className="w-10 px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={pageAllSelected}
                      ref={setPageCheckboxIndeterminate}
                      onChange={togglePageAll}
                      title="Selecionar/desmarcar página"
                      className="h-4 w-4 cursor-pointer rounded border-jardim-border accent-jardim-green-dark"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
                    Jazigo
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
                    Cliente
                  </th>
                  <th className="hidden px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted sm:table-cell">
                    Contrato
                  </th>
                  <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
                    Valor / ano
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-jardim-border">
                {pageJazigos.map((j) => {
                  const isSelected = selected.has(j.id);
                  return (
                    <tr
                      key={j.id}
                      onClick={() => toggleOne(j.id)}
                      className={`cursor-pointer transition-colors hover:bg-jardim-cream/40 ${
                        isSelected ? "bg-jardim-green-mid/5" : ""
                      }`}
                    >
                      <td
                        className="px-4 py-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleOne(j.id)}
                          className="h-4 w-4 cursor-pointer rounded border-jardim-border accent-jardim-green-dark"
                        />
                      </td>
                      <td className="px-4 py-3 font-mono text-sm font-semibold text-jardim-green-dark">
                        {j.codigo}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-jardim-text">
                          {j.customerNome}
                        </p>
                        <p className="text-xs text-jardim-text-muted">
                          {j.customerCpfCnpj}
                        </p>
                      </td>
                      <td className="hidden px-4 py-3 tabular-nums text-jardim-text-muted sm:table-cell">
                        {j.numeroContrato}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums font-medium text-jardim-text">
                        {brl.format(j.valorMensalidadeCents / 100)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-jardim-border px-4 py-3 sm:px-6">
            <span className="text-sm text-jardim-text-muted">
              Página{" "}
              <span className="font-semibold tabular-nums">{page + 1}</span> de{" "}
              <span className="tabular-nums">{totalPages}</span>
              <span className="ml-1 text-jardim-text-muted/70">
                ({jazigos.length} jazigos)
              </span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
                className="inline-flex items-center gap-1 rounded-xl border border-jardim-border bg-jardim-white px-3 py-1.5 text-sm font-medium text-jardim-text transition hover:bg-jardim-cream disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden />
                Anterior
              </button>
              <button
                type="button"
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
                className="inline-flex items-center gap-1 rounded-xl border border-jardim-border bg-jardim-white px-3 py-1.5 text-sm font-medium text-jardim-text transition hover:bg-jardim-cream disabled:opacity-40"
              >
                Próxima
                <ChevronRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Painel de ação */}
      {preview.data && preview.data.count > 0 && !done && (
        <div className="rounded-2xl border border-jardim-border bg-jardim-white px-5 py-4 shadow-sm">
          {!confirming ? (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-jardim-text-muted">
                {selected.size === 0 ? (
                  "Selecione ao menos um jazigo para gerar faturas."
                ) : (
                  <>
                    Gerar{" "}
                    <strong className="text-jardim-text">
                      {selected.size}{" "}
                      {selected.size === 1 ? "fatura" : "faturas"}
                    </strong>{" "}
                    com vencimento em{" "}
                    <strong className="text-jardim-text">{dueDateLabel}</strong>{" "}
                    —{" "}
                    <strong className="text-jardim-text">
                      {brl.format(selectedTotal / 100)}
                    </strong>
                  </>
                )}
              </p>
              <button
                type="button"
                disabled={selected.size === 0 || generate.isPending}
                onClick={() => setConfirming(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-jardim-green-dark px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-jardim-green-mid disabled:opacity-40"
              >
                <FileText className="h-4 w-4" aria-hidden />
                Gerar {selected.size > 0 && `${selected.size} `}
                {selected.size === 1 ? "fatura" : "faturas"}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-medium text-jardim-text">
                Confirmar geração de{" "}
                <strong>
                  {selected.size} {selected.size === 1 ? "fatura" : "faturas"}
                </strong>{" "}
                com vencimento em <strong>{dueDateLabel}</strong>? Total:{" "}
                <strong>{brl.format(selectedTotal / 100)}</strong>
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={generate.isPending}
                  onClick={handleGenerate}
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
              {generate.error && (
                <p
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                  role="alert"
                >
                  {generate.error.message}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Resultado */}
      {done && (
        <div className="flex items-start gap-3 rounded-2xl border border-jardim-green-mid/30 bg-jardim-green-mid/5 px-5 py-4">
          <CheckCircle2
            className="mt-0.5 h-5 w-5 shrink-0 text-jardim-green-mid"
            aria-hidden
          />
          <div>
            <p className="text-sm font-semibold text-jardim-green-dark">
              {done.created === 0
                ? "Nenhuma fatura nova gerada."
                : `${done.created} ${done.created === 1 ? "fatura gerada" : "faturas geradas"} com sucesso.`}
            </p>
            <p className="mt-0.5 text-xs text-jardim-text-muted">
              As cobranças ficam pendentes até o titular iniciar o pagamento no
              portal.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
