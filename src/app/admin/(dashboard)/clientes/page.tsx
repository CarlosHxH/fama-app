import { Suspense } from "react";

import { ClientesClient } from "./clientes-client";

export default function AdminClientesPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-12 text-center text-sm text-jardim-text-muted sm:px-6">
          A carregar clientes…
        </div>
      }
    >
      <ClientesClient />
    </Suspense>
  );
}
