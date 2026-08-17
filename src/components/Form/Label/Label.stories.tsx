import type { Meta, StoryObj } from "@storybook/react";

import { Form } from "#/components/Form/Form/Form";
import { Label } from "#/components/Form/Label/Label";

export default {
  component: Label,
} satisfies Meta<typeof Label>;

export const Example: StoryObj<typeof Label> = {
  args: {
    title: "Example",
    children: <input type="text" className="w-full outline" />,
  },
};

export const RequiredExample: StoryObj<typeof Label> = {
  render(properties) {
    return (
      <Form>
        <Label {...properties} size={12} />

        <Label {...properties} />

        <Label {...properties} />
      </Form>
    );
  },
  args: {
    title: "Example",
    required: true,
    size: 6,
    children: <input type="text" required className="w-full outline" />,
  },
};

export const UntitledExample: StoryObj<typeof Label> = {
  args: {
    children: <input type="text" required className="w-full outline" />,
  },
};
