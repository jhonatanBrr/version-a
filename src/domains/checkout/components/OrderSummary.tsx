import type { OrderSummaryProps } from "../interfaces/components";
import { OrderLineItem } from "./OrderLineItem";
import { SummaryTotals } from "./SummaryTotals";

/** Editable list of cart lines followed by the order totals. */
export function OrderSummary({ lines, totals }: OrderSummaryProps) {
  return (
    <div>
      <ul className="divide-y divide-line">
        {lines.map((line) => (
          <OrderLineItem key={`${line.productId}:${line.editionId}`} line={line} />
        ))}
      </ul>
      <SummaryTotals totals={totals} />
    </div>
  );
}
