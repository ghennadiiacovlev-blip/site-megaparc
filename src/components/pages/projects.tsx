import Link from "next/link";
import type { CSSProperties } from "react";
import { CollectionFilter } from "@/components/collection-filter";
import { ConceptImage, DemoMark, Ledger, Opening } from "@/components/experience";
import { PageShell } from "@/components/page-shell";
import { ArtImage } from "@/components/primitives";
import { Button, Icon, TextLink } from "@/components/ui";
import { formatAreaRange, listProjects, projectTags, publicSpaces, spacesFor, type ProjectEntry } from "@/content/source";
import { drochiaProfile } from "@/data/demo-content";
import { lifecycle } from "@/lib/business";
import { localePath, type SiteLocale } from "@/lib/site-data";

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
    title: "Tot ce MEGAPARC a cumpărat, a construit și dezvoltă.",
    lead: "Clădiri în funcțiune, un proiect în realizare și un teren pentru dezvoltare. În unele dintre ele se închiriază acum spații.",
    operating: "În funcțiune",
    development: "Dezvoltare",
    land: "Teren",
    leasing: "Spații libere",
    leasingNow: (n: number) => `${n} spații se închiriază acum`,
    filter: "Filtrează proiectele",
    all: "Toate",
    tags: { operating: "În funcțiune", development: "Dezvoltare", land: "Teren", leasing: "Se închiriază", sale: "De vânzare" } as Record<string, string>,
    collectionLabel: "Colecția",
    collectionTitle: "Fiecare proiect cu rolul lui.",
    open: "Vezi proiectul",
    available: (n: number) => (n === 1 ? "1 spațiu liber" : `${n} spații libere`),
    seeSpaces: "Vezi spațiile",
    cycleLabel: "Ciclul unui proiect",
    cycleTitle: "Fiecare obiect trece prin același drum.",
    cycleNote: "Nu orice obiect este de vânzare: decizia se ia pentru fiecare în parte.",
    closeLabel: "Pasul următor",
    closeTitle: "Căutați un spațiu sau aveți un obiect de propus?",
    routes: [["Spații libere acum", "/leasing#available"], ["Propuneți un obiect sau un teren", "/offer"], ["Despre MEGAPARC", "/about"]],
  },
  ru: {
    label: "Проекты",
    title: "Всё, что MEGAPARC купила, построила и развивает.",
    lead: "Действующие здания, проект в работе и земля под развитие. В четырёх зданиях сейчас есть свободные помещения.",
    operating: "Действующие",
    development: "Развитие",
    land: "Земля",
    leasing: "Свободные помещения",
    leasingNow: (n: number) => `${n} ${n === 1 ? "помещение" : n < 5 ? "помещения" : "помещений"} сдаётся сейчас`,
    filter: "Фильтр проектов",
    all: "Все",
    tags: { operating: "Действующие", development: "Развитие", land: "Земля", leasing: "Есть в аренду", sale: "Продажа" } as Record<string, string>,
    collectionLabel: "Коллекция",
    collectionTitle: "У каждого проекта своя роль.",
    open: "Открыть проект",
    available: (n: number) => (n === 1 ? "1 свободное помещение" : n < 5 ? `${n} свободных помещения` : `${n} свободных помещений`),
    seeSpaces: "Смотреть помещения",
    cycleLabel: "Цикл проекта",
    cycleTitle: "Каждый объект проходит один и тот же путь.",
    cycleNote: "Продаётся не каждый объект — решение принимаем по каждому отдельно.",
    closeLabel: "Следующий шаг",
    closeTitle: "Ищете помещение или хотите предложить объект?",
    routes: [["Что сдаётся сейчас", "/leasing#available"], ["Предложить объект или землю", "/offer"], ["О компании", "/about"]],
  },
  en: {
    label: "Projects",
    title: "Everything MEGAPARC has bought, built and is developing.",
    lead: "Operating buildings, a project in delivery and land for development. Some of them have space to lease right now.",
    operating: "Operating",
    development: "Development",
    land: "Land",
    leasing: "Spaces available",
    leasingNow: (n: number) => `${n} ${n === 1 ? "space" : "spaces"} to lease now`,
    filter: "Filter the projects",
    all: "All",
    tags: { operating: "Operating", development: "Development", land: "Land", leasing: "Space to lease", sale: "For sale" } as Record<string, string>,
    collectionLabel: "The collection",
    collectionTitle: "Each project with its own role.",
    open: "View the project",
    available: (n: number) => (n === 1 ? "1 space available" : `${n} spaces available`),
    seeSpaces: "See the spaces",
    cycleLabel: "A project's cycle",
    cycleTitle: "Every asset follows the same path.",
    cycleNote: "Not every asset is for sale: the decision is made one by one.",
    closeLabel: "Next step",
    closeTitle: "Looking for a space, or have a property to offer?",
    routes: [["What is available now", "/leasing#available"], ["Offer a property or land", "/offer"], ["About MEGAPARC", "/about"]],
  },
} as const;

