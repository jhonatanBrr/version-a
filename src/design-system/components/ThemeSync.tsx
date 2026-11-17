"use client";

import { useLayoutEffect } from "react";
import { resolveStoredTheme } from "../hooks/useTheme";

/**
 * Re-applies the saved theme whenever the root layout mounts.
 *
 * `[locale]` is the root layout, so switching /it ⇄ /es mounts a new <html>
 * element without `data-theme`, and the inline init script only runs on the
 * first page load. A layout effect runs before paint, so there is no flash.
 */
export function ThemeSync() {
  useLayoutEffect(() => {
    const theme = resolveStoredTheme();
    if (document.documentElement.dataset.theme !== theme) {
      document.documentElement.dataset.theme = theme;
    }
  }, []);

  return null;
}
