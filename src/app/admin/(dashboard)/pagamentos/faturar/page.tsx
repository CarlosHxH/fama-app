import { type Metadata } from "next";

import { FaturarClient } from "./faturar-client";

export const metadata: Metadata = {
  title: "Gerar faturas anuais",
};

export default function FaturarPage() {
  return <FaturarClient />;
}
