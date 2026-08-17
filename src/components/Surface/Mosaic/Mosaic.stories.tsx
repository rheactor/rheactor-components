import { range } from "@rheactor/rheactor-core";
import type { Meta, StoryObj } from "@storybook/react";

import { Mosaic } from "#/components/Surface/Mosaic/Mosaic";

export default {
  component: Mosaic,
} satisfies Meta<typeof Mosaic>;

export const Example: StoryObj<typeof Mosaic> = {
  args: {
    duration: 2500,
    shuffle: true,
    className: "sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4",
    children: range(1, 21).map((value) => (
      <div
        className="flex aspect-video items-center justify-center rounded border shadow-lg outline"
        key={value}
      >
        {value}
      </div>
    )),
  },
};
