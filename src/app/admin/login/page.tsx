import { redirect } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";

import { auth } from "~/server/auth";

import { AdminLoginForm } from "./admin-login-form";

function safeCallbackUrl(raw: string | undefined, fallback: string): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return fallback;
  return raw;
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const params = await searchParams;
  const callbackUrl = safeCallbackUrl(params.callbackUrl, "/admin");

  const session = await auth();
  if (session?.user?.role === "ADMIN") {
    redirect(callbackUrl);
  }
  if (session?.user?.role === "USER") {
    redirect("/cobranca");
  }

  return (
    <>
      <div className="bg-overlay" aria-hidden />
      <div className="bg-pattern" aria-hidden />
      <div className="deco-circle c1" aria-hidden />
      <div className="deco-circle c2" aria-hidden />

      <div className="page">
        <div className="login-card">
          <div className="login-header">
            <Image
              src="/logo-Jardim.png"
              alt="Jardim das Palmeiras"
              width={280}
              height={100}
              className="mx-auto h-auto w-auto max-w-[280px]"
              priority
            />
            <h1>Área administrativa</h1>
            <p>Entre com o e-mail e a palavra-passe de administrador</p>
          </div>

          <div className="login-body">
            <Suspense
              fallback={
                <p
                  className="py-8 text-center text-sm"
                  style={{ color: "var(--text-mid)" }}
                >
                  Carregando…
                </p>
              }
            >
              <AdminLoginForm defaultCallbackUrl={callbackUrl} />
            </Suspense>
          </div>
        </div>

        <div className="login-footer">
          <strong>Cemitério Jardim das Palmeiras</strong>
          {" | "}
          Acesso restrito
          {" | "}
          © {new Date().getFullYear()}
        </div>
      </div>
    </>
  );
}
