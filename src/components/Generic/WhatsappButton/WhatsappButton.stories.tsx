import type { Meta, StoryObj } from "@storybook/react";

import { WhatsappButton } from "#/components/Generic/WhatsappButton/WhatsappButton";

export default {
  component: WhatsappButton,
} satisfies Meta<typeof WhatsappButton>;

export const Example: StoryObj<typeof WhatsappButton> = {
  args: {
    phone: "+55 99 99999-9999",
  },
};

export const PrefixedExample: StoryObj<typeof WhatsappButton> = {
  args: {
    title: "Call Me",
    phone: "(99) 99999-9999",
    phonePrefix: "+55",
  },
};
