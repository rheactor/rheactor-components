import type { Meta, StoryObj } from "@storybook/react";

import { FlipCard } from "#/components/Surface/FlipCard/FlipCard";

export default {
  component: FlipCard,
} satisfies Meta<typeof FlipCard>;

export const FlipToRightExample: StoryObj<typeof FlipCard> = {
  render: (parameters) => (
    <div className="h-32 w-32 bg-slate-200">
      <FlipCard {...parameters} />
    </div>
  ),
  args: {
    contentFront: <div className="rounded bg-black p-4 text-white">Front</div>,
    contentBack: <div className="rounded bg-white p-8">Back</div>,
  },
};

export const FlipToLeftExample: StoryObj<typeof FlipCard> = {
  render: (parameters) => (
    <div className="h-32 w-32 bg-slate-200">
      <FlipCard {...parameters} />
    </div>
  ),
  args: {
    flipTo: "left",
    contentFront: (
      <div className="flex size-full items-center justify-center rounded bg-black text-white">
        Front
      </div>
    ),
    contentBack: (
      <div className="flex size-full items-center justify-center rounded bg-white">Back</div>
    ),
  },
};

export const AxisVerticalExample: StoryObj<typeof FlipCard> = {
  render: (parameters) => (
    <div className="h-32 w-32 bg-slate-200">
      <FlipCard {...parameters} />
    </div>
  ),
  args: {
    axis: "vertical",
    touchIconClassName: "bg-blue-500",
    contentFront: (
      <div className="flex size-full items-center justify-center rounded bg-black text-white">
        Front
      </div>
    ),
    contentBack: (
      <div className="flex size-full items-center justify-center rounded bg-white">Back</div>
    ),
  },
};

export const HeightControllerBackExample: StoryObj<typeof FlipCard> = {
  render: (parameters) => (
    <div className="w-32 bg-slate-200">
      <FlipCard {...parameters} />
    </div>
  ),
  args: {
    axis: "vertical",
    heightController: "back",
    contentFront: (
      <div className="flex size-full items-center justify-center rounded bg-black text-white">
        Front Front Front Front Front Front Front Front Front Front Front Front Front Front Front
        Front Front Front Front Front Front Front Front Front Front Front Front Front Front Front
        Front Front Front Front Front Front
      </div>
    ),
    contentBack: (
      <div className="flex size-full items-center justify-center rounded bg-white">
        Back Back Back Back Back Back Back Back Back Back Back Back Back Back Back Back Back Back
        Back Back Back Back Back Back Back Back Back Back
      </div>
    ),
  },
};
