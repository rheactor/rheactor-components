import type { Meta, StoryObj } from "@storybook/react";

import { Container } from "#/components/Primitive/Container/Container";
import { Hero } from "#/components/Surface/Hero/Hero";
import { Media } from "#/components/Surface/Media/Media";

export default {
  component: Hero,
} satisfies Meta<typeof Hero>;

export const Example: StoryObj<typeof Hero> = {
  args: {
    backgroundContent: (
      <Media
        className="absolute size-full object-cover"
        src="/assets/video-example-1.webm"
        background
      />
    ),
    children: (
      <Container
        className="flex min-h-64 items-center justify-center bg-black/25 p-16 text-center text-2xl font-bold text-white backdrop-blur-md"
        fluid
      >
        Example
      </Container>
    ),
  },
};
