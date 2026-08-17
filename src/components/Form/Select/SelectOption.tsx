import type { ComponentProps } from "react";

interface Properties extends ComponentProps<"option"> {
  /** The title of the option. */
  title?: string;

  /**
   * The value of the option.
   *
   * Defaults to same as `title`.
   */
  value?: string;
}

export function SelectOption({ title, value, ...properties }: Properties) {
  return (
    <option {...properties} value={value ?? title ?? "-"} disabled={title === undefined}>
      {title}
    </option>
  );
}
