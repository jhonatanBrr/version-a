"use client";

import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/shared/i18n/navigation";
import { routing, type AppLocale } from "@/shared/i18n/routing";
import { cn } from "../utils/cn";

export interface LanguageSwitchProps {
  label: string;
  names: Record<AppLocale, string>;
  compact?: boolean;
  className?: string;
}

/** IT / ES segmented switch; keeps the current path and query. */
export function LanguageSwitch({ label, names, compact, className }: LanguageSwitchProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      role="group"
      aria-label={label}
      className={cn("inline-flex gap-0.5 rounded-ds border border-line bg-surface p-[3px]", isPending && "opacity-70", className)}
    >
      {routing.locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            title={names[code]}
            aria-pressed={active}
            onClick={() => {
              if (active) return;
              const query = Object.fromEntries(searchParams.entries());
              startTransition(() => router.replace({ pathname, query }, { locale: code, scroll: false }));
            }}
            className={cn(
              "rounded-ds font-bold uppercase tracking-wide transition-colors",
              compact ? "h-7 min-w-[34px] px-1.5 text-xs" : "h-9 min-w-10 px-2 text-[13px]",
              active ? "bg-primary text-on-primary" : "text-muted hover:text-ink",
            )}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
