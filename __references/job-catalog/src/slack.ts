import { createExpressServer } from "@systemfsoftware/trigger.dev_express";
import { TriggerClient, eventTrigger } from "@systemfsoftware/trigger.dev_sdk";
import { Slack } from "@systemfsoftware/trigger.dev_slack";

export const slack = new Slack({ id: "slack" });

export const client = new TriggerClient({
  id: "job-catalog",
  apiKey: process.env["TRIGGER_API_KEY"],
  apiUrl: process.env["TRIGGER_API_URL"],
  verbose: false,
  ioLogLocalEnabled: true,
});

client.defineJob({
  id: "slack-example-1",
  name: "Slack Example 1",
  version: "1.0.0",
  trigger: eventTrigger({
    name: "slack.example",
  }),
  integrations: {
    slack,
  },
  run: async (payload, io, ctx) => {
    const message = await io.slack.postMessage("Slack 📝", {
      channel: "C04GWUTDC3W",
      text: "Welcome to the team, Eric!",
    });
  },
});

createExpressServer(client);
