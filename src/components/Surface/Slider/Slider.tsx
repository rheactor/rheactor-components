"use client";

import { twMerge } from "@rheactor/rheactor-core";
import type { IconType } from "@rheactor/rheactor-font-awesome";
import { faAngleLeft } from "@rheactor/rheactor-font-awesome/classic-regular";
import { Children, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ComponentProps, PropsWithChildren, ReactNode } from "react";
import { Autoplay, FreeMode, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperClass } from "swiper/react";

import { Pagination } from "#/components/Pagination/Pagination/Pagination";
import type { ArrowAdvance } from "#/components/Surface/Slider/SliderArrow";
import { SliderArrow } from "#/components/Surface/Slider/SliderArrow";
import { listenWindowEvent } from "#/services/EventService";
import { useReady } from "#/services/hooks/useReady";
import type { Breakpoints } from "#/services/SwiperService";
import { normalizeBreakpoints } from "#/services/SwiperService";

const emptyChildren: ReactNode[] = [];

const keyboardOptions = { enabled: true, onlyInViewport: true };

interface Properties extends PropsWithChildren {
  /**
   * Autoplay duration in milliseconds.
   *
   * Defaults to `5000`.
   */
  duration?: number;

  /**
   * Slide advance speed in milliseconds. It multiplies to the visible items count.
   *
   * Defaults to `300`.
   */
  speed?: number;

  /**
   * Number of items per slide. Supports breakpoints object.
   *
   * Defaults to `1`.
   */
  items?: Breakpoints | number;

  /**
   * Gap between items, based on `rem`. Supports breakpoints object.
   *
   * Defaults to `0.5`.
   */
  gap?: Breakpoints | number;

  /**
   * Enable infinite loop.
   *
   * Defaults to `true`.
   */
  infinity?: boolean;

  /**
   * Enable free flow mode.
   *
   * Defaults to `false`.
   */
  freeFlow?: boolean;

  /**
   * Stretch items to fill the container when there is less items than needed.
   *
   * Defaults to `true`.
   */
  stretch?: boolean;

  /**
   * Center items when there is less items than needed. Works only when `fill` is `false`.
   *
   * Defaults to `true`.
   */
  centered?: boolean;

  /** Container class name. */
  className?: string;

  /**
   * Arrows icon.
   *
   * Defaults to `<FaAngleLeft />`.
   */
  arrowsIcon?: IconType;

  /**
   * Arrows advance mode.
   *
   * - `single` - Advance one item at a time.
   * - `visible` - Advance all visible items at a time.
   *
   * Defaults to `single`.
   */
  arrowsStepMode?: ArrowAdvance;

  /** Arrows class name applied to each arrow. */
  arrowsClassName?: string;

  /**
   * Arrows placement.
   *
   * - `disabled` - Arrows are disabled.
   * - `external` - Arrows are placed outside the container.
   * - `internal` - Arrows are placed inside the container.
   * - `overlay` - Arrows are placed on top of the container, overlaying items.
   *
   * Defaults to `overlay`.
   */
  arrowsPlacement?: ComponentProps<typeof SliderArrow>["placement"];

  /**
   * Arrows placement fallback.
   *
   * It occurs when `arrowsPlacement` is `external` and there is not enough space to place the
   * arrows on window.
   *
   * - `disabled` - Arrows are disabled.
   * - `internal` - Arrows are placed inside the container.
   * - `overlay` - Arrows are placed on top of the container, overlaying items.
   *
   * Defaults to `overlay`.
   */
  arrowsPlacementFallback?: Exclude<ComponentProps<typeof SliderArrow>["placement"], "external">;

  /**
   * Pagination placement.
   *
   * - `after` - Pagination is placed after the container.
   * - `overlay` - Pagination is placed on bottom of the container, overlaying items.
   * - `false` - Pagination is disabled.
   *
   * Defaults to `after`.
   */
  pagination?: "after" | "overlay" | false;

  /** Pagination class name. */
  paginationClassName?: string;

  /**
   * Pagination compressed mode.
   *
   * When enabled, each pagination item page represents the slider items based on visible items
   * count.
   *
   * Defaults to `true`.
   */
  paginationCompressed?: boolean;

  /** Pagination visible item pages count. */
  paginationLimit?: number;

  /** Container children. */
  children?: ReactNode;

  /** Callback fired when the slider navigates to a new slide. */
  onNavigate?(this: void): void;
}

