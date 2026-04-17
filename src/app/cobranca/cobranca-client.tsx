"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

import { api } from "~/trpc/react";
import { isBillingPaid, isBillingPendingPayment } from "~/lib/billing-status";

import { CobrancaFooter } from "./_components/cobranca-footer";
import { CobrancaHeader } from "./_components/cobranca-header";
import {
  CobrancaLegalBox,
  CobrancaNoticeBox,
} from "./_components/cobranca-notices";
import {
  CheckoutPanel,
  type PayMethod,
  billingTypeToPayMethod,
} from "./_components/checkout-panel";
import { CobrancaStaticModals } from "./_components/cobranca-static-modals";
import { HeroStepper } from "./_components/hero-stepper";
import { JazigosAccordion } from "./_components/jazigos-accordion";
import { LegacySnapshotCard } from "./_components/legacy-snapshot-card";
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
 * Área de cobrança — layout e classes alinhados a PaginaCobranca/cobranca-jazigo.html.
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
  const [emailBilling, setEmailBilling] = useState("");
  const [payMethod, setPayMethod] = useState<PayMethod>("pix");
  const [openTitular, setOpenTitular] = useState(false);
  const [openResp, setOpenResp] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [openBoleto, setOpenBoleto] = useState(false);

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

  useEffect(() => {
    const s = session?.user?.email;
    if (s) setEmailBilling(s);
  }, [session?.user?.email]);

  useEffect(() => {
    if (selected?.asaasBillingType) {
      setPayMethod(billingTypeToPayMethod(selected.asaasBillingType));
    }
  }, [selected?.id, selected?.asaasBillingType]);

  const createCharge = api.billing.createCharge.useMutation({
    onSuccess: async (row) => {
      await utils.billing.listMine.invalidate();
      setSelectedId(row.id);
      if (row.asaasBillingType === "PIX") {
        setPixModalOpen(true);
      } else if (row.asaasBillingType === "BOLETO") {
        setOpenBoleto(true);
      } else {
        setOpenCard(true);
      }
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
    const billingType =
      payMethod === "pix"
        ? "PIX"
        : payMethod === "boleto"
          ? "BOLETO"
          : "CREDIT_CARD";
    createCharge.mutate({
      valueCents: cents,
      description: description || undefined,
      dueDate,
      cpfCnpj: cpfCnpj.replace(/\D/g, "") || undefined,
      email: emailBilling.trim() || undefined,
      billingType,
    });
  }

  function onConfirmPayment() {
    if (!selected || !isBillingPendingPayment(selected.status)) return;
    const method = billingTypeToPayMethod(selected.asaasBillingType);
    if (method === "pix") {
      setPixModalOpen(true);
      return;
    }
    if (method === "card") {
      setOpenCard(true);
      return;
    }
    setOpenBoleto(true);
  }

  const payerName =
    session?.user?.name ??
    session?.user?.cpfCnpj ??
    session?.user?.email ??
    "Titular";

  const cardModalTotal = selected
    ? centsToBrl(selected.valueCents)
    : "R$ 0,00";

  const listLoading = listQuery.isLoading;
  const listError = listQuery.isError
    ? (listQuery.error?.message ?? "Erro desconhecido.")
    : null;

  return (
    <>
      <CobrancaHeader
        isAdmin={session?.user?.role === "ADMIN"}
        onSignOut={() => signOut({ callbackUrl: "/login" })}
      />
      <main id="main-cobranca" tabIndex={-1} aria-labelledby="cobranca-page-title">
        <HeroStepper currentStep={currentStep} />

        <div className="page-wrapper">
          <div className="left-col">
            <TitularCard
              user={session?.user}
              onOpenEditTitular={() => setOpenTitular(true)}
              onOpenResp={() => setOpenResp(true)}
            />
            <ParcelasList
              payments={listQuery.data}
              listLoading={listLoading}
              listError={listError}
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
              emailBilling={emailBilling}
              onEmailBillingChange={setEmailBilling}
              emailRequired={!session?.user?.email}
              onCreateSubmit={onCreate}
              createPending={createCharge.isPending}
              createError={createCharge.error?.message ?? null}
            />
            <JazigosAccordion />
            <CobrancaNoticeBox />
            <CobrancaLegalBox />
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
            confirmDisabled={listLoading}
            listLoading={listLoading}
          />
        </div>
      </main>

      <CobrancaFooter />

      <PixModal
        open={pixModalOpen}
        payment={selected}
        onClose={() => setPixModalOpen(false)}
        centsToBrl={centsToBrl}
      />

      <CobrancaStaticModals
        user={session?.user}
        payment={selected}
        openTitular={openTitular}
        openResp={openResp}
        openCard={openCard}
        openBoleto={openBoleto}
        onCloseTitular={() => setOpenTitular(false)}
        onCloseResp={() => setOpenResp(false)}
        onCloseCard={() => setOpenCard(false)}
        onCloseBoleto={() => setOpenBoleto(false)}
        cardModalTotal={cardModalTotal}
      />
    </>
  );
}
