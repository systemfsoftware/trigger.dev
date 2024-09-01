import type { LogLevel } from "@systemfsoftware/trigger.dev_core-backend";
import { Logger } from "@systemfsoftware/trigger.dev_core-backend";
import { sensitiveDataReplacer } from "./sensitiveDataReplacer";
import { AsyncLocalStorage } from "async_hooks";
import { getHttpContext } from "./httpAsyncStorage.server";

const currentFieldsStore = new AsyncLocalStorage<Record<string, unknown>>();

export function trace<T>(fields: Record<string, unknown>, fn: () => T): T {
  return currentFieldsStore.run(fields, fn);
}

export const logger = new Logger(
  "webapp",
  (process.env.APP_LOG_LEVEL ?? "debug") as LogLevel,
  ["examples", "output", "connectionString", "payload"],
  sensitiveDataReplacer,
  () => {
    const fields = currentFieldsStore.getStore();
    const httpContext = getHttpContext();
    return { ...fields, http: httpContext };
  }
);

export const workerLogger = new Logger(
  "worker",
  (process.env.APP_LOG_LEVEL ?? "debug") as LogLevel,
  ["examples", "output", "connectionString"],
  sensitiveDataReplacer,
  () => {
    const fields = currentFieldsStore.getStore();
    return fields ? { ...fields } : {};
  }
);

export const socketLogger = new Logger(
  "socket",
  (process.env.APP_LOG_LEVEL ?? "debug") as LogLevel,
  [],
  sensitiveDataReplacer,
  () => {
    const fields = currentFieldsStore.getStore();
    return fields ? { ...fields } : {};
  }
);
