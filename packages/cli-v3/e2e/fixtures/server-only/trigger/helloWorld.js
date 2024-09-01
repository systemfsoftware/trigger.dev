import "server-only";
import { task } from "@systemfsoftware/trigger.dev_sdk/v3";

export const helloWorldTask = task({
  id: "hello-world",
  run: async (payload) => {
    console.log("Hello, World!", payload);
  },
});
