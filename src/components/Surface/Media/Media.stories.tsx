import type { Meta, StoryObj } from "@storybook/react";

import { Media } from "#/components/Surface/Media/Media";
import ExampleSvg from "#assets/storybook.svg";
import ExampleImage from "#assets/storybook.webp";
import ExampleVideoLocal from "#assets/video-example-1.webm";
import ExampleVideoLocalPoster from "#assets/video-example-1.webp";

export default {
  component: Media,
} satisfies Meta<typeof Media>;

export const ImageExample: StoryObj<typeof Media> = {
  args: {
    src: "/assets/storybook.webp",
    alt: "Storybook",
    priority: false,
  },
};

export const ImageSpotExample: StoryObj<typeof Media> = {
  args: {
    src: "/assets/storybook.webp",
    alt: "Storybook",
    className: "w-30 h-32 object-cover",
    spot: { x: 100.5, y: 0 },
    priority: true,
  },
};

export const SvgExample: StoryObj<typeof Media> = {
  args: {
    src: "/assets/storybook.svg",
    alt: "Storybook",
  },
};

export const VideoLocalProtectExample: StoryObj<typeof Media> = {
  args: {
    src: "/assets/video-example-1.webm",
    posterSrc: "/assets/video-example-1.webp",
    className: "rounded max-w-64 outline shadow-md",
    protect: true,
  },
};

export const VideoLocalBackgroundExample: StoryObj<typeof Media> = {
  args: {
    src: "/assets/video-example-1.webm",
    className: "rounded max-w-64 outline shadow-md",
    background: true,
  },
};

export const VideoRemoteExample: StoryObj<typeof Media> = {
  args: {
    src: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
    className: "w-128",
  },
};

export const VideoRemoteButtonOpacityExample: StoryObj<typeof Media> = {
  args: {
    src: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
    className: "w-128",
    playOpacity: 0.75,
  },
};

export const VideoRemoteButtonDiagonalExample: StoryObj<typeof Media> = {
  args: {
    src: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
    className: "w-128",
    playPosition: "bottom-right",
  },
};

export const VideoRemoteButtonHiddenExample: StoryObj<typeof Media> = {
  args: {
    src: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
    className: "w-128",
    playPosition: false,
  },
};

export const StaticImageExample: StoryObj<typeof Media> = {
  args: {
    src: ExampleImage,
    alt: "Storybook",
    priority: true,
  },
};

export const StaticSvgExample: StoryObj<typeof Media> = {
  args: {
    src: ExampleSvg,
    alt: "Storybook",
  },
};

export const StaticVideoLocalExample: StoryObj<typeof Media> = {
  args: {
    src: ExampleVideoLocal,
    posterSrc: ExampleVideoLocalPoster,
  },
};

export const BrokenExample: StoryObj<typeof Media> = {
  args: {
    src: "example.unsupported" as never,
  },
};
