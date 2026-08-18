import type { CurrentlyBuilding } from "@/types/currently-building";

// TODO: replace with what's actually being worked on — see
// docs/01-information-architecture.md §6 content checklist.
export function getCurrentlyBuilding(): CurrentlyBuilding {
  return {
    title: "Untitled project",
    description: "Add a one-line description of what you're currently building.",
  };
}
