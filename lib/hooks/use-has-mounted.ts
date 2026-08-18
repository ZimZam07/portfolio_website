"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

/**
 * True once hydrated on the client, false during SSR and the initial
 * client render. Used to defer rendering of state that depends on
 * client-only sources (e.g. the persisted theme) without a hydration
 * mismatch — implemented via useSyncExternalStore rather than a
 * `useEffect(() => setState(true))` so there's no synchronous setState
 * inside an effect body.
 */
export function useHasMounted(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
