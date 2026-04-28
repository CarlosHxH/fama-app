"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  CreditCard,
  ExternalLink,
  Hash,
  Loader2,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Trash2,
  User,
  X,
} from "lucide-react";

import { api } from "~/trpc/react";
import { formatCpfCnpjDisplay } from "~/lib/format-cpf-cnpj";
import { cn } from "~/lib/utils";

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const STATUS_LABEL: Record<string, string> = {
  PENDENTE: "Em aberto",
  PAGO: "Recebido",
  ATRASADO: "Vencido",
  CANCELADO: "Cancelado",
  ESTORNADO: "Estornado",
};

function statusBadgeClass(status: string) {
  switch (status) {
    case "PAGO": return "bg-jardim-green-mid/12 text-jardim-green-dark ring-jardim-green-mid/25";
    case "PENDENTE": return "bg-jardim-cream-dark text-jardim-green-mid ring-jardim-border";
    case "ATRASADO": return "bg-red-50 text-red-800 ring-red-200";
    default: return "bg-jardim-cream-dark text-jardim-text-muted ring-jardim-border";
  }
}

// ─── Editable field ──────────────────────────────────────────────────────────

type EFProps = {
  value: string;
  placeholder?: string;
  type?: "text" | "email" | "tel";
  readOnly?: boolean;
  disabled?: boolean;
  onSave: (val: string) => Promise<void>;
};

function EF({ value, placeholder = "—", type = "text", readOnly = false, disabled = false, onSave }: EFProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => { setDraft(value); }, [value]);
  useEffect(() => { if (editing) ref.current?.focus(); }, [editing]);

  async function save() {
    if (draft === value) { setEditing(false); return; }
    setSaving(true); setError(null);
    try { await onSave(draft.trim()); setEditing(false); }
    catch (e: unknown) { setError(e instanceof Error ? e.message : "Erro ao salvar."); }
    finally { setSaving(false); }
  }
  function cancel() { setDraft(value); setEditing(false); setError(null); }

  if (readOnly || disabled) {
    return <span className="font-medium text-jardim-text">{value || <span className="italic text-jardim-text-light">{placeholder}</span>}</span>;
  }

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="group inline-flex items-center gap-1.5 rounded px-1 py-0.5 -mx-1 text-left font-medium text-jardim-text transition hover:bg-jardim-cream"
        title="Clique para editar"
      >
        <span>{value || <span className="italic text-jardim-text-light">{placeholder}</span>}</span>
        <Pencil className="h-3 w-3 shrink-0 text-jardim-text-light opacity-0 group-hover:opacity-100 transition" aria-hidden />
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5">
        <input
          ref={ref}
          type={type}
          value={draft}
          disabled={saving}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") void save(); if (e.key === "Escape") cancel(); }}
          className={cn(
            "flex-1 rounded-lg border px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25",
            error ? "border-red-400 focus:border-red-400" : "border-jardim-green-mid focus:border-jardim-green-mid",
          )}
        />
        <button type="button" onClick={() => void save()} disabled={saving} className="rounded-lg bg-jardim-green-mid p-1.5 text-white hover:opacity-90 disabled:opacity-50">
          <Check className="h-3.5 w-3.5" aria-hidden />
        </button>
        <button type="button" onClick={cancel} className="rounded-lg bg-jardim-cream p-1.5 hover:bg-jardim-cream-dark">
          <X className="h-3.5 w-3.5 text-jardim-text" aria-hidden />
        </button>
      </div>
      {error && <span className="text-xs text-red-700">{error}</span>}
    </div>
  );
}

// ─── Section heading ─────────────────────────────────────────────────────────

