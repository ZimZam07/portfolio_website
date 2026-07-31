# Phase 3 — High-Fidelity Wireframes

Status: DRAFT — for approval before Phase 4 (Component Library) / Phase 5 (Implementation)

Scope: the three highest-leverage screens — Home, Project Case Study, Recruiter
Mode. All specs below build on `01-information-architecture.md` (content
model, routes) and `02-design-system.md` (tokens, type scale, motion, color).
No implementation code — this is the contract an engineer builds from.

Global breakpoints used throughout:
```
mobile   360–639px    (design baseline: 375px)
sm       640–767px
md       768–1023px   (tablet)
lg       1024–1279px
xl       1280–1535px  (desktop baseline: 1440px)
2xl      1536px+
```
Container padding: 20px mobile, 32px sm/md, 64px lg, 96px xl+ (content still
capped at `--container-max: 1280px`, so xl+ padding is pure breathing room on
large monitors, not a stretched layout).

---

## 0. Shared patterns (apply to all three screens)

### 0.1 Primary navigation (Home, Project Case Study — NOT Recruiter Mode, see §3)

```
┌──────────────────────────────────────────────────────────────────┐
│ [ZU]   Home About Experience Projects Skills Certificates …   [⌘K] [◐] [Recruiter →] [Resume]│
└──────────────────────────────────────────────────────────────────┘
```
- Height: 72px desktop, 64px mobile. Fixed position, `top: 0`.
- State 1 (top of page, y < 80px): `background: transparent`, no border.
- State 2 (y ≥ 80px): `background: var(--bg-surface)` at ~72% opacity +
  `backdrop-blur(16px)` + `border-bottom: 1px solid var(--border-subtle)`.
  Transition 200ms ease-out on background/blur/border together, not a hard
  cut.
- Active route indicator: a 2px underline that **slides** between nav items
  using a shared layout animation (Framer Motion `layoutId`) rather than
  fading in/out at each item — this single detail reads as "engineered," not
  templated.
- Right cluster (desktop): search trigger rendered as a pill button reading
  `Search  ⌘K` (not a bare icon — the visible shortcut hint is itself a
  small "this person builds for power users" signal) → theme toggle (sun/
  moon icon, instant swap, no animation needed beyond icon crossfade) →
  "Recruiter Mode" as a distinct outlined pill (visually separated from
  regular nav items since it's a mode switch, not a page) → "Resume" as the
  one gradient-filled button in the nav (primary action).
- Mobile: logo left, hamburger right. Tap opens a full-screen overlay sheet
  (not a dropdown) — `background: var(--bg-base)`, a search trigger row
  ("Search" pill, full-width, tappable — opens the same unified ⌘K
  palette/search surface as desktop since Cmd+K itself isn't reachable on
  touch) pinned at the top of the sheet, nav items below as a large
  vertical list (heading-md size, generous 56px tap targets), Resume +
  Recruiter Mode as buttons pinned at the bottom of the sheet above the
  safe-area. Close via X (top-right, same position as hamburger was) or Esc.
- Focus order: logo → nav items in visual order → search → theme → recruiter
  → resume. All reachable via Tab, all with visible `:focus-visible` ring.
- `aria-current="page"` on the active nav link; nav wrapped in `<nav
  aria-label="Primary">`.

### 0.2 Footer (Home, Project Case Study — Recruiter Mode has its own, see §3)

Single row, split layout: left = `© 2026 [Name]`, right = icon-only links
(GitHub, LinkedIn, Resume, Email, LeetCode) each with visible text label on
hover/focus (tooltip) and always with `aria-label` (never icon-only for
screen readers). Stacks to centered/stacked on mobile: links row first,
copyright below, 24px gap. Top border `1px solid var(--border-subtle)`,
generous 64px vertical padding — footers that feel cramped undercut the
"premium" impression right at the exit point of the page.

### 0.3 Empty-state philosophy (applies everywhere)

A section with no underlying data **does not render an empty box, a "coming
soon" placeholder card, or a zero-state illustration by default** — it is
omitted from the DOM entirely, and any dependent UI (e.g., a case-study
sub-nav pill for a section with no content) is generated dynamically from
what exists, not hardcoded. The one sanctioned exception is `/articles`
pre-launch, which gets a deliberate, minimal empty state (§ not in scope for
this phase) because an entirely missing nav item there would look broken
rather than intentional.

### 0.4 Loading-state philosophy

Static content (projects, experience, skills, etc.) is server-rendered/SSG —
there is no client loading state for it. Loading states exist only for: (a)
images, via blur-up placeholders sized to final dimensions (zero layout
shift), and (b) live data (GitHub stats, LeetCode stats) — these are served
via ISR/edge-cached revalidation (not fetched fresh per request; detailed in
Phase 6), and render a skeleton shimmer matching the exact final element's
dimensions on first load, never a spinner that changes the layout when it
resolves.

### 0.5 Keyboard shortcuts

Global single-letter shortcuts (`G` GitHub, `L` LinkedIn, `R` Resume, `P`
Projects, `A` AI Assistant, `C` Contact) are bound at the document level but
**must never fire while focus is inside any `<input>`, `<textarea>`,
`contenteditable`, or the AI chat composer** — checked on every keydown
before dispatch, not just on specific known fields, so this holds for the
contact form, the unified search/palette input, and the AI Assistant alike.

---

## 1. Home Page (`/`)

### 1.1 Section order & reasoning

The master prompt's draft order (Hero → Quick Stats → About → Currently
Building → Skills → Projects → Experience → Achievements) front-loads
narrative before evidence. For a recruiter with ~30 seconds, I'm reordering
to front-load **proof of work**, and moving narrative/personality content
later for the visitor who's already convinced and reading deeper:

