import { ReactNode } from "react";
//#region src/components/Surface/FlipCard/FlipCard.d.ts
interface Properties {
  /** The container class name. */
  className?: string;
  /**
   * The direction-to of the flip.
   *
   * Defaults to `right`.
   */
  flipTo?: "left" | "right";
  /**
   * The axis of the flip.
   *
   * Defaults to `horizontal`.
   */
  axis?: "horizontal" | "vertical";
  /** The content of the front of the flip card. */
  contentFront: ReactNode;
  /** The content of the back of the flip card. */
  contentBack: ReactNode;
  heightController?: "back" | "front";
  /** The class name of the touch icon. */
  touchIconClassName?: string;
  /** The callback when the user flips the card. */
  onFlip?(this: void, viewpoint: "back" | "front"): void;
}
declare function FlipCard({ className, flipTo, axis, contentFront, contentBack, heightController, touchIconClassName, onFlip }: Properties): import("react").JSX.Element;
//#endregion
export { FlipCard };