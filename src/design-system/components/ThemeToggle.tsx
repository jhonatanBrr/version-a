"use client";

import { useTheme } from "../hooks/useTheme";
import { cn } from "../utils/cn";
import { MoonIcon, SunIcon } from "./icons";

export interface ThemeToggleProps {
  labels: { toDark: string; toLight: string };
  className?: string;
}

/** Sun/moon button; the icons swap with a rotation and the page reveals in a circle. */
export function ThemeToggle({ labels, className }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? labels.toLight : labels.toDark}
      aria-pressed={isDark}
      onClick={(event) => {
        const fromKeyboard = event.detail === 0;
        toggle(fromKeyboard ? undefined : { x: event.clientX, y: event.clientY });
      }}
      className={cn(
        "relative inline-flex size-11 items-center justify-center overflow-hidden rounded-ds text-ink transition-colors hover:bg-soft",
        className,
      )}
    >
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none",
          isDark ? "-translate-y-full rotate-90 opacity-0" : "translate-y-0 opacity-100",
        )}
      >
        <MoonIcon size={22} />
      </span>
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none",
          isDark ? "translate-y-0 opacity-100" : "translate-y-full -rotate-90 opacity-0",
        )}
      >
        <SunIcon size={22} />
      </span>
    </button>
  );
}
