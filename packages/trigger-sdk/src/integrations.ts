import { ConnectionAuth, IntegrationMetadata } from "@systemfsoftware/trigger.dev_core";
import { IO } from "./io";
import { Prettify } from "@systemfsoftware/trigger.dev_core";
export type { ConnectionAuth } from "@systemfsoftware/trigger.dev_core";

export interface TriggerIntegration {
  id: string;
  metadata: IntegrationMetadata;
  authSource: "LOCAL" | "HOSTED";
  cloneForRun: (io: IO, connectionKey: string, auth?: ConnectionAuth) => TriggerIntegration;
}

export type IOWithIntegrations<TIntegrations extends Record<string, TriggerIntegration>> = IO &
  TIntegrations;

export type IntegrationTaskKey = string | any[];
