"use client";

import { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, ChevronRight, Search, User } from "lucide-react";

import { ClientePhonesPanel } from "./_components/cliente-phones-panel";
import { api } from "~/trpc/react";

/**
 * Listagem de titulares (clientes) com pesquisa.
 * Aceita `?search=` na URL (ex.: link a partir do dashboard de cobranças).
 */
export function ClientesClient() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const q = searchParams.get("search")?.trim();
    if (q) setSearch(q);
  }, [searchParams]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const query = api.admin.listUsers.useQuery({
    limit: 60,
    search: search.trim().length >= 2 ? search.trim() : undefined,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-jardim-green-dark sm:text-xl">
            Clientes
          </h1>
          <p className="mt-1 text-sm text-jardim-text-muted">
            Titulares com conta no portal (exclui administradores).
          </p>
        </div>
        <div className="relative max-w-md flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-jardim-text-light"
            aria-hidden
          />
          <input
            type="search"
            className="w-full rounded-xl border border-jardim-border bg-jardim-white py-2.5 pl-10 pr-3 text-sm text-jardim-text placeholder:text-jardim-text-light focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
            placeholder="Filtrar por nome, e-mail ou CPF…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Pesquisar clientes"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-jardim-border bg-jardim-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-jardim-border bg-jardim-cream/80 text-[11px] font-semibold uppercase tracking-wider text-jardim-text-muted">
                <th className="w-10 px-2 py-3 sm:px-3" aria-hidden />
                <th className="px-4 py-3 sm:px-5">Titular</th>
                <th className="px-4 py-3 sm:px-5">E-mail</th>
                <th className="px-4 py-3 sm:px-5">CPF/CNPJ</th>
                <th className="px-4 py-3 sm:px-5">Asaas</th>
                <th className="px-4 py-3 text-right sm:px-5">Telefones</th>
                <th className="px-4 py-3 text-right sm:px-5">Cobranças</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-jardim-border">
              {query.isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-jardim-text-muted">
                    A carregar…
                  </td>
                </tr>
              ) : query.data?.items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-14">
                    <div className="flex flex-col items-center justify-center text-center">
                      <User className="mb-2 h-10 w-10 text-jardim-border" aria-hidden />
                      <p className="font-medium text-jardim-text-muted">
                        Nenhum cliente encontrado
                      </p>
                      <p className="mt-1 text-xs text-jardim-text-light">
                        {search.trim().length >= 2
                          ? "Tente outro termo de pesquisa."
                          : "Ainda não há titulares registados."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                query.data?.items.map((u) => (
                  <Fragment key={u.id}>
                    <tr className="transition-colors hover:bg-jardim-cream/50">
                      <td className="px-2 py-3.5 sm:px-3">
                        <button
                          type="button"
                          className="rounded-lg p-1 text-jardim-green-mid hover:bg-jardim-cream"
                          onClick={() =>
                            setExpandedId((id) => (id === u.id ? null : u.id))
                          }
                          aria-expanded={expandedId === u.id}
                          aria-label={
                            expandedId === u.id
                              ? "Fechar telefones"
                              : "Ver e editar telefones"
                          }
                        >
                          {expandedId === u.id ? (
                            <ChevronDown className="h-4 w-4" aria-hidden />
                          ) : (
                            <ChevronRight className="h-4 w-4" aria-hidden />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3.5 font-medium text-jardim-text sm:px-5">
                        {u.name ?? "—"}
                      </td>
                      <td className="max-w-[200px] truncate px-4 py-3.5 text-jardim-text-muted sm:max-w-xs sm:px-5">
                        {u.email ?? "—"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 tabular-nums text-jardim-text sm:px-5">
                        {u.cpfCnpj ?? "—"}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-jardim-text-muted sm:px-5">
                        {u.asaasCustomerId ? (
                          <span className="rounded-full bg-jardim-cream px-2 py-0.5 text-jardim-green-mid ring-1 ring-jardim-border">
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
                    {expandedId === u.id ? (
                      <tr className="bg-jardim-cream/30">
                        <td colSpan={7} className="p-0">
                          <ClientePhonesPanel userId={u.id} />
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
