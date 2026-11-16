"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Boolean that turns itself off after `durationMs` (e.g. "added" feedback). */
export function useTransientFlag(durationMs = 2000): [boolean, () => void] {
  const [active, setActive] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const trigger = useCallback(() => {
    clearTimeout(timer.current);
    setActive(true);
    timer.current = setTimeout(() => setActive(false), durationMs);
  }, [durationMs]);

  useEffect(() => () => clearTimeout(timer.current), []);

  return [active, trigger];
}
