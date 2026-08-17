import { faMagnifyingGlass } from "@rheactor/rheactor-font-awesome/classic-regular";
import { Icon } from "@rheactor/rheactor-font-awesome/react";
import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";

import { Button } from "#/components/Form/Button/Button";
import { Theme } from "#/components/Theme/Theme/Theme";
import { ThemeSpread } from "#/services/components/ThemeSpread";

export default {
  component: Button,
} satisfies Meta<typeof Button>;

export const SolidExample: StoryObj<typeof Button> = {
  render: (parameters) => (
    <div className="flex flex-wrap gap-4">
      <ThemeSpread>
        {(variant) => (
          <Button {...parameters}>
            <strong>Example: </strong>

            <span>{variant}</span>
          </Button>
        )}
      </ThemeSpread>
    </div>
  ),
};

export const SolidDisabledExample: StoryObj<typeof Button> = {
  render: (parameters) => (
    <div className="flex flex-wrap gap-4">
      <ThemeSpread>
        {(variant) => (
          <Button {...parameters}>
            <strong>Example: </strong>

            <span>{variant}</span>
          </Button>
        )}
      </ThemeSpread>
    </div>
  ),
  args: {
    disabled: true,
  },
};

export const OutlineExample: StoryObj<typeof Button> = {
  render: (parameters) => (
    <div className="flex flex-wrap gap-4">
      <ThemeSpread>
        {(variant) => (
          <Button {...parameters}>
            <strong>Example: </strong>

            <span>{variant}</span>
          </Button>
        )}
      </ThemeSpread>
    </div>
  ),
  args: {
    fill: "outline",
  },
};

export const OutlineDisabledExample: StoryObj<typeof Button> = {
  render: (parameters) => (
    <div className="flex flex-wrap gap-4">
      <ThemeSpread>
        {(variant) => (
          <Button {...parameters}>
            <strong>Example: </strong>

            <span>{variant}</span>
          </Button>
        )}
      </ThemeSpread>
    </div>
  ),
  args: {
    fill: "outline",
    disabled: true,
  },
};

export const TransparentExample: StoryObj<typeof Button> = {
  render: (parameters) => (
    <div className="flex flex-wrap gap-4">
      <ThemeSpread>
        {(variant) => (
          <Button {...parameters}>
            <strong>Example: </strong>

            <span>{variant}</span>
          </Button>
        )}
      </ThemeSpread>
    </div>
  ),
  args: {
    fill: "transparent",
  },
};

export const TransparentDisabledExample: StoryObj<typeof Button> = {
  render: (parameters) => (
    <div className="flex flex-wrap gap-4">
      <ThemeSpread>
        {(variant) => (
          <Button {...parameters}>
            <strong>Example: </strong>

            <span>{variant}</span>
          </Button>
        )}
      </ThemeSpread>
    </div>
  ),
  args: {
    fill: "transparent",
    disabled: true,
  },
};

export const LinkExample: StoryObj<typeof Button> = {
  args: {
    asChild: true,
    // oxlint-disable-next-line jsx-a11y/anchor-is-valid
    children: <a href="#">Link</a>,
    fill: "outline",
  },
};

export const LinkDisabledExample: StoryObj<typeof Button> = {
  args: {
    asChild: true,
    // oxlint-disable-next-line jsx-a11y/anchor-is-valid
    children: <a href="#">Link</a>,
    fill: "outline",
    disabled: true,
  },
};

export const IconExample: StoryObj<typeof Button> = {
  args: {
    children: <Icon type={faMagnifyingGlass} />,
  },
};

export const IconTextExample: StoryObj<typeof Button> = {
  args: {
    children: (
      <>
        <Icon type={faMagnifyingGlass} />

        <span>Example</span>
      </>
    ),
  },
};

export const IconTextReverseExample: StoryObj<typeof Button> = {
  args: {
    children: (
      <>
        <span>Example</span>

        <Icon type={faMagnifyingGlass} />
      </>
    ),
  },
};

export const AsChildFallbackExample: StoryObj<typeof Button> = {
  args: {
    asChild: true,
    children: "Example",
  },
};

function BrandBlueButton(parameters: ComponentProps<typeof Button>) {
  return (
    <Theme variant="brand-blue">
      <Button
        {...parameters}
        className="bg-theme-700 border-theme-800 theme-outline:bg-theme-100"
      />
    </Theme>
  );
}

function BrandGreenButton(parameters: ComponentProps<typeof Button>) {
  return (
    <Theme variant="brand-green">
      <Button {...parameters} className="bg-theme-400 border-theme-600 text-theme-950" />
    </Theme>
  );
}

function BrandYellowButton(parameters: ComponentProps<typeof Button>) {
  return (
    <Theme variant="brand-yellow">
      <Button {...parameters} className="bg-theme-300 border-theme-500 text-theme-950" />
    </Theme>
  );
}

export const BrandExample: StoryObj<typeof Button> = {
  render: (parameters) => (
    <div className="flex gap-4">
      <Button {...parameters}>Neutral</Button>

      <BrandBlueButton {...parameters}>Brand Blue</BrandBlueButton>

      <BrandBlueButton {...parameters} fill="outline">
        Brand Blue
      </BrandBlueButton>

      <BrandGreenButton {...parameters}>Brand Green</BrandGreenButton>

      <BrandYellowButton {...parameters}>Brand Yellow</BrandYellowButton>
    </div>
  ),
};
