import { Container } from "@/components/ui/container";
import { AvailabilityStrip } from "@/components/content/availability-strip";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import type { Availability } from "@/types/availability";

type AvailabilitySectionProps = {
  availability: Availability;
};

/** docs/03-wireframes.md §1.2/§1.3 — compact strip directly below the hero. */
export function AvailabilitySection({ availability }: AvailabilitySectionProps) {
  return (
    <section>
      <Container>
        <RevealOnScroll>
          <AvailabilityStrip availability={availability} />
        </RevealOnScroll>
      </Container>
    </section>
  );
}
