"use client";

import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

export function useLocalStorage<T>(
  key: string,
  defaultValue?: undefined,
): readonly [T | undefined, Dispatch<SetStateAction<T>>];

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
): readonly [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const stored = localStorage.getItem(key);

    if (stored !== null) {
      // oxlint-disable-next-line react/set-state-in-effect
      setValue(JSON.parse(stored) as T);
    }
  }, [key]);

  useEffect(() => {
    if (value === undefined || value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue] as const;
}
