import { range } from "@rheactor/rheactor-core";
import { faLeftLong } from "@rheactor/rheactor-font-awesome/classic-regular";
import type { Meta, StoryObj } from "@storybook/react";

import { Container } from "#/components/Primitive/Container/Container";
import { FlipCard } from "#/components/Surface/FlipCard/FlipCard";
import { Slider } from "#/components/Surface/Slider/Slider";

export default {
  component: Slider,
} satisfies Meta<typeof Slider>;

function CardExample({ number, total }: { number: number; total: number }) {
  return (
    <div className="flex aspect-video items-center justify-center rounded border bg-white">
      {`${number} / ${total}`}
    </div>
  );
}

const cards = range(1, 50).map((number, _, array) => (
  <CardExample key={number} number={number} total={array.length} />
));

export const Example: StoryObj<typeof Slider> = {
  args: {
    children: cards,
  },
};

export const EmptyExample: StoryObj<typeof Slider> = {};

export const FlipCardsExample: StoryObj<typeof Slider> = {
  args: {
    items: { xs: 2, sm: 5 },
    paginationCompressed: false,
    children: range(1, 10).map((number) => (
      <FlipCard
        key={number}
        // oxlint-disable-next-line react-perf/jsx-no-jsx-as-prop
        contentFront={<div className="rounded bg-black p-16 text-white">Front {number}</div>}
        // oxlint-disable-next-line react-perf/jsx-no-jsx-as-prop
        contentBack={<div className="rounded bg-white p-8">Back</div>}
      />
    )),
  },
};

export const FlipCardsExampleTwo: StoryObj<typeof Slider> = {
  args: {
    items: { xs: 2, sm: 5 },
    paginationCompressed: false,
    children: range(1, 3).map((number) => (
      <FlipCard
        key={number}
        // oxlint-disable-next-line react-perf/jsx-no-jsx-as-prop
        contentFront={<div className="rounded bg-black p-16 text-white">Front {number}</div>}
        // oxlint-disable-next-line react-perf/jsx-no-jsx-as-prop
        contentBack={<div className="rounded bg-white p-8">Back</div>}
      />
    )),
  },
};

export const DurationExample: StoryObj<typeof Slider> = {
  args: {
    children: cards,
    duration: 1000,
  },
};

export const BreakpointsExample: StoryObj<typeof Slider> = {
  args: {
    children: cards,
    items: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5, "2xl": 6 },
    gap: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5, "2xl": 6 },
  },
};

export const InfinityOffExample: StoryObj<typeof Slider> = {
  args: {
    children: cards,
    items: 3,
    infinity: false,
  },
};

export const StretchOffExample: StoryObj<typeof Slider> = {
  args: {
    children: [...cards.slice(0, 3), false, null, undefined],
    items: 5,
    stretch: false,
  },
};

export const StretchOffCenteredOffExample: StoryObj<typeof Slider> = {
  args: {
    children: cards.slice(0, 4),
    items: 5,
    stretch: false,
    centered: false,
  },
};

export const StretchOffFullExample: StoryObj<typeof Slider> = {
  args: {
    children: cards.slice(0, 5),
    items: 5,
    stretch: false,
  },
};

export const StretchOffFullExampleTwo: StoryObj<typeof Slider> = {
  args: {
    children: cards,
    items: 5,
    stretch: false,
  },
};

export const ClassNameExample: StoryObj<typeof Slider> = {
  args: {
    children: cards,
    items: 5,
    className: "bg-red-400",
    arrowsClassName: "bg-blue-400",
    paginationClassName: "bg-green-400",
  },
};

export const ArrowsIconExample: StoryObj<typeof Slider> = {
  args: {
    children: cards,
    items: 5,
    arrowsIcon: faLeftLong,
  },
};

export const ArrowsPlacementExample: StoryObj<typeof Slider> = {
  render: (parameters) => (
    <Container>
      <Slider {...parameters} />
    </Container>
  ),
  args: {
    children: cards,
    items: 5,
    arrowsPlacement: "external",
    arrowsPlacementFallback: "internal",
  },
};

export const ArrowsStepModeBatchExample: StoryObj<typeof Slider> = {
  args: {
    children: cards,
    items: 5,
    arrowsStepMode: "batch",
  },
};

export const PaginationExample: StoryObj<typeof Slider> = {
  args: {
    children: cards,
    items: 5,
    pagination: "overlay",
    paginationCompressed: false,
  },
};

export const PaginationLimitExample: StoryObj<typeof Slider> = {
  args: {
    children: cards,
    items: 5,
    paginationLimit: 3,
  },
};

export const IssueExampleOne: StoryObj<typeof Slider> = {
  args: {
    children: cards.slice(0, 6),
    items: { xs: 1, md: 2, lg: 3 },
    arrowsStepMode: "batch",
  },
};
