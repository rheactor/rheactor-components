"use client";

import { formatNumber } from "@rheactor/rheactor-core";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";

import type { Easing } from "#/services/AnimateService";
import { animate } from "#/services/AnimateService";
import { useInViewport } from "#/services/hooks/useInViewport";

interface Properties {
  /**
   * Initial value.
   *
   * Defaults to `0`.
   */
  from?: number;

  /** Final value. */
  to: number;

  /** Thousand separator. Defaults to none. */
  thousandSeparator?: string;

  /** Decimal separator. Defaults to `.` */
  decimalSeparator?: string;

  /**
   * Number of decimals.
   *
   * Defaults to `0`.
   */
  decimals?: number;

  /**
   * Animation duration.
   *
   * Defaults to `1000`.
   */
  duration?: number;

  /**
   * Easing function.
   *
   * Defaults to `"ease-in-out"`.
   */
  easing?: Easing;

  /** Class name. */
  className?: string;
}

export function Counter({
  from = 0,
  to,
  thousandSeparator = "",
  decimalSeparator = ".",
  decimals = 0,
  duration = 1000,
  easing,
  className,
}: Properties) {
  const { ref, visible, disconnect } = useInViewport(0.25);

  const [progress, setProgress] = useState(0);

  const style = useMemo(() => ({ "--progress": progress }) as CSSProperties, [progress]);

  const value = useMemo(
    () =>
      formatNumber(from + (to - from) * progress, decimals, decimalSeparator, thousandSeparator),
    [decimalSeparator, decimals, from, progress, thousandSeparator, to],
  );

  useEffect(() => {
    if (!visible) {
      return;
    }

    disconnect();
    animate(duration, setProgress, easing);
  }, [disconnect, duration, easing, visible]);

  return (
    <div ref={ref} data-component="Counter" className={className} style={style}>
      {value}
    </div>
  );
}
