"use client";

import { AlertTriangle, Banknote, CheckCircle2, ClipboardList, Eye, EyeOff } from "lucide-react";

import type { RouterOutputs } from "~/trpc/react";

import {
  type BillingPaymentStatus,
  isBillingPaid,
  isBillingPendingPayment,
} from "~/lib/billing-status";

export type BillingListItem = RouterOutputs["billing"]["listMine"][number];

export type ParcelasListProps = {
  payments: BillingListItem[] | undefined;
  listLoading: boolean;
  listError: string | null;
  hidePaid: boolean;
  onToggleHidePaid: () => void;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  centsToBrl: (cents: number) => string;
  valueReais: string;
  onValueReaisChange: (v: string) => void;
  description: string;
  onDescriptionChange: (v: string) => void;
  cpfCnpj: string;
  onCpfCnpjChange: (v: string) => void;
  emailBilling: string;
  onEmailBillingChange: (v: string) => void;
  /** Quando o perfil não tem e-mail (login só com documento). */
  emailRequired: boolean;
  onCreateSubmit: (e: React.FormEvent) => void;
  createPending: boolean;
  createError: string | null;
};

function statusPillClass(status: BillingPaymentStatus): string {
  if (isBillingPaid(status)) return "em-dia";
  if (status === "OVERDUE") return "vencida";
  return "pendente";
}

function statusLabel(status: BillingPaymentStatus): string {
  const map: Record<BillingPaymentStatus, string> = {
    PENDING: "Em aberto",
    RECEIVED: "Pago",
    CONFIRMED: "Pago",
    OVERDUE: "Vencida",
    REFUNDED: "Estornada",
    CANCELLED: "Cancelada",
    UNKNOWN: "Indefinido",
  };
  return map[status] ?? status;
}