```
1. Hero                — identity, positioning, primary actions
2. Availability strip   — status/looking-for/work-mode, answers a filtering question fast
3. Quick Stats          — scannable credibility numbers (proof, not story)
4. Featured Projects    — the strongest evidence, shown early on purpose
5. Experience           — career credibility, reinforces projects
6. Skills               — capability breadth check
7. Currently Building   — momentum/passion signal, lower priority than proof
8. About                — narrative, humanizes, read by the already-convinced
9. Contact CTA          — closing action
10. Footer
```
This is a deviation from the Phase 1 draft — flagging it explicitly rather
than silently changing it. If you have a strong reason to keep About higher
(e.g., a genuinely distinctive personal story that IS the differentiator),
say so and I'll swap the order; the component structure doesn't change
either way, only sequence.

Achievements no longer gets a Home section — it lives solely on
`/achievements` as a single list of expandable entries, so there's one
format to maintain instead of a home "teaser card" plus a full-page version.

### 1.2 Full layout hierarchy

```
┌────────────────────────────────────────────────────────────────┐
│ NAV (§0.1)                                                      │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ● Available for opportunities            ┌─────────────┐     │
│                                             │             │     │
│   [Name] display-xl                        │   PHOTO     │     │
│   Software Engineer & Product Builder       │  (rounded,  │     │
│   heading-lg — static positioning line      │  gradient   │     │
│                                             │  glow behind)│    │
│   One-sentence positioning statement,       │             │     │
│   body-lg, max 60ch                        └─────────────┘     │
│                                                                  │
│   [View Resume →] [Contact]   [gh] [in] [lc]                   │
│                                                                  │
│                         ↓ (scroll cue, subtle, optional)        │
├────────────────────────────────────────────────────────────────┤
│  AVAILABILITY  — compact strip: status · looking for · work mode │
│  · relocation · work authorization                               │
├────────────────────────────────────────────────────────────────┤
│  QUICK STATS  — single bordered strip, hairline dividers        │
│  [1.2k]      [12]        [3]         [850+]      [18]           │
│  Contribs    Projects    Internships  LeetCode    Certificates  │
├────────────────────────────────────────────────────────────────┤
│  FEATURED PROJECTS                          [View all →]        │
│  eyebrow: "Selected Work"                                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  HERO PROJECT CARD (full width, 21:9 image, overlay meta) │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────┐  ┌───────────────────────┐          │
│  │ Project card (16:10)   │  │ Project card (16:10)   │          │
│  └───────────────────────┘  └───────────────────────┘          │
├────────────────────────────────────────────────────────────────┤
│  EXPERIENCE  eyebrow: "Where I've worked"    [View all →]       │
│  [logo] Role · Company · Duration — one-line impact             │
│  [logo] Role · Company · Duration — one-line impact             │
├────────────────────────────────────────────────────────────────┤
│  SKILLS  eyebrow: "Toolbox"                  [View all →]       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ [icon][icon][icon][icon][icon][icon][icon][icon] …        │  │
│  └──────────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────────┤
│  CURRENTLY BUILDING  (dashed/gradient border, pulsing dot)       │
│  ● Actively building — [Project name]                            │
│  One-line description                                    [repo→]│
├────────────────────────────────────────────────────────────────┤
│  ABOUT (preview)                                                 │
│  2–3 sentence bio, body-lg              [Read full story →]     │
├────────────────────────────────────────────────────────────────┤
│  CONTACT CTA  (bg-surface band, full width)                     │
│  "Let's build something."  display-lg                            │
│  [Get in touch] [Schedule a call]   [gh] [in] [email] [lc]       │
├────────────────────────────────────────────────────────────────┤
│ FOOTER (§0.2)                                                    │
└────────────────────────────────────────────────────────────────┘
```

### 1.3 Grid & spacing

- Container: `max-width: 1280px`, centered, side padding per breakpoint
  table in §0.
- Hero: 2-column grid desktop (`~58% / ~42%`, gap 64px), single column
  mobile (text first, photo below — photo shrinks to 40vw centered, not
  full-bleed, to keep hero from feeling like a dating-app profile).
- Section vertical rhythm: **128px** between major sections desktop (Hero→
  Stats→Projects etc.), **80px** tablet, **56px** mobile. Contact CTA band
  gets extra top/bottom padding (96px) since it's a full-bleed background
  change and needs to breathe more than a same-background transition.
