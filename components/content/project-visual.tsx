import { ProjectFlowVisual } from "@/components/content/project-flow-visual";
import { ProjectAssistantVisual } from "@/components/content/project-assistant-visual";
import { ProjectApronVisual } from "@/components/content/project-apron-visual";
import type { Project } from "@/types/project";

type ProjectVisualProps = {
  visual: Project["visual"];
  size?: "compact" | "expanded";
  className?: string;
};

/**
 * Picks the decorative visual for a project. Each one is purpose-built to
 * describe that specific product's mechanism, so this is a deliberate
 * switch rather than a generic illustration slot — a project without a
 * visual renders nothing instead of borrowing another project's.
 */
export function ProjectVisual({ visual, size, className }: ProjectVisualProps) {
  switch (visual) {
    case "recovery-lifecycle":
      return <ProjectFlowVisual size={size} className={className} />;
    case "assistant":
      return <ProjectAssistantVisual size={size} className={className} />;
    case "apron":
      return <ProjectApronVisual size={size} className={className} />;
    default:
      return null;
  }
}
