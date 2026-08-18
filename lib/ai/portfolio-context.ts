import "server-only";

import { siteConfig, socialLinks } from "@/lib/constants";
import { getAvailability } from "@/lib/content/availability";
import { getAllProjects } from "@/lib/content/projects";
import { getAllExperience } from "@/lib/content/experience";
import { getSkillClusters } from "@/lib/content/skills";
import { getCertificates } from "@/lib/content/certificates";
import { education, getRoles } from "@/lib/content/recruiter";
import { aboutIntro, getBeyond, venture } from "@/lib/content/about";

/**
 * Builds the assistant's knowledge of the portfolio from the same content
 * modules the pages render.
 *
 * Deriving it rather than maintaining a second hand-written biography is
 * the whole point: update a project or a skill and the assistant's answers
 * change with it, so it can never drift out of sync with the site. Nothing
 * is authored here — this file only formats existing data.
 *
 * `server-only` makes a mistaken client import a build error rather than a
 * silent leak of the whole context into the browser bundle.
 */
function block(title: string, body: string) {
  return `## ${title}\n${body.trim()}`;
}

export function buildPortfolioContext(): string {
  const availability = getAvailability();
  const projects = getAllProjects();
  const [experience] = getAllExperience();
  const clusters = getSkillClusters();
  const certificates = getCertificates();

  const sections: string[] = [];

  sections.push(
    block(
      "Identity",
      `Name: ${siteConfig.name}
Role: ${siteConfig.role}
Context: ${siteConfig.roleContext}
Location: ${siteConfig.location}
Positioning: ${siteConfig.tagline}`,
    ),
  );

  sections.push(
    block(
      "About",
      `${aboutIntro.lead}\n${aboutIntro.paragraphs.join("\n")}`,
    ),
  );

  sections.push(
    block(
      "Education",
      `${education.degree}, ${education.institution}. ${education.period}.`,
    ),
  );

  sections.push(
    block(
      "Availability",
      `Status: ${availability.currentStatus}
Looking for: ${(availability.lookingFor ?? []).join(", ")} (also open to AI / product development)
Work modes: ${(availability.workModes ?? []).join(", ")}
Relocation: ${availability.relocation ? "Open to relocation" : "Not relocating"}
Work authorisation: ${availability.workAuthorization ?? "Not stated"}`,
    ),
  );

  sections.push(
    block(
      "Contact (public — safe to share)",
      `Email: ${siteConfig.email}
LinkedIn: ${socialLinks.linkedin || "not published"}
GitHub: ${socialLinks.github || "not published"}
Contact page: /contact`,
    ),
  );

  sections.push(
    block(
      "Projects",
      projects
        .map((project) => {
          const lines = [
            `### ${project.title} (${project.category}, ${project.status}) — page: /projects/${project.slug}`,
            project.tagline,
            project.problemStatement && `Problem: ${project.problemStatement}`,
            project.solution && `Solution: ${project.solution}`,
            `Tech: ${project.techStack.join(", ")}`,
            project.capabilities?.length &&
              `Capabilities: ${project.capabilities.map((c) => `${c.title} — ${c.description}`).join(" | ")}`,
            project.technicalNotes?.length &&
              `Implementation: ${project.technicalNotes.map((n) => `${n.area}: ${n.detail}`).join(" | ")}`,
            project.intelligence &&
              `AI layer: ${project.intelligence.summary}`,
            project.engineeringFocus &&
              `Engineering focus: ${project.engineeringFocus.summary}`,
            project.links.live && `Live: ${project.links.live}`,
            project.links.github && `Source: ${project.links.github}`,
          ].filter(Boolean);
          return lines.join("\n");
        })
        .join("\n\n"),
    ),
  );

  if (experience) {
    sections.push(
      block(
        "Professional experience",
        `### ${experience.role} — ${experience.company} (${experience.preciseDateLabel ?? ""}, ${experience.durationLabel ?? ""}, ${experience.location})
About the company: ${experience.companyDescription ?? ""}
Summary: ${experience.summary ?? ""}
What the work involved: ${(experience.contributions ?? []).map((c) => `${c.title} — ${c.description}`).join(" | ")}
Systems investigated (NOT built by him): ${(experience.pipeline ?? []).map((s) => `${s.label} (${s.items.join(", ")})`).join(" -> ")}
Technical issues examined: ${(experience.investigations ?? []).map((i) => `${i.title} — ${i.description}`).join(" | ")}
Takeaway: ${experience.takeaways?.summary ?? ""}`,
      ),
    );
  }

  sections.push(
    block(
      "Other roles",
      getRoles()
        .map(
          (role) =>
            `${role.role} — ${role.organisation}${role.period ? ` (${role.period})` : " (no dates recorded)"}: ${role.detail}`,
        )
        .join("\n"),
    ),
  );

  sections.push(
    block(
      "Skills",
      clusters
        .map(
          ({ cluster, skills }) =>
            `### ${cluster.title}\n${cluster.description}\n${skills
              .map((s) => `${s.name} (${s.tier ?? "working"})`)
              .join(", ")}`,
        )
        .join("\n\n"),
    ),
  );

  sections.push(
    block(
      "Skill depth tiers",
      `"core" = used consistently across real work. "working" = real applied experience, not a daily driver. "exposure" = learned through focused study rather than repeated production use. Never describe these as percentages or ratings.`,
    ),
  );

  sections.push(
    block(
      "Certificates",
      certificates
        .map((c) => `${c.title} — ${c.issuer} (${c.dateIssued})`)
        .join("\n"),
    ),
  );

  sections.push(
    block(
      "Currently building",
      `${venture.title} (${venture.stage}). ${venture.problem} ${venture.approach} Team: ${venture.team.join(" and ")} — ${venture.teamNote}. No launch date, user numbers, or revenue exist.`,
    ),
  );

  sections.push(
    block(
      "Outside work",
      getBeyond()
        .map((item) => `${item.title}: ${item.detail}`)
        .join("\n"),
    ),
  );

  return sections.join("\n\n");
}
