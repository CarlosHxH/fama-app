"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useDeferredValue, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertTriangle,
  Banknote,
  BarChart3,
  CheckCircle2,
  Clock,
  ExternalLink,
  PieChartIcon,
  Receipt,
  Users,
} from "lucide-react";

import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/** Tons da marca (verde + dourado suave para fatias extra) */
const CHART_COLORS = [
  "#1a3a2a",
  "#2d5a3d",
  "#3d7a52",
  "#4a7d5c",
  "#b8972a",
  "#2d4a38",
];

const STATUS_LABEL: Record<string, string> = {
  PENDENTE: "Em aberto",
  PAGO: "Recebido",
  ATRASADO: "Vencido",
  CANCELADO: "Cancelado",
  ESTORNADO: "Estornado",
  PENDING: "Em aberto",
  RECEIVED: "Recebido",
  CONFIRMED: "Confirmado",
  OVERDUE: "Vencido",
  REFUNDED: "Estornado",
  CANCELLED: "Cancelado",
  UNKNOWN: "Indefinido",
};

function statusBadgeClass(status: string) {
  switch (status) {
    case "PAGO":
    case "RECEIVED":
    case "CONFIRMED":
      return "bg-jardim-green-mid/12 text-jardim-green-dark ring-jardim-green-mid/25";
    case "PENDENTE":
    case "PENDING":
      return "bg-jardim-cream-dark text-jardim-green-mid ring-jardim-border";
    case "ATRASADO":
    case "OVERDUE":
      return "bg-red-50 text-red-800 ring-red-200";
    default:
      return "bg-jardim-cream-dark text-jardim-text-muted ring-jardim-border";
  }
}

function KpiSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-jardim-border bg-jardim-white p-5 shadow-sm">
      <div className="h-3 w-24 rounded bg-jardim-cream-dark" />
      <div className="mt-3 h-8 w-36 rounded bg-jardim-cream-dark/80" />
    </div>
  );
}

type KpiCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  sub?: string;
  loading?: boolean;
};

