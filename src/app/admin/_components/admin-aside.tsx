"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  CreditCard,
  LayoutDashboard,
  Receipt,
  Users,
} from "lucide-react";

import { cn } from "~/lib/utils";

const NAV_BASE = [
  { href: "/admin", label: "Visão geral", icon: LayoutDashboard },
  { href: "/admin/clientes", label: "Clientes", icon: Users },
] as const;

const NAV_FINANCE = {
  href: "/admin/pagamentos",
  label: "Gerar cobranças",
  icon: Receipt,
} as const;

function canEmitCharges(session: {
  user?: {
    accountKind?: string;
    role?: string;
    staffRole?: string | null;
  };
}) {
  if (
    session.user?.accountKind !== "admin" ||
    session.user?.role !== "ADMIN"
  ) {
    return false;
  }
  const s = session.user.staffRole ?? "EMPLOYEE";
  return s === "ADMIN" || s === "MANAGER";
}

export function AdminAside() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const finance = canEmitCharges({ user: session?.user });

  const NAV = finance
    ? ([
        NAV_BASE[0],
        NAV_FINANCE,
        NAV_BASE[1],
      ] as const)
    : [...NAV_BASE];

  return (
    <aside className="flex h-auto w-full min-h-0 shrink-0 flex-col border-b border-jardim-border bg-jardim-white md:h-full md:w-56 md:overflow-y-auto md:border-b-0 md:border-r lg:w-60">
      <div className="border-b border-jardim-border bg-white px-3 py-3 md:px-4 md:py-4">
        <Link
          href="/admin"
          className="block outline-none ring-offset-2 ring-offset-white transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-jardim-green"
          aria-label="Painel administrativo — início"
        >
          <Image
            src="/logo-Jardim.png"
            alt="Jardim das Palmeiras — Serviços póstumos e planos funerários"
            width={280}
            height={90}
            className="h-auto max-h-11 w-auto max-w-full object-contain object-left md:max-h-14"
            priority
          />
        </Link>
      </div>
      <nav
        className="flex gap-1 overflow-x-auto px-2 py-2 md:min-h-0 md:flex-1 md:flex-col md:gap-0.5 md:overflow-y-auto md:px-2 md:py-3"
        aria-label="Secções do painel"
      >
        {NAV.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/admin"
              ? pathname === "/admin"
              : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors md:py-2",
                active
                  ? "bg-jardim-cream text-jardim-green-dark ring-1 ring-jardim-border"
                  : "text-jardim-text-muted hover:bg-jardim-cream/70 hover:text-jardim-green-dark",
              )}
            >
              <Icon className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
              <span className="whitespace-nowrap">{label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto hidden border-t border-jardim-border p-4 md:block">
        <p className="flex items-center gap-2 text-[11px] text-jardim-text-light">
          <CreditCard className="h-3.5 w-3.5" aria-hidden />
          Asaas · PIX, boleto e cartão
        </p>
      </div>
    </aside>
  );
}
