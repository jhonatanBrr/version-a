/** Values typed by the buyer in the checkout form. */
export interface CheckoutValues {
  email: string;
  firstName: string;
  lastName: string;
  taxId: string;
  sdi: string;
  address: string;
  postalCode: string;
  city: string;
}

export type CheckoutField = keyof CheckoutValues;

/** Error codes, translated in the UI under `checkout.errors.*`. */
export type CheckoutErrorCode = "required" | "email" | "minLength" | "taxId" | "postalCode";

export type CheckoutErrors = Partial<Record<CheckoutField, CheckoutErrorCode>>;

export type PaymentMethodId = "card" | "paypal" | "wallet" | "transfer" | "installments" | "docente";

export interface PaymentLogo {
  src: string;
  alt: string;
}

export interface PaymentMethod {
  id: PaymentMethodId;
  logos: PaymentLogo[];
  /** Shows the "3 rate senza interessi" badge and the computed installment. */
  installments?: boolean;
}

/** Monetary breakdown of the order. */
export interface OrderTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

/** Minimal shape of a priced cart line needed to compute totals. */
export interface PricedLine {
  lineTotal: number;
  lineListTotal: number;
}

export interface ConfirmedOrderLine {
  key: string;
  name: string;
  editionLabel: string;
  quantity: number;
  lineTotal: number;
}

/** Snapshot taken at submit time, shown once the cart is cleared. */
export interface ConfirmedOrder {
  orderNumber: string;
  email: string;
  methodId: PaymentMethodId;
  lines: ConfirmedOrderLine[];
  total: number;
}
