import type { Project } from "@/types/project";

/*
 * Content rule for this module: every technical claim must be verifiable in
 * the linked repository.
 *
 * Notably excluded from the JIIT stack below — TanStack Query, React Hook
 * Form and Zod are all in that project's package.json but are not
 * meaningfully used (the query provider is mounted yet pages fetch with
 * useState/useEffect; the forms validate by hand), and its test tooling is
 * still scaffolding. Listing them would be inference, not fact.
 *
 * Excluded from the fitness project for a stronger reason: that repository
 * is tagged with TensorFlow/scikit-learn and described as doing "ML-based
 * predictions", but contains no ML of any kind — no Python, no ML library,
 * no training or inference. Its /ml-models screen renders hardcoded
 * accuracy literals, its "clustering" is if/else on activity level, and the
 * function labelled Random Forest in the UI is three lines of threshold
 * logic. None of that is represented here. No model name is claimed either:
 * the edge function pins no `model` field and takes the gateway default.
 *
 * TODO: remaining projects get added here one at a time, on request.
 */
const projects: Project[] = [
  {
    slug: "jiit-lost-and-found",
    title: "JIIT Lost & Found",
    kicker: "Campus Recovery Platform",
    tagline:
      "A campus recovery platform connecting students with lost belongings through verified listings, structured finder requests, and owner-controlled recovery workflows.",
    positioning:
      "A campus-focused platform that makes lost-item recovery structured, searchable, and trustworthy.",
    category: "Full Stack",
    status: "shipped",
    featured: true,
    role: "Solo project",

    problemStatement:
      "Students report lost belongings through group chats. Messages scroll away within hours, the same item gets posted three times, and there is no way to tell whether something was ever recovered — or whether the person claiming it is who they say they are.",
    solution:
      "A dedicated platform for the JIIT campus that turns those scattered messages into structured listings. Students post an item with details, a photo and a reward; other students submit a request against it rather than a reply; and the owner decides who gets it while the listing moves through an explicit status lifecycle.",

    highlights: [
      "Verified Students",
      "Reward Listings",
      "Finder Requests",
      "Status Tracking",
    ],

    capabilities: [
      {
        icon: "verified",
        title: "Verified Campus Access",
        description:
          "Only @mail.jiit.ac.in addresses can register or sign in, and the same check runs again when a request is submitted — keeping the platform to the campus community.",
      },
      {
        icon: "listing",
        title: "Structured Listings",
        description:
          "Items are posted as real records — name, colour, model number, last-seen location, contact and photo — instead of a paragraph of free text.",
      },
      {
        icon: "request",
        title: "Finder Requests",
        description:
          "A finder submits a request against a listing, carrying their verified profile details, rather than replying into an untracked thread.",
      },
      {
        icon: "owner",
        title: "Owner-Controlled Decisions",
        description:
          "The person who posted the item reviews incoming requests, edits the listing, and decides when it has been returned. Nobody else can act on it.",
      },
      {
        icon: "reward",
        title: "Reward-Backed Recovery",
        description:
          "Every listing carries a reward value with a minimum enforced at the database level, giving finders a concrete reason to follow through.",
      },
      {
        icon: "status",
        title: "Item Status Tracking",
        description:
          "A listing moves through open → accepted → completed rather than sitting as permanently lost, with expiry handled as its own state.",
      },
      {
        icon: "responsive",
        title: "Responsive Experience",
        description:
          "Built for the phone a student actually has in their hand when they realise something is missing, and equally usable on desktop.",
      },
    ],

    workflow: [
      {
        title: "Report",
        description:
          "A student posts a lost item with its details, last-seen location, a reward and an optional photo. The listing opens in the `open` state.",
        detail: "lost_requests · insert",
      },
      {
        title: "Discover",
        description:
          "Other signed-in students browse open listings, where structured fields make an item identifiable at a glance.",
        detail: "row level security · select",
      },
      {
        title: "Request",
        description:
          "A finder submits a request against the listing. Their name, phone and email are carried across from their verified profile rather than typed in freehand.",
        detail: "acceptances · insert",
      },
      {
        title: "Verify",
        description:
          "The campus email domain is enforced again at this point, and access policies decide what each party is allowed to read or change.",
        detail: "@mail.jiit.ac.in",
      },
      {
        title: "Resolve",
        description:
          "The owner reviews the request and marks the item returned. Each transition writes a notification and an activity-log entry.",
        detail: "open → accepted → completed",
      },
    ],

    technicalNotes: [
      {
        area: "Data model",
        detail:
          "Five Postgres tables — listings, acceptances, profiles, notifications and activity logs — defined in versioned SQL migrations. A CHECK constraint pins status to open, accepted, completed or expired, and a second one enforces a floor on the reward value, so invalid rows are rejected by the database rather than by UI code.",
      },
      {
        area: "Access control",
        detail:
          "Row Level Security is enabled on every table. Any signed-in student can read listings, but only the creator can modify their own; an acceptance record is visible solely to the two parties involved, and notification and activity rows are scoped to their owner.",
      },
      {
        area: "Authentication",
        detail:
          "Supabase email authentication with a hard @mail.jiit.ac.in domain check at sign-up, sign-in and request acceptance. A database trigger provisions the matching profile row the moment an account is created, so no client code can forget to.",
      },
      {
        area: "State transitions",
        detail:
          "Status changes route through a validation helper instead of arbitrary writes, so a listing cannot jump into an invalid state. Deleting a listing cascades to the acceptances attached to it rather than orphaning them.",
      },
      {
        area: "Image handling",
        detail:
          "Photos upload to a dedicated storage bucket with public read and per-user delete policies; the resulting URL is stored on the listing record.",
      },
      {
        area: "Frontend",
        detail:
          "React with TypeScript on Vite, routed with React Router. Authenticated areas sit behind a protected-route wrapper fed by an auth context, and the interface is built on Tailwind CSS with shadcn/ui primitives.",
      },
    ],

    engineeringFocus: {
      summary:
        "This project involved more than building a UI. It required designing workflows around user-generated listings, ownership, requests, verification and item state transitions — pushing the rules that matter into database constraints and access policies rather than trusting the client, and turning a common campus problem into a structured software product.",
      areas: [
        "Product thinking",
        "Schema & data modelling",
        "Access control",
        "Workflow design",
        "State management",
        "Frontend development",
      ],
    },

    impact: [
      { from: "Scattered group messages", to: "Structured, browsable listings" },
      { from: "Anonymous claims", to: "Verified campus accounts" },
      { from: "Uncertain recovery", to: "A trackable status lifecycle" },
      { from: "Informal coordination", to: "Owner-controlled requests" },
    ],

    techStack: [
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "React Router",
      "Tailwind CSS",
      "Vite",
    ],
    links: {
      live: "https://finders-keepers-jiit.lovable.app/",
      github: "https://github.com/ZimZam07/lost-and-found-jiit",
    },
    timeline: { start: "Apr 2026" },
    dateAdded: "2026-08-11",
    visual: "recovery-lifecycle",
  },

  {
    slug: "ai-fitness-assistant",
    title: "AI-Assisted Fitness App",
    kicker: "Personalised Fitness Companion",
    tagline:
      "A fitness app that turns your profile and daily logs into personalised targets — pairing a streamed, context-grounded assistant with a deterministic calculation engine.",
    positioning:
      "A fitness companion that answers with a formula where one exists, and with a context-grounded AI assistant where one doesn't.",
    category: "AI",
    status: "shipped",
    featured: true,
    role: "Solo project",

    problemStatement:
      "Fitness apps tend to answer everyone the same way. Generic calorie targets and template workout plans ignore the numbers a user actually has — height, weight, goal, activity level, and what they logged this week. Bolting a general-purpose chatbot on top doesn't fix it either: it will happily discuss anything except the data sitting in front of it.",
    solution:
      "An app where the user's own data drives both halves of the experience. A profile and a daily log feed a deterministic engine that computes BMI, calorie and hydration targets from established formulas, and that same data is injected into the system prompt of a streamed AI assistant that is fenced to fitness and can refer to what the user actually logged.",

    highlights: [
      "Grounded AI Assistant",
      "Formula-Backed Targets",
      "Daily Metric Logging",
      "Personalised Plans",
    ],

    capabilities: [
      {
        icon: "ai",
        title: "Context-Grounded Assistant",
        description:
          "Before a message reaches the model, the user's profile and recent daily logs are assembled into the system prompt — so replies refer to their own numbers, and stream back token by token.",
      },
      {
        icon: "calculator",
        title: "Deterministic Calculation Engine",
        description:
          "BMI, basal metabolic rate, daily calorie target and hydration goal are computed from established formulas — identical every time, with no model in the loop.",
      },
      {
        icon: "command",
        title: "Instant Command Assistant",
        description:
          "Five one-tap commands answer the most common questions locally and immediately, with no network round trip and no tokens spent.",
      },
      {
        icon: "log",
        title: "Daily Metric Logging",
        description:
          "Weight, sleep, water, workout minutes, calories burned and steps are logged per day and kept as a dated history the user owns.",
      },
      {
        icon: "plan",
        title: "Personalised Plan Generation",
        description:
          "Workout plans adapt to the user's goal and whether they train at home or in a gym — gym-only exercises are filtered out for home users — and meal suggestions follow the same goal.",
      },
      {
        icon: "auth",
        title: "Username-Based Access",
        description:
          "Users sign in with a username while Supabase still handles credentials, and row-level policies scope every log to the person who wrote it.",
      },
      {
        icon: "responsive",
        title: "Responsive Experience",
        description:
          "Logging a workout happens on a phone, so the interface is built to work at that size as readily as on desktop.",
      },
    ],

    workflow: [
      {
        title: "Build a profile",
        description:
          "The user records age, gender, height, weight, goal, activity level, workout level and whether they train at home or in a gym. Everything downstream reads from this.",
        detail: "profiles · insert",
      },
      {
        title: "Log the day",
        description:
          "Weight, sleep, water, workout minutes, calories burned and steps are captured per date, building a history rather than a single snapshot.",
        detail: "daily_logs · insert",
      },
      {
        title: "Get an instant answer",
        description:
          "The quick assistant computes BMI, calorie target, hydration, workout plan and meals directly from the profile — no request leaves the browser.",
        detail: "local · no network",
      },
      {
        title: "Ask the assistant",
        description:
          "For anything open-ended, an edge function injects the profile and recent logs into the prompt and streams the reply back as it is generated.",
        detail: "fitness-chat · SSE stream",
      },
      {
        title: "Review the report",
        description:
          "BMI and its status, the daily calorie target, hydration goal, workout plan and meal suggestions are assembled into a single personalised report.",
        detail: "report · computed",
      },
    ],

    intelligence: {
      summary:
        "The assistant isn't a chat window bolted onto a fitness app. A Supabase edge function assembles the user's profile and recent daily logs into the system prompt before any message reaches the model, so answers refer to their own numbers instead of general advice. The same prompt fences the assistant to health, fitness, diet, nutrition and the app's own features, with a fixed redirect for anything outside that. Replies stream back over SSE, and the API key never leaves the server.",
      inputs: [
        "Age, gender, height, weight",
        "Goal & activity level",
        "Workout level & location",
        "Recent daily logs",
        "Conversation history",
      ],
      outputs: [
        "Token-by-token streamed replies",
        "Answers citing the user's logged data",
        "Guidance scoped to fitness",
      ],
      guardrails: [
        "Domain-restricted system prompt",
        "Fixed redirect when off-topic",
        "API key held server-side",
        "Rate-limit & credit errors separated",
      ],
    },

    technicalNotes: [
      {
        area: "AI layer",
        detail:
          "A Deno edge function posts the conversation to an AI gateway with streaming enabled and relays the resulting server-sent event stream straight to the browser, so tokens render as they arrive rather than after a pause. The API key is read from the function's environment and never reaches the client.",
      },
      {
        area: "Prompt grounding",
        detail:
          "The function builds the system prompt at request time from the caller's profile — age, gender, height, weight, goal, activity level, workout level and training location — plus their recent daily log entries. That context is what lets the assistant answer about this user rather than a hypothetical one.",
      },
      {
        area: "Scope control",
        detail:
          "The same prompt restricts the assistant to health, fitness, diet, nutrition, the user's own data and app features, with a fixed reply that redirects anything else — a general-purpose model kept inside the product's remit rather than left open-ended.",
      },
      {
        area: "Calculation engine",
        detail:
          "BMI, Mifflin–St Jeor basal metabolic rate, total daily energy expenditure via activity multipliers with a goal-based adjustment, and hydration scaled to body weight. These run locally, which is why the quick commands return instantly and always agree with the generated report.",
      },
      {
        area: "Data & access",
        detail:
          "Postgres with row-level security on both tables: a profile is writable only by its owner, and daily logs are scoped to their owner across every operation. A trigger maintains profile timestamps, and both tables cascade on user deletion.",
      },
      {
        area: "Authentication",
        detail:
          "Supabase email authentication fronted by a username flow — a database function resolves a username to its registered email so users sign in with a handle while Supabase still owns the credentials.",
      },
      {
        area: "Frontend",
        detail:
          "React with TypeScript on Vite, routed with React Router. An auth context swaps the entire route tree depending on session and profile state, so an incomplete profile lands on onboarding rather than a broken dashboard. UI is built on Tailwind with shadcn/ui primitives.",
      },
      {
        area: "Failure handling",
        detail:
          "The edge function separates gateway rate limiting and exhausted credits from generic failures, returning a specific message for each so the interface can explain what happened instead of showing one opaque error.",
      },
    ],

    engineeringFocus: {
      summary:
        "The interesting problem here wasn't calling a model — it was deciding when not to. Questions with a correct answer are computed locally by formula, instantly and identically every time; only open-ended ones reach the assistant. Building that split meant designing the profile and logging schema first, injecting it as prompt context, keeping the key server-side in an edge function, and constraining a general-purpose model to the product's domain.",
      areas: [
        "AI integration",
        "Prompt grounding",
        "Product thinking",
        "Schema & access control",
        "Streaming UX",
        "Frontend architecture",
      ],
    },

    impact: [
      { from: "Generic fitness advice", to: "Guidance grounded in your own logs" },
      { from: "An open-ended chatbot", to: "An assistant scoped to the product" },
      { from: "Manual calculation", to: "Formula-backed daily targets" },
      { from: "Scattered daily numbers", to: "A structured history you own" },
    ],

    techStack: [
      "React",
      "TypeScript",
      "Supabase",
      "Edge Functions",
      "PostgreSQL",
      "Tailwind CSS",
      "Vite",
    ],
    links: {
      live: "https://auth-stride-path.lovable.app/",
      github: "https://github.com/ZimZam07/AI-powered-fittness-assistant",
    },
    timeline: { start: "May 2026" },
    dateAdded: "2026-08-16",
    visual: "assistant",
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
