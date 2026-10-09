import Link from "next/link";
import type { CSSProperties } from "react";
import { DirectionsLine } from "@/components/business-stage";
import { CollectionFilter } from "@/components/collection-filter";
import { ConceptImage, DemoMark, HeroFigures, Opening } from "@/components/experience";
import { PageShell } from "@/components/page-shell";
import { ProjectFacts, ProjectNow } from "@/components/project-facts";
import { ArtImage } from "@/components/primitives";
import { Button, Icon, TextLink } from "@/components/ui";
import { formatAreaRange, listProjects, projectTags, publicSpaces, spacesFor, type ProjectEntry } from "@/content/source";
import { brand, localePath, type SiteLocale } from "@/lib/site-data";

/**
 * PROJECTS — the real-estate universe of MEGAPARC (OWNER correction
 * 2026-10-08: PORTFOLIO is renamed PROJECTS). Visual and architectural, not a
 * financial database: operating property, development, land; the spaces that
 * can be leased now are surfaced on each project. Filters: all · operating ·
 * development · land · available to lease (· for sale, only when a project
 * carries the CMS "for sale" flag — none does today).
 */
const copy = {
  ro: {
    label: "Proiecte",
    title: "Imobiliarele MEGAPARC.",
    lead: "Clădiri comerciale în funcțiune, proiecte de dezvoltare și terenuri.",
    figOperating: "Clădiri în funcțiune",
    figDevelopment: "Proiect de dezvoltare",
    figLand: "Teren pentru dezvoltare",
    figSpaces: "Spații libere",
    seeAll: "Vezi spațiile libere",
    operating: "În funcțiune",
    development: "Dezvoltare",
    land: "Teren",
    leasing: "Spații libere",
    leasingNow: (n: number) => `${n} spații se închiriază acum`,
    filter: "Filtrează proiectele",
    all: "Toate",
    tags: { operating: "În funcțiune", development: "Dezvoltare", land: "Teren", leasing: "Se închiriază", sale: "De vânzare" } as Record<string, string>,
    collectionLabel: "Colecția",
    collectionTitle: "Clădiri în funcțiune, proiecte în lucru și teren.",
    open: "Vezi proiectul",
    available: (n: number) => (n === 1 ? "1 spațiu liber" : `${n} spații libere`),
    seeSpaces: "Vezi spațiile",
    cycleLabel: "Direcții",
    cycleTitle: "Cum lucrăm cu fiecare obiect.",
    closeLabel: "Pasul următor",
    closeTitle: "Alegeți pasul următor.",
    routes: [["Spații libere acum", "/leasing#available"], ["Parteneriat investițional", "/partnership"], ["Propuneți un obiect sau un teren", "/offer"], ["Despre MEGAPARC", "/about"]],
  },
  ru: {
    label: "Проекты",
    title: "Недвижимость MEGAPARC.",
    lead: "Действующие коммерческие объекты, проекты развития и земельные участки.",
    figOperating: "Действующие объекты",
    figDevelopment: "Проект развития",
    figLand: "Земля под развитие",
    figSpaces: "Свободных помещений",
    seeAll: "Смотреть свободные помещения",
    operating: "Действующие",
    development: "Развитие",
    land: "Земля",
    leasing: "Свободные помещения",
    leasingNow: (n: number) => `${n} ${n === 1 ? "помещение" : n < 5 ? "помещения" : "помещений"} сдаётся сейчас`,
    filter: "Фильтр проектов",
    all: "Все",
    tags: { operating: "Действующие", development: "Развитие", land: "Земля", leasing: "Есть в аренду", sale: "Продажа" } as Record<string, string>,
    collectionLabel: "Коллекция",
    collectionTitle: `Действующие здания, проекты в работе и земля.`,
    open: "Открыть проект",
    available: (n: number) => (n === 1 ? "1 свободное помещение" : n < 5 ? `${n} свободных помещения` : `${n} свободных помещений`),
    seeSpaces: "Смотреть помещения",
    cycleLabel: "Направления",
    cycleTitle: `Как мы работаем с каждым объектом.`,
    closeLabel: "Следующий шаг",
    closeTitle: "Выберите следующий шаг.",
    routes: [["Что сдаётся сейчас", "/leasing#available"], ["Инвестиционное партнёрство", "/partnership"], ["Предложить объект или землю", "/offer"], ["О компании", "/about"]],
  },
  en: {
    label: "Projects",
    title: "MEGAPARC real estate.",
    lead: "Operating commercial properties, development projects and land.",
    figOperating: "Operating properties",
    figDevelopment: "Development project",
    figLand: "Land for development",
    figSpaces: "Available spaces",
    seeAll: "See the available spaces",
    operating: "Operating",
    development: "Development",
    land: "Land",
    leasing: "Spaces available",
    leasingNow: (n: number) => `${n} ${n === 1 ? "space" : "spaces"} to lease now`,
    filter: "Filter the projects",
    all: "All",
    tags: { operating: "Operating", development: "Development", land: "Land", leasing: "Space to lease", sale: "For sale" } as Record<string, string>,
    collectionLabel: "The collection",
    collectionTitle: "Operating buildings, projects under way and land.",
    open: "View the project",
    available: (n: number) => (n === 1 ? "1 space available" : `${n} spaces available`),
    seeSpaces: "See the spaces",
    cycleLabel: "Directions",
    cycleTitle: "How we work with every property.",
    closeLabel: "Next step",
    closeTitle: "Choose the next step.",
    routes: [["What is available now", "/leasing#available"], ["Investment partnership", "/partnership"], ["Offer a property or land", "/offer"], ["About MEGAPARC", "/about"]],
  },
} as const;

