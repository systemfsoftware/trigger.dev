import { TriggerTracer } from "@systemfsoftware/trigger.dev_core/v3";
import * as packageJson from "../../package.json";

export const tracer = new TriggerTracer({ name: "@systemfsoftware/trigger.dev_sdk", version: packageJson.version });
