import { type Metadata } from "next";

import { HistoricoPagamentosClient } from "./historico-pagamentos-client";

export const metadata: Metadata = {
  title: "Histórico de pagamentos",
};

/**
 * Página admin: listagem filtrada de todas as cobranças.
 */
export default function HistoricoPagamentosPage() {
  return <HistoricoPagamentosClient />;
}
