// Shape source: docs/01-information-architecture.md §4 Content model.

/**
 * Icon keys rather than components, so content modules stay plain data —
 * same convention as types/project.ts. The key → lucide mappings live in
 * the components that render them.
 */
export type FocusAreaIcon =
  | "research"
  | "evaluation"
  | "knowledge"
  | "pipeline"
  | "product";

export type PipelineStageIcon =
  | "sources"
  | "ingestion"
  | "embeddings"
  | "storage"
  | "retrieval";

/** One dimension of the role, with the concrete topics it covered. */
export type ExperienceFocusArea = {
  title: string;
  icon: FocusAreaIcon;
  items: string[];
};

/**
 * A stage in the knowledge pipeline that was studied during the role.
 * Framed as observed architecture — never as authored architecture.
 */
export type ExperiencePipelineStage = {
  label: string;
  icon: PipelineStageIcon;
  /** Short mono annotation, e.g. the technology seen at this stage. */
  caption?: string;
  items: string[];
};

/** A specific technical issue examined, stated as investigation not authorship. */
export type ExperienceInvestigation = {
  title: string;
  description: string;
};

/** A substantive strand of the work — richer than a résumé bullet. */
export type ExperienceContribution = {
  title: string;
  description: string;
};

export type ExperienceTechGroup = {
  label: string;
  items: string[];
};

export type Experience = {
  role: string;
  company: string;
  companyUrl?: string;
  /**
   * Brand lockup for the company. Wide wordmarks render via
   * CompanyWordmark; without one, OrgLogo falls back to a monogram.
   */
  companyLogo?: { src: string; width: number; height: number };
  /** One or two sentences so a recruiter unfamiliar with the company has context. */
  companyDescription?: string;
  location: string;
  employmentType: "internship" | "full-time" | "part-time";
  startDate: string;
  endDate?: string;
  /** Compact range for cards, e.g. "Jul 2026 — Aug 2026". */
  dateRangeLabel?: string;
  /** Exact range for the detail page, e.g. "01 Jul 2026 — 31 Aug 2026". */
  preciseDateLabel?: string;
  /** e.g. "2 months". */
  durationLabel?: string;
  summary?: string;
  /** Condensed points for the homepage card. */
  highlights?: string[];
  contributions?: ExperienceContribution[];
  focusAreas?: ExperienceFocusArea[];
  pipeline?: ExperiencePipelineStage[];
  investigations?: ExperienceInvestigation[];
  techGroups?: ExperienceTechGroup[];
  takeaways?: { summary: string; areas: string[] };
  responsibilities?: string[];
  impact?: string[];
  technologies?: string[];
  keyLearnings?: string[];
  links?: { label: string; url: string }[];
};
