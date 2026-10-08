"use client";

import { useEffect } from "react";

/**
 * Restrained route transition (OWNER brief "MAKE THE WEBSITE FEEL ALIVE",
 * 2026-10-08): navigation is never delayed. The first internal link click sets
 * html.al-nav; from then on every newly mounted <main> fades and rises in
 * (alive.css). The first page load is untouched, so LCP is not affected;
 * reduced motion removes the animation entirely.
 */
export function RouteTransition() {
  useEffect(() => {
    const root = document.documentElement;
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Same page (hash or query only) is not a route change.
      if (url.pathname === window.location.pathname) return;
      root.classList.add("al-nav");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
