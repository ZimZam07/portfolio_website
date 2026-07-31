# Phase 5 — Component Library

Status: DRAFT — inventory only. No implementation; all styling/motion rules
already fixed in Phase 2, all layouts in Phase 3, all data shapes in Phase 1/4.

## Primitives

| Component | Purpose | Props | States | Dependencies | A11y |
|---|---|---|---|---|---|
| Button | All CTAs; primary/secondary/tertiary/text-link tiers | `variant, size, icon?, href?, onClick, disabled?, loading?, magnetic?` | default, hover, focus-visible, active, disabled, loading | design tokens; Framer Motion (magnetic only) | real `<a>`/`<button>`; visible focus ring; `aria-busy` when loading |
| IconButton | Ghost icon-only actions (social links, palette trigger) | `icon, label, href?, onClick?` | default, hover, focus-visible | Button (tertiary base) | `aria-label` mandatory |
| Badge | Category tags, tech-stack chips, skill/status labels | `label, tone, icon?` | default, hover (interactive variant only) | tokens | icon `aria-hidden`; interactive form uses real button/link |
| StatusDot | Shipped/in-progress/archived; availability status; "actively building" pulse | `tone, pulse?` | static, pulsing (off under reduced-motion) | tokens | color never sole signal — always paired with text |
| FormField | Contact form + search inputs | `label, name, type, error?, required?` | default, focus, error, disabled | react-hook-form | label programmatically associated; `aria-describedby`/`aria-invalid` on error |
| Tooltip | Skill proficiency, icon labels | `content, side` | hidden, visible | Radix Tooltip | shown on focus, not hover-only |

## Layout & Navigation

| Component | Purpose | Props | States | Dependencies | A11y |
|---|---|---|---|---|---|
| NavBar | Primary site nav | `activeRoute` | transparent, glass (scroll-driven), mobile-open | CommandPalette trigger, ThemeToggle, sliding underline | `nav aria-label`, `aria-current` on active link |
| MobileNavSheet | Full-screen mobile nav overlay | `open, onClose` | open, closed, animating | NavBar, search entry | focus trap, Esc closes, focus returns to trigger |
| CompactHeader | Minimal sticky header, `/recruiter` only | — | always solid (no scroll-state) | Button (Download Resume) | preceded by skip-link |
| Footer | Site-wide closing links | `variant: full \| recruiter` | — | IconButton | landmark; `aria-label` on every icon link |
| SubNav | Sticky in-page section nav, case study | `sections[]` (dynamic) | active pill (scroll-tracked) | IntersectionObserver hook, sliding indicator | `nav aria-label`, `aria-current`, ids match section `<h2>`s |
| Breadcrumb | Category trail on case study | `items[]` | — | — | `nav aria-label="Breadcrumb"` |
| SectionHeading | Eyebrow + title + optional "View all" — reused across every Home section | `eyebrow, title, viewAllHref?, level` | — | Button (text-link) | heading level passed explicitly, never hardcoded |
| Container | Max-width wrapper (1280/920/760px per Phase 3) | `width: default \| prose \| recruiter` | — | — | layout only |

## Content display

