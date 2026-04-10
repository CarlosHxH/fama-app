import { Inter, Playfair_Display } from "next/font/google";

import "./cobranca-shared.css";
import "./cobranca-jazigo.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-cobranca-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-cobranca-playfair",
  display: "swap",
});

export const metadata = {
  title: "Regularização de Jazigo – Jardim das Palmeiras",
  description:
    "Portal de regularização e pagamento de anuidades de jazigos do Cemitério Jardim das Palmeiras.",
};

/**
 * Estilos alinhados a PaginaCobranca/cobranca-jazigo.html (tokens + cobranca-jazigo.css).
 */
export default function CobrancaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      lang="pt-BR"
      className={`cobranca-root ${inter.variable} ${playfair.variable} antialiased`}
    >
      {children}
    </div>
  );
}
