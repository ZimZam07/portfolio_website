import type { Experience } from "@/types/experience";

/*
 * Framing rule for this module: this was a research internship, and the
 * copy has to read that way. Every strand below is written as
 * investigation, evaluation or documentation of systems that already
 * existed — never as authorship of Rezolve.ai's production platform,
 * pipeline or vector infrastructure. Verbs are chosen deliberately.
 *
 * No metrics appear here. None were available, and inventing counts of
 * POCs, APIs or documents would be fabrication.
 */
const experience: Experience[] = [
  {
    role: "AI Research Intern",
    company: "Rezolve.ai",
    companyUrl: "https://www.rezolve.ai/",
    companyLogo: { src: "/logos/rezolve-ai.png", width: 599, height: 116 },
    companyDescription:
      "Rezolve.ai builds an agentic AI service desk for IT, HR and finance teams — virtual agents, ticket intelligence and knowledge management grounded in an organisation's own knowledge base.",
    location: "Remote",
    employmentType: "internship",
    startDate: "2026-07-01",
    endDate: "2026-08-31",
    dateRangeLabel: "Jul 2026 — Aug 2026",
    preciseDateLabel: "01 Jul 2026 — 31 Aug 2026",
    durationLabel: "2 months",

    summary:
      "Two months inside an enterprise agentic AI platform, spent working out what makes these systems hold up in practice. I traced enterprise knowledge from its source systems through ingestion and embeddings into vector search, assessed platforms and APIs for feasibility, validated approaches through proof-of-concept work, and documented the data-quality issues that quietly determine whether AI-powered retrieval returns something useful or something stale.",

    highlights: [
      "Enterprise agentic AI research & feasibility analysis",
      "Knowledge ingestion and retrieval investigation",
      "Embeddings, vector storage and data-quality edge cases",
    ],

    contributions: [
      {
        title: "Enterprise AI product research",
        description:
          "Studied how agentic AI is applied to employee support, mapping platform capabilities across virtual agents, knowledge management and ticketing against the service-desk workflows they are intended to absorb.",
      },
      {
        title: "Technical feasibility analysis",
        description:
          "Assessed platforms, APIs and integration routes to judge what was practically achievable, surfacing the constraints and dependencies that would shape any implementation before effort was committed to it.",
      },
      {
        title: "Proof-of-concept validation",
        description:
          "Put candidate approaches through small-scale trials to confirm they behaved as their documentation claimed, separating what genuinely worked from what only appeared to.",
      },
      {
        title: "Knowledge ingestion investigation",
        description:
          "Traced how content from SharePoint, Confluence, ServiceNow and Google Drive is extracted, processed and prepared for retrieval, following the transformations applied at each step.",
      },
      {
        title: "Retrieval and vector storage analysis",
        description:
          "Followed processed content into embeddings and vector storage, examining how records are matched at query time and what happens to them when the underlying source changes.",
      },
      {
        title: "Data-quality investigation",
        description:
          "Reviewed ingestion behaviour against the kind of messy real-world documents enterprises actually hold, and identified failure cases that degrade retrieval quality without producing any visible error.",
      },
      {
        title: "Technical documentation",
        description:
          "Wrote up findings, edge cases and recommendations so that both engineering and product stakeholders could act on them without needing to repeat the investigation.",
      },
    ],

    focusAreas: [
      {
        title: "AI Research",
        icon: "research",
        items: ["Agentic AI", "Enterprise AI", "AI workflows"],
      },
      {
        title: "Technical Evaluation",
        icon: "evaluation",
        items: ["APIs", "Platforms", "Integrations", "POCs"],
      },
      {
        title: "Knowledge Systems",
        icon: "knowledge",
        items: [
          "Knowledge Management",
          "Retrieval",
          "Embeddings",
          "Vector Search",
        ],
      },
      {
        title: "Data Pipelines",
        icon: "pipeline",
        items: ["Ingestion", "Transformation", "Metadata", "Data Quality"],
      },
      {
        title: "Product Understanding",
        icon: "product",
        items: ["Virtual Agent", "Ticket Management", "Service Teams"],
      },
    ],

    pipeline: [
      {
        label: "Enterprise Sources",
        icon: "sources",
        caption: "connectors",
        items: ["SharePoint", "Confluence", "ServiceNow", "Google Drive"],
      },
      {
        label: "Ingestion",
        icon: "ingestion",
        caption: "Azure Service Bus",
        items: ["Extract", "Process", "Transform"],
      },
      {
        label: "Representation",
        icon: "embeddings",
        caption: "vectorisation",
        items: ["Embeddings", "Metadata"],
      },
      {
        label: "Vector Storage",
        icon: "storage",
        caption: "Pinecone",
        items: ["Upsert", "Lifecycle"],
      },
      {
        label: "Retrieval",
        icon: "retrieval",
        caption: "query time",
        items: ["Knowledge retrieval", "Agentic workflows"],
      },
    ],

    investigations: [
      {
        title: "Metadata preservation",
        description:
          "Examined how source-level metadata such as worksheet and tab names can be carried through ingestion rather than discarded, so retrieved content keeps the context that made it meaningful in the first place.",
      },
      {
        title: "Merged-cell handling",
        description:
          "Identified why merged cells need forward-fill logic: without it, the rows beneath a merged heading inherit blanks and lose the category they belonged to.",
      },
      {
        title: "Table boundary detection",
        description:
          "Analysed how blank rows delimit distinct tables within a single sheet, and what breaks downstream when two unrelated tables are read as one continuous region.",
      },
      {
        title: "Semantic row classification",
        description:
          "Explored tagging total, subtotal and footer rows so later processing can distinguish aggregates from ordinary records instead of treating them as equivalent data.",
      },
      {
        title: "Vector lifecycle",
        description:
          "Investigated how content deleted or updated at source can linger as stale vectors, and why obsolete records need explicit identification and removal to keep retrieval trustworthy.",
      },
    ],

    techGroups: [
      {
        label: "AI & Platform",
        items: [
          "Agentic AI",
          "Virtual Agents",
          "Knowledge Management",
          "Ticket Management",
        ],
      },
      {
        label: "Data & Retrieval",
        items: ["Embeddings", "Vector Search", "Pinecone", "Data Ingestion"],
      },
      {
        label: "Integrations",
        items: ["SharePoint", "Confluence", "ServiceNow", "Google Drive"],
      },
      {
        label: "Processing",
        items: ["Azure Service Bus", "APIs"],
      },
    ],

    takeaways: {
      summary:
        "The most useful thing I took away was a different standard for judging AI systems. A capability demo tells you very little; what decides whether an enterprise AI system works is the quality of the data reaching it — whether ingestion preserves the structure and metadata that made the source meaningful, whether retrieval returns current content instead of stale vectors, and whether integrations survive documents messier than any example in the docs. I left able to assess these systems on feasibility, data and integration grounds rather than on features alone.",
      areas: [
        "Enterprise AI evaluation",
        "Systems thinking",
        "Data-quality analysis",
        "Retrieval & vector search",
        "Technical documentation",
        "Stakeholder communication",
      ],
    },
  },
];

export function getAllExperience(): Experience[] {
  return experience;
}

export function getRecentExperience(): Experience[] {
  return experience;
}
