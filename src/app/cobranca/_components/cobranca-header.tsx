import Image from "next/image";
import Link from "next/link";

const HEADER_BADGE =
  process.env.NEXT_PUBLIC_COBRANCA_HEADER_BADGE ?? "⚠️ Jazigos com Pendências";

type CobrancaHeaderProps = {
  isAdmin: boolean;
  onSignOut: () => void;
};

export function CobrancaHeader({ isAdmin, onSignOut }: CobrancaHeaderProps) {
  return (
    <header>
      <Link
        href="/cobranca"
        className="logo"
        aria-label="Início — Regularização de jazigo"
      >
        <Image
          src="/logo-Jardim.png"
          alt="Cemitério Jardim das Palmeiras"
          width={220}
          height={55}
          className="h-auto max-h-[55px] w-auto max-w-[220px]"
          priority
        />
      </Link>
      <div className="flex flex-wrap items-center justify-end gap-2">
        <div className="header-badge" id="header-warning">
          {HEADER_BADGE}
        </div>
        {isAdmin ? (
          <Link
            href="/admin"
            className="collapsible-btn"
            style={{ color: "var(--green-dark)", borderColor: "var(--border)" }}
          >
            Admin
          </Link>
        ) : null}
        <button type="button" className="border-green-800 cursor-pointer" onClick={onSignOut}>
          Sair
        </button>
      </div>
    </header>
  );
}
