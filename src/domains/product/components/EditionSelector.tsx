"use client";

import { useId } from "react";
import { cn } from "@/design-system/utils/cn";
import { formatPrice } from "@/design-system/utils/format-price";
import type { BuyBoxEdition } from "../interfaces/product-page";

export interface EditionSelectorProps {
  legend: string;
  editions: BuyBoxEdition[];
  value: string;
  onChange: (editionId: string) => void;
}

/** Native radio group styled as cards: arrow keys and labels come for free. */
export function EditionSelector({ legend, editions, value, onChange }: EditionSelectorProps) {
  const name = useId();
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-sm font-bold">{legend}</legend>
      {editions.map((edition) => {
        const checked = edition.id === value;
        return (
          <label
            key={edition.id}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-ds border p-3 transition-colors",
              "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus",
              checked ? "border-primary bg-soft" : "border-line bg-surface hover:border-line-strong",
            )}
          >
            <input
              type="radio"
              name={name}
              value={edition.id}
              checked={checked}
              onChange={() => onChange(edition.id)}
              className="mt-1 size-4 shrink-0 accent-primary focus-visible:outline-none"
            />
            <span className="flex flex-1 flex-col">
              <span className="font-bold">{edition.label}</span>
              <span className="text-sm text-muted">{edition.detail}</span>
            </span>
            <span className="font-semibold tabular-nums">{formatPrice(edition.salePrice)}</span>
          </label>
        );
      })}
    </fieldset>
  );
}
