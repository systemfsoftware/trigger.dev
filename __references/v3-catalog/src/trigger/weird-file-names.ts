import { task } from "@systemfsoftware/trigger.dev_sdk/v3";

export const weirdFileName = task({
  id: "weird-file-name",
  run: async (payload: { url: string }) => {},
});