- Featured Projects internal grid: hero card full 12-col; secondary pair is
  2×6-col with 24px gutter desktop; both secondary cards stack full-width on
  mobile with 16px gap.
- Quick Stats strip: `display: flex`, equal-width items divided by 1px
  `border-right: var(--border-subtle)` (last item no border), collapses to
  a horizontal `scroll-snap-x` carousel under 640px rather than wrapping to
  a cramped grid — peeking the next stat card at the edge signals
  scrollability without an explicit arrow affordance. Metrics shown are
  hiring-signal metrics only (GitHub contributions, shipped projects,
  internships, certifications, LeetCode solved) — vanity metrics like
  "coding hours" are intentionally excluded.
- Availability strip: same visual treatment as Quick Stats (bordered strip,
  hairline dividers), sitting directly below the hero — five short
  label/value pairs (Status, Looking For, Work Mode, Relocation, Work
  Authorization), `caption` labels over `body-sm` values, no icons needed.

### 1.4 Typography mapping

| Element | Token |
|---|---|
| Name | `display-xl` |
| Positioning line (static) | `heading-lg`, `text-secondary` |
| Hero description | `body-lg`, `text-secondary`, max-width 60ch |
| Status pill text | `caption` |
| Section eyebrow ("Selected Work") | `caption`, uppercase, `text-tertiary`, letter-spacing 0.04em |
| Section heading | `display-lg` |
| Stat number | `display-lg` but `font-family: mono` (Geist Mono) for numeral rhythm |
| Stat label | `caption`, `text-tertiary` |
| Card title | `heading-md` |
| Card body/tagline | `body-sm`, `text-secondary` |
| Contact CTA heading | `display-lg` |

### 1.5 Card layouts

**Hero project card** (top featured project): full-width image/mockup
(21:9, `object-fit: cover`), rounded `--radius-lg` (16px), category tag chip
absolutely positioned top-left over the image (small pill, `bg-surface` at
80% opacity + blur, so it reads on any image), below the image: title
(`heading-lg`), one-line tagline, tech-stack chips row (mono, `body-sm`,
neutral outline chips), and a "View case study" link with an arrow icon that
translates 4px right on hover. Entire card is a single link (large hit
area); focus ring wraps the whole card, not just the text link.

**Secondary project card**: same anatomy, smaller (16:10 image), single
column of metadata below instead of overlay tag (tag chip sits inline above
title instead of over the image, since the image is smaller and text-over-
image starts to fight for space at this size).

**Stat item**: icon (optional, 20px, `text-tertiary`) → number (mono,
count-up animated) → label (caption). No card border/background — these are
list items in the shared strip, not standalone cards; adding individual card
chrome here would visually compete with the Featured Projects cards below
and dilute their weight.

**Experience preview row**: company monogram/logo (32px, rounded-sm, neutral
bg fallback if no logo) — role + company + duration (`heading-sm` + `body-
sm text-tertiary`) — impact one-liner (`body-sm`) right-aligned or below on
mobile. Entire row hoverable (`bg-surface-2` on hover), links to `/experience`
anchor for that role.

**Availability item**: label (`caption`, `text-tertiary`) above value
(`body-sm`, `text-primary`), same list-item treatment as Quick Stats — no
card chrome, just divided strip entries.

**Currently Building card**: visually distinct from all other cards — 1px
`border` using `--accent-gradient` (via `border-image` or a padding-box/
border-box double-layer trick) instead of neutral border, small pulsing dot
(`accent`, 6px, `box-shadow` pulse animation, 2s loop, disabled under
reduced-motion to a static dot) next to "Actively building" label.

### 1.6 Button hierarchy (Home)

1. **Primary** (gradient fill, `--accent-gradient`, white text): "View
   Resume" in hero, "Get in touch" in Contact CTA. Only ever one gradient
   button visible in a given viewport at a time — that's what keeps it
   feeling premium instead of promotional.
2. **Secondary** (1px border, transparent bg, `text-primary`): "Contact" in
   hero, "Schedule a call" in Contact CTA (Calendly placeholder link at this
   phase — real embed lands in Phase 6/API integrations).
3. **Tertiary** (icon-only, ghost, `text-tertiary` → `text-primary` on
   hover): social icons (GitHub/LinkedIn/LeetCode) in hero and footer.
4. **Text link** (no button chrome, `text-secondary` → `accent` on hover,
   underline on hover only): all "View all →" section links.

### 1.7 Scroll experience

- Scroll-triggered reveals: each section's heading + content group fades in
  (`opacity 0→1`, `translateY 12px→0`, 250ms `--ease-out`) on first
  intersection (`threshold: 0.15`, `rootMargin: "-10% 0px"`), **never
  re-triggers** on scroll-up-then-down.
- Cards within a section stagger 40ms apart, capped at 6 staggered items
  max — beyond that, remaining items fade in together to avoid a slow
  cascading reveal on a long project/skills grid.
