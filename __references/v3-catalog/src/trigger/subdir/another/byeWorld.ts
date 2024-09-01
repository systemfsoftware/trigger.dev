import { task } from "@systemfsoftware/trigger.dev_sdk/v3";

export const byeWorldSubdir = task({
  id: "bye-world-subdir-2",
  run: async (payload: { message: string }) => {
    return {
      bye: "worlds",
    };
  },
});