export function Slider({
  duration = 5000,
  speed = 300,
  items = 1,
  gap = 0.5,
  infinity = true,
  freeFlow = false,
  stretch = true,
  centered = true,
  className,
  arrowsIcon = faAngleLeft,
  arrowsStepMode = "sequential",
  arrowsClassName,
  arrowsPlacement = "overlay",
  arrowsPlacementFallback = "overlay",
  pagination = "after",
  paginationClassName,
  paginationCompressed = true,
  paginationLimit,
  children: baseChildren = emptyChildren,
  onNavigate,
}: Properties) {
  const isReady = useReady();

  const containerReference = useRef<HTMLDivElement>(null);
  const arrowReference = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(Number.MAX_SAFE_INTEGER);

  // oxlint-disable-next-line react/no-react-children
  const children = useMemo(() => Children.toArray(baseChildren).filter(Boolean), [baseChildren]);

  const breakpoints = useMemo(
    () => normalizeBreakpoints(children.length, items, gap, stretch),
    [children.length, gap, items, stretch],
  );

  const [swiper, setSwiper] = useState<SwiperClass>();

  const [hasArrowSpace, setHasArrowSpace] = useState(false);

  const isOverflow = useMemo(() => children.length > visibleCount, [children.length, visibleCount]);

  const autoplayOptions = useMemo(
    () => (duration === 0 ? false : { delay: duration, pauseOnMouseEnter: true }),
    [duration],
  );

  const modules = useMemo(() => [Autoplay, Keyboard, ...(freeFlow ? [FreeMode] : [])], [freeFlow]);

  const freeModeOptions = useMemo(() => ({ enabled: freeFlow, sticky: true }), [freeFlow]);

  const arrowPlacementFinal = useMemo(
    () =>
      isOverflow
        ? hasArrowSpace || arrowsPlacement !== "external"
          ? arrowsPlacement
          : arrowsPlacementFallback
        : "disabled",
    [isOverflow, arrowsPlacement, arrowsPlacementFallback, hasArrowSpace],
  );

  const arrowClick = useCallback(
    (delta: number) => {
      const deltaAdvance = arrowsStepMode === "sequential" ? 1 : visibleCount;
      const deltaFinal = delta * deltaAdvance;

      const indexNew = (index + children.length + deltaFinal) % children.length;

      swiper!.slideTo(indexNew);

      onNavigate?.();
    },
    [arrowsStepMode, index, children.length, onNavigate, swiper, visibleCount],
  );

  const paginationTotal = useMemo(
    () => (paginationCompressed ? Math.ceil(children.length / visibleCount) : children.length),
    [children.length, paginationCompressed, visibleCount],
  );

  const isPaginationEnabled = useMemo(
    () => (paginationCompressed ? paginationTotal > 1 : isOverflow),
    [isOverflow, paginationCompressed, paginationTotal],
  );

  const handleResize = useCallback((slidesPerView: unknown) => {
    if (typeof slidesPerView === "number") {
      setVisibleCount(slidesPerView);
    }
  }, []);

  useEffect(
    () =>
      isReady
        ? listenWindowEvent("resize", () => {
            if (containerReference.current !== null && arrowReference.current !== null) {
              setHasArrowSpace(
                containerReference.current.offsetWidth + 3 * arrowReference.current.offsetWidth <=
                  document.body.offsetWidth,
              );
            }
          })
        : undefined,
    [isReady],
  );

  return (
    isReady && (
      <div data-component="Slider" className={twMerge("relative", className)}>
        <div ref={containerReference} className="relative flex">
          <SliderArrow
            ref={arrowReference}
            icon={arrowsIcon}
            className={arrowsClassName}
            placement={arrowPlacementFinal}
            isDisabled={!infinity && index === 0}
            onClick={() => {
              arrowClick(-1);
            }}
          />

          <Swiper
            onSwiper={(swiperInstance) => {
              setSwiper(swiperInstance);
            }}
            loop={infinity && isOverflow}
            autoplay={autoplayOptions}
            breakpoints={breakpoints}
            modules={modules}
            centerInsufficientSlides={centered}
            freeMode={freeModeOptions}
            keyboard={keyboardOptions}
            loopAddBlankSlides={false}
            speed={speed * visibleCount}
            onSlideChange={({ realIndex }) => {
              setIndex(realIndex);
            }}
            onTouchEnd={() => {
              onNavigate?.();
            }}
            onAfterInit={(swiperInstance) => {
              handleResize(swiperInstance.params.slidesPerView);
            }}
            onResize={(swiperInstance) => {
              handleResize(swiperInstance.params.slidesPerView);
              queueMicrotask(() => {
                swiperInstance.update();
              });
            }}
            className={twMerge("flex-1", !swiper && "hidden")}
          >
            {children.map((child, childIndex) => (
              <SwiperSlide
                // eslint-disable-next-line react/no-array-index-key
                key={childIndex}
              >
                {child}
              </SwiperSlide>
            ))}
          </Swiper>

          <SliderArrow
            rotate
            icon={arrowsIcon}
            className={arrowsClassName}
            placement={arrowPlacementFinal}
            isDisabled={!infinity && index === 0}
            onClick={() => {
              arrowClick(1);
            }}
          />
        </div>

        {isPaginationEnabled && (
          <div
            className={twMerge(
              "z-10",
              pagination === false && "hidden",
              pagination === "overlay" && "absolute inset-x-0 bottom-0",
              paginationClassName,
            )}
          >
            <Pagination
              current={
                paginationCompressed
                  ? index === children.length - visibleCount
                    ? paginationTotal
                    : Math.ceil((index + 1) / visibleCount)
                  : index + 1
              }
              total={paginationTotal}
              visibleCount={paginationLimit}
              spread={paginationCompressed ? undefined : visibleCount - 1}
              pageClassName="text-[size:0] w-2.5"
              firstLast={false}
              previousNext={false}
              onClick={(page) => {
                onNavigate?.();
                swiper!.slideTo(paginationCompressed ? (page - 1) * visibleCount : page - 1);
              }}
            />
          </div>
        )}
      </div>
    )
  );
}
