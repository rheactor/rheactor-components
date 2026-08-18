import { defineConfig } from "tsdown";

// oxlint-disable-next-line import/no-anonymous-default-export
export default defineConfig({
  minify: true,
  entry: [
    "src/index-client-next.ts",
    "src/index-client-slider.ts",
    "src/index-client-style.ts",
    "src/index-client-third.ts",
    "src/index-client-media.ts",
    "src/index-client.ts",
    "src/index-dom.ts",
    "src/index-next.ts",
    "src/index-media.ts",
    "src/index.ts",
  ],
  platform: "browser",
  deps: { neverBundle: true },
  tsconfig: "./tsconfig.build.json",
});
