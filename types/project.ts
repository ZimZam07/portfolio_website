// Shape source: docs/01-information-architecture.md §4 Content model.

export type ProjectCategory =
  | "AI"
  | "Backend"
  | "Frontend"
  | "Full Stack"
  | "Android"
  | "Research"
  | "Systems";

export type ProjectStatus = "shipped" | "in-progress" | "archived";

/**
 * Icon is stored as a key rather than a component so the content modules
 * stay plain data (importable from server components without pulling a
 * React tree along). `components/case-study/capability-grid.tsx` owns the
 * key → lucide icon mapping.
 */
export type CapabilityIcon =
  | "verified"
  | "listing"
  | "request"
  | "owner"
  | "reward"
  | "status"
  | "responsive"
  | "ai"
  | "calculator"
  | "command"
  | "log"
  | "plan"
  | "auth"
  | "scheduler"
  | "resources"
  | "threads"
  | "deadlock"
  | "memory"
  | "disk"
  | "ipc"
  | "sync";

export type ProjectCapability = {
  title: string;
  description: string;
  icon: CapabilityIcon;
};

/** One stage of the "How it works" scroll-animated product workflow. */
export type ProjectWorkflowStep = {
  title: string;
  description: string;
  /** Short mono annotation tying the step to something real in the codebase. */
  detail?: string;
};

/** "Before → after" framing for the Impact section. Never numeric metrics. */
export type ProjectImpactShift = {
  from: string;
  to: string;
};

/**
 * Optional deep-dive for projects whose defining feature is an AI/inference
 * layer. Rendered as its own case-study band so the mechanism — what goes
 * in, what comes back, what constrains it — is legible without prose.
 */
export type ProjectIntelligence = {
  summary: string;
  /** What the model is actually given. */
  inputs: string[];
  /** What it returns, and in what form. */
  outputs: string[];
  /** Limits deliberately imposed on it. */
  guardrails: string[];
};

/** A single row of the "Under the Hood" technical breakdown. */
export type ProjectTechNote = {
  area: string;
  detail: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  /** Sub-title shown above the card/hero title, e.g. "Campus Recovery Platform". */
  kicker?: string;
  /** One-sentence hero positioning statement on the case study page. */
  positioning?: string;
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  heroImage?: string;
  gallery?: { src: string; alt: string }[];
  overview?: string;
  problemStatement?: string;
  solution?: string;
  /** Short capability labels surfaced as chips on the featured card. */
  highlights?: string[];
  capabilities?: ProjectCapability[];
  workflow?: ProjectWorkflowStep[];
  impact?: ProjectImpactShift[];
  technicalNotes?: ProjectTechNote[];
  intelligence?: ProjectIntelligence;
  /**
   * Which decorative product visual represents this project. Resolved by
   * `components/content/project-visual.tsx`; each is purpose-built for its
   * project rather than a generic illustration.
   */
  visual?: "recovery-lifecycle" | "assistant" | "apron";
  engineeringFocus?: { summary: string; areas: string[] };
  /** e.g. "Solo project" — omitted entirely when not meaningful (wireframes §2.11). */
  role?: string;
  architecture?: { description: string; diagram?: string };
  techStack: string[];
  features?: string[];
  myContribution?: string;
  challenges?: { title: string; description: string }[];
  tradeoffs?: { decision: string; reasoning: string }[];
  lessonsLearned?: string[];
  futureImprovements?: string[];
  metrics?: { label: string; value: string }[];
  links: {
    github?: string;
    live?: string;
    demoVideo?: string;
    /** Short expectation-setting line shown beside the case study's live-demo buttons. */
    liveNote?: string;
  };
  timeline: { start: string; end?: string };
  team?: { name: string; role: string }[];
  dateAdded: string;
};
