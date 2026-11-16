"use client";

import { useTranslations } from "next-intl";
import { CheckIcon } from "@/design-system/components/icons";
import { cn } from "@/design-system/utils/cn";
import type { CheckoutStepsProps } from "../interfaces/components";

const STEPS = ["cart", "payment", "confirm"] as const;

/** Three-step progress indicator: Carrello ✓ · Pagamento · Conferma. */
export function CheckoutSteps({ current }: CheckoutStepsProps) {
  const t = useTranslations("checkout.steps");
  const currentIndex = STEPS.indexOf(current);

  return (
    <nav aria-label={t("label")}>
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
        {STEPS.map((step, index) => {
          const done = index < currentIndex;
          const active = index === currentIndex;
          return (
            <li key={step} className="flex items-center gap-3">
              {index > 0 && <span aria-hidden="true" className="h-px w-6 bg-line-strong sm:w-10" />}
              <span
                aria-current={active ? "step" : undefined}
                className={cn("flex items-center gap-2", active ? "font-bold text-ink" : "text-muted")}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full text-xs font-bold",
                    done && "bg-primary text-on-primary",
                    active && "border-2 border-primary text-link",
                    !done && !active && "border border-line-strong",
                  )}
                >
                  {done ? <CheckIcon size={14} /> : index + 1}
                </span>
                {t(step)}
                {done && <span className="sr-only"> ({t("completed")})</span>}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