function KpiCard({ icon, label, value, sub, loading }: KpiCardProps) {
  if (loading) return <KpiSkeleton />;
  return (
    <div className="group rounded-2xl border border-jardim-border bg-jardim-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-jardim-text-light">
            {label}
          </p>
          <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-jardim-green-dark sm:text-[1.65rem]">
            {value}
          </p>
          {sub ? (
            <p className="mt-1 text-xs leading-snug text-jardim-text-muted">
              {sub}
            </p>
          ) : null}
        </div>
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-jardim-cream text-jardim-green-mid ring-1 ring-jardim-border transition group-hover:bg-jardim-cream-dark"
          aria-hidden
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

/**
 * Painel admin: KPIs, gráficos e lista — paleta verde + branco/creme (Jardim).
 */
type PaymentBucket =
  | "all"
  | "overdue"
  | "pending"
  | "pending_current"
  | "received";
type DueWindow = "all" | "today" | "next_7_days" | "overdue_30_plus";

export function AdminDashboard() {
  const stats = api.admin.dashboardStats.useQuery();
  const [paymentBucket, setPaymentBucket] = useState<PaymentBucket>("all");
  const [dueWindow, setDueWindow] = useState<DueWindow>("all");
  const [paymentSearch, setPaymentSearch] = useState("");
  const deferredSearch = useDeferredValue(paymentSearch.trim());

  const payments = api.admin.listPayments.useQuery({
    limit: 30,
    bucket: paymentBucket,
    dueWindow,
    search: deferredSearch.length > 0 ? deferredSearch : undefined,
  });

  const pieData =
    stats.data?.byStatus.map((s) => ({
      name: STATUS_LABEL[s.status] ?? s.status,
      rawStatus: s.status,
      value: s.count,
      totalCents: s.totalCents,
    })) ?? [];

  const barData =
    stats.data?.chartRevenue.map((d) => ({
      date: d.date.slice(5),
      valueReais: Math.round(d.valueCents) / 100,
    })) ?? [];

  const loadingStats = stats.isLoading;
  const loadingPayments = payments.isLoading;

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 text-jardim-text sm:px-6 lg:space-y-10 lg:px-8 lg:py-8">
        <div className="max-w-2xl">
          <h1 className="text-lg font-semibold tracking-tight text-jardim-green-dark sm:text-xl">
            Visão geral
          </h1>
          <p className="mt-1 text-sm leading-relaxed text-jardim-text-muted">
            Resumo financeiro e atividade recente das cobranças (Asaas / portal).
          </p>
        </div>

        <section
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          aria-label="Indicadores"
        >
          <KpiCard
            loading={loadingStats}
            label="Total recebido (histórico)"
            value={brl.format((stats.data?.totalReceivedCents ?? 0) / 100)}
            sub="Soma de pagamentos com estado recebido"
            icon={<Banknote className="h-5 w-5" strokeWidth={2} />}
          />
          <KpiCard
            loading={loadingStats}
            label="Valor pendente"
            value={brl.format((stats.data?.pendingCents ?? 0) / 100)}
            sub="Cobranças em aberto"
            icon={<Clock className="h-5 w-5" strokeWidth={2} />}
          />
          <KpiCard
            loading={loadingStats}
            label="Recebimentos (30 dias)"
            value={String(stats.data?.receivedCountLast30Days ?? 0)}
            sub="Pagamentos quitados no período"
            icon={<CheckCircle2 className="h-5 w-5" strokeWidth={2} />}
          />
          <KpiCard
            loading={loadingStats}
            label="Em atraso"
            value={String(stats.data?.overdueCount ?? 0)}
            sub="Vencidas ou pendentes após vencimento"
            icon={<AlertTriangle className="h-5 w-5" strokeWidth={2} />}
          />
          <KpiCard
            loading={loadingStats}
            label="Em dia (aberto)"
            value={String(stats.data?.pendingOpenCount ?? 0)}
            sub="Pendentes com vencimento hoje ou futuro"
            icon={<Clock className="h-5 w-5" strokeWidth={2} />}
          />
          <KpiCard
            loading={loadingStats}
            label="Quitados (total)"
            value={String(stats.data?.receivedCountAll ?? 0)}
            sub="Todos os pagamentos recebidos"
            icon={<Receipt className="h-5 w-5" strokeWidth={2} />}
          />
          <KpiCard
            loading={loadingStats}
            label="Vencem hoje"
            value={String(stats.data?.dueTodayCount ?? 0)}
            sub="Pendentes com vencimento hoje"
            icon={<Clock className="h-5 w-5" strokeWidth={2} />}
          />
          <KpiCard
            loading={loadingStats}
            label="Próximos 7 dias"
            value={String(stats.data?.dueNext7Count ?? 0)}
            sub="Pendentes com vencimento próximo"
            icon={<Clock className="h-5 w-5" strokeWidth={2} />}
          />
          {/* <KpiCard
            loading={loadingStats}
            label="Atraso > 30 dias"
            value={String(stats.data?.overdue30Count ?? 0)}
            sub={brl.format((stats.data?.overdue30AmountCents ?? 0) / 100)}
            icon={<AlertTriangle className="h-5 w-5" strokeWidth={2} />}
          /> */}
        </section>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <section
            className="rounded-2xl border border-jardim-border bg-jardim-white p-5 shadow-sm sm:p-6"
            aria-labelledby="chart-bar-title"
          >
            <div className="mb-4 flex items-center gap-2">
              <BarChart3
                className="h-4 w-4 text-jardim-green-mid"
                strokeWidth={2}
                aria-hidden
              />
              <h2
                id="chart-bar-title"
                className="text-sm font-semibold text-jardim-green-dark"
              >
                Faturamento recebido (30 dias)
              </h2>
            </div>
            <div className="h-64 sm:h-72">
              {loadingStats ? (
                <div className="flex h-full items-center justify-center rounded-xl bg-jardim-cream text-sm text-jardim-text-muted">
                  A carregar…
                </div>
              ) : barData.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center rounded-xl bg-jardim-cream px-4 text-center">
                  <Receipt className="mb-2 h-8 w-8 text-jardim-border" aria-hidden />
                  <p className="text-sm text-jardim-text-muted">
                    Sem recebimentos registados neste período.
                  </p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 8, right: 8, left: -8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ddd9d0" vertical={false} />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11, fill: "#4a4a4a" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "#4a4a4a" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(45, 90, 61, 0.08)" }}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #ddd9d0",
                        fontSize: "12px",
                        background: "#ffffff",
                      }}
                      formatter={(v: number) => [brl.format(v), "Valor"]}
                      labelFormatter={(l) => `Dia ${l}`}
                    />
                    <Bar
                      dataKey="valueReais"
                      fill="#2d5a3d"
                      radius={[6, 6, 0, 0]}
                      name="Valor"
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </section>

          <section
            className="rounded-2xl border border-jardim-border bg-jardim-white p-5 shadow-sm sm:p-6"
            aria-labelledby="chart-pie-title"
          >
            <div className="mb-4 flex items-center gap-2">
              <PieChartIcon
                className="h-4 w-4 text-jardim-green-mid"
                strokeWidth={2}
                aria-hidden
              />
              <h2
                id="chart-pie-title"
                className="text-sm font-semibold text-jardim-green-dark"
              >
                Por estado
              </h2>
            </div>
            <div className="h-64 sm:h-72">
              {loadingStats ? (
                <div className="flex h-full items-center justify-center rounded-xl bg-jardim-cream text-sm text-jardim-text-muted">
                  A carregar…
                </div>
              ) : pieData.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center rounded-xl bg-jardim-cream px-4 text-center">
                  <PieChartIcon
                    className="mb-2 h-8 w-8 text-jardim-border"
                    aria-hidden
                  />
                  <p className="text-sm text-jardim-text-muted">Sem dados agregados.</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={88}
                      paddingAngle={2}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {pieData.map((_, i) => (
                        <Cell
                          key={i}
                          fill={CHART_COLORS[i % CHART_COLORS.length] ?? "#2d5a3d"}
                        />
                      ))}
                    </Pie>
                    <Legend
                      wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #ddd9d0",
                        fontSize: "12px",
                        background: "#ffffff",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </section>
        </div>

        <section
          className="overflow-hidden rounded-2xl border border-jardim-border bg-jardim-white shadow-sm"
          aria-labelledby="table-payments-title"
        >
          <div className="border-b border-jardim-border bg-jardim-cream/50 px-5 py-4 sm:px-6">
            <h2
              id="table-payments-title"
              className="text-sm font-semibold text-jardim-green-dark"
            >
              Cobranças
            </h2>
            <p className="mt-0.5 text-xs text-jardim-text-muted">
              Filtre por situação e pesquise por cliente. Ordem: mais recentes
              primeiro.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex-1">
                <label className="block text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
                  Situação
                </label>
                <select
                  className="mt-1 w-full rounded-xl border border-jardim-border bg-jardim-white px-3 py-2 text-sm text-jardim-text focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25 sm:max-w-xs"
                  value={paymentBucket}
                  onChange={(e) =>
                    setPaymentBucket(e.target.value as PaymentBucket)
                  }
                >
                  <option value="all">Todas</option>
                  <option value="overdue">Em atraso</option>
                  <option value="pending">Pendentes (qualquer)</option>
                  <option value="pending_current">Em dia (aberto)</option>
                  <option value="received">Recebidas / quitadas</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
                  Janela de vencimento
                </label>
                <select
                  className="mt-1 w-full rounded-xl border border-jardim-border bg-jardim-white px-3 py-2 text-sm text-jardim-text focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25 sm:max-w-xs"
                  value={dueWindow}
                  onChange={(e) => setDueWindow(e.target.value as DueWindow)}
                >
                  <option value="all">Todas</option>
                  <option value="today">Vence hoje</option>
                  <option value="next_7_days">Próximos 7 dias</option>
                  <option value="overdue_30_plus">Atrasados &gt; 30 dias</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
                  Pesquisar cliente
                </label>
                <input
                  type="search"
                  className="mt-1 w-full rounded-xl border border-jardim-border bg-jardim-white px-3 py-2 text-sm placeholder:text-jardim-text-light focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
                  placeholder="Nome, e-mail ou CPF"
                  value={paymentSearch}
                  onChange={(e) => setPaymentSearch(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loadingPayments ? (
              <div className="px-5 py-12 text-center text-sm text-jardim-text-muted sm:px-6">
                A carregar lista…
              </div>
            ) : !payments.data?.items.length ? (
              <div className="flex flex-col items-center justify-center px-5 py-14 text-center sm:px-6">
                <Receipt className="mb-3 h-10 w-10 text-jardim-border" aria-hidden />
                <p className="text-sm font-medium text-jardim-text-muted">
                  Nenhuma cobrança encontrada
                </p>
                <p className="mt-1 max-w-sm text-xs text-jardim-text-light">
                  Quando existirem registos, aparecem aqui automaticamente.
                </p>
              </div>
            ) : (
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-jardim-border bg-jardim-cream/80 text-[11px] font-semibold uppercase tracking-wider text-jardim-text-muted">
                    <th className="px-5 py-3 sm:px-6">Data</th>
                    <th className="px-5 py-3 sm:px-6">Utilizador</th>
                    <th className="px-5 py-3 sm:px-6">Meio</th>
                    <th className="px-5 py-3 sm:px-6">Valor</th>
                    <th className="px-5 py-3 sm:px-6">Estado</th>
                    <th className="px-5 py-3 text-right sm:px-6">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-jardim-border">
                  {payments.data.items.map((p) => (
                    <tr
                      key={p.id}
                      className="transition-colors hover:bg-jardim-cream/60"
                    >
                      <td className="whitespace-nowrap px-5 py-3.5 text-jardim-text-muted sm:px-6">
                        {new Date(p.createdAt).toLocaleString("pt-BR", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </td>
                      <td className="max-w-[200px] truncate px-5 py-3.5 font-medium text-jardim-text sm:max-w-xs sm:px-6">
                        <span className="block truncate">
                          {p.user.name ?? p.user.email ?? p.customerId ?? "—"}
                        </span>
                        {p.user.cpfCnpj ? (
                          <span className="block truncate text-[11px] text-jardim-text-muted">
                            {p.user.cpfCnpj}
                          </span>
                        ) : null}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-xs text-jardim-text-muted sm:px-6">
                        {p.paymentMethod ?? "PIX"}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 tabular-nums text-jardim-green-dark sm:px-6">
                        {brl.format(p.valueCents / 100)}
                      </td>
                      <td className="px-5 py-3.5 sm:px-6">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
                            statusBadgeClass(p.status),
                          )}
                        >
                          {STATUS_LABEL[p.status] ?? p.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right sm:px-6">
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
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
    </div>
  );
}
