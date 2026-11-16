import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { cn } from "../utils/cn";

const controlClasses =
  "w-full min-h-12 rounded-ds border bg-surface px-3.5 py-3 text-base text-ink transition-[border-color,box-shadow] placeholder:text-muted focus:border-link focus:outline-none focus:ring-4 focus:ring-accent/20";

interface FieldShellProps {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  className?: string;
  children: ReactNode;
}

function FieldShell({ id, label, error, hint, className, children }: FieldShellProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-bold">
        {label}
        {hint && <span className="ml-1 font-normal text-muted">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-[13px] font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  wrapperClassName?: string;
}

export function TextField({ id, label, error, hint, wrapperClassName, className, ...props }: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} className={wrapperClassName}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(controlClasses, error ? "border-danger" : "border-line", className)}
        {...props}
      />
    </FieldShell>
  );
}

export interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  error?: string;
  wrapperClassName?: string;
}

export function TextAreaField({ id, label, error, wrapperClassName, className, ...props }: TextAreaFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} className={wrapperClassName}>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(controlClasses, "resize-y", error ? "border-danger" : "border-line", className)}
        {...props}
      />
    </FieldShell>
  );
}
