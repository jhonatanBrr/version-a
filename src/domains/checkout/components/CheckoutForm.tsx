"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { useTranslations } from "next-intl";
import { TextField } from "@/design-system/components/Field";
import { ShieldIcon } from "@/design-system/components/icons";
import { fieldId } from "../hooks/useCheckoutForm";
import type { CheckoutField } from "../interfaces/checkout";
import type { CheckoutFormProps } from "../interfaces/components";
import { PayButton } from "./PayButton";
import { PaymentMethodPicker } from "./PaymentMethodPicker";

type InputConfig = Pick<InputHTMLAttributes<HTMLInputElement>, "type" | "autoComplete" | "inputMode" | "maxLength">;

/** Input attributes per field (typed constants instead of inline JSX props). */
const FIELD_INPUTS: Record<CheckoutField, InputConfig> = {
  email: { type: "email", autoComplete: "email", inputMode: "email" },
  firstName: { autoComplete: "given-name" },
  lastName: { autoComplete: "family-name" },
  taxId: { autoComplete: "off", maxLength: 16 },
  sdi: { autoComplete: "off" },
  address: { autoComplete: "street-address" },
  postalCode: { autoComplete: "postal-code", inputMode: "numeric", maxLength: 5 },
  city: { autoComplete: "address-level2" },
};

const OPTIONAL: CheckoutField[] = ["sdi"];

function Section({ legend, legendId, children }: { legend: string; legendId?: string; children: ReactNode }) {
  return (
    <fieldset className="rounded-ds border border-line bg-surface p-5 sm:p-6">
      <legend id={legendId} className="float-left mb-4 w-full font-display text-xl font-semibold text-ink">
        {legend}
      </legend>
      <div className="clear-left grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

/** Contact, billing and payment-method sections; validated on submit. */
export function CheckoutForm({
  id,
  values,
  errors,
  methodId,
  processing,
  total,
  onFieldChange,
  onMethodChange,
  onSubmit,
}: CheckoutFormProps) {
  const t = useTranslations("checkout");
  const hasErrors = Object.keys(errors).length > 0;

  const field = (name: CheckoutField, className?: string) => {
    const error = errors[name];
    const optional = OPTIONAL.includes(name);
    return (
      <TextField
        key={name}
        id={fieldId(name)}
        name={name}
        label={t(`form.${name}`)}
        hint={optional ? t("form.optional") : undefined}
        required={!optional}
        value={values[name]}
        onChange={(event) => onFieldChange(name, event.target.value)}
        error={error ? t(`errors.${error}`) : undefined}
        wrapperClassName={className}
        {...FIELD_INPUTS[name]}
      />
    );
  };

  return (
    <form id={id} noValidate onSubmit={onSubmit} aria-label={t("form.label")} className="flex flex-col gap-5">
      <Section legend={t("form.contact")}>{field("email", "sm:col-span-2")}</Section>

      <Section legend={t("form.billing")}>
        {field("firstName")}
        {field("lastName")}
        {field("taxId")}
        {field("sdi")}
        {field("address", "sm:col-span-2")}
        {field("postalCode")}
        {field("city")}
      </Section>

      <fieldset className="rounded-ds border border-line bg-surface p-5 sm:p-6">
        <legend id="checkout-payment-legend" className="float-left mb-4 w-full font-display text-xl font-semibold text-ink">
          {t("form.payment")}
        </legend>
        <div className="clear-left flex flex-col gap-4">
          <PaymentMethodPicker value={methodId} onChange={onMethodChange} total={total} />
          <p className="flex items-start gap-2 text-sm text-muted">
            <ShieldIcon size={18} className="mt-0.5 shrink-0 text-link" />
            {t("form.demoNote")}
          </p>
        </div>
      </fieldset>

      <p aria-live="polite" className="text-sm font-bold text-danger empty:hidden">
        {hasErrors ? t("form.errorSummary") : ""}
      </p>

      <div className="hidden lg:block">
        <PayButton methodId={methodId} total={total} processing={processing} />
      </div>
    </form>
  );
}
