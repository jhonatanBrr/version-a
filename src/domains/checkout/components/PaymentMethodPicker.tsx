"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/design-system/components/Badge";
import { formatPrice } from "@/design-system/utils/format-price";
import type { PaymentMethodPickerProps } from "../interfaces/components";
import { PAYMENT_METHODS } from "../utils/checkout-constants";
import { installmentAmount } from "../utils/order-totals";
import { PaymentLogos } from "./PaymentLogos";

const DESCRIPTION_ID = "checkout-method-description";

/**
 * Native radio inputs sharing one name: arrow keys move the selection,
 * Tab enters/leaves the group, as expected for a radiogroup.
 */
export function PaymentMethodPicker({ value, onChange, total }: PaymentMethodPickerProps) {
  const t = useTranslations("checkout.methods");
  const installment = formatPrice(installmentAmount(total));

  return (
    <div className="flex flex-col gap-3">
      <div role="radiogroup" aria-labelledby="checkout-payment-legend" aria-describedby={DESCRIPTION_ID} className="flex flex-col gap-2">
        {PAYMENT_METHODS.map((method) => {
          const selected = method.id === value;
          return (
            <label
              key={method.id}
              className="flex min-h-14 cursor-pointer flex-wrap items-center gap-x-3 gap-y-2 rounded-ds border border-line bg-surface px-4 py-3 transition-colors hover:border-line-strong has-[:checked]:border-primary has-[:checked]:bg-soft has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent/30"
            >
              <input
                type="radio"
                name="payment-method"
                value={method.id}
                checked={selected}
                onChange={() => onChange(method.id)}
                className="size-5 shrink-0 accent-primary focus-visible:outline-none"
              />
              <span className="flex-1 font-bold text-ink">{t(`${method.id}.label`)}</span>
              {method.installments && <Badge tone="brand">{t("installments.badge")}</Badge>}
              <PaymentLogos logos={method.logos} />
            </label>
          );
        })}
      </div>
      <p id={DESCRIPTION_ID} aria-live="polite" className="rounded-ds bg-soft-2 px-4 py-3 text-sm text-ink">
        {t(`${value}.description`, { amount: installment })}
      </p>
    </div>
  );
}
