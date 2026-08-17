"use client";

import { clamp, twMerge } from "@rheactor/rheactor-core";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

import { listenWindowScroll } from "#/services/EventService";
import { useReady } from "#/services/hooks/useReady";

interface Properties extends PropsWithChildren {
  /** The className of the container. */
  className?: string;

  /** The className of the progress bar. */
  progressClassName?: string;

  /** The callback when the progress is updated. */
  onProgress?(this: void, progress: number): void;

  /** The callback when the progress is completed. */
  onCompleted?(this: void): void;
}

export function ScrollProgress({
  className,
  progressClassName,
  children,
  onProgress,
  onCompleted,
}: Properties) {
  const reference = useRef<HTMLDivElement>(null);

  const isReady = useReady();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    return listenWindowScroll(() => {
      const rect = reference.current?.getBoundingClientRect();

      if (rect !== undefined) {
        const rectTop = rect.top + window.scrollY;
        const rectInside = Math.max(window.innerHeight - rectTop, 0);
        const rectHeight = rect.height - rectInside;

        const currentProgress =
          (1 / rectHeight) * clamp(window.innerHeight - rect.top - rectInside, 0, rectHeight);

        setProgress(currentProgress);
        onProgress?.(currentProgress);

        if (currentProgress === 1) {
          onCompleted?.();
        }
      }
    });
  }, [isReady, onCompleted, onProgress]);

  const progressStyle = useMemo(
    () => ({ "--progress": `${progress * 100}%` }) as CSSProperties,
    [progress],
  );

  const scrollProgress = useMemo(
    () => (
      <div
        data-component="ScrollProgressBar"
        className={twMerge("bg-theme-400 fixed top-0 left-0 h-1 w-(--progress)", progressClassName)}
        style={progressStyle}
      />
    ),
    [progressClassName, progressStyle],
  );

  return (
    isReady && (
      <>
        {createPortal(scrollProgress, document.body)}

        <div
          ref={reference}
          data-completed={progress === 1 || undefined}
          data-component="ScrollProgress"
          className={className}
        >
          {children}
        </div>
      </>
    )
  );
}
