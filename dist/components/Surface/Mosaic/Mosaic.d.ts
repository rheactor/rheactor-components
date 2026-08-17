import { JSX, PropsWithChildren, ReactNode } from "react";
//#region src/components/Surface/Mosaic/Mosaic.d.ts
interface Properties extends PropsWithChildren {
  /**
   * The duration of mosaic items visibility in ms.
   *
   * Defaults to 5000.
   */
  duration?: number;
  /**
   * Whether to shuffle the items.
   *
   * Defaults to false.
   */
  shuffle?: boolean;
  /** The class name of the mosaic. */
  className?: string;
  /** The content of the mosaic. */
  children?: ReactNode;
}
declare function Mosaic({ duration, shuffle, className, children }: Properties): JSX.Element;
//#endregion
export { Mosaic };