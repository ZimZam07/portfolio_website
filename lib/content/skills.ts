import type {
  ProductFlowStage,
  ProfessionalCapability,
  Skill,
  SkillApplication,
  SkillChain,
  SkillCluster,
} from "@/types/skill";

// Certificate references (see lib/content/certificates.ts) — named once
// here so evidence entries below stay consistent and only need updating
// in one place if a certificate title ever changes.
const CERT = {
  ibmAiAgent: "IBM SkillsBuild — Build an AI Agent",
  forage: "JPMorgan Chase Forage Simulation",
  cisco: "Cisco Python Essentials",
  uniAthena: "UniAthena — Basics of Machine Learning Algorithms",
  hpLife: "HP LIFE — AI for Beginners",
  be10x: "Be10x — AI Tools Workshop",
} as const;

// Tiers reflect what's already been established across this project (the
// original Skills interview + the Homepage's confirmed 13) — Core = the
// Homepage-confirmed, consistently-used skills; Exposure = explicitly
// self-rated "learning" (Spring Boot, Kafka, Firebase, and what comes with
// them from the single JPMorgan Forage simulation); everything else is
// Working Knowledge. Evidence is either what was stated directly, or a
// direct cross-reference to a real certificate's `skillsDemonstrated` list
// — nothing here is inferred beyond that.
// Project references used as evidence, named once so wording stays
// consistent. JBITES is the campus canteen application on which the
// product-management role was held.
const WORK = {
  jbites: "JBITES — Online Canteen Application",
  lostFound: "JIIT Lost & Found",
  fitness: "AI-Assisted Fitness App",
  tarmacos: "TarmacOS",
  rezolve: "Rezolve.ai Internship",
  portfolio: "Portfolio Website",
} as const;

