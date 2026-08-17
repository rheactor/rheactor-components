"use client";

import { twMerge } from "@rheactor/rheactor-core";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { appendQueryString } from "#/services/UrlService";

interface Properties {
  page: number;
  queryString?: string;
  isCurrent?: boolean;
  isSpread?: boolean;
  isDisabled?: boolean;
  className?: string;
  children: ReactNode;
  onClick(this: void, page: number): void;
}

export function PaginationPage({
  page,
  queryString,
  isCurrent,
  isSpread,
  isDisabled,
  children,
  className,
  onClick,
}: Properties) {
  const [route, setRoute] = useState<string>();

  useEffect(() => {
    setRoute(queryString === undefined ? undefined : appendQueryString(queryString, String(page)));
  }, [page, queryString]);

  return (
    <a
      href={route}
      data-component="PaginationPage"
      data-active={isCurrent === true || isSpread === true ? true : undefined}
      data-active-spread={isSpread === true ? true : undefined}
      data-disabled={isDisabled === true ? true : undefined}
      className={twMerge(
        "bg-theme-100 border-theme-200 hover:bg-theme-200 hover:border-theme-300 data-active:bg-theme-300 data-active:border-theme-400 hover:data-active:bg-theme-400 hover:data-active:border-theme-500 flex aspect-square w-8 cursor-pointer items-center justify-center rounded-full border transition select-none active:brightness-90 data-active:font-bold data-disabled:pointer-events-none data-disabled:opacity-25",
        className,
      )}
      onClick={() => {
        onClick(page);
      }}
    >
      {children}
    </a>
  );
}