- Nav bar background transition (§0.1) is scroll-position-driven, not
  intersection-driven — smooth at any scroll speed.
- No scroll-jacking, no forced snap-scrolling between sections — this is a
  standard scroll page, motion only decorates state that's already changing.

### 1.8 Animation opportunities (signature moments)

- Hero load sequence: status pill → name → positioning line → description →
  buttons → photo, 60–80ms stagger, respecting reduced-motion (all appear
  instantly, no stagger, if the user has that preference set). The
  positioning line is static text — no cycling/rotating animation.
- Stat count-up: numbers animate from 0 to final value over 800ms when
  scrolled into view (`ease-out`), reduced-motion shows final value
  immediately.
- Project card hover: image scales `1 → 1.03` (400ms, contained via
  `overflow: hidden` on the card, not the page), card border brightens from
  `border-subtle` to `border-default`, shadow-hover appears, arrow icon
  translates.
- Magnetic effect on the two primary CTA buttons only (Resume, Get in
  touch) — per design-system §5, 6–8px max displacement.
- Currently Building pulsing dot — continuous but subtle, the one
  "ambient" animation on the page since it correctly signals "ongoing/live."

### 1.9 Hover interactions summary

| Element | Hover behavior |
|---|---|
| Nav link | Underline indicator slides to it (on focus too, not just hover) |
| Project card | Image zoom 1.03x, border brightens, shadow appears, arrow shifts |
| Experience row | Row background → `bg-surface-2` |
| Social icon | `text-tertiary` → `text-primary`, subtle scale 1.0→1.08 |
| Primary/secondary button | Background/border lightens per token, magnetic pull on primary CTAs |
| "View all →" link | Underline appears, arrow (if present) shifts 2px |

### 1.10 Mobile adaptations

- Hero becomes single column, photo below text, shrunk and centered (not
  full width) so it doesn't dominate the fold above the name/CTAs.
- Quick Stats becomes horizontal scroll-snap carousel (§1.3).
- Featured Projects hero card image ratio shifts from 21:9 to 16:10 to
  avoid an overly short/cropped image on narrow viewports.
- Secondary project pair stacks to single column.
- Skills row wraps naturally (`flex-wrap`) instead of the desktop bordered
  panel, still no marquee/auto-scroll.
- Contact CTA buttons stack full-width, icon row centered below.
- All section padding drops to the mobile spacing scale (§1.3).
- Tap targets minimum 44×44px throughout (buttons, nav items, card links).

### 1.11 Accessibility

- Landmarks: `<header>` (nav), `<main>`, one `<section aria-labelledby="…">`
  per major block with a matching visually-hidden or visible heading id,
  `<footer>`.
- Single `<h1>` = the name in the hero; each section heading is `<h2>`.
- Stat count-up numbers: the animation is presentational only; the
  underlying DOM value is the final number from the start (`aria-hidden` on
  any intermediate animated span if a separate visual/DOM split is used).
- Photo has descriptive `alt` (e.g., "Portrait of [Name]"), not empty/
  decorative, since it's meaningful content in the hero.
- All interactive cards are real `<a>`/`<button>` elements (not `<div
  onClick>`), so they're keyboard-reachable and correctly announced.
- Color contrast: `text-secondary` on `bg-base` and `text-tertiary` on
  `bg-surface` both verified ≥ 4.5:1 in both themes as part of Phase 4
  token finalization.

---

## 2. Project Case Study Page (`/projects/[slug]`)

### 2.1 Purpose & reasoning

This is where a skeptical recruiter or hiring manager gets converted from
"looks nice" to "this person can actually engineer." It should read like a
well-written case study/postmortem, not a portfolio gallery caption. Density
is fine here — this is the one page where a longer, information-rich scroll
is appropriate, provided it's well-organized and skimmable via the sub-nav.

### 2.2 Full layout hierarchy

