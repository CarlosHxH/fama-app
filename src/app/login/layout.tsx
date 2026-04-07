import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-login-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-login-playfair",
  display: "swap",
});

/**
 * Tipografia específica da rota /login (Inter + Playfair), alinhada ao protótipo PaginaCobranca.
 */
export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable} min-h-screen font-sans antialiased`}
      style={{ fontFamily: "var(--font-login-inter), system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}
