import { range } from "@rheactor/rheactor-core";
import type { Meta, StoryObj } from "@storybook/react";

import { Counter } from "#/components/Surface/Counter/Counter";

export default {
  component: Counter,
} satisfies Meta<typeof Counter>;

export const Example: StoryObj<typeof Counter> = {
  render({ to, ...properties }) {
    return (
      <div className="grid gap-y-16">
        {range(1, 20).map((key) => (
          <Counter key={key} to={to * key} {...properties} />
        ))}
      </div>
    );
  },
  args: {
    from: 100,
    to: 123.5,
    decimals: 1,
    easing: "ease-out",
    thousandSeparator: ".",
    decimalSeparator: ",",
    className: "after:content-['_millions']",
  },
};
