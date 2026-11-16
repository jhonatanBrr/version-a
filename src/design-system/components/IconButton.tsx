import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible name; icon-only buttons must always have one. */
  label: string;
  children: ReactNode;
  badge?: number;
}

export function IconButton({ label, children, badge, className, type = "button", ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(
        "relative inline-flex size-11 items-center justify-center rounded-ds text-ink transition-colors hover:bg-soft",
        className,
      )}
      {...props}
    >
      {children}
      {badge !== undefined && badge > 0 && (
        <span
          aria-hidden="true"
          className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-ds bg-primary px-1 text-[11px] font-bold tabular-nums text-on-primary"
        >
          {badge}
        </span>
      )}
    </button>
  );
}
