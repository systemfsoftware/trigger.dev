import type { ConnectionType } from "@systemfsoftware/trigger.dev_database";

export function connectionType(type: ConnectionType) {
  switch (type) {
    case "DEVELOPER":
      return "Developer";
    case "EXTERNAL":
      return "Your users";
  }
}
