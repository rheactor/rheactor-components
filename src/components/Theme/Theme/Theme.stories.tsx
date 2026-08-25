import { twMerge } from "@rheactor/rheactor-core/tailwind";
import type { Meta, StoryObj } from "@storybook/react";

import { Theme } from "#/components/Theme/Theme/Theme";
import { variants } from "#/supports/ThemeSupport";

export default {
  component: Theme,
} satisfies Meta<typeof Theme>;

function PseudoElement() {
  return <div className="bg-theme-50">Example</div>;
}

export const Example: StoryObj<typeof Theme> = {
  args: {
    variant: "green",
    children: (
      <div className="flex flex-wrap gap-4">
        <div className="text-theme-800 bg-theme-200 border-theme-600/25 shadow-theme-800/10 hover:bg-theme-300 active:bg-theme-400 inline-block w-full cursor-pointer rounded border p-5 text-center shadow transition select-none">
          example
        </div>

        {Object.entries(variants).map(([variantKey, variantClassname]) => (
          <div
            key={variantKey}
            className={twMerge(
              "text-theme-800 bg-theme-200 border-theme-600/25 shadow-theme-800/10 hover:bg-theme-300 active:bg-theme-400 inline-block flex-auto cursor-pointer rounded border p-1 px-3 text-center shadow transition select-none",
              variantClassname,
            )}
          >
            {variantKey}
          </div>
        ))}
      </div>
    ),
  },
};

export const NoThemeExample: StoryObj<typeof Theme> = {
  render: () => (
    <div className="text-theme-800 bg-theme-200 border-theme-600/25 shadow-theme-800/10 hover:bg-theme-300 active:bg-theme-400 inline-block w-full cursor-pointer rounded border p-5 text-center shadow transition select-none">
      example
    </div>
  ),
};

export const PseudoElementExample: StoryObj<typeof Theme> = {
  args: {
    variant: "green",
    children: <PseudoElement />,
  },
};
