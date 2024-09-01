import { TriggerClient } from "@systemfsoftware/trigger.dev_sdk";

export const client = new TriggerClient({
  id: "${endpointSlug}",
  apiKey: process.env.TRIGGER_API_KEY,
  apiUrl: process.env.TRIGGER_API_URL,
});
