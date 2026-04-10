"use client";

import { useState } from "react";
import { Loader2, Pencil, Phone, Plus, Trash2, X } from "lucide-react";

import { api } from "~/trpc/react";

import { cn } from "~/lib/utils";

/**
 * Tabela de telefones 1:N do titular + formulário de inclusão (painel admin).
 */
export function ClientePhonesPanel({ userId }: { userId: string }) {
  const utils = api.useUtils();
  const list = api.admin.listUserPhones.useQuery({ userId });

  const [telefone, setTelefone] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const createMut = api.admin.createUserPhone.useMutation({
    onSuccess: async () => {
      setTelefone("");
      setObservacoes("");
      await utils.admin.listUserPhones.invalidate({ userId });
      await utils.admin.listUsers.invalidate();
    },
  });

  const updateMut = api.admin.updateUserPhone.useMutation({
    onSuccess: async () => {
      setEditingId(null);
      await utils.admin.listUserPhones.invalidate({ userId });
      await utils.admin.listUsers.invalidate();
    },
  });

  const deleteMut = api.admin.deleteUserPhone.useMutation({
    onSuccess: async () => {
      await utils.admin.listUserPhones.invalidate({ userId });
      await utils.admin.listUsers.invalidate();
    },
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTelefone, setEditTelefone] = useState("");
  const [editObs, setEditObs] = useState("");

  function startEdit(row: {
    id: string;
    telefone: string;
    observacoes: string | null;
  }) {
    setEditingId(row.id);
    setEditTelefone(row.telefone);
    setEditObs(row.observacoes ?? "");
  }

  function cancelEdit() {
    setEditingId(null);
  }

  return (
    <div className="border-t border-jardim-border bg-jardim-cream/40 px-4 py-4 sm:px-5">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-jardim-green-dark">
        <Phone className="h-3.5 w-3.5" aria-hidden />
        Telefones e observações
      </div>

      {list.isLoading ? (
        <p className="flex items-center gap-2 text-sm text-jardim-text-muted">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          A carregar contactos…
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-jardim-border bg-jardim-white">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-jardim-border bg-jardim-cream/60 text-[10px] font-semibold uppercase tracking-wider text-jardim-text-muted">
                <th className="px-3 py-2">Telefone</th>
                <th className="px-3 py-2">Observações</th>
                <th className="w-24 px-3 py-2 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-jardim-border">
              {(list.data ?? []).length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-3 py-6 text-center text-jardim-text-light"
                  >
                    Nenhum telefone registado. Adicione abaixo.
                  </td>
                </tr>
              ) : (
                (list.data ?? []).map((row) => (
                  <tr key={row.id} className="hover:bg-jardim-cream/30">
                    {editingId === row.id ? (
                      <>
                        <td className="px-3 py-2 align-top">
                          <input
                            className="w-full min-w-[10rem] rounded-lg border border-jardim-border bg-jardim-white px-2 py-1.5 text-sm tabular-nums"
                            value={editTelefone}
                            onChange={(e) => setEditTelefone(e.target.value)}
                            aria-label="Telefone"
                          />
                        </td>
                        <td className="px-3 py-2 align-top">
                          <textarea
                            className="w-full min-w-[12rem] resize-y rounded-lg border border-jardim-border bg-jardim-white px-2 py-1.5 text-sm"
                            rows={2}
                            value={editObs}
                            onChange={(e) => setEditObs(e.target.value)}
                            placeholder="Opcional"
                            aria-label="Observações"
                          />
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-right align-top">
                          <button
                            type="button"
                            className="mr-1 inline-flex items-center rounded-lg bg-jardim-green px-2 py-1 text-xs font-medium text-white hover:opacity-90 disabled:opacity-50"
                            disabled={updateMut.isPending}
                            onClick={() =>
                              updateMut.mutate({
                                id: row.id,
                                telefone: editTelefone.trim(),
                                observacoes: editObs.trim() || null,
                              })
                            }
                          >
                            Guardar
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center rounded-lg border border-jardim-border px-2 py-1 text-xs text-jardim-text-muted hover:bg-jardim-cream"
                            onClick={cancelEdit}
                          >
                            <X className="h-3.5 w-3.5" aria-hidden />
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-3 py-2.5 font-medium tabular-nums text-jardim-text">
                          {row.telefone}
                        </td>
                        <td className="max-w-md px-3 py-2.5 text-jardim-text-muted">
                          {row.observacoes?.trim() ? (
                            <span className="whitespace-pre-wrap break-words">
                              {row.observacoes}
                            </span>
                          ) : (
                            <span className="text-jardim-text-light">—</span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-right">
                          <button
                            type="button"
                            className="mr-1 inline-flex rounded-lg p-1.5 text-jardim-green-mid hover:bg-jardim-cream"
                            onClick={() => startEdit(row)}
                            aria-label="Editar telefone"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            className="inline-flex rounded-lg p-1.5 text-red-600/90 hover:bg-red-50"
                            disabled={deleteMut.isPending}
                            onClick={() => {
                              if (
                                typeof window !== "undefined" &&
                                window.confirm(
                                  "Remover este telefone?",
                                )
                              ) {
                                deleteMut.mutate({ id: row.id });
                              }
                            }}
                            aria-label="Remover telefone"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
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
      )}

      <form
        className="mt-4 flex flex-col gap-3 rounded-xl border border-dashed border-jardim-border bg-jardim-white/80 p-3 sm:flex-row sm:flex-wrap sm:items-end"
        onSubmit={(e) => {
          e.preventDefault();
          const t = telefone.trim();
          if (t.length < 8) return;
          createMut.mutate({
            userId,
            telefone: t,
            observacoes: observacoes.trim() || undefined,
          });
        }}
      >
        <div className="min-w-[10rem] flex-1">
          <label className="mb-1 block text-[11px] font-medium text-jardim-text-muted">
            Novo telefone
          </label>
          <input
            type="tel"
            className="w-full rounded-lg border border-jardim-border bg-jardim-white px-3 py-2 text-sm tabular-nums focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
            placeholder="ex. 11999998888"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            autoComplete="tel"
          />
        </div>
        <div className="min-w-[12rem] flex-[2]">
          <label className="mb-1 block text-[11px] font-medium text-jardim-text-muted">
            Observações
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-jardim-border bg-jardim-white px-3 py-2 text-sm focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
            placeholder="ex. Contacto preferencial, horário…"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={createMut.isPending || telefone.trim().length < 8}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white transition-opacity",
            "bg-jardim-green hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
          )}
        >
          {createMut.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <Plus className="h-4 w-4" aria-hidden />
          )}
          Adicionar
        </button>
      </form>
      {createMut.error && (
        <p className="mt-2 text-xs text-red-600" role="alert">
          {createMut.error.message}
        </p>
      )}
    </div>
  );
}
