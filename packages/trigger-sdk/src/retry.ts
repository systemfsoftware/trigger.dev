import type { RetryOptions } from "@systemfsoftware/trigger.dev_core";
import { calculateRetryAt } from "@systemfsoftware/trigger.dev_core";

export { calculateRetryAt };
export type { RetryOptions };

export const retry = {
  standardBackoff: {
    limit: 8,
    factor: 1.8,
    minTimeoutInMs: 500,
    maxTimeoutInMs: 30000,
    randomize: true,
  },
  exponentialBackoff: {
    limit: 8,
    factor: 2,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 30000,
    randomize: true,
  },
} as const satisfies Record<string, RetryOptions>;
