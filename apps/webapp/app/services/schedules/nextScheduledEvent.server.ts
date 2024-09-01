import {
  CronMetadata,
  IntervalMetadata,
  ScheduleMetadata,
  ScheduleMetadataSchema,
} from "@systemfsoftware/trigger.dev_core";
import { $transaction, PrismaClientOrTransaction, prisma } from "~/db.server";
import { parseExpression } from "cron-parser";
import { logger } from "../logger.server";
import { DeliverScheduledEventService } from "./deliverScheduledEvent.server";

export class NextScheduledEventService {
  #prismaClient: PrismaClientOrTransaction;

  constructor(prismaClient: PrismaClientOrTransaction = prisma) {
    this.#prismaClient = prismaClient;
  }

  public async call(id: string) {
    return await $transaction(this.#prismaClient, async (tx) => {
      const scheduleSource = await this.#prismaClient.scheduleSource.findUniqueOrThrow({
        where: {
          id,
        },
      });

      if (!scheduleSource.active) {
        return;
      }

      const schedule = ScheduleMetadataSchema.safeParse(scheduleSource.schedule);

      if (!schedule.success) {
        return;
      }

      const scheduleTime = calculateNextScheduledEvent(
        schedule.data,
        scheduleSource.lastEventTimestamp ?? scheduleSource.createdAt
      );

      logger.debug("enqueuing scheduled event", {
        scheduleSource,
        scheduleTime,
        lastTimestamp: scheduleSource.lastEventTimestamp,
      });

      await DeliverScheduledEventService.enqueue(
        scheduleSource.id,
        scheduleTime,
        {
          ts: scheduleTime,
          lastTimestamp: scheduleSource.lastEventTimestamp ?? undefined,
        },
        tx
      );

      return scheduleSource;
    });
  }
}

// this should always return a date in the future
// if calculateNextStep returns a date in the past, call it again with the result as the previousTimestamp
export function calculateNextScheduledEvent(
  schedule: ScheduleMetadata,
  previousTimestamp?: Date | null
): Date {
  let nextStep = calculateNextStep(schedule, previousTimestamp);

  while (nextStep.getTime() < new Date().getTime()) {
    nextStep = calculateNextStep(schedule, nextStep);
  }

  return nextStep;
}

function calculateNextStep(schedule: ScheduleMetadata, previousTimestamp?: Date | null): Date {
  switch (schedule.type) {
    case "interval": {
      return calculateNextIntervalOfEvent(schedule, previousTimestamp);
    }
    case "cron": {
      return calculateNextCronEvent(schedule, previousTimestamp);
    }
  }
}

function calculateNextIntervalOfEvent(
  interval: IntervalMetadata,
  previousTimestamp?: Date | null
): Date {
  const now = previousTimestamp ? previousTimestamp.getTime() : new Date().getTime();

  return new Date(now + calculateDurationInMs(interval));
}

function calculateDurationInMs(schedule: IntervalMetadata): number {
  return schedule.options.seconds * 1000;
}

function calculateNextCronEvent(schedule: CronMetadata, previousTimestamp?: Date | null): Date {
  return parseExpression(schedule.options.cron, {
    currentDate: previousTimestamp ? previousTimestamp : new Date(),
  })
    .next()
    .toDate();
}