const allSkills: Skill[] = [
  // Product & Communication — deliberately first. These are capabilities,
  // not a "soft skills" appendix, and every one below is tied to a
  // specific role or project rather than asserted in the abstract.
  {
    name: "Product Management",
    category: "Product",
    proficiency: "proficient",
    tier: "core",
    evidence: { appliedIn: [`${WORK.jbites} — Role: Product Manager`] },
  },
  {
    name: "Product Thinking",
    category: "Product",
    proficiency: "proficient",
    tier: "core",
    evidence: { appliedIn: [WORK.jbites, WORK.lostFound, WORK.fitness] },
  },
  {
    name: "Feature Prioritisation",
    category: "Product",
    proficiency: "comfortable",
    tier: "working",
    evidence: { appliedIn: [WORK.jbites] },
  },
  {
    name: "User Workflow Design",
    category: "Product",
    proficiency: "proficient",
    tier: "core",
    evidence: { appliedIn: [WORK.jbites, WORK.lostFound] },
  },
  {
    name: "Requirements Analysis",
    category: "Product",
    proficiency: "comfortable",
    tier: "working",
    evidence: { appliedIn: [WORK.jbites, WORK.rezolve] },
  },
  {
    name: "Product Ideation",
    category: "Product",
    proficiency: "comfortable",
    tier: "working",
    evidence: { appliedIn: [WORK.jbites] },
  },
  {
    name: "Product Positioning",
    category: "Product",
    proficiency: "comfortable",
    tier: "working",
    evidence: { appliedIn: [WORK.jbites] },
  },
  {
    name: "Value Communication",
    category: "Communication",
    proficiency: "comfortable",
    tier: "working",
    evidence: { appliedIn: [WORK.jbites, WORK.portfolio] },
  },
  {
    name: "Stakeholder Communication",
    category: "Communication",
    proficiency: "proficient",
    tier: "core",
    evidence: { appliedIn: [WORK.rezolve, WORK.jbites] },
  },
  {
    name: "Technical Documentation",
    category: "Communication",
    proficiency: "proficient",
    tier: "core",
    evidence: { appliedIn: [WORK.rezolve] },
  },
  {
    name: "Technical Communication",
    category: "Communication",
    proficiency: "proficient",
    tier: "core",
    evidence: { appliedIn: [WORK.rezolve, WORK.jbites] },
  },
  {
    name: "Public Speaking",
    category: "Communication",
    proficiency: "comfortable",
    tier: "working",
  },
  {
    name: "Product Presentation",
    category: "Communication",
    proficiency: "comfortable",
    tier: "working",
    evidence: { appliedIn: [WORK.jbites] },
  },

  // Languages
  {
    name: "Python",
    category: "Languages",
    proficiency: "proficient",
    tier: "core",
    evidence: {
      learnedThrough: [
        CERT.cisco,
        "University coursework",
        "Image Processing coursework",
        "Soft Computing coursework",
      ],
      // "AI Fitness Assistant" was removed here on 2026-08-17: that
      // repository contains no Python (React + TypeScript on Vite, with a
      // Deno edge function), and the claim contradicted its own case study.
      // TarmacOS: its bridge (bridge/server.py) is Python standard library.
      appliedIn: ["Rezolve Internship", WORK.tarmacos, "Personal Python projects"],
    },
  },
  { name: "TypeScript", category: "Languages", proficiency: "proficient", tier: "core" },
  { name: "JavaScript", category: "Languages", proficiency: "proficient", tier: "core" },
  {
    name: "Java",
    category: "Languages",
    proficiency: "comfortable",
    tier: "working",
    evidence: { appliedIn: [CERT.forage] },
  },
  {
    name: "C++",
    category: "Languages",
    proficiency: "comfortable",
    tier: "working",
    evidence: { appliedIn: [WORK.tarmacos] },
  },
  {
    name: "SQL",
    category: "Languages",
    proficiency: "comfortable",
    tier: "working",
    evidence: { appliedIn: [CERT.forage] },
  },

  // Frontend
  {
    name: "React",
    category: "Frontend",
    proficiency: "proficient",
    tier: "core",
    evidence: { appliedIn: ["Portfolio Website", "JBites (frontend)", "Other frontend work"] },
  },
  {
    name: "Next.js",
    category: "Frontend",
    proficiency: "proficient",
    tier: "core",
    evidence: { appliedIn: ["Portfolio Website", "JBites (frontend)", "Other frontend work"] },
  },
  { name: "HTML5", category: "Frontend", proficiency: "comfortable", tier: "working" },
  { name: "CSS3", category: "Frontend", proficiency: "comfortable", tier: "working" },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    proficiency: "comfortable",
    tier: "working",
    evidence: { appliedIn: ["Portfolio Website"] },
  },
  { name: "Vite", category: "Frontend", proficiency: "comfortable", tier: "working" },

  // Backend
  {
    name: "Node.js",
    category: "Backend",
    proficiency: "proficient",
    tier: "core",
    evidence: { appliedIn: ["Knowledge API", "Portfolio backend", "Personal projects"] },
  },
  { name: "Express.js", category: "Backend", proficiency: "proficient", tier: "core" },
  {
    name: "REST APIs",
    category: "Backend",
    proficiency: "proficient",
    tier: "core",
    evidence: { appliedIn: [CERT.forage] },
  },
  {
    name: "PostgreSQL",
    category: "Databases",
    proficiency: "proficient",
    tier: "core",
    evidence: { appliedIn: ["Knowledge API", "Registration System"] },
  },
  { name: "Firebase", category: "Databases", proficiency: "learning", tier: "exposure" },

  // AI / LLM / Intelligent Systems
  {
    name: "Prompt Engineering",
    category: "AI",
    proficiency: "proficient",
    tier: "core",
    evidence: { appliedIn: ["Rezolve Internship", "AI projects"] },
  },
  {
    name: "RAG",
    category: "AI",
    proficiency: "proficient",
    tier: "core",
    evidence: { appliedIn: ["Rezolve Internship", "AI research"] },
  },
  {
    name: "MCP",
    category: "AI",
    proficiency: "proficient",
    tier: "core",
    evidence: { appliedIn: ["Rezolve Internship", "AI research"] },
  },
  {
    name: "Pinecone",
    category: "AI",
    proficiency: "proficient",
    tier: "core",
    evidence: { appliedIn: ["Rezolve Internship", "AI research"] },
  },
  {
    name: "AI Agents",
    category: "AI",
    proficiency: "comfortable",
    tier: "working",
    evidence: { learnedThrough: [CERT.ibmAiAgent] },
  },
  {
    name: "Agentic AI",
    category: "AI",
    proficiency: "comfortable",
    tier: "working",
    evidence: { learnedThrough: [CERT.ibmAiAgent] },
  },
  {
    name: "LLM Applications",
    category: "AI",
    proficiency: "comfortable",
    tier: "working",
    evidence: { learnedThrough: [CERT.ibmAiAgent] },
  },
  {
    name: "Generative AI",
    category: "AI",
    proficiency: "comfortable",
    tier: "working",
    evidence: { learnedThrough: [CERT.ibmAiAgent] },
  },
  {
    name: "Natural Language Processing",
    category: "AI",
    proficiency: "comfortable",
    tier: "working",
    evidence: { learnedThrough: [CERT.ibmAiAgent] },
  },
  {
    name: "Machine Learning",
    category: "AI",
    proficiency: "comfortable",
    tier: "working",
    evidence: { learnedThrough: [CERT.ibmAiAgent, CERT.uniAthena, CERT.hpLife] },
  },
  {
    name: "Artificial Intelligence",
    category: "AI",
    proficiency: "comfortable",
    tier: "working",
    evidence: { learnedThrough: [CERT.uniAthena, CERT.hpLife, CERT.be10x] },
  },
  {
    name: "Vector Databases",
    category: "AI",
    proficiency: "comfortable",
    tier: "working",
    evidence: { appliedIn: ["Rezolve Internship (via Pinecone)"] },
  },
  {
    name: "AI Ethics",
    category: "AI",
    proficiency: "comfortable",
    tier: "working",
    evidence: { learnedThrough: [CERT.ibmAiAgent, CERT.hpLife, CERT.be10x] },
  },
  {
    name: "AI Agent Workflow",
    category: "AI",
    proficiency: "comfortable",
    tier: "working",
    evidence: { learnedThrough: [CERT.ibmAiAgent] },
  },
  {
    name: "Agent Deployment Lifecycle",
    category: "AI",
    proficiency: "comfortable",
    tier: "working",
    evidence: { learnedThrough: [CERT.ibmAiAgent] },
  },
  {
    name: "Evaluation Metrics",
    category: "AI",
    proficiency: "comfortable",
    tier: "working",
    evidence: { learnedThrough: [CERT.ibmAiAgent] },
  },

  // Software Engineering
  { name: "Git", category: "Tools", proficiency: "comfortable", tier: "working" },
  { name: "GitHub", category: "Tools", proficiency: "comfortable", tier: "working" },
  {
    name: "Maven",
    category: "Tools",
    proficiency: "learning",
    tier: "exposure",
    evidence: { appliedIn: [CERT.forage] },
  },
  {
    name: "Spring Boot",
    category: "Frameworks",
    proficiency: "learning",
    tier: "exposure",
    evidence: { appliedIn: [CERT.forage] },
  },
  {
    name: "Apache Kafka",
    category: "Tools",
    proficiency: "learning",
    tier: "exposure",
    evidence: { appliedIn: [CERT.forage] },
  },
  {
    name: "H2 Database",
    category: "Databases",
    proficiency: "learning",
    tier: "exposure",
    evidence: { appliedIn: [CERT.forage] },
  },
  { name: "Build Tools", category: "Tools", proficiency: "comfortable", tier: "working" },
  {
    name: "Message Queues",
    category: "Concepts",
    proficiency: "learning",
    tier: "exposure",
    evidence: { appliedIn: [CERT.forage] },
  },
  {
    name: "Object-Oriented Programming",
    category: "Fundamentals",
    proficiency: "comfortable",
    tier: "working",
    evidence: { learnedThrough: [CERT.cisco] },
  },
  {
    name: "Algorithms",
    category: "Fundamentals",
    proficiency: "comfortable",
    tier: "working",
    evidence: { learnedThrough: [CERT.cisco, CERT.uniAthena] },
  },
  {
    name: "Problem Solving",
    category: "Fundamentals",
    proficiency: "comfortable",
    tier: "working",
    evidence: { learnedThrough: [CERT.cisco, CERT.hpLife] },
  },
  { name: "Data Structures", category: "Fundamentals", proficiency: "comfortable", tier: "working" },
  {
    name: "Software Development",
    category: "Fundamentals",
    proficiency: "comfortable",
    tier: "working",
    evidence: { learnedThrough: [CERT.cisco, CERT.forage] },
  },

  // Data
  {
    name: "Data Analysis",
    category: "Data",
    proficiency: "comfortable",
    tier: "working",
    evidence: { learnedThrough: [CERT.uniAthena, CERT.hpLife, CERT.be10x] },
  },
  {
    name: "Automation",
    category: "Data",
    proficiency: "comfortable",
    tier: "working",
    evidence: { learnedThrough: [CERT.ibmAiAgent] },
  },

  // Concepts
  { name: "Authentication", category: "Concepts", proficiency: "comfortable", tier: "working" },
  { name: "API Design", category: "Concepts", proficiency: "comfortable", tier: "working" },
  { name: "Backend Architecture", category: "Concepts", proficiency: "comfortable", tier: "working" },
];

