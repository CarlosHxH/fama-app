"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Hash,
  Loader2,
  Pencil,
  User,
} from "lucide-react";

import { ClientePhonesPanel } from "../_components/cliente-phones-panel";
import { api } from "~/trpc/react";
import { formatCpfCnpjDisplay } from "~/lib/format-cpf-cnpj";
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

/**
 * Ficha do titular: dados, integração, telefones e últimas cobranças.
 */
export function ClienteDetalhesClient() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";

  const caps = api.admin.getCapabilities.useQuery();
  const q = api.admin.getCustomerById.useQuery(
    { id },
    { enabled: Boolean(id) },
  );

  if (!id) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center text-sm text-red-800">
        Identificador inválido.
      </div>
    );
  }

  if (q.isLoading) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-3 px-4 py-20 text-jardim-text-muted">
        <Loader2 className="h-9 w-9 animate-spin text-jardim-green-mid" aria-hidden />
        <p className="text-sm">A carregar ficha do cliente…</p>
      </div>
    );
  }

  if (q.isError || !q.data) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center">
        <p className="text-sm text-red-800">Cliente não encontrado.</p>
        <Link
          href="/admin/clientes"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-jardim-green-mid hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Voltar à lista
        </Link>
      </div>
    );
  }

  const c = q.data;
  const canEdit = caps.data?.canEditCustomerContacts ?? false;

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href="/admin/clientes"
            className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-jardim-green-mid hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Clientes
          </Link>
          <h1 className="text-lg font-semibold text-jardim-green-dark sm:text-xl">
            {c.nome}
          </h1>
          <p className="mt-1 text-sm text-jardim-text-muted">
            Titular do portal · CPF/CNPJ{" "}
            <span className="font-mono tabular-nums text-jardim-text">
              {formatCpfCnpjDisplay(c.cpfCnpj)}
            </span>
          </p>
        </div>
        {canEdit ? (
          <Link
            href={`/admin/clientes/${c.id}/editar`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-jardim-border bg-jardim-white px-4 py-2.5 text-sm font-medium text-jardim-green-dark shadow-sm transition hover:bg-jardim-cream"
          >
            <Pencil className="h-4 w-4" aria-hidden />
            Editar dados
          </Link>
        ) : null}
      </div>

      <section className="rounded-2xl border border-jardim-border bg-jardim-white p-5 shadow-sm sm:p-6">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-jardim-green-dark">
          <User className="h-4 w-4 text-jardim-green-mid" aria-hidden />
          Dados cadastrais
        </h2>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
              E-mail
            </dt>
            <dd className="mt-0.5 text-jardim-text">{c.email ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
              Estado da conta
            </dt>
            <dd className="mt-0.5">
              <span
                className={cn(
                  "inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
                  c.ativo
                    ? "bg-jardim-green-mid/12 text-jardim-green-dark ring-jardim-green-mid/25"
                    : "bg-jardim-cream-dark text-jardim-text-muted ring-jardim-border",
                )}
              >
                {c.ativo ? "Ativo" : "Inativo"}
              </span>
              {c.primeiroAcesso ? (
                <span className="ml-2 text-xs text-amber-800">
                  Primeiro acesso pendente
                </span>
              ) : null}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
              Tentativas de login
            </dt>
            <dd className="mt-0.5 tabular-nums text-jardim-text">
              {c.tentativasLogin}
              {c.bloqueadoAte ? (
                <span className="ml-2 text-xs text-red-800">
                  Bloqueado até{" "}
                  {new Date(c.bloqueadoAte).toLocaleString("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </span>
              ) : null}
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
              <Calendar className="h-3 w-3" aria-hidden />
              Atualizado em
            </dt>
            <dd className="mt-0.5 text-jardim-text">
              {new Date(c.updatedAt).toLocaleString("pt-BR", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-2xl border border-jardim-border bg-jardim-white p-5 shadow-sm sm:p-6">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-jardim-green-dark">
          <CreditCard className="h-4 w-4 text-jardim-green-mid" aria-hidden />
          Integração e sincronização
        </h2>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
              Asaas (cliente)
            </dt>
            <dd className="mt-0.5 break-all font-mono text-xs text-jardim-text">
              {c.asaasCustomerId ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
              <Hash className="h-3 w-3" aria-hidden />
              SQL Server (Cod.)
            </dt>
            <dd className="mt-0.5 tabular-nums text-jardim-text">
              {c.sqlServerId ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
              Última sincronização
            </dt>
            <dd className="mt-0.5 text-jardim-text">
              {new Date(c.syncedAt).toLocaleString("pt-BR", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
              Resumo
            </dt>
            <dd className="mt-0.5 text-jardim-text">
              {c._count.contratos} contrato(s) · {c._count.enderecos}{" "}
              endereço(s) · {c._count.telefones} telefone(s) ·{" "}
              {c._count.pagamentosComoPagador} cobrança(s)
            </dd>
          </div>
        </dl>
      </section>

      <div className="overflow-hidden rounded-2xl border border-jardim-border bg-jardim-white shadow-sm">
        <ClientePhonesPanel userId={c.id} />
      </div>

      <section className="overflow-hidden rounded-2xl border border-jardim-border bg-jardim-white shadow-sm">
        <div className="border-b border-jardim-border bg-jardim-cream/50 px-5 py-4 sm:px-6">
          <h2 className="text-sm font-semibold text-jardim-green-dark">
            Últimas cobranças
          </h2>
        </div>
        <div className="overflow-x-auto">
          {c.recentPayments.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-jardim-text-muted sm:px-6">
              Sem cobranças registadas.
            </p>
          ) : (
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-jardim-border bg-jardim-cream/80 text-[11px] font-semibold uppercase tracking-wider text-jardim-text-muted">
                  <th className="px-5 py-3 sm:px-6">Data</th>
                  <th className="px-5 py-3 sm:px-6">Valor</th>
                  <th className="px-5 py-3 sm:px-6">Estado</th>
                  <th className="px-5 py-3 sm:px-6">Vencimento</th>
                  <th className="px-5 py-3 text-right sm:px-6">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-jardim-border">
                {c.recentPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-jardim-cream/40">
                    <td className="whitespace-nowrap px-5 py-3 text-jardim-text-muted sm:px-6">
                      {new Date(p.createdAt).toLocaleString("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-5 py-3 font-medium tabular-nums text-jardim-green-dark sm:px-6">
                      {brl.format(p.valueCents / 100)}
                    </td>
                    <td className="px-5 py-3 sm:px-6">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
                          statusBadgeClass(p.status),
                        )}
                      >
                        {STATUS_LABEL[p.status] ?? p.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-jardim-text sm:px-6">
                      {new Date(p.dataVencimento).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-5 py-3 text-right sm:px-6">
                      {p.invoiceUrl ? (
                        <a
                          href={p.invoiceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-jardim-green-mid hover:underline"
                        >
                          Fatura
                        </a>
                      ) : (
                        <span className="text-jardim-text-light">—</span>
                      )}
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
