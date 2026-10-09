import Link from "next/link";
import { DemoMark } from "@/components/experience";
import { viewingHref } from "@/components/leasing/unit-card";
import { TextLink } from "@/components/ui";
import { availabilityOf, formatAreaRange, formatDate, spacesFor, type ProjectEntry } from "@/content/source";
import { localePath, type SiteLocale } from "@/lib/site-data";

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

const editorialCopy = {
  now: { ro: "Disponibil acum", ru: "Доступно сейчас", en: "Available now" },
  soon: { ro: "Disponibil din", ru: "Доступно с", en: "Available from" },
  reserved: { ro: "Rezervat", ru: "Забронировано", en: "Reserved" },
  open: { ro: "Vezi obiectul", ru: "Смотреть объект", en: "View the property" },
  viewing: { ro: "Solicită o vizionare", ru: "Запросить просмотр", en: "Request a viewing" },
} as const;

/**
 * Editorial project card text (OWNER "PROJECT CARD TYPOGRAPHY FIX", 2026-10-09):
 * one left edge — name · meta on one line · headline (max two lines on desktop) ·
 * small burgundy status · what is offered · two actions set apart. No «Сейчас»
 * label, no advertising line, no bordered box. Used where `project.editorial`
 * is set (Dacia 31 for now).
 */
export function ProjectEditorial({ project, locale, nameAs: Name = "h2", nameClass }: { project: ProjectEntry; locale: SiteLocale; nameAs?: "h2" | "h3"; nameClass: string }) {
  const editorial = project.editorial!;
  const href = localePath(locale, `/projects/${project.slug}`);
  const space = spacesFor(project.slug)[0];
  const when = space ? availabilityOf(space) : null;
  const status = when ? (when.key === "soon" && when.date ? `${editorialCopy.soon[locale]} ${formatDate(when.date, locale)}` : editorialCopy[when.key][locale]) : null;
  const { place, size, status: stage } = project.card;
  return (
    <div className="pj-ed">
      <Name className={`pj-ed__name ${nameClass}`}><Link href={href}>{project.name}</Link></Name>
      <p className="pj-ed__meta">
        <span>{place[locale]}</span>
        <span>{size[locale]}</span>
        <span>{stage[locale]}</span>
      </p>
      <p className="pj-ed__headline">{editorial.headline[locale]}</p>
      {space && status ? (
        <div className="pj-ed__offer">
          <p className="pj-ed__status">{status}</p>
          <p className="pj-ed__scope">{editorial.scope[locale]} · {formatAreaRange(space.areaMin, space.area, locale)}</p>
        </div>
      ) : null}
      <div className="pj-ed__actions">
        <TextLink href={href}>{editorialCopy.open[locale]}</TextLink>
        {space ? <TextLink href={viewingHref(locale, space)}>{editorialCopy.viewing[locale]}</TextLink> : null}
      </div>
    </div>
  );
}