/** Full skill list — canonical source for the /skills page and Homepage. */
export function getAllSkills(): Skill[] {
  return allSkills;
}

export type SkillGroupIcon = "engineering" | "languages" | "ai" | "product";

export type SkillGroup = {
  label: string;
  skills: Skill[];
  /** One line of context, so the Home preview reads as capability rather
   * than a bare technology list. */
  description?: string;
  icon?: SkillGroupIcon;
};

function byName(names: string[]): Skill[] {
  return names
    .map((name) => allSkills.find((skill) => skill.name === name))
    .filter((skill): skill is Skill => Boolean(skill));
}

/**
 * Curated for the Homepage — four capability clusters, not a logo wall.
 * Frontend and Backend were merged into one "Engineering" cluster to make
 * room for Product & Communication as a peer: splitting the stack three
 * ways while product sat nowhere on the landing page misrepresented the
 * profile.
 *
 * Only consistently-used, confidently-defensible skills appear here;
 * learning-level ones (Spring Boot, Kafka) stay on the full /skills page.
 * Each cluster is capped at five so the preview stays a preview.
 */
export function getHomepageSkillGroups(): SkillGroup[] {
  return [
    {
      label: "Engineering",
      icon: "engineering",
      description: "Full-stack applications, built and shipped end to end.",
      skills: byName([
        "React",
        "Next.js",
        "Node.js",
        "Express.js",
        "PostgreSQL",
      ]),
    },
    {
      label: "Languages",
      icon: "languages",
      description: "What I write in.",
      skills: byName(["TypeScript", "JavaScript", "Python", "Java", "C++"]),
    },
    {
      label: "AI & Intelligent Systems",
      icon: "ai",
      description: "Retrieval, agents and applied LLM work.",
      skills: byName(["RAG", "Pinecone", "MCP", "Prompt Engineering"]),
    },
    {
      label: "Product & Communication",
      icon: "product",
      description: "Deciding what to build — and explaining it to people.",
      skills: byName([
        "Product Management",
        "Product Thinking",
        "Stakeholder Communication",
        "Product Positioning",
      ]),
    },
  ];
}

