import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/content/social-links";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { socialLinks } from "@/lib/constants";

/** docs/03-wireframes.md §1.2/§1.6 — closing CTA band, bookends the hero. */
export function ContactCtaSection() {
  return (
    <section className="bg-bg-surface py-16 lg:py-24">
      <Container className="flex flex-col items-center gap-6 text-center">
        <RevealOnScroll className="flex flex-col items-center gap-6">
          <h2 className="text-display-lg font-semibold text-text-primary">
            Let&apos;s build something.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href="/contact" variant="primary">
              Get in touch
            </Button>
            {socialLinks.calendly && (
              <Button href={socialLinks.calendly} variant="secondary" external>
                Schedule a call
              </Button>
            )}
          </div>
          <SocialLinks />
        </RevealOnScroll>
      </Container>
    </section>
  );
}
