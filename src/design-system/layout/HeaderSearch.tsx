"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { usePathname, useRouter } from "@/shared/i18n/navigation";
import { SearchIcon } from "../components/icons";
import { cn } from "../utils/cn";

/** Query-string key the home catalog reads to filter products by name. */
export const SEARCH_PARAM = "q";

export interface HeaderSearchProps {
  id: string;
  label: string;
  placeholder: string;
  className?: string;
}

/**
 * Global product search. On the home page it filters the grid live through
 * the `q` query param; elsewhere, submitting takes the user to the catalog.
 */
export function HeaderSearch({ id, label, placeholder, className }: HeaderSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get(SEARCH_PARAM) ?? "";
  const [value, setValue] = useState(urlQuery);
  const onHome = pathname === "/";

  const [syncedQuery, setSyncedQuery] = useState(urlQuery);

  // Follow external URL changes (back button, links) without fighting the user's typing.
  if (urlQuery !== syncedQuery) {
    setSyncedQuery(urlQuery);
    if (urlQuery !== value.trim()) setValue(urlQuery);
  }

  const go = (query: string, live: boolean) => {
    const trimmed = query.trim();
    const search = trimmed ? `?${SEARCH_PARAM}=${encodeURIComponent(trimmed)}` : "";
    if (live) router.replace(`/${search}`, { scroll: false });
    else router.push(`/${search}#catalogo`);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    go(value, false);
  };

  return (
    <form role="search" onSubmit={onSubmit} className={cn("relative", className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <SearchIcon size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
      <input
        id={id}
        type="search"
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(event) => {
          setValue(event.target.value);
          if (onHome) go(event.target.value, true);
        }}
        className="h-12 w-full rounded-ds border border-line bg-surface pl-10 pr-3 text-[15px] text-ink placeholder:text-muted focus:border-link focus:outline-none focus:ring-4 focus:ring-accent/20"
      />
    </form>
  );
}
