import { TriggerClient } from '@systemfsoftware/trigger.dev_sdk';
import { TRIGGER_API_KEY } from '$env/static/private';

export const client = new TriggerClient({
	id: 'sveltekit-example',
	apiKey: TRIGGER_API_KEY, 
});
