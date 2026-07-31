# Phase 2 — Design System

Status: DRAFT — for review before Phase 3 (Wireframes)

Reference points: Linear, Vercel, Stripe, Arc, Raycast. What those sites share
isn't a specific color or font — it's restraint: one accent color, a strict
type scale, generous whitespace, and motion that only ever clarifies state
changes. That's the bar here.

## 1. Color system

Neutral-first, single accent, dark mode as the primary design target (light
mode derived from it, not bolted on).

```
Dark mode (default)
--bg-base:        #08090A   near-black, not pure black (pure black kills depth)
--bg-surface:      #0F1012   cards, panels
--bg-surface-2:    #17181B   nested surfaces, hover states
--border-subtle:   #1F2023
--border-default:  #2A2B2F
--text-primary:    #F5F5F7   headings, primary content
--text-secondary:  #A1A1A6   body copy, descriptions
--text-tertiary:   #6E6E73   meta, timestamps, captions
--accent:          #5E6AD2   (Linear-esque indigo — confident, not loud)
--accent-2:        #7C6FE8   (violet, gradient partner — never used solo)
--accent-hover:    #7078E0
--success:         #3DD68C
--warning:          #E8B341
--danger:          #E5484D
--accent-gradient: linear-gradient(135deg, #5E6AD2 0%, #7C6FE8 100%)

Light mode
--bg-base:         #FFFFFF
--bg-surface:       #FAFAFA
--bg-surface-2:     #F2F2F3
--border-subtle:    #EBEBEC
--border-default:   #DDDDDF
--text-primary:     #0D0D0F
--text-secondary:   #4B4B52
--text-tertiary:    #7A7A80
--accent:           #4750C9   (slightly deepened for AA contrast on white)
--accent-2:         #6558D3
--accent-gradient:  linear-gradient(135deg, #4750C9 0%, #6558D3 100%)
```

Rule: **90–95% of the UI stays neutral** (near-black/white/gray). Indigo is
the base accent for ordinary interactive elements — links, default focus
rings, inactive-but-interactive icons — used flat, not gradient. The
indigo→violet gradient is reserved for a short, deliberate list of "premium
moment" surfaces, so it keeps meaning instead of becoming wallpaper:

- Primary CTA buttons (View Resume, Contact/Hire Me, AI Assistant trigger)
- Active/selected states in nav and command palette (active row, selected filter)
- Hero background glow (large, very low-opacity radial wash behind the headline)
- AI Assistant surface (message bubble accent, thinking/streaming indicator)
- Chart/dataviz accents (primary series only — see dataviz skill for the
  rest of the categorical palette; the gradient is not used for multi-series
  charts, only single-value emphasis like a contribution-graph peak)
- Command palette trigger/border glow on open

Everything else — cards, borders, body text links, secondary buttons, badges,
skill icons — stays flat neutral or flat single-tone indigo. No gradient
fills on large surfaces (backgrounds, full cards, full sections), no
multi-hue/rainbow gradients, no neon. If in doubt, the flat neutral version
is correct and the gradient version is the exception that needs a reason.

Category tag colors (Projects/Certificates filters) are muted, desaturated
variants of the neutral palette with a thin colored border — not solid
saturated badges. Consistent with the dataviz skill's categorical-color
guidance: distinguishable, not decorative.

## 2. Typography

Two typefaces max.

- **Display/UI**: `Geist Sans` (Vercel's typeface — free, variable, excellent
  at both large display sizes and small UI text). Fallback stack:
  `ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`
- **Mono** (code, metrics, credential IDs): `Geist Mono`, fallback
  `ui-monospace, "SF Mono", Consolas, monospace`

Type scale (fluid via `clamp()`, base 16px):

```
display-xl   clamp(2.75rem, 2rem + 3.5vw, 5rem)     weight 600  tracking -0.02em   Hero name/headline
display-lg   clamp(2.25rem, 1.75rem + 2.5vw, 3.5rem) weight 600  tracking -0.02em   Section headers
heading-lg   clamp(1.5rem, 1.3rem + 1vw, 2rem)       weight 600  tracking -0.01em   Card/page titles
heading-md   1.25rem                                  weight 600  tracking -0.01em   Subsection titles
heading-sm   1.0625rem                                 weight 600                    Component labels
body-lg      1.125rem                                  weight 400  line-height 1.6   Lede/intro paragraphs
body-md      1rem                                       weight 400  line-height 1.6   Default body
body-sm      0.875rem                                    weight 400  line-height 1.5   Secondary text
caption      0.8125rem                                    weight 500  tracking 0.02em  Meta, labels, uppercase tags
mono-sm      0.8125rem  (Geist Mono)                                                  Credential IDs, code, stats
```

Line length capped at ~68ch for body copy. No justified text. No all-caps
body text (caption/label only, and even then, sparingly).

