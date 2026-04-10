import { type Metadata } from "next";

import { AdminShell } from "../_components/admin-shell";

export const metadata: Metadata = {
  title: { default: "Painel administrativo", template: "%s · Admin" },
  description: "Gestão de faturamento, cobranças e clientes.",
};

export default function AdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AdminShell>{children}</AdminShell>;
}
