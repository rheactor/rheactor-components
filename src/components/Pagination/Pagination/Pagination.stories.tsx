import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import { Pagination } from "#/components/Pagination/Pagination/Pagination";

export default {
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export const Example: StoryObj<typeof Pagination> = {
  args: {
    current: 3,
    total: 12,
    visibleCount: 7,
  },
};

export const NoFirstLastExample: StoryObj<typeof Pagination> = {
  args: {
    current: 8,
    total: 12,
    visibleCount: 7,
    firstLast: false,
    previousNext: false,
  },
};

export const SpreadExample: StoryObj<typeof Pagination> = {
  args: {
    current: 8,
    total: 12,
    visibleCount: 9,
    spread: 3,
  },
};

export const SpreadCyclicExample: StoryObj<typeof Pagination> = {
  args: {
    current: 9,
    total: 10,
    spread: 3,
  },
};

export const ForceRenderExample: StoryObj<typeof Pagination> = {
  args: {
    current: 1,
    total: 1,
    forceRender: true,
  },
};

export const ArrowsExample: StoryObj<typeof Pagination> = {
  args: {
    current: 1,
    total: 10,
    visibleCount: 3,
  },
};

export const CustomizeExample: StoryObj<typeof Pagination> = {
  args: {
    current: 1,
    total: 10,
    visibleCount: 3,
    className: "bg-theme-50 py-2",
    pageClassName: "bg-theme-500 text-white",
  },
};

export const QueryStringExample: StoryObj<typeof Pagination> = {
  args: {
    current: 1,
    total: 10,
    visibleCount: 3,
    queryString: "page",
  },
};

export const ClickExample: StoryObj<typeof Pagination> = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText("2"));

    await waitFor(async () => {
      await expect(args.onClick).toHaveBeenCalledWith(2);
    });
  },
  args: {
    current: 1,
    total: 10,
    visibleCount: 3,
    onClick: () => {
      fn();
    },
  },
};