type Layout = "feature" | "split" | "compact" | "flip";
const layout: Record<string, { layout: Layout; ratio: string }> = {
  "moscova-9": { layout: "feature", ratio: "21 / 9" },
  "dacia-31": { layout: "split", ratio: "4 / 5" },
  "moscova-20": { layout: "compact", ratio: "3 / 4" },
  "creanga-78": { layout: "flip", ratio: "4 / 5" },
  vatra: { layout: "split", ratio: "16 / 10" },
  "drochia-gateway": { layout: "flip", ratio: "4 / 5" },
};

function ProjectFigure({ project, locale, sizes, priority = false }: { project: ProjectEntry; locale: SiteLocale; sizes: string; priority?: boolean }) {
  if (project.media) return <ArtImage media={project.media} alt={`${project.name} — ${project.format[locale]}`} sizes={sizes} depth={14} priority={priority} position={project.slug === "vatra" ? "50% 70%" : undefined} />;
  return <ConceptImage id={project.conceptUse!} locale={locale} sizes={sizes} depth={14} />;
}

export function ProjectsPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);
  const projects = listProjects();
  const count = (tag: string) => projects.filter((project) => projectTags(project).includes(tag)).length;
  const filterKeys = ["operating", "development", "land", "leasing", ...(count("sale") ? ["sale"] : [])];

  return (
    <PageShell locale={locale} experience>
      {/* HERO */}
      <section className="xp-pagehero">
        <div className="xp-shell xp-pagehero__grid">
          <p className="xp-eyebrow" data-reveal><span className="xp-eyebrow__no">01</span><span>{c.label}</span></p>
          <div data-reveal>
            <h1 className="xp-pagehero__title">{c.title}</h1>
            <p className="xp-pagehero__lead xp-pagehero__lead--gap">{c.lead}</p>
          </div>
          <div className="xp-pagehero__aside" data-reveal>
            <Ledger locale={locale} className="xp-ledger--pair" items={[
              { label: c.operating, value: String(count("operating")).padStart(2, "0") },
              { label: c.development, value: String(count("development")).padStart(2, "0") },
              { label: c.land, point: drochiaProfile.site },
              { label: c.leasing, value: String(publicSpaces.length).padStart(2, "0") },
            ]} />
            <div className="xp-actions">
              <Button href={`${p("/leasing")}#available`}>{c.leasingNow(publicSpaces.length)}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="xp-sec" id="collection">
        <div className="xp-shell">
          <Opening no="02" label={c.collectionLabel} title={c.collectionTitle} />
          <CollectionFilter label={c.filter} options={[{ key: "all", label: c.all, count: projects.length }, ...filterKeys.map((key) => ({ key, label: c.tags[key], count: count(key) }))]}>
            <div className="xp-collection">
              {projects.map((project, index) => {
                const { layout: kind, ratio } = layout[project.slug];
                const href = p(`/projects/${project.slug}`);
                const own = spacesFor(project.slug);
                return (
                  <article key={project.slug} className={`xp-piece xp-piece--${kind}`} data-category={projectTags(project).join(" ")}>
                    <Link href={href} className="xp-piece__figure" aria-label={`${project.name} — ${c.open}`} data-reveal>
                      <figure className="xp-fig" style={{ "--ratio": ratio } as CSSProperties}>
                        <ProjectFigure project={project} locale={locale} sizes={kind === "feature" ? "100vw" : "(min-width: 1024px) 55vw, 100vw"} priority={index === 0} />
                      </figure>
                    </Link>
                    <div className="xp-piece__copy" data-reveal>
                      <p className="xp-eyebrow"><span>{project.district[locale]} · {project.format[locale]}{project.formatDemo ? <DemoMark /> : null}</span></p>
                      <h2 className="xp-piece__name"><Link href={href}>{project.name}</Link></h2>
                      <ul className="pj-tags">
                        {projectTags(project).map((tag) => (
                          <li key={tag} className={`pj-tag pj-tag--${tag}`}>{c.tags[tag]}</li>
                        ))}
                      </ul>
                      <p className="xp-piece__reason">{project.line[locale]}</p>
                      <Ledger locale={locale} items={project.facts.map((fact) => ({ label: fact.label[locale], point: fact.point }))} />
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

      {/* LIFECYCLE */}
      <section className="xp-sec xp-sec--warm">
        <div className="xp-shell">
          <Opening no="03" label={c.cycleLabel} title={c.cycleTitle} lead={c.cycleNote} className="xp-opening--split" />
          <ol className="xp-progress xp-progress--six" data-xp-progress>
            {lifecycle.map((stage) => (
              <li key={stage.key} className="xp-progress__term" data-xp-term>
                <span className="xp-progress__title">{stage.title[locale]}</span>
                <span className="xp-progress__text">{stage.short[locale]}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CLOSE */}
      <section className="xp-sec xp-sec--stone">
        <div className="xp-shell xp-close">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">04</span><span>{c.closeLabel}</span></p>
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
