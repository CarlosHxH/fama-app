"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import {
  CreditCard,
  History,
  LayoutDashboard,
  MapPin,
  Receipt,
  RefreshCw,
  UserCog,
  Users,
} from "lucide-react";

import { useAside } from "~/components/ui/aside";

import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

const NAV_BASE = [
  { href: "/admin", label: "Visão geral", icon: LayoutDashboard },
  {
    href: "/admin/pagamentos/historico",
    label: "Histórico de pagamentos",
    icon: History,
  },
  { href: "/admin/clientes", label: "Clientes", icon: Users },
  { href: "/admin/jazigos", label: "Jazigos", icon: MapPin },
  { href: "/admin/funcionarios", label: "Funcionários", icon: UserCog },
  {
    href: "/admin/sincronizacoes",
    label: "Sincronizações",
    icon: RefreshCw,
  },
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
  const s = session.user.staffRole ?? "ATENDENTE";
  return s === "ADMIN" || s === "FINANCEIRO";
}

export function AdminAside() {
  const pathname = usePathname();
  const { open, setOpen } = useAside();
  const { data: session } = useSession();
  const caps = api.admin.getCapabilities.useQuery();
  const finance =
    caps.data?.canIssueCharges ?? canEmitCharges({ user: session?.user });

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  const NAV = finance
    ? ([
        NAV_BASE[0],
        NAV_FINANCE,
        NAV_BASE[1],
        NAV_BASE[2],
        NAV_BASE[3],
        NAV_BASE[4],
        NAV_BASE[5],
      ] as const)
    : [...NAV_BASE];

  return (
    <>
      <aside
        id="admin-nav-aside"
        className={cn(
          "flex min-h-0 shrink-0 flex-col border-jardim-border bg-jardim-white md:h-full md:w-56 md:overflow-y-auto md:border-b-0 md:border-r lg:w-60",
          open
            ? "fixed inset-y-0 left-0 z-50 flex w-[min(20rem,85vw)] max-w-full overflow-y-auto border-b shadow-xl md:static md:z-auto md:w-56 md:max-w-none md:border-r md:shadow-none lg:w-60"
            : "hidden h-auto w-full border-b md:flex",
        )}
      >
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
        className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-2 md:px-2 md:py-3"
        aria-label="Secções do painel"
      >
        {NAV.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/admin"
              ? pathname === "/admin"
              : href === "/admin/pagamentos"
                ? pathname === "/admin/pagamentos"
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
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-jardim-green-dark/25 backdrop-blur-[1px] md:hidden"
          aria-label="Fechar menu de navegação"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}