## 3. Spacing & grid

8px base unit, scale: `4 8 12 16 24 32 48 64 96 128 192`.

- Max content width: `1280px`, with a tighter `760px` reading column for
  articles/long-form (case studies, blog).
- Section vertical rhythm: `96px`–`128px` desktop between major sections,
  `64px` mobile. This is the single biggest lever for "premium" — Linear/
  Stripe pages breathe; templated portfolios cram.
- Grid: 12-column, `24px` gutter desktop, `16px` mobile. Project/certificate
  cards: 3-col desktop → 2-col tablet → 1-col mobile, never auto-fit chaos.

## 4. Elevation & surfaces

- Cards: `1px solid var(--border-subtle)`, `radius: 12px`, no shadow at rest.
  Shadow appears only on hover/interaction — a soft, low-spread shadow
  (`0 8px 24px -8px rgba(0,0,0,0.35)` dark / lighter alpha in light mode) —
  implying liftable, not permanently floating.
- Glass effect reserved for exactly one place: the sticky nav bar on scroll
  (`backdrop-blur(16px)` + `bg-surface` at ~70% opacity) and the command
  palette / AI assistant overlay backdrop. Not used on cards — glass-on-glass
  is the #1 "template" tell.
- Border radius scale: `8px` (buttons, inputs, small chips), `12px` (cards),
  `16px` (large panels/modals), `999px` (pills, avatar, badges). Consistent
  radii, never mixed arbitrarily.

## 5. Motion principles

Motion's job here is to communicate *state*, never to entertain.

- **Duration**: 120–180ms for micro-interactions (hover, focus, toggle),
  200–320ms for content transitions (page/section reveals), never above
  400ms for anything the user is waiting on.
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` (a soft "ease-out-expo") for
  entrances; `cubic-bezier(0.4, 0, 1, 1)` for exits. No bounce, no elastic,
  no spring overshoot — that reads as playful/consumer, not engineering-grade.
- **Scroll reveals**: single fade + 8–12px translate-Y, staggered ~40ms per
  item in a group, triggered once (no re-animate on scroll-back). Never
  parallax body text — parallax is reserved for background decorative
  elements only, and only on the hero.
- **Page transitions**: cross-fade + subtle scale (0.98→1), 200ms, via
  Framer Motion's `AnimatePresence` at the layout level.
- **Magnetic buttons**: max displacement 6–8px toward cursor, spring
  `stiffness: 150, damping: 15` — noticeable, not gimmicky. Applied only to
  primary CTAs (View Resume, Contact), not every button on the page.
- **Respect `prefers-reduced-motion`**: every animation above degrades to an
  opacity-only fade (or no motion) — non-negotiable, enforced at the motion
  wrapper component level, not per-instance.

## 6. Iconography

Lucide icons exclusively, `1.5px` stroke weight, sized in fixed steps (`16px
/ 20px / 24px`) — never arbitrary sizes. Skill icons: use `simple-icons` (via
an SVG icon set, not emoji, not colored logo soup) rendered in the neutral
palette by default, brand color only on hover.

## 7. Component tokens (foundation for Phase 4 component library)

| Token | Value |
|---|---|
| `--radius-sm/md/lg/full` | 8px / 12px / 16px / 999px |
| `--shadow-hover` | soft 24px blur, -8px spread, low opacity |
| `--ease-out` | cubic-bezier(0.16, 1, 0.3, 1) |
| `--ease-in` | cubic-bezier(0.4, 0, 1, 1) |
| `--duration-fast` | 150ms |
| `--duration-base` | 250ms |
| `--focus-ring` | 2px solid var(--accent), 2px offset |
| `--container-max` | 1280px |
| `--container-prose` | 760px |

Focus states: every interactive element gets a visible `--focus-ring` on
`:focus-visible` (not `:focus`, to avoid mouse-click focus rings) — required
for the accessibility bar in the master prompt, and honestly a strong signal
of engineering care to a technical recruiter who tabs through the site.

## 8. What this rules out (explicitly, to prevent scope creep later)

- No colorful gradient text/buttons
- No emoji as UI iconography
- No confetti/celebration animations
- No auto-playing video/audio
- No skeuomorphic shadows or 3D card tilts on hover (popular in template
  portfolios, reads as gimmick over substance)
- No more than one accent color anywhere in the UI

## 9. Accent color — resolved

Indigo (`#5E6AD2` dark / `#4750C9` light) as the flat base accent, with a
restrained indigo→violet gradient (`--accent-gradient`) reserved for the
premium-moment surfaces listed in §1 (primary CTAs, active states, hero glow,
AI Assistant, chart accents, command palette). 90–95% of the interface stays
neutral. No neon, no multi-hue gradients, no gradient-filled large surfaces.
