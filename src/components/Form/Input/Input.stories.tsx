import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "#/components/Form/Input/Input";

export default {
  component: Input,
} satisfies Meta<typeof Input>;

export const Example: StoryObj<typeof Input> = {
  args: {
    placeholder: "Example",
  },
};

export const HiddenExample: StoryObj<typeof Input> = {
  args: {
    type: "hidden",
  },
};
