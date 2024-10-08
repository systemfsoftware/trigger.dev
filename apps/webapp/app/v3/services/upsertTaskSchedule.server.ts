import { Prisma, TaskSchedule } from "@systemfsoftware/trigger.dev_database";
import cronstrue from "cronstrue";
import { nanoid } from "nanoid";
import { $transaction, PrismaClientOrTransaction } from "~/db.server";
import { generateFriendlyId } from "../friendlyIdentifiers";
import { UpsertSchedule } from "../schedules";
import { calculateNextScheduledTimestamp } from "../utils/calculateNextSchedule.server";
import { BaseService, ServiceValidationError } from "./baseService.server";
import { CheckScheduleService } from "./checkSchedule.server";
import { RegisterNextTaskScheduleInstanceService } from "./registerNextTaskScheduleInstance.server";

export type UpsertTaskScheduleServiceOptions = UpsertSchedule;

type InstanceWithEnvironment = Prisma.TaskScheduleInstanceGetPayload<{
  include: {
    environment: {
      include: {
        orgMember: {
          include: {
            user: true;
          };
        };
      };
    };
  };
}>;

export class UpsertTaskScheduleService extends BaseService {
  public async call(projectId: string, schedule: UpsertTaskScheduleServiceOptions) {
    //this throws errors if the schedule is invalid
    const checkSchedule = new CheckScheduleService(this._prisma);
    await checkSchedule.call(projectId, schedule);

    const result = await $transaction(this._prisma, async (tx) => {
      const deduplicationKey =
        typeof schedule.deduplicationKey === "string" && schedule.deduplicationKey !== ""
          ? schedule.deduplicationKey
          : nanoid(24);

      const existingSchedule = schedule.friendlyId
        ? await tx.taskSchedule.findUnique({
            where: {
              friendlyId: schedule.friendlyId,
            },
          })
        : await tx.taskSchedule.findUnique({
            where: {
              projectId_deduplicationKey: {
                projectId,
                deduplicationKey,
              },
            },
          });

      if (existingSchedule) {
        if (existingSchedule.type === "DECLARATIVE") {
          throw new ServiceValidationError("Cannot update a declarative schedule");
        }

        return await this.#updateExistingSchedule(tx, existingSchedule, schedule, projectId);
      } else {
        return await this.#createNewSchedule(tx, schedule, projectId, deduplicationKey);
      }
    });

    if (!result) {
      throw new Error("Failed to create or update the schedule");
    }

    const { scheduleRecord, instances } = result;

    return this.#createReturnObject(scheduleRecord, instances);
  }

  async #createNewSchedule(
    tx: PrismaClientOrTransaction,
    options: UpsertTaskScheduleServiceOptions,
    projectId: string,
    deduplicationKey: string
  ) {
    const scheduleRecord = await tx.taskSchedule.create({
      data: {
        projectId,
        friendlyId: generateFriendlyId("sched"),
        taskIdentifier: options.taskIdentifier,
        deduplicationKey,
        userProvidedDeduplicationKey:
          options.deduplicationKey !== undefined && options.deduplicationKey !== "",
        generatorExpression: options.cron,
        generatorDescription: cronstrue.toString(options.cron),
        timezone: options.timezone ?? "UTC",
        externalId: options.externalId ? options.externalId : undefined,
      },
    });

    const registerNextService = new RegisterNextTaskScheduleInstanceService(tx);

    //create the instances (links to environments)
    let instances: InstanceWithEnvironment[] = [];
    for (const environmentId of options.environments) {
      const instance = await tx.taskScheduleInstance.create({
        data: {
          taskScheduleId: scheduleRecord.id,
          environmentId,
        },
        include: {
          environment: {
            include: {
              orgMember: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      });

      await registerNextService.call(instance.id);

      instances.push(instance);
    }

    return { scheduleRecord, instances };
  }

  async #updateExistingSchedule(
    tx: PrismaClientOrTransaction,
    existingSchedule: TaskSchedule,
    options: UpsertTaskScheduleServiceOptions,
    projectId: string
  ) {
    //update the schedule
    const scheduleRecord = await tx.taskSchedule.update({
      where: {
        id: existingSchedule.id,
      },
      data: {
        generatorExpression: options.cron,
        generatorDescription: cronstrue.toString(options.cron),
        timezone: options.timezone ?? "UTC",
        externalId: options.externalId ? options.externalId : null,
      },
    });

    const scheduleHasChanged =
      scheduleRecord.generatorExpression !== existingSchedule.generatorExpression ||
      scheduleRecord.timezone !== existingSchedule.timezone;

    // find the existing instances
    const existingInstances = await tx.taskScheduleInstance.findMany({
      where: {
        taskScheduleId: scheduleRecord.id,
      },
      include: {
        environment: {
          include: {
            orgMember: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    // create the new instances
    const newInstances: InstanceWithEnvironment[] = [];
    const updatingInstances: InstanceWithEnvironment[] = [];

    for (const environmentId of options.environments) {
      const existingInstance = existingInstances.find((i) => i.environmentId === environmentId);

      if (existingInstance) {
        // Update the existing instance
        updatingInstances.push(existingInstance);
      } else {
        // Create a new instance
        const instance = await tx.taskScheduleInstance.create({
          data: {
            taskScheduleId: scheduleRecord.id,
            environmentId,
          },
          include: {
            environment: {
              include: {
                orgMember: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        });

        newInstances.push(instance);
      }
    }

    // find the instances that need to be removed
    const instancesToDeleted = existingInstances.filter(
      (i) => !options.environments.includes(i.environmentId)
    );

    // delete the instances no longer selected
    for (const instance of instancesToDeleted) {
      await tx.taskScheduleInstance.delete({
        where: {
          id: instance.id,
        },
      });
    }

    const registerService = new RegisterNextTaskScheduleInstanceService(tx);

    for (const instance of newInstances) {
      await registerService.call(instance.id);
    }

    if (scheduleHasChanged) {
      for (const instance of updatingInstances) {
        await registerService.call(instance.id);
      }
    }

    const instances = await tx.taskScheduleInstance.findMany({
      where: {
        taskScheduleId: scheduleRecord.id,
      },
      include: {
        environment: {
          include: {
            orgMember: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    return { scheduleRecord, instances };
  }

  #createReturnObject(taskSchedule: TaskSchedule, instances: InstanceWithEnvironment[]) {
    return {
      id: taskSchedule.friendlyId,
      type: taskSchedule.type,
      task: taskSchedule.taskIdentifier,
      active: taskSchedule.active,
      externalId: taskSchedule.externalId,
      deduplicationKey: taskSchedule.userProvidedDeduplicationKey
        ? taskSchedule.deduplicationKey
        : undefined,
      cron: taskSchedule.generatorExpression,
      cronDescription: taskSchedule.generatorDescription,
      timezone: taskSchedule.timezone,
      nextRun: calculateNextScheduledTimestamp(
        taskSchedule.generatorExpression,
        taskSchedule.timezone
      ),
      environments: instances.map((instance) => ({
        id: instance.environment.id,
        shortcode: instance.environment.shortcode,
        type: instance.environment.type,
        userName:
          instance.environment.orgMember?.user.displayName ??
          instance.environment.orgMember?.user.name ??
          undefined,
      })),
    };
  }
}
