"use client";

import { useState } from "react";

/**
 * Secção “Consultar Jazigos” com conteúdo neutro (sem dados de backend).
 */
export function JazigosPlaceholder() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-[#ddd9d0] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-2 bg-[#2d5a3d] px-4 py-3 text-[0.85rem] font-bold text-white">
        <span aria-hidden>🔍</span>
        Consultar Jazigos &amp; Detalhes
      </div>
      <div className="px-4 py-5 sm:px-6">
        <p className="text-[0.85rem] leading-relaxed text-[#4a4a4a]">
          Não há unidades (jazigos) associadas a esta conta no portal. Quando
          existirem, os detalhes e histórico aparecerão aqui.
        </p>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-4 flex w-full items-center justify-between rounded-lg border border-[#ddd9d0] bg-[#fafaf8] px-3 py-2.5 text-left text-[0.8rem] font-semibold text-[#1a3a2a] hover:border-[#2d5a3d]/40"
        >
          <span>Sobre esta secção</span>
          <span className="text-[#2d5a3d]" aria-hidden>
            {open ? "▲" : "▼"}
          </span>
        </button>
        {open ? (
          <div className="mt-3 rounded-lg border border-dashed border-[#ddd9d0] bg-[#f5f2ed] p-3 text-[0.75rem] leading-relaxed text-[#4a4a4a]">
            Esta área servirá para consultar jazigos vinculados ao titular,
            sepultados e situação cadastral, quando o sistema estiver integrado
            aos registos institucionais.
          </div>
        ) : null}
      </div>
    </div>
  );
}
