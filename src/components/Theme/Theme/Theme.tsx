import { twMerge } from "@rheactor/rheactor-core";
import type { PropsWithChildren, ReactNode } from "react";

import { variants } from "#/supports/ThemeSupport";

interface Properties extends PropsWithChildren {
  /** The variant of the theme. */
  variant: Variant | (string & {});

  /** The content. */
  children: ReactNode;
}

export type Variant =
  | VariantSemantic
  | "amber"
  | "blue"
  | "cyan"
  | "emerald"
  | "fuchsia"
  | "gray"
  | "green"
  | "indigo"
  | "lime"
  | "neutral"
  | "orange"
  | "pink"
  | "purple"
  | "red"
  | "rose"
  | "sky"
  | "slate"
  | "stone"
  | "teal"
  | "violet"
  | "yellow"
  | "zinc";

type VariantSemantic = "danger" | "debug" | "error" | "info" | "success" | "warning";

function isBuildInVariant(variant: string): variant is Variant {
  return Object.hasOwn(variants, variant);
}

/** A utility component to change the color of any element based on a variant as theme. */
export function Theme({ variant, children }: Properties) {
  return (
    <div
      data-component="Theme"
      className={twMerge(
        "contents",
        isBuildInVariant(variant) ? variants[variant] : `theme-${variant}`,
      )}
    >
      {children}
    </div>
  );
}
