import type { Meta, StoryObj } from "@storybook/react";

import { Section } from "#/components/Primitive/Section/Section";

export default {
  component: Section,
} satisfies Meta<typeof Section>;

export const Example: StoryObj<typeof Section> = {
  render: (parameters) => (
    <>
      <Section {...parameters} />

      <Section {...parameters} />

      <Section {...parameters} />
    </>
  ),
  args: {
    children: "Example",
    className: "outline",
  },
};

export const NoMarginExample: StoryObj<typeof Section> = {
  render: (parameters) => (
    <>
      <Section {...parameters} />

      <Section {...parameters} />

      <Section {...parameters} />
    </>
  ),
  args: {
    children: "Example",
    className: "outline",
    marginY: 0,
  },
};
