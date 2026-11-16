import type { QuantityStepperProps } from "../interfaces/components";

const stepButton =
  "flex size-11 items-center justify-center text-lg font-bold text-link transition-colors hover:bg-soft disabled:cursor-not-allowed disabled:text-muted disabled:hover:bg-transparent";

/** Compact −/+ control; the value is announced via an output element. */
export function QuantityStepper({ value, min, max, onChange, labels }: QuantityStepperProps) {
  return (
    <div role="group" aria-label={labels.value} className="inline-flex items-center overflow-hidden rounded-ds border border-line">
      <button
        type="button"
        className={stepButton}
        aria-label={labels.decrease}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <span aria-hidden="true">−</span>
      </button>
      <output aria-live="polite" className="min-w-8 text-center text-[15px] font-bold tabular-nums">
        {value}
      </output>
      <button
        type="button"
        className={stepButton}
        aria-label={labels.increase}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <span aria-hidden="true">+</span>
      </button>
    </div>
  );
}
