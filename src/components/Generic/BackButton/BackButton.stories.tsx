import type { Meta, StoryObj } from "@storybook/react";

import { BackButton } from "#/components/Generic/BackButton/BackButton";

export default {
  component: BackButton,
} satisfies Meta<typeof BackButton>;

export const Example: StoryObj<typeof BackButton> = {
  args: {
    fallbackRoute: "https://google.com",
  },
};
