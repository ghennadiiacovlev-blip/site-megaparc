"use client";

import { useEffect } from "react";

/**
 * Dependency-free motion system:
 * - reveal on entry (IntersectionObserver + scroll fallback)
 * - scroll progress signature
 * - hero and media depth (a few px, never parallax theatre)
 * - header scrolled state
 * Everything collapses to a static page under prefers-reduced-motion.
 */
export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const depthNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-depth]"));

    root.classList.add("motion-ready");

    const reveal = (node: Element) => node.classList.add("is-revealed");

    if (reduceMotion) {
      revealNodes.forEach(reveal);
      depthNodes.forEach((node) => node.style.setProperty("--media-depth-shift", "0px"));
      root.style.setProperty("--scroll-progress", "0");
      root.style.setProperty("--hero-shift", "0px");
      body.classList.toggle("is-scrolled", window.scrollY > 48);
      const onScrollStatic = () => body.classList.toggle("is-scrolled", window.scrollY > 48);
      window.addEventListener("scroll", onScrollStatic, { passive: true });
      return () => {
        window.removeEventListener("scroll", onScrollStatic);
        root.classList.remove("motion-ready");
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    revealNodes.forEach((node) => observer.observe(node));

    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const viewportHeight = window.innerHeight;
      const range = root.scrollHeight - viewportHeight;
      const progress = range > 0 ? Math.min(Math.max(y / range, 0), 1) : 0;

      root.style.setProperty("--scroll-progress", String(progress));
      root.style.setProperty("--hero-shift", `${Math.min(y * 0.11, 92)}px`);
      body.classList.toggle("is-scrolled", y > 48);

      depthNodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > viewportHeight + 120) return;
        const depth = Number(node.dataset.depth || 0);
        const center = rect.top + rect.height / 2;
        const normalized = (center - viewportHeight / 2) / viewportHeight;
        const shift = Math.max(-depth, Math.min(depth, normalized * -depth));
        node.style.setProperty("--media-depth-shift", `${shift.toFixed(2)}px`);
      });

      // Fallback: anything already passed (or almost in view) is revealed,
      // so a missed observer entry can never leave a section invisible.
      revealNodes.forEach((node) => {
        if (node.classList.contains("is-revealed")) return;
        const rect = node.getBoundingClientRect();
        if (rect.top < viewportHeight * 0.92) {
          reveal(node);
          observer.unobserve(node);
        }
      });
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove("motion-ready");
      body.classList.remove("is-scrolled");
    };
  }, []);

  return null;
}
