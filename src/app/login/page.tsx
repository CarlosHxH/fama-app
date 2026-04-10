import { Suspense } from "react";
import Image from "next/image";

import { LoginForm } from "./login-form";

export default function LoginPage() {
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
            <h1>Portal Jardim das Palmeiras</h1>
            <p>Identifique-se para acessar seus jazigos</p>
          </div>

          <div className="login-body">
            <Suspense
              fallback={
                <p className="py-8 text-center text-sm" style={{ color: "var(--text-mid)" }}>
                  Carregando…
                </p>
              }
            >
              <LoginForm />
            </Suspense>
          </div>
        </div>

        <div className="login-footer">
          <strong>Cemitério Jardim das Palmeiras</strong>
          {" | "}
          Av. das Palmeiras, 1000 – Goiânia/GO
          {" | "}
          © {new Date().getFullYear()} Todos os direitos reservados
        </div>
      </div>
    </>
  );
}
