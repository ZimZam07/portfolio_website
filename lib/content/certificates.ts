import type { Certificate } from "@/types/certificate";

// Timeline/list design, not a badge gallery. `credentialUrl` opens via a
// "View Credential" button only; never rendered inline on the page.
// Order below is by impact/priority, not chronology — the /certificates
// page renders this order directly, with the first entry given the
// strongest visual emphasis.
//
// `logo` paths follow an issuer-slug convention (public/logos/<slug>.ext)
// and are left unset until a real file exists — OrgLogo falls back to a
// known-brand vector (Cisco, HP) or a neutral monogram otherwise.
const certificates: Certificate[] = [
  {
    id: "ibm-build-an-ai-agent",
    title: "Build an AI Agent",
    issuer: "IBM SkillsBuild",
    dateIssued: "June 23, 2026",
    category: "Artificial Intelligence",
    skillsDemonstrated: [
      "AI Agents",
      "Agentic AI",
      "Generative AI",
      "Large Language Models (LLMs)",
      "Prompt Engineering",
      "Natural Language Processing (NLP)",
      "Python",
      "AI Agent Workflow",
      "Agent Deployment Lifecycle",
      "Evaluation Metrics",
      "Automation",
      "AI Ethics",
      "Machine Learning",
    ],
    whyItMatters:
      "This certificate gave me my first structured introduction to AI agents and agentic workflows. I learned how AI agents are designed, how they reason through tasks, how to evaluate their performance, and the considerations involved in deploying them responsibly. It strengthened my understanding of LLM-powered applications and directly influenced my interest in building AI-integrated products, which I later explored further during my internship at Rezolve.ai.",
    credentialUrl:
      "https://www.credly.com/badges/76024c07-1d15-4487-96b4-b78ad3920daa/public_url",
    logo: "/logos/ibm.png",
  },
  {
    id: "forage-jpmorgan-swe-simulation",
    title: "JPMorganChase – Software Engineering Job Simulation",
    issuer: "Forage (JPMorgan Chase & Co.)",
    dateIssued: "June 2026",
    category: "Backend Development",
    skillsDemonstrated: [
      "Java",
      "Spring Boot",
      "REST APIs",
      "Apache Kafka",
      "H2 Database",
      "Maven",
      "SQL",
      "Message Queues",
      "Software Development",
    ],
    whyItMatters:
      "This was my first exposure to building enterprise-style backend systems. Through the simulation, I worked with Spring Boot, REST APIs, Apache Kafka, Maven, H2 Database, and SQL while understanding how distributed backend services communicate. It strengthened my backend development fundamentals and sparked my interest in scalable software systems.",
    credentialId: "LEN7JDsamMbsB4974",
    credentialUrl:
      "https://www.theforage.com/completion-certificates/Sj7temL583QAYpHXD/E6McHJDKsQYh79moz_Sj7temL583QAYpHXD_69a69ed3c8f9da5081318227_1780558242870_completion_certificate.pdf",
    logo: "/logos/forage.jpg",
  },
  {
    id: "cisco-python-essentials-1",
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy",
    dateIssued: "June 2026",
    category: "Programming",
    skillsDemonstrated: [
      "Python",
      "Object-Oriented Programming (OOP)",
      "Algorithms",
      "Problem Solving",
      "Software Development",
    ],
    whyItMatters:
      "This certification strengthened my programming fundamentals in Python and reinforced core computer science concepts such as object-oriented programming, algorithms, and structured problem solving. It provided a solid foundation that I later applied while building backend systems, automation scripts, and AI-related projects.",
    credentialUrl:
      "https://www.credly.com/badges/52432611-a416-43f4-84df-4d772203c9ed/public_url",
  },
  {
    id: "uniathena-ml-algorithms-basics",
    title: "Basics of Machine Learning Algorithms",
    issuer: "UniAthena",
    dateIssued: "April 2026",
    category: "Machine Learning",
    skillsDemonstrated: [
      "Python",
      "Machine Learning",
      "Data Analysis",
      "Algorithms",
      "Artificial Intelligence (AI)",
    ],
    whyItMatters:
      "This course introduced me to the core concepts of machine learning, including common learning algorithms, data analysis techniques, and AI fundamentals using Python. It provided a strong theoretical foundation that later helped me better understand LLMs, AI agents, retrieval-augmented systems, and other AI-powered applications while working on personal projects and during my internship at Rezolve.ai.",
    credentialId: "5385-9847-0749",
    credentialUrl:
      "https://docs.uniathena.com/prod/course/certificate/322_1776094084_certificate.jpg",
    logo: "/logos/uniathena.jpg",
  },
  {
    id: "hp-life-ai-for-beginners",
    title: "AI for Beginners",
    issuer: "HP LIFE",
    dateIssued: "March 2026",
    category: "Artificial Intelligence",
    skillsDemonstrated: [
      "Artificial Intelligence (AI) Fundamentals",
      "Machine Learning Basics",
      "Data Analysis",
      "AI Ethics",
      "Problem Solving",
    ],
    whyItMatters:
      "This course introduced me to the fundamentals of artificial intelligence, machine learning concepts, data analysis, and responsible AI practices. It helped me build a strong conceptual understanding of AI before moving on to more advanced topics such as AI agents, LLMs, retrieval-augmented generation (RAG), and AI-powered backend systems in later projects and my internship at Rezolve.ai.",
    credentialId: "3f3477ec-f022-4c79-a31e-20a9d263f61c",
    credentialUrl:
      "https://www.life-global.org/certificate/3f3477ec-f022-4c79-a31e-20a9d263f61c",
  },
  {
    id: "be10x-ai-tools-workshop",
    title: "AI Tools Workshop",
    issuer: "Be10x",
    dateIssued: "March 2026",
    category: "Artificial Intelligence",
    skillsDemonstrated: [
      "Artificial Intelligence (AI) Fundamentals",
      "Data Analysis",
      "AI Ethics",
    ],
    whyItMatters:
      "This workshop introduced me to practical AI tools and workflows while reinforcing core AI concepts, responsible AI practices, and data-driven problem solving. It complemented my theoretical learning and encouraged me to start exploring AI-powered productivity tools and real-world applications, which later evolved into building AI-integrated systems and working with agentic AI during my internship at Rezolve.ai.",
    credentialId: "0270772f-3809-4400-b29b-1e1c61cd09971133191",
    credentialUrl:
      "https://certx.in/certificate/0270772f-3809-4400-b29b-1e1c61cd09971133191",
    logo: "/logos/be10x.png",
  },
];

/** Impact-ordered — index 0 is the strongest, most emphasized entry. */
export function getCertificates(): Certificate[] {
  return certificates;
}
