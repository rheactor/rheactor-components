import { CSSProperties, ReactNode } from "react";
//#region src/components/Print/PrintPage/PrintPage.d.ts
interface Properties {
  /**
   * Controls the page size.
   *
   * You can use one of the predefined sizes or define the size in a custom way.
   *
   * The default is `A4`.
   */
  size?: CustomSize | Size;
  /**
   * Controls the orientation of the page.
   *
   * The default is `portrait`.
   */
  orientation?: Orientation;
  /**
   * Controls the margin of the page.
   *
   * The default is `1cm` in all directions.
   */
  margin?: Margin;
  /** Defines the header of the page. */
  header?: ReactNode;
  /** Defines the footer of the page. */
  footer?: ReactNode;
  /**
   * Controls the overflow behavior of the page content.
   *
   * - "allowed": Content is allowed to overflow without any warning or visual indicator.
   * - "warning": Displays a visual warning when content overflows the vertical size limit,
   *   highlighting the overflowing area.
   *
   * The default is `warning`.
   */
  overflowMode?: "allowed" | "warning";
  /**
   * Shortens the page if its content doesn't occupy the full height.
   *
   * The default is `false`.
   */
  shorten?: boolean;
  /** The content of the page. */
  children: ReactNode;
  /** The class name of the page. */
  className?: string;
}
type Size = keyof typeof sizes;
interface CustomSize {
  width: NonNullable<CSSProperties["width"]>;
  height: NonNullable<CSSProperties["height"]>;
}
type Orientation = "landscape" | "portrait";
type Margin = NonNullable<CSSProperties["margin"]>;
declare const sizes: {
  A4: {
    width: string;
    height: string;
  };
  Letter: {
    width: string;
    height: string;
  };
  Legal: {
    width: string;
    height: string;
  };
};
/**
 * This component renders a page with customizable size, orientation, margin, and optional
 * header/footer.
 *
 * It also provides an overflow warning if the content exceeds the page's size.
 */
declare function PrintPage({ size, orientation, margin, header, footer, overflowMode, shorten, children, className }: Properties): import("react").JSX.Element;
//#endregion
export { PrintPage };