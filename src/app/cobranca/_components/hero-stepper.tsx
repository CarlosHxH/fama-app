const STEPS = [
  { id: 1, label: "Identificação" },
  { id: 2, label: "Seleção & Débitos" },
  { id: 3, label: "Pagamento" },
  { id: 4, label: "Confirmação" },
] as const;

type HeroStepperProps = {
  currentStep: 1 | 2 | 3 | 4;
};

const APP_TITLE = process.env.NEXT_PUBLIC_APP_NAME ?? "Central Financeira";

/**
 * Hero + stepper integrado (classes `hero-alert` / `hero-stepper` do protótipo).
 */
export function HeroStepper({ currentStep }: HeroStepperProps) {
  return (
    <div className="hero-alert">
      <h1 id="cobranca-page-title">{APP_TITLE}</h1>
      <nav className="hero-stepper" aria-label="Progresso do pagamento">
        {STEPS.map((s, i) => {
          const isDone = s.id < currentStep;
          const isActive = s.id === currentStep;
          return (
            <span key={s.id} style={{ display: "contents" }}>
              <div
                className={`hero-step${isActive ? " active" : ""}${isDone ? " done" : ""}`}
                aria-current={isActive ? "step" : undefined}
              >
                <div className="hero-step-circle" aria-hidden="true">
                  {isDone ? "✓" : s.id}
                </div>
                {s.label}
              </div>
              {i < STEPS.length - 1 ? (
                <div className="hero-step-line" aria-hidden />
              ) : null}
            </span>
          );
        })}
      </nav>
    </div>
  );
}
