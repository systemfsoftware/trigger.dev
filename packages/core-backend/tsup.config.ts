import { packageOptions, defineConfig } from "@trigger.dev/tsup";

export default defineConfig({
  ...packageOptions,
  entry: ["./src/index.mts"],
  config: "tsconfig.build.json",
});
