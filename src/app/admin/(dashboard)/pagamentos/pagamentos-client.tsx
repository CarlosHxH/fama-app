"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { ExternalLink, Loader2 } from "lucide-react";

import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";

type BillingType = "PIX" | "BOLETO" | "CREDIT_CARD";
type TipoPagamento = "MANUTENCAO" | "TAXA_SERVICO" | "AQUISICAO";

const METHODS: { id: BillingType; label: string; hint: string }[] = [
  {
    id: "PIX",
    label: "PIX",
    hint: "QR e copia-e-cola no portal do cliente",
  },
  {
    id: "BOLETO",
    label: "Boleto",
    hint: "Linha digitável e link do boleto (Asaas)",
  },
  {
    id: "CREDIT_CARD",
    label: "Cartão",
    hint: "Link de fatura / checkout Asaas",
  },
];

function parseReaisToCents(input: string): number {
  const n = Number.parseFloat(input.replace(/\./g, "").replace(",", "."));
  if (Number.isNaN(n)) return 0;
  return Math.round(n * 100);
}

/**
 * Formulário admin: gerar cobrança Asaas (PIX, boleto ou cartão) para um titular.
 */
function canEmitCharges(session: {
  user?: {
    accountKind?: string;
    role?: string;
    staffRole?: string | null;
  };
}) {
  if (
    session.user?.accountKind !== "admin" ||
    session.user?.role !== "ADMIN"
  ) {
    return false;
  }
  const s = session.user.staffRole ?? "ATENDENTE";
  return s === "ADMIN" || s === "FINANCEIRO";
}

