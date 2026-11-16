"use client";

import { useTranslations } from "next-intl";
import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/design-system/components/Button";
import { TextAreaField, TextField } from "@/design-system/components/Field";
import { CheckIcon } from "@/design-system/components/icons";
import type { ContactErrors, ContactField, ContactValues } from "../interfaces/contact";
import { hasErrors, validateContact } from "../utils/validate-contact";

const EMPTY: ContactValues = { name: "", email: "", message: "" };
const FIELD_IDS: Record<ContactField, string> = {
  name: "contact-name",
  email: "contact-email",
  message: "contact-message",
};
const FIELD_ORDER: ContactField[] = ["name", "email", "message"];

function focusField(field: ContactField) {
  document.getElementById(FIELD_IDS[field])?.focus();
}

/** Contact form validated on submit; no backend, success is shown locally. */
export function ContactForm() {
  const t = useTranslations("home.contact");
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sent, setSent] = useState<ContactValues | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const update = (field: ContactField) => (event: { target: { value: string } }) => {
    const value = event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    // Once a field has an error, re-check it while typing so the message clears as soon as it is fixed.
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        const fieldError = validateContact({ ...values, [field]: value })[field];
        if (fieldError) next[field] = fieldError;
        else delete next[field];
        return next;
      });
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
      if (firstInvalid) focusField(firstInvalid);
      return;
    }
    setSent({ name: values.name.trim(), email: values.email.trim(), message: values.message.trim() });
    setValues(EMPTY);
    requestAnimationFrame(() => successRef.current?.focus());
  };

  const reset = () => {
    setSent(null);
    setErrors({});
    requestAnimationFrame(() => focusField("name"));
  };

  const errorText = (field: ContactField) => {
    const code = errors[field];
    return code ? t(`errors.${code}`) : undefined;
  };

  if (sent) {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className="flex flex-col items-start gap-4 rounded-ds border border-line bg-surface p-6 sm:p-8"
      >
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary text-on-primary">
          <CheckIcon size={24} />
        </span>
        <h3 className="font-display text-2xl tracking-tight">{t("successTitle")}</h3>
        <p className="text-muted">{t("successText", { name: sent.name, email: sent.email })}</p>
        <Button variant="outline" onClick={reset}>
          {t("sendAnother")}
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      aria-label={t("formLabel")}
      onSubmit={onSubmit}
      className="flex flex-col gap-5 rounded-ds border border-line bg-surface p-6 sm:p-8"
    >
      <TextField
        id={FIELD_IDS.name}
        name="name"
        autoComplete="name"
        required
        aria-required="true"
        label={t("name")}
        hint={t("required")}
        placeholder={t("namePlaceholder")}
        value={values.name}
        onChange={update("name")}
        error={errorText("name")}
      />
      <TextField
        id={FIELD_IDS.email}
        name="email"
        type="email"
        autoComplete="email"
        required
        aria-required="true"
        label={t("email")}
        hint={t("required")}
        placeholder={t("emailPlaceholder")}
        value={values.email}
        onChange={update("email")}
        error={errorText("email")}
      />
      <TextAreaField
        id={FIELD_IDS.message}
        name="message"
        required
        aria-required="true"
        rows={5}
        label={`${t("message")} ${t("required")}`}
        placeholder={t("messagePlaceholder")}
        value={values.message}
        onChange={update("message")}
        error={errorText("message")}
      />
      <Button type="submit" size="lg" className="self-start">
        {t("submit")}
      </Button>
    </form>
  );
}