```
┌────────────────────────────────────────────────────────────────┐
│ NAV (§0.1)                                                       │
├────────────────────────────────────────────────────────────────┤
│  Projects / AI                                    (breadcrumb)  │
│                                                                   │
│  [Category tag]                                                  │
│  Project Title                              display-lg           │
│  One-line tagline                            body-lg              │
│                                                                   │
│  📅 Jan–Mar 2026   👤 Solo project   🚀 Shipped                   │
│                                                                   │
│  [Live Demo →]  [GitHub]  [▶ Watch demo]                          │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              HERO IMAGE / LOOPING MUTED VIDEO              │  │
│  └──────────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────────┤
│  SUB-NAV (sticky, appears after hero scrolls past)                │
│  [Overview] [Architecture] [Features] [Challenges] [Lessons] [Gallery] │
├───────────────────────────────────┬──────────────────────────────┤
│  MAIN COLUMN (~66%)                │ SIDEBAR (~34%, sticky)        │
│                                     │                               │
│  Overview                          │ ┌───────────────────────┐    │
│  Problem Statement                 │ │ Quick Facts            │    │
│  Solution                          │ │ Role · Team · Timeline │    │
│                                     │ │ Status badge           │    │
│  Architecture                      │ └───────────────────────┘    │
│  [diagram / description]           │ ┌───────────────────────┐    │
│                                     │ │ Tech Stack chips       │    │
│  Features                          │ └───────────────────────┘    │
│  [feature grid]                    │ ┌───────────────────────┐    │
│                                     │ │ Links: GitHub / Live / │    │
│  ★ My Contribution (callout box)   │ │ Video                 │    │
│                                     │ └───────────────────────┘    │
│  Challenges & Tradeoffs            │ ┌───────────────────────┐    │
│  [accordion cards]                 │ │ More projects          │    │
│                                     │ │ [mini card][mini card] │    │
│  Performance Metrics               │ └───────────────────────┘    │
│  [stat cards]                      │                               │
│                                     │                               │
│  Gallery                           │                               │
│  [lightbox grid]                   │                               │
│                                     │                               │
│  Lessons Learned                   │                               │
│  Future Improvements               │                               │
│                                     │                               │
├───────────────────────────────────┴──────────────────────────────┤
│  ← Previous project              Back to all projects   Next → │
├────────────────────────────────────────────────────────────────┤
│ FOOTER (§0.2)                                                     │
└────────────────────────────────────────────────────────────────┘
```

### 2.3 Section ordering & reasoning

Overview/Problem/Solution first (the "why should I keep reading" hook),
Architecture + Features next (the "how it works" substance), **My
Contribution surfaced as a visually distinct callout right after Features,
not buried at the end** — for team projects this is the single fact a
recruiter most needs and most often has to hunt for, so it gets a
non-default treatment: a bordered callout with a small "★" or person icon,
not just another paragraph heading. Challenges/Tradeoffs and Metrics follow
(evidence of engineering judgment), Gallery (visual proof), then Lessons/
Future Improvements last (reflective, shows growth mindset — a strong close
for a technical reader, weak as an opener).

### 2.4 Grid & spacing

- Content grid: 12 columns. Main column spans 8 (of 12), sidebar spans 4,
  32px gap, both starting at the same `y` below the sub-nav.
- Sidebar uses `position: sticky; top: [nav height + sub-nav height + 24px]`
  so it tracks scroll but never overlaps the sub-nav.
- Prose column inside "main" is capped at `--container-prose: 760px` even
  though its grid track is wider — line length for body paragraphs stays
  readable; full-width elements within main (feature grids, metric cards,
  gallery) are allowed to use the full 8-col track.
- Section vertical rhythm within the case study: 64px between major
  sections (tighter than Home's 128px — this is a single continuous
  document, not a sequence of distinct marketing blocks).
- Hero block bottom margin before sub-nav: 48px.

### 2.5 Typography mapping

Same token set as Home, with one addition: body copy in Overview/Problem/
Solution/Lessons uses `body-lg` (not `body-md`) since this is the primary
reading content of the page — slightly larger for comfortable long-form
reading, matching the `--container-prose` width design intent.

### 2.6 Card layouts

**Feature card**: small grid (2-col desktop, 1-col mobile), icon (20px,
neutral) + title (`heading-sm`) + one-line description (`body-sm`). No
border individually — a light `bg-surface` fill with generous internal
padding (20px) is enough; bordered chrome here would create card-fatigue
given how many other cards are already on this page.

**Challenge/Tradeoff card (accordion)**: collapsed state shows challenge
title (`heading-sm`) + one-line problem statement + a chevron; expand
reveals full description, approach taken, and outcome, with a height
animation (`auto` height via measured content, 250ms `--ease-out`, content
fades in slightly after height settles to avoid text "swimming"). Tradeoffs
render as a compact two-column list within the same card group: **Decision**
/ **Reasoning**, not a heavy bordered table — reads faster.

