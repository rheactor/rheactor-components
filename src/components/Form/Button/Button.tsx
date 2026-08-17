import { twMerge } from "@rheactor/rheactor-core";
import { cloneElement, isValidElement } from "react";
import type { ComponentProps } from "react";
import type { JSX } from "react/jsx-runtime";

interface Properties extends ComponentProps<"button"> {
  /**
   * The type of the button.
   *
   * Defaults to "button".
   */
  type?: ComponentProps<"button">["type"];

  /**
   * Specifies the fill style of the button. Can be "outline", "solid", or "transparent".
   *
   * Defaults to "solid".
   */
  fill?: "outline" | "solid" | "transparent";

  /** The component type. */
  __internalComponentType?: string;

  /** If true, the button will render as a child element. */
  asChild?: boolean;
}

export function Button({
  type = "button",
  disabled = false,
  fill = "solid",
  className,
  asChild = false,
  __internalComponentType = "Button",
  children,
  ...properties
}: Properties) {
  const buttonClassName = twMerge(
    "inline-flex items-center justify-center gap-x-2",
    "bg-theme-600 text-theme-50 border-theme-700 cursor-pointer rounded border p-2 px-4 transition select-none",
    "theme-outline:bg-theme-50 theme-outline:border-theme-200 theme-outline:text-theme-900",
    "theme-transparent:bg-transparent theme-transparent:border-transparent theme-transparent:text-theme-900 theme-transparent:not-disabled:shadow-none theme-transparent:hover:bg-theme-50",
    "theme-solid:hover:brightness-115 theme-solid:active:brightness-90",
    "theme-outline:hover:brightness-103 theme-outline:active:brightness-97",
    "theme-transparent:active:brightness-97",
    "disabled:bg-theme-50 disabled:text-theme-200 disabled:border-theme-50 disabled:pointer-events-none",
    "theme-transparent:disabled:bg-transparent theme-transparent:disabled:border-transparent not-disabled:shadow",
    "[&>svg]:min-h-lh",
    className,
  );

  if (asChild && isValidElement(children)) {
    // oxlint-disable-next-line react/no-clone-element
    return cloneElement(children as JSX.Element, {
      "data-component": __internalComponentType,
      "data-theme": fill,
      className: buttonClassName,
      disabled,
    });
  }

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled}
      data-component={__internalComponentType}
      data-theme={fill}
      className={buttonClassName}
      {...properties}
    >
      {children}
    </button>
  );
}
