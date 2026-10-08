"use client";

import { useEffect, useState } from "react";

/**
 * History chronometer — a small fixed index that follows the reader through
 * the chronicle: chapter number, years and name of the chapter on screen, and
 * how far through the chronicle they are. Pure reading aid: the page is
 * complete without it, and it only changes text and one scale transform
 * (no animation under prefers-reduced-motion — CSS removes the transition).
 * Chapters are the server-rendered sections marked [data-hs-era].
 */
export type ChronoEra = { key: string; no: string; range: string; label: string; scope: "group" | "megaparc" | "both" };

export function HistoryChronometer({ eras, label }: { eras: ChronoEra[]; label: string }) {
  const [active, setActive] = useState<number>(-1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = eras.map((era) => document.querySelector<HTMLElement>(`[data-hs-era="${era.key}"]`));
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.45;
      let index = -1;
      sections.forEach((section, i) => {
        if (section && section.getBoundingClientRect().top <= line) index = i;
      });
      const first = sections[0]?.getBoundingClientRect();
      const last = sections[sections.length - 1]?.getBoundingClientRect();
      if (first && last) {
        const total = last.bottom - first.top;
        const done = Math.min(1, Math.max(0, (line - first.top) / Math.max(total, 1)));
        setProgress(done);
        if (last.bottom < line) index = -1;
      }
      setActive(index);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    frame = window.requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [eras]);

  const era = active >= 0 ? eras[active] : null;
  return (
    <aside className={`hs-chrono${era ? " is-on" : ""}${era?.scope === "megaparc" ? " is-megaparc" : ""}`} aria-hidden="true" data-label={label}>
      <span className="hs-chrono__no">{era?.no ?? ""}</span>
      <span className="hs-chrono__range">{era?.range ?? ""}</span>
      <span className="hs-chrono__label">{era?.label ?? ""}</span>
      <span className="hs-chrono__bar"><i style={{ transform: `scaleX(${progress.toFixed(3)})` }} /></span>
    </aside>
  );
}
