# Phase 1 — Information Architecture

Status: DRAFT — for review before Phase 2 (Design System)

## 1. Guiding principle

Every route, component, and content field exists to answer one question a recruiter
is asking within 30 seconds: **"Should I interview this person?"** If a piece of
content doesn't move that decision, it gets cut or demoted to a secondary page.

## 2. Sitemap

```
/                          Home (Hero, Availability strip, Quick Stats, About preview,
                            Currently Building, Skills preview, Featured Projects (top 3),
                            Experience preview, Contact CTA)
/about                     Full About + Timeline (derived) + Education + GitHub Dashboard
/experience                Full experience timeline
/projects                  Project grid with filters
/projects/[slug]           Individual project case study
/skills                    Full categorized skills page
/achievements              Achievement list (expandable entries, single format — no card duplication)
/certificates              Certificate gallery with filters
/articles                  Blog/article index (search, tags, categories)
/articles/[slug]           Individual article (MDX)
/resume                    Embedded resume viewer + version switcher
/contact                   Contact form + Schedule Meeting (Calendly) + all links
/recruiter                 Recruiter Mode — condensed single-scroll view

Global overlays (not routes):
- Command palette + search, unified (Ctrl+K) — navigation commands and fuzzy
  content search in one surface, not two separate patterns
- AI Assistant — floating trigger, available from anywhere, kept separate from
  the palette since it's a conversational surface, not a lookup tool
```

Rationale for `/recruiter` as a real route rather than a client-side toggle:
it's linkable ("send a recruiter this exact URL"), indexable separately, and
avoids layout-shift hacks from hiding/showing DOM on the fly.

## 3. Navigation

Sticky, transparent → solid-on-scroll. Desktop: Home / About / Experience /
Projects / Skills / Certificates / Articles / Resume / Contact, plus a visually
distinct "Recruiter Mode" pill and a search icon (Ctrl+K). Mobile: hamburger →
full-screen sheet, same order. Active-section highlighting on the one-page
sections (Home) via IntersectionObserver; standard active-route highlighting
on real routes.

## 4. Content model

These are the data shapes each section is built from — effectively your CMS
schema, whether the backing store ends up being MDX + JSON, or a database
later. Defining this now means every future phase writes against a stable
contract.

### Project
```ts
{
  slug: string
  title: string
  tagline: string                // 1-line, shown in cards
  category: "AI" | "Backend" | "Frontend" | "Full Stack" | "Android" | "Research"
  status: "shipped" | "in-progress" | "archived"
  featured: boolean
  heroImage: string
  gallery: string[]
  overview: string
  problemStatement: string
  solution: string
  architecture: { description: string; diagram?: string }
  techStack: string[]
  features: string[]
  myContribution: string          // critical for team projects
  challenges: { title: string; description: string }[]
  tradeoffs: { decision: string; reasoning: string }[]
  lessonsLearned: string[]
  futureImprovements: string[]
  metrics?: { label: string; value: string }[]   // e.g. "p95 latency: 80ms"
  links: { github?: string; live?: string; demoVideo?: string }
  timeline: { start: string; end?: string }
  team?: { name: string; role: string }[]
  dateAdded: string
}
```

### Experience
```ts
{
  role: string
  company: string
  companyUrl?: string
  location: string
  employmentType: "internship" | "full-time" | "part-time"
  startDate: string
  endDate?: string                // omit = present
  responsibilities: string[]
  impact: string[]                // quantified where possible
  technologies: string[]
  keyLearnings: string[]
  links?: { label: string; url: string }[]
}
```

### Certificate
```ts
{
  title: string
  issuer: string
  category: "AI" | "Cloud" | "Programming" | "Leadership" | "Backend" | "Frontend"
  dateIssued: string
  credentialId?: string
  verifyUrl?: string
  pdfUrl?: string
  previewImage: string
}
```

### Achievement
```ts
{
  title: string
  category: "Hackathon" | "Competition" | "Research" | "Publication" | "Award" | "Leadership"
  date: string
  summary: string                 // shown collapsed
  details: string                 // shown expanded
  links?: { label: string; url: string }[]
}
```

### Education
```ts
{
  institution: string
  degree: string
  startDate: string
  endDate?: string
  cgpa?: string
  coursework: string[]
  highlights: string[]
}
```

