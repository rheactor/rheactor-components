"use client";

import { useCallback, useRef, useState } from "react";

export type Threshold = number | `${number}px`;

export function useInViewport(
  /**
   * The threshold to consider the element visible. Can be a number (percentual) or a pixel value.
   *
   * Defaults to `25px`.
   */
  threshold: Threshold = "25px",

  /**
   * Whether to consider the element visible after it leaves the viewport.
   *
   * Defaults to `false`.
   */
  shouldConsiderVisibleAfterLeavingViewport = false,
) {
  const [visible, setVisible] = useState(false);

  const observer = useRef<IntersectionObserver>(null);

  const disconnect = useCallback(() => {
    observer.current?.disconnect();
    observer.current = null;
  }, []);

  const visibleAfterLeavingViewport = useCallback(
    (rect: DOMRect) => shouldConsiderVisibleAfterLeavingViewport && rect.top < 0,
    [shouldConsiderVisibleAfterLeavingViewport],
  );

  const reference = useCallback(
    (element: Element | null | undefined) => {
      disconnect();

      if (element instanceof HTMLElement) {
        const observerNew = new IntersectionObserver(
          ([entry]) => {
            setVisible(
              entry!.isIntersecting || visibleAfterLeavingViewport(entry!.boundingClientRect),
            );
          },
          typeof threshold === "number"
            ? { threshold }
            : { threshold: 0, rootMargin: `0px 0px -${threshold} 0px` },
        );

        observerNew.observe(element);
        observer.current = observerNew;

        const rect = element.getBoundingClientRect();

        if (visibleAfterLeavingViewport(rect)) {
          setVisible(true);
        } else {
          const bottomMargin = typeof threshold === "number" ? 0 : Number(threshold);

          if (rect.top < window.innerHeight - bottomMargin && rect.bottom > 0) {
            setVisible(true);
          }
        }
      }
    },
    [disconnect, threshold, visibleAfterLeavingViewport],
  );

  return { ref: reference, visible, disconnect } as const;
}
