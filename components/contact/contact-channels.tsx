"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Clock, Copy, Link2, Mail, MapPin } from "lucide-react";
import { siGithub } from "simple-icons";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { BrandIcon } from "@/components/ui/brand-icon";
import { siteConfig, socialLinks } from "@/lib/constants";

/**
 * Direct contact channels, ranked rather than presented as four equal
 * boxes: email is the route a recruiter actually takes, so it gets the
 * gradient hairline — the treatment this design system reserves for the
 * single most important surface in a viewport — while LinkedIn and GitHub
 * sit beneath it as neutral secondary cards.
 *
 * Copy sits beside the mailto link as its own <button>, so both actions
 * stay separately reachable by keyboard and the link keeps native
 * behaviour (middle-click, open-in-new-tab, drag).
 *
 * LinkedIn uses a neutral link glyph: neither simple-icons nor lucide
 * ships a LinkedIn mark (withdrawn at the brand owner's request), and an
 * unofficial substitute would be worse than a generic one.
 */
export function ContactChannels() {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure origin or denied permission). The
      // mailto link beside this still works, so fail quietly.
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Primary — email */}
      <RevealOnScroll>
        <div className="relative">
          <div
            className="absolute inset-0 -z-10 rounded-lg bg-gradient-brand opacity-[0.07] blur-3xl"
            aria-hidden
          />
          <div className="rounded-lg bg-gradient-brand p-px transition-transform duration-base ease-out motion-safe:hover:-translate-y-0.5">
            <div className="rounded-[calc(var(--radius-lg)-1px)] bg-bg-base p-6 sm:p-8">
              <p className="flex items-center gap-2 text-caption tracking-wide text-text-tertiary uppercase">
                <Mail className="size-3.5 text-brand" aria-hidden />
                Email
              </p>

              <a
                href={`mailto:${siteConfig.email}`}
                className="group mt-3 inline-flex max-w-full items-center gap-2 rounded-sm text-heading-md break-all text-text-primary transition-colors duration-fast ease-out hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:text-heading-lg"
              >
                {siteConfig.email}
                <ArrowUpRight
                  className="size-5 shrink-0 transition-transform duration-base ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </a>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group inline-flex h-11 items-center gap-2 rounded-md bg-gradient-brand px-6 text-body-sm font-medium text-white transition-[filter] duration-fast ease-out hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  Send an email
                  <ArrowUpRight
                    className="size-4 transition-transform duration-base ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </a>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex h-11 items-center gap-2 rounded-md border border-border-default px-5 text-body-sm text-text-secondary transition-colors duration-fast ease-out hover:border-brand/50 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {copied ? (
                    <Check className="size-4 text-success" aria-hidden />
                  ) : (
                    <Copy className="size-4" aria-hidden />
                  )}
                  {copied ? "Copied" : "Copy address"}
                </button>
              </div>

              {/* Announced politely rather than as an interrupting alert. */}
              <span aria-live="polite" className="sr-only">
                {copied ? "Email address copied to clipboard" : ""}
              </span>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Secondary — profiles */}
      <div className="grid gap-4 sm:grid-cols-2">
        {socialLinks.linkedin && (
          <RevealOnScroll index={1}>
            <ProfileCard
              label="LinkedIn"
              value="in/zimran-ullah"
              href={socialLinks.linkedin}
              icon={<Link2 className="size-3.5 text-brand" aria-hidden />}
            />
          </RevealOnScroll>
        )}

        {socialLinks.github && (
          <RevealOnScroll index={2}>
            <ProfileCard
              label="GitHub"
              value="ZimZam07"
              href={socialLinks.github}
              icon={
                <BrandIcon icon={siGithub} className="size-3.5 text-brand" aria-hidden />
              }
            />
          </RevealOnScroll>
        )}
      </div>

      {/* Quiet footer row — informational, not interactive. */}
      <RevealOnScroll index={3}>
        <div className="mt-2 flex flex-col gap-3 border-t border-border-subtle pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-body-md text-text-secondary">
            <MapPin className="size-4 shrink-0 text-text-tertiary" aria-hidden />
            {siteConfig.location}
          </p>
          <p className="flex items-center gap-2 text-body-sm text-text-tertiary">
            <Clock className="size-3.5 shrink-0" aria-hidden />
            I usually respond within 24–48 hours.
          </p>
        </div>
      </RevealOnScroll>
    </div>
  );
}

function ProfileCard({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border-subtle bg-bg-surface p-6 transition-all duration-base ease-out hover:border-brand/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-safe:hover:-translate-y-0.5"
    >
      <span className="flex items-center justify-between gap-2 text-caption tracking-wide text-text-tertiary uppercase">
        <span className="flex items-center gap-2">
          {icon}
          {label}
        </span>
        <ArrowUpRight
          className="size-4 transition-transform duration-base ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
          aria-hidden
        />
      </span>

      <span className="mt-3 text-body-lg break-all text-text-primary transition-colors duration-fast ease-out group-hover:text-brand">
        {value}
      </span>
      <span className="sr-only">(opens in a new tab)</span>

      <span
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-brand transition-transform duration-base ease-out group-hover:scale-x-100 motion-reduce:transition-none"
        aria-hidden
      />
    </a>
  );
}
