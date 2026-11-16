"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/design-system/components/Button";
import { LockIcon } from "@/design-system/components/icons";
import { formatPrice } from "@/design-system/utils/format-price";
import type { PayButtonProps } from "../interfaces/components";
import { installmentAmount } from "../utils/order-totals";

/** Submit button whose label follows the selected payment method. */
export function PayButton({ methodId, total, processing, formId, className }: PayButtonProps) {
  const t = useTranslations("checkout");
  const amount = formatPrice(methodId === "installments" ? installmentAmount(total) : total);

  return (
    <Button
      type="submit"
      form={formId}
      size="lg"
      fullWidth
      disabled={processing}
      aria-busy={processing || undefined}
      className={className}
    >
      <LockIcon size={18} />
      {processing ? t("pay.processing") : t(`methods.${methodId}.cta`, { amount })}
    </Button>
  );
}
