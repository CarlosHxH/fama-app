"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  useDeferredValue,
  useMemo,
  useState,
} from "react";
import {
  ArrowUpRight,
  Filter,
  Loader2,
  MapPin,
  Search,
  UserCog,
  X,
} from "lucide-react";

import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function canManageJazigoPayer(session: {
  user?: { accountKind?: string; role?: string; staffRole?: string | null };
}) {
  if (
    session.user?.accountKind !== "admin" ||
    session.user?.role !== "ADMIN"
  ) {
    return false;
  }
  const s = session.user.staffRole ?? "ATENDENTE";
  return s === "ADMIN" || s === "FINANCEIRO";
}

type Row = {
  id: string;
  codigo: string;
  responsavelLabel: string;
  responsavelFonte: "customer" | "contrato" | "titular";
  responsavelFinanceiroCustomer: {
    id: string;
    nome: string;
    cpfCnpj: string;
  } | null;
};

type SituacaoContrato =
  | "ATIVO"
  | "INATIVO"
  | "QUITADO"
  | "RESCINDIDO"
  | "SUSPENSO"
  | "TRANSFERIDO";

type ResponsavelFonte = "customer" | "contrato" | "titular";

// ─── Filter chip helpers ──────────────────────────────────────────────────────

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
          key={o.label}
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

