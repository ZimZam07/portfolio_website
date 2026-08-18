"use client";

import { ArrowRight, ArrowUpRight, Check, Zap } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";
import { quickScan, recruiterHero } from "@/lib/content/recruiter";

/**
 * The 30-second summary.
 *
 * Built on the existing Dialog primitive rather than a hand-rolled
 * overlay, which supplies the parts that are easy to get wrong for free:
 * `role="dialog"`, focus trapping and restore, Escape to close,
 * click-outside to close, and inert background content.
 *
 * Every line here restates something already on the page — the modal is a
 * faster path to the same facts, not a separate set of claims.
 */
export function QuickScan() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="secondary" className="group">
            <Zap
              className="size-4 text-brand transition-transform duration-base ease-out motion-safe:group-hover:scale-110"
              aria-hidden
            />
            Quick Scan
          </Button>
        }
      />

      <DialogContent className="max-w-[calc(100%-2rem)] gap-0 border border-border-subtle bg-bg-base p-0 ring-0 sm:max-w-lg">
        <div className="border-b border-border-subtle p-6">
          <p className="flex items-center gap-2 text-caption tracking-wide text-brand uppercase">
            <Zap className="size-3.5" aria-hidden />
            Recruiter Quick Scan
          </p>

          <DialogTitle className="mt-3 text-heading-lg font-semibold text-text-primary">
            {recruiterHero.name}
          </DialogTitle>
          <DialogDescription className="mt-1 text-body-md text-text-secondary">
            {recruiterHero.title}
          </DialogDescription>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-6">
          <ul className="flex flex-col gap-2.5">
            {quickScan.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check
                  className="mt-1 size-3.5 shrink-0 text-success"
                  aria-hidden
                />
                <span className="text-body-sm text-text-secondary">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-border-subtle pt-5">
            <p className="text-caption tracking-wide text-text-tertiary uppercase">
              Available for
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {quickScan.availableFor.map((role) => (
                <li key={role}>
                  <Badge tone="outline">{role}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border-subtle p-6 sm:flex-row">
          <Button
            href={siteConfig.resumeUrl}
            external
            variant="primary"
            className="group"
          >
            View Resume
            <ArrowUpRight
              className="size-4 transition-transform duration-fast ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
              aria-hidden
            />
            <span className="sr-only">(opens in a new tab)</span>
          </Button>

          {/* Closing before navigating avoids leaving a stale dialog behind
              when the route changes underneath it. */}
          <DialogClose
            render={
              <Button href="/contact" variant="secondary" className="group">
                Let&apos;s Connect
                <ArrowRight
                  className="size-4 transition-transform duration-base ease-out motion-safe:group-hover:translate-x-1"
                  aria-hidden
                />
              </Button>
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