type Layout = "feature" | "split" | "compact" | "flip" | "wide";
const layout: Record<string, { layout: Layout; ratio: string }> = {
  "moscova-9": { layout: "feature", ratio: "21 / 9" },
  "dacia-31": { layout: "split", ratio: "4 / 5" },
  "moscova-20": { layout: "compact", ratio: "3 / 4" },
  "creanga-78": { layout: "flip", ratio: "4 / 5" },
  vatra: { layout: "wide", ratio: "21 / 8" },
  "drochia-gateway": { layout: "flip", ratio: "4 / 5" },
};

function ProjectFigure({ project, locale, sizes, priority = false }: { project: ProjectEntry; locale: SiteLocale; sizes: string; priority?: boolean }) {
  if (project.media) return <ArtImage media={project.media} alt={`${project.name} — ${project.format[locale]}`} sizes={sizes} depth={14} priority={priority} position={project.slug === "vatra" ? "50% 70%" : undefined} />;
  return <ConceptImage id={project.conceptUse!} locale={locale} sizes={sizes} depth={14} />;
}

export function ProjectsPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);
  const projects = listProjects();
  const count = (tag: string) => projects.filter((project) => projectTags(project).includes(tag)).length;
  const drochiaProject = projects.find((project) => project.slug === "drochia-gateway")!;
  const filterKeys = ["operating", "development", "land", "leasing", ...(count("sale") ? ["sale"] : [])];

  return (
    <PageShell locale={locale} experience>
      {/* HERO — statement + figures */}
      <section className="xp-pagehero xp-sh">
        <div className="xp-shell xp-sh__grid">
          <p className="xp-eyebrow xp-sh__eyebrow" data-reveal><span className="xp-eyebrow__no">{brand.name}</span><span>{c.label}</span></p>
          <h1 className="xp-display-title xp-sh__title" data-reveal>{c.title}</h1>
          <p className="xp-pagehero__lead xp-sh__lead" data-reveal>{c.lead}</p>
          <div className="xp-sh__aside" data-reveal>
            <HeroFigures className="xp-figures--caps xp-figures--four" items={[
              { value: String(count("operating")).padStart(2, "0"), label: c.figOperating },
              { value: String(count("development")).padStart(2, "0"), label: c.figDevelopment },
              { value: drochiaProject.card.size[locale], label: c.figLand },
              { value: String(publicSpaces.length).padStart(2, "0"), label: c.figSpaces },
            ]} />
            <div className="xp-actions">
              <Button href={`${p("/leasing")}#available`}>{c.seeAll}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="xp-sec" id="collection">
        <div className="xp-shell">
          <Opening no="01" label={c.collectionLabel} title={c.collectionTitle} />
          <CollectionFilter label={c.filter} options={[{ key: "all", label: c.all, count: projects.length }, ...filterKeys.map((key) => ({ key, label: c.tags[key], count: count(key) }))]}>
            <div className="xp-collection">
              {projects.map((project, index) => {
                const { layout: kind, ratio } = layout[project.slug];
                const href = p(`/projects/${project.slug}`);
                const own = spacesFor(project.slug);
                return (
                  <article key={project.slug} className={`xp-piece xp-piece--${kind}`} data-category={projectTags(project).join(" ")}>
                    <Link href={href} className="xp-piece__figure al-reveal al-hover" aria-label={`${project.name} — ${c.open}`} data-reveal>
                      <figure className="xp-fig" style={{ "--ratio": ratio } as CSSProperties}>
                        <ProjectFigure project={project} locale={locale} sizes={kind === "feature" || kind === "wide" ? "100vw" : "(min-width: 1024px) 55vw, 100vw"} priority={index === 0} />
                        <span className="al-hover__line" aria-hidden="true">
                          <span>{project.name}</span>
                          <span>{project.card.place[locale]} · {project.card.status[locale]}{own.length ? ` · ${c.available(own.length)}` : ""}</span>
                        </span>
                      </figure>
                    </Link>
                    <div className="xp-piece__copy" data-reveal>
                      <p className="xp-eyebrow"><span>{project.kind === "operating" ? `${project.district[locale]} · ` : ""}{project.format[locale]}{project.formatDemo ? <DemoMark /> : null}</span></p>
                      <h2 className="xp-piece__name"><Link href={href}>{project.name}</Link></h2>
                      <ProjectFacts project={project} locale={locale} />
                      {project.forSale ? (
                        <ul className="pj-tags">
                          <li className="pj-tag pj-tag--sale">{c.tags.sale}</li>
                        </ul>
                      ) : null}
                      <p className="xp-piece__reason">{project.line[locale]}</p>
                      <ProjectNow project={project} locale={locale} />
                      {own.length ? (
                        <Link className="pj-available" href={`${p("/leasing")}?project=${project.slug}#available`}>
                          <span className="pj-available__dot" aria-hidden="true" />
                          <span>{c.available(own.length)} · {own.map((s) => formatAreaRange(s.areaMin, s.area, locale)).join(" · ")}{own.some((s) => s.dataStatus === "DEMO") ? <DemoMark /> : null}</span>
                          <Icon />
                        </Link>
                      ) : null}
                      <div className="xp-actions">
                        <Button href={href}>{c.open}</Button>
                        {own.length ? <TextLink href={`${p("/leasing")}?project=${project.slug}#available`}>{c.seeSpaces}</TextLink> : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </CollectionFilter>
        </div>
      </section>

      {/* DIRECTIONS — the three directions behind every project (OWNER brief 2026-10-08) */}
      <section className="xp-sec xp-sec--warm">
        <div className="xp-shell">
          <Opening no="02" label={c.cycleLabel} title={c.cycleTitle} />
          <DirectionsLine locale={locale} />
        </div>
      </section>

      {/* CLOSE */}
      <section className="xp-sec xp-sec--stone">
        <div className="xp-shell xp-close">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">03</span><span>{c.closeLabel}</span></p>
            <h2 className="xp-close__title">{c.closeTitle}</h2>
          </div>
          <nav className="xp-close__routes" aria-label={c.closeLabel} data-reveal>
            {c.routes.map(([label, href]) => {
              const [path, hash] = href.split("#");
              return (
                <Link key={label} href={`${p(path)}${hash ? `#${hash}` : ""}`}>
                  {label}
                  <Icon name="arrow" size={18} />
                </Link>
              );
            })}
          </nav>
        </div>
      </section>
    </PageShell>
  );
}
