import type { Variant } from "#/components/Theme/Theme/Theme";

export const variants = {
  // Colors.
  amber: "theme-amber",
  blue: "theme-blue",
  cyan: "theme-cyan",
  emerald: "theme-emerald",
  fuchsia: "theme-fuchsia",
  gray: "theme-gray",
  green: "theme-green",
  indigo: "theme-indigo",
  lime: "theme-lime",
  neutral: "theme-neutral",
  orange: "theme-orange",
  pink: "theme-pink",
  purple: "theme-purple",
  red: "theme-red",
  rose: "theme-rose",
  sky: "theme-sky",
  slate: "theme-slate",
  stone: "theme-stone",
  teal: "theme-teal",
  violet: "theme-violet",
  yellow: "theme-yellow",
  zinc: "theme-zinc",

  // Semantics.
  danger: "theme-red",
  error: "theme-red",
  info: "theme-blue",
  success: "theme-green",
  debug: "theme-purple",
  warning: "theme-orange",
} as Readonly<Record<Variant, `theme-${string}`>>;
