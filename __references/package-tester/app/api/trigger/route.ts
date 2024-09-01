import { createAppRoute } from "@systemfsoftware/trigger.dev_nextjs";
import { client } from "@/app/trigger";

// Replace this with your own jobs
import "@/app/jobs/react-hook";

//this route is used to send and receive data with Trigger.dev
export const { POST, dynamic } = createAppRoute(client);