function TableSkeleton() {
  return (
    <div className="table-scroll-wrap" aria-hidden>
      <table className="debitos-table">
        <tbody>
          {[0, 1, 2].map((i) => (
            <tr key={i}>
              <td style={{ width: 40 }}>
                <div
                  className="cobranca-skeleton"
                  style={{ width: 18, height: 18, borderRadius: 4 }}
                />
              </td>
              <td>
                <div
                  className="cobranca-skeleton"
                  style={{ height: 14, width: "55%" }}
                />
              </td>
              <td>
                <div
                  className="cobranca-skeleton"
                  style={{ height: 22, width: 72, borderRadius: 999 }}
                />
              </td>
              <td className="amount-col">
                <div
                  className="cobranca-skeleton"
                  style={{ height: 14, width: 64, marginLeft: "auto" }}
                />
              </td>
              <td style={{ width: 8 }} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ParcelasList(props: ParcelasListProps) {
  const {
    payments,
    listLoading,
    listError,
    hidePaid,
    onToggleHidePaid,
    selectedId,
    onSelect,
    centsToBrl,
    valueReais,
    onValueReaisChange,
    description,
    onDescriptionChange,
    cpfCnpj,
    onCpfCnpjChange,
    emailBilling,
    onEmailBillingChange,
    emailRequired,
    onCreateSubmit,
    createPending,
    createError,
  } = props;

  const visible = (payments ?? []).filter(
    (p) => !hidePaid || !isBillingPaid(p.status),
  );

  const hasLoaded = !listLoading && payments !== undefined;
  const emptyDatabase = hasLoaded && payments.length === 0;
  const allPaidHidden =
    hasLoaded &&
    payments.length > 0 &&
    visible.length === 0 &&
    payments.every((p) => isBillingPaid(p.status));

  return (
    <div className="card" id="card-parcelas" style={{ marginBottom: "1.5rem" }}>
      <div className="card-header" style={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <Banknote size={16} aria-hidden style={{ flexShrink: 0 }} />
          <span>Parcelas</span>
        </div>
        <div id="anuidades-filter-controls">
          <button
            type="button"
            id="btn-filter-paid"
            className="collapsible-btn"
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.3)",
              fontSize: "0.65rem",
              fontWeight: 700,
            }}
            onClick={onToggleHidePaid}
            disabled={listLoading || !payments?.length}
            aria-pressed={hidePaid}
            title={
              hidePaid
                ? "Mostrar também cobranças já quitadas"
                : "Ocultar cobranças já quitadas"
            }
          >
            {hidePaid ? <><Eye size={12} style={{ display: "inline", marginRight: 4 }} />MOSTRAR TUDO</> : <><EyeOff size={12} style={{ display: "inline", marginRight: 4 }} />OCULTAR PAGAS</>}
          </button>
        </div>
      </div>

      <div id="anuidades-consolidadas" style={{ background: "white" }}>
        {listError ? (
          <div className="cobranca-alert cobranca-alert--error" role="alert" style={{ margin: "1rem" }}>
            <AlertTriangle size={16} aria-hidden style={{ flexShrink: 0 }} />
            <span>
              Não foi possível carregar as cobranças. {listError} Tente atualizar
              a página.
            </span>
          </div>
        ) : null}

        {listLoading ? (
          <>
            <div
              style={{
                padding: "0.8rem 1rem",
                background: "#e0e5e2",
                borderBottom: "2px solid var(--border)",
                fontSize: "0.8rem",
                fontWeight: 800,
                color: "#1a3a2a",
              }}
            >
              <span className="cobranca-skeleton" style={{ display: "inline-block", height: 14, width: 200 }} />
            </div>
            <TableSkeleton />
            <p className="sr-only" aria-live="polite">
              A carregar cobranças…
            </p>
          </>
        ) : null}

        {!listLoading && !listError && emptyDatabase ? (
          <div className="cobranca-alert cobranca-alert--muted" style={{ margin: "1.25rem" }}>
            <ClipboardList size={16} aria-hidden style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ display: "block", marginBottom: "0.35rem" }}>
                Ainda não há cobranças
              </strong>
              Preencha o valor e os dados abaixo. Escolha PIX, boleto ou cartão
              no <strong>resumo à direita</strong> e use{" "}
              <strong>Gerar cobrança</strong> para criar a primeira.
            </div>
          </div>
        ) : null}

        {!listLoading &&
        !listError &&
        !emptyDatabase &&
        allPaidHidden ? (
          <div className="cobranca-alert cobranca-alert--success" style={{ margin: "1.25rem" }}>
            <CheckCircle2 size={16} aria-hidden style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ display: "block", marginBottom: "0.35rem" }}>
                Tudo quitado
              </strong>
              As cobranças pagas estão ocultas. Clique em{" "}
              <strong>Mostrar tudo</strong> para rever o histórico.
            </div>
          </div>
        ) : null}

        {!listLoading && !listError && visible.length > 0 ? (
          <>
            <div
              style={{
                padding: "0.8rem 1rem",
                background: "#e0e5e2",
                borderBottom: "2px solid var(--border)",
                fontSize: "0.8rem",
                fontWeight: 800,
                color: "#1a3a2a",
                lineHeight: 1.4,
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><ClipboardList size={14} /> Cobranças do portal (Asaas)</span>
            </div>
            <div className="table-scroll-wrap">
              <table className="debitos-table">
                <tbody>
                  {visible.map((p) => {
                    const paid = isBillingPaid(p.status);
                    const pending = isBillingPendingPayment(p.status);
                    const active = selectedId === p.id;
                    const refLabel = new Date(p.createdAt).getFullYear().toString();
                    return (
                      <tr
                        key={p.id}
                        className={
                          active ? "parcela-row parcela-row--selected" : undefined
                        }
                        style={paid ? { opacity: 0.88 } : undefined}
                      >
                        <td style={{ width: 40, textAlign: "center" }}>
                          {paid ? (
                            <input
                              type="checkbox"
                              checked
                              disabled
                              className="cobranca-checkbox"
                              aria-label="Cobrança quitada"
                            />
                          ) : (
                            <input
                              type="checkbox"
                              checked={active}
                              onChange={() => {
                                if (!pending) return;
                                onSelect(active ? null : p.id);
                              }}
                              className="cobranca-checkbox"
                              aria-label={`Selecionar cobrança ${refLabel}`}
                            />
                          )}
                        </td>
                        <td style={{ fontWeight: 700, color: "var(--text-dark)", lineHeight: 1.4 }}>
                          <div>{refLabel}{p.description ? <span style={{ fontWeight: 500, fontSize: "0.75rem", color: "var(--text-light)" }}> · {p.description}</span> : null}</div>
                          {"contratoNumero" in p && (p.contratoNumero ?? p.jazigoCodigo) ? (
                            <div style={{ fontWeight: 400, fontSize: "0.7rem", color: "var(--text-light)", marginTop: "0.15rem" }}>
                              {p.contratoNumero ? `Contrato ${p.contratoNumero}` : null}
                              {"jazigoCodigo" in p && p.jazigoCodigo ? (
                                <span>
                                  {p.contratoNumero ? " · " : ""}
                                  {"jazigoQuadra" in p && p.jazigoQuadra ? `Quadra ${p.jazigoQuadra} · ` : ""}
                                  {`Jazigo ${p.jazigoCodigo}`}
                                </span>
                              ) : null}
                            </div>
                          ) : null}
                        </td>
                        <td>
                          <span
                            className={`status-pill ${statusPillClass(p.status)}`}
                            title={statusLabel(p.status)}
                          >
                            <span className="status-text">
                              {statusLabel(p.status)}
                            </span>
                          </span>
                        </td>
                        <td className="amount-col">{centsToBrl(p.valueCents)}</td>
                        <td style={{ textAlign: "right", paddingRight: "1rem" }} />
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : null}
      </div>

      <div
        style={{
          padding: "1rem 1.25rem 1.25rem",
          borderTop: "1px solid var(--border)",
          background: "var(--cream)",
        }}
      >
        <p
          style={{
            fontSize: "0.72rem",
            color: "var(--text-mid)",
            marginBottom: "0.75rem",
            lineHeight: 1.45,
          }}
        >
          Nova cobrança: escolha o meio (PIX, boleto ou cartão) na coluna{" "}
          <strong>Resumo do pagamento</strong> à direita antes de gerar.
        </p>
        <form onSubmit={onCreateSubmit}>
          <div
            style={{
              display: "grid",
              gap: "0.9rem",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <div style={{ gridColumn: "1 / -1" }}>
              <label
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--text-light)",
                }}
              >
                Valor (R$)
              </label>
              <input
                required
                type="text"
                inputMode="decimal"
                value={valueReais}
                onChange={(e) => onValueReaisChange(e.target.value)}
                style={{
                  width: "100%",
                  marginTop: "0.35rem",
                  padding: "0.65rem",
                  borderRadius: "6px",
                  border: "2px solid var(--border)",
                  fontSize: "0.95rem",
                }}
              />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--text-light)",
                }}
              >
                Descrição (opcional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                style={{
                  width: "100%",
                  marginTop: "0.35rem",
                  padding: "0.65rem",
                  borderRadius: "6px",
                  border: "2px solid var(--border)",
                  fontSize: "0.9rem",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--text-light)",
                }}
              >
                CPF / CNPJ (faturação)
              </label>
              <input
                type="text"
                value={cpfCnpj}
                onChange={(e) => onCpfCnpjChange(e.target.value)}
                style={{
                  width: "100%",
                  marginTop: "0.35rem",
                  padding: "0.65rem",
                  borderRadius: "6px",
                  border: "2px solid var(--border)",
                  fontSize: "0.9rem",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--text-light)",
                }}
              >
                E-mail {emailRequired ? "(obrigatório)" : "(opcional)"}
              </label>
              <input
                type="email"
                required={emailRequired}
                value={emailBilling}
                onChange={(e) => onEmailBillingChange(e.target.value)}
                style={{
                  width: "100%",
                  marginTop: "0.35rem",
                  padding: "0.65rem",
                  borderRadius: "6px",
                  border: "2px solid var(--border)",
                  fontSize: "0.9rem",
                }}
              />
            </div>
          </div>
          {createError ? (
            <p
              role="alert"
              style={{
                marginTop: "0.75rem",
                fontSize: "0.8rem",
                color: "#b91c1c",
              }}
            >
              {createError}
            </p>
          ) : null}
          <button
            type="submit"
            className="btn-primary"
            disabled={createPending || listLoading}
            style={{
              width: "100%",
              marginTop: "1rem",
              padding: "0.85rem",
              fontWeight: 800,
            }}
          >
            {createPending ? "A gerar…" : "Gerar cobrança"}
          </button>
        </form>
      </div>
    </div>
  );
}
