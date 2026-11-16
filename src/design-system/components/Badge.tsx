import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export type BadgeTone = "neutral" | "brand" | "solid" | "inverse";

const tones: Record<BadgeTone, string> = {
  neutral: "bg-surface/95 text-ink shadow-sm",
  brand: "bg-soft text-link",
  solid: "bg-primary text-on-primary",
  inverse: "bg-strong text-white",
};

export interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  /** Optional color dot (any CSS color) to tell variants apart. */
  dotColor?: string;
  className?: string;
}

export function Badge({ children, tone = "neutral", dotColor, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-ds px-2.5 py-1 text-xs font-bold",
        tones[tone],
        className,
      )}
    >
      {dotColor && (
        <span aria-hidden="true" className="size-2 rounded-full" style={{ backgroundColor: dotColor }} />
      )}
      {children}
    </span>
  );
}
