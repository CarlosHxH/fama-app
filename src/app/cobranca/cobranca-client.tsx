"use client";

import { signOut, useSession } from "next-auth/react";
import { useMemo, useState } from "react";

import { api } from "~/trpc/react";
import { isBillingPaid, isBillingPendingPayment } from "~/lib/billing-status";

import { CobrancaFooter } from "./_components/cobranca-footer";
import { CobrancaHeader } from "./_components/cobranca-header";
import {
  CobrancaLegalBox,
  CobrancaNoticeBox,
} from "./_components/cobranca-notices";
import { CheckoutPanel, type PayMethod } from "./_components/checkout-panel";
import { HeroStepper } from "./_components/hero-stepper";
import { JazigosPlaceholder } from "./_components/jazigos-placeholder";
import { ParcelasList } from "./_components/parcelas-list";
import { PixModal } from "./_components/pix-modal";
import { TitularCard } from "./_components/titular-card";

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function centsToBrl(cents: number) {
  return brl.format(cents / 100);
}

/**
 * Área de cobrança: layout estilo PaginaCobranca (duas colunas, stepper 4 passos, PIX via Asaas).
 */
export function CobrancaClient() {
  const { data: session } = useSession();
  const [hidePaid, setHidePaid] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pixModalOpen, setPixModalOpen] = useState(false);
  const [itemsOpen, setItemsOpen] = useState(true);
  const [valueReais, setValueReais] = useState("10,00");
  const [description, setDescription] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [payMethod, setPayMethod] = useState<PayMethod>("pix");

  const utils = api.useUtils();
  const listQuery = api.billing.listMine.useQuery(undefined, {
    refetchInterval: (query) => {
      const rows = query.state.data;
      const pending = rows?.some((r) => r.status === "PENDING");
      return pending ? 5000 : false;
    },
  });

  const selected = useMemo(
    () => listQuery.data?.find((p) => p.id === selectedId) ?? null,
    [listQuery.data, selectedId],
  );

  const createPix = api.billing.createPix.useMutation({
    onSuccess: async (row) => {
      await utils.billing.listMine.invalidate();
      setSelectedId(row.id);
      setPixModalOpen(true);
    },
  });

  const currentStep = useMemo((): 1 | 2 | 3 | 4 => {
    if (selected && isBillingPaid(selected.status)) return 4;
    if (pixModalOpen) return 3;
    return 2;
  }, [selected, pixModalOpen]);

  function parseValueToCents(input: string): number {
    const n = Number.parseFloat(input.replace(/\./g, "").replace(",", "."));
    if (Number.isNaN(n)) return 0;
    return Math.round(n * 100);
  }

  const dueDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d;
  }, []);

  function onCreate(e: React.FormEvent) {
    e.preventDefault();
    const cents = parseValueToCents(valueReais);
    createPix.mutate({
      valueCents: cents,
      description: description || undefined,
      dueDate,
      cpfCnpj: cpfCnpj.replace(/\D/g, "") || undefined,
    });
  }

  function onConfirmPayment() {
    if (!selected || !isBillingPendingPayment(selected.status)) return;
    setPixModalOpen(true);
  }

  const payerName =
    session?.user?.name ??
    session?.user?.cpfCnpj ??
    session?.user?.email ??
    "Titular";

  return (
    <>
      <CobrancaHeader
        isAdmin={session?.user?.role === "ADMIN"}
        onSignOut={() => signOut({ callbackUrl: "/login" })}
      />
      <HeroStepper currentStep={currentStep} />

      <div className="page-wrapper mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_min(380px,100%)] lg:items-start">
          <div className="min-w-0">
            <TitularCard user={session?.user} />
            <ParcelasList
              payments={listQuery.data}
              hidePaid={hidePaid}
              onToggleHidePaid={() => setHidePaid((v) => !v)}
              selectedId={selectedId}
              onSelect={setSelectedId}
              centsToBrl={centsToBrl}
              valueReais={valueReais}
              onValueReaisChange={setValueReais}
              description={description}
              onDescriptionChange={setDescription}
              cpfCnpj={cpfCnpj}
              onCpfCnpjChange={setCpfCnpj}
              onCreateSubmit={onCreate}
              createPending={createPix.isPending}
              createError={createPix.error?.message ?? null}
            />
            <CobrancaNoticeBox />
            <CobrancaLegalBox />
            <JazigosPlaceholder />
          </div>

          <CheckoutPanel
            payerName={payerName}
            selected={selected}
            itemsOpen={itemsOpen}
            onToggleItems={() => setItemsOpen((o) => !o)}
            centsToBrl={centsToBrl}
            payMethod={payMethod}
            onPayMethod={setPayMethod}
            onConfirmPayment={onConfirmPayment}
            confirmDisabled={listQuery.isLoading}
          />
        </div>
      </div>

      <CobrancaFooter />

      <PixModal
        open={pixModalOpen}
        payment={selected}
        onClose={() => setPixModalOpen(false)}
        centsToBrl={centsToBrl}
      />
    </>
  );
}
