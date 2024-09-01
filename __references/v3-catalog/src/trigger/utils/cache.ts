import { InMemoryCache, createCache } from "@systemfsoftware/trigger.dev_sdk/v3";

export const cache = createCache(new InMemoryCache());

export const fakeTask = {
  id: "this-task-doesnt-exist",
};
