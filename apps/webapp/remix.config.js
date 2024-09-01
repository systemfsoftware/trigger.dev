/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  dev: {
    port: 8002,
  },
  tailwind: true,
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "cjs",
  serverDependenciesToBundle: [
    /^remix-utils.*/,
    "marked",
    "axios",
    "@systemfsoftware/trigger.dev_core",
    "@systemfsoftware/trigger.dev_core-backend",
    "@systemfsoftware/trigger.dev_sdk",
    "@systemfsoftware/trigger.dev_platform",
    "@systemfsoftware/trigger.dev_yalt",
    "emails",
    "highlight.run",
    "random-words",
    "superjson",
    "prismjs/components/prism-json",
    "prismjs/components/prism-typescript",
  ],
  browserNodeBuiltinsPolyfill: { modules: { path: true, os: true, crypto: true } },
  watchPaths: async () => {
    return [
      "../../packages/core/src/**/*",
      "../../packages/core-backend/src/**/*",
      "../../packages/trigger-sdk/src/**/*",
      "../../packages/yalt/src/**/*",
      "../../packages/emails/src/**/*",
    ];
  },
};
