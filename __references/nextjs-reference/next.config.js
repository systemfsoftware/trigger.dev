/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@systemfsoftware/trigger.dev_sdk", "@systemfsoftware/trigger.dev_github", "@systemfsoftware/trigger.dev_core"],
  experimental: {
    appDir: true,
  },
};
