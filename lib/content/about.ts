import type {
  AboutPillar,
  BeyondItem,
  Direction,
  JourneyMilestone,
  ThinkingStep,
  Venture,
} from "@/types/about";

/*
 * Content rules for this page:
 *
 * 1. No invented facts. The venture has no name, no launch date, no
 *    customers and no revenue, because none were given — it is described
 *    as what it is, an early-stage two-person effort.
 * 2. The Forever India engagement is stated at role level only. No dates,
 *    responsibilities or outcomes were available, and filling them in
 *    would be fabrication.
 * 3. Rezolve.ai keeps the Experience page's verbs — investigated,
 *    evaluated, documented — never "built" or "owned".
 * 4. Personal interests stay personal. Football is not reframed as
 *    "teamwork", and poetry is not reframed as "creative problem solving".
 */

export const aboutIntro = {
  lead: "I build software, think about what's worth building, and enjoy the part where an idea has to be explained to someone else.",
  paragraphs: [
    "I'm a B.Tech Computer Science student at JIIT working across software engineering, AI and product. What interests me isn't any one of those on its own — it's the seam between them: understanding a problem properly, deciding what the product should actually do about it, and then building the thing that makes it real.",
    "That's shaped how I've spent my time. I've shipped full-stack applications, held the product-manager role on a campus ordering app, spent a summer investigating how enterprise AI systems cope with real organisational data, and I'm now starting something of my own with a friend.",
  ],
};

const PILLARS: AboutPillar[] = [
  {
    id: "engineering",
    title: "Engineering",
    icon: "engineering",
    description:
      "Full-stack applications where the interface, data model, access rules and integrations all have to agree with each other.",
    evidence: "Two shipped applications · TarmacOS",
  },
  {
    id: "product",
    title: "Product",
    icon: "product",
    description:
      "Deciding what gets built and why — feature scope, user workflows, prioritisation, and what to deliberately leave out.",
    evidence: "JBITES · Product Manager",
  },
  {
    id: "ai",
    title: "AI & Intelligent Systems",
    icon: "ai",
    description:
      "Applied LLM and retrieval work — grounding a model in a user's real data rather than exposing it raw and hoping.",
    evidence: "AI fitness app · Rezolve.ai",
  },
  {
    id: "communication",
    title: "Communication",
    icon: "communication",
    description:
      "Explaining a technical finding to someone who is never going to read the code, and making it actionable anyway.",
    evidence: "Rezolve.ai · findings documented",
  },
  {
    id: "venture",
    title: "Building my own",
    icon: "venture",
    description:
      "Noticing a gap and starting on it rather than waiting for someone to hand over a brief.",
    evidence: "Early-stage venture, in progress",
  },
  {
    id: "creative",
    title: "Writing",
    icon: "creative",
    description:
      "Urdu poetry, written seriously enough to finish and publish a book of it.",
    evidence: "Chaand Suraj · published",
  },
];

export function getAboutPillars(): AboutPillar[] {
  return PILLARS;
}

const THINKING: ThinkingStep[] = [
  { label: "Problem", detail: "What is actually wrong, and for whom?" },
  { label: "User", detail: "Who lives with it, and what does the workaround cost them?" },
  { label: "Product", detail: "What should exist — and what shouldn't." },
  { label: "Communication", detail: "How to explain it so other people can act on it." },
  { label: "Engineering", detail: "How to make it real, and hold up in use." },
];

export function getThinkingSteps(): ThinkingStep[] {
  return THINKING;
}

/*
 * Only Rezolve.ai and TarmacOS carry a period, because they're the only ones
 * with dates I can state accurately. The rest are ordered as threads rather
 * than timestamped events.
 */
