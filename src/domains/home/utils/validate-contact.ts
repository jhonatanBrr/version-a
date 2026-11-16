import type { ContactErrors, ContactValues } from "../interfaces/contact";

export const NAME_MIN_LENGTH = 2;
export const MESSAGE_MIN_LENGTH = 10;

/** Pragmatic format check: something@domain.tld with no spaces. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Validates the contact form; values are trimmed first. Returns only the failing fields. */
export function validateContact(values: ContactValues): ContactErrors {
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();
  const errors: ContactErrors = {};

  if (!name) errors.name = "nameRequired";
  else if (name.length < NAME_MIN_LENGTH) errors.name = "nameTooShort";

  if (!email) errors.email = "emailRequired";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "emailInvalid";

  if (!message) errors.message = "messageRequired";
  else if (message.length < MESSAGE_MIN_LENGTH) errors.message = "messageTooShort";

  return errors;
}

export function hasErrors(errors: ContactErrors): boolean {
  return Object.keys(errors).length > 0;
}
