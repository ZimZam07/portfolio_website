"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { useHasMounted } from "@/lib/hooks/use-has-mounted";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { PALETTES } from "@/components/visual/fracture-shader";
import {
  createFractureRenderer,
  type FractureRenderer,
} from "@/components/visual/fracture-renderer";

type FractureBackgroundProps = {
  className?: string;
};

/**
 * Landing-page fracture surface. Sits behind all content, never intercepts
 * input, and is `aria-hidden` — it carries no information.
 *
 * Lifecycle is split deliberately across three effects:
 *
 *  1. create/destroy — runs once per mount with an empty dependency list,
 *     so the WebGL context is built exactly once for this canvas and torn
 *     down exactly once when the route unmounts.
 *  2. palette — theme changes push new uniforms into the *existing*
 *     renderer. Rebuilding on every theme change is what previously left a
 *     dead context behind and froze the canvas mid-theme.
 *  3. reduced motion — toggles the loop without touching GPU state.
 *
 * The canvas stays transparent until the theme has actually resolved.
 * `resolvedTheme` is undefined on the first client render, so painting
 * immediately would flash the dark palette on a light page before
 * correcting itself.
 */
export function FractureBackground({ className }: FractureBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<FractureRenderer | null>(null);

  const hasMounted = useHasMounted();
  const reducedMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();

  const ready = hasMounted && Boolean(resolvedTheme);

  // 1 — create once per mount, destroy on unmount.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = createFractureRenderer(canvas);
    rendererRef.current = renderer;

    return () => {
      renderer?.destroy();
      rendererRef.current = null;
    };
  }, []);

  // 2 — theme changes are a uniform update, never a rebuild.
  useEffect(() => {
    if (!resolvedTheme) return;
    rendererRef.current?.setPalette(
      resolvedTheme === "light" ? PALETTES.light : PALETTES.dark,
    );
  }, [resolvedTheme]);

  // 3 — motion preference can change mid-session.
  useEffect(() => {
    rendererRef.current?.setReducedMotion(reducedMotion);
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 h-full w-full transition-opacity duration-500 ease-out motion-reduce:transition-none",
        ready ? "opacity-100" : "opacity-0",
        className,
      )}
    />
  );
}
