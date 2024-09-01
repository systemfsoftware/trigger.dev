import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$trigger: 'src/trigger',
			'$jobs/*': 'src/jobs/*',
			'@systemfsoftware/trigger.dev_sveltekit': '../../packages/sveltekit/src/index',
			'@systemfsoftware/trigger.dev_sveltekit/*': '../../packages/sveltekit/src/*',
			'@systemfsoftware/trigger.dev_sdk': '../../packages/trigger-sdk/src/index',
			'@systemfsoftware/trigger.dev_sdk/*': '../../packages/trigger-sdk/src/*',
			'@systemfsoftware/trigger.dev_core': '../../packages/core/src/index',
			'@systemfsoftware/trigger.dev_core/*': '../../packages/core/src/*'
		}
	}
};

export default config;
