//#region src/services/hooks/useInViewport.d.ts
type Threshold = number | `${number}px`;
declare function useInViewport(
/**
 * The threshold to consider the element visible. Can be a number (percentual) or a pixel value.
 *
 * Defaults to `25px`.
 */
threshold?: Threshold,
/**
 * Whether to consider the element visible after it leaves the viewport.
 *
 * Defaults to `false`.
 */
shouldConsiderVisibleAfterLeavingViewport?: boolean): {
  readonly ref: (element: Element | null | undefined) => void;
  readonly visible: boolean;
  readonly disconnect: () => void;
};
//#endregion
export { Threshold, useInViewport };