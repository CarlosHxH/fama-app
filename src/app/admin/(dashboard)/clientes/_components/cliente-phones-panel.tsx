"use client";

import { useState } from "react";
import {
  Loader2,
  Pencil,
  Phone,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import { api } from "~/trpc/react";

import { cn } from "~/lib/utils";

const TIPOS = [
  { id: "CELULAR" as const, label: "Celular" },
  { id: "FIXO" as const, label: "Fixo" },
  { id: "WHATSAPP" as const, label: "WhatsApp" },
];

const inputClass =
  "w-full rounded-lg border border-jardim-border bg-jardim-white px-3 py-2 text-sm text-jardim-text shadow-sm transition placeholder:text-jardim-text-light focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25";

const OBS_MAX = 2000;

/**
 * Tabela de telefones 1:N do titular + formulário de inclusão (painel admin).
 */
export function ClientePhonesPanel({ userId }: { userId: string }) {
  const utils = api.useUtils();
  const list = api.admin.listUserPhones.useQuery({ userId });

  const [number, setNumber] = useState("");
  const [tipo, setTipo] = useState<(typeof TIPOS)[number]["id"]>("CELULAR");
  const [observacoes, setObservacoes] = useState("");

  const createMut = api.admin.createUserPhone.useMutation({
    onSuccess: async () => {
      setNumber("");
      setTipo("CELULAR");
      setObservacoes("");
      await utils.admin.listUserPhones.invalidate({ userId });
      await utils.admin.listUsers.invalidate();
      await utils.admin.getCustomerById.invalidate({ id: userId });
    },
  });

  const updateMut = api.admin.updateUserPhone.useMutation({
    onSuccess: async () => {
      setEditingId(null);
      await utils.admin.listUserPhones.invalidate({ userId });
      await utils.admin.listUsers.invalidate();
      await utils.admin.getCustomerById.invalidate({ id: userId });
    },
  });

  const deleteMut = api.admin.deleteUserPhone.useMutation({
    onSuccess: async () => {
      await utils.admin.listUserPhones.invalidate({ userId });
      await utils.admin.listUsers.invalidate();
      await utils.admin.getCustomerById.invalidate({ id: userId });
    },
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNumber, setEditNumber] = useState("");
  const [editTipo, setEditTipo] = useState<(typeof TIPOS)[number]["id"]>(
    "CELULAR",
  );
  const [editObservacoes, setEditObservacoes] = useState("");

  function startEdit(row: {
    id: string;
    numero: string;
    tipo: string;
    observacoes: string | null;
  }) {
    setEditingId(row.id);
    setEditNumber(row.numero);
    const t = TIPOS.find((x) => x.id === row.tipo)?.id ?? "CELULAR";
    setEditTipo(t);
    setEditObservacoes(row.observacoes ?? "");
  }

  function cancelEdit() {
    setEditingId(null);
  }

  const rows = list.data ?? [];
  const canSubmitNew = number.trim().length >= 8;
  const editValid = editNumber.trim().length >= 8;

  return (
    <div className="p-5 sm:p-6">
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-jardim-green-dark">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-jardim-cream ring-1 ring-jardim-border">
            <Phone className="h-4 w-4 text-jardim-green-mid" aria-hidden />
          </span>
          <span>Telefones e contactos</span>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-jardim-text-muted">
          Números para contacto do titular. As observações são internas à equipa.
        </p>
      </div>

      {list.isLoading ? (
        <p className="flex items-center gap-2 text-sm text-jardim-text-muted">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          A carregar contactos…
        </p>
      ) : list.isError ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
          Não foi possível carregar os telefones. Tente atualizar a página.
        </p>
      ) : (
        <>
          {/* Mobile: cartões */}
          <div className="space-y-3 md:hidden">
            {rows.length === 0 ? (
              <p className="rounded-xl border border-dashed border-jardim-border bg-jardim-cream/40 px-4 py-8 text-center text-sm text-jardim-text-muted">
                Nenhum telefone registado. Use o formulário abaixo para
                adicionar.
              </p>
            ) : (
              rows.map((row) => (
                <div
                  key={row.id}
                  className="rounded-xl border border-jardim-border bg-jardim-cream/30 p-4 shadow-sm"
                >
                  {editingId === row.id ? (
                    <div className="space-y-3">
                      <div>
                        <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-jardim-text-muted">
                          Telefone
                        </label>
                        <input
                          className={cn(inputClass, "tabular-nums")}
                          value={editNumber}
                          onChange={(e) => setEditNumber(e.target.value)}
                          inputMode="tel"
                          autoComplete="tel"
                          aria-label="Telefone"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-jardim-text-muted">
                          Tipo
                        </label>
                        <select
                          className={inputClass}
                          value={editTipo}
                          onChange={(e) =>
                            setEditTipo(
                              e.target.value as (typeof TIPOS)[number]["id"],
                            )
                          }
                          aria-label="Tipo"
                        >
                          {TIPOS.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-jardim-text-muted">
                          Observações
                        </label>
                        <textarea
                          className={cn(inputClass, "min-h-[4rem] resize-y")}
                          rows={3}
                          value={editObservacoes}
                          onChange={(e) => setEditObservacoes(e.target.value)}
                          maxLength={OBS_MAX}
                          placeholder="Notas internas (opcional)…"
                          aria-label="Observações"
                        />
                        <p className="mt-1 text-right text-[10px] text-jardim-text-light tabular-nums">
                          {editObservacoes.length}/{OBS_MAX}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <button
                          type="button"
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-jardim-green-dark px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-jardim-green-mid disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
                          disabled={updateMut.isPending || !editValid}
                          onClick={() => {
                            const curObs = row.observacoes ?? "";
                            const nextObs = editObservacoes.trim();
                            const patch: {
                              id: string;
                              number: string;
                              tipo: (typeof TIPOS)[number]["id"];
                              observacoes?: string;
                            } = {
                              id: row.id,
                              number: editNumber.trim(),
                              tipo: editTipo,
                            };
                            if (nextObs !== curObs) {
                              patch.observacoes =
                                nextObs.length > 0 ? nextObs : "";
                            }
                            updateMut.mutate(patch);
                          }}
                        >
                          {updateMut.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : null}
                          Guardar
                        </button>
                        <button
                          type="button"
                          className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border border-jardim-border bg-jardim-white px-4 py-2 text-sm font-medium text-jardim-text-muted transition hover:bg-jardim-cream sm:flex-none"
                          onClick={cancelEdit}
                        >
                          <X className="h-4 w-4 shrink-0" aria-hidden />
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
                            Telefone
                          </p>
                          <p className="mt-0.5 font-medium tabular-nums text-jardim-text">
                            {row.numero}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full bg-jardim-white px-2.5 py-1 text-xs font-medium text-jardim-green-dark ring-1 ring-jardim-border">
                          {TIPOS.find((t) => t.id === row.tipo)?.label ??
                            row.tipo}
                        </span>
                      </div>
                      {row.observacoes ? (
                        <div className="mt-3 border-t border-jardim-border/80 pt-3">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-jardim-text-muted">
                            Observações
                          </p>
                          <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-jardim-text-muted">
                            {row.observacoes}
                          </p>
                        </div>
                      ) : null}
                      <div className="mt-4 flex gap-2 border-t border-jardim-border/80 pt-4">
                        <button
                          type="button"
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-jardim-border bg-jardim-white px-3 py-2 text-sm font-medium text-jardim-green-dark transition hover:bg-jardim-cream"
                          onClick={() => startEdit(row)}
                        >
                          <Pencil className="h-4 w-4" aria-hidden />
                          Editar
                        </button>
                        <button
                          type="button"
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50/80 px-3 py-2 text-sm font-medium text-red-800 transition hover:bg-red-100 disabled:opacity-50"
                          disabled={deleteMut.isPending}
                          onClick={() => {
                            if (
                              typeof window !== "undefined" &&
                              window.confirm("Remover este telefone?")
                            ) {
                              deleteMut.mutate({ id: row.id });
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden />
                          Remover
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Desktop: tabela */}
          <div className="hidden overflow-x-auto rounded-xl border border-jardim-border bg-jardim-white md:block">
            <table className="w-full min-w-[600px] text-left text-sm">
              <caption className="sr-only">
                Lista de telefones e observações do cliente
              </caption>
              <thead>
                <tr className="border-b border-jardim-border bg-jardim-cream/60 text-[10px] font-semibold uppercase tracking-wider text-jardim-text-muted">
                  <th className="px-3 py-2.5">Telefone</th>
                  <th className="px-3 py-2.5">Tipo</th>
                  <th className="min-w-32 px-3 py-2.5">Observações</th>
                  <th className="w-28 px-3 py-2.5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-jardim-border">
                {rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-3 py-8 text-center text-sm text-jardim-text-muted"
                    >
                      Nenhum telefone registado. Adicione abaixo.
                    </td>
                  </tr>
                ) : (
                  rows.map((row) => (
                    <tr key={row.id} className="hover:bg-jardim-cream/25">
                      {editingId === row.id ? (
                        <>
                          <td className="px-3 py-2 align-top">
                            <input
                              className={cn(inputClass, "px-2 py-1.5 tabular-nums")}
                              value={editNumber}
                              onChange={(e) => setEditNumber(e.target.value)}
                              inputMode="tel"
                              aria-label="Telefone"
                            />
                          </td>
                          <td className="px-3 py-2 align-top">
                            <select
                              className={cn(inputClass, "px-2 py-1.5")}
                              value={editTipo}
                              onChange={(e) =>
                                setEditTipo(
                                  e.target.value as (typeof TIPOS)[number]["id"],
                                )
                              }
                              aria-label="Tipo"
                            >
                              {TIPOS.map((t) => (
                                <option key={t.id} value={t.id}>
                                  {t.label}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-3 py-2 align-top">
                            <textarea
                              className={cn(
                                inputClass,
                                "min-h-[3.25rem] max-w-md resize-y px-2 py-1.5",
                              )}
                              rows={2}
                              value={editObservacoes}
                              onChange={(e) =>
                                setEditObservacoes(e.target.value)
                              }
                              maxLength={OBS_MAX}
                              placeholder="Notas internas…"
                              aria-label="Observações"
                            />
                            <p className="mt-0.5 text-right text-[10px] text-jardim-text-light tabular-nums">
                              {editObservacoes.length}/{OBS_MAX}
                            </p>
                          </td>
                          <td className="whitespace-nowrap px-3 py-2 text-right align-top">
                            <div className="flex flex-col items-end gap-1.5 sm:flex-row sm:justify-end">
                              <button
                                type="button"
                                className="inline-flex items-center gap-1 rounded-lg bg-jardim-green-dark px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-jardim-green-mid disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={updateMut.isPending || !editValid}
                                onClick={() => {
                                  const curObs = row.observacoes ?? "";
                                  const nextObs = editObservacoes.trim();
                                  const patch: {
                                    id: string;
                                    number: string;
                                    tipo: (typeof TIPOS)[number]["id"];
                                    observacoes?: string;
                                  } = {
                                    id: row.id,
                                    number: editNumber.trim(),
                                    tipo: editTipo,
                                  };
                                  if (nextObs !== curObs) {
                                    patch.observacoes =
                                      nextObs.length > 0 ? nextObs : "";
                                  }
                                  updateMut.mutate(patch);
                                }}
                              >
                                Guardar
                              </button>
                              <button
                                type="button"
                                className="inline-flex items-center gap-1 rounded-lg border border-jardim-border px-2.5 py-1.5 text-xs font-medium text-jardim-text-muted transition hover:bg-jardim-cream"
                                onClick={cancelEdit}
                              >
                                <X className="h-3.5 w-3.5" aria-hidden />
                                Cancelar
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-3 py-2.5 font-medium tabular-nums text-jardim-text">
                            {row.numero}
                          </td>
                          <td className="px-3 py-2.5 text-jardim-text-muted">
                            {TIPOS.find((t) => t.id === row.tipo)?.label ??
                              row.tipo}
                          </td>
                          <td
                            className="max-w-xs px-3 py-2.5 text-jardim-text-muted"
                            title={row.observacoes ?? undefined}
                          >
                            {row.observacoes ? (
                              <span className="line-clamp-3 whitespace-pre-wrap text-sm">
                                {row.observacoes}
                              </span>
                            ) : (
                              <span className="text-jardim-text-light">—</span>
                            )}
                          </td>
                          <td className="px-3 py-2 text-right">
                            <button
                              type="button"
                              className="mr-1 inline-flex rounded-lg p-2 text-jardim-green-mid transition hover:bg-jardim-cream"
                              onClick={() => startEdit(row)}
                              aria-label="Editar telefone"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              className="inline-flex rounded-lg p-2 text-red-600/90 transition hover:bg-red-50"
                              disabled={deleteMut.isPending}
                              onClick={() => {
                                if (
                                  typeof window !== "undefined" &&
                                  window.confirm("Remover este telefone?")
                                ) {
                                  deleteMut.mutate({ id: row.id });
                                }
                              }}
                              aria-label="Remover telefone"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      <form
        className="mt-6 space-y-4 rounded-xl border border-dashed border-jardim-border bg-jardim-cream/30 p-4 sm:p-5"
        onSubmit={(e) => {
          e.preventDefault();
          const t = number.trim();
          if (t.length < 8) return;
          const o = observacoes.trim();
          createMut.mutate({
            userId,
            number: t,
            tipo,
            ...(o.length > 0 ? { observacoes: o } : {}),
          });
        }}
        aria-labelledby="phones-add-heading"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3
            id="phones-add-heading"
            className="text-xs font-semibold uppercase tracking-wider text-jardim-green-dark"
          >
            Novo contacto
          </h3>
          <button
            type="submit"
            disabled={createMut.isPending || !canSubmitNew}
            aria-describedby="phones-add-help"
            className={cn(
              "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white shadow-sm ring-1 ring-jardim-green-mid/30 transition",
              "bg-jardim-green-dark hover:bg-jardim-green-mid disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            {createMut.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <Plus className="h-4 w-4" aria-hidden />
            )}
            Adicionar
          </button>
        </div>
        <p
          id="phones-add-help"
          className="text-[11px] leading-relaxed text-jardim-text-light"
        >
          Os dados são guardados ao clicar em Adicionar. Pode editar ou remover
          contactos na lista acima.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <label
              htmlFor="phone-new-number"
              className="mb-1 block text-[11px] font-medium text-jardim-text-muted"
            >
              Número
            </label>
            <input
              id="phone-new-number"
              type="tel"
              className={cn(inputClass, "tabular-nums")}
              placeholder="ex. 11999998888"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              autoComplete="tel"
              inputMode="tel"
            />
            <p className="mt-1 text-[11px] text-jardim-text-light">
              Mínimo 8 dígitos.
            </p>
          </div>
          <div className="sm:col-span-1">
            <label
              htmlFor="phone-new-tipo"
              className="mb-1 block text-[11px] font-medium text-jardim-text-muted"
            >
              Tipo
            </label>
            <select
              id="phone-new-tipo"
              className={inputClass}
              value={tipo}
              onChange={(e) =>
                setTipo(e.target.value as (typeof TIPOS)[number]["id"])
              }
            >
              {TIPOS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="phone-new-obs"
              className="mb-1 block text-[11px] font-medium text-jardim-text-muted"
            >
              Observações{" "}
              <span className="font-normal text-jardim-text-light">(opcional)</span>
            </label>
            <textarea
              id="phone-new-obs"
              className={cn(inputClass, "min-h-[4.5rem] resize-y")}
              rows={3}
              placeholder="Ex.: melhor horário para ligar, contacto da secretária…"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              maxLength={OBS_MAX}
              aria-describedby="phone-new-obs-hint"
            />
            <p
              id="phone-new-obs-hint"
              className="mt-1 flex justify-end text-[10px] text-jardim-text-light tabular-nums"
            >
              {observacoes.length}/{OBS_MAX}
            </p>
          </div>
        </div>
      </form>
      {createMut.error ? (
        <p className="mt-3 text-sm text-red-700" role="alert">
          {createMut.error.message}
        </p>
      ) : null}
      {updateMut.error ? (
        <p className="mt-3 text-sm text-red-700" role="alert">
          {updateMut.error.message}
        </p>
      ) : null}
    </div>
  );
}
