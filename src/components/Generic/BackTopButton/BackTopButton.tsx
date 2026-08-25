"use client";

import { twMerge } from "@rheactor/rheactor-core/tailwind";
import { faAngleUp } from "@rheactor/rheactor-font-awesome/classic-regular";
import { Icon } from "@rheactor/rheactor-font-awesome/react";

import { useAnalytics } from "#/services/hooks/useAnalytics";

interface Properties {
  /**
   * The title of the button.
   *
   * Defaults to "Back to Top".
   */
  title?: string;

  /** The class name of the button. */
  className?: string;
}

export function BackTopButton({ title = "Back to Top", className }: Properties) {
  const { sendEvent } = useAnalytics();

  return (
    <div
      data-component="BackTopButton"
      className={twMerge(
        "bg-theme-900/25 max-mobile:bg-theme-900 hover:bg-theme-800 fixed right-4 bottom-4 z-10 flex cursor-pointer items-center gap-x-1 rounded-md border border-white p-2.5 px-3 text-sm text-white transition select-none active:scale-95 active:duration-150",
        className,
      )}
      onClick={() => {
        sendEvent?.("back_to_top");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <Icon type={faAngleUp} />

      <div className="max-mobile:hidden">{title}</div>
    </div>
  );
}
