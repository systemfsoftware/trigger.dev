/**
 * @fileoverview Prevent importing from `@systemfsoftware/trigger.dev_core` directly
 * @author
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-trigger-core-import"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
});
ruleTester.run("no-trigger-core-import", rule, {
  valid: [
    {
      code: `import { conditionallyImportPacket, parsePacket } from "@systemfsoftware/trigger.dev_core/v3/utils/ioSerialization";`,
    },
  ],

  invalid: [
    {
      code: `import { parsePacket } from '@systemfsoftware/trigger.dev_core/v3';`,
      output: `import { parsePacket } from '@systemfsoftware/trigger.dev_core/v3/utils/ioSerialization';`,
      errors: [
        {
          messageId: "noTriggerCoreImportFixable",
        },
      ],
    },
    {
      code: `import { CreateBackgroundWorkerRequestBody, TaskResource } from '@systemfsoftware/trigger.dev_core/v3';`,
      output: `import { CreateBackgroundWorkerRequestBody } from '@systemfsoftware/trigger.dev_core/v3/schemas';
import { TaskResource } from '@systemfsoftware/trigger.dev_core/v3/schemas';`,
      errors: [
        {
          messageId: "noTriggerCoreImportFixable",
        },
      ],
    },
    {
      code: `import { CreateBackgroundWorkerRequestBody, stringifyIO } from '@systemfsoftware/trigger.dev_core/v3';`,
      output: `import { CreateBackgroundWorkerRequestBody } from '@systemfsoftware/trigger.dev_core/v3/schemas';
import { stringifyIO } from '@systemfsoftware/trigger.dev_core/v3/utils/ioSerialization';`,
      errors: [
        {
          messageId: "noTriggerCoreImportFixable",
        },
      ],
    },
    {
      code: `import {
  isExceptionSpanEvent,
 ExceptionEventProperties,
 SpanEvent as OtelSpanEvent,
} from "@systemfsoftware/trigger.dev_core/v3";`,
      output: `import { isExceptionSpanEvent } from '@systemfsoftware/trigger.dev_core/v3/schemas';
import { ExceptionEventProperties } from '@systemfsoftware/trigger.dev_core/v3/schemas';
import { SpanEvent as OtelSpanEvent } from '@systemfsoftware/trigger.dev_core/v3/schemas';`,
      errors: [
        {
          messageId: "noTriggerCoreImportFixable",
        },
      ],
    },
  ],
});
