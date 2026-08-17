import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "#/components/Form/Select/Select";

export default {
  component: Select,
} satisfies Meta<typeof Select>;

export const Example: StoryObj<typeof Select> = {
  args: {
    placeholder: "Example Placeholder",
    options: [
      { title: "Option 1" },
      { title: "Option 2" },
      { title: "Option 3" },
      {},
      {
        title:
          "Very Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Option",
        className: "bg-green-200",
      },
    ],
  },
};

export const Grouped: StoryObj<typeof Select> = {
  args: {
    placeholder: "Example Placeholder",
    options: [
      { title: "Option 1", group: "Group A" },
      { title: "Option 2", group: "Group A" },
      null,
      { title: "Option 3", group: "Group A" },
      { title: "Option 4", group: "Group B" },
      { title: "Option 5" },
      { title: "Option 6" },
      null,
      { title: "Option 7" },
      { title: "Option 8" },
      { title: "Option 9", group: "Group A" },
    ],
  },
};
