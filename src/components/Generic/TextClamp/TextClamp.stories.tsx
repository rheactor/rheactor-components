import type { Meta, StoryObj } from "@storybook/react";

import { TextClamp } from "#/components/Generic/TextClamp/TextClamp";

export default {
  component: TextClamp,
} satisfies Meta<typeof TextClamp>;

export const Example: StoryObj<typeof TextClamp> = {
  args: {
    lines: 2,
    children: "Example ".repeat(200),
  },
};
