import type { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";

import { Header } from "#/components/Header/Header/Header";
import { HeaderContainer } from "#/components/Header/HeaderContainer/HeaderContainer";
import { HeaderNav } from "#/components/Header/HeaderNav/HeaderNav";

export default {
  component: Header,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Header>;

function HeaderContainerFixture() {
  return (
    <HeaderContainer>
      <Image
        src="/assets/storybook.svg"
        alt="Storybook"
        unoptimized
        width={100}
        height={0}
        className="group-stuck:w-20 transition-all"
      />

      <HeaderNav
        // eslint-disable-next-line react/no-unstable-nested-components
        openedModalContent={(handleClose) => (
          <div className="bg-theme-950/75 fixed inset-0 z-10 flex flex-col items-center justify-center gap-y-4 text-white backdrop-blur-md transition starting:opacity-0">
            <div onClick={handleClose} className="cursor-pointer hover:underline">
              Close (onClick)
            </div>

            {/* oxlint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="cursor-pointer hover:underline">Close (A)</a>
          </div>
        )}
        closedIconClassName="text-red-700"
      >
        <li className="font-bold">Home</li>

        <li>About us</li>

        <li>Articles</li>

        <li>News</li>

        <li>Features</li>

        <li>Comparison</li>

        <li>Downloads</li>

        <li>Contact</li>
      </HeaderNav>
    </HeaderContainer>
  );
}

function defaultRender(parameters: Parameters<NonNullable<StoryObj<typeof Header>["render"]>>[0]) {
  return (
    <>
      <Header {...parameters} />

      <div className="h-[200vh] bg-blue-100 p-4">
        <div className="h-32 w-32 outline">Example</div>
      </div>
    </>
  );
}

export const RelativeExample: StoryObj<typeof Header> = {
  render: defaultRender,
  args: {
    className:
      "border-b border-theme-300 shadow-xs/5 min-h-12 stuck:min-h-10 transition-all group stuck:text-sm",
    children: <HeaderContainerFixture />,
  },
};

export const StaticExample: StoryObj<typeof Header> = {
  render: defaultRender,
  args: {
    position: "static",
    className:
      "border-b border-theme-300 shadow-xs/5 min-h-12 stuck:min-h-10 transition-all group stuck:text-sm",
    children: <HeaderContainerFixture />,
  },
};

export const AbsoluteExample: StoryObj<typeof Header> = {
  render: defaultRender,
  args: {
    position: "absolute",
    className:
      "border-b border-theme-300 shadow-xs/5 min-h-12 stuck:min-h-10 transition-all group stuck:text-sm",
    children: <HeaderContainerFixture />,
  },
};

export const StickyExample: StoryObj<typeof Header> = {
  render: defaultRender,
  args: {
    position: "sticky",
    className:
      "border-b border-theme-300 shadow-xs/5 min-h-12 stuck:min-h-10 transition-all group stuck:text-sm",
    children: <HeaderContainerFixture />,
  },
};

export const FixedExample: StoryObj<typeof Header> = {
  render: defaultRender,
  args: {
    position: "fixed",
    className:
      "border-b border-theme-300 shadow-xs/5 min-h-12 stuck:min-h-10 transition-all group stuck:text-sm",
    children: <HeaderContainerFixture />,
  },
};

export const SimplifiedExample: StoryObj<typeof Header> = {
  render(parameters) {
    return (
      <>
        <Header {...parameters} />

        <div className="h-screen bg-blue-100 p-4">
          <div className="h-32 w-32 outline">Example</div>
        </div>
      </>
    );
  },
  args: {
    position: "fixed",
    className:
      "border-b border-theme-300 shadow-xs/5 min-h-12 stuck:min-h-10 transition-all group stuck:text-sm",
    children: <HeaderContainerFixture />,
  },
};
