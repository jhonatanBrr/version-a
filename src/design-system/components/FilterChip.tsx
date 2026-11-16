import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

export interface FilterChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
  children: ReactNode;
  count?: number;
  /** "solid" fills the active chip with the primary color; "soft" tints it. */
  appearance?: "solid" | "soft";
  dotColor?: string;
}

/** Toggle chip used for filters; exposes its state with aria-pressed. */
export function FilterChip({
  active,
  children,
  count,
  appearance = "solid",
  dotColor,
  className,
  type = "button",
  ...props
}: FilterChipProps) {
  return (
    <button
      type={type}
      aria-pressed={active}
      className={cn(
        "inline-flex min-h-11 items-center gap-2.5 whitespace-nowrap rounded-ds border px-4 text-sm transition-colors",
        count !== undefined && "pr-2",
        active && appearance === "solid" && "border-primary bg-primary font-semibold text-on-primary shadow-[0_8px_18px_-10px_rgba(27,79,138,.7)]",
        active && appearance === "soft" && "border-link bg-soft font-semibold text-ink",
        !active && "border-line bg-surface text-ink hover:border-line-strong hover:bg-soft-2",
        className,
      )}
      {...props}
    >
      {dotColor && <span aria-hidden="true" className="size-2 rounded-full" style={{ backgroundColor: dotColor }} />}
      {children}
      {count !== undefined && (
        <span
          className={cn(
            "inline-flex h-[26px] min-w-[26px] items-center justify-center rounded-ds px-2 text-xs font-bold tabular-nums",
            active && appearance === "solid" ? "bg-white/20 text-on-primary" : "bg-soft text-link",
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
