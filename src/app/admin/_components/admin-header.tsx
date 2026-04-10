"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { ExternalLink, LayoutGrid, LogOut } from "lucide-react";

import { cn } from "~/lib/utils";

const linkBtn =
  "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jardim-green-mid/40 focus-visible:ring-offset-2 focus-visible:ring-offset-jardim-white";

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-jardim-border bg-jardim-white/95 shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-jardim-green-dark text-jardim-white shadow-sm ring-1 ring-jardim-green-mid/30"
            aria-hidden
          >
            <LayoutGrid className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight text-jardim-green-dark sm:text-base">
              Painel administrativo
            </p>
            <p className="hidden text-xs text-jardim-text-muted sm:block">
              Faturamento e cobranças
            </p>
          </div>
        </div>

        <nav className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            href="/cobranca"
            className={cn(
              linkBtn,
              "text-jardim-green-mid hover:bg-jardim-cream hover:text-jardim-green-dark",
            )}
          >
            <ExternalLink className="h-4 w-4 opacity-90" aria-hidden />
            <span className="hidden sm:inline">Área do cliente</span>
            <span className="sm:hidden">Cliente</span>
          </Link>
          <button
            type="button"
            className={cn(
              linkBtn,
              "text-jardim-text-muted hover:bg-jardim-cream hover:text-jardim-text",
            )}
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
          >
            <LogOut className="h-4 w-4 opacity-90" aria-hidden />
            Sair
          </button>
        </nav>
      </div>
    </header>
  );
}
