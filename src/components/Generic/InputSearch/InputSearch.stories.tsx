import type { Meta, StoryObj } from "@storybook/react";

import { InputSearch } from "#/components/Generic/InputSearch/InputSearch";

export default {
  component: InputSearch,
} satisfies Meta<typeof InputSearch>;

export const Example: StoryObj<typeof InputSearch> = {
  args: {
    inputPlaceholder: "Type to search...",
  },
};
