"use client";

import { clamp, noop } from "@rheactor/rheactor-core";
import { twMerge } from "@rheactor/rheactor-core/tailwind";
import { faAngleLeft, faAnglesLeft } from "@rheactor/rheactor-font-awesome/classic-regular";
import { Icon } from "@rheactor/rheactor-font-awesome/react";
import { useMemo } from "react";
import type { ComponentProps } from "react";

import { PaginationPage } from "#/components/Pagination/Pagination/PaginationPage";
import { circularRange, paginate } from "#/services/ArrayService";

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

export function Pagination({
  current,
  total,
  visibleCount,
  spread,
  queryString,
  className,
  pageClassName,
  previousNext = true,
  firstLast = true,
  forceRender = false,
  onClick = noop,
}: Properties) {
  const isVisible = visibleCount !== undefined && total > visibleCount;

  const currentClamped = clamp(current, 1, total);

  const pageProperties: Pick<
    ComponentProps<typeof PaginationPage>,
    "className" | "onClick" | "queryString"
  > = {
    queryString,
    className: pageClassName,
    onClick,
  };

  const pages = useMemo(
    () => paginate(currentClamped, total, visibleCount),
    [currentClamped, total, visibleCount],
  );

  const pagesSpread = useMemo(
    () => circularRange(1, total, currentClamped, spread ?? 0),
    [currentClamped, total, spread],
  );

  return (
    <div
      data-component="Pagination"
      className={twMerge("flex flex-wrap items-center justify-center gap-2", className)}
    >
      {isVisible && firstLast && (
        <PaginationPage page={1} isDisabled={currentClamped === 1} {...pageProperties}>
          <Icon type={faAnglesLeft} />
        </PaginationPage>
      )}

      {isVisible && previousNext && (
        <PaginationPage
          page={clamp(currentClamped - 1, 1, total)}
          isDisabled={currentClamped === 1}
          {...pageProperties}
        >
          <Icon type={faAngleLeft} />
        </PaginationPage>
      )}

      {(forceRender || total > 1) &&
        pages.map((page) => (
          <PaginationPage
            key={page}
            page={page}
            isCurrent={page === currentClamped}
            isSpread={pagesSpread.includes(page)}
            {...pageProperties}
          >
            {page}
          </PaginationPage>
        ))}

      {isVisible && previousNext && (
        <PaginationPage
          page={clamp(currentClamped + 1, 1, total)}
          isDisabled={currentClamped === total}
          {...pageProperties}
        >
          <Icon type={faAngleLeft} className="rotate-180" />
        </PaginationPage>
      )}

      {isVisible && firstLast && (
        <PaginationPage page={total} isDisabled={currentClamped === total} {...pageProperties}>
          <Icon type={faAnglesLeft} className="rotate-180" />
        </PaginationPage>
      )}
    </div>
  );
}
