import { FileText, Info, Scale } from "lucide-react";

const LEGAL_URL =
  process.env.NEXT_PUBLIC_COBRANCA_LEGAL_URL ??
  "https://www.goiania.go.gov.br/html/gabinete_civil/sileg/dados/legis/2023/dc_20230915_000004332.html";

/**
 * Aviso "sem juros" + base legal (markup alinhado ao HTML estático).
 */
export function CobrancaNoticeBox() {
  return (
    <div className="notice-box">
      <Info size={16} className="ni" style={{ flexShrink: 0 }} />
      <p>
        <strong>Sem juros e sem multas:</strong> No Jardim das Palmeiras, a
        regularização é facilitada. Você paga apenas o valor nominal das
        anuidades em aberto, sem qualquer acréscimo.
      </p>
    </div>
  );
}

export function CobrancaLegalBox() {
  return (
    <div
      className="help-box"
      style={{
        background: "#f9f6f0",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)",
        padding: "1.25rem",
        marginTop: "1.5rem",
        fontSize: "0.8rem",
        color: "var(--text-mid)",
        lineHeight: 1.6,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          marginBottom: "0.6rem",
          color: "var(--green-dark)",
          fontWeight: 700,
        }}
      >
        <Scale size={16} style={{ flexShrink: 0 }} /> Base Legal da Cobrança
      </div>
      <p style={{ marginBottom: "0.8rem" }}>
        As tarifas de manutenção do Cemitério Jardim das Palmeiras são amparadas
        pelo <strong>Decreto Municipal nº 4.332/2023</strong>.
      </p>
      <p style={{ marginBottom: "1rem" }}>
        Os recursos arrecadados garantem a preservação do campo santo e sustentam
        os projetos sociais da <strong>FAMA</strong>, instituição filantrópica
        que atende crianças e adolescentes em vulnerabilidade em Goiânia.
      </p>
      <a
        href={LEGAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="cobranca-legal-link"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          background: "var(--white)",
          border: "1.5px solid var(--green-mid)",
          color: "var(--green-mid)",
          textDecoration: "none",
          padding: "0.65rem",
          borderRadius: "6px",
          fontWeight: 700,
          fontSize: "0.75rem",
          transition: "background 0.2s, color 0.2s",
        }}
      >
        <FileText size={14} /> CONSULTAR DECRETO MUNICIPAL (LEGIS)
      </a>
    </div>
  );
}
