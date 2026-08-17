//#region src/services/AnimateService.d.ts
type EasingFunction = (time: number) => number;
declare const easings: {
  linear: (input: number) => number;
  "ease-in": (input: number) => number;
  "ease-out": (input: number) => number;
  "ease-in-out": (input: number) => number;
  ease: (input: number) => number;
};
type Easing = EasingFunction | keyof typeof easings;
//#endregion
//#region src/components/Surface/Counter/Counter.d.ts
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
declare function Counter({ from, to, thousandSeparator, decimalSeparator, decimals, duration, easing, className }: Properties): import("react").JSX.Element;
//#endregion
export { Counter as t };