// Thematic groupings for the /skills page — deliberately not a raw
// Languages/Frontend/Backend/Tools dump. Each cluster tells a specific
// story about a facet of how skills get used together.
const SKILL_CLUSTERS: SkillCluster[] = [
  {
    id: "product-communication",
    title: "Product & Communication",
    description:
      "Deciding what should be built and why, then explaining it to the people who need to act on it. Held the product-manager role on JBITES.",
    skillNames: [
      "Product Management",
      "Product Thinking",
      "User Workflow Design",
      "Feature Prioritisation",
      "Requirements Analysis",
      "Product Ideation",
      "Product Positioning",
      "Stakeholder Communication",
      "Technical Communication",
      "Technical Documentation",
      "Value Communication",
      "Product Presentation",
      "Public Speaking",
    ],
  },
  {
    id: "product-engineering",
    title: "Product Engineering",
    description:
      "Languages and the full stack used to design, build, and ship products end-to-end.",
    skillNames: [
      "TypeScript",
      "JavaScript",
      "Python",
      "Java",
      "C++",
      "SQL",
      "React",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Vite",
      "Node.js",
      "Express.js",
      "REST APIs",
      "PostgreSQL",
      "Firebase",
    ],
  },
  {
    id: "ai-systems",
    title: "AI & Intelligent Systems",
    description:
      "Where most current focus goes — retrieval, agents, and applied LLM systems, not just theory.",
    skillNames: [
      "Prompt Engineering",
      "RAG",
      "MCP",
      "Pinecone",
      "Vector Databases",
      "AI Agents",
      "Agentic AI",
      "AI Agent Workflow",
      "Agent Deployment Lifecycle",
      "LLM Applications",
      "Generative AI",
      "Natural Language Processing",
      "Machine Learning",
      "Artificial Intelligence",
      "Evaluation Metrics",
      "AI Ethics",
    ],
  },
  {
    id: "engineering-craft",
    title: "Engineering Craft",
    description:
      "Version control, systems tooling, and the computer-science fundamentals underneath the product work.",
    skillNames: [
      "Git",
      "GitHub",
      "Build Tools",
      "Maven",
      "Spring Boot",
      "Apache Kafka",
      "H2 Database",
      "Message Queues",
      "Object-Oriented Programming",
      "Algorithms",
      "Data Structures",
      "Problem Solving",
      "Software Development",
    ],
  },
  {
    id: "systems-thinking",
    title: "Systems Thinking",
    description: "How data, architecture, and reliability get reasoned about beyond any single feature.",
    skillNames: ["Data Analysis", "Automation", "Authentication", "API Design", "Backend Architecture"],
  },
];