export function PagamentosClient() {
  const { data: session, status } = useSession();
  const allowed = canEmitCharges({ user: session?.user });

  const [search, setSearch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [billingType, setBillingType] = useState<BillingType>("PIX");
  const [tipoPagamento, setTipoPagamento] = useState<TipoPagamento>("MANUTENCAO");
  const [contratoId, setContratoId] = useState<string>("");
  const [jazigoId, setJazigoId] = useState<string>("");
  const [valueReais, setValueReais] = useState("50,00");
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().slice(0, 10);
  });
  const [description, setDescription] = useState("");
  const [emailOverride, setEmailOverride] = useState("");
  const [cpfOverride, setCpfOverride] = useState("");

  const usersQuery = api.admin.listUsers.useQuery({
    limit: 50,
    search: search.trim() || undefined,
  });

  const selected = useMemo(() => {
    return usersQuery.data?.items.find((u) => u.id === selectedUserId) ?? null;
  }, [usersQuery.data?.items, selectedUserId]);
  const paymentContextQuery = api.admin.paymentContextForUser.useQuery(
    { userId: selectedUserId ?? "" },
    { enabled: Boolean(selectedUserId) },
  );
  const contratos = paymentContextQuery.data?.contratos ?? [];
  const contratoSelecionado = contratos.find((c) => c.id === contratoId) ?? null;
  const jazigos = contratoSelecionado?.jazigos ?? [];
  const jazigoSelecionado = jazigos.find((j) => j.id === jazigoId) ?? null;
  const responsavelCobranca =
    tipoPagamento === "MANUTENCAO" && jazigoSelecionado
      ? jazigoSelecionado.responsavelCobranca
      : contratoSelecionado?.responsavelCobranca;

  const create = api.admin.createPaymentForUser.useMutation();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedUserId) return;
    if (tipoPagamento === "MANUTENCAO" && !jazigoId) return;
    const cents = parseReaisToCents(valueReais);
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

  const successPayment = create.data;

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center text-sm text-jardim-text-muted">
        A carregar…
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center">
        <p className="text-sm text-jardim-text-muted">
          A sua função no painel não inclui emitir cobranças. Contacte um
          administrador se precisar do papel ADMIN ou FINANCEIRO.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mb-8">
        <h1 className="text-lg font-semibold text-jardim-green-dark sm:text-xl">
          Gerar cobranças
        </h1>
        <p className="mt-1 text-sm text-jardim-text-muted">
          Crie uma cobrança no Asaas para um titular: PIX, boleto ou cartão (link
          de pagamento). Requer{" "}
          <code className="rounded bg-jardim-cream-dark px-1 text-xs">
            ASAAS_API_KEY
          </code>{" "}
          válida no servidor.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-6 rounded-2xl border border-jardim-border bg-jardim-white p-5 shadow-sm sm:p-6"
      >
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-jardim-text-muted">
            Pesquisar cliente
          </label>
          <input
            type="search"
            className="mt-1.5 w-full rounded-xl border border-jardim-border bg-jardim-cream/50 px-3 py-2.5 text-sm text-jardim-text placeholder:text-jardim-text-light focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
            placeholder="Nome, e-mail ou CPF (mín. 2 caracteres para filtrar)"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedUserId(null);
            }}
            autoComplete="off"
          />
          <div className="mt-2 max-h-48 overflow-y-auto rounded-xl border border-jardim-border bg-jardim-cream/30">
            {usersQuery.isLoading ? (
              <p className="p-3 text-center text-xs text-jardim-text-muted">
                A carregar…
              </p>
            ) : (
              <ul className="divide-y divide-jardim-border text-sm">
                {(usersQuery.data?.items ?? []).map((u) => (
                  <li key={u.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedUserId(u.id)}
                      className={cn(
                        "flex w-full flex-col items-start gap-0.5 px-3 py-2.5 text-left transition-colors",
                        selectedUserId === u.id
                          ? "bg-jardim-green-mid/15 text-jardim-green-dark"
                          : "hover:bg-jardim-white",
                      )}
                    >
                      <span className="font-medium">
                        {u.name ?? "Sem nome"}
                      </span>
                      <span className="text-xs text-jardim-text-muted">
                        {u.email ?? "—"} · {u.cpfCnpj ?? "—"} ·{" "}
                        {u._count.billingPayments} cobrança(s)
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {selected ? (
            <p className="mt-2 text-xs text-jardim-green-mid">
              Selecionado: <strong>{selected.name ?? selected.id}</strong>
            </p>
          ) : null}
        </div>

        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-wide text-jardim-text-muted">
            Tipo de pagamento
          </legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {[
              { id: "MANUTENCAO" as const, label: "Manutenção" },
              { id: "TAXA_SERVICO" as const, label: "Taxa de serviço" },
              { id: "AQUISICAO" as const, label: "Aquisição" },
            ].map((t) => (
              <label
                key={t.id}
                className={cn(
                  "flex cursor-pointer flex-col rounded-xl border p-3 transition-colors",
                  tipoPagamento === t.id
                    ? "border-jardim-green-mid bg-jardim-cream ring-1 ring-jardim-green-mid/30"
                    : "border-jardim-border hover:bg-jardim-cream/50",
                )}
              >
                <input
                  type="radio"
                  name="tipoPagamento"
                  className="sr-only"
                  checked={tipoPagamento === t.id}
                  onChange={() => setTipoPagamento(t.id)}
                />
                <span className="text-sm font-semibold text-jardim-green-dark">
                  {t.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-jardim-text-muted">
              Contrato
            </label>
            <select
              className="mt-1.5 w-full rounded-xl border border-jardim-border px-3 py-2.5 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
              value={contratoId}
              onChange={(e) => {
                setContratoId(e.target.value);
                setJazigoId("");
              }}
              disabled={!selectedUserId || paymentContextQuery.isLoading}
            >
              <option value="">Sem contrato específico</option>
              {contratos.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.numeroContrato} ({c.situacao})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-jardim-text-muted">
              Jazigo {tipoPagamento === "MANUTENCAO" ? "(obrigatório)" : "(opcional)"}
            </label>
            <select
              className="mt-1.5 w-full rounded-xl border border-jardim-border px-3 py-2.5 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
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

        {contratoSelecionado ? (
          <div className="rounded-xl border border-jardim-border bg-jardim-cream/40 px-3 py-2 text-xs text-jardim-text-muted">
            Cobrança em nome de:{" "}
            <strong className="text-jardim-green-dark">
              {responsavelCobranca?.nome ?? selected?.name ?? "Titular"}
            </strong>
            {responsavelCobranca?.cpf ? ` · CPF ${responsavelCobranca.cpf}` : ""}
            {responsavelCobranca ? (
              <span className="ml-1 text-jardim-text-light">
                (
                {responsavelCobranca.fonte === "customer_jazigo"
                  ? "pagador por jazigo (cliente)"
                  : responsavelCobranca.fonte === "contrato_legado"
                    ? "responsável do contrato (sync)"
                    : "titular"}
                )
              </span>
            ) : null}
          </div>
        ) : null}

        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-wide text-jardim-text-muted">
            Meio de pagamento
          </legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {METHODS.map((m) => (
              <label
                key={m.id}
                className={cn(
                  "flex cursor-pointer flex-col rounded-xl border p-3 transition-colors",
                  billingType === m.id
                    ? "border-jardim-green-mid bg-jardim-cream ring-1 ring-jardim-green-mid/30"
                    : "border-jardim-border hover:bg-jardim-cream/50",
                )}
              >
                <input
                  type="radio"
                  name="billingType"
                  className="sr-only"
                  checked={billingType === m.id}
                  onChange={() => setBillingType(m.id)}
                />
                <span className="text-sm font-semibold text-jardim-green-dark">
                  {m.label}
                </span>
                <span className="mt-0.5 text-[11px] leading-snug text-jardim-text-muted">
                  {m.hint}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-jardim-text-muted">
              Valor (R$)
            </label>
            <input
              required
              className="mt-1.5 w-full rounded-xl border border-jardim-border px-3 py-2.5 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
              value={valueReais}
              onChange={(e) => setValueReais(e.target.value)}
              inputMode="decimal"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-jardim-text-muted">
              Vencimento
            </label>
            <input
              type="date"
              required
              className="mt-1.5 w-full rounded-xl border border-jardim-border px-3 py-2.5 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-jardim-text-muted">
            Descrição (opcional)
          </label>
          <input
            className="mt-1.5 w-full rounded-xl border border-jardim-border px-3 py-2.5 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex.: Anuidade jazigo"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-jardim-text-muted">
              E-mail (override Asaas)
            </label>
            <input
              type="email"
              className="mt-1.5 w-full rounded-xl border border-jardim-border px-3 py-2.5 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
              value={emailOverride}
              onChange={(e) => setEmailOverride(e.target.value)}
              placeholder="Se vazio, usa o do perfil"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-jardim-text-muted">
              CPF/CNPJ (override)
            </label>
            <input
              className="mt-1.5 w-full rounded-xl border border-jardim-border px-3 py-2.5 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
              value={cpfOverride}
              onChange={(e) => setCpfOverride(e.target.value)}
              placeholder="Se vazio, usa o do perfil"
            />
          </div>
        </div>

        {create.error ? (
          <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800 ring-1 ring-red-200">
            {create.error.message}
          </p>
        ) : null}

        {successPayment ? (
          <div className="rounded-xl border border-jardim-green-mid/30 bg-jardim-cream px-4 py-3 text-sm text-jardim-green-dark">
            <p className="font-semibold">Cobrança criada</p>
            <p className="mt-1 text-xs text-jardim-text-muted">
              ID Asaas: {successPayment.asaasId}
            </p>
            {(() => {
              const payUrl = successPayment.invoiceUrl;
              return payUrl ? (
                <Link
                  href={payUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 font-medium text-jardim-green-mid underline-offset-2 hover:underline"
                >
                  Abrir link de pagamento <ExternalLink className="h-4 w-4" />
                </Link>
              ) : null;
            })()}
            {successPayment.metodoPagamento === "PIX" ? (
              <p className="mt-2 break-all font-mono text-xs">
                PIX copia-e-cola disponível no registo (portal).
              </p>
            ) : null}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={
            !selectedUserId ||
            create.isPending ||
            (tipoPagamento === "MANUTENCAO" && !jazigoId)
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
