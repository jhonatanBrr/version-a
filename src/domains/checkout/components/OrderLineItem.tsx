"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { formatPrice } from "@/design-system/utils/format-price";
import { useCart } from "@/shared/cart/CartProvider";
import { productImageUrl } from "@/shared/catalog/queries";
import type { AppLocale } from "@/shared/i18n/routing";
import type { OrderLineItemProps } from "../interfaces/components";
import { MAX_QUANTITY, MIN_QUANTITY } from "../utils/checkout-constants";
import { QuantityStepper } from "./QuantityStepper";

/** One editable cart line: thumbnail, name, edition, quantity and price. */
export function OrderLineItem({ line }: OrderLineItemProps) {
  const t = useTranslations("checkout.summary");
  const tc = useTranslations("common");
  const locale = useLocale() as AppLocale;
  const { setQuantity, remove } = useCart();
  const { product, edition } = line;
  const name = product.name;

  return (
    <li className="flex gap-3 py-4">
      <Image
        src={productImageUrl(product.image.photoId)}
        alt={product.image.alt[locale]}
        width={72}
        height={72}
        sizes="72px"
        className="size-[72px] shrink-0 rounded-ds bg-soft object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-bold leading-snug text-ink">{name}</p>
            <p className="text-sm text-muted">
              {edition.label[locale]} · {tc(`formats.${product.format}`)}
            </p>
          </div>
          <p className="shrink-0 text-right">
            <span className="block font-bold tabular-nums text-ink">
              <span className="sr-only">{tc("a11y.currentPrice")} </span>
              {formatPrice(line.lineTotal)}
            </span>
            {line.lineListTotal > line.lineTotal && (
              <s className="block text-sm tabular-nums text-muted">
                <span className="sr-only">{tc("a11y.originalPrice")} </span>
                {formatPrice(line.lineListTotal)}
              </s>
            )}
          </p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <QuantityStepper
            value={line.quantity}
            min={MIN_QUANTITY}
            max={MAX_QUANTITY}
            onChange={(quantity) => setQuantity(line.productId, line.editionId, quantity)}
            labels={{
              value: t("quantityOf", { name }),
              decrease: t("decrease", { name }),
              increase: t("increase", { name }),
            }}
          />
          <button
            type="button"
            onClick={() => remove(line.productId, line.editionId)}
            aria-label={t("removeItem", { name })}
            className="min-h-11 rounded-ds px-2 text-sm font-bold text-link underline-offset-4 hover:underline"
          >
            {t("remove")}
          </button>
        </div>
      </div>
    </li>
  );
}
