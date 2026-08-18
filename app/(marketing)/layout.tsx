import { NavBar } from "@/components/layout/nav-bar";
import { Footer } from "@/components/layout/footer";
import { FractureBackground } from "@/components/visual/fracture-background";

/**
 * The fracture background lives here rather than in any page. Every route
 * sits inside this segment, and an App Router layout is not unmounted when
 * navigating between its own children — so the canvas mounts once, the
 * WebGL context is created once, and route changes never rebuild the
 * renderer or spawn a second canvas.
 *
 * `relative isolate` on <main> is load-bearing, not styling. Painting
 * order puts negative-z children *before* the block backgrounds of
 * non-positioned ancestors, so a `-z-10` canvas would render behind
 * <body>'s opaque background and never be seen. Giving <main> its own
 * stacking context means the canvas paints inside it — above the page
 * background, below all page content — while the nav and footer sit
 * outside that context and stay above it. Neither class affects layout:
 * static→relative with no offsets is a no-op, and `isolate` only affects
 * stacking.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main
        id="main-content"
        className="relative isolate flex-1 pt-16 lg:pt-18"
      >
        <FractureBackground />
        {/* Barely-there top scrim: lifts nav and heading legibility over
            the brightest part of the surface without a visible panel. */}
        <div
          className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[45vh] bg-gradient-to-b from-bg-base/70 to-transparent"
          aria-hidden
        />
        {children}
      </main>
      <Footer />
    </>
  );
}
