"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/design-system/components/Button";
import { CheckIcon } from "@/design-system/components/icons";
import { formatPrice } from "@/design-system/utils/format-price";
import type { ConfirmationPanelProps } from "../interfaces/components";
import { CATALOG_HREF } from "../utils/checkout-constants";

/** Success state shown after the simulated payment; focus moves to its heading. */
export function ConfirmationPanel({ order }: ConfirmationPanelProps) {
  const t = useTranslations("checkout");
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section role="status" aria-labelledby="checkout-confirmation-title" className="mx-auto flex max-w-2xl flex-col gap-6 rounded-ds border border-line bg-surface p-6 sm:p-10">
      <span aria-hidden="true" className="flex size-14 items-center justify-center rounded-full bg-primary text-on-primary">
        <CheckIcon size={28} />
      </span>
      <div className="flex flex-col gap-2">
        <h2
          id="checkout-confirmation-title"
          ref={headingRef}
          tabIndex={-1}
          className="font-display text-3xl font-semibold tracking-tight text-ink focus:outline-none"
        >
          {t("confirmation.title")}
        </h2>
        <p className="text-muted">{t("confirmation.email", { email: order.email })}</p>
      </div>

      <dl className="grid gap-4 rounded-ds bg-soft p-5 sm:grid-cols-2">
        <div>
          <dt className="text-sm text-muted">{t("confirmation.orderNumber")}</dt>
          <dd className="font-display text-xl font-semibold tabular-nums text-ink">{order.orderNumber}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted">{t("confirmation.method")}</dt>
          <dd className="font-bold text-ink">{t(`methods.${order.methodId}.label`)}</dd>
        </div>
      </dl>

      <div>
        <h3 className="mb-2 text-lg text-ink">{t("confirmation.items")}</h3>
        <ul className="divide-y divide-line border-y border-line">
          {order.lines.map((line) => (
            <li key={line.key} className="flex justify-between gap-4 py-3 text-[15px]">
              <span className="min-w-0">
                <span className="font-bold text-ink">{line.name}</span>
                <span className="block text-sm text-muted">
                  {line.editionLabel} · ×{line.quantity}
                </span>
              </span>
              <span className="shrink-0 font-bold tabular-nums">{formatPrice(line.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 flex justify-between gap-4 font-bold text-ink">
          <span>{t("confirmation.total")}</span>
          <span className="tabular-nums">{formatPrice(order.total)}</span>
        </p>
      </div>

      <p className="text-sm text-muted">{t("confirmation.demo")}</p>
      <ButtonLink href={CATALOG_HREF} className="self-start">
        {t("confirmation.back")}
      </ButtonLink>
    </section>
  );
}
