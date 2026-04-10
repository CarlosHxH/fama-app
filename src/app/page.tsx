import Link from "next/link";

import { auth } from "~/server/auth";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Central Financeira";
const ORG_LINE = process.env.NEXT_PUBLIC_ORG_FOOTER ?? "Portal de cobrança";

/**
 * Landing institucional (tema claro alinhado ao login / PaginaCobranca).
 */
export default async function Home() {
  const session = await auth();
  const year = new Date().getFullYear();

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(245,242,237,0.98) 0%, rgba(237,233,224,0.96) 100%)",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #ddd9d0 0, #ddd9d0 1px, transparent 0, transparent 12px)`,
          backgroundSize: "20px 20px",
        }}
      />
      <div className="pointer-events-none fixed -top-[150px] -right-[100px] z-0 h-[min(500px,90vw)] w-[min(500px,90vw)] rounded-full border border-[#b8972a]/20 bg-[#b8972a]/6" />
      <div className="pointer-events-none fixed -bottom-[80px] -left-[80px] z-0 h-[min(300px,70vw)] w-[min(300px,70vw)] rounded-full border border-[#b8972a]/20 bg-[#b8972a]/6" />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16 text-[#1c1c1c]">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-[#b8972a]/35 bg-[#1a3a2a]/5 text-3xl shadow-sm">
            <span aria-hidden>🏛️</span>
          </div>
          <h1
            className="text-3xl font-extrabold tracking-tight text-[#1a3a2a] sm:text-4xl"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {APP_NAME}
          </h1>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-[#4a4a4a]">
            Aceda ao portal para consultar débitos e efetuar pagamentos (PIX,
            boleto ou cartão via Asaas) de forma segura.
          </p>

          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
            {session ? (
              <>
                <Link
                  href="/cobranca"
                  className="rounded-xl bg-[#1a3a2a] px-8 py-3.5 text-center text-[0.9rem] font-bold text-white shadow-sm transition hover:bg-[#2d5a3d]"
                >
                  Ir para cobrança
                </Link>
                {session.user?.role === "ADMIN" ? (
                  <Link
                    href="/admin"
                    className="rounded-xl border-2 border-[#2d5a3d] px-8 py-3.5 text-center text-[0.9rem] font-bold text-[#1a3a2a] transition hover:bg-[#f0f9f3]"
                  >
                    Administração
                  </Link>
                ) : null}
                <Link
                  href="/api/auth/signout"
                  className="rounded-xl border border-[#ddd9d0] bg-white px-8 py-3.5 text-center text-[0.9rem] font-semibold text-[#4a4a4a] transition hover:bg-[#f5f2ed]"
                >
                  Sair
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-xl bg-[#1a3a2a] px-10 py-3.5 text-center text-[0.9rem] font-bold text-white shadow-sm transition hover:bg-[#2d5a3d]"
              >
                Entrar no portal
              </Link>
            )}
          </div>

          {session?.user ? (
            <p className="mt-8 text-[0.8rem] text-[#7a7a7a]">
              Sessão:{" "}
              <span className="font-semibold text-[#1a3a2a]">
                {session.user.name ??
                  session.user.cpfCnpj ??
                  session.user.email ??
                  "—"}
              </span>
            </p>
          ) : null}

          <p className="mt-12 text-[0.72rem] leading-relaxed text-[#7a7a7a]">
            <strong className="text-[#1a3a2a]">{ORG_LINE}</strong>
            {" · "}© {year}
          </p>
        </div>
      </main>
    </>
  );
}
