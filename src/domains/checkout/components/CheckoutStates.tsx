"use client";

import { useTranslations } from "next-intl";
import { ButtonLink } from "@/design-system/components/Button";
import { CartIcon } from "@/design-system/components/icons";
import { CATALOG_HREF } from "../utils/checkout-constants";

/** Placeholder shown until the cart was read from localStorage. */
export function CheckoutSkeleton() {
  const t = useTranslations("checkout");
  return (
    <div aria-busy="true" className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
      <span className="sr-only" role="status">
        {t("loading")}
      </span>
      <div aria-hidden="true" className="flex flex-col gap-5">
        <div className="h-40 animate-pulse rounded-ds bg-soft" />
        <div className="h-80 animate-pulse rounded-ds bg-soft" />
      </div>
      <div aria-hidden="true" className="hidden h-96 animate-pulse rounded-ds bg-soft lg:block" />
    </div>
  );
}

/** Shown when the cart has no items after hydration. */
export function EmptyCart() {
  const t = useTranslations("checkout.empty");
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-ds border border-line bg-surface p-8 text-center sm:p-12">
      <span aria-hidden="true" className="flex size-16 items-center justify-center rounded-full bg-soft text-link">
        <CartIcon size={30} />
      </span>
      <h2 className="text-2xl text-ink">{t("title")}</h2>
      <p className="text-muted">{t("text")}</p>
      <ButtonLink href={CATALOG_HREF}>{t("cta")}</ButtonLink>
    </div>
  );
}
