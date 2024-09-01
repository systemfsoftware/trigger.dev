import { packageOptions, defineConfig } from "@systemfsoftware/trigger.dev_tsup";

export default defineConfig({
  ...packageOptions,
  config: "tsconfig.build.json",
});
