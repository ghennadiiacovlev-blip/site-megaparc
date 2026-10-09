import { DemoMark } from "@/components/experience";
import type { ProjectEntry } from "@/content/source";
import type { SiteLocale } from "@/lib/site-data";

/** Place · size · status — the three facts a project card answers before the page opens (final craft pass 2026-10-08). */
export function ProjectFacts({ project, locale, className = "" }: { project: ProjectEntry; locale: SiteLocale; className?: string }) {
  const { place, size, sizeDemo, status } = project.card;
  return (
    <ul className={`pj-facts ${className}`.trim()}>
      <li>{place[locale]}</li>
      <li>
        {size[locale]}
        {sizeDemo ? <DemoMark /> : null}
      </li>
      <li>{status[locale]}</li>
    </ul>
  );
}

const nowLabel = { ro: "Acum", ru: "Сейчас", en: "Now" } as const;

/** What MEGAPARC is doing on the project now — the sixth answer of a project card (TRUST & PROOF PASS 2026-10-09). */
export function ProjectNow({ project, locale, tone, as: Tag = "p", className = "" }: { project: ProjectEntry; locale: SiteLocale; tone?: "dark"; as?: "p" | "span"; className?: string }) {
  return (
    <Tag className={`pj-now${tone === "dark" ? " pj-now--dark" : ""} ${className}`.trim()}>
      <span className="pj-now__label">{nowLabel[locale]}</span>
      <span>
        {project.now.value[locale]}
        {project.now.status === "DEMO" ? <DemoMark /> : null}
      </span>
    </Tag>
  );
}
