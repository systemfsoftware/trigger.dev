import { createSvelteRoute } from '@systemfsoftware/trigger.dev_sveltekit';

import { client } from '$trigger';

// // Replace this with your own jobs
import '$jobs/example';

// Create the Svelte route handler using the createSvelteRoute function
const svelteRoute = createSvelteRoute(client);

// Define your API route handler
export const POST = svelteRoute.POST;
