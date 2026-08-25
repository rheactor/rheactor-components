"use client";

import { getNextImageUrl } from "@rheactor/rheactor-core/next";
import { twMerge } from "@rheactor/rheactor-core/tailwind";
import type { ImgProps } from "next/dist/shared/lib/get-img-props";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { listenResizeObserver } from "#/services/MutationService";

interface Properties {
  /** The source of the image. */
  src: string;

  /** The alt text of the image. */
  alt: string;

  /** The quality of the image. */
  quality?: number;

  /** Determines if the image should be loaded as a priority. */
  priority?: boolean;

  /** Use unoptimized image mode. */
  unoptimized?: boolean;

  /** The spot of the image. */
  spot?: {
    x: number;
    y: number;
  };

  /** The class name of the image. */
  className?: string;
}

const emptySource = "data:image/webp;base64,UklGRhYAAABXRUJQVlA4TAoAAAAvAAAAAEX/I/of";

export function MediaImage({
  src: sourceBase,
  alt,
  quality,
  priority = false,
  spot,
  className,
}: Properties) {
  const reference = useRef<HTMLImageElement>(null);

  const [width, setWidth] = useState(0);
  const style = useMemo(
    () => ({ "--spot": spot && `${spot.x}% ${spot.y}%` }) as CSSProperties,
    [spot],
  );

  const { src, srcSet, sizes } = useMemo(
    (): ImgProps =>
      width === 0
        ? ({ src: emptySource } as ImgProps)
        : getNextImageUrl(sourceBase, width, quality),
    [quality, sourceBase, width],
  );

  useEffect(
    () =>
      listenResizeObserver(
        reference.current,
        {},
        () => {
          setWidth((state) => Math.max(reference.current!.clientWidth, state));
        },
        false,
      ),
    [],
  );

  return (
    // oxlint-disable-next-line next/no-img-element
    <img
      ref={reference}
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={0}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      data-component="MediaImage"
      className={twMerge("w-full", spot !== undefined && "object-(--spot)", className)}
      style={style}
    />
  );
}
