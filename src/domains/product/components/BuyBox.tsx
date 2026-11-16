"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/design-system/components/Button";
import { CartIcon, CheckIcon } from "@/design-system/components/icons";
import { Price } from "@/design-system/components/Price";
import { formatPrice } from "@/design-system/utils/format-price";
import { useBuyBox } from "../hooks/useBuyBox";
import type { BuyBoxProps } from "../interfaces/product-page";
import { EditionSelector } from "./EditionSelector";
import { QuantityStepper } from "./QuantityStepper";

export function BuyBox(props: BuyBoxProps) {
  const t = useTranslations("product.buy");
  const common = useTranslations("common");
  const { edition, quantity, totals, addedCount, selectEdition, setQuantity, addToCart, checkout } = useBuyBox(props);

  return (
    <section aria-labelledby="buy-title" className="flex flex-col gap-5 rounded-ds border border-line bg-surface p-5">
      <h2 id="buy-title" className="sr-only">
        {t("title")}
      </h2>
      {props.editions.length > 1 && (
        <EditionSelector legend={t("edition")} editions={props.editions} value={edition.id} onChange={selectEdition} />
      )}
      <QuantityStepper value={quantity} onChange={setQuantity} />

      <div className="flex flex-col gap-1">
        <Price
          size="lg"
          amount={totals.total}
          originalAmount={totals.listTotal}
          labels={{ current: common("a11y.currentPrice"), original: common("a11y.originalPrice") }}
        />
        <p className="text-sm text-muted">
          {common("product.vatIncluded")}
          {quantity > 1 && <> · {t("unitPrice", { price: formatPrice(edition.salePrice) })}</>}
        </p>
        {totals.savings > 0 && (
          <p className="text-sm font-bold text-link">
            {t("savings", { amount: formatPrice(totals.savings), percent: totals.discountPercent })}
          </p>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Button variant="outline" size="lg" onClick={addToCart}>
          <CartIcon size={18} aria-hidden="true" />
          {t("addToCart")}
        </Button>
        <Button size="lg" onClick={checkout}>
          {t("checkout")}
        </Button>
      </div>
      <p role="status" className="flex min-h-6 items-center gap-2 text-sm font-bold text-link">
        {addedCount !== null && (
          <>
            <CheckIcon size={16} aria-hidden="true" />
            {t("added", { count: addedCount })}
          </>
        )}
      </p>
    </section>
  );
}
