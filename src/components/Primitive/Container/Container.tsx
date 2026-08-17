import { twMerge } from "@rheactor/rheactor-core";
import { useMemo } from "react";
import type { CSSProperties, PropsWithChildren, ReactNode } from "react";

interface Properties extends PropsWithChildren {
  /**
   * Determines the horizontal padding of the container.
   *
   * Defaults to `4` (1rem).
   */
  paddingX?: number;

  /**
   * Determines if the container is fluid.
   *
   * It means that the container will take the full width of the screen.
   */
  fluid?: boolean;

  /** Container class name. */
  className?: string;

  /** Container children. */
  children?: ReactNode;
}

export function Container({ paddingX = 4, fluid = false, className, children }: Properties) {
  const style = useMemo(() => ({ "--padding-x": paddingX }) as CSSProperties, [paddingX]);

  return (
    <div
      data-component="Container"
      className={twMerge(
        "w-full px-[--spacing(var(--padding-x))]",
        !fluid && "max-w-container mx-auto",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
