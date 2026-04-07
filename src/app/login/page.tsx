import { Suspense } from "react";

import { LoginForm } from "./login-form";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Central Financeira";
const ORG_LINE = process.env.NEXT_PUBLIC_ORG_FOOTER ?? "Portal de cobrança";

export default function LoginPage() {
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
      <div className="pointer-events-none fixed -top-[150px] -right-[100px] z-0 h-[min(500px,90vw)] w-[min(500px,90vw)] rounded-full border border-[#b8972a]/20 bg-[#b8972a]/[0.06]" />
      <div className="pointer-events-none fixed -bottom-[80px] -left-[80px] z-0 h-[min(300px,70vw)] w-[min(300px,70vw)] rounded-full border border-[#b8972a]/20 bg-[#b8972a]/[0.06]" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-10">
        <div
          className="w-full max-w-[440px] overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
          style={{
            animation: "loginSlideUp 0.4s ease-out",
          }}
        >
          <header className="border-b border-[#e8e4dc] bg-white px-8 pt-10 pb-6 text-center">
            <div className="mx-auto mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-xl border border-[#b8972a]/35 bg-[#1b5e20]/5 text-2xl shadow-sm">
              <span aria-hidden>🏛️</span>
            </div>
            <h1
              className="text-[1.35rem] font-extrabold tracking-tight text-[#1b4332]"
              style={{
                fontFamily: "var(--font-login-playfair), Georgia, serif",
              }}
            >
              {APP_NAME}
            </h1>
            <p
              className="mt-1 text-[0.9rem] text-[#5c6b63]"
              style={{
                fontFamily: "var(--font-login-inter), system-ui, sans-serif",
              }}
            >
              Identifique-se para aceder à área de cobrança
            </p>
          </header>

          <div className="px-6 pt-6 pb-8 sm:px-8">
            <Suspense
              fallback={
                <p className="py-8 text-center text-sm text-[#5c6b63]">
                  A carregar…
                </p>
              }
            >
              <LoginForm />
            </Suspense>
          </div>
        </div>

        <p
          className="mt-8 max-w-[440px] text-center text-[0.72rem] leading-relaxed text-[#6b756e]"
          style={{
            fontFamily: "var(--font-login-inter), system-ui, sans-serif",
          }}
        >
          <strong className="text-[#1b4332]">{ORG_LINE}</strong>
          {" · "}© {year}
        </p>
      </div>

      <style>{`
        @keyframes loginSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
