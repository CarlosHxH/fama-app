"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  useDeferredValue,
  useMemo,
  useState,
} from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowUpRight,
  Ban,
  CheckCircle2,
  ChevronDown,
  Clock,
  Edit3,
  ExternalLink,
  Loader2,
  MapPin,
  RefreshCw,
  Save,
  UserCog,
  X,
} from "lucide-react";

import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";

// ─── Formatters ──────────────────────────────────────────────────────────────

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
const fmt = (cents: number) => brl.format(cents / 100);

function fmtDate(d: Date | string | null | undefined): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("pt-BR");
}

function fmtCpf(cpf: string | null | undefined): string {
  if (!cpf) return "—";
  const d = cpf.replace(/\D/g, "");
  if (d.length === 11)
    return d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  if (d.length === 14)
    return d.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  return cpf;
}

// ─── Status helpers ───────────────────────────────────────────────────────────

type StatusPagamento =
  | "PENDENTE"
  | "PAGO"
  | "ATRASADO"
  | "CANCELADO"
  | "ESTORNADO";

const STATUS_CONFIG: Record<
  StatusPagamento,
  { label: string; cls: string; Icon: React.ElementType }
> = {
  PENDENTE: {
    label: "Pendente",
    cls: "text-amber-700 bg-amber-50 border-amber-200",
    Icon: Clock,
  },
  PAGO: {
    label: "Pago",
    cls: "text-green-700 bg-green-50 border-green-200",
    Icon: CheckCircle2,
  },
  ATRASADO: {
    label: "Atrasado",
    cls: "text-red-700 bg-red-50 border-red-200",
    Icon: AlertCircle,
  },
  CANCELADO: {
    label: "Cancelado",
    cls: "text-gray-500 bg-gray-50 border-gray-200",
    Icon: Ban,
  },
  ESTORNADO: {
    label: "Estornado",
    cls: "text-purple-700 bg-purple-50 border-purple-200",
    Icon: RefreshCw,
  },
};

function StatusBadge({ status }: { status: StatusPagamento }) {
  const { label, cls, Icon } = STATUS_CONFIG[status] ?? STATUS_CONFIG.PENDENTE;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold",
        cls,
      )}
    >
      <Icon className="h-3 w-3" aria-hidden />
      {label}
    </span>
  );
}

// ─── Permission helper ────────────────────────────────────────────────────────

function canFinance(session: {
  user?: { accountKind?: string; role?: string; staffRole?: string | null };
}) {
  if (
    session.user?.accountKind !== "admin" ||
    session.user?.role !== "ADMIN"
  )
    return false;
  const s = session.user.staffRole ?? "ATENDENTE";
  return s === "ADMIN" || s === "FINANCEIRO";
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  label,
  count,
  valueCents,
  status,
  active,
  onClick,
}: {
  label: string;
  count: number;
  valueCents: number;
  status: StatusPagamento | "TODOS";
  active: boolean;
  onClick: () => void;
}) {
  const cfg =
    status !== "TODOS"
      ? STATUS_CONFIG[status]
      : null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full flex-col gap-0.5 rounded-xl border px-4 py-3 text-left transition",
        active
          ? "border-jardim-green-mid bg-jardim-cream ring-1 ring-jardim-green-mid/30"
          : "border-jardim-border bg-jardim-white hover:bg-jardim-cream/50",
      )}
    >
      <span className="text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
        {label}
      </span>
      <span className="text-xl font-bold tabular-nums text-jardim-green-dark">
        {count}
      </span>
      {valueCents > 0 && (
        <span
          className={cn(
            "text-xs tabular-nums font-medium",
            cfg ? cfg.cls.split(" ")[0] : "text-jardim-text-muted",
          )}
        >
          {fmt(valueCents)}
        </span>
      )}
    </button>
  );
}

// ─── Payer modal ──────────────────────────────────────────────────────────────

