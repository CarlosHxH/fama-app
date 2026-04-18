"use client";

import { useEffect, useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowUpRight,
  Filter,
  Loader2,
  Search,
  User,
  X,
} from "lucide-react";

import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";

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

// ─── Status badges ────────────────────────────────────────────────────────────

function AtivoTag({ ativo, bloqueado }: { ativo: boolean; bloqueado: boolean }) {
  if (!ativo)
    return (
      <span className="ml-1.5 inline-block rounded-full bg-red-50 px-1.5 py-0.5 text-[10px] font-semibold text-red-700">
        Inativa
      </span>
    );
  if (bloqueado)
    return (
      <span className="ml-1.5 inline-block rounded-full bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
        Bloqueada
      </span>
    );
  return null;
}

// ─── Main component ───────────────────────────────────────────────────────────

/**
 * Listagem de titulares (clientes) com pesquisa e filtros.
 * Aceita `?search=` na URL (ex.: link a partir do dashboard de cobranças).
 */
export function ClientesClient() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search.trim());

  useEffect(() => {
    const q = searchParams.get("search")?.trim();
    if (q) setSearch(q);
  }, [searchParams]);

  // Filters
  const [ativo, setAtivo] = useState<boolean | undefined>();
  const [primeiroAcesso, setPrimeiroAcesso] = useState<boolean | undefined>();
  const [comAsaas, setComAsaas] = useState<boolean | undefined>();

  const hasFilters =
    ativo !== undefined || primeiroAcesso !== undefined || comAsaas !== undefined;

  function clearFilters() {
    setAtivo(undefined);
    setPrimeiroAcesso(undefined);
    setComAsaas(undefined);
  }

  const queryInput = {
    limit: 40,
    search: deferredSearch.length >= 2 ? deferredSearch : undefined,
    ativo,
    primeiroAcesso,
    comAsaas,
  };

  const q = api.admin.listUsers.useInfiniteQuery(queryInput, {
    getNextPageParam: (last) => last.nextCursor,
  });

  const rows = useMemo(
    () => q.data?.pages.flatMap((p) => p.items) ?? [],
    [q.data?.pages],
  );

  const ATIVO_OPTIONS: { value: boolean | undefined; label: string }[] = [
    { value: undefined, label: "Todas" },
    { value: true, label: "Ativa" },
    { value: false, label: "Inativa" },
  ];

  const ACESSO_OPTIONS: { value: boolean | undefined; label: string }[] = [
    { value: undefined, label: "Todos" },
    { value: true, label: "Aguardando" },
    { value: false, label: "Configurado" },
  ];

  const ASAAS_OPTIONS: { value: boolean | undefined; label: string }[] = [
    { value: undefined, label: "Todos" },
    { value: true, label: "Integrado" },
    { value: false, label: "Sem integração" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-jardim-green-dark sm:text-xl">
            Clientes
          </h1>
          <p className="mt-1 text-sm text-jardim-text-muted">
            Titulares com conta no portal. Para telefones e observações, abra a
            ficha do cliente.
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
            placeholder="Nome, e-mail ou CPF… (mín. 2 car.)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Pesquisar clientes"
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
            label="Conta"
            options={ATIVO_OPTIONS}
            value={ativo}
            onChange={setAtivo}
          />

          <Chips
            label="Acesso portal"
            options={ACESSO_OPTIONS}
            value={primeiroAcesso}
            onChange={setPrimeiroAcesso}
          />

          <Chips
            label="Asaas"
            options={ASAAS_OPTIONS}
            value={comAsaas}
            onChange={setComAsaas}
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
              A carregar clientes…
            </div>
          ) : rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
              <User className="mb-3 h-10 w-10 text-jardim-border" aria-hidden />
              <p className="font-medium text-jardim-text-muted">
                Nenhum cliente encontrado
              </p>
              <p className="mt-1 text-xs text-jardim-text-light">
                {deferredSearch.length >= 2 || hasFilters
                  ? "Tente outros termos ou limpe os filtros."
                  : "Ainda não há titulares registados."}
              </p>
            </div>
          ) : (
            <>
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead>
                  <tr className="border-b border-jardim-border bg-jardim-cream/80 text-[11px] font-semibold uppercase tracking-wider text-jardim-text-muted">
                    <th className="px-4 py-3 sm:px-5">Titular</th>
                    <th className="px-4 py-3 sm:px-5">E-mail</th>
                    <th className="px-4 py-3 sm:px-5">CPF/CNPJ</th>
                    <th className="px-4 py-3 sm:px-5">Acesso</th>
                    <th className="px-4 py-3 sm:px-5">Asaas</th>
                    <th className="px-4 py-3 text-right sm:px-5">Telefones</th>
                    <th className="px-4 py-3 text-right sm:px-5">Cobranças</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-jardim-border">
                  {rows.map((u) => (
                    <tr
                      key={u.id}
                      className="transition-colors hover:bg-jardim-cream/50"
                    >
                      <td className="px-4 py-3.5 sm:px-5">
                        <Link
                          href={`/admin/clientes/${u.id}`}
                          title="Abrir ficha do cliente"
                          className="group inline-flex max-w-full items-center gap-1.5 font-medium text-jardim-green-dark"
                        >
                          <span className="min-w-0 truncate underline-offset-2 group-hover:underline">
                            {u.name ?? "—"}
                          </span>
                          <ArrowUpRight
                            className="h-3.5 w-3.5 shrink-0 text-jardim-green-mid opacity-70 transition group-hover:opacity-100"
                            aria-hidden
                          />
                        </Link>
                        <AtivoTag ativo={u.ativo} bloqueado={u.bloqueado} />
                      </td>
                      <td className="max-w-[180px] truncate px-4 py-3.5 text-jardim-text-muted sm:max-w-xs sm:px-5">
                        {u.email ?? "—"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 tabular-nums text-jardim-text sm:px-5">
                        {fmtCpf(u.cpfCnpj)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 sm:px-5">
                        {u.primeiroAcesso ? (
                          <span className="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
                            Aguardando
                          </span>
                        ) : (
                          <span className="inline-block rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-700">
                            Configurado
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-xs sm:px-5">
                        {u.asaasCustomerId ? (
                          <span className="inline-block rounded-full bg-jardim-cream px-2 py-0.5 text-jardim-green-mid ring-1 ring-jardim-border">
                            Ligado
                          </span>
                        ) : (
                          <span className="text-jardim-text-light">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-right tabular-nums text-jardim-text sm:px-5">
                        {u._count.phones}
                      </td>
                      <td className="px-4 py-3.5 text-right tabular-nums text-jardim-green-dark sm:px-5">
                        {u._count.billingPayments}
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
                    {q.isFetchingNextPage ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    ) : null}
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtCpf(cpf: string | null | undefined): string {
  if (!cpf) return "—";
  const d = cpf.replace(/\D/g, "");
  if (d.length === 11) return d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  if (d.length === 14) return d.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  return cpf;
}
