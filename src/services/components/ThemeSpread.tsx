import type { ReactNode } from "react";

import { Theme } from "#/components/Theme/Theme/Theme";
import { variants } from "#/supports/ThemeSupport";

interface Properties {
  children(this: void, variant: string): ReactNode;
}

export function ThemeSpread({ children }: Properties) {
  return Object.keys(variants).map((variant) => (
    <Theme key={variant} variant={variant}>
      {children(variant)}
    </Theme>
  ));
}
