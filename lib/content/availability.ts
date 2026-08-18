import type { Availability } from "@/types/availability";

/**
 * Real availability, replacing the original scaffold. `currentStatus` also
 * feeds the hero's status pill, so the two can never drift apart.
 *
 * Nothing here is inferred: every field is stated as given. Unset fields
 * are omitted by <AvailabilityStrip /> rather than rendered as an "Add …"
 * prompt (docs/03-wireframes.md §0.3).
 */
export function getAvailability(): Availability {
  return {
    currentStatus: "Open to Internships & Opportunities",
    lookingFor: ["AI Software Engineer"],
    workModes: ["Remote", "Hybrid", "On-site"],
    relocation: true,
    workAuthorization: "Authorized to work in India",
  };
}