### TimelineEvent
**Derived, not separately authored.** This shape is produced at build time by
aggregating dated entries from Project, Experience, and Achievement — it is
not a fourth hand-maintained content type. Avoids the same milestone being
edited in two places and drifting out of sync.
```ts
{
  date: string
  title: string
  description: string
  type: "milestone" | "project" | "experience" | "achievement" | "goal"
  relatedSlug?: string             // links to project/experience/achievement
}
```

### Availability (singleton, not a list)
```ts
{
  currentStatus: string            // e.g. "Open to opportunities"
  lookingFor: string[]             // e.g. ["SWE Internship", "New Grad"]
  workMode: "Remote" | "Onsite" | "Hybrid" | "Flexible"
  relocation: boolean
  workAuthorization: string        // e.g. "Authorized to work in the US"
}
```

### Article
```ts
{
  slug: string
  title: string
  excerpt: string
  tags: string[]
  category: string
  publishedDate: string
  readingTime: number               // computed at build time
  content: string                   // MDX
}
```

### Skill
```ts
{
  name: string
  category: "Languages" | "Frontend" | "Backend" | "Databases" | "Cloud" |
             "DevOps" | "AI" | "Tools" | "Frameworks" | "Version Control" | "OS"
  icon: string
  proficiency: "learning" | "comfortable" | "proficient" | "advanced"
  yearsExperience?: number
  usedInProjects?: string[]          // slugs, powers hover interaction
}
```

## 5. Feature → phase → backend mapping

| Feature | Needs backend/API key | Target phase |
|---|---|---|
| Core pages (Home, About, Projects, Experience, Skills, Education, Achievements, Certificates) | No — static content | Phase 5 (Implementation) |
| Resume viewer | No — static PDF embed | Phase 5 |
| Contact form | Yes — Resend/email API | Phase 6 (API integrations) |
| Schedule Meeting button | Placeholder link now — Calendly (or equivalent) embed | Phase 6 |
| GitHub Dashboard (in `/about`) | Yes — GitHub REST/GraphQL API (free, token-based); **cached via ISR/edge revalidation**, not fetched fresh per request, to avoid rate limits | Phase 6 |
| LinkedIn section | Partial — LinkedIn has no public API for this; will be **manually maintained structured data**, not live-scraped (ToS risk) | Phase 5, flagged as manual |
| LeetCode stats | Yes — unofficial public LeetCode stats API; **same ISR/caching approach as GitHub Dashboard** | Phase 6 |
| AI Assistant | Yes — LLM API key (Claude), retrieval over your content model | Phase 6 |
| Command palette + search (unified ⌘K) | No — client-side (cmdk + local search index) | Phase 5 |
| Recruiter Mode | No — derived view of existing content | Phase 5 |
| Articles/Blog | No — MDX, static | Phase 5 |

Flagging now so there are no surprises later: the LinkedIn "live activity" ask
in the master prompt isn't technically available without LinkedIn's restricted
partner API — I'll build it as a clean manually-updated section instead, and
we should agree on that tradeoff now rather than mid-build.

## 6. Content checklist — what I still need from you

Marking these so Phase 2 (visual design) can proceed with correct information
density even before every field is final:

- [ ] Real name, headline/role, 1-paragraph bio, professional photo
- [ ] Resume (PDF) — and whether you want multiple versions (SWE/Backend/AI/Product)
- [ ] 3–6 projects you consider your best work, with GitHub/live links
- [ ] Work/internship history
- [ ] Education details (institution, degree, CGPA, coursework)
- [ ] Certificates (issuer, date, credential links)
- [ ] Achievements/hackathons/awards
- [ ] GitHub, LinkedIn, LeetCode, email — confirm exact URLs/handles
- [ ] Whether you already write technical articles, or Articles ships empty initially

You don't need to fill all of this before Phase 2 — placeholders keyed to this
exact schema will make the swap-in trivial later.

## 7. Open decisions for you to confirm

1. **Recruiter Mode as its own route** (`/recruiter`) vs. a toggle that
   hides/shows sections on the same page — I'm recommending the route.
2. **Resume versions** — ship one strong resume now, add SWE/Backend/AI/Product
   variants later once you know which roles you're targeting?
3. **Articles section** — launch empty with an "articles coming soon" state,
   or hold the whole nav item back until you have ≥2 posts?
