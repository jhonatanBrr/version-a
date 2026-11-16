import type { CheckoutErrors, CheckoutField, CheckoutValues } from "../interfaces/checkout";

export const emptyCheckoutValues: CheckoutValues = {
  email: "",
  firstName: "",
  lastName: "",
  taxId: "",
  sdi: "",
  address: "",
  postalCode: "",
  city: "",
};

/** Order in which fields appear in the form (used to focus the first error). */
export const CHECKOUT_FIELDS: CheckoutField[] = [
  "email",
  "firstName",
  "lastName",
  "taxId",
  "sdi",
  "address",
  "postalCode",
  "city",
];

const REQUIRED: CheckoutField[] = ["email", "firstName", "lastName", "taxId", "address", "postalCode", "city"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CODICE_FISCALE = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i;
const PARTITA_IVA = /^\d{11}$/;
const CAP = /^\d{5}$/;
const MIN_NAME_LENGTH = 2;

/** Accepts an Italian codice fiscale (16 chars) or a Partita IVA (11 digits). */
export function isTaxId(value: string): boolean {
  const v = value.trim();
  return CODICE_FISCALE.test(v) || PARTITA_IVA.test(v);
}

/** Validates the checkout form; returns one error code per invalid field. */
export function validateCheckout(input: CheckoutValues): CheckoutErrors {
  const values = Object.fromEntries(
    Object.entries(input).map(([key, value]) => [key, value.trim()]),
  ) as unknown as CheckoutValues;
  const errors: CheckoutErrors = {};

  for (const field of REQUIRED) {
    if (!values[field]) errors[field] = "required";
  }

  if (!errors.email && !EMAIL.test(values.email)) errors.email = "email";
  if (!errors.firstName && values.firstName.length < MIN_NAME_LENGTH) errors.firstName = "minLength";
  if (!errors.lastName && values.lastName.length < MIN_NAME_LENGTH) errors.lastName = "minLength";
  if (!errors.taxId && !isTaxId(values.taxId)) errors.taxId = "taxId";
  if (!errors.postalCode && !CAP.test(values.postalCode)) errors.postalCode = "postalCode";

  return errors;
}
