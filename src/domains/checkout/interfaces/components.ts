import type { FormEvent } from "react";
import type { ResolvedCartLine } from "@/shared/cart/CartProvider";
import type {
  CheckoutErrors,
  CheckoutField,
  CheckoutValues,
  ConfirmedOrder,
  OrderTotals,
  PaymentMethodId,
} from "./checkout";

export type CheckoutStep = "cart" | "payment" | "confirm";

export interface CheckoutStepsProps {
  current: CheckoutStep;
}

export interface QuantityStepperProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  labels: { value: string; decrease: string; increase: string };
}

export interface OrderLineItemProps {
  line: ResolvedCartLine;
}

export interface OrderSummaryProps {
  lines: ResolvedCartLine[];
  totals: OrderTotals;
}

export interface SummaryTotalsProps {
  totals: OrderTotals;
}

export interface PaymentMethodPickerProps {
  value: PaymentMethodId;
  onChange: (id: PaymentMethodId) => void;
  total: number;
}

export interface PayButtonProps {
  methodId: PaymentMethodId;
  total: number;
  processing: boolean;
  /** Id of the form to submit when the button is rendered outside it. */
  formId?: string;
  className?: string;
}

export interface CheckoutFormProps {
  id: string;
  values: CheckoutValues;
  errors: CheckoutErrors;
  methodId: PaymentMethodId;
  processing: boolean;
  total: number;
  onFieldChange: (field: CheckoutField, value: string) => void;
  onMethodChange: (id: PaymentMethodId) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export interface ConfirmationPanelProps {
  order: ConfirmedOrder;
}
