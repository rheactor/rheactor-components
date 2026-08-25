import { twMerge } from "@rheactor/rheactor-core/tailwind";
import type { IconType } from "@rheactor/rheactor-font-awesome";
import {
  faBomb,
  faBug,
  faBullhorn,
  faCheck,
  faCircleExclamation,
  faCircleXmark,
} from "@rheactor/rheactor-font-awesome/classic-regular";
import { Icon } from "@rheactor/rheactor-font-awesome/react";
import type { PropsWithChildren } from "react";

interface Properties extends PropsWithChildren {
  /** Title of the alert. */
  title: string;

  /** Variant of the alert. */
  variant: "advice" | "critical" | "debug" | "error" | "info" | "success" | "warning";
}

class AlertVariant {
  public constructor(
    public icon: IconType,
    public bodyClassName: string,
    public titleClassName: string,
  ) {}
}

const variants = new Map<Properties["variant"], AlertVariant>([
  [
    "advice",
    new AlertVariant(
      faBullhorn,
      "text-sky-900 bg-sky-100 border border-sky-200",
      "bg-sky-300 text-sky-900",
    ),
  ],
  [
    "critical",
    new AlertVariant(
      faBomb,
      "text-gray-50 bg-black/80 border border-gray-900",
      "bg-black text-white",
    ),
  ],
  [
    "debug",
    new AlertVariant(
      faBug,
      "text-purple-900 bg-purple-100 border border-purple-200",
      "bg-purple-300 text-purple-900",
    ),
  ],
  [
    "error",
    new AlertVariant(
      faCircleXmark,
      "text-red-900 bg-red-100 border border-red-200",
      "bg-red-300 text-red-900",
    ),
  ],
  [
    "info",
    new AlertVariant(
      faBullhorn,
      "text-gray-900 bg-gray-100 border border-gray-300",
      "bg-gray-300 text-gray-900",
    ),
  ],
  [
    "success",
    new AlertVariant(
      faCheck,
      "text-green-900 bg-green-100 border border-green-200",
      "bg-green-300 text-green-900",
    ),
  ],
  [
    "warning",
    new AlertVariant(
      faCircleExclamation,
      "text-orange-900 bg-orange-100 border border-orange-200",
      "bg-orange-300 text-orange-900",
    ),
  ],
]);

export function Alert({ title, variant, children }: Properties) {
  const { icon, bodyClassName, titleClassName } = variants.get(variant)!;

  return (
    <div data-component="Alert" className="transition starting:opacity-0">
      <div
        className={twMerge(
          "relative -mb-3.5 flex h-7 w-fit items-center justify-center gap-x-2 rounded px-3 text-sm",
          titleClassName,
        )}
      >
        <Icon type={icon} className="size-3" />

        <strong className="font-semibold capitalize">{title}</strong>
      </div>

      <ul className={twMerge("list-disc space-y-2 rounded p-3 pt-6 pl-8", bodyClassName)}>
        {children}
      </ul>
    </div>
  );
}
