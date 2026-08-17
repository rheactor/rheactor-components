import { range } from "@rheactor/rheactor-core";
import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";

import { Animate } from "#/components/Animate/Animate/Animate";

export default {
  component: Animate,
} satisfies Meta<typeof Animate>;

function exampleRender(parameters: ComponentProps<typeof Animate>) {
  return (
    <div className="flex flex-col items-center justify-center gap-16">
      <Animate {...parameters} />

      <Animate {...parameters} />

      <Animate {...parameters} />

      <Animate {...parameters} />

      <Animate {...parameters} />

      <Animate {...parameters} />

      <Animate {...parameters} />

      <Animate {...parameters} />

      <Animate {...parameters} />

      <Animate {...parameters} />

      <Animate {...parameters} />

      <Animate {...parameters} />

      <Animate {...parameters} />

      <Animate {...parameters} />
    </div>
  );
}

function PseudoComponent() {
  return <div>Example</div>;
}

export const Example: StoryObj<typeof Animate> = {
  render: exampleRender,
  args: {
    always: true,
    effect: "slideUp",
    children: <div className="w-max rounded bg-blue-600 p-8 text-white">Example</div>,
  },
};

export const DistancePixels: StoryObj<typeof Animate> = {
  render: exampleRender,
  args: {
    always: true,
    effect: "slideRight",
    distance: "10px",
    children: <div className="w-max rounded bg-blue-600 p-8 text-white">Example</div>,
  },
};

export const SubComponentExample: StoryObj<typeof Animate> = {
  args: {
    effect: "slideDown",
    children: <PseudoComponent />,
  },
};

export const IssueOneRelativeIssue: StoryObj<typeof Animate> = {
  render(properties) {
    return (
      <div className="grid gap-y-16">
        {range(0, 20).map((key) => (
          <div className="relative" key={key}>
            <Animate {...properties} />
          </div>
        ))}
      </div>
    );
  },
  args: {
    effect: "slideRight",
    children: <PseudoComponent />,
  },
};
