import { siteConfig } from "@/lib/constants";
import { getAvailability } from "@/lib/content/availability";
import { getFeaturedProjects } from "@/lib/content/projects";
import { getAllSkills } from "@/lib/content/skills";
import type { Skill } from "@/types/skill";

/*
 * Recruiter Mode content.
 *
 * Everything here is derived from existing content modules or restates
 * facts already published elsewhere on the site — nothing is authored
 * fresh for this page. Three deliberate omissions:
 *
 *  - No CGPA. None exists anywhere in the project.
 *  - No FastAPI / MongoDB / Redis / Docker / VS Code / Postman. These do
 *    not appear in lib/content/skills.ts, so they are not claimed here.
 *  - No stat counts (projects shipped, years of experience, etc.). The
 *    numbers would be trivially derivable but read as inflated metrics,
 *    and the wireframes' stat strip was designed around data that was
 *    never gathered.
 */

export type SnapshotCard = {
  label: string;
  value: string;
  detail?: string;
  icon: "education" | "location" | "looking" | "mode" | "relocation";
};

export type Strength = {
  index: string;
  title: string;
  description: string;
  icon: "fullstack" | "ai" | "product";
};

export type TechGroup = {
  label: string;
  skills: Skill[];
};

export type RecruiterRole = {
  role: string;
  organisation: string;
  period?: string;
  detail: string;
};

const availability = getAvailability();

export const recruiterHero = {
  eyebrow: "Recruiter Mode",
  name: siteConfig.name,
  title: "AI Software Engineer",
  summary:
    "B.Tech CSE student building full-stack systems, AI-integrated products, backend services, and knowledge-driven applications.",
};

export function getSnapshot(): SnapshotCard[] {
  return [
    {
      icon: "education",
      label: "Education",
      value: "B.Tech CSE",
      detail: "JIIT · Expected 2028",
    },
    { icon: "location", label: "Location", value: siteConfig.location },
    {
      icon: "looking",
      label: "Looking for",
      value: "AI Software Engineering",
      detail: "AI / Product Development",
    },
    {
      icon: "mode",
      label: "Work mode",
      value: (availability.workModes ?? []).join(" · "),
    },
    {
      icon: "relocation",
      label: "Relocation",
      value: availability.relocation ? "Open to relocation" : "Not relocating",
    },
  ];
}

export function getStrengths(): Strength[] {
  return [
    {
      index: "01",
      icon: "fullstack",
      title: "Full-Stack",
      description:
        "Building applications across frontend, backend, APIs and databases.",
    },
    {
      index: "02",
      icon: "ai",
      title: "AI Systems",
      description:
        "Working with AI-integrated applications, retrieval pipelines, embeddings and knowledge systems.",
    },
    {
      index: "03",
      icon: "product",
      title: "Product Thinking",
      description:
        "Focused on how systems work together — not just isolated features.",
    },
  ];
}

/**
 * Technology groups. Every name below is asserted to exist in
 * lib/content/skills.ts — `byName` silently drops anything that doesn't,
 * so a rename upstream removes the chip rather than printing a claim the
 * skills page can't back up.
 */
const ALL_SKILLS = getAllSkills();

function byName(names: string[]): Skill[] {
  return names
    .map((name) => ALL_SKILLS.find((skill) => skill.name === name))
    .filter((skill): skill is Skill => Boolean(skill));
}

export function getTechGroups(): TechGroup[] {
  return [
    {
      label: "Languages",
      skills: byName(["TypeScript", "JavaScript", "Python", "Java", "C++", "SQL"]),
    },
    {
      label: "Frontend",
      skills: byName(["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "Vite"]),
    },
    { label: "Backend", skills: byName(["Node.js", "Express.js", "REST APIs"]) },
    { label: "Databases", skills: byName(["PostgreSQL", "Firebase"]) },
    {
      label: "AI & Retrieval",
      skills: byName([
        "RAG",
        "Pinecone",
        "Vector Databases",
        "MCP",
        "Prompt Engineering",
      ]),
    },
    { label: "Tools", skills: byName(["Git", "GitHub"]) },
  ].filter((group) => group.skills.length > 0);
}

/** The full featured set — there are two, and a third isn't invented. */
export function getSelectedWork() {
  return getFeaturedProjects();
}

/**
 * Roles. The Rezolve.ai entry comes from lib/content/experience.ts; the
 * two product roles are the ones already published in the About journey.
 * Only Rezolve.ai carries a period, because it's the only one with dates
 * anywhere in the project.
 */
export function getRoles(): RecruiterRole[] {
  return [
    {
      role: "AI Research Intern",
      organisation: "Rezolve.ai",
      period: "Jul — Aug 2026",
      detail:
        "Investigated enterprise agentic AI — knowledge ingestion, embeddings, vector search and the data-quality issues that degrade retrieval.",
    },
    {
      role: "Product Manager",
      organisation: "JBITES — Online Canteen Application",
      detail:
        "Product direction, feature ideation, user workflows and prioritisation on a campus ordering app.",
    },
    {
      role: "Product Manager",
      organisation: "Forever India",
      detail: "A short product engagement.",
    },
  ];
}

export const education = {
  institution: "Jaypee Institute of Information Technology",
  degree: "B.Tech — Computer Science & Engineering",
  period: "Expected 2028",
  location: siteConfig.location,
};

export function getLookingFor() {
  return {
    status: availability.currentStatus,
    primary: "AI Software Engineering Opportunities",
    secondary: "AI / Product Development",
    workModes: availability.workModes ?? [],
    location: siteConfig.location,
    relocation: availability.relocation
      ? "Open to relocation"
      : "Not relocating",
  };
}

/** Quick Scan highlights — each restates something shown on this page. */
export const quickScan = {
  highlights: [
    "B.Tech CSE — JIIT, expected 2028",
    "Full-stack development across frontend, backend and databases",
    "AI-integrated systems and retrieval pipelines",
    "Backend services and REST APIs",
    "Knowledge and vector-search systems",
  ],
  availableFor: [
    "AI Engineering",
    "Backend",
    "Full-Stack",
    "AI / Product Development",
  ],
};
