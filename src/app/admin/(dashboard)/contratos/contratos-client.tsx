"use client";

import Link from "next/link";
import {
  useDeferredValue,
  useMemo,
  useState,
} from "react";
import {
  ArrowUpRight,
  FileText,
  Filter,
  Loader2,
  Search,
  X,
} from "lucide-react";

import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type Situacao =
  | "ATIVO"
  | "INATIVO"
  | "QUITADO"
  | "RESCINDIDO"
  | "SUSPENSO"
  | "TRANSFERIDO";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtDate(d: Date | string | null | undefined) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("pt-BR");
}

function fmtCpf(cpf: string | null | undefined) {
  if (!cpf) return "—";
  const d = cpf.replace(/\D/g, "");
  if (d.length === 11) return d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  if (d.length === 14) return d.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  return cpf;
}

// ─── Situação badge ───────────────────────────────────────────────────────────

const SITUACAO_CFG: Record<Situacao, { label: string; cls: string }> = {
  ATIVO:       { label: "Ativo",       cls: "bg-green-50 text-green-700" },
  INATIVO:     { label: "Inativo",     cls: "bg-gray-100 text-gray-600" },
  QUITADO:     { label: "Quitado",     cls: "bg-blue-50 text-blue-700" },
  RESCINDIDO:  { label: "Rescindido",  cls: "bg-red-50 text-red-700" },
  SUSPENSO:    { label: "Suspenso",    cls: "bg-amber-50 text-amber-700" },
  TRANSFERIDO: { label: "Transferido", cls: "bg-purple-50 text-purple-700" },
};

function SituacaoBadge({ situacao }: { situacao: Situacao }) {
  const cfg = SITUACAO_CFG[situacao] ?? { label: situacao, cls: "bg-gray-100 text-gray-600" };
  return (
    <span className={cn("inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold", cfg.cls)}>
      {cfg.label}
    </span>
  );
}

// ─── Filter chips ─────────────────────────────────────────────────────────────

