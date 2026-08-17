import { twMerge } from "@rheactor/rheactor-core";
import type { IconType } from "@rheactor/rheactor-font-awesome";
import { Icon } from "@rheactor/rheactor-font-awesome/react";

export type ArrowAdvance = "batch" | "sequential";

type ArrowPlacement = "disabled" | "external" | "internal" | "overlay";

interface Properties {
  ref?: React.RefObject<HTMLDivElement | null>;
  icon: IconType;
  className?: string;
  rotate?: boolean;
  placement: ArrowPlacement;
  isDisabled?: boolean;
  onClick(this: void): void;
}

export function SliderArrow({
  ref,
  icon,
  className,
  rotate = false,
  placement,
  isDisabled,
  onClick: handleClick,
}: Properties) {
  return (
    <div
      ref={ref}
      data-component="SliderArrow"
      data-disabled={isDisabled === true ? true : undefined}
      className={twMerge(
        "flex -translate-x-full items-center transition transform-3d starting:opacity-0",
        "data-disabled:pointer-events-none data-disabled:opacity-25",
        rotate ? "right-0 translate-x-full" : "left-0",
        placement === "external" ? "absolute z-10 h-full w-fit" : "translate-x-0",
        (placement === "overlay" || placement === "disabled") &&
          "absolute top-1/2 z-10 h-fit -translate-y-1/2",
        placement === "disabled" && "opacity-0 data-disabled:opacity-0",
      )}
    >
      <div
        className={twMerge(
          "bg-theme-400 hover:bg-theme-500 cursor-pointer rounded-full p-2 text-white transition active:brightness-90",
          rotate && "rotate-y-180",
          className,
        )}
        onClick={handleClick}
      >
        <Icon type={icon} />
      </div>
    </div>
  );
}