export type ResolvedSkillCluster = {
  cluster: SkillCluster;
  skills: Skill[];
};

export function getSkillClusters(): ResolvedSkillCluster[] {
  return SKILL_CLUSTERS.map((cluster) => ({
    cluster,
    skills: byName(cluster.skillNames),
  }));
}

// Capability chains — the first three are given directly; the fourth is
// derived entirely from the real JPMorgan Forage certificate skill list
// (see lib/content/certificates.ts), not invented.
const SKILL_CHAINS: SkillChain[] = [
  {
    id: "ai-pathway",
    title: "AI Systems Pathway",
    steps: [
      "Python",
      "Machine Learning",
      "Prompt Engineering",
      "LLM Applications",
      "RAG",
      "Pinecone",
      "AI Agents",
    ],
  },
  {
    id: "frontend-pathway",
    title: "Modern Frontend",
    steps: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    id: "backend-pathway",
    title: "Backend Systems",
    steps: ["Node.js", "Express.js", "REST APIs", "PostgreSQL"],
  },
  {
    id: "enterprise-pathway",
    title: "Enterprise Backend (JPMorgan Forage Simulation)",
    steps: ["Java", "Spring Boot", "Apache Kafka", "Message Queues"],
  },
];

export type ResolvedSkillChain = {
  chain: SkillChain;
  skills: Skill[];
};

export function getSkillChains(): ResolvedSkillChain[] {
  return SKILL_CHAINS.map((chain) => ({
    chain,
    skills: byName(chain.steps),
  }));
}

/**
 * Headline capabilities, stated before the technology inventory so the
 * profile reads as engineering + product + communication rather than a
 * stack list with soft skills bolted on the end. Engineering leads because
 * it's the foundation the rest stands on; product follows immediately
 * rather than being buried.
 *
 * Each `evidence` string names something checkable elsewhere on this site.
 */
const CAPABILITIES: ProfessionalCapability[] = [
  {
    id: "software-engineering",
    title: "Software Engineering",
    kind: "engineering",
    description:
      "Building full-stack applications end to end — interface, data model, access rules and the integrations between them.",
    evidence: "Two shipped applications + this site",
    skills: ["TypeScript", "React", "Next.js", "PostgreSQL"],
  },
  {
    id: "product-management",
    title: "Product Management",
    kind: "product",
    description:
      "Guiding product direction on a live student project: feature ideation, user workflows, prioritisation and scope decisions.",
    evidence: "JBITES · Role: Product Manager",
    skills: [
      "Product Management",
      "Feature Prioritisation",
      "User Workflow Design",
    ],
  },
  {
    id: "product-thinking",
    title: "Product Thinking",
    kind: "product",
    description:
      "Starting from the problem rather than the stack — who has it, what the current workaround costs, and what is actually worth building.",
    evidence: "Problem-first framing across both case studies",
    skills: ["Product Thinking", "Requirements Analysis", "Product Ideation"],
  },
  {
    id: "product-communication",
    title: "Product Communication",
    kind: "communication",
    description:
      "Turning what a product does into why it matters — positioning a feature, writing the copy around it, and presenting it to an audience.",
    evidence: "JBITES product positioning & presentation",
    skills: ["Product Positioning", "Value Communication", "Product Presentation"],
  },
  {
    id: "stakeholder-communication",
    title: "Stakeholder Communication",
    kind: "communication",
    description:
      "Explaining technical findings to people who won't read the code — the core deliverable of the Rezolve.ai internship.",
    evidence: "Rezolve.ai · findings documented for engineering & product",
    skills: [
      "Stakeholder Communication",
      "Technical Communication",
      "Technical Documentation",
    ],
  },
];

