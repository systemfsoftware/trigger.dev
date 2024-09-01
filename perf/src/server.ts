import { triggerClient } from "./trigger";
import { createExpressServer } from "@systemfsoftware/trigger.dev_express";

const app = createExpressServer(
  triggerClient,
  process.env.PORT ? parseInt(process.env.PORT) : 3000
);
