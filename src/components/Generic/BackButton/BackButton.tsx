"use client";

import { faAngleLeft } from "@rheactor/rheactor-font-awesome/classic-regular";
import { Icon } from "@rheactor/rheactor-font-awesome/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { Button } from "#/components/Form/Button/Button";

interface Properties {
  /**
   * The title of the button.
   *
   * Defaults to "Back".
   */
  title?: string;

  /** The route to go back to when location.back() is not the current site. */
  fallbackRoute?: string;

  /** The class name of the button. */
  className?: string;
}

export function BackButton({ title = "Back", fallbackRoute, className }: Properties) {
  const hasFallbackRoute = fallbackRoute !== undefined;

  const [useFallback, setUseFallback] = useState(hasFallbackRoute);

  useEffect(() => {
    if (hasFallbackRoute && history.length > 1) {
      try {
        if (new URL(document.referrer).host === location.host) {
          // oxlint-disable-next-line react/set-state-in-effect
          setUseFallback(false);
        }
      } catch {
        // Empty.
      }
    }
  }, [hasFallbackRoute]);

  const contents = useMemo(
    () => (
      <>
        <Icon type={faAngleLeft} />

        <span>{title}</span>
      </>
    ),
    [title],
  );

  const linkContents = useMemo(
    () =>
      useFallback && fallbackRoute !== undefined ? (
        <Link href={fallbackRoute}>{contents}</Link>
      ) : (
        <div
          onClick={() => {
            history.back();
          }}
        >
          {contents}
        </div>
      ),
    [contents, fallbackRoute, useFallback],
  );

  return (
    <Button __internalComponentType="BackButton" asChild className={className}>
      {linkContents}
    </Button>
  );
}
