"use client";

import { useState, useRef, useEffect } from "react";
import { Pencil, Check, X, Plus, Trash2, User, Phone, MapPin, ChevronDown } from "lucide-react";

import { api } from "~/trpc/react";

// ─── Editable text field ────────────────────────────────────────────────────

type EditableFieldProps = {
  value: string;
  placeholder?: string;
  type?: "text" | "email" | "tel";
  readOnly?: boolean;
  onSave: (val: string) => Promise<void>;
};

function EditableField({ value, placeholder = "—", type = "text", readOnly = false, onSave }: EditableFieldProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setDraft(value); }, [value]);
  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);

  async function save() {
    if (draft === value) { setEditing(false); return; }
    setSaving(true);
    setError(null);
    try {
      await onSave(draft.trim());
      setEditing(false);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }

  function cancel() { setDraft(value); setEditing(false); setError(null); }

  if (readOnly) {
    return <span style={{ color: "var(--text-dark)", fontWeight: 600 }}>{value || placeholder}</span>;
  }

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        style={{
          background: "none",
          border: "none",
          padding: "0.2rem 0.4rem",
          margin: "-0.2rem -0.4rem",
          cursor: "text",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          borderRadius: "4px",
          color: "var(--text-dark)",
          fontWeight: 600,
          fontSize: "inherit",
          fontFamily: "inherit",
          textAlign: "left",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
        title="Clique para editar"
      >
        <span>{value || <span style={{ color: "var(--text-light)", fontStyle: "italic" }}>{placeholder}</span>}</span>
        <Pencil size={11} style={{ color: "var(--text-light)", flexShrink: 0 }} />
      </button>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
        <input
          ref={inputRef}
          type={type}
          value={draft}
          disabled={saving}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") void save();
            if (e.key === "Escape") cancel();
          }}
          style={{
            flex: 1,
            padding: "0.35rem 0.6rem",
            border: `2px solid ${error ? "#ef4444" : "var(--green-mid)"}`,
            borderRadius: "6px",
            fontSize: "0.9rem",
            fontFamily: "inherit",
            outline: "none",
            background: "#fff",
          }}
        />
        <button
          type="button"
          onClick={() => void save()}
          disabled={saving}
          title="Salvar"
          style={{ background: "var(--green-mid)", border: "none", borderRadius: "5px", padding: "0.3rem 0.4rem", cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <Check size={14} color="#fff" />
        </button>
        <button
          type="button"
          onClick={cancel}
          title="Cancelar"
          style={{ background: "#e5e7eb", border: "none", borderRadius: "5px", padding: "0.3rem 0.4rem", cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <X size={14} color="#374151" />
        </button>
      </div>
      {error && <span style={{ fontSize: "0.72rem", color: "#ef4444" }}>{error}</span>}
    </div>
  );
}

// ─── Phone row ───────────────────────────────────────────────────────────────

type PhoneRowProps = {
  phone: { id: string; numero: string; tipo: "CELULAR" | "FIXO" | "WHATSAPP"; observacoes: string | null };
  onSave: (id: string, numero: string, tipo: "CELULAR" | "FIXO" | "WHATSAPP") => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

const TIPO_LABELS: Record<string, string> = { CELULAR: "Cel", FIXO: "Fixo", WHATSAPP: "WA" };

function PhoneRow({ phone, onSave, onDelete }: PhoneRowProps) {
  const [editing, setEditing] = useState(false);
  const [draftNum, setDraftNum] = useState(phone.numero);
  const [draftTipo, setDraftTipo] = useState(phone.tipo);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { setDraftNum(phone.numero); setDraftTipo(phone.tipo); }, [phone.numero, phone.tipo]);

  async function save() {
    setSaving(true); setError(null);
    try { await onSave(phone.id, draftNum.trim(), draftTipo); setEditing(false); }
    catch (e: unknown) { setError(e instanceof Error ? e.message : "Erro."); }
    finally { setSaving(false); }
  }

  async function del() {
    setDeleting(true);
    try { await onDelete(phone.id); }
    catch { setDeleting(false); }
  }

  if (!editing) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.3rem 0" }}>
        <span style={{ fontSize: "0.65rem", background: "var(--green-light)", color: "var(--green-dark)", borderRadius: "3px", padding: "0.1rem 0.35rem", fontWeight: 700, flexShrink: 0 }}>
          {TIPO_LABELS[phone.tipo] ?? phone.tipo}
        </span>
        <span style={{ flex: 1, fontWeight: 600 }}>{phone.numero}</span>
        <button type="button" onClick={() => setEditing(true)} title="Editar" style={{ background: "none", border: "none", cursor: "pointer", padding: "0.2rem", display: "flex", color: "var(--text-light)" }}>
          <Pencil size={12} />
        </button>
        <button type="button" onClick={() => void del()} disabled={deleting} title="Remover" style={{ background: "none", border: "none", cursor: "pointer", padding: "0.2rem", display: "flex", color: "#ef4444" }}>
          <Trash2 size={12} />
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", padding: "0.3rem 0" }}>
      <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
        <select
          value={draftTipo}
          onChange={(e) => setDraftTipo(e.target.value as "CELULAR" | "FIXO" | "WHATSAPP")}
          style={{ padding: "0.35rem", border: "2px solid var(--green-mid)", borderRadius: "6px", fontSize: "0.8rem", background: "#fff" }}
        >
          <option value="CELULAR">Celular</option>
          <option value="FIXO">Fixo</option>
          <option value="WHATSAPP">WhatsApp</option>
        </select>
        <input
          type="tel"
          value={draftNum}
          onChange={(e) => setDraftNum(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") void save(); if (e.key === "Escape") { setDraftNum(phone.numero); setDraftTipo(phone.tipo); setEditing(false); } }}
          style={{ flex: 1, padding: "0.35rem 0.6rem", border: "2px solid var(--green-mid)", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }}
          disabled={saving}
          autoFocus
        />
        <button type="button" onClick={() => void save()} disabled={saving} style={{ background: "var(--green-mid)", border: "none", borderRadius: "5px", padding: "0.3rem 0.4rem", cursor: "pointer", display: "flex" }}>
          <Check size={14} color="#fff" />
        </button>
        <button type="button" onClick={() => { setDraftNum(phone.numero); setDraftTipo(phone.tipo); setEditing(false); setError(null); }} style={{ background: "#e5e7eb", border: "none", borderRadius: "5px", padding: "0.3rem 0.4rem", cursor: "pointer", display: "flex" }}>
          <X size={14} color="#374151" />
        </button>
      </div>
      {error && <span style={{ fontSize: "0.72rem", color: "#ef4444" }}>{error}</span>}
    </div>
  );
}

// ─── Add phone form ──────────────────────────────────────────────────────────

function AddPhoneForm({ onAdd }: { onAdd: (numero: string, tipo: "CELULAR" | "FIXO" | "WHATSAPP") => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [numero, setNumero] = useState("");
  const [tipo, setTipo] = useState<"CELULAR" | "FIXO" | "WHATSAPP">("CELULAR");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (numero.trim().length < 6) { setError("Número muito curto."); return; }
    setSaving(true); setError(null);
    try { await onAdd(numero.trim(), tipo); setNumero(""); setOpen(false); }
    catch (e: unknown) { setError(e instanceof Error ? e.message : "Erro."); }
    finally { setSaving(false); }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", background: "none", border: "1.5px dashed var(--border)", borderRadius: "6px", padding: "0.3rem 0.7rem", cursor: "pointer", fontSize: "0.78rem", color: "var(--text-light)", marginTop: "0.4rem" }}
      >
        <Plus size={12} /> Adicionar telefone
      </button>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", marginTop: "0.4rem" }}>
      <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
        <select value={tipo} onChange={(e) => setTipo(e.target.value as "CELULAR" | "FIXO" | "WHATSAPP")} style={{ padding: "0.35rem", border: "2px solid var(--green-mid)", borderRadius: "6px", fontSize: "0.8rem" }}>
          <option value="CELULAR">Celular</option>
          <option value="FIXO">Fixo</option>
          <option value="WHATSAPP">WhatsApp</option>
        </select>
        <input
          type="tel"
          placeholder="(00) 00000-0000"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") void submit(); if (e.key === "Escape") setOpen(false); }}
          autoFocus
          disabled={saving}
          style={{ flex: 1, padding: "0.35rem 0.6rem", border: "2px solid var(--green-mid)", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }}
        />
        <button type="button" onClick={() => void submit()} disabled={saving} style={{ background: "var(--green-mid)", border: "none", borderRadius: "5px", padding: "0.3rem 0.4rem", cursor: "pointer", display: "flex" }}>
          <Check size={14} color="#fff" />
        </button>
        <button type="button" onClick={() => { setOpen(false); setError(null); }} style={{ background: "#e5e7eb", border: "none", borderRadius: "5px", padding: "0.3rem 0.4rem", cursor: "pointer", display: "flex" }}>
          <X size={14} color="#374151" />
        </button>
      </div>
      {error && <span style={{ fontSize: "0.72rem", color: "#ef4444" }}>{error}</span>}
    </div>
  );
}

// ─── TitularCard ─────────────────────────────────────────────────────────────

export function TitularCard() {
  const [expanded, setExpanded] = useState(false);

  const utils = api.useUtils();
  const profileQuery = api.customer.getMyProfile.useQuery(undefined, { staleTime: 60_000 });
  const profile = profileQuery.data;

  const updateProfile = api.customer.updateMyProfile.useMutation({
    onSuccess: () => utils.customer.getMyProfile.invalidate(),
  });
  const upsertPhone = api.customer.upsertMyPhone.useMutation({
    onSuccess: () => utils.customer.getMyProfile.invalidate(),
  });
  const deletePhone = api.customer.deleteMyPhone.useMutation({
    onSuccess: () => utils.customer.getMyProfile.invalidate(),
  });
  const upsertAddress = api.customer.upsertMyAddress.useMutation({
    onSuccess: () => utils.customer.getMyProfile.invalidate(),
  });

  const nome = profile?.nome ?? "—";
  const doc = profile?.cpfCnpj ?? "—";
  const mainAddress = profile?.enderecos?.[0] ?? null;

  async function saveField(field: "nome" | "email", val: string) {
    await updateProfile.mutateAsync({ [field]: val });
  }

  async function savePhone(id: string, numero: string, tipo: "CELULAR" | "FIXO" | "WHATSAPP") {
    await upsertPhone.mutateAsync({ id, numero, tipo });
  }

  async function addPhone(numero: string, tipo: "CELULAR" | "FIXO" | "WHATSAPP") {
    await upsertPhone.mutateAsync({ numero, tipo });
  }

  async function delPhone(id: string) {
    await deletePhone.mutateAsync({ id });
  }

  async function saveAddressField(field: string, val: string) {
    if (mainAddress) {
      await upsertAddress.mutateAsync({ id: mainAddress.id, [field]: val });
    } else {
      await upsertAddress.mutateAsync({ [field]: val, correspondencia: true });
    }
  }

  return (
    <div className="card" id="titular-card" style={{ marginBottom: "1.5rem" }}>
      {/* Header */}
      <div className="card-header" style={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <User size={16} style={{ flexShrink: 0 }} />
          <span className="hide-on-mobile">Dados do Titular / Responsável Financeiro</span>
          <span className="show-on-mobile">Meus Dados</span>
        </div>
        <button
          type="button"
          className="collapsible-btn"
          aria-expanded={expanded}
          aria-controls="titular-card-body"
          style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", fontWeight: "bold", padding: "0.3rem 0.6rem", fontSize: "0.7rem", display: "flex", alignItems: "center", gap: "0.3rem" }}
          onClick={() => setExpanded((e) => !e)}
        >
          {expanded ? "Recolher" : "Ver Detalhes"}
          <ChevronDown size={12} style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
        </button>
      </div>

      {/* Mini info (always visible) */}
      <div style={{ padding: "1rem 1.5rem", background: "var(--cream)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
          <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Titular (Cessionário)
          </div>
          <div style={{ fontWeight: 800, color: "var(--green-dark)", fontSize: "1rem" }}>{nome}</div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-mid)", fontWeight: 600 }}>{doc}</div>
        </div>
      </div>

      {/* Expandable body */}
      <div
        id="titular-card-body"
        style={{ display: expanded ? "block" : "none", borderTop: "1px solid var(--border)" }}
      >
        {/* ── Titular ── */}
        <section style={{ padding: "1.25rem 1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "1rem" }}>
            <User size={14} color="var(--green-mid)" />
            <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", color: "var(--green-mid)", letterSpacing: "0.5px" }}>
              Titular
            </span>
          </div>

          <div className="info-grid">
            <div className="info-field full">
              <label>Nome Completo</label>
              <div className="value">
                <EditableField
                  value={profile?.nome ?? ""}
                  placeholder="Informe o nome"
                  onSave={(v) => saveField("nome", v)}
                />
              </div>
            </div>

            <div className="info-field">
              <label>E-mail</label>
              <div className="value">
                <EditableField
                  value={profile?.email ?? ""}
                  placeholder="Informe o e-mail"
                  type="email"
                  onSave={(v) => saveField("email", v)}
                />
              </div>
            </div>

            <div className="info-field">
              <label>CPF / CNPJ</label>
              <div className="value">
                <EditableField value={doc} readOnly onSave={async () => undefined} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Telefones ── */}
        <section style={{ padding: "0 1.5rem 1.25rem", borderTop: "1px dashed var(--border)", paddingTop: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.75rem" }}>
            <Phone size={14} color="var(--green-mid)" />
            <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", color: "var(--green-mid)", letterSpacing: "0.5px" }}>
              Telefones
            </span>
          </div>

          {profile?.telefones.length === 0 && (
            <p style={{ fontSize: "0.82rem", color: "var(--text-light)", fontStyle: "italic", marginBottom: "0.5rem" }}>
              Nenhum telefone cadastrado.
            </p>
          )}

          {profile?.telefones.map((phone) => (
            <PhoneRow
              key={phone.id}
              phone={phone}
              onSave={savePhone}
              onDelete={delPhone}
            />
          ))}

          <AddPhoneForm onAdd={addPhone} />
        </section>

        {/* ── Endereço ── */}
        <section style={{ padding: "0 1.5rem 1.25rem", borderTop: "1px dashed var(--border)", paddingTop: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "1rem" }}>
            <MapPin size={14} color="var(--green-mid)" />
            <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", color: "var(--green-mid)", letterSpacing: "0.5px" }}>
              Endereço de Cobrança
            </span>
          </div>

          <div className="info-grid">
            <div className="info-field full">
              <label>Logradouro</label>
              <div className="value">
                <EditableField
                  value={mainAddress?.logradouro ?? ""}
                  placeholder="Rua, Av., etc."
                  onSave={(v) => saveAddressField("logradouro", v)}
                />
              </div>
            </div>
            <div className="info-field">
              <label>Número</label>
              <div className="value">
                <EditableField
                  value={mainAddress?.numero ?? ""}
                  placeholder="Nº"
                  onSave={(v) => saveAddressField("numero", v)}
                />
              </div>
            </div>
            <div className="info-field">
              <label>Complemento</label>
              <div className="value">
                <EditableField
                  value={mainAddress?.complemento ?? ""}
                  placeholder="Apto, sala…"
                  onSave={(v) => saveAddressField("complemento", v)}
                />
              </div>
            </div>
            <div className="info-field">
              <label>Bairro</label>
              <div className="value">
                <EditableField
                  value={mainAddress?.bairro ?? ""}
                  placeholder="Bairro"
                  onSave={(v) => saveAddressField("bairro", v)}
                />
              </div>
            </div>
            <div className="info-field">
              <label>CEP</label>
              <div className="value">
                <EditableField
                  value={mainAddress?.cep ?? ""}
                  placeholder="00000-000"
                  onSave={(v) => saveAddressField("cep", v)}
                />
              </div>
            </div>
            <div className="info-field">
              <label>Cidade</label>
              <div className="value">
                <EditableField
                  value={mainAddress?.cidade && mainAddress.cidade !== "—" ? mainAddress.cidade : ""}
                  placeholder="Cidade"
                  onSave={(v) => saveAddressField("cidade", v)}
                />
              </div>
            </div>
            <div className="info-field">
              <label>UF</label>
              <div className="value">
                <EditableField
                  value={mainAddress?.uf ?? ""}
                  placeholder="SP"
                  onSave={(v) => saveAddressField("uf", v.toUpperCase().slice(0, 2))}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Responsável Financeiro ── */}
        {(profile?.responsaveis?.length ?? 0) > 0 && (
          <section style={{ padding: "0 1.5rem 1.25rem", borderTop: "1px dashed var(--border)", paddingTop: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "1rem" }}>
              <User size={14} color="#7c3aed" />
              <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", color: "#7c3aed", letterSpacing: "0.5px" }}>
                Responsável Financeiro
              </span>
            </div>

            {profile?.responsaveis.map((r) => (
              <div key={r.id} className="info-grid" style={{ marginBottom: "0.75rem" }}>
                <div className="info-field full">
                  <label>Nome</label>
                  <div className="value" style={{ fontWeight: 700 }}>{r.customer.nome}</div>
                </div>
                <div className="info-field">
                  <label>CPF / CNPJ</label>
                  <div className="value">{r.customer.cpfCnpj}</div>
                </div>
                <div className="info-field">
                  <label>E-mail</label>
                  <div className="value">{r.customer.email ?? "—"}</div>
                </div>
                {r.motivo && (
                  <div className="info-field full">
                    <label>Motivo</label>
                    <div className="value" style={{ fontStyle: "italic" }}>{r.motivo}</div>
                  </div>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
