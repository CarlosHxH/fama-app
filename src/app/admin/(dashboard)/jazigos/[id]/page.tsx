import { type Metadata } from "next";

import { JazigoDetalhesClient } from "./jazigo-detalhes-client";

export const metadata: Metadata = {
  title: "Detalhes do Jazigo",
};

export default function AdminJazigoDetalhesPage() {
  return <JazigoDetalhesClient />;
}
