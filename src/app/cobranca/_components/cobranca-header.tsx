import Link from "next/link";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Central Financeira";
const HEADER_BADGE =
  process.env.NEXT_PUBLIC_COBRANCA_HEADER_BADGE ?? "Área do titular";

type CobrancaHeaderProps = {
  isAdmin: boolean;
  onSignOut: () => void;
};

export function CobrancaHeader({ isAdmin, onSignOut }: CobrancaHeaderProps) {
  return (
    <header className="sticky top-0 z-[100] flex h-[68px] items-center justify-between border-b border-[#ddd9d0] bg-white px-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] sm:px-8">
      <Link
        href="/"
        className="flex items-center gap-3 no-underline"
        style={{
          fontFamily: "var(--font-cobranca-inter), system-ui, sans-serif",
        }}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#1a3a2a] text-xl text-white">
          🏛️
        </span>
        <span className="hidden text-[0.95rem] font-bold tracking-tight text-[#1a3a2a] sm:block">
          {APP_NAME}
        </span>
      </Link>
      <div className="flex flex-wrap items-center justify-end gap-2">
        <span className="max-w-[min(200px,42vw)] truncate rounded-md border border-amber-200/80 bg-amber-50 px-2 py-1 text-[0.65rem] font-bold tracking-wide text-amber-900 uppercase sm:max-w-none">
          {HEADER_BADGE}
        </span>
        {isAdmin ? (
          <Link
            href="/admin"
            className="rounded-md border border-[#ddd9d0] px-2.5 py-1.5 text-[0.75rem] font-semibold text-[#2d5a3d] hover:bg-[#f5f2ed]"
          >
            Admin
          </Link>
        ) : null}
        <button
          type="button"
          onClick={onSignOut}
          className="rounded-md bg-[#2d5a3d] px-2.5 py-1.5 text-[0.75rem] font-semibold text-white hover:bg-[#1a3a2a]"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
