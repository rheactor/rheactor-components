import type { Meta, StoryObj } from "@storybook/react";

import { Form } from "#/components/Form/Form/Form";
import { Input } from "#/components/Form/Input/Input";
import { Label } from "#/components/Form/Label/Label";

export default {
  component: Form,
} satisfies Meta<typeof Form>;

export const Example: StoryObj<typeof Form> = {
  args: {
    children: "Example",
  },
};

export const FocusableExample: StoryObj<typeof Form> = {
  args: {
    className: "group",
    children: (
      <Label
        title="Example"
        primaryPlaceholder="Before Focus Example"
        titleClassName="not-group-data-focused:hidden"
      >
        <Input placeholder="Focused Example" />
      </Label>
    ),
  },
};
