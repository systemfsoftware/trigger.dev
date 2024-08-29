import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  "./packages/core-backend/vitest.config.mts",
  "./packages/cli-v3/e2e/vite.config.js",
  "./packages/cli-v3/vite.config.ts"
])
