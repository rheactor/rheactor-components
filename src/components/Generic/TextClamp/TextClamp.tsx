import { twMerge } from "@rheactor/rheactor-core/tailwind";
import { useMemo } from "react";
import type { CSSProperties, PropsWithChildren, ReactNode } from "react";

interface Properties extends PropsWithChildren {
  /** Number of lines. */
  lines: number;

  /** Class name. */
  className?: string;

  /** Children. */
  children?: ReactNode;
}

export function TextClamp({ lines, children, className }: Properties) {
  const style = useMemo(() => ({ "--lines": lines }) as CSSProperties, [lines]);

  return (
    <div
      data-component="TextClamp"
      className={twMerge("line-clamp-(--lines)", className)}
      style={style}
    >
      {children}
    </div>
  );
}
