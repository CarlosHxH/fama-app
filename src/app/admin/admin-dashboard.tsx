"use client";

import Link from "next/link";
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

import { api } from "~/trpc/react";

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const COLORS = [
  "#2e7d32",
  "#c62828",
  "#f9a825",
  "#1565c0",
  "#6a1b9a",
  "#757575",
];

/**
 * Painel admin: KPIs, gráfico de faturamento (30 dias) e distribuição por estado.
 */
export function AdminDashboard() {
  const stats = api.admin.dashboardStats.useQuery();
  const payments = api.admin.listPayments.useQuery({ limit: 30 });

  const pieData =
    stats.data?.byStatus.map((s) => ({
      name: s.status,
      value: s.count,
      totalCents: s.totalCents,
    })) ?? [];

  const barData =
    stats.data?.chartRevenue.map((d) => ({
      date: d.date.slice(5),
      valueReais: Math.round(d.valueCents) / 100,
    })) ?? [];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0d1f14] to-[#1a3d28] text-white">
      <header className="border-b border-white/10 px-4 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="font-serif text-2xl font-bold text-[#f5f2e8]">
            Admin · Faturamento
          </h1>
          <Link
            href="/cobranca"
            className="rounded-lg border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10"
          >
            Área cliente
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-[#1e4229]/70 p-4">
            <p className="text-xs text-[#c8e6c9] uppercase">Total recebido</p>
            <p className="mt-1 text-2xl font-bold">
              {stats.isLoading
                ? "…"
                : brl.format((stats.data?.totalReceivedCents ?? 0) / 100)}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#1e4229]/70 p-4">
            <p className="text-xs text-[#c8e6c9] uppercase">Pendente</p>
            <p className="mt-1 text-2xl font-bold">
              {stats.isLoading
                ? "…"
                : brl.format((stats.data?.pendingCents ?? 0) / 100)}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#1e4229]/70 p-4">
            <p className="text-xs text-[#c8e6c9] uppercase">
              Pagamentos recebidos (30d)
            </p>
            <p className="mt-1 text-2xl font-bold">
              {stats.isLoading
                ? "…"
                : (stats.data?.receivedCountLast30Days ?? 0)}
            </p>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-xl border border-white/10 bg-[#f5f2e8] p-4 text-[#1b3322]">
            <h2 className="font-semibold">Faturamento recebido (30 dias)</h2>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(v: number) => brl.format(v)}
                    labelFormatter={(l) => `Dia ${l}`}
                  />
                  <Bar dataKey="valueReais" fill="#2e7d32" name="R$" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-xl border border-white/10 bg-[#f5f2e8] p-4 text-[#1b3322]">
            <h2 className="font-semibold">Por estado</h2>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {pieData.map((_, i) => (
                      <Cell
                        key={i}
                        fill={COLORS[i % COLORS.length] ?? "#999"}
                      />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <section className="rounded-xl border border-white/10 bg-[#1e4229]/60 p-4">
          <h2 className="font-semibold text-[#f5f2e8]">Últimas cobranças</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[#c8e6c9]">
                  <th className="pr-4 pb-2">Data</th>
                  <th className="pr-4 pb-2">Utilizador</th>
                  <th className="pr-4 pb-2">Valor</th>
                  <th className="pb-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                {payments.data?.items.map((p) => (
                  <tr key={p.id} className="border-b border-white/5">
                    <td className="py-2 pr-4 text-white/80">
                      {new Date(p.createdAt).toLocaleString("pt-BR")}
                    </td>
                    <td className="py-2 pr-4">
                      {p.user.email ?? p.user.name ?? p.userId}
                    </td>
                    <td className="py-2 pr-4">
                      {brl.format(p.valueCents / 100)}
                    </td>
                    <td className="py-2">{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
