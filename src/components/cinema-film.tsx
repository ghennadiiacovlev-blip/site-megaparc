"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed atmospheric film behind a statement (OWNER addendum 2026-10-08,
 * careers video). The film is atmosphere, not a player:
 *
 * - the poster (first frame of the edit) renders first — no layout shift, and
 *   it is the only thing a reduced-motion visitor ever gets (no video request);
 * - the video gets its source only near the viewport (IntersectionObserver),
 *   then plays muted · looped · inline, without native controls;
 * - it pauses when it leaves the viewport and resumes when it returns;
 * - phones in portrait get the vertical edit (its own crops), everything else
 *   the 16:9 edit; an orientation change swaps the source;
 * - one discreet pause / play button (WCAG 2.2.2) — a choice the film respects
 *   until the visitor presses it again.
 */

type Edit = { src: string; poster: string };
type Copy = { pause: string; play: string };

const PORTRAIT = "(max-width: 767px) and (orientation: portrait)";

export function CinemaFilm({ desktop, mobile, copy, priority = false }: { desktop: Edit; mobile: Edit; copy: Copy; priority?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [state, setState] = useState<"still" | "playing" | "paused">("still");
  const [motion, setMotion] = useState(false);

  useEffect(() => {
    const node = root.current;
    const film = video.current;
    if (!node || !film) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const portrait = window.matchMedia(PORTRAIT);
    let visible = false;

    // React does not always reflect `muted` as an attribute; autoplay policies need the property.
    film.muted = true;
    const source = () => (portrait.matches ? mobile.src : desktop.src);
    const play = () => {
      if (reduce.matches || userPaused.current || !visible) return;
      if (!film.getAttribute("src")) film.setAttribute("src", source());
      film.play().catch(() => setState("still"));
    };
    const stop = () => {
      if (!film.paused) film.pause();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) play();
        else stop();
      },
      { rootMargin: "20% 0px" },
    );
    observer.observe(node);

    const onPlaying = () => setState("playing");
    const onPause = () => setState((current) => (current === "still" ? current : "paused"));
    film.addEventListener("playing", onPlaying);
    film.addEventListener("pause", onPause);

    const onReduce = () => {
      setMotion(!reduce.matches);
      if (reduce.matches) {
        stop();
        film.removeAttribute("src");
        film.load();
        setState("still");
      } else play();
    };
    const onOrientation = () => {
      if (!film.getAttribute("src")) return;
      const wasPlaying = !film.paused;
      film.setAttribute("src", source());
      if (wasPlaying) film.play().catch(() => {});
    };
    setMotion(!reduce.matches);
    reduce.addEventListener("change", onReduce);
    portrait.addEventListener("change", onOrientation);

    return () => {
      observer.disconnect();
      film.removeEventListener("playing", onPlaying);
      film.removeEventListener("pause", onPause);
      reduce.removeEventListener("change", onReduce);
      portrait.removeEventListener("change", onOrientation);
    };
  }, [desktop.src, mobile.src]);

  const toggle = () => {
    const film = video.current;
    if (!film) return;
    if (film.paused) {
      userPaused.current = false;
      if (!film.getAttribute("src")) film.setAttribute("src", window.matchMedia(PORTRAIT).matches ? mobile.src : desktop.src);
      film.play().catch(() => {});
    } else {
      userPaused.current = true;
      film.pause();
    }
  };

  return (
    <div className="cf" ref={root} data-state={state}>
      <picture className="cf__poster">
        <source media={PORTRAIT} srcSet={mobile.poster} />
        <img src={desktop.poster} alt="" loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" />
      </picture>
      <video ref={video} className="cf__video" muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} disablePictureInPicture disableRemotePlayback />
      {motion ? (
        <button type="button" className="cf__toggle" onClick={toggle} aria-label={state === "playing" ? copy.pause : copy.play}>
          <span aria-hidden="true" className={state === "playing" ? "cf__icon cf__icon--pause" : "cf__icon cf__icon--play"} />
        </button>
      ) : null}
    </div>
  );
}
