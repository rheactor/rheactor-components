import { Threshold } from "../../../services/hooks/useInViewport.js";
import { PropsWithChildren, ReactNode } from "react";
//#region src/components/Animate/Animate/Animate.d.ts
interface Properties extends PropsWithChildren {
  /**
   * Effect to apply.
   *
   * Defaults to none (respects `fadeEffect`).
   */
  effect?: "fade" | "none" | "slideDown" | "slideLeft" | "slideRight" | "slideUp" | "zoomIn" | "zoomOut";
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
declare function Animate({ effect, duration, distance, easing, always, threshold, className, children, onAnimate }: Properties): import("react").JSX.Element;
//#endregion
export { Animate };