import { DisplayProperty } from "@systemfsoftware/trigger.dev_core";
import { ErrorWithStack, SchemaError, type ServerTask } from "@systemfsoftware/trigger.dev_core";
import { Schema as S } from "@effect/schema";

export class ResumeWithTaskError extends S.TaggedError<ResumeWithTaskError>()(
  "ResumeWithTaskError",
  {
    task: S.Any,
  }
) {
  constructor(readonly task: ServerTask) {
    super({ task });
  }
}

export class ResumeWithParallelTaskError extends S.TaggedError<ResumeWithParallelTaskError>()(
  "ResumeWithParallelTaskError",
  {
    task: S.Any,
    childErrors: S.Any,
  }
) {
  constructor(
    readonly task: ServerTask,
    readonly childErrors: ReadonlyArray<TriggerInternalError>
  ) {
    super({ task, childErrors });
  }
}

export class RetryWithTaskError extends S.TaggedError<RetryWithTaskError>()("RetryWithTaskError", {
  cause: S.Any,
  task: S.Any,
  retryAt: S.Date,
}) {
  constructor(
    readonly cause: ErrorWithStack,
    readonly task: ServerTask,
    readonly retryAt: Date
  ) {
    super({ cause, task, retryAt });
  }
}

export class CanceledWithTaskError extends S.TaggedError<CanceledWithTaskError>()(
  "CanceledWithTaskError",
  {
    task: S.Any,
  }
) {
  constructor(readonly task: ServerTask) {
    super({ task });
  }
}

export class YieldExecutionError extends S.TaggedError<YieldExecutionError>()(
  "YieldExecutionError",
  {
    key: S.String,
  }
) {
  constructor(readonly key: string) {
    super({ key });
  }
}

export class AutoYieldExecutionError extends S.TaggedError<AutoYieldExecutionError>()(
  "AutoYieldExecutionError",
  {
    location: S.String,
    timeRemaining: S.Number,
    timeElapsed: S.Number,
  }
) {
  constructor(
    readonly location: string,
    readonly timeRemaining: number,
    readonly timeElapsed: number
  ) {
    super({ location, timeRemaining, timeElapsed });
  }
}

export class AutoYieldWithCompletedTaskExecutionError extends S.TaggedError<AutoYieldWithCompletedTaskExecutionError>()(
  "AutoYieldWithCompletedTaskExecutionError",
  {
    id: S.String,
    properties: S.optional(S.Union(S.Any, S.Undefined)),
    data: S.Any,
    output: S.optional(S.Union(S.String, S.Undefined))
  }
) {
  constructor(
    readonly id: string,
    readonly properties: DisplayProperty[] | undefined,
    readonly data: { location: string; timeRemaining: number; timeElapsed: number },
    readonly output?: string
  ) {
    super({ id, properties, data, output });
  }
}


export class AutoYieldRateLimitError extends S.TaggedError<AutoYieldRateLimitError>()(
  "AutoYieldRateLimitError",
  {
    resetAtTimestamp: S.Number,
  }
) {
  constructor(
    readonly resetAtTimestamp: number,
  ) {
    super({ resetAtTimestamp });
  }
}

export class ParsedPayloadSchemaError extends S.TaggedError<ParsedPayloadSchemaError>()(
  "ParsedPayloadSchemaError",
  {
    schemaErrors: S.Any,
  }
) {
  constructor(
    readonly schemaErrors: ReadonlyArray<SchemaError>,
  ) {
    super({ schemaErrors });
  }
}

export const TriggerInternalError = S.Union(
  ResumeWithTaskError,
  RetryWithTaskError,
  CanceledWithTaskError,
  YieldExecutionError,
  AutoYieldExecutionError,
  AutoYieldWithCompletedTaskExecutionError,
  AutoYieldRateLimitError,
  ResumeWithParallelTaskError,
)

export type TriggerInternalError = S.Schema.Type<typeof TriggerInternalError>

/** Use this function if you're using a `try/catch` block to catch errors.
 * It checks if a thrown error is a special internal error that you should ignore.
 * If this returns `true` then you must rethrow the error: `throw err;`
 * @param err The error to check
 * @returns `true` if the error is a Trigger Error, `false` otherwise.
 */
export function isTriggerError(err: unknown): err is TriggerInternalError {
  return (
    err instanceof ResumeWithTaskError ||
    err instanceof RetryWithTaskError ||
    err instanceof CanceledWithTaskError ||
    err instanceof YieldExecutionError ||
    err instanceof AutoYieldExecutionError ||
    err instanceof AutoYieldWithCompletedTaskExecutionError ||
    err instanceof AutoYieldRateLimitError ||
    err instanceof ResumeWithParallelTaskError
  );
}

// This error isn't an internal error but it can be used by the user to figure out which task caused the error
export class ErrorWithTask extends S.TaggedError<ErrorWithTask>()("ErrorWithTask", {
  cause: S.Any,
  message: S.Any,
}) {
  constructor(
    readonly cause: ServerTask,
    readonly message: string
  ) {
    super({ cause, message });
  }
}
