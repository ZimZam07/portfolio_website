export const siteConfig = {
  name: "Zimran Ullah",
  role: "Software Engineer — Full-Stack & AI Products",
  roleContext: "B.Tech CSE · JIIT · Expected 2028",
  tagline:
    "I build backend and AI-integrated systems — APIs, databases, knowledge retrieval pipelines — and care more about how the pieces work together than any single feature in isolation.",
  photo: "/images/profile.jpeg",
  email: "zimranullahsjc1999@gmail.com",
  location: "Noida, India",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  resumeUrl: "/resume.pdf",
} as const;

// Any entry left empty is omitted wherever it's rendered (nav, footer,
// hero, contact) rather than linking to a dead/placeholder URL — see
// docs/03-wireframes.md §0.3. LeetCode and Calendly stay empty because no
// such profiles were provided; they render nothing until one is.
export const socialLinks = {
  github: "https://github.com/ZimZam07",
  linkedin: "https://www.linkedin.com/in/zimran-ullah",
  leetcode: "",
  calendly: "",
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const primaryNavItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Certificates", href: "/certificates" },
  { label: "Contact", href: "/contact" },
];

export const keyboardShortcuts = {
  github: "g",
  linkedin: "l",
  resume: "r",
  projects: "p",
  aiAssistant: "a",
  contact: "c",
} as const;
