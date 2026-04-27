"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import {
  ExternalLink,
  Filter,
  Loader2,
  Trash2,
  Users,
} from "lucide-react";

import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const STATUS_LABEL: Record<string, string> = {
  PENDENTE: "Em aberto",
  PAGO: "Recebido",
  ATRASADO: "Vencido",
  CANCELADO: "Cancelado",
  ESTORNADO: "Estornado",
};

function statusBadgeClass(status: string) {
  switch (status) {
    case "PAGO":
      return "bg-jardim-green-mid/12 text-jardim-green-dark ring-jardim-green-mid/25";
    case "PENDENTE":
      return "bg-jardim-cream-dark text-jardim-green-mid ring-jardim-border";
    case "ATRASADO":
      return "bg-red-50 text-red-800 ring-red-200";
    default:
      return "bg-jardim-cream-dark text-jardim-text-muted ring-jardim-border";
  }
}

/** Cobrança removível: criada manualmente e não quitada/estornada. */
function isDeletable(p: { sqlServerId: number | null; status: string }): boolean {
  return p.sqlServerId === null && p.status !== "PAGO" && p.status !== "ESTORNADO";
}

type PaymentBucket =
  | "all"
  | "overdue"
  | "pending"
  | "pending_current"
  | "received";
type DueWindow = "all" | "today" | "next_7_days" | "overdue_30_plus";

/**
 * Lista completa de cobranças com filtros e paginação infinita (admin).
 */
