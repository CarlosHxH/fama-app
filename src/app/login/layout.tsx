import { Inter } from "next/font/google";

import "./login.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-login-inter",
  display: "swap",
});

export const metadata = {
  title: "Identificação do Titular – Jardim das Palmeiras",
  description:
    "Acesse o portal de regularização de jazigos do Cemitério Jardim das Palmeiras informando seu CPF ou CNPJ.",
};

/**
 * Rota /login alinhada ao protótipo PaginaCobranca/login.html (Inter + estilos locais).
 */
export default function LoginLayout({
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
