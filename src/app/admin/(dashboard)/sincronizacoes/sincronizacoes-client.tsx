"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, RefreshCw } from "lucide-react";

import {
  syncLogStatusBadgeClass,
  syncLogStatusLabel,
} from "~/lib/sync-log-ui";
import { api } from "~/trpc/react";

type SyncRow = {
  id: string;
  jobName: string;
  status: string;
  registrosNovos: number;
  registrosAtualizados: number;
  falhas: number;
  dataInicio: Date;
  dataFim: Date | null;
  erroDetalhes: unknown;
};

/**
 * Histórico de execuções do job de sincronização (SQL Server → Postgres).
 */
export function SincronizacoesClient() {
  const [page, setPage] = useState(0);
  const [merged, setMerged] = useState<SyncRow[]>([]);

  const query = api.admin.listSyncLogs.useQuery({
    limit: 50,
    page,
    allJobs: false,
  });

  useEffect(() => {
    if (!query.data?.items) return;
    setMerged((prev) => {
      if (page === 0) {
        return query.data.items;
      }
      const ids = new Set(prev.map((r) => r.id));
      const extra = query.data.items.filter((r) => !ids.has(r.id));
      return [...prev, ...extra];
    });
  }, [query.data, page]);

  const handleLoadMore = () => {
    if (query.data?.nextPage == null) return;
    setPage(query.data.nextPage);
  };

  const showLoading = query.isLoading && page === 0;
  const showTableLoadingMore = query.isFetching && page > 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-jardim-green-dark sm:text-xl">
          Sincronizações
        </h1>
        <p className="mt-1 text-sm text-jardim-text-muted">
          Histórico de execuções do job SQL Server → Postgres (tabela{" "}
          <code className="rounded bg-jardim-cream px-1 text-xs">sync_logs</code>
          ).
        </p>
        <div className="mt-4 rounded-xl border border-jardim-border bg-jardim-cream/60 p-4 text-xs leading-relaxed text-jardim-text-muted">
          <p>
            <strong className="text-jardim-text">Como corre:</strong> o processo
            pesado pode ser executado localmente com{" "}
            <code className="rounded bg-jardim-white px-1 font-mono">
              npm run job:sync
            </code>{" "}
            ou agendado via cron em{" "}
            <code className="rounded bg-jardim-white px-1 font-mono">
              /api/cron/sync-sqlserver
            </code>{" "}
            (configure o segredo e variáveis MSSQL no ambiente).
          </p>
          <p className="mt-2">
            Esta página apenas mostra o histórico; não dispara sincronização.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-jardim-border bg-jardim-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead>
              <tr className="border-b border-jardim-border bg-jardim-cream/80 text-[11px] font-semibold uppercase tracking-wider text-jardim-text-muted">
                <th className="w-10 px-2 py-3 sm:px-3" aria-hidden />
                <th className="px-2 py-3 sm:px-3">Início</th>
                <th className="px-2 py-3 sm:px-3">Fim</th>
                <th className="px-2 py-3 sm:px-3">Job</th>
                <th className="px-2 py-3 sm:px-3">Estado</th>
                <th className="px-2 py-3 text-right sm:px-3">Novos</th>
                <th className="px-2 py-3 text-right sm:px-3">Atual.</th>
                <th className="px-2 py-3 text-right sm:px-3">Falhas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-jardim-border">
              {showLoading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-12 text-center text-jardim-text-muted"
                  >
                    A carregar…
                  </td>
                </tr>
              ) : query.isError ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-12 text-center text-red-800"
                  >
                    Não foi possível carregar o histórico. Tente novamente.
                  </td>
                </tr>
              ) : merged.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-14 text-center">
                    <RefreshCw
                      className="mx-auto mb-2 h-10 w-10 text-jardim-border"
                      aria-hidden
                    />
                    <p className="font-medium text-jardim-text-muted">
                      Nenhuma execução registada
                    </p>
                    <p className="mt-1 text-xs text-jardim-text-light">
                      Execute o job de sincronização para ver entradas aqui.
                    </p>
                  </td>
                </tr>
              ) : (
                merged.map((row) => <SyncLogRow key={row.id} row={row} />)
              )}
            </tbody>
          </table>
        </div>
        {showTableLoadingMore ? (
          <p className="border-t border-jardim-border py-3 text-center text-xs text-jardim-text-muted">
            A carregar mais…
          </p>
        ) : null}
        {query.data?.nextPage != null ? (
          <div className="border-t border-jardim-border p-4 text-center">
            <button
              type="button"
              className="rounded-xl border border-jardim-border bg-jardim-white px-4 py-2 text-sm font-medium text-jardim-green-dark transition-colors hover:bg-jardim-cream"
              onClick={handleLoadMore}
              disabled={query.isFetching}
            >
              Carregar mais
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SyncLogRow({ row }: { row: SyncRow }) {
  const [open, setOpen] = useState(false);
  const hasDetails =
    row.erroDetalhes != null &&
    (Array.isArray(row.erroDetalhes)
      ? row.erroDetalhes.length > 0
      : typeof row.erroDetalhes === "object"
        ? Object.keys(row.erroDetalhes as object).length > 0
        : true);

  return (
    <>
      <tr className="transition-colors hover:bg-jardim-cream/50">
        <td className="px-2 py-3 sm:px-3">
          {hasDetails || row.status === "FALHA" ? (
            <button
              type="button"
              className="rounded-lg p-1 text-jardim-green-mid hover:bg-jardim-cream"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Ocultar detalhes" : "Ver detalhes"}
            >
              {open ? (
                <ChevronDown className="h-4 w-4" aria-hidden />
              ) : (
                <ChevronRight className="h-4 w-4" aria-hidden />
              )}
            </button>
          ) : (
            <span className="inline-block w-6" aria-hidden />
          )}
        </td>
        <td className="whitespace-nowrap px-2 py-3 tabular-nums text-jardim-text sm:px-3">
          {new Date(row.dataInicio).toLocaleString("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
          })}
        </td>
        <td className="whitespace-nowrap px-2 py-3 tabular-nums text-jardim-text-muted sm:px-3">
          {row.dataFim
            ? new Date(row.dataFim).toLocaleString("pt-BR", {
                dateStyle: "short",
                timeStyle: "short",
              })
            : "—"}
        </td>
        <td className="max-w-[200px] truncate px-2 py-3 font-mono text-xs text-jardim-text sm:px-3">
          {row.jobName}
        </td>
        <td className="px-2 py-3 sm:px-3">
          <span className={syncLogStatusBadgeClass(row.status)}>
            {syncLogStatusLabel(row.status)}
          </span>
        </td>
        <td className="px-2 py-3 text-right tabular-nums sm:px-3">
          {row.registrosNovos}
        </td>
        <td className="px-2 py-3 text-right tabular-nums sm:px-3">
          {row.registrosAtualizados}
        </td>
        <td className="px-2 py-3 text-right tabular-nums sm:px-3">
          {row.falhas}
        </td>
      </tr>
      {open && (hasDetails || row.status === "FALHA") ? (
        <tr className="bg-jardim-cream/40">
          <td colSpan={8} className="px-4 py-3 sm:px-5">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-jardim-text-muted">
              Detalhes
            </p>
            <pre className="max-h-48 overflow-auto rounded-lg border border-jardim-border bg-jardim-white p-3 text-left text-xs text-jardim-text">
              {row.erroDetalhes != null
                ? JSON.stringify(row.erroDetalhes, null, 2)
                : "(Sem detalhes de erro registados)"}
            </pre>
          </td>
        </tr>
      ) : null}
    </>
  );
}
