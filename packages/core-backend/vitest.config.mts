import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: {
    target: ['node18', 'node20'],
  },
});
 