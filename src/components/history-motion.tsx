"use client";

import { useEffect } from "react";

/**
 * About — company history motion (2026-10-07).
 *
 * Dependency-free; complements MotionController (reveals, media depth).
 * Every behaviour is opt-in through data attributes rendered on the server,
 * so the page is complete and readable before this runs, without JS and
 * under prefers-reduced-motion (where nothing below is started).
 *
 *   [data-hx-sequence]  timed crossfade of [data-hx-frame] children
 *                       (data-interval ms); runs only while on screen and
 *                       the tab is visible. Frames marked .is-deferred stay
 *                       display:none (their lazy images unrequested) until
 *                       shortly after load, well before the first change
 *   [data-hx-hero]      --hx-exit (0 → 1) while the hero scrolls away;
 *                       html.hx-solid once the hero has left (header state)
 *   [data-hx-stage]     sticky story stage: the last chapter whose top has
 *                       passed the middle of the viewport sets data-active
 *   [data-hx-scene]     pinned 2020 scene (from 720px): data-step 0…n from
 *                       scroll progress through the scene
 *   [data-hx-progress]  .is-live, --hx-progress (0 → 1) across the viewport
 *                       and .is-on on [data-hx-term] items in order
 */
export function HistoryMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];

    const hero = document.querySelector<HTMLElement>("[data-hx-hero]");
    const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-hx-scene]"));
    const progresses = Array.from(document.querySelectorAll<HTMLElement>("[data-hx-progress]"));
    const stages = Array.from(document.querySelectorAll<HTMLElement>("[data-hx-stage]"));
    const sequences = Array.from(document.querySelectorAll<HTMLElement>("[data-hx-sequence]"));

    /* Story stage — works under reduced motion too (the frame simply switches). */
    /* Story stage: the active chapter is the last one whose top has passed the middle of the viewport. */
    const stageSteps = stages.map((stage) => ({ stage, steps: Array.from(stage.querySelectorAll<HTMLElement>("[data-hx-stage-step]")) }));
    const stageState = () => {
      const middle = window.innerHeight * 0.5;
      stageSteps.forEach(({ stage, steps }) => {
        let active = steps[0]?.dataset.hxStageStep ?? "0";
        steps.forEach((step) => {
          if (step.getBoundingClientRect().top <= middle) active = step.dataset.hxStageStep ?? active;
        });
        if (stage.dataset.active !== active) stage.dataset.active = active;
      });
    };

    /* Header: solid once the hero is gone (overlay header on About). */
    const headerState = () => {
      if (!hero) return;
      const header = parseFloat(getComputedStyle(root).getPropertyValue("--header-h")) * 16 || 72;
      root.classList.toggle("hx-solid", hero.getBoundingClientRect().bottom <= header + 1);
    };

    if (reduce) {
      progresses.forEach((el) => {
        el.style.setProperty("--hx-progress", "1");
        el.querySelectorAll("[data-hx-term]").forEach((term) => term.classList.add("is-on"));
      });
      const onScrollStatic = () => {
        headerState();
        stageState();
      };
      onScrollStatic();
      window.addEventListener("scroll", onScrollStatic, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", onScrollStatic));
      return () => {
        cleanups.forEach((fn) => fn());
        root.classList.remove("hx-solid");
      };
    }

    /* Timed crossfades (hero, today). */
    sequences.forEach((sequence) => {
      const frames = Array.from(sequence.querySelectorAll<HTMLElement>("[data-hx-frame]"));
      if (frames.length < 2) return;
      const interval = Number(sequence.dataset.interval || 6500);
      let index = Math.max(0, frames.findIndex((frame) => frame.classList.contains("is-active")));
      let timer = 0;
      let visible = false;
      const show = (next: number) => {
        frames[index].classList.remove("is-active");
        frames[index].classList.add("was-active");
        const previous = index;
        index = next;
        frames[index].classList.remove("was-active");
        frames[index].classList.add("is-active");
        window.setTimeout(() => frames[previous].classList.remove("was-active"), 1800);
      };
      const tick = () => show((index + 1) % frames.length);
      const sync = () => {
        window.clearInterval(timer);
        if (visible && !document.hidden) timer = window.setInterval(tick, interval);
      };
      const observer = new IntersectionObserver((entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        sync();
      });
      observer.observe(sequence);
      document.addEventListener("visibilitychange", sync);
      sequence.classList.add("is-live");
      const undefer = window.setTimeout(() => frames.forEach((frame) => frame.classList.remove("is-deferred")), 2000);
      cleanups.push(() => window.clearTimeout(undefer));
      cleanups.push(() => {
        observer.disconnect();
        window.clearInterval(timer);
        document.removeEventListener("visibilitychange", sync);
        sequence.classList.remove("is-live");
      });
    });

    progresses.forEach((el) => el.classList.add("is-live"));
    cleanups.push(() => progresses.forEach((el) => el.classList.remove("is-live")));

    /* Pinned scene only where there is room; phones keep the static, stacked story. */
    const wide = window.matchMedia("(min-width: 720px)");
    const setLive = () => scenes.forEach((scene) => scene.classList.toggle("is-live", wide.matches));
    setLive();
    wide.addEventListener("change", setLive);
    cleanups.push(() => wide.removeEventListener("change", setLive));

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;

      if (hero) {
        const rect = hero.getBoundingClientRect();
        const exit = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
        hero.style.setProperty("--hx-exit", exit.toFixed(4));
      }
      headerState();
      stageState();

      scenes.forEach((scene) => {
        if (!scene.classList.contains("is-live")) return;
        const rect = scene.getBoundingClientRect();
        const steps = Number(scene.dataset.steps || 4);
        const travel = Math.max(rect.height - vh, 1);
        const progress = Math.min(Math.max(-rect.top / travel, 0), 0.9999);
        scene.dataset.step = String(Math.floor(progress * (steps + 1)));
      });

      progresses.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const start = vh * 0.85;
        const end = vh * 0.35;
        const progress = Math.min(Math.max((start - rect.top) / Math.max(start - end + rect.height * 0.5, 1), 0), 1);
        el.style.setProperty("--hx-progress", progress.toFixed(4));
        const terms = Array.from(el.querySelectorAll<HTMLElement>("[data-hx-term]"));
        terms.forEach((term, i) => term.classList.toggle("is-on", progress >= (i + 0.5) / terms.length));
      });
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    });

    return () => {
      cleanups.forEach((fn) => fn());
      root.classList.remove("hx-solid");
    };
  }, []);

  return null;
}
