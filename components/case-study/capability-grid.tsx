import {
  Activity,
  Bot,
  Calculator,
  ClipboardList,
  Gift,
  KeyRound,
  ListPlus,
  NotebookPen,
  Send,
  ShieldCheck,
  Smartphone,
  UserCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";

import type { CapabilityIcon, ProjectCapability } from "@/types/project";

type CapabilityGridProps = {
  capabilities: ProjectCapability[];
};

/** Keeps the content modules free of React imports — see types/project.ts. */
const ICONS: Record<CapabilityIcon, LucideIcon> = {
  verified: ShieldCheck,
  listing: ListPlus,
  request: Send,
  owner: UserCheck,
  reward: Gift,
  status: Activity,
  responsive: Smartphone,
  ai: Bot,
  calculator: Calculator,
  command: Zap,
  log: NotebookPen,
  plan: ClipboardList,
  auth: KeyRound,
};

/**
 * Feature grid per docs/03-wireframes.md §2.6: filled surface, no
 * per-card border — the page already carries enough bordered chrome, and
 * outlining these too produces card-fatigue.
 */
export function CapabilityGrid({ capabilities }: CapabilityGridProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {capabilities.map((capability) => {
        const Icon = ICONS[capability.icon];
        return (
          <li
            key={capability.title}
            className="group rounded-md bg-bg-surface p-5 transition-colors duration-base ease-out hover:bg-bg-surface-2"
          >
            <Icon
              className="size-5 text-text-tertiary transition-colors duration-base ease-out group-hover:text-brand"
              aria-hidden
            />
            <h3 className="mt-3 text-heading-sm font-medium text-text-primary">
              {capability.title}
            </h3>
            <p className="mt-1.5 text-body-sm text-text-secondary">
              {capability.description}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
