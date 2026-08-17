import type { Meta, StoryObj } from "@storybook/react";

import { BackTopButton } from "#/components/Generic/BackTopButton/BackTopButton";

export default {
  component: BackTopButton,
} satisfies Meta<typeof BackTopButton>;

export const Example: StoryObj<typeof BackTopButton> = {
  render(parameters) {
    return (
      <>
        <div className="h-[200vh]" />

        <BackTopButton {...parameters} />
      </>
    );
  },
};
