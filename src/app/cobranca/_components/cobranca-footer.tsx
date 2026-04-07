const ORG_LINE = process.env.NEXT_PUBLIC_ORG_FOOTER ?? "Portal de cobrança";

export function CobrancaFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-10 border-t border-[#ddd9d0] bg-[#ede9e0] px-4 py-6 text-center text-[0.72rem] leading-relaxed text-[#4a4a4a] sm:px-8">
      <strong className="text-[#1a3a2a]">{ORG_LINE}</strong>
      {" · "}© {year}
    </footer>
  );
}
