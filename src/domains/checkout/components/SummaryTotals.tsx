import { useTranslations } from "next-intl";
import { formatPrice } from "@/design-system/utils/format-price";
import type { SummaryTotalsProps } from "../interfaces/components";

/** Subtotal, discount, shipping and total rows of the order. */
export function SummaryTotals({ totals }: SummaryTotalsProps) {
  const t = useTranslations("checkout.summary");

  return (
    <dl className="flex flex-col gap-2 border-t border-line pt-4 text-[15px]">
      <div className="flex justify-between gap-4">
        <dt className="text-muted">{t("subtotal")}</dt>
        <dd className="tabular-nums">{formatPrice(totals.subtotal)}</dd>
      </div>
      {totals.discount > 0 && (
        <div className="flex justify-between gap-4">
          <dt className="text-muted">{t("discount")}</dt>
          <dd className="font-bold tabular-nums text-link">−{formatPrice(totals.discount)}</dd>
        </div>
      )}
      <div className="flex justify-between gap-4">
        <dt className="text-muted">{t("shipping")}</dt>
        <dd className="font-bold text-link">{t("free")}</dd>
      </div>
      <div className="mt-2 flex items-baseline justify-between gap-4 border-t border-line pt-3">
        <dt className="font-bold text-ink">
          {t("total")} <span className="text-xs font-normal text-muted">{t("vatIncluded")}</span>
        </dt>
        <dd className="font-display text-2xl font-semibold tabular-nums text-ink">{formatPrice(totals.total)}</dd>
      </div>
    </dl>
  );
}
