"use client";

import { useState } from "react";

type SessionUser = {
  name?: string | null;
  email?: string | null;
  cpfCnpj?: string | null;
};

type TitularCardProps = {
  user: SessionUser | undefined;
};

/**
 * Cartão do titular com mini-resumo e corpo expansível (sem edição — sem API).
 */
export function TitularCard({ user }: TitularCardProps) {
  const [expanded, setExpanded] = useState(false);

  const nome = user?.name ?? "—";
  const doc = user?.cpfCnpj ?? (user?.email ? `Email: ${user.email}` : "—");

  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-[#ddd9d0] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#2d5a3d] px-4 py-3 text-white">
        <div className="flex items-center gap-2 text-[0.85rem] font-bold">
          <span aria-hidden>👤</span>
          <span className="hidden sm:inline">
            Dados do Titular (Cessionário) / Pagador
          </span>
          <span className="sm:hidden">Dados titular</span>
        </div>
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          className="rounded-md border border-white/30 bg-white/15 px-2 py-1 text-[0.65rem] font-bold hover:bg-white/25"
        >
          {expanded ? "▲ Recolher" : "🔍 Ver detalhes"}
        </button>
      </div>
      <div className="border-b border-[#ddd9d0] bg-[#f5f2ed] px-4 py-4 sm:px-6">
        <p className="text-[0.65rem] font-bold tracking-wide text-[#7a7a7a] uppercase">
          Titular (Cessionário)
        </p>
        <p className="mt-0.5 text-[1rem] font-extrabold text-[#1a3a2a]">
          {nome}
        </p>
        <p className="text-[0.8rem] font-semibold text-[#4a4a4a]">{doc}</p>
      </div>
      {expanded ? (
        <div className="border-t border-[#ddd9d0] px-4 py-4 sm:px-6">
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="text-[0.65rem] font-bold text-[#7a7a7a] uppercase">
                Nome completo
              </dt>
              <dd className="mt-0.5 font-semibold text-[#1a3a2a]">{nome}</dd>
            </div>
            <div>
              <dt className="text-[0.65rem] font-bold text-[#7a7a7a] uppercase">
                CPF / CNPJ
              </dt>
              <dd className="mt-0.5 font-semibold">{user?.cpfCnpj ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-[0.65rem] font-bold text-[#7a7a7a] uppercase">
                Email
              </dt>
              <dd className="mt-0.5 font-semibold">{user?.email ?? "—"}</dd>
            </div>
          </dl>
          <p className="mt-4 text-center text-[0.68rem] text-[#7a7a7a]">
            Alteração de dados pelo portal não está disponível nesta versão.
          </p>
        </div>
      ) : null}
    </div>
  );
}
