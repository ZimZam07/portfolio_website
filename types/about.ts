// Content model for the /about page. Icon keys rather than components, so
// the content module stays plain data — same convention as project.ts and
// experience.ts.

export type PillarIcon =
  | "engineering"
  | "product"
  | "ai"
  | "communication"
  | "venture"
  | "creative";

/**
 * One facet of the profile. `evidence` names something checkable elsewhere
 * on the site — a facet with nothing behind it is an adjective, and
 * adjectives don't belong on this page.
 */
export type AboutPillar = {
  id: string;
  title: string;
  icon: PillarIcon;
  description: string;
  evidence: string;
};

/** A step in the problem → engineering reasoning flow. */
export type ThinkingStep = {
  label: string;
  detail: string;
};

export type MilestoneKind =
  | "education"
  | "building"
  | "product"
  | "creative"
  | "campus"
  | "professional"
  | "venture"
  | "now";

/**
 * A thread of the journey. `period` is omitted wherever a real date isn't
 * known — the timeline shows sequence, and inventing dates to fill the
 * column would be fabrication.
 */
export type JourneyMilestone = {
  id: string;
  title: string;
  context: string;
  description: string;
  kind: MilestoneKind;
  period?: string;
};

/** The current early-stage venture. Deliberately has no metrics field. */
export type Venture = {
  title: string;
  stage: string;
  problem: string;
  approach: string;
  team: string[];
  teamNote: string;
};

/** Personal/creative interests — kept as themselves, not spun as skills. */
export type BeyondItem = {
  title: string;
  detail: string;
  icon: "football" | "writing" | "content" | "campus";
};

/** Forward direction. The verb carries the honesty about how far along it is. */
export type Direction = {
  verb: string;
  title: string;
  detail: string;
};