export function HistoricoPagamentosClient() {
  const [bucket, setBucket] = useState<PaymentBucket>("all");
  const [dueWindow, setDueWindow] = useState<DueWindow>("all");
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search.trim());
  const [dueFromStr, setDueFromStr] = useState("");
  const [dueToStr, setDueToStr] = useState("");
  /** ID da cobrança aguardando confirmação de remoção. */
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const { data: session } = useSession();
  const isAdmin = session?.user?.staffRole === "ADMIN";

  const hasCustomRange = Boolean(dueFromStr || dueToStr);
  const effectiveDueWindow = hasCustomRange ? ("all" as const) : dueWindow;

  const dueFrom = useMemo(() => {
    if (!dueFromStr) return undefined;
    const d = new Date(`${dueFromStr}T12:00:00`);
    return Number.isNaN(d.getTime()) ? undefined : d;
  }, [dueFromStr]);

  const dueTo = useMemo(() => {
    if (!dueToStr) return undefined;
    const d = new Date(`${dueToStr}T12:00:00`);
    return Number.isNaN(d.getTime()) ? undefined : d;
  }, [dueToStr]);

  const queryInput = {
    limit: 40,
    bucket,
    dueWindow: effectiveDueWindow,
    search: deferredSearch.length > 0 ? deferredSearch : undefined,
    dueFrom,
    dueTo,
  };

  const utils = api.useUtils();
  const payments = api.admin.listPayments.useInfiniteQuery(queryInput, {
    getNextPageParam: (last) => last.nextCursor,
  });

  const deletePayment = api.admin.deleteManualPayment.useMutation({
    onSuccess: () => {
      setConfirmDeleteId(null);
      void utils.admin.listPayments.invalidate();
    },
  });

  const rows = useMemo(
    () => payments.data?.pages.flatMap((p) => p.items) ?? [],
    [payments.data?.pages],
  );

  const isLoading = payments.isLoading;
  const isFetchingMore = payments.isFetchingNextPage;

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="max-w-3xl">
        <h1 className="text-lg font-semibold text-jardim-green-dark sm:text-xl">
          Histórico de pagamentos
        </h1>
        <p className="mt-1 text-sm leading-relaxed text-jardim-text-muted">
          Todas as cobranças registadas, com filtros por situação, vencimento e
          titular. Ordem: mais recentes primeiro.
        </p>
      </div>

      <section className="overflow-hidden rounded-2xl border border-jardim-border bg-jardim-white shadow-sm">
        <div className="border-b border-jardim-border bg-jardim-cream/50 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-jardim-green-dark">
            <Filter className="h-4 w-4 text-jardim-green-mid" aria-hidden />
            Filtros
          </div>
          <p className="mt-1 text-xs text-jardim-text-muted">
            Se definir datas de vencimento, a janela rápida (hoje, 7 dias, etc.)
            fica desativada para esse pedido.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
                Situação
              </label>
              <select
                className="mt-1 w-full rounded-xl border border-jardim-border bg-jardim-white px-3 py-2 text-sm text-jardim-text focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
                value={bucket}
                onChange={(e) => setBucket(e.target.value as PaymentBucket)}
              >
                <option value="all">Todas</option>
                <option value="overdue">Em atraso</option>
                <option value="pending">Pendentes (qualquer)</option>
                <option value="pending_current">Em dia (aberto)</option>
                <option value="received">Recebidas / quitadas</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
                Janela de vencimento
              </label>
              <select
                className="mt-1 w-full rounded-xl border border-jardim-border bg-jardim-white px-3 py-2 text-sm text-jardim-text focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25 disabled:cursor-not-allowed disabled:opacity-50"
                value={dueWindow}
                disabled={hasCustomRange}
                onChange={(e) => setDueWindow(e.target.value as DueWindow)}
              >
                <option value="all">Todas</option>
                <option value="today">Vence hoje</option>
                <option value="next_7_days">Próximos 7 dias</option>
                <option value="overdue_30_plus">Atrasados &gt; 30 dias</option>
              </select>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
                Pesquisar titular / Asaas
              </label>
              <input
                type="search"
                className="mt-1 w-full rounded-xl border border-jardim-border bg-jardim-white px-3 py-2 text-sm placeholder:text-jardim-text-light focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
                placeholder="Nome, e-mail, CPF ou ID Asaas"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoComplete="off"
                aria-label="Pesquisar cobranças"
              />
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="hist-due-from"
                className="block text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted"
              >
                Vencimento de
              </label>
              <input
                id="hist-due-from"
                type="date"
                className="mt-1 w-full rounded-xl border border-jardim-border bg-jardim-white px-3 py-2 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
                value={dueFromStr}
                onChange={(e) => setDueFromStr(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="hist-due-to"
                className="block text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted"
              >
                Vencimento até
              </label>
              <input
                id="hist-due-to"
                type="date"
                className="mt-1 w-full rounded-xl border border-jardim-border bg-jardim-white px-3 py-2 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
                value={dueToStr}
                onChange={(e) => setDueToStr(e.target.value)}
              />
            </div>
          </div>
          {hasCustomRange ? (
            <button
              type="button"
              className="mt-3 text-xs font-medium text-jardim-green-mid hover:underline"
              onClick={() => {
                setDueFromStr("");
                setDueToStr("");
              }}
            >
              Limpar datas
            </button>
          ) : null}
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm text-jardim-text-muted">
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
              A carregar…
            </div>
          ) : rows.length === 0 ? (
            <div className="px-5 py-14 text-center sm:px-6">
              <p className="text-sm font-medium text-jardim-text-muted">
                Nenhuma cobrança encontrada
              </p>
              <p className="mt-1 text-xs text-jardim-text-light">
                Ajuste os filtros ou o termo de pesquisa.
              </p>
            </div>
          ) : (
            <>
              <table className="w-full min-w-[880px] text-left text-sm">
                <thead>
                  <tr className="border-b border-jardim-border bg-jardim-cream/80 text-[11px] font-semibold uppercase tracking-wider text-jardim-text-muted">
                    <th className="px-4 py-3 sm:px-5">Criada em</th>
                    <th className="px-4 py-3 sm:px-5">Titular</th>
                    <th className="px-4 py-3 sm:px-5">Meio</th>
                    <th className="px-4 py-3 sm:px-5">Valor</th>
                    <th className="px-4 py-3 sm:px-5">Vencimento</th>
                    <th className="px-4 py-3 sm:px-5">Estado</th>
                    <th className="px-4 py-3 text-right sm:px-5">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-jardim-border">
                  {rows.map((p) => {
                    const isConfirming = confirmDeleteId === p.id;
                    const isDeleting = deletePayment.isPending && confirmDeleteId === p.id;

                    return (
                      <tr
                        key={p.id}
                        className={cn(
                          "transition-colors hover:bg-jardim-cream/50",
                          isConfirming && "bg-red-50 hover:bg-red-50",
                        )}
                      >
                        <td className="whitespace-nowrap px-4 py-3 text-jardim-text-muted sm:px-5">
                          {new Date(p.createdAt).toLocaleString("pt-BR", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </td>
                        <td className="max-w-[220px] px-4 py-3 sm:px-5">
                          <span className="block truncate font-medium text-jardim-text">
                            {p.user.name ?? p.user.email ?? "—"}
                          </span>
                          {p.user.cpfCnpj ? (
                            <span className="block truncate text-[11px] text-jardim-text-muted">
                              {p.user.cpfCnpj}
                            </span>
                          ) : null}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-xs text-jardim-text-muted sm:px-5">
                          {p.paymentMethod ?? "—"}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 tabular-nums text-jardim-green-dark sm:px-5">
                          {brl.format(p.valueCents / 100)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-jardim-text sm:px-5">
                          {new Date(p.dataVencimento).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="px-4 py-3 sm:px-5">
                          <span
                            className={cn(
                              "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
                              statusBadgeClass(p.status),
                            )}
                          >
                            {STATUS_LABEL[p.status] ?? p.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right sm:px-5">
                          {isConfirming ? (
                            <div className="flex items-center justify-end gap-2">
                              <span className="text-xs font-medium text-red-700">
                                Remover cobrança?
                              </span>
                              <button
                                type="button"
                                disabled={isDeleting}
                                onClick={() =>
                                  deletePayment.mutate({ id: p.id })
                                }
                                className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                              >
                                {isDeleting ? (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                ) : null}
                                Confirmar
                              </button>
                              <button
                                type="button"
                                disabled={isDeleting}
                                onClick={() => setConfirmDeleteId(null)}
                                className="inline-flex items-center rounded-lg border border-jardim-border bg-jardim-white px-2.5 py-1.5 text-xs font-medium text-jardim-text transition hover:bg-jardim-cream"
                              >
                                Cancelar
                              </button>
                            </div>
                          ) : (
                            <div className="flex flex-wrap items-center justify-end gap-2">
                              {p.invoiceUrl ? (
                                <a
                                  href={p.invoiceUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 rounded-lg border border-jardim-border bg-jardim-white px-2.5 py-1.5 text-xs font-medium text-jardim-green-dark transition hover:bg-jardim-cream"
                                >
                                  <ExternalLink
                                    className="h-3.5 w-3.5 shrink-0"
                                    aria-hidden
                                  />
                                  Fatura
                                </a>
                              ) : null}
                              <Link
                                href={`/admin/clientes/${p.customerId}`}
                                className="inline-flex items-center gap-1 rounded-lg border border-jardim-border bg-jardim-white px-2.5 py-1.5 text-xs font-medium text-jardim-green-dark transition hover:bg-jardim-cream"
                              >
                                <Users className="h-3.5 w-3.5 shrink-0" aria-hidden />
                                Cliente
                              </Link>
                              {isAdmin && isDeletable(p) ? (
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteId(p.id)}
                                  title="Remover cobrança"
                                  className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100"
                                >
                                  <Trash2 className="h-3.5 w-3.5 shrink-0" aria-hidden />
                                  Remover
                                </button>
                              ) : null}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {payments.hasNextPage ? (
                <div className="border-t border-jardim-border px-4 py-4 text-center sm:px-6">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl border border-jardim-border bg-jardim-cream/60 px-5 py-2.5 text-sm font-medium text-jardim-green-dark transition hover:bg-jardim-cream disabled:opacity-50"
                    disabled={isFetchingMore}
                    onClick={() => void payments.fetchNextPage()}
                  >
                    {isFetchingMore ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    ) : null}
                    Carregar mais
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>

      {deletePayment.error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {deletePayment.error.message}
        </p>
      ) : null}

      {payments.error ? (
        <p className="text-sm text-red-800" role="alert">
          {payments.error.message}
        </p>
      ) : null}
    </div>
  );
}
