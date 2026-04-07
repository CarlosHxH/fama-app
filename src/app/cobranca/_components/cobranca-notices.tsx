const LEGAL_URL = process.env.NEXT_PUBLIC_COBRANCA_LEGAL_URL ?? "";
const LEGAL_TEXT =
  process.env.NEXT_PUBLIC_COBRANCA_LEGAL_TEXT ??
  "Consulte a legislação municipal e regulamentos aplicáveis à sua instituição.";

export function CobrancaNoticeBox() {
  return (
    <div className="mb-6 flex gap-3 rounded-xl border border-[#bfdbfe] bg-[#eff6ff] px-4 py-3 text-[0.8rem] leading-relaxed text-[#1e3a5f]">
      <span className="shrink-0 text-lg" aria-hidden>
        ℹ️
      </span>
      <p>
        <strong>Sem juros e sem multas neste canal:</strong> o valor exibido
        corresponde ao montante da cobrança gerada. Dúvidas devem ser tratadas
        com o suporte institucional.
      </p>
    </div>
  );
}

export function CobrancaLegalBox() {
  return (
    <div className="mb-6 rounded-xl border border-[#ddd9d0] bg-[#f9f6f0] p-4 text-[0.8rem] leading-relaxed text-[#4a4a4a]">
      <div className="mb-2 flex items-center gap-2 font-bold text-[#1a3a2a]">
        <span aria-hidden>⚖️</span>
        Base legal da cobrança
      </div>
      <p className="mb-3">{LEGAL_TEXT}</p>
      {LEGAL_URL ? (
        <a
          href={LEGAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg border-2 border-[#2d5a3d] bg-white px-3 py-2 text-center text-[0.72rem] font-bold text-[#2d5a3d] hover:bg-[#2d5a3d] hover:text-white"
        >
          Consultar documento oficial
        </a>
      ) : null}
    </div>
  );
}
