import { type Metadata } from "next";

import { ContratosClient } from "./contratos-client";

export const metadata: Metadata = {
  title: "Contratos",
};

export default function AdminContratosPage() {
  return <ContratosClient />;
}
