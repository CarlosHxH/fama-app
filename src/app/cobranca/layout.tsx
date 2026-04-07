import { Inter, Playfair_Display } from "next/font/google";

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

/**
 * Tipografia e fundo da área /cobranca (alinhado ao protótipo PaginaCobranca).
 */
export default function CobrancaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable} min-h-screen bg-[#f5f2ed] font-sans text-[#1c1c1c] antialiased`}
      style={{
        fontFamily: "var(--font-cobranca-inter), system-ui, sans-serif",
      }}
    >
      {children}
    </div>
  );
}
