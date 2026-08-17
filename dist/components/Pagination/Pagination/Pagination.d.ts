//#region src/components/Pagination/Pagination/Pagination.d.ts
interface Properties {
  /** The current page. */
  current: number;
  /** The total number of pages. */
  total: number;
  /**
   * The maximum number of visible pages.
   *
   * Defaults to `undefined` (unlimited).
   */
  visibleCount?: number;
  /** The number of additional active elements after the current page (not inclusive). */
  spread?: number;
  /**
   * The query string to append to the URL.
   *
   * Defaults to `undefined` (no query string).
   */
  queryString?: string;
  /** The class name of the container element. */
  className?: string;
  /** The class name of each page element. */
  pageClassName?: string;
  /**
   * Whether to show the previous/next buttons.
   *
   * Defaults to `true`.
   */
  previousNext?: boolean;
  /**
   * Whether to show the first/last buttons.
   *
   * Defaults to `true`.
   */
  firstLast?: boolean;
  /**
   * Whether to force the component to render when the total not is greater than one page.
   *
   * Defaults to `false`.
   */
  forceRender?: boolean;
  /** The function to call when a page is clicked. */
  onClick?(this: void, page: number): void;
}
declare function Pagination({ current, total, visibleCount, spread, queryString, className, pageClassName, previousNext, firstLast, forceRender, onClick }: Properties): import("react").JSX.Element;
//#endregion
export { Pagination };