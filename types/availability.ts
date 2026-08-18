// Shape source: docs/01-information-architecture.md §4 Content model.
// Singleton, not a list.

/** Widened to a list on 2026-08-17 — being open to several arrangements is
 * itself the useful signal, and a single value couldn't express it. */
export type WorkMode = "Remote" | "Hybrid" | "On-site";

export type Availability = {
  currentStatus: string;
  lookingFor?: string[];
  workModes?: WorkMode[];
  relocation?: boolean;
  workAuthorization?: string;
};
