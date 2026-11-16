"use client";

import { useTranslations } from "next-intl";
import { CartIcon, CheckIcon } from "@/design-system/components/icons";
import { cn } from "@/design-system/utils/cn";
import { useCart } from "@/shared/cart/CartProvider";
import type { Product } from "@/shared/catalog/types";
import { useTransientFlag } from "../hooks/useTransientFlag";

export interface AddToCartButtonProps {
  product: Product;
}

/** Adds the default edition to the cart and confirms with a check icon for ~2s. */
export function AddToCartButton({ product }: AddToCartButtonProps) {
  const t = useTranslations("home.catalog");
  const { add } = useCart();
  const [added, flagAdded] = useTransientFlag();
  const edition = product.editions[0];

  return (
    <>
      <button
        type="button"
        aria-label={t("addToCart", { name: product.name })}
        disabled={!edition}
        onClick={() => {
          if (!edition) return;
          add(product.id, edition.id, 1);
          flagAdded();
        }}
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-ds transition-colors disabled:opacity-60",
          added ? "bg-strong text-white" : "bg-primary text-on-primary hover:bg-primary-hover",
        )}
      >
        {added ? <CheckIcon key="added" size={20} className="ds-pop" /> : <CartIcon key="cart" size={20} />}
      </button>
      <span role="status" className="sr-only">
        {added ? t("added", { name: product.name }) : ""}
      </span>
    </>
  );
}
