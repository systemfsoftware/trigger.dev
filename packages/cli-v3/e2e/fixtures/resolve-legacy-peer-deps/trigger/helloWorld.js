import { concat } from "lodash/array";
import { task } from "@systemfsoftware/trigger.dev_sdk/v3";

export const helloWorldTask = task({
  id: "hello-world",
  run: async (payload) => {
    console.log(concat(["Hello"], "World!").join(", "), payload);
  },
});
