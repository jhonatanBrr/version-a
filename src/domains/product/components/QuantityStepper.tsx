"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/design-system/utils/cn";
import { QUANTITY_MAX, QUANTITY_MIN } from "../utils/product-page";

export interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
}

const stepClasses =
  "inline-flex size-11 items-center justify-center text-xl font-bold text-link transition-colors hover:bg-soft disabled:cursor-not-allowed disabled:text-muted disabled:hover:bg-transparent";

export function QuantityStepper({ value, onChange }: QuantityStepperProps) {
  const t = useTranslations("product.buy");
  return (
    <div className="flex flex-col gap-2">
      <span id="quantity-label" className="text-sm font-bold">
        {t("quantity")}
      </span>
      <div role="group" aria-labelledby="quantity-label" className="inline-flex w-fit items-center rounded-ds border border-line-strong bg-surface">
        <button
          type="button"
          aria-label={t("decrease")}
          disabled={value <= QUANTITY_MIN}
          onClick={() => onChange(value - 1)}
          className={cn(stepClasses, "rounded-l-ds")}
        >
          <span aria-hidden="true">−</span>
        </button>
        <output aria-live="polite" className="min-w-10 text-center font-bold tabular-nums">
          <span className="sr-only">{t("quantityValue", { count: value })}</span>
          <span aria-hidden="true">{value}</span>
        </output>
        <button
          type="button"
          aria-label={t("increase")}
          disabled={value >= QUANTITY_MAX}
          onClick={() => onChange(value + 1)}
          className={cn(stepClasses, "rounded-r-ds")}
        >
          <span aria-hidden="true">+</span>
        </button>
      </div>
    </div>
  );
}
