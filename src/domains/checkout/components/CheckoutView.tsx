"use client";

import { useCallback, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/design-system/components/Container";
import { ChevronDownIcon, ChevronLeftIcon } from "@/design-system/components/icons";
import { formatPrice } from "@/design-system/utils/format-price";
import { useCart } from "@/shared/cart/CartProvider";
import { Link } from "@/shared/i18n/navigation";
import type { AppLocale } from "@/shared/i18n/routing";
import { useCheckoutForm } from "../hooks/useCheckoutForm";
import type { CheckoutValues, ConfirmedOrder, PaymentMethodId } from "../interfaces/checkout";
import { CATALOG_HREF } from "../utils/checkout-constants";
import { createOrderNumber } from "../utils/order-number";
import { orderTotals } from "../utils/order-totals";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutSkeleton, EmptyCart } from "./CheckoutStates";
import { CheckoutSteps } from "./CheckoutSteps";
import { ConfirmationPanel } from "./ConfirmationPanel";
import { OrderSummary } from "./OrderSummary";
import { PayButton } from "./PayButton";

const FORM_ID = "checkout-form";

/** Client-rendered checkout: cart summary, billing form and fake payment. */
export function CheckoutView() {
  const t = useTranslations("checkout");
  const locale = useLocale() as AppLocale;
  const { lines, count, hydrated, clear } = useCart();
  const [order, setOrder] = useState<ConfirmedOrder | null>(null);
  const totals = useMemo(() => orderTotals(lines), [lines]);

  const handleSuccess = useCallback(
    (values: CheckoutValues, methodId: PaymentMethodId, submittedAt: number) => {
      setOrder({
        orderNumber: createOrderNumber(submittedAt),
        email: values.email.trim(),
        methodId,
        total: totals.total,
        lines: lines.map((line) => ({
          key: `${line.productId}:${line.editionId}`,
          name: line.product.name,
          editionLabel: line.edition.label[locale],
          quantity: line.quantity,
          lineTotal: line.lineTotal,
        })),
      });
      clear();
    },
    [lines, totals.total, locale, clear],
  );

  const form = useCheckoutForm({ onSuccess: handleSuccess });

  let content;
  if (order) {
    content = <ConfirmationPanel order={order} />;
  } else if (!hydrated) {
    content = <CheckoutSkeleton />;
  } else if (lines.length === 0) {
    content = <EmptyCart />;
  } else {
    content = (
      <>
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-10">
          <details className="group rounded-ds border border-line bg-surface lg:hidden">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-5 py-3 [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-2 font-bold text-link">
                {t("summary.toggle")}
                <ChevronDownIcon size={18} className="transition-transform group-open:rotate-180" />
              </span>
              <span className="font-bold tabular-nums text-ink">{formatPrice(totals.total)}</span>
            </summary>
            <div className="border-t border-line px-5 pb-5">
              <OrderSummary lines={lines} totals={totals} />
            </div>
          </details>

          <CheckoutForm
            id={FORM_ID}
            values={form.values}
            errors={form.errors}
            methodId={form.methodId}
            processing={form.processing}
            total={totals.total}
            onFieldChange={form.setField}
            onMethodChange={form.setMethodId}
            onSubmit={form.handleSubmit}
          />

          <aside aria-labelledby="checkout-summary-title" className="hidden rounded-ds border border-line bg-surface p-6 lg:sticky lg:top-24 lg:block">
            <h2 id="checkout-summary-title" className="flex items-baseline justify-between gap-3 text-xl text-ink">
              {t("summary.title")}
              <span className="font-sans text-sm font-normal text-muted">{t("summary.items", { count })}</span>
            </h2>
            <OrderSummary lines={lines} totals={totals} />
          </aside>
        </div>

        <div className="sticky bottom-0 z-10 -mx-4 mt-6 flex items-center gap-4 border-t border-line bg-surface px-4 py-3 sm:-mx-6 sm:px-6 lg:hidden">
          <p className="shrink-0">
            <span className="block text-xs text-muted">
              {t("summary.total")} · {t("summary.vatIncluded")}
            </span>
            <span className="font-display text-xl font-semibold tabular-nums text-ink">{formatPrice(totals.total)}</span>
          </p>
          <PayButton methodId={form.methodId} total={totals.total} processing={form.processing} formId={FORM_ID} />
        </div>
      </>
    );
  }

  return (
    <Container className="py-8 sm:py-12">
      <Link
        href={CATALOG_HREF}
        className="-ml-2 inline-flex min-h-11 items-center gap-1 rounded-ds px-2 text-sm font-bold text-link hover:underline"
      >
        <ChevronLeftIcon size={18} />
        {t("back")}
      </Link>
      <div className="mb-8 mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-3xl tracking-tight text-ink sm:text-4xl">{t("title")}</h1>
        <CheckoutSteps current={order ? "confirm" : "payment"} />
      </div>
      {content}
    </Container>
  );
}
