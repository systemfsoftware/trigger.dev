
import { createAppRoute } from "@systemfsoftware/trigger.dev_nextjs";
import { client } from "@/trigger";

// Replace this with your own jobs
import "@/jobs/examples";

//this route is used to send and receive data with Trigger.dev
export const { POST, dynamic } = createAppRoute(client);