function SectionHead({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-jardim-green-dark">
      <span className="text-jardim-green-mid">{icon}</span>
      {label}
    </h2>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">{label}</dt>
      <dd className="mt-0.5 text-sm">{children}</dd>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function ClienteDetalhesClient() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";
  const { data: session } = useSession();
  const isAdmin = session?.user?.staffRole === "ADMIN";
  const canEdit = session?.user?.staffRole === "ADMIN" || session?.user?.staffRole === "FINANCEIRO";

  const utils = api.useUtils();
  const q = api.admin.getCustomerById.useQuery({ id }, { enabled: Boolean(id) });
  const caps = api.admin.getCapabilities.useQuery();

  const canEditContacts = caps.data?.canEditCustomerContacts ?? false;

  const updateCustomer = api.admin.updateCustomer.useMutation({
    onSuccess: () => utils.admin.getCustomerById.invalidate({ id }),
  });
  const upsertAddress = api.admin.upsertCustomerAddress.useMutation({
    onSuccess: () => utils.admin.getCustomerById.invalidate({ id }),
  });
  const deleteAddress = api.admin.deleteCustomerAddress.useMutation({
    onSuccess: () => utils.admin.getCustomerById.invalidate({ id }),
  });
  const cancelCharge = api.admin.cancelCustomerCharge.useMutation({
    onSuccess: () => utils.admin.getCustomerById.invalidate({ id }),
  });
  const deletePayment = api.admin.deleteManualPayment.useMutation({
    onSuccess: () => utils.admin.getCustomerById.invalidate({ id }),
  });

  const [confirmPaymentAction, setConfirmPaymentAction] = useState<{ id: string; action: "cancel" | "delete" } | null>(null);
  const [addingAddress, setAddingAddress] = useState(false);

  if (!id) return <div className="px-4 py-12 text-center text-sm text-red-800">Identificador inválido.</div>;

  if (q.isLoading) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-3 px-4 py-20 text-jardim-text-muted">
        <Loader2 className="h-9 w-9 animate-spin text-jardim-green-mid" aria-hidden />
        <p className="text-sm">A carregar ficha do cliente…</p>
      </div>
    );
  }

  if (q.isError || !q.data) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center">
        <p className="text-sm text-red-800">Cliente não encontrado.</p>
        <Link href="/admin/clientes" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-jardim-green-mid hover:underline">
          <ArrowLeft className="h-4 w-4" /> Voltar à lista
        </Link>
      </div>
    );
  }

  const c = q.data;

  async function saveField(field: "nome" | "email" | "ativo", val: string | boolean) {
    await updateCustomer.mutateAsync({ id, [field]: val });
  }

  async function saveAddress(addrId: string | undefined, field: string, val: string) {
    await upsertAddress.mutateAsync({ customerId: id, id: addrId, [field]: val });
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href="/admin/clientes" className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-jardim-green-mid hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" /> Clientes
          </Link>
          <h1 className="text-lg font-semibold text-jardim-green-dark sm:text-xl">{c.nome}</h1>
          <p className="mt-1 text-sm text-jardim-text-muted">
            Titular do portal ·{" "}
            <span className="font-mono tabular-nums text-jardim-text">{formatCpfCnpjDisplay(c.cpfCnpj)}</span>
          </p>
        </div>
      </div>

      {/* ── Dados Cadastrais ── */}
      <section className="rounded-2xl border border-jardim-border bg-jardim-white p-5 shadow-sm sm:p-6">
        <SectionHead icon={<User className="h-4 w-4" />} label="Dados cadastrais" />
        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          <Field label="Nome completo">
            <EF value={c.nome} placeholder="Nome" disabled={!canEditContacts} onSave={(v) => saveField("nome", v)} />
          </Field>
          <Field label="E-mail">
            <EF value={c.email ?? ""} placeholder="—" type="email" disabled={!canEditContacts} onSave={(v) => saveField("email", v)} />
          </Field>
          <Field label="CPF / CNPJ">
            <EF value={formatCpfCnpjDisplay(c.cpfCnpj)} readOnly onSave={async () => undefined} />
          </Field>
          <Field label="Estado da conta">
            <div className="flex items-center gap-2">
              <span className={cn("inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
                c.ativo
                  ? "bg-jardim-green-mid/12 text-jardim-green-dark ring-jardim-green-mid/25"
                  : "bg-jardim-cream-dark text-jardim-text-muted ring-jardim-border",
              )}>
                {c.ativo ? "Ativo" : "Inativo"}
              </span>
              {canEditContacts && (
                <button
                  type="button"
                  onClick={() => void saveField("ativo", !c.ativo)}
                  className="text-xs font-medium text-jardim-green-mid hover:underline"
                >
                  {c.ativo ? "Desativar" : "Ativar"}
                </button>
              )}
            </div>
          </Field>
          <Field label="Primeiro acesso">
            {c.primeiroAcesso
              ? <span className="text-amber-800 text-xs font-medium">Pendente</span>
              : <span className="text-jardim-text">Configurado</span>}
          </Field>
          <Field label="Tentativas de login">
            <span className="tabular-nums">
              {c.tentativasLogin}
              {c.bloqueadoAte && (
                <span className="ml-2 text-xs text-red-800">
                  Bloqueado até {new Date(c.bloqueadoAte).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
                </span>
              )}
            </span>
          </Field>
          <Field label="Criado em">
            {new Date(c.createdAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
          </Field>
          <Field label="Atualizado em">
            {new Date(c.updatedAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
          </Field>
        </dl>
      </section>

      {/* ── Telefones ── */}
      <section className="overflow-hidden rounded-2xl border border-jardim-border bg-jardim-white shadow-sm">
        <div className="border-b border-jardim-border bg-jardim-cream/50 px-5 py-4 sm:px-6">
          <SectionHead icon={<Phone className="h-4 w-4" />} label="Telefones" />
        </div>
        <div className="px-5 py-4 sm:px-6">
          {c.telefones.length === 0 && (
            <p className="text-sm italic text-jardim-text-light mb-3">Nenhum telefone cadastrado.</p>
          )}
          {c.telefones.map((tel) => (
            <TelRow key={tel.id} tel={tel} canEdit={canEditContacts} customerId={id} onDone={() => utils.admin.getCustomerById.invalidate({ id })} />
          ))}
          {canEditContacts && (
            <AddTelForm customerId={id} onDone={() => utils.admin.getCustomerById.invalidate({ id })} />
          )}
        </div>
      </section>

      {/* ── Endereços ── */}
      <section className="overflow-hidden rounded-2xl border border-jardim-border bg-jardim-white shadow-sm">
        <div className="border-b border-jardim-border bg-jardim-cream/50 px-5 py-4 sm:px-6">
          <SectionHead icon={<MapPin className="h-4 w-4" />} label="Endereços" />
        </div>
        <div className="divide-y divide-jardim-border">
          {c.enderecos.length === 0 && (
            <p className="px-5 py-4 text-sm italic text-jardim-text-light sm:px-6">Nenhum endereço cadastrado.</p>
          )}
          {c.enderecos.map((addr) => (
            <div key={addr.id} className="px-5 py-4 sm:px-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-jardim-cream-dark px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted ring-1 ring-inset ring-jardim-border">
                  {addr.correspondencia ? "Correspondência · " : ""}{addr.tipo}
                </span>
                {canEditContacts && (
                  <button
                    type="button"
                    onClick={() => void deleteAddress.mutateAsync({ id: addr.id })}
                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-100"
                  >
                    <Trash2 className="h-3 w-3" /> Remover
                  </button>
                )}
              </div>
              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <Field label="Logradouro">
                  <EF value={addr.logradouro ?? ""} placeholder="Rua, Av…" disabled={!canEditContacts} onSave={(v) => saveAddress(addr.id, "logradouro", v)} />
                </Field>
                <Field label="Número">
                  <EF value={addr.numero ?? ""} placeholder="Nº" disabled={!canEditContacts} onSave={(v) => saveAddress(addr.id, "numero", v)} />
                </Field>
                <Field label="Complemento">
                  <EF value={addr.complemento ?? ""} placeholder="Apto, sala…" disabled={!canEditContacts} onSave={(v) => saveAddress(addr.id, "complemento", v)} />
                </Field>
                <Field label="Bairro">
                  <EF value={addr.bairro ?? ""} placeholder="Bairro" disabled={!canEditContacts} onSave={(v) => saveAddress(addr.id, "bairro", v)} />
                </Field>
                <Field label="CEP">
                  <EF value={addr.cep ?? ""} placeholder="00000-000" disabled={!canEditContacts} onSave={(v) => saveAddress(addr.id, "cep", v)} />
                </Field>
                <Field label="Cidade">
                  <EF value={addr.cidade && addr.cidade !== "—" ? addr.cidade : ""} placeholder="Cidade" disabled={!canEditContacts} onSave={(v) => saveAddress(addr.id, "cidade", v)} />
                </Field>
                <Field label="UF">
                  <EF value={addr.uf ?? ""} placeholder="SP" disabled={!canEditContacts} onSave={(v) => saveAddress(addr.id, "uf", v.toUpperCase().slice(0, 2))} />
                </Field>
              </dl>
            </div>
          ))}
          {canEditContacts && !addingAddress && (
            <div className="px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={() => setAddingAddress(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-dashed border-jardim-border px-3 py-2 text-xs font-medium text-jardim-text-muted hover:border-jardim-green-mid hover:text-jardim-green-mid"
              >
                <Plus className="h-3.5 w-3.5" /> Adicionar endereço
              </button>
            </div>
          )}
          {addingAddress && (
            <AddAddressForm customerId={id} onDone={() => { setAddingAddress(false); void utils.admin.getCustomerById.invalidate({ id }); }} onCancel={() => setAddingAddress(false)} />
          )}
        </div>
      </section>

      {/* ── Contratos e Jazigos ── */}
      {c.contratos.length > 0 && (
        <section className="overflow-hidden rounded-2xl border border-jardim-border bg-jardim-white shadow-sm">
          <div className="border-b border-jardim-border bg-jardim-cream/50 px-5 py-4 sm:px-6">
            <SectionHead icon={<Hash className="h-4 w-4" />} label="Contratos e Jazigos" />
          </div>
          <div className="divide-y divide-jardim-border">
            {c.contratos.map((ct) => (
              <div key={ct.id} className="px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-semibold text-sm text-jardim-text">Contrato {ct.numeroContrato}</span>
                  <span className={cn("inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset",
                    ct.situacao === "ATIVO" ? "bg-jardim-green-mid/12 text-jardim-green-dark ring-jardim-green-mid/25"
                    : ct.situacao === "QUITADO" ? "bg-blue-50 text-blue-800 ring-blue-200"
                    : "bg-jardim-cream-dark text-jardim-text-muted ring-jardim-border"
                  )}>
                    {ct.situacao}
                  </span>
                  {ct.responsavelFinanceiro && (
                    <span className="text-xs text-jardim-text-muted">
                      Resp. financeiro: <span className="font-medium text-jardim-text">{ct.responsavelFinanceiro.customer.nome}</span>
                    </span>
                  )}
                </div>
                {ct.jazigos.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {ct.jazigos.map((j) => (
                      <div key={j.id} className="rounded-lg border border-jardim-border bg-jardim-cream/60 px-3 py-2 text-xs">
                        <div className="font-semibold text-jardim-green-dark">{j.codigo}</div>
                        <div className="text-jardim-text-muted">{j.quadra ? `Quadra ${j.quadra}` : ""}{j.setor ? ` · ${j.setor}` : ""}</div>
                        <div className="text-jardim-text-muted">{j.quantidadeGavetas} gaveta(s) · {brl.format(Number(j.valorMensalidade))}/mês</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Integração ── */}
      <section className="rounded-2xl border border-jardim-border bg-jardim-white p-5 shadow-sm sm:p-6">
        <SectionHead icon={<CreditCard className="h-4 w-4" />} label="Integração e sincronização" />
        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          <Field label="Asaas (cliente)">
            <span className="break-all font-mono text-xs text-jardim-text">{c.asaasCustomerId ?? "—"}</span>
          </Field>
          <Field label="SQL Server (Cod.)">
            <span className="tabular-nums">{c.sqlServerId ?? "—"}</span>
          </Field>
          <Field label="Última sincronização">
            {new Date(c.syncedAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
          </Field>
        </dl>
      </section>

      {/* ── Cobranças ── */}
      <section className="overflow-hidden rounded-2xl border border-jardim-border bg-jardim-white shadow-sm">
        <div className="border-b border-jardim-border bg-jardim-cream/50 px-5 py-4 sm:px-6">
          <h2 className="text-sm font-semibold text-jardim-green-dark">Cobranças</h2>
        </div>

        {(cancelCharge.error ?? deletePayment.error) && (
          <div className="mx-5 mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {cancelCharge.error?.message ?? deletePayment.error?.message}
          </div>
        )}

        <div className="overflow-x-auto">
          {c.recentPayments.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-jardim-text-muted">Sem cobranças registadas.</p>
          ) : (
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead>
                <tr className="border-b border-jardim-border bg-jardim-cream/80 text-[11px] font-semibold uppercase tracking-wider text-jardim-text-muted">
                  <th className="px-5 py-3">Data</th>
                  <th className="px-5 py-3">Descrição</th>
                  <th className="px-5 py-3">Valor</th>
                  <th className="px-5 py-3">Estado</th>
                  <th className="px-5 py-3">Vencimento</th>
                  <th className="px-5 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-jardim-border">
                {c.recentPayments.map((p) => {
                  const confirming = confirmPaymentAction?.id === p.id;
                  const isCancelling = cancelCharge.isPending && confirming && confirmPaymentAction?.action === "cancel";
                  const isDeleting = deletePayment.isPending && confirming && confirmPaymentAction?.action === "delete";
                  const canCancel = p.asaasId !== null && p.status !== "PAGO" && p.status !== "ESTORNADO" && p.status !== "CANCELADO";
                  const canDelete = isAdmin && p.sqlServerId === null && p.status !== "PAGO" && p.status !== "ESTORNADO";

                  return (
                    <tr key={p.id} className={cn("transition-colors", confirming ? "bg-red-50 hover:bg-red-50" : "hover:bg-jardim-cream/40")}>
                      <td className="whitespace-nowrap px-5 py-3 text-jardim-text-muted">
                        {new Date(p.createdAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
                      </td>
                      <td className="px-5 py-3 text-jardim-text-muted text-xs">
                        {p.contratoNumero ? <span className="font-medium text-jardim-text">Ctr {p.contratoNumero}</span> : null}
                        {p.jazigoCodigo ? <span> · {p.jazigoQuadra ? `Q.${p.jazigoQuadra} ` : ""}{p.jazigoCodigo}</span> : null}
                        {!p.contratoNumero && !p.jazigoCodigo ? <span className="italic">—</span> : null}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 font-medium tabular-nums text-jardim-green-dark">
                        {brl.format(p.valueCents / 100)}
                      </td>
                      <td className="px-5 py-3">
                        <span className={cn("inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset", statusBadgeClass(p.status))}>
                          {STATUS_LABEL[p.status] ?? p.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-jardim-text">
                        {new Date(p.dataVencimento).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-5 py-3 text-right">
                        {confirming ? (
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-xs font-medium text-red-700">
                              {confirmPaymentAction.action === "cancel" ? "Cancelar cobrança Asaas?" : "Remover registo?"}
                            </span>
                            <button
                              type="button"
                              disabled={isCancelling || isDeleting}
                              onClick={() => {
                                if (confirmPaymentAction.action === "cancel") {
                                  cancelCharge.mutate({ paymentId: p.id });
                                } else {
                                  deletePayment.mutate({ id: p.id });
                                }
                                setConfirmPaymentAction(null);
                              }}
                              className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                            >
                              {isCancelling || isDeleting ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
                              Confirmar
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmPaymentAction(null)}
                              className="inline-flex items-center rounded-lg border border-jardim-border bg-jardim-white px-2.5 py-1.5 text-xs font-medium text-jardim-text hover:bg-jardim-cream"
                            >
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            {p.invoiceUrl && (
                              <a href={p.invoiceUrl} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded-lg border border-jardim-border bg-jardim-white px-2.5 py-1.5 text-xs font-medium text-jardim-green-dark hover:bg-jardim-cream"
                              >
                                <ExternalLink className="h-3.5 w-3.5" /> Fatura
                              </a>
                            )}
                            {canEdit && canCancel && (
                              <button
                                type="button"
                                onClick={() => setConfirmPaymentAction({ id: p.id, action: "cancel" })}
                                className="inline-flex items-center gap-1 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-xs font-medium text-amber-800 hover:bg-amber-100"
                              >
                                <X className="h-3.5 w-3.5" /> Cancelar Asaas
                              </button>
                            )}
                            {canDelete && (
                              <button
                                type="button"
                                onClick={() => setConfirmPaymentAction({ id: p.id, action: "delete" })}
                                className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100"
                              >
                                <Trash2 className="h-3.5 w-3.5" /> Remover
                              </button>
                            )}
                            {!p.invoiceUrl && !canCancel && !canDelete && (
                              <span className="text-jardim-text-light">—</span>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}

// ─── Inline phone row ─────────────────────────────────────────────────────────

const TIPO_LABELS: Record<string, string> = { CELULAR: "Cel", FIXO: "Fixo", WHATSAPP: "WA" };

function TelRow({ tel, canEdit, customerId: _customerId, onDone }: {
  tel: { id: string; numero: string; tipo: string; observacoes: string | null };
  canEdit: boolean;
  customerId: string;
  onDone: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(tel.numero);
  const [draftTipo, setDraftTipo] = useState(tel.tipo);
  const update = api.admin.updateUserPhone.useMutation({ onSuccess: () => { setEditing(false); onDone(); } });
  const del = api.admin.deleteUserPhone.useMutation({ onSuccess: onDone });

  if (!editing) {
    return (
      <div className="flex items-center gap-2 py-1.5">
        <span className="text-[11px] font-bold rounded px-1.5 py-0.5 bg-jardim-cream-dark text-jardim-text-muted ring-1 ring-inset ring-jardim-border shrink-0">
          {TIPO_LABELS[tel.tipo] ?? tel.tipo}
        </span>
        <span className="flex-1 text-sm font-medium text-jardim-text">{tel.numero}</span>
        {canEdit && (
          <>
            <button type="button" onClick={() => setEditing(true)} className="p-1 text-jardim-text-light hover:text-jardim-text"><Pencil className="h-3.5 w-3.5" /></button>
            <button type="button" onClick={() => del.mutate({ id: tel.id })} disabled={del.isPending} className="p-1 text-red-400 hover:text-red-600"><Trash2 className="h-3.5 w-3.5" /></button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 py-1.5">
      <select value={draftTipo} onChange={(e) => setDraftTipo(e.target.value)}
        className="rounded-lg border border-jardim-green-mid px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25">
        <option value="CELULAR">Celular</option>
        <option value="FIXO">Fixo</option>
        <option value="WHATSAPP">WhatsApp</option>
      </select>
      <input type="tel" value={draft} onChange={(e) => setDraft(e.target.value)} autoFocus
        className="flex-1 rounded-lg border border-jardim-green-mid px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25" />
      <button type="button" onClick={() => update.mutate({ id: tel.id, number: draft, tipo: draftTipo as "CELULAR" | "FIXO" | "WHATSAPP" })}
        disabled={update.isPending}
        className="rounded-lg bg-jardim-green-mid p-1.5 text-white hover:opacity-90 disabled:opacity-50">
        <Check className="h-3.5 w-3.5" />
      </button>
      <button type="button" onClick={() => setEditing(false)} className="rounded-lg bg-jardim-cream p-1.5 hover:bg-jardim-cream-dark">
        <X className="h-3.5 w-3.5 text-jardim-text" />
      </button>
    </div>
  );
}

function AddTelForm({ customerId, onDone }: { customerId: string; onDone: () => void }) {
  const [open, setOpen] = useState(false);
  const [numero, setNumero] = useState("");
  const [tipo, setTipo] = useState("CELULAR");
  const create = api.admin.createUserPhone.useMutation({ onSuccess: () => { setOpen(false); setNumero(""); onDone(); } });

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)}
        className="mt-2 inline-flex items-center gap-2 rounded-lg border border-dashed border-jardim-border px-3 py-2 text-xs font-medium text-jardim-text-muted hover:border-jardim-green-mid hover:text-jardim-green-mid">
        <Plus className="h-3.5 w-3.5" /> Adicionar telefone
      </button>
    );
  }

  return (
    <div className="mt-2 flex items-center gap-2">
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}
        className="rounded-lg border border-jardim-green-mid px-2 py-1.5 text-xs focus:outline-none">
        <option value="CELULAR">Celular</option>
        <option value="FIXO">Fixo</option>
        <option value="WHATSAPP">WhatsApp</option>
      </select>
      <input type="tel" value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="(00) 00000-0000" autoFocus
        className="flex-1 rounded-lg border border-jardim-green-mid px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25" />
      <button type="button" onClick={() => create.mutate({ userId: customerId, number: numero, tipo: tipo as "CELULAR" | "FIXO" | "WHATSAPP" })}
        disabled={create.isPending || numero.length < 6}
        className="rounded-lg bg-jardim-green-mid p-1.5 text-white hover:opacity-90 disabled:opacity-50">
        <Check className="h-3.5 w-3.5" />
      </button>
      <button type="button" onClick={() => setOpen(false)} className="rounded-lg bg-jardim-cream p-1.5 hover:bg-jardim-cream-dark">
        <X className="h-3.5 w-3.5 text-jardim-text" />
      </button>
    </div>
  );
}

function AddAddressForm({ customerId, onDone, onCancel }: { customerId: string; onDone: () => void; onCancel: () => void }) {
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState("");
  const create = api.admin.upsertCustomerAddress.useMutation({ onSuccess: onDone });

  return (
    <div className="px-5 py-4 sm:px-6">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-jardim-text-muted">Novo endereço</p>
      <div className="grid gap-3 text-sm sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">Logradouro</label>
          <input value={logradouro} onChange={(e) => setLogradouro(e.target.value)} placeholder="Rua, Av…" autoFocus
            className="mt-1 w-full rounded-lg border border-jardim-border px-2.5 py-1.5 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25" />
        </div>
        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">Número</label>
          <input value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="Nº"
            className="mt-1 w-full rounded-lg border border-jardim-border px-2.5 py-1.5 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25" />
        </div>
        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">Bairro</label>
          <input value={bairro} onChange={(e) => setBairro(e.target.value)} placeholder="Bairro"
            className="mt-1 w-full rounded-lg border border-jardim-border px-2.5 py-1.5 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25" />
        </div>
        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">Cidade</label>
          <input value={cidade} onChange={(e) => setCidade(e.target.value)} placeholder="Cidade"
            className="mt-1 w-full rounded-lg border border-jardim-border px-2.5 py-1.5 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25" />
        </div>
        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">UF</label>
          <input value={uf} onChange={(e) => setUf(e.target.value.toUpperCase().slice(0, 2))} placeholder="SP" maxLength={2}
            className="mt-1 w-full rounded-lg border border-jardim-border px-2.5 py-1.5 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25" />
        </div>
        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">CEP</label>
          <input value={cep} onChange={(e) => setCep(e.target.value)} placeholder="00000-000"
            className="mt-1 w-full rounded-lg border border-jardim-border px-2.5 py-1.5 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25" />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          disabled={create.isPending || !logradouro.trim()}
          onClick={() => create.mutate({ customerId, logradouro, numero, bairro, cidade, uf, cep, correspondencia: true })}
          className="inline-flex items-center gap-2 rounded-xl bg-jardim-green-mid px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
        >
          {create.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Guardar endereço
        </button>
        <button type="button" onClick={onCancel}
          className="rounded-xl border border-jardim-border px-4 py-2 text-sm font-medium text-jardim-text hover:bg-jardim-cream">
          Cancelar
        </button>
      </div>
      {create.error && <p className="mt-2 text-xs text-red-700">{create.error.message}</p>}
    </div>
  );
}
