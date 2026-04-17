"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

type AsideContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AsideContext = React.createContext<AsideContextValue | null>(null);

export function AsideProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const value = React.useMemo(() => ({ open, setOpen }), [open]);
  return (
    <AsideContext.Provider value={value}>{children}</AsideContext.Provider>
  );
}

export function useAside() {
  const ctx = React.useContext(AsideContext);
  if (!ctx) {
    throw new Error("useAside must be used within AsideProvider");
  }
  return ctx;
}

export type AsideTriggerProps = React.ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
};

/**
 * Botão que alterna o menu lateral em mobile (Radix Slot + contexto).
 * Em `md+` deve ser oculto com CSS (`md:hidden`).
 */
export const AsideTrigger = React.forwardRef<
  HTMLButtonElement,
  AsideTriggerProps
>(({ asChild = false, onClick, ...props }, ref) => {
  const { setOpen } = useAside();
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : "button"}
      {...props}
      onClick={(e) => {
        setOpen((o) => !o);
        onClick?.(e);
      }}
    />
  );
});
AsideTrigger.displayName = "AsideTrigger";