function PayerModal({
  jazigoId,
  jazigoCode,
  currentPayer,
  onClose,
  onSaved,
}: {
  jazigoId: string;
  jazigoCode: string;
  currentPayer: { id: string; nome: string } | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [payerSearch, setPayerSearch] = useState("");
  const deferred = useDeferredValue(payerSearch.trim());

  const usersQ = api.admin.listUsers.useQuery(
    { limit: 25, search: deferred.length >= 2 ? deferred : undefined },
    { enabled: deferred.length >= 2 },
  );

  const setPayer = api.admin.setJazigoResponsavelFinanceiro.useMutation({
    onSuccess: () => {
      onSaved();
      onClose();
    },
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      role="dialog"
      aria-modal
      aria-labelledby="payer-modal-title"
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-jardim-border bg-jardim-white p-5 shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2
              id="payer-modal-title"
              className="text-base font-semibold text-jardim-green-dark"
            >
              Pagador da manutenção — {jazigoCode}
            </h2>
            <p className="mt-1 text-xs text-jardim-text-muted">
              Vincule outro cliente como pagador deste jazigo. Remover volta ao
              responsável do contrato ou titular.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-jardim-text-muted hover:bg-jardim-cream"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {currentPayer && (
          <div className="mt-4 rounded-xl border border-jardim-border bg-jardim-cream/40 px-3 py-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
              Pagador atual (por jazigo)
            </p>
            <p className="mt-0.5 text-sm font-medium text-jardim-green-dark">
              {currentPayer.nome}
            </p>
          </div>
        )}

        <label className="mt-4 block text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
          Pesquisar cliente
        </label>
        <input
          className="mt-1 w-full rounded-xl border border-jardim-border bg-jardim-white px-3 py-2 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
          placeholder="Nome, e-mail ou CPF (mín. 2 caracteres)"
          value={payerSearch}
          onChange={(e) => setPayerSearch(e.target.value)}
          autoComplete="off"
        />

        <ul className="mt-2 max-h-48 divide-y divide-jardim-border overflow-y-auto rounded-xl border border-jardim-border bg-jardim-cream/20">
          {usersQ.isFetching ? (
            <li className="flex items-center justify-center gap-2 p-3 text-xs text-jardim-text-muted">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> A carregar…
            </li>
          ) : deferred.length < 2 ? (
            <li className="p-3 text-center text-xs text-jardim-text-light">
              Digite pelo menos 2 caracteres para pesquisar.
            </li>
          ) : (usersQ.data?.items ?? []).length === 0 ? (
            <li className="p-3 text-center text-xs text-jardim-text-muted">
              Nenhum cliente encontrado.
            </li>
          ) : (
            (usersQ.data?.items ?? []).map((u) => (
              <li key={u.id}>
                <button
                  type="button"
                  disabled={setPayer.isPending}
                  className="flex w-full flex-col items-start px-3 py-2.5 text-left text-sm transition hover:bg-jardim-white disabled:opacity-50"
                  onClick={() =>
                    setPayer.mutate({
                      jazigoId,
                      responsavelCustomerId: u.id,
                    })
                  }
                >
                  <span className="font-medium text-jardim-green-dark">
                    {u.name}
                  </span>
                  <span className="text-xs text-jardim-text-muted">
                    {fmtCpf(u.cpfCnpj)} · {u.email ?? "—"}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>

        {currentPayer && (
          <button
            type="button"
            disabled={setPayer.isPending}
            className="mt-4 w-full rounded-xl border border-jardim-border py-2.5 text-sm font-medium text-jardim-text-muted transition hover:bg-jardim-cream disabled:opacity-50"
            onClick={() =>
              setPayer.mutate({ jazigoId, responsavelCustomerId: null })
            }
          >
            Remover pagador por jazigo
          </button>
        )}

        {setPayer.error && (
          <p className="mt-3 text-sm text-red-700" role="alert">
            {setPayer.error.message}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Update form ──────────────────────────────────────────────────────────────

function UpdateJazigoForm({
  jazigoId,
  quantidadeGavetas,
  valorMensalidadeCents,
  onSaved,
}: {
  jazigoId: string;
  quantidadeGavetas: number;
  valorMensalidadeCents: number;
  onSaved: () => void;
}) {
  const [gavetas, setGavetas] = useState(String(quantidadeGavetas));
  const [valor, setValor] = useState((valorMensalidadeCents / 100).toFixed(2));
  const [open, setOpen] = useState(false);

  const update = api.admin.updateJazigo.useMutation({
    onSuccess: () => {
      onSaved();
      setOpen(false);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const gav = parseInt(gavetas, 10);
    const val = parseFloat(valor.replace(",", "."));
    if (isNaN(gav) || isNaN(val)) return;
    update.mutate({
      id: jazigoId,
      quantidadeGavetas: gav !== quantidadeGavetas ? gav : undefined,
      valorMensalidade: Math.abs(val - valorMensalidadeCents / 100) > 0.005 ? val : undefined,
    });
  }

  return (
    <section className="rounded-2xl border border-jardim-border bg-jardim-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <div className="flex items-center gap-2">
          <Edit3 className="h-4 w-4 text-jardim-green-mid" aria-hidden />
          <span className="text-sm font-semibold text-jardim-green-dark">
            Atualizar jazigo
          </span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-jardim-text-muted transition-transform",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      {open && (
        <form
          onSubmit={handleSubmit}
          className="border-t border-jardim-border px-5 pb-5 pt-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
                Nº de gavetas
              </label>
              <input
                type="number"
                min={1}
                max={99}
                step={1}
                className="mt-1 w-full rounded-xl border border-jardim-border bg-jardim-white px-3 py-2 text-sm text-jardim-text focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
                value={gavetas}
                onChange={(e) => setGavetas(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
                Mensalidade (R$)
              </label>
              <input
                type="number"
                min={0.01}
                max={99999}
                step={0.01}
                className="mt-1 w-full rounded-xl border border-jardim-border bg-jardim-white px-3 py-2 text-sm text-jardim-text focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                required
              />
            </div>
          </div>

          {update.error && (
            <p className="mt-3 text-sm text-red-700" role="alert">
              {update.error.message}
            </p>
          )}

          {update.isSuccess && (
            <p className="mt-3 text-sm text-green-700" role="status">
              Jazigo atualizado com sucesso.
            </p>
          )}

          <div className="mt-4 flex items-center gap-3">
            <button
              type="submit"
              disabled={update.isPending}
              className="inline-flex items-center gap-2 rounded-xl bg-jardim-green-dark px-4 py-2 text-sm font-medium text-white transition hover:bg-jardim-green-mid disabled:opacity-50"
            >
              {update.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <Save className="h-4 w-4" aria-hidden />
              )}
              Guardar alterações
            </button>
            <button
              type="button"
              className="rounded-xl border border-jardim-border px-4 py-2 text-sm text-jardim-text-muted transition hover:bg-jardim-cream"
              onClick={() => {
                setOpen(false);
                update.reset();
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

// ─── Payments table ───────────────────────────────────────────────────────────

function PaymentsTable({ jazigoId }: { jazigoId: string }) {
  const [statusFilter, setStatusFilter] = useState<
    StatusPagamento | undefined
  >(undefined);

  const q = api.admin.listJazigoPayments.useInfiniteQuery(
    { jazigoId, limit: 25, status: statusFilter },
    { getNextPageParam: (last) => last.nextCursor },
  );

  const rows = useMemo(
    () => q.data?.pages.flatMap((p) => p.items) ?? [],
    [q.data?.pages],
  );

  const TABS: { label: string; value: StatusPagamento | undefined }[] = [
    { label: "Todos", value: undefined },
    { label: "Pendentes", value: "PENDENTE" },
    { label: "Atrasados", value: "ATRASADO" },
    { label: "Pagos", value: "PAGO" },
    { label: "Cancelados", value: "CANCELADO" },
  ];

  return (
    <section className="rounded-2xl border border-jardim-border bg-jardim-white shadow-sm">
      <div className="border-b border-jardim-border px-5 py-4">
        <h2 className="text-sm font-semibold text-jardim-green-dark">
          Histórico de pagamentos
        </h2>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-1.5 overflow-x-auto border-b border-jardim-border px-4 py-2.5">
        {TABS.map((tab) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => {
              setStatusFilter(tab.value);
            }}
            className={cn(
              "shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition",
              statusFilter === tab.value
                ? "bg-jardim-green-dark text-white"
                : "border border-jardim-border bg-jardim-cream/50 text-jardim-text-muted hover:bg-jardim-cream",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        {q.isLoading ? (
          <div className="flex items-center justify-center gap-2 py-12 text-sm text-jardim-text-muted">
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> A carregar…
          </div>
        ) : rows.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <Clock className="mb-2 h-8 w-8 text-jardim-border" aria-hidden />
            <p className="text-sm text-jardim-text-muted">
              Nenhum pagamento encontrado.
            </p>
          </div>
        ) : (
          <>
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead>
                <tr className="border-b border-jardim-border bg-jardim-cream/80 text-[11px] font-semibold uppercase tracking-wider text-jardim-text-muted">
                  <th className="px-4 py-3 sm:px-5">Vencimento</th>
                  <th className="px-4 py-3 sm:px-5">Status</th>
                  <th className="px-4 py-3 sm:px-5">Tipo</th>
                  <th className="px-4 py-3 sm:px-5">Método</th>
                  <th className="px-4 py-3 text-right sm:px-5">Valor</th>
                  <th className="px-4 py-3 sm:px-5">Pago em</th>
                  <th className="px-4 py-3 sm:px-5">Nosso nº / Asaas</th>
                  <th className="px-4 py-3 sm:px-5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-jardim-border">
                {rows.map((p) => (
                  <tr
                    key={p.id}
                    className="transition-colors hover:bg-jardim-cream/40"
                  >
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums text-jardim-text sm:px-5">
                      {fmtDate(p.dataVencimento)}
                    </td>
                    <td className="px-4 py-3 sm:px-5">
                      <StatusBadge status={p.status as StatusPagamento} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-jardim-text-muted sm:px-5">
                      {p.tipo === "MANUTENCAO"
                        ? "Manutenção"
                        : p.tipo === "AQUISICAO"
                          ? "Aquisição"
                          : "Taxa"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-jardim-text-muted sm:px-5">
                      {p.metodoPagamento ?? "—"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums sm:px-5">
                      <span className="font-medium text-jardim-green-dark">
                        {fmt(p.valorTituloCents)}
                      </span>
                      {p.valorPagoCents !== null &&
                        p.valorPagoCents !== p.valorTituloCents && (
                          <span className="ml-1 text-xs text-jardim-text-muted">
                            (pago {fmt(p.valorPagoCents)})
                          </span>
                        )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums text-xs text-jardim-text-muted sm:px-5">
                      {fmtDate(p.dataPagamento)}
                    </td>
                    <td className="px-4 py-3 sm:px-5">
                      <span className="font-mono text-[11px] text-jardim-text-light">
                        {p.nossoNumero ?? p.asaasId?.slice(0, 12) ?? "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3 sm:px-5">
                      {p.invoiceUrl ? (
                        <a
                          href={p.invoiceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-jardim-green-mid hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" aria-hidden />
                          Fatura
                        </a>
                      ) : null}
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

      {q.error && (
        <p className="px-5 pb-4 text-sm text-red-700" role="alert">
          {q.error.message}
        </p>
      )}
    </section>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function JazigoDetalhesClient() {
  const params = useParams<{ id: string }>();
  const id = params.id ?? "";
  const { data: session } = useSession();
  const finance = canFinance({ user: session?.user });

  const [payerModalOpen, setPayerModalOpen] = useState(false);
  const [activeStatFilter, setActiveStatFilter] = useState<
    StatusPagamento | "TODOS"
  >("TODOS");

  const q = api.admin.getJazigoById.useQuery(
    { id },
    { enabled: id.length > 0 },
  );

  const jazigo = q.data;

  if (q.isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 px-4 py-20 text-sm text-jardim-text-muted">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
        A carregar jazigo…
      </div>
    );
  }

  if (q.error || !jazigo) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <MapPin className="mx-auto mb-3 h-10 w-10 text-jardim-border" aria-hidden />
        <p className="text-sm font-medium text-jardim-text-muted">
          {q.error?.message ?? "Jazigo não encontrado."}
        </p>
        <Link
          href="/admin/jazigos"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-jardim-green-mid hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Voltar à lista
        </Link>
      </div>
    );
  }

  const stats = jazigo.byStatus;
  const totalCount = jazigo._count.pagamentos;

  const STAT_CARDS: {
    label: string;
    value: StatusPagamento | "TODOS";
    count: number;
    valueCents: number;
  }[] = [
    { label: "Total", value: "TODOS", count: totalCount, valueCents: 0 },
    {
      label: "Pendentes",
      value: "PENDENTE",
      count: stats.PENDENTE?.count ?? 0,
      valueCents: stats.PENDENTE?.valueCents ?? 0,
    },
    {
      label: "Atrasados",
      value: "ATRASADO",
      count: stats.ATRASADO?.count ?? 0,
      valueCents: stats.ATRASADO?.valueCents ?? 0,
    },
    {
      label: "Pagos",
      value: "PAGO",
      count: stats.PAGO?.count ?? 0,
      valueCents: stats.PAGO?.valueCents ?? 0,
    },
    {
      label: "Cancelados",
      value: "CANCELADO",
      count: stats.CANCELADO?.count ?? 0,
      valueCents: stats.CANCELADO?.valueCents ?? 0,
    },
  ];

  // Resolve fonte do responsável financeiro
  const payerCustomer = jazigo.responsavelFinanceiroCustomer;
  const legacyResp = jazigo.contrato.responsavelFinanceiro;
  const titular = jazigo.contrato.customer;

  const resolvedPayer = payerCustomer ?? legacyResp?.customer ?? titular;
  const payerFonte: "jazigo" | "contrato" | "titular" = payerCustomer
    ? "jazigo"
    : legacyResp
      ? "contrato"
      : "titular";

  const FONTE_LABEL = {
    jazigo: "Definido por jazigo",
    contrato: "Responsável do contrato (sync)",
    titular: "Titular do contrato",
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-jardim-text-muted">
        <Link
          href="/admin/jazigos"
          className="inline-flex items-center gap-1 transition hover:text-jardim-green-dark"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Jazigos
        </Link>
        <span>/</span>
        <span className="font-mono font-semibold text-jardim-green-dark">
          {jazigo.codigo}
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-jardim-green-mid" aria-hidden />
            <h1 className="text-xl font-bold text-jardim-green-dark sm:text-2xl">
              {jazigo.codigo}
            </h1>
            {jazigo.sqlServerId !== null && (
              <span className="rounded-full border border-jardim-border bg-jardim-cream px-2 py-0.5 text-[11px] font-mono text-jardim-text-light">
                ID {jazigo.sqlServerId}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-jardim-text-muted">
            {jazigo.quadra ? `Quadra ${jazigo.quadra}` : ""}
            {jazigo.quadra && jazigo.setor ? " · " : ""}
            {jazigo.setor ? `Setor ${jazigo.setor}` : ""}
            {!jazigo.quadra && !jazigo.setor ? "Localização não informada" : ""}
          </p>
        </div>
        <p className="text-xs text-jardim-text-light">
          Sync {fmtDate(jazigo.syncedAt)} · Atualizado {fmtDate(jazigo.updatedAt)}
        </p>
      </div>

      {/* Info + Responsável */}
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Info card */}
        <section className="rounded-2xl border border-jardim-border bg-jardim-white p-5 shadow-sm">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-jardim-text-muted">
            Dados do jazigo
          </h2>
          <dl className="space-y-2.5 text-sm">
            <div className="flex justify-between gap-2">
              <dt className="text-jardim-text-muted">Gavetas</dt>
              <dd className="font-semibold tabular-nums text-jardim-text">
                {jazigo.quantidadeGavetas}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-jardim-text-muted">Mensalidade</dt>
              <dd className="font-semibold tabular-nums text-jardim-green-dark">
                {fmt(jazigo.valorMensalidadeCents)}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-jardim-text-muted">Contrato</dt>
              <dd className="font-mono text-xs text-jardim-text">
                {jazigo.contrato.numeroContrato}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-jardim-text-muted">Situação</dt>
              <dd>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                    jazigo.contrato.situacao === "ATIVO"
                      ? "bg-green-50 text-green-700"
                      : jazigo.contrato.situacao === "QUITADO"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-gray-100 text-gray-600",
                  )}
                >
                  {jazigo.contrato.situacao}
                </span>
              </dd>
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-jardim-border pt-2.5">
              <dt className="text-jardim-text-muted">Titular</dt>
              <dd>
                <Link
                  href={`/admin/clientes/${titular.id}`}
                  className="group inline-flex items-center gap-1 text-jardim-green-dark hover:underline"
                >
                  <span className="truncate max-w-[140px] font-medium">
                    {titular.nome}
                  </span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 text-jardim-green-mid opacity-70 transition group-hover:opacity-100"
                    aria-hidden
                  />
                </Link>
              </dd>
            </div>
            {titular.email && (
              <div className="flex justify-between gap-2">
                <dt className="text-jardim-text-muted">Email titular</dt>
                <dd className="truncate text-xs text-jardim-text-muted">
                  {titular.email}
                </dd>
              </div>
            )}
          </dl>
        </section>

        {/* Responsável financeiro */}
        <section className="rounded-2xl border border-jardim-border bg-jardim-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-jardim-text-muted">
              Responsável financeiro (pagador)
            </h2>
            {finance && (
              <button
                type="button"
                onClick={() => setPayerModalOpen(true)}
                className="inline-flex items-center gap-1 rounded-lg border border-jardim-border bg-jardim-cream/60 px-2.5 py-1 text-[11px] font-medium text-jardim-green-dark transition hover:bg-jardim-cream"
              >
                <UserCog className="h-3 w-3" aria-hidden />
                Alterar
              </button>
            )}
          </div>

          <div className="mb-3 rounded-xl border border-jardim-border bg-jardim-cream/30 px-3 py-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-jardim-text-light">
              {FONTE_LABEL[payerFonte]}
            </p>
            <p className="mt-1 font-medium text-jardim-green-dark">
              {resolvedPayer.nome}
            </p>
            <p className="mt-0.5 text-xs text-jardim-text-muted">
              CPF/CNPJ: {fmtCpf(resolvedPayer.cpfCnpj)}
            </p>
            {resolvedPayer.email && (
              <p className="mt-0.5 text-xs text-jardim-text-muted">
                {resolvedPayer.email}
              </p>
            )}
          </div>

          {payerFonte !== "titular" && (
            <Link
              href={`/admin/clientes/${resolvedPayer.id}`}
              className="inline-flex items-center gap-1 text-xs text-jardim-green-mid hover:underline"
            >
              Ver ficha do pagador
              <ArrowUpRight className="h-3 w-3" aria-hidden />
            </Link>
          )}

          {legacyResp && payerFonte === "jazigo" && (
            <div className="mt-3 rounded-xl border border-dashed border-jardim-border px-3 py-2 text-xs text-jardim-text-muted">
              <span className="font-semibold">Fallback (contrato):</span>{" "}
              {legacyResp.customer.nome}
              {legacyResp.motivo ? ` — ${legacyResp.motivo}` : ""}
            </div>
          )}
        </section>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {STAT_CARDS.map((s) => (
          <StatCard
            key={s.value}
            label={s.label}
            count={s.count}
            valueCents={s.valueCents}
            status={s.value}
            active={activeStatFilter === s.value}
            onClick={() => setActiveStatFilter(s.value)}
          />
        ))}
      </div>

      {/* Update form (finance only) */}
      {finance && (
        <UpdateJazigoForm
          jazigoId={jazigo.id}
          quantidadeGavetas={jazigo.quantidadeGavetas}
          valorMensalidadeCents={jazigo.valorMensalidadeCents}
          onSaved={() => void q.refetch()}
        />
      )}

      {/* Payments table */}
      <PaymentsTable jazigoId={id} />

      {/* Payer modal */}
      {payerModalOpen && finance && (
        <PayerModal
          jazigoId={id}
          jazigoCode={jazigo.codigo}
          currentPayer={payerCustomer ?? null}
          onClose={() => setPayerModalOpen(false)}
          onSaved={() => void q.refetch()}
        />
      )}
    </div>
  );
}
