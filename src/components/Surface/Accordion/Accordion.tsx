"use client";

import { twMerge } from "@rheactor/rheactor-core";
import { faAngleDown } from "@rheactor/rheactor-font-awesome/classic-regular";
import { Icon } from "@rheactor/rheactor-font-awesome/react";
import { useState } from "react";
import type { PropsWithChildren, ReactNode } from "react";

interface Properties extends PropsWithChildren {
  /** The class name of the accordion. */
  className?: string;

  /** The class name of the header. */
  headerClassName?: string;

  /** The title of the accordion. */
  title: ReactNode;

  /** The kind of the title. */
  titleKind?: "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  /** The class name of the title. */
  titleClassName?: string;

  /** The class name of the icon. */
  iconClassName?: string;

  /** Whether the accordion is opened initially. */
  opened?: boolean;

  /** The content of the accordion. */
  children: ReactNode;

  /** The class name of the body (children). */
  bodyClassName?: string;
}

export function Accordion({
  className,
  headerClassName,
  title,
  titleKind: TitleKind = "div",
  titleClassName,
  iconClassName,
  opened = false,
  bodyClassName,
  children,
}: Properties) {
  const [stateOpened, setStateOpened] = useState(opened);

  return (
    <div
      data-component="Accordion"
      data-opened={stateOpened || undefined}
      className={twMerge("bg-theme-50 flex flex-col rounded-lg", className)}
    >
      <div
        className={twMerge(
          "text-theme-600 bg-theme-50 active:bg-theme-200 grid cursor-pointer grid-cols-[1fr_auto] items-center rounded-lg p-4 px-6 text-lg font-semibold transition select-none hover:brightness-97",
          headerClassName,
        )}
        onClick={() => {
          setStateOpened(!stateOpened);
        }}
      >
        <TitleKind className={titleClassName}>{title}</TitleKind>

        <Icon
          type={faAngleDown}
          size={24}
          className={twMerge(
            "pointer-events-none flex cursor-pointer items-center transition",
            stateOpened && "rotate-180",
            iconClassName,
          )}
        />
      </div>

      {stateOpened && (
        <div
          className={twMerge(
            "text-theme-500 border-t-theme-300 mx-6 border-t py-4 transition-all starting:-translate-y-1/4 starting:opacity-0",
            bodyClassName,
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
