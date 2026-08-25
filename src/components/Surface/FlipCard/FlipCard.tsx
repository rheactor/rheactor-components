"use client";

import { twMerge } from "@rheactor/rheactor-core/tailwind";
import { faHandPointer } from "@rheactor/rheactor-font-awesome/classic-regular";
import { Icon } from "@rheactor/rheactor-font-awesome/react";
import { useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

interface Properties {
  /** The container class name. */
  className?: string;

  /**
   * The direction-to of the flip.
   *
   * Defaults to `right`.
   */
  flipTo?: "left" | "right";

  /**
   * The axis of the flip.
   *
   * Defaults to `horizontal`.
   */
  axis?: "horizontal" | "vertical";

  /** The content of the front of the flip card. */
  contentFront: ReactNode;

  /** The content of the back of the flip card. */
  contentBack: ReactNode;

  heightController?: "back" | "front";

  /** The class name of the touch icon. */
  touchIconClassName?: string;

  /** The callback when the user flips the card. */
  onFlip?(this: void, viewpoint: "back" | "front"): void;
}

const baseClassName = "backface-hidden flex h-full items-center justify-center";
const absoluteClassName = "absolute inset-0";

export function FlipCard({
  className,
  flipTo = "right",
  axis = "horizontal",
  contentFront,
  contentBack,
  heightController = "front",
  touchIconClassName,
  onFlip,
}: Properties) {
  const [flip, setFlip] = useState(false);

  const style = useMemo(
    () => ({ "--flip-angle": flipTo === "left" ? "-180deg" : "180deg" }) as CSSProperties,
    [flipTo],
  );

  return (
    <div
      data-component="FlipCard"
      data-flipped={flip || undefined}
      className={twMerge(
        "group/flip-card size-full overflow-hidden perspective-distant",
        className,
      )}
      style={style}
      onClick={() => {
        onFlip?.("back");
        setFlip((state) => !state);
      }}
      onMouseEnter={() => {
        onFlip?.("back");
      }}
      onMouseLeave={() => {
        onFlip?.("front");
        setFlip(false);
      }}
    >
      <div
        className={twMerge(
          "relative h-full transition-transform duration-800 transform-3d",
          "not-max-mobile:group-hover/flip-card:transform-[rotateY(var(--flip-angle))]",
          axis === "vertical" &&
            "not-max-mobile:group-hover/flip-card:transform-[rotateX(var(--flip-angle))]",
          flip && "transform-[rotateY(var(--flip-angle))]",
          flip && axis === "vertical" && "transform-[rotateX(var(--flip-angle))]",
        )}
      >
        <div
          className={
            heightController === "front" ? baseClassName : twMerge(baseClassName, absoluteClassName)
          }
        >
          {contentFront}
        </div>

        <div
          className={twMerge(
            baseClassName,
            heightController === "front" && absoluteClassName,
            "transform-[rotateY(var(--flip-angle))]",
            axis === "vertical" && "transform-[rotateX(var(--flip-angle))]",
          )}
        >
          {contentBack}
        </div>
      </div>

      <div
        className={twMerge(
          "text-theme-800 bg-theme-200/75 pointer-events-none absolute right-1 bottom-1 rounded-full p-1 transition not-pointer-coarse:hidden group-active:scale-90",
          touchIconClassName,
        )}
      >
        <Icon type={faHandPointer} />
      </div>
    </div>
  );
}
