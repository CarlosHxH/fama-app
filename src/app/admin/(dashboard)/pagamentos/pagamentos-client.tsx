"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  useDeferredValue,
  useMemo,
  useState,
} from "react";
import {
  Check,
  ChevronDown,
  ClipboardCopy,
  ExternalLink,
  Loader2,
  RotateCcw,
  User,
  Zap,
} from "lucide-react";

import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type BillingType = "PIX" | "BOLETO" | "CREDIT_CARD";
type TipoPagamento = "MANUTENCAO" | "TAXA_SERVICO" | "AQUISICAO";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseReaisToCents(v: string): number {
  const n = Number.parseFloat(v.replace(/\./g, "").replace(",", "."));
  return isNaN(n) ? 0 : Math.round(n * 100);
}

function fmtBrl(cents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}

function fmtCpf(cpf: string | null | undefined) {
  if (!cpf) return "—";
  const d = cpf.replace(/\D/g, "");
  if (d.length === 11) return d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  if (d.length === 14) return d.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  return cpf;
}

/** Extrai dados PIX/boleto do webhookData armazenado na criação da cobrança. */
function extractWebhookMeta(data: unknown) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return { pixCopiaECola: null, boletoLine: null, pixQrCode: null };
  }
  const m = data as Record<string, unknown>;
  return {
    pixCopiaECola: typeof m.pixCopiaECola === "string" ? m.pixCopiaECola : null,
    pixQrCode: typeof m.encodedImage === "string" ? m.encodedImage : null,
    boletoLine: typeof m.identificationField === "string" ? m.identificationField : null,
  };
}

function canEmitCharges(session: {
  user?: { accountKind?: string; role?: string; staffRole?: string | null };
}) {
  if (session.user?.accountKind !== "admin" || session.user?.role !== "ADMIN") return false;
  const s = session.user.staffRole ?? "ATENDENTE";
  return s === "ADMIN" || s === "FINANCEIRO";
}

// ─── Small UI pieces ──────────────────────────────────────────────────────────

function SectionLabel({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-jardim-green-dark text-[10px] font-bold text-white">
        {n}
      </span>
      <span className="text-xs font-semibold uppercase tracking-wide text-jardim-text-muted">
        {children}
      </span>
    </div>
  );
}

function RadioCard({
  checked,
  onChange,
  title,
  hint,
}: {
  checked: boolean;
  onChange: () => void;
  title: string;
  hint?: string;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer flex-col rounded-xl border p-3 transition-colors",
        checked
          ? "border-jardim-green-mid bg-jardim-cream ring-1 ring-jardim-green-mid/30"
          : "border-jardim-border hover:bg-jardim-cream/50",
      )}
    >
      <input type="radio" className="sr-only" checked={checked} onChange={onChange} />
      <span className="text-sm font-semibold text-jardim-green-dark">{title}</span>
      {hint && (
        <span className="mt-0.5 text-[11px] leading-snug text-jardim-text-muted">{hint}</span>
      )}
    </label>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-lg border border-jardim-border bg-jardim-white px-3 py-1.5 text-xs font-medium text-jardim-green-dark transition hover:bg-jardim-cream"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <ClipboardCopy className="h-3.5 w-3.5" />}
      {copied ? "Copiado!" : label}
    </button>
  );
}

// ─── Success card ─────────────────────────────────────────────────────────────

