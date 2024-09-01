import { createAstroRoute } from "@systemfsoftware/trigger.dev_astro";
import {client} from "@/trigger"

//import your jobs
import "@/jobs/example"

export const { POST } = createAstroRoute(client);