**Metric card**: small, mono numeral (`heading-lg`, mono) + label (`caption`)
+ optional context line (`body-sm`, `text-tertiary`, e.g. "↓ from 400ms
baseline"). Row of 3–4, equal width, no border — separated by generous gap
only, consistent with the Quick Stats treatment on Home for visual
continuity across the site.

**Sidebar "Quick Facts" card**: bordered (`border-subtle`, `radius-md`),
label/value pairs stacked (`caption` label, `body-sm` value), status shown
as a small colored dot + text (not a saturated badge) — green dot "Shipped,"
amber dot "In progress," neutral dot "Archived."

**Sidebar "More projects" mini-cards**: thumbnail (small, 4:3) + title only,
no description — this is a low-commitment "keep browsing" nudge, not
another full case-study teaser.

### 2.7 Button hierarchy (Case Study page)

1. **Primary**: Live Demo (gradient) if a live URL exists; if not, GitHub
   becomes primary. Never two gradient buttons side by side.
2. **Secondary**: GitHub (outline) when Live Demo is primary.
3. **Tertiary**: Watch Demo (ghost, play icon) — opens video in a modal/
   lightbox, doesn't navigate away.
4. Prev/Next project footer nav: text links with directional arrows, equal
   visual weight, "Back to all projects" centered between them as a
   secondary-weight button.

### 2.8 Sub-nav behavior

- Appears once the hero block scrolls out of view (`position: sticky`,
  `top: [nav height]`), sits directly under the main nav.
- Pills generated **dynamically** from which sections have content (§0.3) —
  a project with no Gallery images simply has no "Gallery" pill.
- Active pill tracked via scroll position (`IntersectionObserver` on each
  section, `rootMargin` tuned so a section is "active" once it's ~30% into
  the viewport), indicator uses the same sliding-underline pattern as the
  main nav (shared `layoutId` treatment for visual consistency).
- Clicking a pill smooth-scrolls to the section with an offset accounting
  for both sticky bars' combined height.
- On mobile, pills scroll horizontally (`scroll-snap-x`), no wrapping.

### 2.9 Scroll experience

- Hero image: very subtle parallax (background shifts ~10–15px slower than
  scroll, CSS-only via `transform: translateY`, not JS scroll listeners
  where avoidable) — the only parallax on this page, disabled entirely under
  reduced-motion **and disabled below the `md` breakpoint** (tablet/mobile
  render the hero image static — parallax scroll transforms are a common
  jank source on mid-tier phones regardless of motion preference).
- Section reveals: same fade+translateY pattern as Home, applied per
  section (not per individual paragraph — that would feel busy on a
  long-form page).
- Sidebar sticky behavior stops tracking once the main column content ends
  (bottom-anchors at the footer boundary rather than overlapping it).

### 2.10 Animation opportunities

- Sub-nav pill indicator sliding on scroll-driven active-section change.
- Accordion expand/collapse (height + content fade).
- Gallery image hover: slight scale + shadow, click opens lightbox with a
  scale-up-from-thumbnail transition (shared element feel).
- Metric numbers count up on scroll into view (same as Home stats).
- Prev/Next footer cards: arrow icon shifts on hover.

### 2.11 Empty states (page-specific)

- No live demo → Live Demo button omitted, GitHub promoted to primary
  (§2.7), no dead/disabled button shown.
- No team → "Team Members" fact omitted from sidebar entirely (not shown as
  "Solo project" unless that's meaningfully true and worth stating — for a
  solo project, showing "👤 Solo project" in the meta row IS the useful
  signal; the rule is "omit if not applicable," not "always show something").
- No metrics → entire Performance Metrics section and its sub-nav pill
  omitted.
- No gallery images beyond the hero → Gallery section omitted; hero image
  alone is sufficient.

### 2.12 Loading states

Fully SSG per project (params known at build time from the content model).
Only client-side load: if a live GitHub star count or deploy-status badge is
shown for the sidebar Links card, it's served via the same ISR/edge-cached
approach as §0.4 (not fetched fresh per request) and renders a skeleton pill
matching final size on first load, resolves in place, no shift.

### 2.13 Hover interactions

| Element | Hover behavior |
|---|---|
| Sub-nav pill | Background `bg-surface-2`, text brightens |
| Gallery image | Scale 1.02, shadow appears, cursor indicates "zoom" |
| Accordion header | Background `bg-surface-2`, chevron rotates on expand (not just on hover) |
| Sidebar mini project card | Thumbnail scale 1.03, title underlines |
| Prev/Next footer links | Arrow shifts in the direction of travel |

### 2.14 Mobile adaptations

- Sidebar content (§2.2) moves: Quick Facts + Links card render **directly
  below the hero actions row**, above the main content — recruiters
  skimming on mobile need role/timeline/links before they'll commit to
  scrolling a long case study. Tech Stack chips also promoted near the top.
  The "More projects" card moves to the very bottom, after Future
  Improvements.
- Two-column grid collapses to single column; main content prose width
  becomes fluid (no fixed 760px, just container padding).
- Gallery grid becomes a swipeable single-image carousel with dot
  indicators instead of a multi-image masonry.
- Sub-nav pills scroll horizontally as noted in §2.8.
- Action buttons (Live Demo/GitHub/Video) wrap to a 2-up grid or stack
  full-width depending on label length — never truncated text.

### 2.15 Accessibility

- `<h1>` = project title; sub-nav section headings are `<h2>` and their
  `id`s match the sub-nav's `href="#…"` targets and `aria-controls`.
- Sub-nav is a `<nav aria-label="Project sections">` with `aria-current`
  on the active pill.
- Accordion items use `aria-expanded` + `aria-controls` + unique ids;
  triggered by a real `<button>`.
- Lightbox (gallery + video modal) is a proper dialog: `role="dialog"`,
  `aria-modal="true"`, focus trapped inside, `Esc` closes, focus returns to
  the triggering thumbnail on close, arrow keys navigate between images.
- Every gallery image requires a non-empty, content-model-enforced `alt`
  field (add `alt` to the `gallery` field in the Project schema from Phase
  1 — currently just `string[]` of URLs; should become
  `{ src: string; alt: string }[]`).
- Diagram (Architecture section), if an image, needs equivalent text
  description nearby (the "Architecture" prose paragraph should stand alone
  without requiring the diagram to be understood — good practice
  regardless of accessibility).

---

## 3. Recruiter Mode (`/recruiter`)

### 3.1 Purpose & reasoning

This is not a smaller version of Home — it's a different document type: an
executive summary. Every design decision here optimizes for **evaluation
speed**, not delight. A recruiter choosing this mode has already
self-identified as time-constrained; matching that with heavy motion or a
wide, exploratory layout would work against the very reason they picked it.

### 3.2 What's excluded, and why

Explicitly cut from Recruiter Mode: Currently Building, About narrative,
Articles/Blog, full Timeline, Certificates gallery (rolled into a stat
count only), AI Assistant floating trigger, decorative motion beyond a
single load-in fade. These are either narrative/personality content (valued
by an already-interested return visitor, not a first-pass evaluator) or
engagement features (meant to extend time-on-site — the opposite goal of
this mode). Kept: Hero identity, a "Why Hire Me" pitch, Availability, Stats,
Top 3 Projects, Experience, Skills (flat list), Achievements (flat list),
Contact — the things a hiring decision actually depends on.

### 3.3 Full layout hierarchy

```
┌────────────────────────────────────────────────────────────────┐
│ COMPACT HEADER (not the full nav — see §3.4)                    │
│ [Name]                              [Exit to full site] [⬇ Resume]│
├────────────────────────────────────────────────────────────────┤
│                                                                   │
│  [Name]                                       heading-lg          │
│  Software Engineer — [one-line positioning]    body-md             │
│  Why hire me — 2–3 sentence pitch, body-sm                          │
│  [gh] [in] [email] [lc]                                            │
│  [⬇ Download Resume]   [Contact Me]   [Schedule a call]            │
│                                                                   │
├────────────────────────────────────────────────────────────────┤
│  AVAILABILITY  — status · looking for · work mode · relocation ·   │
│  work authorization (same compact strip as Home)                    │
├────────────────────────────────────────────────────────────────┤
│  SNAPSHOT   (same stat-strip component as Home, reused)          │
│  [1.2k] [12] [3] [850+] [18]                                       │
├────────────────────────────────────────────────────────────────┤
│  TOP PROJECTS                                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ [thumb 4:3]  Title — one-line impact statement   [gh][live]│  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │ [thumb 4:3]  Title — one-line impact statement   [gh][live]│  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │ [thumb 4:3]  Title — one-line impact statement   [gh][live]│  │
│  └──────────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────────┤
│  EXPERIENCE                                                        │
│  Role · Company · Duration — impact                                │
│  Role · Company · Duration — impact                                │
│  Role · Company · Duration — impact                                │
├────────────────────────────────────────────────────────────────┤
│  SKILLS   (dense wrapped chip row, grouped by category label)      │
│  Languages: TypeScript · Python · Go …                              │
│  Backend: Node.js · PostgreSQL · Redis …                            │
├────────────────────────────────────────────────────────────────┤
│  ACHIEVEMENTS  (flat list, not cards)                               │
│  — Title, Year                                                      │
│  — Title, Year                                                      │
├────────────────────────────────────────────────────────────────┤
│  [⬇ Download Resume]        [Contact Me]                            │
│  [gh] [in] [email] [lc]                                             │
├────────────────────────────────────────────────────────────────┤
│  Full site →                              © 2026 [Name]           │
└────────────────────────────────────────────────────────────────┘
                                            [⬇ Resume] ← sticky bottom bar, mobile only
```

### 3.4 Navigation behavior

No full primary nav — a compact header instead: name (small, `heading-sm`,
not a full logo treatment), "Exit Recruiter Mode → Full Site" link, and the
Download Resume button, all in one 56px-tall bar, sticky at all times
(unlike the main nav's transparent→solid transition — this bar is solid
from the first frame, since its job is utilitarian access, not a hero
moment). No search, no theme toggle, no Cmd+K hint chip — those are power-
user affordances for engaged visitors, out of place in a document meant to
be read once, top to bottom, in one sitting. (Cmd+K itself can still work
if triggered, it's just not advertised in this chrome.)

### 3.5 Grid & spacing

- Max content width: **920px** (vs. Home's 1280px) — a deliberately
  narrower column that visually signals "condensed document" the moment the
  page loads, independent of any copy.
  - Single column throughout, no sidebar, no multi-column card grids beyond
  the stat strip.
- Section vertical rhythm: **56px** desktop, **40px** mobile — noticeably
  tighter than Home's 128px, reinforcing density/scanability over the
  spacious, exploratory feel appropriate elsewhere.
- Top Projects render as **horizontal list rows**, not the card-grid/hero-
  card treatment from Home — a small 4:3 thumbnail, not a 21:9 hero image,
  keeps this section fast to scan rather than a second gallery moment.

### 3.6 Typography scale (intentionally reduced from Home)

| Element | Home token | Recruiter Mode token |
|---|---|---|
| Name | `display-xl` | `heading-lg` |
| Section headings | `display-lg` | `heading-md` |
| Body | `body-lg` | `body-sm` |

The point isn't that Recruiter Mode looks worse — it's that its typographic
voice matches "brief," while Home's matches "showcase."

### 3.7 Button hierarchy

Download Resume is the single most important action in this mode and gets
deliberate redundant placement: compact header (always visible via sticky),
hero, and closing block — three chances to convert without ever feeling
naggy, because each placement is exactly where a reader would naturally look
for it (top-right utility position, primary hero action, end-of-document
action), not three copies competing in the same viewport.

1. **Primary** (gradient): Download Resume — every instance.
2. **Secondary** (outline): Contact Me, Schedule a call (Calendly
   placeholder — same real-embed note as §1.6).
3. **Tertiary** (ghost icon): GitHub/LinkedIn/Email/LeetCode.

### 3.8 Scroll & animation — deliberately minimized

This is the one screen where the design system's motion toolkit is mostly
turned off, on purpose:
- A single fade-in (200ms) on initial mount for the hero block only. No
  per-section scroll-triggered reveals — a recruiter scrolling quickly
  should never see content still animating in below the fold; that reads as
  latency, not polish, to someone in a hurry.
- No count-up animation on stats — numbers render final-state immediately
  (this mode optimizes for the reader who wants the number now, not a
  60-second data story).
- No card hover elevation/zoom effects on the project rows — a simple
  background highlight on hover/focus only (`bg-surface-2`), consistent
  with fast list-scanning UX (mail clients, file browsers) rather than
  marketing-card UX.
- The sticky Download Resume button may pulse **once**, on load only, to
  draw the eye — never a looping/ambient animation here.
- Everything still respects `prefers-reduced-motion`, trivially, since so
  little motion exists to begin with.

### 3.9 Empty states

Same omission rule as elsewhere (§0.3): if fewer than 3 projects are
flagged "top," show what exists (2, or even 1) rather than padding with
placeholders; if Achievements is empty, omit the whole section header too.

### 3.10 Loading states

Fully static/SSG; no client loading states expected on this page at all
given the feature cuts in §3.2 (no live GitHub/LeetCode widgets here —
those stats can be pre-rendered at build time or omitted rather than
fetched client-side, since this page's whole premise is instant, complete
information).

### 3.11 Hover interactions

| Element | Hover behavior |
|---|---|
| Project/Experience row | Background → `bg-surface-2`, no scale/shadow |
| Skill chip | None (static list, not interactive — proficiency detail lives on `/skills`, not here) |
| Buttons | Standard token hover states, **no magnetic effect** (reserved for Home's exploratory context) |
| Links | Underline on hover/focus |

### 3.12 Mobile adaptations

- Already single-column, so mobile largely mirrors desktop at a narrower
  width — the smallest amount of "redesign work" of the three screens,
  which is itself a sign the layout is correctly minimal.
- **Download Resume moves to a sticky bottom bar** on mobile instead of
  living only in the header — thumb-reachable, since mobile recruiters
  (common case: reading a shared link on a phone between meetings) shouldn't
  need to scroll up to convert.
- Top Projects rows: thumbnail shrinks or drops to a small square icon-style
  image if space is tight, title/impact text takes priority over imagery at
  this size.
- Skills category rows wrap naturally; category label stays inline (not
  stacked above) as long as it fits, dropping to its own line only under
  ~360px.

### 3.13 Accessibility

This page should be the site's accessibility benchmark — its "fast, low-
noise" goal for recruiters overlaps directly with what screen-reader and
keyboard users need everywhere:
- Strict linear reading order; visual layout never reorders DOM order (no
  CSS grid `order` tricks).
- Skip-to-content link present despite the compact header (still two
  focusable items before main content).
- Resume download link has full descriptive text ("Download Zimran's
  résumé, PDF") available to assistive tech even though the visible label
  is short ("⬇ Resume") — via `aria-label`, not a visually-hidden
  duplicate string that could drift out of sync.
- Stat numbers, since not animated here, are just plain accessible text —
  no special handling needed (an advantage of cutting the animation).
- High contrast maintained throughout; this page's reduced visual noise
  makes it, incidentally, the easiest page on the site to audit for
  contrast compliance.

---

## 4. Open items for your review

1. **Home section order** (§1.1) — I reordered from the Phase 1 draft to
   front-load evidence over narrative. Confirm or push back.
2. **Recruiter Mode entry point** — I'm proposing a subtle ghost link near
   the hero CTAs on Home (not a popup/banner). Confirm, or tell me if you
   want it more prominent (e.g., in the main nav pill only, no Home-page
   mention at all, relying purely on you sharing the `/recruiter` link
   directly with recruiters).
3. **Gallery `alt` text requirement** (§2.15) — flagging a small Phase 1
   schema addition (`gallery: string[]` → `{ src, alt }[]`) needed to
   support this; trivial change, calling it out now so it's not a surprise
   during implementation.

Waiting for your approval before Phase 4 (Component Library).
