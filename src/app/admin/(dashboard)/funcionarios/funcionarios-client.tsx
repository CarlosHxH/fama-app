"use client";

import { useState } from "react";
import { Pencil, Plus, Search, UserCog, X } from "lucide-react";

import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";

const ROLE_LABEL: Record<string, string> = {
  ADMIN: "Administrador",
  FINANCEIRO: "Financeiro",
  ATENDENTE: "Atendente",
};

function roleBadgeClass(role: string) {
  switch (role) {
    case "ADMIN":
      return "bg-jardim-green-mid/15 text-jardim-green-dark ring-jardim-green-mid/30";
    case "FINANCEIRO":
      return "bg-amber-50 text-amber-900 ring-amber-200";
    default:
      return "bg-jardim-cream-dark text-jardim-text-muted ring-jardim-border";
  }
}

type StaffRow = {
  id: string;
  email: string;
  nome: string;
  role: "ADMIN" | "FINANCEIRO" | "ATENDENTE";
  ativo: boolean;
  createdAt: Date;
};

/**
 * Listagem e gestão de funcionários (contas `User` do painel admin).
 * Edição e criação: apenas perfil ADMIN (`canManageStaff`).
 */
export function FuncionariosClient() {
  const [search, setSearch] = useState("");
  const [editRow, setEditRow] = useState<StaffRow | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const utils = api.useUtils();
  const caps = api.admin.getCapabilities.useQuery();
  const query = api.admin.listStaff.useQuery({
    search: search.trim().length >= 2 ? search.trim() : undefined,
  });

  const canManage = caps.data?.canManageStaff ?? false;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-jardim-green-dark sm:text-xl">
            Funcionários
          </h1>
          <p className="mt-1 text-sm text-jardim-text-muted">
            Contas com acesso ao painel administrativo (e-mail e palavra-passe).
            {!canManage ? (
              <span className="mt-1 block text-xs text-jardim-text-light">
                Apenas administradores podem criar ou editar contas de equipa.
              </span>
            ) : null}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {canManage ? (
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-jardim-green-dark px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/40"
              onClick={() => setCreateOpen(true)}
            >
              <Plus className="h-4 w-4" aria-hidden />
              Novo funcionário
            </button>
          ) : null}
          <div className="relative max-w-md flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-jardim-text-light"
              aria-hidden
            />
            <input
              type="search"
              className="w-full rounded-xl border border-jardim-border bg-jardim-white py-2.5 pl-10 pr-3 text-sm text-jardim-text placeholder:text-jardim-text-light focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
              placeholder="Filtrar por nome ou e-mail…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Pesquisar funcionários"
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-jardim-border bg-jardim-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-jardim-border bg-jardim-cream/80 text-[11px] font-semibold uppercase tracking-wider text-jardim-text-muted">
                <th className="px-4 py-3 sm:px-5">Nome</th>
                <th className="px-4 py-3 sm:px-5">E-mail</th>
                <th className="px-4 py-3 sm:px-5">Perfil</th>
                <th className="px-4 py-3 sm:px-5">Estado</th>
                <th className="px-4 py-3 text-right sm:px-5">Criado em</th>
                {canManage ? (
                  <th className="px-4 py-3 text-right sm:px-5">Ações</th>
                ) : null}
              </tr>
            </thead>
            <tbody className="divide-y divide-jardim-border">
              {query.isLoading ? (
                <tr>
                  <td
                    colSpan={canManage ? 6 : 5}
                    className="px-4 py-12 text-center text-jardim-text-muted"
                  >
                    A carregar…
                  </td>
                </tr>
              ) : query.isError ? (
                <tr>
                  <td
                    colSpan={canManage ? 6 : 5}
                    className="px-4 py-12 text-center text-red-800"
                  >
                    Não foi possível carregar a lista. Tente novamente.
                  </td>
                </tr>
              ) : query.data?.items.length === 0 ? (
                <tr>
                  <td
                    colSpan={canManage ? 6 : 5}
                    className="px-4 py-14"
                  >
                    <div className="flex flex-col items-center justify-center text-center">
                      <UserCog
                        className="mb-2 h-10 w-10 text-jardim-border"
                        aria-hidden
                      />
                      <p className="font-medium text-jardim-text-muted">
                        Nenhum funcionário encontrado
                      </p>
                      <p className="mt-1 text-xs text-jardim-text-light">
                        {search.trim().length >= 2
                          ? "Tente outro termo de pesquisa."
                          : "Ainda não há contas de equipa registadas."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                query.data?.items.map((u) => (
                  <tr
                    key={u.id}
                    className="transition-colors hover:bg-jardim-cream/50"
                  >
                    <td className="px-4 py-3.5 font-medium text-jardim-green-dark sm:px-5">
                      {u.nome}
                    </td>
                    <td className="px-4 py-3.5 text-jardim-text sm:px-5">
                      {u.email}
                    </td>
                    <td className="px-4 py-3.5 sm:px-5">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
                          roleBadgeClass(u.role),
                        )}
                      >
                        {ROLE_LABEL[u.role] ?? u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 sm:px-5">
                      <span
                        className={cn(
                          "text-xs font-medium",
                          u.ativo
                            ? "text-jardim-green-dark"
                            : "text-jardim-text-muted",
                        )}
                      >
                        {u.ativo ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right tabular-nums text-jardim-text-muted sm:px-5">
                      {new Date(u.createdAt).toLocaleString("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                    {canManage ? (
                      <td className="px-4 py-3.5 text-right sm:px-5">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-jardim-border bg-jardim-white px-2.5 py-1.5 text-xs font-medium text-jardim-green-dark transition hover:bg-jardim-cream"
                          onClick={() => setEditRow(u as StaffRow)}
                        >
                          <Pencil className="h-3.5 w-3.5" aria-hidden />
                          Editar
                        </button>
                      </td>
                    ) : null}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {createOpen ? (
        <CreateStaffModal
          onClose={() => setCreateOpen(false)}
          onCreated={async () => {
            await utils.admin.listStaff.invalidate();
            setCreateOpen(false);
          }}
        />
      ) : null}

      {editRow ? (
        <EditStaffModal
          user={editRow}
          onClose={() => setEditRow(null)}
          onSaved={async () => {
            await utils.admin.listStaff.invalidate();
            await utils.admin.getCapabilities.invalidate();
            setEditRow(null);
          }}
        />
      ) : null}
    </div>
  );
}

function CreateStaffModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => Promise<void>;
}) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState<"ADMIN" | "FINANCEIRO" | "ATENDENTE">(
    "ATENDENTE",
  );
  const [ativo, setAtivo] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const m = api.admin.createStaff.useMutation({
    onError: (e) => setErr(e.message),
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    await m.mutateAsync({
      nome: nome.trim(),
      email: email.trim(),
      senha,
      role,
      ativo,
    });
    await onCreated();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
      role="presentation"
      onClick={(ev) => {
        if (ev.target === ev.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-jardim-border bg-jardim-white p-5 shadow-xl"
        role="dialog"
        aria-labelledby="create-staff-title"
      >
        <button
          type="button"
          className="absolute right-3 top-3 rounded-lg p-1 text-jardim-text-muted hover:bg-jardim-cream"
          onClick={onClose}
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>
        <h2
          id="create-staff-title"
          className="pr-8 text-base font-semibold text-jardim-green-dark"
        >
          Novo funcionário
        </h2>
        <form className="mt-4 space-y-3" onSubmit={submit}>
          <label className="block text-xs font-medium text-jardim-text-muted">
            Nome
            <input
              required
              className="mt-1 w-full rounded-xl border border-jardim-border px-3 py-2 text-sm"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </label>
          <label className="block text-xs font-medium text-jardim-text-muted">
            E-mail
            <input
              required
              type="email"
              className="mt-1 w-full rounded-xl border border-jardim-border px-3 py-2 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block text-xs font-medium text-jardim-text-muted">
            Palavra-passe (mín. 8 caracteres)
            <input
              required
              type="password"
              autoComplete="new-password"
              minLength={8}
              className="mt-1 w-full rounded-xl border border-jardim-border px-3 py-2 text-sm"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </label>
          <label className="block text-xs font-medium text-jardim-text-muted">
            Perfil
            <select
              className="mt-1 w-full rounded-xl border border-jardim-border px-3 py-2 text-sm"
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "ADMIN" | "FINANCEIRO" | "ATENDENTE")
              }
            >
              <option value="ATENDENTE">Atendente</option>
              <option value="FINANCEIRO">Financeiro</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm text-jardim-text">
            <input
              type="checkbox"
              checked={ativo}
              onChange={(e) => setAtivo(e.target.checked)}
            />
            Conta ativa
          </label>
          {err ? (
            <p className="text-sm text-red-800" role="alert">
              {err}
            </p>
          ) : null}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="rounded-xl px-4 py-2 text-sm text-jardim-text-muted hover:bg-jardim-cream"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={m.isPending}
              className="rounded-xl bg-jardim-green-dark px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {m.isPending ? "A guardar…" : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditStaffModal({
  user,
  onClose,
  onSaved,
}: {
  user: StaffRow;
  onClose: () => void;
  onSaved: () => Promise<void>;
}) {
  const [nome, setNome] = useState(user.nome);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [ativo, setAtivo] = useState(user.ativo);
  const [novaSenha, setNovaSenha] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const updateM = api.admin.updateStaff.useMutation({
    onError: (e) => setErr(e.message),
  });
  const passM = api.admin.updateStaffPassword.useMutation({
    onError: (e) => setErr(e.message),
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (novaSenha.length > 0 && novaSenha.length < 8) {
      setErr("A nova palavra-passe deve ter pelo menos 8 caracteres.");
      return;
    }

    const emailNorm = email.trim().toLowerCase();
    const hasProfileChange =
      nome.trim() !== user.nome ||
      emailNorm !== user.email ||
      role !== user.role ||
      ativo !== user.ativo;

    if (!hasProfileChange && novaSenha.length < 8) {
      setErr("Nada a alterar.");
      return;
    }

    if (hasProfileChange) {
      await updateM.mutateAsync({
        id: user.id,
        ...(nome.trim() !== user.nome ? { nome: nome.trim() } : {}),
        ...(emailNorm !== user.email ? { email: emailNorm } : {}),
        ...(role !== user.role ? { role } : {}),
        ...(ativo !== user.ativo ? { ativo } : {}),
      });
    }
    if (novaSenha.length >= 8) {
      await passM.mutateAsync({ id: user.id, novaSenha: novaSenha });
    }
    await onSaved();
  };

  const pending = updateM.isPending || passM.isPending;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
      role="presentation"
      onClick={(ev) => {
        if (ev.target === ev.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-jardim-border bg-jardim-white p-5 shadow-xl"
        role="dialog"
        aria-labelledby="edit-staff-title"
      >
        <button
          type="button"
          className="absolute right-3 top-3 rounded-lg p-1 text-jardim-text-muted hover:bg-jardim-cream"
          onClick={onClose}
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>
        <h2
          id="edit-staff-title"
          className="pr-8 text-base font-semibold text-jardim-green-dark"
        >
          Editar funcionário
        </h2>
        <form className="mt-4 space-y-3" onSubmit={submit}>
          <label className="block text-xs font-medium text-jardim-text-muted">
            Nome
            <input
              required
              className="mt-1 w-full rounded-xl border border-jardim-border px-3 py-2 text-sm"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </label>
          <label className="block text-xs font-medium text-jardim-text-muted">
            E-mail
            <input
              required
              type="email"
              className="mt-1 w-full rounded-xl border border-jardim-border px-3 py-2 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block text-xs font-medium text-jardim-text-muted">
            Perfil
            <select
              className="mt-1 w-full rounded-xl border border-jardim-border px-3 py-2 text-sm"
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "ADMIN" | "FINANCEIRO" | "ATENDENTE")
              }
            >
              <option value="ATENDENTE">Atendente</option>
              <option value="FINANCEIRO">Financeiro</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm text-jardim-text">
            <input
              type="checkbox"
              checked={ativo}
              onChange={(e) => setAtivo(e.target.checked)}
            />
            Conta ativa
          </label>
          <div className="border-t border-jardim-border pt-3">
            <p className="text-xs font-medium text-jardim-text-muted">
              Nova palavra-passe (opcional)
            </p>
            <input
              type="password"
              autoComplete="new-password"
              minLength={8}
              placeholder="Deixe vazio para não alterar"
              className="mt-1 w-full rounded-xl border border-jardim-border px-3 py-2 text-sm"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />
          </div>
          {err ? (
            <p className="text-sm text-red-800" role="alert">
              {err}
            </p>
          ) : null}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="rounded-xl px-4 py-2 text-sm text-jardim-text-muted hover:bg-jardim-cream"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={pending}
              className="rounded-xl bg-jardim-green-dark px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {pending ? "A guardar…" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
