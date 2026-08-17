"use client";

import { createContext, useMemo, useState } from "react";
import type { Dispatch, PropsWithChildren, SetStateAction } from "react";

interface ContextProperties {
  focused?: boolean;
  setFocused?: Dispatch<SetStateAction<boolean>>;
}

// oxlint-disable-next-line react/only-export-components
export const FormContext = createContext<ContextProperties>({});

export function FormProvider({ children }: PropsWithChildren) {
  const [focused, setFocused] = useState(false);

  const value = useMemo(() => ({ focused, setFocused }), [focused]);

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}
