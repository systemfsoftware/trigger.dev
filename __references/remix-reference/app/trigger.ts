import { TriggerClient } from "@systemfsoftware/trigger.dev_sdk";

export const client = new TriggerClient({
  id: "remix-test",
  apiKey: process.env.TRIGGER_API_KEY,
});
