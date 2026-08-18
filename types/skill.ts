// Shape source: docs/01-information-architecture.md §4 Content model,
// extended 2026-08-03 for the /skills page: depth tiers (Core/Working
// Knowledge/Exposure, communicated without percentages or ratings),
// evidence (where learned / where applied — real sources only), and
// capability chains showing how skills connect to each other.

export type SkillCategory =
  | "Product"
  | "Communication"
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Databases"
  | "Cloud"
  | "DevOps"
  | "AI"
  | "Tools"
  | "Frameworks"
  | "Version Control"
  | "OS"
  | "Fundamentals"
  | "Data"
  | "Concepts";

export type SkillProficiency =
  | "learning"
  | "comfortable"
  | "proficient"
  | "advanced";

/**
 * Depth tier — the honest, non-numeric alternative to a percentage or
 * star rating. Core = used consistently, can go deep. Working Knowledge =
 * real, applied, but not a daily driver. Exposure = learned and can speak
 * to it, typically from a single course/simulation rather than repeated
 * production use.
 */
export type SkillTier = "core" | "working" | "exposure";

export type SkillEvidence = {
  learnedThrough?: string[];
  appliedIn?: string[];
};

export type Skill = {
  name: string;
  category: SkillCategory;
  proficiency: SkillProficiency;
  tier?: SkillTier;
  evidence?: SkillEvidence;
  yearsExperience?: number;
  usedInProjects?: string[];
};

export type SkillCluster = {
  id: string;
  title: string;
  description: string;
  skillNames: string[];
};

export type SkillChain = {
  id: string;
  title: string;
  steps: string[];
};

export type CapabilityKind = "engineering" | "product" | "communication";

/**
 * A headline professional capability — the answer to "what can this person
 * be trusted with", stated above the technology inventory. `evidence` must
 * name something real (a project role, a shipped case study, the
 * internship); a capability with nothing behind it doesn't belong here.
 */
export type ProfessionalCapability = {
  id: string;
  title: string;
  kind: CapabilityKind;
  description: string;
  /** Short factual backing, e.g. "JBITES · Role: Product Manager". */
  evidence: string;
  skills: string[];
};

/**
 * Skill → where it was used → what was actually done with it. The page's
 * proof layer: every row must map to a real project or the internship.
 */
export type SkillApplication = {
  skill: string;
  context: string;
  /** Optional internal link to the case study or experience page. */
  href?: string;
  detail: string;
};

/** One stage of the problem → delivery flow. */
export type ProductFlowStage = {
  label: string;
  detail: string;
};
