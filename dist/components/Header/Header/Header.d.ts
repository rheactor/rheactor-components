import { PropsWithChildren, ReactNode } from "react";
//#region src/components/Header/Header/Header.d.ts
interface Properties extends PropsWithChildren {
  /**
   * Defines the header positioning behavior.
   *
   * - `static`: positioned according to normal document flow, no special behavior.
   * - `relative`: follows normal flow, supports z-index, not sticky or fixed.
   * - `absolute`: removed from flow, positioned relative to nearest positioned ancestor.
   * - `fixed`: fixed to top of viewport, overlays content, removed from flow.
   * - `sticky`: sticks to top during scroll, retains space in layout, only works in scrollable
   *   containers.
   *
   * Elements with `relative` or `absolute` will never trigger `stuck:` state.
   *
   * Default is `relative`.
   */
  position?: "absolute" | "fixed" | "relative" | "static" | "sticky";
  /**
   * Detect stick after this position.
   *
   * Defaults to `0`.
   */
  stickAfter?: number;
  /** Custom class name. */
  className?: string;
  /** Content of the header. */
  children?: ReactNode;
}
declare function Header({ position, stickAfter, className, children }: Properties): import("react").JSX.Element;
//#endregion
export { Header };