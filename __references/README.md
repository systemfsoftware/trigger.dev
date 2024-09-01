## Trigger.dev References

Contains code that tests or uses the `@systemfsoftware/trigger.dev_*` packages in some way, either by using them to test out a framework adapter, an integration, or parts of the main SDK.

All the dependencies to the `@systemfsoftware/trigger.dev_*` packages will be both referenced in the package.json `dependencies` as `workspace:*`, as well as using a direct path from the tsconfig.json file like so:

```json
{
  "extends": "@systemfsoftware/trigger.dev_tsconfig/node18.json",
  "include": ["./src/**/*.ts"],
  "compilerOptions": {
    "baseUrl": ".",
    "lib": ["DOM", "DOM.Iterable"],
    "paths": {
      "@/*": ["./src/*"],
      "@systemfsoftware/trigger.dev_sdk": ["../../packages/trigger-sdk/src/index"],
      "@systemfsoftware/trigger.dev_sdk/*": ["../../packages/trigger-sdk/src/*"],
      "@systemfsoftware/trigger.dev_express": ["../../packages/express/src/index"],
      "@systemfsoftware/trigger.dev_express/*": ["../../packages/express/src/*"],
      "@systemfsoftware/trigger.dev_core": ["../../packages/core/src/index"],
      "@systemfsoftware/trigger.dev_core/*": ["../../packages/core/src/*"],
      "@systemfsoftware/trigger.dev_integration-kit": ["../../packages/integration-kit/src/index"],
      "@systemfsoftware/trigger.dev_integration-kit/*": ["../../packages/integration-kit/src/*"],
      "@systemfsoftware/trigger.dev_github": ["../../integrations/github/src/index"],
      "@systemfsoftware/trigger.dev_github/*": ["../../integrations/github/src/*"],
      "@systemfsoftware/trigger.dev_slack": ["../../integrations/slack/src/index"],
      "@systemfsoftware/trigger.dev_slack/*": ["../../integrations/slack/src/*"],
      "@systemfsoftware/trigger.dev_openai": ["../../integrations/openai/src/index"],
      "@systemfsoftware/trigger.dev_openai/*": ["../../integrations/openai/src/*"],
      "@systemfsoftware/trigger.dev_resend": ["../../integrations/resend/src/index"],
      "@systemfsoftware/trigger.dev_resend/*": ["../../integrations/resend/src/*"],
      "@systemfsoftware/trigger.dev_typeform": ["../../integrations/typeform/src/index"],
      "@systemfsoftware/trigger.dev_typeform/*": ["../../integrations/typeform/src/*"],
      "@systemfsoftware/trigger.dev_plain": ["../../integrations/plain/src/index"],
      "@systemfsoftware/trigger.dev_plain/*": ["../../integrations/plain/src/*"],
      "@systemfsoftware/trigger.dev_supabase": ["../../integrations/supabase/src/index"],
      "@systemfsoftware/trigger.dev_supabase/*": ["../../integrations/supabase/src/*"],
      "@systemfsoftware/trigger.dev_stripe": ["../../integrations/stripe/src/index"],
      "@systemfsoftware/trigger.dev_stripe/*": ["../../integrations/stripe/src/*"],
      "@systemfsoftware/trigger.dev_sendgrid": ["../../integrations/sendgrid/src/index"],
      "@systemfsoftware/trigger.dev_sendgrid/*": ["../../integrations/sendgrid/src/*"],
      "@systemfsoftware/trigger.dev_airtable": ["../../integrations/airtable/src/index"],
      "@systemfsoftware/trigger.dev_airtable/*": ["../../integrations/airtable/src/*"]
    }
  }
}
```
