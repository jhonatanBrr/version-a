import type { ButtonHTMLAttributes, ComponentProps } from "react";
import { Link } from "@/shared/i18n/navigation";
import { cn } from "../utils/cn";

export type ButtonVariant = "primary" | "outline" | "soft" | "ghost";
export type ButtonSize = "md" | "lg";

interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover",
  outline: "border border-primary bg-surface text-link hover:bg-soft",
  soft: "bg-soft text-link hover:bg-soft-hover",
  ghost: "text-ink hover:bg-soft",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-[15px]",
  lg: "min-h-14 px-7 text-[17px]",
};

/** Shared class builder so buttons and links look identical. */
export function buttonClasses({
  variant = "primary",
  size = "md",
  fullWidth = false,
}: ButtonStyleProps = {}): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-ds font-bold transition-colors",
    "disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
  );
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyleProps;

export function Button({ variant, size, fullWidth, className, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonClasses({ variant, size, fullWidth }), className)}
      {...props}
    />
  );
}

export type ButtonLinkProps = ComponentProps<typeof Link> & ButtonStyleProps;

/** Locale-aware link styled as a button. */
export function ButtonLink({ variant, size, fullWidth, className, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonClasses({ variant, size, fullWidth }), className)} {...props} />;
}
