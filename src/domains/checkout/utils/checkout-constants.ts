import type { PaymentLogo, PaymentMethod, PaymentMethodId } from "../interfaces/checkout";

const logo = (file: string, alt: string): PaymentLogo => ({ src: `/payment/${file}.svg`, alt });

/** Payment options offered in the demo checkout (no gateway is called). */
export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "card",
    logos: [logo("visa", "Visa"), logo("mastercard", "Mastercard"), logo("americanexpress", "American Express")],
  },
  { id: "paypal", logos: [logo("paypal", "PayPal")] },
  { id: "wallet", logos: [logo("applepay", "Apple Pay"), logo("googlepay", "Google Pay")] },
  { id: "transfer", logos: [] },
  { id: "installments", logos: [], installments: true },
  { id: "docente", logos: [] },
];

export const DEFAULT_PAYMENT_METHOD: PaymentMethodId = "card";

export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 20;

/** Home page anchor of the product catalog. */
export const CATALOG_HREF = "/#catalogo";

/** Simulated processing time of the fake payment. */
export const PROCESSING_DELAY_MS = 800;
