"use client";

import { createContext } from "react";

interface ContextProperties {
  primaryPlaceholder?: string;
}

export const LabelContext = createContext<ContextProperties>({
  primaryPlaceholder: undefined,
});
