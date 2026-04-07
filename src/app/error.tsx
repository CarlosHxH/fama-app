"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Limite de erro para segmentos da app: falhas de renderização ou dados.
 */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app/error]", error.message, error.digest ?? "");
  }, [error]);

  const isDev = process.env.NODE_ENV === "development";

  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 py-16 text-center text-white">
      <div className="max-w-md rounded-2xl border border-white/10 bg-[#1e4229]/90 p-8">
        <h1 className="font-serif text-xl font-bold text-[#f5f2e8]">
          Ocorreu um erro
        </h1>
        <p className="mt-3 text-sm text-white/75">
          Não foi possível concluir o pedido. Pode tentar novamente ou voltar à
          página inicial.
        </p>
        {isDev ? (
          <pre className="mt-4 max-h-32 overflow-auto rounded-lg bg-black/40 p-3 text-left text-xs text-red-200">
            {error.message}
          </pre>
        ) : null}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-lg bg-[#2e7d32] px-5 py-2 text-sm font-semibold hover:bg-[#1b5e20]"
          >
            Tentar novamente
          </button>
          <Link
            href="/"
            className="rounded-lg border border-white/20 px-5 py-2 text-sm hover:bg-white/10"
          >
            Início
          </Link>
        </div>
        {isDev ? (
          <p className="mt-6 text-xs text-white/50">
            Se o erro repetir após alterações, execute{" "}
            <code className="rounded bg-black/30 px-1">npm run dev:clean</code>{" "}
            e volte a iniciar o servidor.
          </p>
        ) : null}
      </div>
    </main>
  );
}
