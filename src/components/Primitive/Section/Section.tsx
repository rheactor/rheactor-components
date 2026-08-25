import { twMerge } from "@rheactor/rheactor-core/tailwind";
import { useMemo } from "react";
import type { CSSProperties, PropsWithChildren, ReactNode } from "react";

interface Properties extends PropsWithChildren {
  /** Container id to be used as anchor. */
  id?: string;

  /**
   * Container vertical margin.
   *
   * Default to `16` (4rem).
   */
  marginY?: number;

  /**
   * Container top margin.
   *
   * Default to `marginY`.
   */
  marginTop?: number;

  /**
   * Container bottom margin.
   *
   * Default to `marginY`.
   */
  marginBottom?: number;

  /** Container class name. */
  className?: string;

  /** Container children. */
  children?: ReactNode;
}

export function Section({
  id,
  marginY = 16,
  marginTop = marginY,
  marginBottom = marginY,
  className,
  children,
}: Properties) {
  const style = useMemo(
    () =>
      ({
        "--margin-top": marginTop,
        "--margin-bottom": marginBottom,
      }) as CSSProperties,
    [marginTop, marginBottom],
  );

  return (
    <section
      id={id}
      data-component="Section"
      className={twMerge(
        "max-mobile:mt-[--spacing(var(--margin-top)/2)] mt-[--spacing(var(--margin-top))]",
        "max-mobile:mb-[--spacing(var(--margin-bottom)/2)] mb-[--spacing(var(--margin-bottom))]",
        className,
      )}
      style={style}
    >
      {children}
    </section>
  );
}
