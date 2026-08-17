import "#storybook/preview.css";
import type { Preview } from "@storybook/react";

// oxlint-disable-next-line react/only-export-components
export default {
  tags: ["autodocs"],
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: { width: "320px", height: "640px" },
        },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" },
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1400px", height: "1024px" },
        },
      },
    },
    controls: {
      expanded: true,
      disableSaveFromUI: true,
    },
    backgrounds: {
      grid: {
        cellSize: 4,
        cellAmount: 4,
        opacity: 0.1,
      },
    },
  },
  argTypesEnhancers: [
    (context) => {
      for (const argumentType of Object.values(context.argTypes)) {
        argumentType.mapping ??= {};

        if (argumentType.type !== undefined) {
          if (
            argumentType.type.name === "enum" &&
            argumentType.type.value.includes("ReactPortal")
          ) {
            argumentType.control = { disable: true };
            argumentType.table!.type!.summary = "ReactNode";
          } else if (
            argumentType.type.name === "enum" &&
            argumentType.type.value.includes("string")
          ) {
            argumentType.control = { type: "text" };
          } else if (
            argumentType.type.name === "enum" &&
            argumentType.type.value.includes("false") &&
            argumentType.type.value.includes("true")
          ) {
            argumentType.mapping["true"] = true;
            argumentType.mapping["false"] = false;
          }
        }
      }

      return context.argTypes;
    },
  ],
} satisfies Preview;