function SuccessCard({
  payment,
  onReset,
}: {
  payment: {
    id: string;
    asaasId: string | null;
    invoiceUrl: string | null;
    metodoPagamento: string | null;
    valorTitulo: unknown;
    webhookData: unknown;
  };
  onReset: () => void;
}) {
  const { pixCopiaECola, boletoLine } = extractWebhookMeta(payment.webhookData);
  const isPix = payment.metodoPagamento === "PIX";
  const isBoleto = payment.metodoPagamento === "BOLETO";

  return (
    <div className="space-y-4 rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600">
          <Check className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="font-semibold text-green-800">Cobrança criada com sucesso</p>
          {payment.asaasId && (
            <p className="mt-0.5 font-mono text-xs text-green-700">
              Asaas ID: {payment.asaasId}
            </p>
          )}
        </div>
      </div>

      {/* PIX copia-e-cola */}
      {isPix && pixCopiaECola && (
        <div className="rounded-xl border border-green-200 bg-white p-3">
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
            PIX copia-e-cola
          </p>
          <p className="mb-2 break-all font-mono text-xs text-jardim-text">
            {pixCopiaECola}
          </p>
          <CopyButton text={pixCopiaECola} label="Copiar código PIX" />
        </div>
      )}

      {/* Linha digitável do boleto */}
      {isBoleto && boletoLine && (
        <div className="rounded-xl border border-green-200 bg-white p-3">
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
            Linha digitável
          </p>
          <p className="mb-2 break-all font-mono text-xs text-jardim-text">
            {boletoLine}
          </p>
          <CopyButton text={boletoLine} label="Copiar linha digitável" />
        </div>
      )}

      {/* Links de ação */}
      <div className="flex flex-wrap gap-2">
        {payment.invoiceUrl && (
          <Link
            href={payment.invoiceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-green-300 bg-white px-3 py-1.5 text-xs font-medium text-green-800 transition hover:bg-green-50"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Abrir fatura / link de pagamento
          </Link>
        )}
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-lg border border-jardim-border bg-white px-3 py-1.5 text-xs font-medium text-jardim-green-dark transition hover:bg-jardim-cream"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Gerar outra cobrança
        </button>
      </div>
    </div>
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────

export function PagamentosClient() {
  const { data: session, status } = useSession();
  const allowed = canEmitCharges({ user: session?.user });

  // Search
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search.trim());

  // Form state
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [billingType, setBillingType] = useState<BillingType>("PIX");
  const [tipoPagamento, setTipoPagamento] = useState<TipoPagamento>("MANUTENCAO");
  const [contratoId, setContratoId] = useState("");
  const [jazigoId, setJazigoId] = useState("");
  const [valueReais, setValueReais] = useState("");
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().slice(0, 10);
  });
  const [description, setDescription] = useState("");
  const [emailOverride, setEmailOverride] = useState("");
  const [cpfOverride, setCpfOverride] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(false);

  // Queries
  const usersQuery = api.admin.listUsers.useQuery(
    { limit: 40, search: deferredSearch.length >= 2 ? deferredSearch : undefined },
    { enabled: deferredSearch.length >= 2 },
  );

  const paymentContextQuery = api.admin.paymentContextForUser.useQuery(
    { userId: selectedUserId ?? "" },
    { enabled: Boolean(selectedUserId) },
  );

  const create = api.admin.createPaymentForUser.useMutation();

  // Derived state
  const selected = useMemo(
    () => usersQuery.data?.items.find((u) => u.id === selectedUserId) ?? null,
    [usersQuery.data?.items, selectedUserId],
  );

  const contratos = paymentContextQuery.data?.contratos ?? [];
  const contratoSelecionado = contratos.find((c) => c.id === contratoId) ?? null;
  const jazigos = contratoSelecionado?.jazigos ?? [];
  const jazigoSelecionado = jazigos.find((j) => j.id === jazigoId) ?? null;

  const responsavelCobranca =
    tipoPagamento === "MANUTENCAO" && jazigoSelecionado
      ? jazigoSelecionado.responsavelCobranca
      : contratoSelecionado?.responsavelCobranca;

  // When context loads, auto-select the single contract (if only one)
  const prevContratosLen = contratos.length;
  if (selectedUserId && contratos.length === 1 && !contratoId && prevContratosLen !== 0) {
    setContratoId(contratos[0]!.id);
  }

  function resetForm() {
    setSearch("");
    setSelectedUserId(null);
    setBillingType("PIX");
    setTipoPagamento("MANUTENCAO");
    setContratoId("");
    setJazigoId("");
    setValueReais("");
    setDueDate(() => {
      const d = new Date();
      d.setDate(d.getDate() + 3);
      return d.toISOString().slice(0, 10);
    });
    setDescription("");
    setEmailOverride("");
    setCpfOverride("");
    setAdvancedOpen(false);
    create.reset();
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedUserId) return;
    if (tipoPagamento === "MANUTENCAO" && !jazigoId) return;
    const cents = parseReaisToCents(valueReais);
    if (cents < 100) return;
    create.mutate({
      userId: selectedUserId,
      valueCents: cents,
      dueDate: new Date(dueDate + "T12:00:00"),
      billingType,
      tipoPagamento,
      contratoId: contratoId || undefined,
      jazigoId: tipoPagamento === "MANUTENCAO" ? jazigoId || undefined : undefined,
      description: description.trim() || undefined,
      email: emailOverride.trim() || undefined,
      cpfCnpj: cpfOverride.replace(/\D/g, "") || undefined,
    });
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center gap-2 px-4 py-12 text-sm text-jardim-text-muted">
        <Loader2 className="h-4 w-4 animate-spin" />
        A carregar…
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center">
        <p className="text-sm text-jardim-text-muted">
          A sua função no painel não inclui emitir cobranças. Contacte um administrador
          para obter o papel ADMIN ou FINANCEIRO.
        </p>
      </div>
    );
  }

  // ── Success state ──
  if (create.isSuccess && create.data) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-6">
          <h1 className="text-lg font-semibold text-jardim-green-dark sm:text-xl">
            Gerar cobranças
          </h1>
        </div>
        <SuccessCard payment={create.data} onReset={resetForm} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-jardim-green-dark sm:text-xl">
          Gerar cobranças
        </h1>
        <p className="mt-1 text-sm text-jardim-text-muted">
          Cria uma cobrança no Asaas para um titular: PIX, boleto ou cartão.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">

        {/* ── 1. Cliente ── */}
        <section className="rounded-2xl border border-jardim-border bg-jardim-white p-5 shadow-sm sm:p-6">
          <SectionLabel n={1}>Cliente</SectionLabel>

          <div className="mt-4">
            <input
              type="search"
              className="w-full rounded-xl border border-jardim-border bg-jardim-cream/50 px-3 py-2.5 text-sm text-jardim-text placeholder:text-jardim-text-light focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
              placeholder="Nome, e-mail ou CPF (mín. 2 caracteres)"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedUserId(null);
                setContratoId("");
                setJazigoId("");
              }}
              autoComplete="off"
            />

            {/* Results */}
            {deferredSearch.length < 2 ? (
              <p className="mt-2 text-xs text-jardim-text-light">
                Digite pelo menos 2 caracteres para pesquisar.
              </p>
            ) : usersQuery.isFetching ? (
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-jardim-border bg-jardim-cream/30 px-3 py-3 text-xs text-jardim-text-muted">
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                A pesquisar…
              </div>
            ) : (usersQuery.data?.items ?? []).length === 0 ? (
              <p className="mt-2 text-xs text-jardim-text-muted">
                Nenhum cliente encontrado.
              </p>
            ) : (
              <ul className="mt-2 max-h-44 divide-y divide-jardim-border overflow-y-auto rounded-xl border border-jardim-border bg-jardim-cream/30 text-sm">
                {(usersQuery.data?.items ?? []).map((u) => (
                  <li key={u.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedUserId(u.id);
                        setContratoId("");
                        setJazigoId("");
                      }}
                      className={cn(
                        "flex w-full flex-col items-start gap-0.5 px-3 py-2.5 text-left transition-colors",
                        selectedUserId === u.id
                          ? "bg-jardim-green-mid/15"
                          : "hover:bg-jardim-white",
                      )}
                    >
                      <span className="font-medium text-jardim-green-dark">
                        {u.name ?? "Sem nome"}
                        {selectedUserId === u.id && (
                          <Check className="ml-1.5 inline h-3.5 w-3.5 text-jardim-green-mid" />
                        )}
                      </span>
                      <span className="text-xs text-jardim-text-muted">
                        {fmtCpf(u.cpfCnpj)} · {u.email ?? "sem e-mail"} ·{" "}
                        {u._count.billingPayments} cobrança(s)
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Selected customer card */}
          {selected && (
            <div className="mt-3 flex items-center gap-3 rounded-xl border border-jardim-green-mid/30 bg-jardim-cream px-3 py-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-jardim-green-dark text-white">
                <User className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold text-jardim-green-dark">
                  {selected.name}
                </p>
                <p className="truncate text-xs text-jardim-text-muted">
                  {fmtCpf(selected.cpfCnpj)} · {selected.email ?? "sem e-mail"}
                </p>
              </div>
            </div>
          )}
        </section>

        {/* ── 2. Contrato & Jazigo ── */}
        <section className="rounded-2xl border border-jardim-border bg-jardim-white p-5 shadow-sm sm:p-6">
          <SectionLabel n={2}>Contrato e jazigo</SectionLabel>

          {!selectedUserId ? (
            <p className="mt-3 text-xs text-jardim-text-light">
              Selecione um cliente primeiro.
            </p>
          ) : paymentContextQuery.isLoading ? (
            <div className="mt-3 flex items-center gap-2 text-xs text-jardim-text-muted">
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
              A carregar contratos…
            </div>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
                  Contrato
                </label>
                <select
                  className="mt-1.5 w-full rounded-xl border border-jardim-border bg-jardim-white px-3 py-2.5 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
                  value={contratoId}
                  onChange={(e) => {
                    setContratoId(e.target.value);
                    setJazigoId("");
                  }}
                >
                  <option value="">Sem contrato específico</option>
                  {contratos.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.numeroContrato} — {c.situacao}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
                  Jazigo{tipoPagamento === "MANUTENCAO" ? " (obrigatório)" : " (opcional)"}
                </label>
                <select
                  className="mt-1.5 w-full rounded-xl border border-jardim-border bg-jardim-white px-3 py-2.5 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25 disabled:bg-jardim-cream/50"
                  value={jazigoId}
                  onChange={(e) => setJazigoId(e.target.value)}
                  disabled={!contratoId}
                  required={tipoPagamento === "MANUTENCAO"}
                >
                  <option value="">Selecionar jazigo</option>
                  {jazigos.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.codigo} · {j.quantidadeGavetas} gavetas
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Responsável info */}
          {contratoSelecionado && (
            <div className="mt-3 rounded-xl border border-jardim-border bg-jardim-cream/40 px-3 py-2.5 text-xs">
              <p className="font-semibold uppercase tracking-wide text-jardim-text-muted">
                Cobrança em nome de
              </p>
              <p className="mt-0.5 font-medium text-jardim-green-dark">
                {responsavelCobranca?.nome ?? selected?.name ?? "Titular"}
              </p>
              {responsavelCobranca?.cpf && (
                <p className="text-jardim-text-muted">
                  CPF/CNPJ: {fmtCpf(responsavelCobranca.cpf)}
                </p>
              )}
              {responsavelCobranca && (
                <p className="mt-0.5 text-jardim-text-light">
                  {responsavelCobranca.fonte === "customer_jazigo"
                    ? "Pagador definido por jazigo"
                    : responsavelCobranca.fonte === "contrato_legado"
                      ? "Responsável do contrato (sync)"
                      : "Titular do contrato"}
                </p>
              )}
            </div>
          )}
        </section>

        {/* ── 3. Cobrança ── */}
        <section className="rounded-2xl border border-jardim-border bg-jardim-white p-5 shadow-sm sm:p-6">
          <SectionLabel n={3}>Cobrança</SectionLabel>

          <div className="mt-4 space-y-5">
            {/* Tipo de pagamento */}
            <fieldset>
              <legend className="text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
                Tipo
              </legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {[
                  { id: "MANUTENCAO" as const, label: "Manutenção" },
                  { id: "TAXA_SERVICO" as const, label: "Taxa de serviço" },
                  { id: "AQUISICAO" as const, label: "Aquisição" },
                ].map((t) => (
                  <RadioCard
                    key={t.id}
                    checked={tipoPagamento === t.id}
                    onChange={() => setTipoPagamento(t.id)}
                    title={t.label}
                  />
                ))}
              </div>
            </fieldset>

            {/* Meio de pagamento */}
            <fieldset>
              <legend className="text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
                Meio de pagamento
              </legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {[
                  { id: "PIX" as const, label: "PIX", hint: "QR e copia-e-cola" },
                  { id: "BOLETO" as const, label: "Boleto", hint: "Linha digitável (Asaas)" },
                  { id: "CREDIT_CARD" as const, label: "Cartão", hint: "Link de checkout Asaas" },
                ].map((m) => (
                  <RadioCard
                    key={m.id}
                    checked={billingType === m.id}
                    onChange={() => setBillingType(m.id)}
                    title={m.label}
                    hint={m.hint}
                  />
                ))}
              </div>
            </fieldset>

            {/* Valor e vencimento */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
                    Valor (R$)
                  </label>
                  {jazigoSelecionado && (
                    <button
                      type="button"
                      onClick={() => {
                        const dec = jazigoSelecionado.valorMensalidade;
                        const n = Number(dec);
                        if (!isNaN(n)) setValueReais(n.toFixed(2).replace(".", ","));
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-jardim-green-mid hover:underline"
                    >
                      <Zap className="h-3 w-3" aria-hidden />
                      Usar mensalidade (
                      {fmtBrl(Math.round(Number(jazigoSelecionado.valorMensalidade) * 100))})
                    </button>
                  )}
                </div>
                <input
                  required
                  inputMode="decimal"
                  placeholder="0,00"
                  className="mt-1.5 w-full rounded-xl border border-jardim-border px-3 py-2.5 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
                  value={valueReais}
                  onChange={(e) => setValueReais(e.target.value)}
                />
                {valueReais && parseReaisToCents(valueReais) < 100 && (
                  <p className="mt-1 text-xs text-red-600">Valor mínimo: R$&nbsp;1,00</p>
                )}
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
                  Vencimento
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().slice(0, 10)}
                  className="mt-1.5 w-full rounded-xl border border-jardim-border px-3 py-2.5 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
                Descrição (opcional)
              </label>
              <input
                className="mt-1.5 w-full rounded-xl border border-jardim-border px-3 py-2.5 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex.: Manutenção — Jazigo A-01 — Janeiro 2026"
                maxLength={500}
              />
            </div>
          </div>
        </section>

        {/* ── 4. Avançado (collapsible) ── */}
        <section className="rounded-2xl border border-jardim-border bg-jardim-white shadow-sm">
          <button
            type="button"
            onClick={() => setAdvancedOpen((v) => !v)}
            className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-jardim-text-muted">
              Avançado — substituir e-mail / CPF no Asaas
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-jardim-text-muted transition-transform",
                advancedOpen && "rotate-180",
              )}
              aria-hidden
            />
          </button>
          {advancedOpen && (
            <div className="border-t border-jardim-border px-5 pb-5 pt-4">
              <p className="mb-3 text-xs text-jardim-text-muted">
                Deixe em branco para usar os dados do responsável financeiro resolvido
                automaticamente.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
                    E-mail (override)
                  </label>
                  <input
                    type="email"
                    className="mt-1.5 w-full rounded-xl border border-jardim-border px-3 py-2.5 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
                    value={emailOverride}
                    onChange={(e) => setEmailOverride(e.target.value)}
                    placeholder="outro@email.com"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
                    CPF/CNPJ (override)
                  </label>
                  <input
                    className="mt-1.5 w-full rounded-xl border border-jardim-border px-3 py-2.5 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
                    value={cpfOverride}
                    onChange={(e) => setCpfOverride(e.target.value)}
                    placeholder="000.000.000-00"
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Error */}
        {create.error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800 ring-1 ring-red-200">
            {create.error.message}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={
            !selectedUserId ||
            create.isPending ||
            (tipoPagamento === "MANUTENCAO" && !jazigoId) ||
            parseReaisToCents(valueReais) < 100
          }
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-jardim-green-dark py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-jardim-green-mid disabled:opacity-50"
        >
          {create.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              A gerar…
            </>
          ) : (
            "Gerar cobrança"
          )}
        </button>
      </form>
    </div>
  );
}
