"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import type { CheckoutErrors, CheckoutField, CheckoutValues, PaymentMethodId } from "../interfaces/checkout";
import { DEFAULT_PAYMENT_METHOD, PROCESSING_DELAY_MS } from "../utils/checkout-constants";
import { CHECKOUT_FIELDS, emptyCheckoutValues, validateCheckout } from "../utils/validate-checkout";

export const fieldId = (field: CheckoutField) => `checkout-${field}`;

interface UseCheckoutFormOptions {
  /** Called once the simulated payment finished with the submitted values. */
  onSuccess: (values: CheckoutValues, methodId: PaymentMethodId, submittedAt: number) => void;
}

/** Form state, submit-time validation and the fake payment processing delay. */
export function useCheckoutForm({ onSuccess }: UseCheckoutFormOptions) {
  const [values, setValues] = useState<CheckoutValues>(emptyCheckoutValues);
  const [submitted, setSubmitted] = useState(false);
  const [methodId, setMethodId] = useState<PaymentMethodId>(DEFAULT_PAYMENT_METHOD);
  const [processing, setProcessing] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  // Validation starts on the first submit; afterwards errors update live so fixed fields clear.
  const errors = useMemo<CheckoutErrors>(() => (submitted ? validateCheckout(values) : {}), [submitted, values]);

  const setField = useCallback((field: CheckoutField, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (processing) return;
      const found = validateCheckout(values);
      setSubmitted(true);
      const firstInvalid = CHECKOUT_FIELDS.find((field) => found[field]);
      if (firstInvalid) {
        document.getElementById(fieldId(firstInvalid))?.focus();
        return;
      }
      const submittedAt = Date.now();
      setProcessing(true);
      timer.current = setTimeout(() => {
        setProcessing(false);
        onSuccess(values, methodId, submittedAt);
      }, PROCESSING_DELAY_MS);
    },
    [processing, values, methodId, onSuccess],
  );

  return { values, errors, methodId, processing, setField, setMethodId, handleSubmit };
}
