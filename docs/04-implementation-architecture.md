# Phase 4 — Implementation Architecture

Status: DRAFT — guides Phase 5 build. No component design here (see Phase 3).

## Folder structure

```
portfolio-website/
├── app/
│   ├── (marketing)/
│   │   ├── layout.tsx              # primary nav + footer
│   │   ├── page.tsx                # Home
│   │   ├── about/page.tsx
│   │   ├── experience/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── projects/[slug]/page.tsx
│   │   ├── skills/page.tsx
│   │   ├── achievements/page.tsx
│   │   ├── certificates/page.tsx
│   │   ├── articles/page.tsx
│   │   ├── articles/[slug]/page.tsx
│   │   ├── resume/page.tsx
│   │   └── contact/page.tsx
│   ├── recruiter/
│   │   ├── layout.tsx              # compact header, no primary nav
│   │   └── page.tsx
│   ├── api/
│   │   ├── contact/route.ts
│   │   ├── github/route.ts
│   │   ├── leetcode/route.ts
│   │   ├── ai/route.ts
│   │   └── revalidate/route.ts     # future on-demand ISR trigger
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── layout.tsx                  # root: fonts, theme provider, analytics
│   └── globals.css
├── content/                        # projects/*.mdx, experience/*.json,
│                                    # certificates, achievements, education,
│                                    # skills, articles, availability.json
├── components/
│   ├── ui/                         # shadcn primitives
│   ├── sections/                   # page-level section blocks
│   ├── command/                    # unified ⌘K palette + search
│   └── ai-assistant/
├── lib/
│   ├── content/                    # typed loaders + Zod schemas
│   ├── api/                        # GitHub/LeetCode/Resend/Claude clients
│   ├── hooks/
│   ├── utils.ts
│   └── constants.ts
├── public/{images,resume}/
├── types/
├── docs/                           # this phase series
├── next.config.ts
├── tailwind.config.ts
├── content.config.ts
├── .env.example
└── tsconfig.json
```

## Route map

| Route | Render mode | Notes |
|---|---|---|
| `/` | SSG | Home |
| `/about` | SSG | + GitHub Dashboard (client island, ISR data) |
| `/experience` | SSG | |
| `/projects`, `/projects/[slug]` | SSG (`generateStaticParams`) | |
| `/skills`, `/achievements`, `/certificates` | SSG | |
| `/articles`, `/articles/[slug]` | SSG | empty state pre-launch |
| `/resume`, `/contact` | SSG | contact form is a client island |
| `/recruiter` | SSG | derived view, own layout |
| `/api/contact` | Dynamic (Node) | Resend |
| `/api/github`, `/api/leetcode` | Dynamic (Edge), `revalidate: 3600` | ISR-cached |
| `/api/ai` | Dynamic (Node, streaming) | Claude |
| `/sitemap.ts`, `/robots.ts` | Dynamic, generated | SEO |

## Content architecture

- File-based content in `content/` (MDX for Projects/Articles, JSON for
  Experience/Certificates/Achievements/Education/Skills/Availability).
- Every content type is validated against a Zod schema mirroring Phase 1's
  content model (`lib/content/schemas/*.schema.ts`); loaders throw at build
  time on invalid content — bad data never reaches production.
- `TimelineEvent` has **no source file** — it's computed in
  `lib/content/timeline.ts` by aggregating dated entries from Project,
  Experience, and Achievement loaders at build time.
- Loaders (`getProjects()`, `getProjectBySlug()`, etc.) are the only access
  path to content — components never read `content/` directly.

## Data flow

- **Static content**: content file → Zod-validated loader → typed object →
  passed as props into Server Components → HTML at build time. No client
  fetch involved.
- **Live data (GitHub/LeetCode)**: client island calls internal
  `/api/github` or `/api/leetcode`, which fetch the external API with
  `next: { revalidate: 3600 }` — the browser never calls third-party APIs
  or holds their tokens directly.
