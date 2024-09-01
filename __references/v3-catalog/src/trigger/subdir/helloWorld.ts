import { task } from "@systemfsoftware/trigger.dev_sdk/v3";

export const helloWorldSubdir = task({
  id: "hello-world-subdir-2",
  run: async (payload: { message: string }) => {
    return {
      hello: "worlds",
    };
  },
});
