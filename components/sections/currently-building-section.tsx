import { Container } from "@/components/ui/container";
import { CurrentlyBuildingCard } from "@/components/content/currently-building-card";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import type { CurrentlyBuilding } from "@/types/currently-building";

type CurrentlyBuildingSectionProps = {
  project: CurrentlyBuilding;
};

/** docs/03-wireframes.md §1.2 — a live, easy-to-update "what I'm building now" beat. */
export function CurrentlyBuildingSection({
  project,
}: CurrentlyBuildingSectionProps) {
  return (
    <section>
      <Container>
        <RevealOnScroll>
          <CurrentlyBuildingCard project={project} />
        </RevealOnScroll>
      </Container>
    </section>
  );
}
