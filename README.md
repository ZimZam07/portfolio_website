# Zimran Ullah — Portfolio

Personal portfolio website of **Zimran Ullah** — Software Engineer, Full-Stack & AI Products.
B.Tech CSE at JIIT (expected 2028), based in Noida, India.

Built with Next.js 16, React 19, TypeScript and Tailwind CSS v4.

**Live site — coming soon** *(this line will be updated once the site is deployed)*

**Repository:** [github.com/ZimZam07/portfolio_website](https://github.com/ZimZam07/portfolio_website)

---

## Overview

A single place to evaluate my work as a software engineer, organised so that a visitor can go as
deep or as shallow as they need:

| Section | What it covers |
| --- | --- |
| **Home** | Introduction, current availability, featured work and a skills overview |
| **Projects** | Full case studies for each shipped project — problem, approach, architecture and technical decisions |
| **Experience** | Professional experience, currently my AI research internship at Rezolve.ai |
| **Skills** | Technical and product capabilities, grouped by depth of experience |
| **Certificates** | Completed certifications and coursework |
| **About** | Background, ventures and interests beyond engineering |
| **Recruiter** | A condensed, single-screen candidate snapshot for anyone screening quickly |
| **Contact** | Direct ways to get in touch |

An AI portfolio assistant is available site-wide to answer questions about any of the above.

A deliberate constraint runs through the content: every technical claim is written to be verifiable
against the underlying source repository. Technologies are listed only where they are meaningfully
used, skills are presented as tiers of depth rather than invented percentages, and research work is
described as research rather than authorship.

## Features

- **Case-study project pages** — each project gets a full write-up rather than a card and a link
- **Recruiter Mode** — a dedicated `/recruiter` page condensing the profile into one screen
- **AI portfolio assistant** — "Ask about Zimran", answering from the site's own content
- **WebGL fracture background** — an interactive Voronoi-tessellation effect written in raw WebGL1
  (no 3D library), rendered site-wide and responsive to pointer movement
- **Dark and light themes** — system-aware, with the background effect re-paletted to match
- **Command palette** — `Cmd/Ctrl + K` for navigation, plus single-key shortcuts for résumé,
  projects, GitHub, LinkedIn, contact and the assistant
- **Scroll-reveal animations** — via Framer Motion
- **Fully responsive** — mobile through desktop
- **Accessible by default** — skip link, focus-visible rings, `aria-live` regions for streamed
  responses, and complete `prefers-reduced-motion` support that disables animation and the
  background effect's motion

## Projects

### JIIT Lost & Found — Campus Recovery Platform

A campus recovery platform connecting students with lost belongings through verified listings,
structured finder requests and owner-controlled recovery workflows. It replaces scrolling group-chat
messages with real records: a student posts an item, other students submit a *request* against it
rather than a reply, and the owner decides who gets it while the listing moves through an explicit
`open → accepted → completed` lifecycle.

Access is restricted to `@mail.jiit.ac.in` addresses, checked at sign-up, sign-in and again at
request acceptance. Row Level Security is enabled on every table, and constraints such as the status
lifecycle and the reward floor are enforced in the database rather than in UI code.

**Stack:** React · TypeScript · Supabase · PostgreSQL · React Router · Tailwind CSS · Vite
**Links:** [Live](https://finders-keepers-jiit.lovable.app/) · [Source](https://github.com/ZimZam07/lost-and-found-jiit)

### AI-Assisted Fitness App

A fitness app that turns a user's profile and daily logs into personalised targets, pairing a
streamed, context-grounded assistant with a deterministic calculation engine. Where an established
formula exists — BMI, calorie and hydration targets — the app computes it directly; where one
doesn't, the same user data is supplied to an AI assistant fenced to fitness, so it can refer to what
was actually logged.

**Stack:** React · TypeScript · Supabase · Edge Functions · PostgreSQL · Tailwind CSS · Vite
**Links:** [Live](https://auth-stride-path.lovable.app/) · [Source](https://github.com/ZimZam07/AI-powered-fittness-assistant)

Full case studies for both are in the portfolio's Projects section.

## Experience

### AI Research Intern — [Rezolve.ai](https://www.rezolve.ai/)

*Jul 2026 — Aug 2026 · Remote*

Two months of research inside an enterprise agentic AI platform, spent working out what makes these
systems hold up in practice.

I traced how enterprise knowledge moves from source systems such as SharePoint, Confluence,
ServiceNow and Google Drive through ingestion and embeddings into vector search, and examined how
records are matched at query time and what happens to them when the underlying source changes. I
assessed platforms and APIs for technical feasibility, validated candidate approaches through
proof-of-concept work, and investigated the data-quality edge cases that degrade retrieval quality
without surfacing any visible error — then documented the findings and recommendations for
engineering and product stakeholders.

This was research, evaluation and documentation of systems that already existed — not authorship of
Rezolve.ai's production platform, ingestion pipeline or vector infrastructure.

## Tech Stack

**Framework & language** — Next.js 16 (App Router), React 19, TypeScript

**Styling & UI** — Tailwind CSS v4, Base UI primitives, `class-variance-authority`,
`tailwind-merge`, Lucide and Simple Icons

**Interaction & motion** — Framer Motion, `next-themes`, `cmdk` (command palette), and a custom
WebGL1 fragment shader for the background effect

**AI** — Anthropic SDK, called from a server-side Next.js Route Handler with streamed responses;
Zod for request validation

**Tooling** — ESLint, Prettier with `prettier-plugin-tailwindcss`, TypeScript strict mode

The stacks of the showcased projects are listed with each project above and differ from the
portfolio's own.

## AI Portfolio Assistant

The site includes an AI assistant that answers questions about my projects, experience, skills,
background, and reasons to get in touch. It is grounded in the portfolio's own content, so its
answers stay consistent with what the rest of the site says — including the distinction between work
I researched and work I built.

It is scoped deliberately: it answers portfolio-related questions and declines everything else. It is
not a general-purpose chatbot.

The assistant runs entirely server-side. The API key is read from the environment inside the route
handler — no `NEXT_PUBLIC_` prefix, no module-scope capture — so it is never bundled into client code
or exposed to the browser. If no key is configured, the rest of the site works normally and the
assistant reports that it isn't connected.

## Local Development

**Prerequisites:** Node.js 20.9 or later (required by Next.js 16) and npm.

```bash
# 1. Clone the repository
git clone https://github.com/ZimZam07/portfolio_website.git
cd portfolio_website

# 2. Install dependencies
npm install

# 3. Set up environment variables (optional — see below)
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Both are optional. Without them the site builds and runs normally — only the AI assistant is
inactive, and it says so rather than failing.

| Variable | Required | Purpose |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | For the AI assistant | Server-side key from [console.anthropic.com](https://console.anthropic.com). Never exposed to the browser. |
| `NEXT_PUBLIC_SITE_URL` | Optional | Canonical site URL used for metadata. Defaults to `http://localhost:3000`. |

`.env.example` documents both. All `.env*` files are gitignored — never commit real values.

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check with `tsc --noEmit` |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check formatting without writing |

## Project Structure

```
app/
  (marketing)/       Public pages — home, about, experience, projects,
                     skills, certificates, contact, recruiter
  api/chat/          Server-side route handler for the AI assistant
components/
  sections/          Home page sections
  case-study/        Project case-study building blocks
  visual/            WebGL fracture background (shader + renderer)
  ai-assistant/      Assistant panel, trigger and provider
  ui/                Shared primitives
lib/
  content/           Typed content modules — projects, experience, skills,
                     about, certificates, availability, recruiter
  ai/                System prompt and portfolio context (server-only)
types/               Shared TypeScript types
public/              Static assets, résumé, images and logos
```

Content lives in typed modules under `lib/content/` and is kept separate from presentation, so it can
be reviewed and verified independently of the components that render it.

## Contact

- **Email** — [zimranullahsjc1999@gmail.com](mailto:zimranullahsjc1999@gmail.com)
- **LinkedIn** — [linkedin.com/in/zimran-ullah](https://www.linkedin.com/in/zimran-ullah)
- **GitHub** — [github.com/ZimZam07](https://github.com/ZimZam07)

Currently open to internships and opportunities as an AI Software Engineer — remote, hybrid or
on-site, and open to relocation.

---

<sub>© Zimran Ullah. The source is public for reference; the written content, personal information
and imagery are not licensed for reuse.</sub>
