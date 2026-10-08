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
