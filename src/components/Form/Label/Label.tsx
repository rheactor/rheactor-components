"use client";

import { twMerge } from "@rheactor/rheactor-core/tailwind";
import { useMemo } from "react";
import type { ComponentProps, CSSProperties, PropsWithChildren, ReactNode } from "react";

import { LabelContext } from "#/components/Form/Label/LabelProvider";

interface Properties extends PropsWithChildren, Pick<ComponentProps<"label">, "ref"> {
  /** The title of the label. */
  title?: ReactNode;

  /**
   * The primary placeholder of the children input.
   *
   * - If `true`, the primary placeholder will be the title.
   * - If `string`, the primary placeholder will be the string.
   */
  primaryPlaceholder?: string | true;

  /** Whether the label is required. */
  required?: boolean;

  /** The size of the label. */
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

  /** The class name of the title. */
  titleClassName?: string;

  /** The class name of the label. */
  className?: string;

  /** The content of the label. */
  children: ReactNode;

  /** The class name of the children. */
  childrenClassName?: string;
}

export function Label({
  ref,
  title,
  primaryPlaceholder,
  required = false,
  size = 12,
  titleClassName,
  className,
  children,
  childrenClassName,
}: Properties) {
  const style = useMemo(() => ({ "--size": size }) as CSSProperties, [size]);

  const value = useMemo(
    () => ({
      primaryPlaceholder:
        primaryPlaceholder === true
          ? typeof title === "string"
            ? title
            : undefined
          : primaryPlaceholder,
    }),
    [primaryPlaceholder, title],
  );

  return (
    <LabelContext.Provider value={value}>
      <label
        ref={ref}
        data-component="Label"
        className={twMerge("col-span-(--grid-cols,var(--size)) grid gap-1", className)}
        style={style}
      >
        <span
          className={twMerge(
            "text-sm font-semibold",
            required && "after:text-rose-600 after:content-['_*']",
            titleClassName,
          )}
        >
          {title}
        </span>

        <div className={childrenClassName}>{children}</div>
      </label>
    </LabelContext.Provider>
  );
}
