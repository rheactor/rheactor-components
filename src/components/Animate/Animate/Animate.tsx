"use client";

import { twMerge } from "@rheactor/rheactor-core";
import { useEffect, useMemo, useRef } from "react";
import type { CSSProperties, PropsWithChildren, ReactNode } from "react";

import type { Threshold } from "#/services/hooks/useInViewport";
import { useInViewport } from "#/services/hooks/useInViewport";

interface Properties extends PropsWithChildren {
  /**
   * Effect to apply.
   *
   * Defaults to none (respects `fadeEffect`).
   */
  effect?:
    | "fade"
    | "none"
    | "slideDown"
    | "slideLeft"
    | "slideRight"
    | "slideUp"
    | "zoomIn"
    | "zoomOut";

  /**
   * Animation duration.
   *
   * Defaults to `400` (0.4s).
   */
  duration?: number;

  /**
   * Animation distance.
   *
   * Defaults to `50%`.
   */
  distance?: string;

  /**
   * Animation easing.
   *
   * Defaults to `easeInOut`.
   */
  easing?: "ease-in-out" | "ease-in" | "ease-out" | "ease" | "linear";

  /**
   * Whether to apply the animation always.
   *
   * Defaults to `false`.
   */
  always?: boolean;

  /**
   * Animation threshold.
   *
   * Defaults to `25px`.
   */
  threshold?: Threshold;

  /** Container class name. */
  className?: string;

  /** Container children. */
  children?: ReactNode;

  /** Callback fired when the animation starts. */
  onAnimate?(this: void): void;
}

const effects: Record<NonNullable<Properties["effect"]>, string> = {
  none: "",
  fade: "",
  slideDown: "not-data-animated:*:-translate-y-(--translate-distance)",
  slideLeft: "not-data-animated:*:translate-x-(--translate-distance)",
  slideRight: "not-data-animated:*:-translate-x-(--translate-distance)",
  slideUp: "not-data-animated:*:translate-y-(--translate-distance)",
  zoomIn: "not-data-animated:*:scale-50",
  zoomOut: "not-data-animated:*:scale-125",
} as const;

export function Animate({
  effect = "fade",
  duration = 400,
  distance = "50%",
  easing = "ease-out",
  always = false,
  threshold,
  className,
  children,
  onAnimate,
}: Properties) {
  const animateReference = useRef<HTMLDivElement>(null);

  const style = useMemo(
    () =>
      ({
        "--animate-duration": `${duration}ms`,
        "--animate-easing": easing,
        "--translate-distance": distance,
      }) as CSSProperties,
    [duration, easing, distance],
  );

  const { ref, visible, disconnect } = useInViewport(threshold, true);

  useEffect(() => {
    ref(animateReference.current?.firstElementChild);
  }, [ref]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    onAnimate?.();

    if (!always) {
      disconnect();
    }
  }, [always, disconnect, onAnimate, visible]);

  return (
    <div
      ref={animateReference}
      data-component="Animate"
      data-animated={visible || undefined}
      className={twMerge(
        "contents *:transition *:duration-(--animate-duration) *:ease-(--animate-easing)",
        effect !== "none" && "not-data-animated:*:opacity-0",
        effects[effect],
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
