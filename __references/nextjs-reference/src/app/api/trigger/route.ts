import { createAppRoute } from "@systemfsoftware/trigger.dev_nextjs";
import { client } from "@/trigger";

import "@/jobs/hooks";

export const { POST, dynamic } = createAppRoute(client);