const JOURNEY: JourneyMilestone[] = [
  {
    id: "education",
    kind: "education",
    title: "B.Tech, Computer Science",
    context: "JIIT",
    description:
      "The foundation — and where most of the side projects, campus involvement and first product role happened alongside it.",
  },
  {
    id: "building",
    kind: "building",
    title: "Started building",
    context: "Web & AI projects",
    description:
      "Full-stack applications built end to end: a campus recovery platform and an AI-assisted fitness app, both shipped and documented as case studies.",
  },
  {
    id: "product",
    kind: "product",
    title: "First product role",
    context: "JBITES — Online Canteen Application",
    description:
      "Took the product-manager role: feature ideation, user workflows, prioritisation and overall direction. The point where I realised I cared about the decisions as much as the implementation.",
  },
  {
    id: "creative",
    kind: "creative",
    title: "Published a book",
    context: "Chaand Suraj",
    description:
      "A collection of my Urdu poetry. Unrelated to software, and the thing I'm most likely to still be doing in ten years.",
  },
  {
    id: "campus",
    kind: "campus",
    title: "Core member",
    context: "Radiance Hub, JIIT",
    description: "The modelling hub on campus.",
  },
  {
    id: "rezolve",
    kind: "professional",
    title: "AI Research Intern",
    context: "Rezolve.ai",
    period: "Jul — Aug 2026",
    description:
      "Investigated enterprise agentic AI: how knowledge moves from source systems through ingestion and embeddings into vector search, and the data-quality problems that quietly degrade it.",
  },
  {
    id: "tarmacos",
    kind: "building",
    title: "Built TarmacOS",
    context: "Solo project · Operating-systems simulation",
    period: "Oct 2026",
    description:
      "An airport-apron simulation in C++ on Linux that brings process scheduling, concurrency and synchronisation, shared-resource management, deadlock handling, memory management and disk scheduling together in one system.",
  },
  {
    id: "forever-india",
    kind: "product",
    title: "Product Manager",
    context: "Forever India",
    description: "A short product engagement.",
  },
  {
    id: "venture",
    kind: "venture",
    title: "Started building my own",
    context: "With Anmol",
    description:
      "An early-stage attempt at digital ordering for local food businesses — the first thing I've built because I wanted it to exist, rather than because it was assigned.",
  },
  {
    id: "now",
    kind: "now",
    title: "Where I am now",
    context: "Engineering · AI · Product",
    description:
      "Working at the intersection of the four, and looking for problems worth the effort.",
  },
];

export function getJourney(): JourneyMilestone[] {
  return JOURNEY;
}

export const venture: Venture = {
  title: "Digital ordering for local food businesses",
  stage: "Early stage",
  problem:
    "Plenty of small stalls and restaurants have no ordering platform of their own. If you want to see what's available or place an order, you turn up and ask.",
  approach:
    "We're working on giving those businesses a straightforward digital presence and a way to take orders — built for how they actually operate rather than scaled down from something enterprise.",
  team: ["Zimran Ullah", "Anmol"],
  teamNote: "Two-person team, same batch",
};

export function getVenture(): Venture {
  return venture;
}

const BEYOND: BeyondItem[] = [
  {
    icon: "football",
    title: "Football",
    detail: "The main way I get away from a screen.",
  },
  {
    icon: "writing",
    title: "Urdu poetry",
    detail:
      "I write, and published a collection of it — Chaand Suraj.",
  },
  {
    icon: "content",
    title: "Content & social",
    detail:
      "I've run Instagram accounts and made the content for them, which is where a lot of my interest in how products get communicated started.",
  },
  {
    icon: "campus",
    title: "Radiance Hub",
    detail: "Core member of the modelling hub at JIIT.",
  },
];

export function getBeyond(): BeyondItem[] {
  return BEYOND;
}

const DIRECTIONS: Direction[] = [
  {
    verb: "Building",
    title: "Full-stack engineering",
    detail: "Complete applications, not just the parts that demo well.",
  },
  {
    verb: "Exploring",
    title: "AI & intelligent systems",
    detail: "Agentic workflows, retrieval and vector search.",
  },
  {
    verb: "Developing",
    title: "Product judgement",
    detail: "Getting better at deciding what not to build.",
  },
  {
    verb: "Starting",
    title: "Something of my own",
    detail: "Turning a real gap into a product people would use.",
  },
];

export function getDirections(): Direction[] {
  return DIRECTIONS;
}
