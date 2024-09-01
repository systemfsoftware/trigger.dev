---
"trigger.dev": patch
"@systemfsoftware/trigger.dev_core": patch
---

Added config option extraCACerts to ProjectConfig type. This copies the ca file along with additionalFiles and sets NODE_EXTRA_CA_CERTS environment variable in built image as well as running the task.