- **Contact form**: client component → `POST /api/contact` → Resend →
  success/error state.
- **AI Assistant**: chat UI → `POST /api/ai` (streamed) → server retrieves
  relevant chunks from a build-time-generated content index → calls Claude
  → streams tokens back via the Vercel AI SDK.
- **⌘K search**: a build-time-generated JSON index (title, excerpt, route
  per content item) is loaded client-side once and fuzzy-matched locally —
  no server round-trip per keystroke.

## State management

No global store (Redux/Zustand unnecessary at this scope):

| State | Mechanism |
|---|---|
| Theme | `next-themes`, persisted to `localStorage` |
| Command palette open/closed | Small `CommandPaletteProvider` context (opened from nav, ⌘K, mobile sheet) |
| AI Assistant conversation | Local state via `useChat` (Vercel AI SDK), not persisted |
| Contact form | `react-hook-form` + Zod resolver |
| Recruiter Mode | **Not state** — it's a route (Phase 1 decision), nothing to manage |

## API integrations

| Integration | Route | Caching | Auth |
|---|---|---|---|
| GitHub REST/GraphQL | `/api/github` | ISR, 3600s | Server-only PAT |
| LeetCode (unofficial) | `/api/leetcode` | ISR, 3600s | None |
| Resend (email) | `/api/contact` | None (POST only) | Server-only API key |
| Claude (AI Assistant) | `/api/ai` | None (streamed) | Server-only API key |
| Calendly | Direct embed/link | N/A | Public link, no server involvement |

## File naming conventions

- Components: `PascalCase.tsx` (`ProjectCard.tsx`)
- Route files: Next.js convention (`page.tsx`, `layout.tsx`, `route.ts`)
- Content files: `kebab-case` matching slug (`building-a-portfolio.mdx`)
- Hooks/utils: `camelCase` (`useScrollSpy.ts`, `formatDate.ts`)
- Types: one file per domain in `types/` (`project.ts`, `experience.ts`)
- Schemas: colocated in `lib/content/schemas/`, suffixed `.schema.ts`

## Shared utilities (`lib/`)

- `content/` — typed loaders + schemas, sole access path to `content/`
- `api/` — thin server-only fetch wrappers per external service (guarded
  with the `server-only` package so they can't accidentally ship to client)
- `hooks/` — `useScrollSpy`, `useActiveSection`, `useReducedMotion`
- `utils.ts` — `cn()`, `formatDate`, `computeReadingTime`
- `constants.ts` — nav items, breakpoints, social links (single source of
  truth, avoids duplicated hardcoding across components)

## Configuration files

- `next.config.ts` — image domains, MDX plugin, redirects
- `tailwind.config.ts` — Phase 2 tokens (color, spacing, radius, type scale,
  `--accent-gradient`) mapped into the Tailwind theme
- `content.config.ts` — content schema registration (contentlayer2/velite)
- `.env.local` (untracked) / `.env.example` (committed) —
  `GITHUB_TOKEN`, `RESEND_API_KEY`, `ANTHROPIC_API_KEY`, `NEXT_PUBLIC_SITE_URL`
- `tsconfig.json` — `strict: true`, path aliases (`@/components`, `@/lib`,
  `@/content`)

## Deployment architecture

- **Host**: Vercel, Git-connected; push to `main` → production, PRs → preview
  deployments with isolated env vars.
- **Rendering**: SSG for all content routes; API routes as serverless
  functions — `/api/ai` on the Node runtime (SDK compatibility), `/api/github`
  and `/api/leetcode` on Edge for lower latency.
- **Revalidation**: build-triggered for now (content is file-based, a push
  rebuilds it); `/api/revalidate` scaffolded but inert until content moves
  to a headless CMS.
- **Images**: `next/image` with Vercel's built-in optimization, no external
  CDN needed.
- **Analytics**: Vercel Analytics + Speed Insights, zero-config.
- **Domain**: custom domain via Vercel DNS/CNAME.
