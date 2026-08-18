import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { siteConfig } from "@/lib/constants";
import { Providers } from "@/components/providers/providers";
import { SkipLink } from "@/components/layout/skip-link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata uses the short role label ("Software Engineer") rather than the
// full hero line — keeps the browser-tab/SEO title within Google's ~60
// character display limit instead of coupling it to on-page hero copy.
const shortRole = siteConfig.role.split(" — ")[0];

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${shortRole}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: `Portfolio of ${siteConfig.name}, ${siteConfig.role}.`,
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-text-primary">
        <Providers>
          <SkipLink />
          {children}
        </Providers>
      </body>
    </html>
  );
}
