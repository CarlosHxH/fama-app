"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";

import { api } from "~/trpc/react";
import { formatCpfCnpjDisplay } from "~/lib/format-cpf-cnpj";

/**
 * Formulário de edição dos dados cadastrais do titular (nome, e-mail, ativo).
 */
export function ClienteEditarClient() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === "string" ? params.id : "";

  const caps = api.admin.getCapabilities.useQuery();
  const q = api.admin.getCustomerById.useQuery(
    { id },
    { enabled: Boolean(id) },
  );
  const utils = api.useUtils();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!q.data) return;
    setNome(q.data.nome);
    setEmail(q.data.email ?? "");
    setAtivo(q.data.ativo);
  }, [q.data]);

  const mut = api.admin.updateCustomer.useMutation({
    onSuccess: async () => {
      await utils.admin.getCustomerById.invalidate({ id });
      await utils.admin.listUsers.invalidate();
      router.push(`/admin/clientes/${id}`);
      router.refresh();
    },
    onError: (e) => setErr(e.message),
  });

  const canEdit = caps.data?.canEditCustomerContacts ?? false;

  if (!id) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center text-sm text-red-800">
        Identificador inválido.
      </div>
    );
  }

  if (q.isLoading || caps.isLoading) {
    return (
      <div className="flex justify-center py-16 text-jardim-text-muted">
        <Loader2 className="h-8 w-8 animate-spin" aria-hidden />
      </div>
    );
  }

  if (q.isError || !q.data) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center">
        <p className="text-sm text-red-800">Cliente não encontrado.</p>
        <Link
          href="/admin/clientes"
          className="mt-4 inline-block text-sm font-medium text-jardim-green-mid hover:underline"
        >
          Voltar à lista
        </Link>
      </div>
    );
  }

  const c = q.data;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!canEdit) return;

    const emailTrim = email.trim();
    const curEmail = c.email ?? "";
    const nomeNext = nome.trim();

    const patch: {
      id: string;
      nome?: string;
      email?: string;
      ativo?: boolean;
    } = { id };

    if (nomeNext !== c.nome) patch.nome = nomeNext;
    if (emailTrim !== curEmail) {
      patch.email = emailTrim === "" ? "" : emailTrim;
    }
    if (ativo !== c.ativo) patch.ativo = ativo;

    if (
      patch.nome === undefined &&
      patch.email === undefined &&
      patch.ativo === undefined
    ) {
      setErr("Nada alterado.");
      return;
    }

    void mut.mutateAsync(patch);
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-6 sm:px-6 lg:py-8">
      <Link
        href={`/admin/clientes/${id}`}
        className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-jardim-green-mid hover:underline"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
        Ficha do cliente
      </Link>

      <h1 className="text-lg font-semibold text-jardim-green-dark sm:text-xl">
        Editar cliente
      </h1>
      <p className="mt-1 text-sm text-jardim-text-muted">
        CPF/CNPJ:{" "}
        <span className="font-mono tabular-nums text-jardim-text">
          {formatCpfCnpjDisplay(c.cpfCnpj)}
        </span>{" "}
        (não editável — identificador de login no portal)
      </p>

      {!canEdit ? (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          A sua função não permite alterar dados de clientes. Contacte um
          administrador ou utilizador financeiro.
        </p>
      ) : (
        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
          <label className="block text-xs font-medium text-jardim-text-muted">
            Nome
            <input
              required
              className="mt-1 w-full rounded-xl border border-jardim-border bg-jardim-white px-3 py-2.5 text-sm text-jardim-text focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </label>
          <label className="block text-xs font-medium text-jardim-text-muted">
            E-mail
            <input
              type="email"
              className="mt-1 w-full rounded-xl border border-jardim-border bg-jardim-white px-3 py-2.5 text-sm text-jardim-text focus:border-jardim-green-mid focus:outline-none focus:ring-2 focus:ring-jardim-green-mid/25"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="opcional"
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-jardim-text">
            <input
              type="checkbox"
              checked={ativo}
              onChange={(e) => setAtivo(e.target.checked)}
            />
            Conta ativa no portal
          </label>

          {err ? (
            <p className="text-sm text-red-800" role="alert">
              {err}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={mut.isPending}
              className="rounded-xl bg-jardim-green-dark px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-jardim-green-mid disabled:opacity-60"
            >
              {mut.isPending ? "A guardar…" : "Guardar alterações"}
            </button>
            <Link
              href={`/admin/clientes/${id}`}
              className="rounded-xl border border-jardim-border px-5 py-2.5 text-sm font-medium text-jardim-text-muted transition hover:bg-jardim-cream"
            >
              Cancelar
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
