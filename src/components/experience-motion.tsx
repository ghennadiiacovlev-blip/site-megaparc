"use client";

import { useEffect } from "react";

/**
 * Experience motion (2026-10-07) — runs beside MotionController (reveals, depth)
 * on every page built with the experience system. No dependency; transform and
 * opacity only; one rAF per scroll frame.
 *
 *   [data-xp-seq]       timed crossfade of [data-xp-frame] children while visible
 *                       (frames marked data-defer stay display:none until after first paint)
 *   [data-xp-scene]     sticky editorial scene: --xp-p (0–1) and data-step from scroll
 *   [data-xp-progress]  scroll-linked line: --xp-p and .is-on on [data-xp-term] children
 *   [data-xp-hero]      --xp-exit (0–1) as the hero leaves; html.hx-solid once it is gone
 *
 * Reduced motion: no cycling, progress lines complete, scenes still switch
 * state with scroll (instantly — CSS removes every transition).
 */
export function ExperienceMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sequences = Array.from(document.querySelectorAll<HTMLElement>("[data-xp-seq]"));
    const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-xp-scene]"));
    const progresses = Array.from(document.querySelectorAll<HTMLElement>("[data-xp-progress]"));
    const hero = document.querySelector<HTMLElement>("[data-xp-hero]");
    const timers: number[] = [];
    const clamp = (v: number) => Math.min(1, Math.max(0, v));

    /* Sequences ------------------------------------------------------ */
    const undefer = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>("[data-xp-frame][data-defer]").forEach((frame) => frame.removeAttribute("data-defer"));
    }, reduce ? 0 : 1800);
    timers.push(undefer);

    const visible = new Set<HTMLElement>();
    const seqObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const node = entry.target as HTMLElement;
        if (entry.isIntersecting) visible.add(node);
        else visible.delete(node);
      });
    }, { threshold: 0.15 });

    if (!reduce) {
      sequences.forEach((seq) => {
        const frames = Array.from(seq.querySelectorAll<HTMLElement>("[data-xp-frame]"));
        if (frames.length < 2) return;
        seqObserver.observe(seq);
        seq.classList.add("is-live");
        // The hero (or the sequence itself) exposes the active frame for progress indicators.
        const host = seq.closest<HTMLElement>("[data-xp-hero]") ?? seq;
        host.dataset.active = "0";
        let index = Math.max(0, frames.findIndex((frame) => frame.classList.contains("is-active")));
        const interval = Number(seq.dataset.interval || 6500);
        const id = window.setInterval(() => {
          if (!visible.has(seq) || document.hidden) return;
          if (frames.some((frame) => frame.hasAttribute("data-defer"))) return;
          frames[index].classList.remove("is-active");
          frames[index].classList.add("was-active");
          const previous = index;
          index = (index + 1) % frames.length;
          frames[index].classList.add("is-active");
          window.setTimeout(() => frames[previous].classList.remove("was-active"), 1700);
          host.dataset.active = String(index);
        }, interval);
        timers.push(id);
      });
    }

    /* Progress lines --------------------------------------------------- */
    if (reduce) {
      progresses.forEach((node) => {
        node.style.setProperty("--xp-p", "1");
        node.querySelectorAll("[data-xp-term]").forEach((term) => term.classList.add("is-on"));
      });
    }

    /* Scroll frame ------------------------------------------------------ */
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;

      if (hero) {
        const rect = hero.getBoundingClientRect();
        const exit = clamp(-rect.top / Math.max(rect.height, 1));
        if (!reduce) hero.style.setProperty("--xp-exit", exit.toFixed(3));
        const header = parseFloat(getComputedStyle(root).getPropertyValue("--header-h")) * 16 || 72;
        // Solid a little before the hero has fully gone, so the hero's bottom controls never pass under a transparent header.
        root.classList.toggle("hx-solid", rect.bottom <= header + 64 || document.body.classList.contains("menu-open"));
      }

      scenes.forEach((scene) => {
        const rect = scene.getBoundingClientRect();
        if (rect.bottom < -vh || rect.top > vh * 2) return;
        const steps = Number(scene.dataset.steps || 1);
        const p = clamp(-rect.top / Math.max(rect.height - vh, 1));
        scene.style.setProperty("--xp-p", p.toFixed(3));
        const step = String(Math.min(steps - 1, Math.floor(p * steps)));
        if (scene.dataset.step !== step) scene.dataset.step = step;
      });

      if (!reduce) {
        progresses.forEach((node) => {
          const rect = node.getBoundingClientRect();
          if (rect.bottom < -vh || rect.top > vh * 1.5) return;
          const p = clamp((vh * 0.8 - rect.top) / Math.max(rect.height, 1));
          node.style.setProperty("--xp-p", p.toFixed(3));
          const terms = node.querySelectorAll<HTMLElement>("[data-xp-term]");
          terms.forEach((term, i) => term.classList.toggle("is-on", p >= (i + 0.5) / terms.length));
        });
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      timers.forEach((id) => window.clearInterval(id));
      timers.forEach((id) => window.clearTimeout(id));
      seqObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove("hx-solid");
    };
  }, []);

  return null;
}
