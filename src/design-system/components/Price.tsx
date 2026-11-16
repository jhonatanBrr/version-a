import { formatPrice } from "../utils/format-price";
import { cn } from "../utils/cn";

export interface PriceProps {
  /** Final (discounted) price. */
  amount: number;
  /** Original price, shown struck through when higher than `amount`. */
  originalAmount?: number;
  size?: "sm" | "md" | "lg";
  /** Visually hidden labels for screen readers. */
  labels: { current: string; original: string };
  className?: string;
}

const sizes = {
  sm: "text-base",
  md: "text-[22px]",
  lg: "text-[34px] font-display",
};

export function Price({ amount, originalAmount, size = "md", labels, className }: PriceProps) {
  const hasDiscount = originalAmount !== undefined && originalAmount > amount;
  return (
    <span className={cn("inline-flex flex-wrap items-baseline gap-x-2.5 gap-y-1", className)}>
      <span className={cn("font-semibold tabular-nums tracking-tight", sizes[size])}>
        <span className="sr-only">{labels.current} </span>
        {formatPrice(amount)}
      </span>
      {hasDiscount && (
        <s className="text-sm tabular-nums text-muted">
          <span className="sr-only">{labels.original} </span>
          {formatPrice(originalAmount)}
        </s>
      )}
    </span>
  );
}
