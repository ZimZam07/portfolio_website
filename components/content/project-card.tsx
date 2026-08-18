import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  variant?: "hero" | "secondary";
};

/** Featured project card, hero/secondary variants — docs/03-wireframes.md §1.5. */
export function ProjectCard({ project, variant = "secondary" }: ProjectCardProps) {
  const isHero = variant === "hero";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-lg bg-bg-surface-2",
          isHero ? "aspect-[21/9]" : "aspect-[16/10]",
        )}
      >
        {project.heroImage ? (
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-base ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ImageIcon className="size-6 text-text-tertiary" aria-hidden />
          </div>
        )}
        {isHero && (
          <Badge
            tone="neutral"
            className="absolute top-3 left-3 bg-bg-surface/80 backdrop-blur-sm"
          >
            {project.category}
          </Badge>
        )}
      </div>

      <div className="mt-4">
        {!isHero && <Badge tone="outline">{project.category}</Badge>}
        <h3
          className={cn(
            "text-heading-md text-text-primary",
            !isHero && "mt-2",
          )}
        >
          {project.title}
        </h3>
        <p className="mt-1 text-body-sm text-text-secondary">
          {project.tagline}
        </p>

        {project.techStack.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} tone="outline" className="font-mono">
                {tech}
              </Badge>
            ))}
          </div>
        )}

        <span className="mt-3 inline-flex items-center gap-1 text-body-sm text-text-secondary">
          View case study
          <ArrowRight
            className="size-4 transition-transform duration-fast ease-out group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