export function getCapabilities(): ProfessionalCapability[] {
  return CAPABILITIES;
}

/**
 * The proof layer. Every entry maps a skill to a specific place it was
 * used and what was done there.
 *
 * Accuracy note: the obvious-looking pairings are wrong for these
 * projects and are deliberately absent — JIIT Lost & Found has no Node.js
 * backend and the fitness app has no Python/FastAPI layer. Both are React
 * + TypeScript on Supabase, and the rows below say so.
 */
const APPLICATIONS: SkillApplication[] = [
  {
    skill: "Product Management",
    context: "JBITES — Online Canteen Application",
    detail:
      "Product-manager role: feature ideation, user workflows, prioritisation and overall product direction.",
  },
  {
    skill: "React & TypeScript",
    context: "JIIT Lost & Found",
    href: "/projects/jiit-lost-and-found",
    detail:
      "Built the campus recovery interface — listing creation, finder requests and owner-controlled resolution.",
  },
  {
    skill: "PostgreSQL & Row-Level Security",
    context: "JIIT Lost & Found",
    href: "/projects/jiit-lost-and-found",
    detail:
      "Modelled five tables in versioned migrations, with access policies scoping every row to its owner.",
  },
  {
    skill: "Edge Functions & Streaming",
    context: "AI-Assisted Fitness App",
    href: "/projects/ai-fitness-assistant",
    detail:
      "Server-side function that injects profile and log context into the prompt and streams the reply over SSE.",
  },
  {
    skill: "Applied Formula Engines",
    context: "AI-Assisted Fitness App",
    href: "/projects/ai-fitness-assistant",
    detail:
      "Mifflin–St Jeor BMR, TDEE and hydration targets computed locally, so deterministic questions never reach a model.",
  },
  {
    skill: "C++ & POSIX Threads",
    context: "TarmacOS",
    href: "/projects/tarmacos",
    detail:
      "A Linux simulation engine with a pthread per flight and per ground service, coordinated by one mutex, condition variables and semaphores.",
  },
  {
    skill: "Processes & IPC",
    context: "TarmacOS",
    href: "/projects/tarmacos",
    detail:
      "A real child process created with fork(), exchanging requests and plans over two pipes with a poll() timeout, and reaped with waitpid().",
  },
  {
    skill: "Pinecone & Vector Search",
    context: "Rezolve.ai Internship",
    href: "/experience",
    detail:
      "Investigated how embeddings are stored and retrieved, and why stale vectors must be explicitly removed.",
  },
  {
    skill: "Data Ingestion & Embeddings",
    context: "Rezolve.ai Internship",
    href: "/experience",
    detail:
      "Traced enterprise content from SharePoint, Confluence and ServiceNow through processing into retrieval.",
  },
  {
    skill: "Next.js & Tailwind CSS",
    context: "Portfolio Website",
    detail:
      "This site — App Router, a token-driven design system and static generation throughout.",
  },
];

export function getSkillApplications(): SkillApplication[] {
  return APPLICATIONS;
}

/** Problem → delivery, the arc the product-side capabilities sit on. */
const PRODUCT_FLOW: ProductFlowStage[] = [
  { label: "Problem", detail: "Who is stuck, and what does the workaround cost them?" },
  { label: "Product idea", detail: "What would actually resolve it, and what wouldn't." },
  { label: "Feature planning", detail: "Scope, sequence and what to leave out." },
  { label: "User experience", detail: "The workflow a real person moves through." },
  { label: "Engineering", detail: "Data model, access rules, interface." },
  { label: "Delivery", detail: "Shipped, documented and explained to others." },
];

export function getProductFlow(): ProductFlowStage[] {
  return PRODUCT_FLOW;
}

/** Current direction — drawn from where recent project and role work sits. */
export function getCurrentFocus(): string[] {
  return [
    "AI-integrated product development",
    "Agentic AI & retrieval systems",
    "Full-stack TypeScript",
    "Product thinking & strategy",
  ];
}
