---
"@systemfsoftware/trigger.dev_core-apps": patch
"trigger.dev": patch
"@systemfsoftware/trigger.dev_core": patch
---

Fix issues that could result in unreezable state run crashes. Details:
- Never checkpoint between attempts
- Some messages and socket data now include attempt numbers
- Remove attempt completion replays
- Additional prod entry point logging
- Fail runs that receive deprecated (pre-lazy attempt) execute messages