export function JazigosClient() {
  const { data: session } = useSession();
  const finance = canManageJazigoPayer({ user: session?.user });

  // Search
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search.trim());

  // Filters
  const [situacao, setSituacao] = useState<SituacaoContrato | undefined>();
  const [fonte, setFonte] = useState<ResponsavelFonte | undefined>();
  const [gavetas, setGavetas] = useState<number | undefined>();

  const hasFilters =
    situacao !== undefined || fonte !== undefined || gavetas !== undefined;

  function clearFilters() {
    setSituacao(undefined);
    setFonte(undefined);
    setGavetas(undefined);
  }

  // Payer modal
  const [modalRow, setModalRow] = useState<Row | null>(null);
  const [payerSearch, setPayerSearch] = useState("");
  const deferredPayerSearch = useDeferredValue(payerSearch.trim());

  const queryInput = {
    limit: 40,
    search: deferredSearch.length >= 2 ? deferredSearch : undefined,
    situacaoContrato: situacao,
    responsavelFonte: fonte,
    gavetas,
  };

  const q = api.admin.listJazigos.useInfiniteQuery(queryInput, {
    getNextPageParam: (last) => last.nextCursor,
  });

  const payerQuery = api.admin.listUsers.useQuery(
    {
      limit: 25,
      search:
        deferredPayerSearch.length >= 2 ? deferredPayerSearch : undefined,
    },
    { enabled: Boolean(modalRow && finance) },
  );

  const setPayer = api.admin.setJazigoResponsavelFinanceiro.useMutation({
    onSuccess: async () => {
      await q.refetch();
      setModalRow(null);
      setPayerSearch("");
    },
  });

  const rows = useMemo(
    () => q.data?.pages.flatMap((p) => p.items) ?? [],
    [q.data?.pages],
  );

  const SITUACAO_OPTIONS: { value: SituacaoContrato | undefined; label: string }[] = [
    { value: undefined, label: "Todas" },
    { value: "ATIVO", label: "Ativo" },
    { value: "INATIVO", label: "Inativo" },
    { value: "QUITADO", label: "Quitado" },
    { value: "RESCINDIDO", label: "Rescindido" },
    { value: "SUSPENSO", label: "Suspenso" },
    { value: "TRANSFERIDO", label: "Transferido" },
  ];

  const FONTE_OPTIONS: { value: ResponsavelFonte | undefined; label: string }[] = [
    { value: undefined, label: "Todos" },
    { value: "customer", label: "Por jazigo" },
    { value: "contrato", label: "Contrato (sync)" },
    { value: "titular", label: "Titular" },
  ];

  const GAVETAS_OPTIONS: { value: number | undefined; label: string }[] = [
    { value: undefined, label: "Todas" },
    { value: 3, label: "3" },
    { value: 6, label: "6" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-jardim-green-dark sm:text-xl">
            Jazigos
          </h1>
          <p className="mt-1 text-sm text-jardim-text-muted">
            Concessões sincronizadas. Precedência do pagador:{" "}
            <strong className="font-medium text-jardim-green-dark">
              jazigo → contrato (sync) → titular
            </strong>
            .
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
            placeholder="Código, quadra, titular… (mín. 2 car.)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Pesquisar jazigos"
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
            label="Pagador"
            options={FONTE_OPTIONS}
            value={fonte}
            onChange={setFonte}
          />

          <Chips
            label="Gavetas"
            options={GAVETAS_OPTIONS}
            value={gavetas}
            onChange={setGavetas}
          />

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="ml-auto inline-flex items-center gap-1 rounded-lg border border-jardim-border bg-jardim-white px-2.5 py-1 text-xs font-medium text-jardim-text-muted transition hover:bg-red-50 hover:text-red-700 hover:border-red-200"
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
              A carregar jazigos…
            </div>
          ) : rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
              <MapPin className="mb-3 h-10 w-10 text-jardim-border" aria-hidden />
              <p className="text-sm font-medium text-jardim-text-muted">
                Nenhum jazigo encontrado
              </p>
              <p className="mt-1 text-xs text-jardim-text-light">
                {deferredSearch.length >= 2 || hasFilters
                  ? "Tente outros termos ou limpe os filtros."
                  : "Ainda não há jazigos registados."}
              </p>
            </div>
          ) : (
            <>
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead>
                  <tr className="border-b border-jardim-border bg-jardim-cream/80 text-[11px] font-semibold uppercase tracking-wider text-jardim-text-muted">
                    <th className="px-4 py-3 sm:px-5">Código</th>
                    <th className="px-4 py-3 sm:px-5">Quadra / setor</th>
                    <th className="px-4 py-3 sm:px-5">Gavetas</th>
                    <th className="px-4 py-3 sm:px-5">Mensalidade</th>
                    <th className="px-4 py-3 sm:px-5">Contrato</th>
                    <th className="px-4 py-3 sm:px-5">Situação</th>
                    <th className="px-4 py-3 sm:px-5">Titular</th>
                    <th className="px-4 py-3 sm:px-5">Pagador (Asaas)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-jardim-border">
                  {rows.map((j) => (
                    <tr
                      key={j.id}
                      className="transition-colors hover:bg-jardim-cream/50"
                    >
                      <td className="whitespace-nowrap px-4 py-3.5 font-mono text-sm font-medium tabular-nums text-jardim-green-dark sm:px-5">
                        <Link
                          href={`/admin/jazigos/${j.id}`}
                          title="Abrir detalhes do jazigo"
                          className="inline-flex items-center gap-1 underline-offset-2 hover:underline"
                        >
                          {j.codigo}
                          <ArrowUpRight
                            className="h-3 w-3 text-jardim-green-mid opacity-60 transition"
                            aria-hidden
                          />
                        </Link>
                      </td>
                      <td className="px-4 py-3.5 text-jardim-text sm:px-5">
                        <span className="text-jardim-text-muted">
                          {j.quadra ?? "—"}
                        </span>
                        <span className="text-jardim-text-light"> · </span>
                        <span className="text-jardim-text-muted">
                          {j.setor ?? "—"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 tabular-nums text-jardim-text sm:px-5">
                        {j.quantidadeGavetas}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 tabular-nums text-jardim-green-dark sm:px-5">
                        {brl.format(j.valorMensalidadeCents / 100)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 font-mono text-xs text-jardim-text-muted sm:px-5">
                        {j.numeroContrato}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 sm:px-5">
                        <SituacaoBadge situacao={j.situacaoContrato} />
                      </td>
                      <td className="max-w-[200px] px-4 py-3.5 sm:px-5">
                        <Link
                          href={`/admin/clientes/${j.customerId}`}
                          title="Abrir ficha do titular"
                          className="group inline-flex max-w-full items-center gap-1.5 text-jardim-green-dark"
                        >
                          <span className="min-w-0 truncate underline-offset-2 group-hover:underline">
                            {j.titularNome}
                          </span>
                          <ArrowUpRight
                            className="h-3.5 w-3.5 shrink-0 text-jardim-green-mid opacity-70 transition group-hover:opacity-100"
                            aria-hidden
                          />
                        </Link>
                      </td>
                      <td className="max-w-[220px] px-4 py-3.5 sm:px-5">
                        <div className="flex flex-col gap-1.5">
                          <span
                            className="truncate text-jardim-text"
                            title={j.responsavelLabel}
                          >
                            {j.responsavelLabel}
                          </span>
                          <span className="text-[10px] uppercase text-jardim-text-light">
                            {j.responsavelFonte === "customer"
                              ? "Por jazigo"
                              : j.responsavelFonte === "contrato"
                                ? "Contrato (sync)"
                                : "Titular"}
                          </span>
                          {finance ? (
                            <button
                              type="button"
                              onClick={() =>
                                setModalRow({
                                  id: j.id,
                                  codigo: j.codigo,
                                  responsavelLabel: j.responsavelLabel,
                                  responsavelFonte: j.responsavelFonte,
                                  responsavelFinanceiroCustomer:
                                    j.responsavelFinanceiroCustomer,
                                })
                              }
                              className="inline-flex max-w-fit items-center gap-1 rounded-lg border border-jardim-border bg-jardim-cream/60 px-2 py-1 text-[11px] font-medium text-jardim-green-dark transition hover:bg-jardim-cream"
                            >
                              <UserCog className="h-3 w-3" aria-hidden />
                              Definir pagador
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {q.hasNextPage ? (
                <div className="border-t border-jardim-border px-4 py-4 text-center sm:px-6">
                  <button
                    type="button"
                    className={cn(
                      "inline-flex items-center gap-2 rounded-xl border border-jardim-border bg-jardim-cream/60 px-5 py-2.5 text-sm font-medium text-jardim-green-dark transition hover:bg-jardim-cream disabled:opacity-50",
                    )}
                    disabled={q.isFetchingNextPage}
                    onClick={() => void q.fetchNextPage()}
                  >
                    {q.isFetchingNextPage ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    ) : null}
                    Carregar mais
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>

      {q.error ? (
        <p className="mt-4 text-sm text-red-800" role="alert">
          {q.error.message}
        </p>
      ) : null}

      {/* Payer modal */}
      {modalRow && finance ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
          role="dialog"
          aria-modal
          aria-labelledby="jazigo-payer-title"
        >
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-jardim-border bg-jardim-white p-5 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2
                  id="jazigo-payer-title"
                  className="text-base font-semibold text-jardim-green-dark"
                >
                  Pagador da manutenção — {modalRow.codigo}
                </h2>
                <p className="mt-1 text-xs text-jardim-text-muted">
                  Escolha outro registo em <strong>clientes</strong> (CPF único).
                  A mesma pessoa pode pagar vários jazigos. Remover volta ao
                  contrato/titular.
                </p>
              </div>
              <button
                type="button"
                className="rounded-lg p-1 text-jardim-text-muted hover:bg-jardim-cream"
                onClick={() => {
                  setModalRow(null);
                  setPayerSearch("");
                }}
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <label className="mt-4 block text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
              Pesquisar cliente (pagador)
            </label>
            <input
              className="mt-1 w-full rounded-xl border border-jardim-border px-3 py-2 text-sm"
              placeholder="Nome, e-mail ou CPF (mín. 2 caracteres)"
              value={payerSearch}
              onChange={(e) => setPayerSearch(e.target.value)}
              autoComplete="off"
            />

            <ul className="mt-3 max-h-48 divide-y divide-jardim-border overflow-y-auto rounded-xl border border-jardim-border bg-jardim-cream/30">
              {payerQuery.isLoading ? (
                <li className="p-3 text-center text-xs text-jardim-text-muted">
                  A carregar…
                </li>
              ) : (
                (payerQuery.data?.items ?? []).map((u) => (
                  <li key={u.id}>
                    <button
                      type="button"
                      className="flex w-full flex-col items-start px-3 py-2.5 text-left text-sm transition hover:bg-jardim-white"
                      onClick={() =>
                        setPayer.mutate({
                          jazigoId: modalRow.id,
                          responsavelCustomerId: u.id,
                        })
                      }
                      disabled={setPayer.isPending}
                    >
                      <span className="font-medium text-jardim-green-dark">
                        {u.name}
                      </span>
                      <span className="text-xs text-jardim-text-muted">
                        {u.email ?? "—"} · {u.cpfCnpj ?? "—"}
                      </span>
                    </button>
                  </li>
                ))
              )}
            </ul>

            {modalRow.responsavelFinanceiroCustomer ? (
              <button
                type="button"
                className="mt-4 w-full rounded-xl border border-jardim-border py-2.5 text-sm font-medium text-jardim-text-muted transition hover:bg-jardim-cream"
                onClick={() =>
                  setPayer.mutate({
                    jazigoId: modalRow.id,
                    responsavelCustomerId: null,
                  })
                }
                disabled={setPayer.isPending}
              >
                Remover pagador por jazigo
              </button>
            ) : null}

            {setPayer.error ? (
              <p className="mt-3 text-sm text-red-800">{setPayer.error.message}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

// ─── Situação badge ───────────────────────────────────────────────────────────

const SITUACAO_CFG: Record<
  SituacaoContrato,
  { label: string; cls: string }
> = {
  ATIVO: { label: "Ativo", cls: "bg-green-50 text-green-700" },
  INATIVO: { label: "Inativo", cls: "bg-gray-100 text-gray-600" },
  QUITADO: { label: "Quitado", cls: "bg-blue-50 text-blue-700" },
  RESCINDIDO: { label: "Rescindido", cls: "bg-red-50 text-red-700" },
  SUSPENSO: { label: "Suspenso", cls: "bg-amber-50 text-amber-700" },
  TRANSFERIDO: { label: "Transferido", cls: "bg-purple-50 text-purple-700" },
};

function SituacaoBadge({ situacao }: { situacao: SituacaoContrato }) {
  const cfg = SITUACAO_CFG[situacao] ?? { label: situacao, cls: "bg-gray-100 text-gray-600" };
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold",
        cfg.cls,
      )}
    >
      {cfg.label}
    </span>
  );
}
