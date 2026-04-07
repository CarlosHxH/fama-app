const STEPS = [
  { id: 1, label: "Identificação", short: "ID" },
  { id: 2, label: "Seleção & Débitos", short: "Débitos" },
  { id: 3, label: "Pagamento", short: "Pagto" },
  { id: 4, label: "Confirmação", short: "OK" },
] as const;

type HeroStepperProps = {
  /** Passo atual (1–4). */
  currentStep: 1 | 2 | 3 | 4;
};

/**
 * Stepper horizontal estilo PaginaCobranca (hero sob o header).
 */
export function HeroStepper({ currentStep }: HeroStepperProps) {
  const APP_TITLE = process.env.NEXT_PUBLIC_APP_NAME ?? "Central Financeira";

  return (
    <div className="border-b border-[#ddd9d0] bg-linear-to-br from-[#ede9e0] to-[#f5f2ed] px-4 py-8 sm:px-8">
      <h1
        className="text-center text-[1.35rem] font-extrabold tracking-tight text-[#1a3a2a] sm:text-2xl"
        style={{ fontFamily: "var(--font-cobranca-playfair), Georgia, serif" }}
      >
        {APP_TITLE}
      </h1>
      <div
        className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-1 sm:gap-0"
        role="navigation"
        aria-label="Etapas do pagamento"
      >
        {STEPS.map((s, i) => {
          const isDone = s.id < currentStep;
          const isActive = s.id === currentStep;
          return (
            <div key={s.id} className="flex items-center">
              {i > 0 ? (
                <div
                  className={`mx-1 hidden h-px w-6 sm:block md:w-10 ${
                    isDone || isActive ? "bg-[#2d5a3d]/40" : "bg-[#ddd9d0]"
                  }`}
                  aria-hidden
                />
              ) : null}
              <div
                className={`flex flex-col items-center gap-1 px-1 sm:px-2 ${
                  isActive ? "text-[#1a3a2a]" : "text-[#7a7a7a]"
                }`}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-[0.8rem] font-bold sm:h-10 sm:w-10 ${
                    isDone
                      ? "bg-[#2d5a3d] text-white"
                      : isActive
                        ? "border-2 border-[#b8972a] bg-white text-[#1a3a2a] shadow-sm"
                        : "border border-[#ddd9d0] bg-white text-[#7a7a7a]"
                  }`}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isDone ? "✓" : s.id}
                </div>
                <span className="max-w-18 text-center text-[0.6rem] leading-tight font-semibold tracking-wide uppercase sm:max-w-none sm:text-[0.65rem]">
                  <span className="sm:hidden">{s.short}</span>
                  <span className="hidden sm:inline">{s.label}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
