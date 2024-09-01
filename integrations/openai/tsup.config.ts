import { packageOptions } from "@systemfsoftware/trigger.dev_tsup";
import { defineConfig } from "@systemfsoftware/trigger.dev_tsup";

export default defineConfig({ ...packageOptions, config: "tsconfig.build.json" });
