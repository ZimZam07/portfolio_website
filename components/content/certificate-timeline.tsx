"use client";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { CertificateTimelineEntry } from "@/components/content/certificate-timeline-entry";
import type { Certificate } from "@/types/certificate";

type CertificateTimelineProps = {
  certificates: Certificate[];
};

/**
 * The connecting line/dot per entry animates in as its row scrolls into
 * view (whileInView, once) — a "path drawing itself" feel without any
 * global scroll-progress math. Each segment triggers off its own
 * intersection, the same technique RevealOnScroll already uses elsewhere,
 * so there's no fragile absolute-positioned overlay to keep aligned.
 */
export function CertificateTimeline({ certificates }: CertificateTimelineProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col">
      {certificates.map((certificate, index) => {
        const isLast = index === certificates.length - 1;
        return (
          <div key={certificate.id} className="flex gap-6">
            <div className="flex w-2 shrink-0 flex-col items-center" aria-hidden>
              <motion.span
                className="mt-2.5 block size-2 shrink-0 rounded-full bg-brand"
                initial={
                  reducedMotion
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.4 }
                }
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
              {!isLast && (
                <motion.span
                  className="mt-2 w-px flex-1 origin-top bg-border-subtle"
                  initial={reducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.1,
                  }}
                />
              )}
            </div>

            <div className="min-w-0 flex-1 pb-10">
              <RevealOnScroll index={index}>
                <CertificateTimelineEntry certificate={certificate} />
              </RevealOnScroll>
            </div>
          </div>
        );
      })}
    </div>
  );
}
