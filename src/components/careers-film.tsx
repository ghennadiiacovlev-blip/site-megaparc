"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Video-ready careers hero media.
 *
 * - `src` is null until the MEGAPARC brand film exists in /public
 *   (checked at build time by the server wrapper) → only the poster renders,
 *   so no broken media request is ever issued.
 * - When the film exists: autoplay, muted, loop, playsInline, poster.
 * - prefers-reduced-motion: the film never plays; the poster stays.
 * - The poster is rendered as a priority image underneath the video so the
 *   frame has its size before any media loads (no layout shift).
 */
export function CareersFilm({ src, poster, alt }: { src: string | null; poster: string; alt: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (query.matches) {
        video.pause();
        video.removeAttribute("autoplay");
      } else if (video.paused) {
        video.play().catch(() => {});
      }
    };
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, [src]);

  return (
    <div className="film" data-film={src ? "ready" : "poster"}>
      <Image src={poster} alt={alt} fill priority sizes="100vw" className="film__poster" />
      {src ? (
        <video ref={ref} className="film__video" autoPlay muted loop playsInline preload="metadata" poster={poster} aria-hidden="true" tabIndex={-1}>
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
      <span className="film__veil" aria-hidden="true" />
    </div>
  );
}
