import type { Meta, StoryObj } from "@storybook/react";

import { Share } from "#/components/Generic/Share/Share";

export default {
  component: Share,
} satisfies Meta<typeof Share>;

export const Example: StoryObj<typeof Share> = {};

export const ModifiedExample: StoryObj<typeof Share> = {
  args: {
    text: "Example:",
    title: "Example",
    url: "https://google.com",
    networks: ["x", "facebook", "linkedin"],
    className: "bg-blue-100 text-blue-800",
    networkClassName: "bg-blue-600 data-[network=linkedin]:bg-red-600",
  },
};
