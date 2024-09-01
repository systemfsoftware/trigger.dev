---
"trigger.dev": patch
"@systemfsoftware/trigger.dev_core": patch
---

v3: fix otel flushing causing CLEANUP ack timeout errors by always setting a forceFlushTimeoutMillis value