function Chips<T>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T | undefined; label: string }[];
  value: T | undefined;
  onChange: (v: T | undefined) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
        {label}
      </span>
      {options.map((o) => (
        <button
          key={String(o.label)}
          type="button"
          onClick={() => onChange(o.value === value ? undefined : o.value)}
          className={cn(
            "rounded-lg border px-2.5 py-1 text-xs font-medium transition",
            o.value === value
              ? "border-jardim-green-dark bg-jardim-green-dark text-white"
              : "border-jardim-border bg-jardim-cream/50 text-jardim-text-muted hover:bg-jardim-cream",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ContratosClient() {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search.trim());

  const [situacao, setSituacao] = useState<Situacao | undefined>();
  const [comResponsavel, setComResponsavel] = useState<boolean | undefined>();

  const hasFilters = situacao !== undefined || comResponsavel !== undefined;

  function clearFilters() {
    setSituacao(undefined);
    setComResponsavel(undefined);
  }

  const queryInput = {
    limit: 40,
    search: deferredSearch.length >= 2 ? deferredSearch : undefined,
    situacao,
    comResponsavel,
  };

  const q = api.admin.listContratos.useInfiniteQuery(queryInput, {
    getNextPageParam: (last) => last.nextCursor,
  });

  const rows = useMemo(
    () => q.data?.pages.flatMap((p) => p.items) ?? [],
    [q.data?.pages],
  );

  const SITUACAO_OPTIONS: { value: Situacao | undefined; label: string }[] = [
    { value: undefined,     label: "Todas" },
    { value: "ATIVO",       label: "Ativo" },
    { value: "INATIVO",     label: "Inativo" },
    { value: "QUITADO",     label: "Quitado" },
    { value: "RESCINDIDO",  label: "Rescindido" },
    { value: "SUSPENSO",    label: "Suspenso" },
    { value: "TRANSFERIDO", label: "Transferido" },
  ];

  const RESP_OPTIONS: { value: boolean | undefined; label: string }[] = [
    { value: undefined, label: "Todos" },
    { value: true,      label: "Com resp. financeiro" },
    { value: false,     label: "Sem resp. financeiro" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-jardim-green-dark sm:text-xl">
            Contratos
          </h1>
          <p className="mt-1 text-sm text-jardim-text-muted">
            Concessões sincronizadas do SQL Server. Um contrato agrupa jazigos e
            define o titular. O responsável financeiro pode ser diferente do titular.
          </p>
        </div>
        <div className="relative w-full max-w-sm">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-jardim-text-light"
            aria-hidden
          />
          <input
            type="search"
            className="w-full rounded-xl border border-jardim-border bg-jardim-white py-2.5 pl-10 pr-3 text-sm text-jardim-text placeholder:text-jardim-text-light focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
            placeholder="Nº contrato, titular, CPF… (mín. 2 car.)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Pesquisar contratos"
          />
        </div>
      </div>

      {/* Filter bar */}
      <div className="mb-4 rounded-xl border border-jardim-border bg-jardim-cream/40 px-4 py-3">
        <div className="flex flex-wrap items-start gap-y-3 gap-x-6">
          <div className="flex items-center gap-2 text-jardim-text-muted">
            <Filter className="h-3.5 w-3.5" aria-hidden />
            <span className="text-[11px] font-semibold uppercase tracking-wide">
              Filtros
            </span>
          </div>

          <Chips
            label="Situação"
            options={SITUACAO_OPTIONS}
            value={situacao}
            onChange={setSituacao}
          />

          <Chips
            label="Responsável"
            options={RESP_OPTIONS}
            value={comResponsavel}
            onChange={setComResponsavel}
          />

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="ml-auto inline-flex items-center gap-1 rounded-lg border border-jardim-border bg-jardim-white px-2.5 py-1 text-xs font-medium text-jardim-text-muted transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <X className="h-3 w-3" aria-hidden />
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-jardim-border bg-jardim-white shadow-sm">
        <div className="overflow-x-auto">
          {q.isLoading ? (
            <div className="flex items-center justify-center gap-2 px-4 py-16 text-sm text-jardim-text-muted">
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
              A carregar contratos…
            </div>
          ) : rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
              <FileText className="mb-3 h-10 w-10 text-jardim-border" aria-hidden />
              <p className="font-medium text-jardim-text-muted">
                Nenhum contrato encontrado
              </p>
              <p className="mt-1 text-xs text-jardim-text-light">
                {deferredSearch.length >= 2 || hasFilters
                  ? "Tente outros termos ou limpe os filtros."
                  : "Ainda não há contratos sincronizados."}
              </p>
            </div>
          ) : (
            <>
              <table className="w-full min-w-[860px] text-left text-sm">
                <thead>
                  <tr className="border-b border-jardim-border bg-jardim-cream/80 text-[11px] font-semibold uppercase tracking-wider text-jardim-text-muted">
                    <th className="px-4 py-3 sm:px-5">Nº Contrato</th>
                    <th className="px-4 py-3 sm:px-5">Situação</th>
                    <th className="px-4 py-3 sm:px-5">Titular</th>
                    <th className="px-4 py-3 sm:px-5">CPF / CNPJ</th>
                    <th className="px-4 py-3 sm:px-5">Resp. financeiro</th>
                    <th className="px-4 py-3 text-center sm:px-5">Jazigos</th>
                    <th className="px-4 py-3 text-center sm:px-5">Cobranças</th>
                    <th className="px-4 py-3 sm:px-5">Sync</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-jardim-border">
                  {rows.map((c) => (
                    <tr
                      key={c.id}
                      className="transition-colors hover:bg-jardim-cream/50"
                    >
                      {/* Nº Contrato */}
                      <td className="whitespace-nowrap px-4 py-3.5 font-mono text-sm font-semibold text-jardim-green-dark sm:px-5">
                        {c.numeroContrato}
                      </td>

                      {/* Situação */}
                      <td className="whitespace-nowrap px-4 py-3.5 sm:px-5">
                        <SituacaoBadge situacao={c.situacao as Situacao} />
                      </td>

                      {/* Titular */}
                      <td className="max-w-[180px] px-4 py-3.5 sm:px-5">
                        <Link
                          href={`/admin/clientes/${c.titular.id}`}
                          title="Abrir ficha do titular"
                          className="group inline-flex max-w-full items-center gap-1 text-jardim-green-dark"
                        >
                          <span className="min-w-0 truncate font-medium underline-offset-2 group-hover:underline">
                            {c.titular.nome}
                          </span>
                          <ArrowUpRight
                            className="h-3.5 w-3.5 shrink-0 text-jardim-green-mid opacity-70 transition group-hover:opacity-100"
                            aria-hidden
                          />
                        </Link>
                      </td>

                      {/* CPF / CNPJ */}
                      <td className="whitespace-nowrap px-4 py-3.5 tabular-nums text-xs text-jardim-text-muted sm:px-5">
                        {fmtCpf(c.titular.cpfCnpj)}
                      </td>

                      {/* Responsável financeiro */}
                      <td className="max-w-[180px] px-4 py-3.5 sm:px-5">
                        {c.responsavelFinanceiro ? (
                          <div>
                            <p className="truncate text-sm text-jardim-text">
                              {c.responsavelFinanceiro.nome}
                            </p>
                            <p className="tabular-nums text-[11px] text-jardim-text-muted">
                              {fmtCpf(c.responsavelFinanceiro.cpfCnpj)}
                            </p>
                          </div>
                        ) : (
                          <span className="text-xs text-jardim-text-light">
                            Titular
                          </span>
                        )}
                      </td>

                      {/* Jazigos */}
                      <td className="whitespace-nowrap px-4 py-3.5 text-center sm:px-5">
                        {c.jazigosCount > 0 ? (
                          <span className="inline-block rounded-full bg-jardim-cream px-2 py-0.5 text-xs font-semibold tabular-nums text-jardim-green-dark ring-1 ring-jardim-border">
                            {c.jazigosCount}
                          </span>
                        ) : (
                          <span className="text-xs text-jardim-text-light">—</span>
                        )}
                      </td>

                      {/* Cobranças */}
                      <td className="whitespace-nowrap px-4 py-3.5 text-center tabular-nums text-jardim-text sm:px-5">
                        {c.pagamentosCount > 0 ? (
                          <span className="tabular-nums text-sm font-medium text-jardim-green-dark">
                            {c.pagamentosCount}
                          </span>
                        ) : (
                          <span className="text-xs text-jardim-text-light">—</span>
                        )}
                      </td>

                      {/* Sync */}
                      <td className="whitespace-nowrap px-4 py-3.5 tabular-nums text-xs text-jardim-text-muted sm:px-5">
                        {fmtDate(c.syncedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {q.hasNextPage && (
                <div className="border-t border-jardim-border px-4 py-4 text-center">
                  <button
                    type="button"
                    disabled={q.isFetchingNextPage}
                    className="inline-flex items-center gap-2 rounded-xl border border-jardim-border bg-jardim-cream/60 px-5 py-2.5 text-sm font-medium text-jardim-green-dark transition hover:bg-jardim-cream disabled:opacity-50"
                    onClick={() => void q.fetchNextPage()}
                  >
                    {q.isFetchingNextPage && (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    )}
                    Carregar mais
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {q.error && (
        <p className="mt-4 text-sm text-red-800" role="alert">
          {q.error.message}
        </p>
      )}
    </div>
  );
}
