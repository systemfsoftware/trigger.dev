import { task } from "@systemfsoftware/trigger.dev_sdk/v3";
import { MESSAGE } from "@compile-monorepo-packages-npm/message";

export const helloWorldTask = task({
  id: "hello-world",
  run: async (payload) => {
    console.log(MESSAGE, payload);
  },
});
