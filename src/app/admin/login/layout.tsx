import { Inter } from "next/font/google";

import "../../login/login.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-login-inter",
  display: "swap",
});

export const metadata = {
  title: "Entrada administrativa – Jardim das Palmeiras",
  description:
    "Acesso ao painel administrativo com e-mail e palavra-passe.",
};

export default function AdminLoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      lang="pt-BR"
      className={`${inter.variable} min-h-screen bg-[#f5f2ed] font-sans antialiased text-[#1c1c1c]`}
      style={{ fontFamily: "var(--font-login-inter), system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}
