// Shape source: docs/01-information-architecture.md §4 Content model,
// extended per the Certificates page design brief (2026-08-02): timeline/
// list design (no image gallery), skills demonstrated + why-it-matters
// per entry, single credentialUrl powering a "View Credential" button —
// today it points at a PDF/image, later swaps to an official verify link
// without any UI change.

export type Certificate = {
  /** Stable identifier for React keys — a slug, not derived from title. */
  id: string;
  title: string;
  issuer: string;
  dateIssued: string;
  category: string; // open-ended: Programming, AI, Cloud, Product, etc.
  skillsDemonstrated: string[];
  whyItMatters: string;
  credentialId?: string;
  credentialUrl?: string;
  /** Path to a real logo file (public/logos/...). Omit if none provided —
   *  OrgLogo falls back to a neutral monogram, never a fabricated mark. */
  logo?: string;
};
