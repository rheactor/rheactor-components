import { twMerge } from "@rheactor/rheactor-core";
import { isValidElement, useId, useMemo } from "react";
import type { CSSProperties, ReactNode } from "react";
import { stringifyCSSProperties } from "react-style-stringify";

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

const sizes = {
  A4: { width: "21.0cm", height: "29.7cm" },
  Letter: { width: "8.5in", height: "11in" },
  Legal: { width: "8.5in", height: "14in" },
} satisfies Readonly<Record<string, CustomSize>>;

function isSize(value: unknown): value is Size {
  return typeof value === "string";
}

/**
 * This component renders a page with customizable size, orientation, margin, and optional
 * header/footer.
 *
 * It also provides an overflow warning if the content exceeds the page's size.
 */
export function PrintPage({
  size = "A4",
  orientation = "portrait",
  margin = "1cm",
  header,
  footer,
  overflowMode = "warning",
  shorten = false,
  children,
  className,
}: Properties) {
  const pageId = useId();

  const dimensions = isSize(size) ? sizes[size] : size;

  const isLandscape = orientation === "landscape";

  const width = isLandscape ? dimensions.height : dimensions.width;
  const height = isLandscape ? dimensions.width : dimensions.height;

  const pageStyle = useMemo(
    () =>
      `@page ${pageId} { ${stringifyCSSProperties({
        margin: 0,
        width,
        height,
      })} }`,
    [pageId, height, width],
  );

  const style = useMemo(
    () =>
      ({
        "--page-id": pageId,
        "--width": width,
        "--height": height,
        "--margin": margin,
      }) as CSSProperties,
    [pageId, width, height, margin],
  );

  return (
    <div
      data-component="PrintPage"
      className={twMerge(
        "relative min-h-(--height) w-(--width) box-decoration-clone p-(--margin) [page:var(--page-id)] not-last:*:break-after-page not-print:overflow-hidden not-print:rounded-sm not-print:bg-white not-print:shadow-md not-print:shadow-gray-600/10 not-print:outline not-print:outline-gray-600/25",
        shorten && "min-h-auto",
        className,
      )}
      style={style}
    >
      <style>{pageStyle}</style>

      {overflowMode === "warning" && (
        <div className="absolute inset-x-0 top-(--height) bottom-0 animate-pulse bg-red-200 bg-blend-overlay print:hidden" />
      )}

      {isValidElement(header) && (
        <div className="absolute inset-x-0 top-0 print:fixed">{header}</div>
      )}

      <div className="relative">{children}</div>

      {isValidElement(footer) && (
        <div
          className={twMerge(
            "absolute inset-x-0 top-(--height) -translate-y-full print:fixed",
            overflowMode === "allowed" && "top-auto bottom-0 translate-y-0",
          )}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
