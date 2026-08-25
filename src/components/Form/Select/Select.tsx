import { twMerge } from "@rheactor/rheactor-core/tailwind";
import { faChevronDown } from "@rheactor/rheactor-font-awesome/classic-regular";
import { Icon } from "@rheactor/rheactor-font-awesome/react";
import { Fragment } from "react";
import type { ComponentProps } from "react";

import { inputClassName } from "#/components/fixtures";
import { SelectOption } from "#/components/Form/Select/SelectOption";

interface Properties extends ComponentProps<"select"> {
  /** The placeholder of the select. */
  placeholder?: string;

  /**
   * The options of the select.
   *
   * A `null` entry forces an empty separator (`<optgroup>`) between the surrounding options, even
   * when the adjacent groups are the same.
   */
  options: Array<OptionItem | null>;

  /** The className of the option. */
  className?: string;

  /** The className of the arrow. */
  arrowClassName?: string;
}

interface OptionItem {
  /** The title of the option. */
  title?: string;

  /**
   * The value of the option.
   *
   * Defaults to same as `title`.
   */
  value?: string;

  /** The className of the option. */
  className?: string;

  /**
   * The group this option belongs to. Options sharing the same group are rendered together inside a
   * single `<optgroup>`, respecting the order of their first appearance. When omitted, the option
   * is rendered at the root of the `<select>`.
   */
  group?: string;
}

interface OptionBlock {
  group: string | null;
  options: OptionItem[];
}

export function Select({
  placeholder,
  options,
  className,
  arrowClassName,
  ...properties
}: Properties) {
  const blocks: OptionBlock[] = [];
  let current: OptionBlock | null = null;

  for (const option of options) {
    if (option === null) {
      current = null;

      continue;
    }

    const group = option.group ?? null;

    if (current === null || current.group !== group) {
      current = { group, options: [] };
      blocks.push(current);
    }

    current.options.push(option);
  }

  return (
    <div className="relative">
      <select
        className={twMerge(inputClassName, "appearance-none pr-11", className)}
        {...properties}
      >
        {placeholder !== undefined && (
          <>
            <option disabled value="" className="text-theme-400">
              {placeholder}
            </option>

            {/* oxlint-disable-next-line jsx-a11y/control-has-associated-label */}
            <option disabled value="-" />
          </>
        )}

        {blocks.map((block, blockIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={blockIndex}>
            {blockIndex > 0 && <optgroup label="" />}

            {block.group === null ? (
              block.options.map((option, optionIndex) => (
                <SelectOption
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${blockIndex}.${optionIndex}.${option.value ?? option.title ?? "-"}`}
                  title={option.title}
                  value={option.value}
                  className={option.className}
                />
              ))
            ) : (
              <optgroup label={block.group}>
                {block.options.map((option, optionIndex) => (
                  <SelectOption
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${blockIndex}.${optionIndex}.${option.value ?? option.title ?? "-"}`}
                    title={option.title}
                    value={option.value}
                    className={option.className}
                  />
                ))}
              </optgroup>
            )}
          </Fragment>
        ))}
      </select>

      <div
        className={twMerge(
          "text-theme-500 pointer-events-none absolute top-1/2 right-4 -translate-y-1/2",
          arrowClassName,
        )}
      >
        <Icon type={faChevronDown} className="size-3" />
      </div>
    </div>
  );
}
