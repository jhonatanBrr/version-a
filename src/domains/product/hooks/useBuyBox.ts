"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/shared/cart/CartProvider";
import { useRouter } from "@/shared/i18n/navigation";
import type { BuyBoxProps } from "../interfaces/product-page";
import { clampQuantity, editionTotals, resolveEdition } from "../utils/product-page";

const STATUS_TIMEOUT_MS = 5000;

/** State and actions of the product buy box (edition, quantity, cart). */
export function useBuyBox({ productId, editions }: BuyBoxProps) {
  const { add } = useCart();
  const router = useRouter();
  const [editionId, setEditionId] = useState(editions[0].id);
  const [quantity, setQuantityState] = useState(1);
  const [addedCount, setAddedCount] = useState<number | null>(null);

  useEffect(() => {
    if (addedCount === null) return;
    const timer = window.setTimeout(() => setAddedCount(null), STATUS_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [addedCount]);

  const edition = resolveEdition({ editions }, editionId);

  return {
    edition,
    quantity,
    totals: editionTotals(edition, quantity),
    addedCount,
    selectEdition: setEditionId,
    setQuantity: (value: number) => setQuantityState(clampQuantity(value)),
    addToCart: () => {
      add(productId, edition.id, quantity);
      setAddedCount(quantity);
    },
    checkout: () => {
      add(productId, edition.id, quantity);
      router.push("/checkout");
    },
  };
}