| Component | Purpose | Props | States | Dependencies | A11y |
|---|---|---|---|---|---|
| ProjectCard | Featured project, hero/secondary variants | `project, variant` | default, hover (image zoom) | Badge, Tooltip | whole card one `<a>`; image `alt` from content |
| ListRow | Generic row: Experience preview, Recruiter Mode project/experience rows | `item, variant: experience \| project` | default, hover/focus (bg highlight) | Badge | row is a link; nested icon links get distinct hit areas |
| StatStrip | Quick Stats / Recruiter Snapshot / case-study Metrics | `stats[]` | pre-animation, counted-up | CountUpNumber | DOM value final from start; animation presentational only |
| AvailabilityStrip | Status/looking-for/work-mode/relocation/work-authorization | `availability` (singleton) | — | — | rendered as `<dl>` label/value pairs |
| SkillChipGrid | Categorized skills, home preview + full `/skills` | `skills[], grouped?, interactive?` | default, hover (tooltip) | Tooltip, Badge | icons `aria-hidden`; name always visible text |
| AccordionItem | Expandable entry — shared by Achievements list and case-study Challenges | `title, summary, details` | collapsed, expanded | Radix Accordion | `aria-expanded`/`aria-controls`, real button trigger |
| TradeoffList | Decision/Reasoning pairs, case study | `tradeoffs[]` | — | — | plain list, not a heavy table |
| CertificateCard | Certificate gallery item | `certificate` | default, hover | Badge, Lightbox | preview `alt` = title + issuer |
| ArticleCard | Article index listing | `article` | default, hover | Badge (tags) | reading time as visible text, not icon-only |
| TimelineItem | Renders one derived `TimelineEvent`, `/about` | `event` | — | Phase 4 computed timeline data | ordered list; `<time datetime>` |
| FeatureCard | Case-study feature grid item | `icon, title, description` | — | — | icon `aria-hidden` |
| ProjectSidebarCard | Case-study sidebar — variants for facts / links / related projects | `variant: facts \| links \| related, data` | default, hover (links/related) | StatusDot, Badge, IconButton | facts as `<dl>`; links have descriptive text, not bare icons |
| CurrentlyBuildingCard | Home "actively building" highlight | `project` (partial) | default | StatusDot (pulse) | pulse decorative; label text conveys state |
| CalloutBox | Generic highlighted block — case study's "My Contribution" and any future emphasis need | `icon?, title?, children` | — | — | `<aside>` only if semantically separate from flow |

## Overlays

| Component | Purpose | Props | States | Dependencies | A11y |
|---|---|---|---|---|---|
| CommandPalette | Unified ⌘K navigation + content search (Phase 1 merge decision) | `open, onOpenChange` | closed, open, empty-query, results, no-results | cmdk, build-time search index | `role="dialog"`, focus trap, listbox semantics, Esc closes |
| AIAssistantPanel | Chat interface over portfolio content | `open, onOpenChange` | closed, open, idle, streaming | `useChat` (Vercel AI SDK), `/api/ai` | dialog semantics; streamed text in `aria-live="polite"`; labeled composer |
| Lightbox | Gallery image/video modal | `items[], initialIndex, open` | open, closed, navigating | focus-trap util | `role="dialog" aria-modal`, arrow-key nav, focus returns to trigger |
| ThemeToggle | Light/dark switch | — | light, dark | next-themes | `aria-pressed`/`role="switch"`; name states current + target mode |

## Motion & feedback

| Component | Purpose | Props | States | Dependencies | A11y |
|---|---|---|---|---|---|
| RevealOnScroll | Enforces the one approved scroll-reveal pattern site-wide, so no component reinvents motion | `children, stagger?, once` | pre-reveal, revealed | Framer Motion, `useReducedMotion` | visual only — never delays content from the a11y tree |
| CountUpNumber | Animated numeral for stats/metrics | `value, format?` | animating, settled | Framer Motion, `useReducedMotion` | final value present in DOM immediately |
| SkeletonShimmer | Loading placeholder — live widgets, image blur-up | `width, height, shape` | loading, resolved (unmounts) | — | `aria-hidden`, not announced |
| EmptyState | Articles pre-launch placeholder — the one sanctioned empty state (Phase 3 §0.3) | `title, description` | — | — | plain text content |
| ContactForm | Composed contact form | `onSubmitAction` | idle, submitting, success, error | FormField, Button, react-hook-form, zod, `/api/contact` | error summary in `aria-live`; success not color-only |
| RecruiterModeLink | Subtle entry point near hero CTAs (Phase 3 open item, pending confirmation) | — | default, hover | Button (text-link) | descriptive text ("Try Recruiter Mode"), not icon-only |

## Notes

- No component here introduces new visual rules — every prop maps back to a
  token or pattern already fixed in Phase 2/3. This list is the seam between
  "designed" and "buildable," not a new design pass.
- `AccordionItem` and `ListRow` are intentionally generic — building two
  near-identical components for Achievements/Challenges or Experience/
  Recruiter-rows would be the "unnecessary complexity" flagged in the Phase
  3 review.
