export interface ContactValues {
  name: string;
  email: string;
  message: string;
}

export type ContactField = keyof ContactValues;

/** Message keys under `home.contact.errors`, so the copy stays in the i18n files. */
export type ContactErrorCode =
  | "nameRequired"
  | "nameTooShort"
  | "emailRequired"
  | "emailInvalid"
  | "messageRequired"
  | "messageTooShort";

export type ContactErrors = Partial<Record<ContactField, ContactErrorCode>>;
