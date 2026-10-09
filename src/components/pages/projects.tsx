import Link from "next/link";
import type { CSSProperties } from "react";
import { PageShell } from "@/components/page-shell";
import { ProjectFacts, ProjectStatus, storyLine } from "@/components/project-facts";
import { ArtImage } from "@/components/primitives";
import { Icon } from "@/components/ui";
import { getProject, kindLabel, listLand, listProjects, type ProjectEntry } from "@/content/source";
import { drochiaProfile, landTotalExact, portfolioFigures } from "@/data/demo-content";
import { locationMaps } from "@/data/location-maps";
import { localePath, publicAsset, type SiteLocale } from "@/lib/site-data";

/**
 * PROJECTS — a curated portfolio (OWNER brief "PREMIUM REAL ESTATE EXPERIENCE
 * REBUILD", 2026-10-09), not a catalogue: one feature building, three stories
 * at different scales, development as the dark chapter, land as real
 * opportunities on the map (no invented concepts). Every card follows one rule:
 * NAME / LOCATION · AREA · STATUS / one editorial line / confirmed status / CTA.
 * No filter bar, no «Сейчас» label, no numbering.
 */
const N = " ";
const copy = {
  ro: {
    label: "Proiecte",
    title: "Imobiliarele MEGAPARC.",
    lead: (area: string) => `Clădiri comerciale în funcțiune cu o suprafață totală de ${area}, proiecte de dezvoltare și terenuri — în proprietatea companiei.`,
    figOperating: "obiecte în funcțiune",
    figDevelopment: "proiecte de dezvoltare",
    figLand: "terenuri",
    figArea: "suprafața obiectelor în funcțiune",
    index: [["Obiecte în funcțiune", "#collection"], ["Dezvoltare", "#development"], ["Terenuri", "#land"]],
    spaces: "Spații libere",
    operatingKicker: "Obiecte în funcțiune",
    open: "Vezi obiectul",
    openProject: "Vezi proiectul",
    devKicker: "Dezvoltare",
    devTitle: "Proiecte proprii — de la teren la clădirea care funcționează.",
    planned: "planificat",
    landKicker: "Terenuri",
    landTitle: "Teren pentru proiectele următoare.",
    landLead: "Terenuri în proprietatea MEGAPARC. Planurile pentru fiecare teren se publică după aprobare.",
    landTotal: "Total",
    mapLabel: "Hartă: amplasarea terenului Drochia Gateway",
    closeKicker: "Pasul următor",
    closeTitle: "Alegeți pasul următor.",
    routes: [["Spații libere", "/leasing#available"], ["Parteneriat investițional", "/partnership"], ["Propuneți un obiect sau un teren", "/offer"], ["Despre MEGAPARC", "/about"]],
  },
  ru: {
    label: "Проекты",
    title: "Недвижимость MEGAPARC.",
    lead: (area: string) => `Действующие коммерческие здания общей площадью ${area}, проекты развития и${N}земля${N}— в${N}собственности компании.`,
    figOperating: "действующих объекта",
    figDevelopment: "проекта развития",
    figLand: "земли",
    figArea: "площадь действующих объектов",
    index: [["Действующие объекты", "#collection"], ["Развитие", "#development"], ["Земля", "#land"]],
    spaces: "Свободные помещения",
    operatingKicker: "Действующие объекты",
    open: "Смотреть объект",
    openProject: "Открыть проект",
    devKicker: "Развитие",
    devTitle: `Собственные проекты${N}— от${N}участка до${N}работающего здания.`,
    planned: "план",
    landKicker: "Земля",
    landTitle: `Земля для следующих проектов.`,
    landLead: `Участки в${N}собственности MEGAPARC. Планы по${N}каждому участку публикуем после утверждения.`,
    landTotal: "Всего",
    mapLabel: "Карта: расположение участка Drochia Gateway",
    closeKicker: "Следующий шаг",
    closeTitle: "Выберите следующий шаг.",
    routes: [["Свободные помещения", "/leasing#available"], ["Инвестиционное партнёрство", "/partnership"], [`Предложить объект или${N}землю`, "/offer"], ["О компании", "/about"]],
  },
  en: {
    label: "Projects",
    title: "MEGAPARC real estate.",
    lead: (area: string) => `Operating commercial buildings with a total area of ${area}, development projects and land — owned by the company.`,
    figOperating: "operating properties",
    figDevelopment: "development projects",
    figLand: "of land",
    figArea: "operating property area",
    index: [["Operating properties", "#collection"], ["Development", "#development"], ["Land", "#land"]],
    spaces: "Available spaces",
    operatingKicker: "Operating properties",
    open: "View the property",
    openProject: "View the project",
    devKicker: "Development",
    devTitle: "Our own projects — from site to a working building.",
    planned: "planned",
    landKicker: "Land",
    landTitle: "Land for the next projects.",
    landLead: "Plots owned by MEGAPARC. Plans for each plot are published once approved.",
    landTotal: "Total",
    mapLabel: "Map: where the Drochia Gateway site is",
    closeKicker: "Next step",
    closeTitle: "Choose the next step.",
    routes: [["Available spaces", "/leasing#available"], ["Investment partnership", "/partnership"], ["Offer a property or land", "/offer"], ["About MEGAPARC", "/about"]],
  },
} as const;

const plural = (n: number) => String(n).padStart(2, "0");

/** The OSM location map without the route actions — used for land, where the place is the opportunity. */
function SiteMap({ slug, name, label }: { slug: string; name: string; label: string }) {
  const data = locationMaps[slug];
  if (!data) return null;
  return (
    <div className="loc__map pj2-land__map" role="img" aria-label={label}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={publicAsset(data.src)} alt="" loading="lazy" decoding="async" />
      {data.labels.map((street) => (
        <span key={street.text} className={`loc__street${street.frontage ? " is-frontage" : ""}`} style={{ "--x": `${street.x}%`, "--y": `${street.y}%`, "--a": `${street.angle}deg` } as CSSProperties} aria-hidden="true">
          {street.text}
        </span>
      ))}
      <span className="loc__pin" aria-hidden="true" />
      <span className="loc__name" aria-hidden="true">{name}</span>
      <span className="loc__credit">© OpenStreetMap</span>
    </div>
  );
}

function StoryCard({ project, locale, variant, sizes, open }: { project: ProjectEntry; locale: SiteLocale; variant: "major" | "minor" | "flip"; sizes: string; open: string }) {
  const href = localePath(locale, `/projects/${project.slug}`);
  return (
    <article className={`pj2-story pj2-story--${variant}`} data-reveal>
      <Link href={href} className="pj2-story__media al-hover" tabIndex={-1} aria-hidden="true">
        <ArtImage media={project.media!} variant={variant === "minor" ? "portrait" : "card"} alt="" sizes={sizes} />
      </Link>
      <div className="pj2-story__copy">
        <h3 className="pj2-story__name"><Link href={href}>{project.name}</Link></h3>
        <ProjectFacts project={project} locale={locale} />
        <p className="pj2-story__line">{storyLine[project.slug][locale]}</p>
        <ProjectStatus project={project} locale={locale} />
        <Link className="pm-more" href={href}>{open}<Icon /></Link>
      </div>
    </article>
  );
}

export function ProjectsPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);
  const projects = listProjects();
  const operating = projects.filter((project) => project.kind === "operating");
  const development = projects.filter((project) => project.kind === "development");
  const feature = getProject("dacia-31")!;
  const vatra = getProject("vatra")!;
  const daciaDev = getProject("dacia-31-development")!;
  const drochia = getProject("drochia-gateway")!;
  const programme = daciaDev.programme!;
  const featureHref = p(`/projects/${feature.slug}`);

  return (
    <PageShell locale={locale} experience>
      {/* HERO — the portfolio in one statement and four figures */}
      <section className="pj2-hero">
        <div className="xp-shell pj2-hero__grid">
          <p className="pm-kicker" data-reveal>{c.label}</p>
          <h1 className="pj2-hero__title" data-reveal>{c.title}</h1>
          <p className="pj2-hero__lead" data-reveal>{c.lead(portfolioFigures.area.value[locale])}</p>
          <dl className="pj2-figs" data-reveal>
            <div><dt>{c.figOperating}</dt><dd>{plural(operating.length)}</dd></div>
            <div><dt>{c.figDevelopment}</dt><dd>{plural(development.length)}</dd></div>
            <div><dt>{c.figLand}</dt><dd>{portfolioFigures.land.value[locale]}</dd></div>
            {/* OWNER phase 2 (2026-10-09): availability is a link, not a portfolio KPI */}
            <div><dt>{c.figArea}</dt><dd>{portfolioFigures.area.value[locale]}</dd></div>
          </dl>
          <nav className="pj2-index" aria-label={c.label} data-reveal>
            {c.index.map(([label, hash]) => (
              <a key={hash} href={hash}>{label}</a>
            ))}
            <Link className="pm-link" href={`${p("/leasing")}#available`}>{c.spaces}<Icon /></Link>
          </nav>
        </div>
      </section>

      {/* FEATURE — the largest building, full bleed, the photograph left clean */}
      <section className="pj2-feature" id="collection" aria-label={c.operatingKicker}>
        <Link href={featureHref} className="pj2-feature__media al-reveal" tabIndex={-1} aria-hidden="true" data-reveal>
          <ArtImage media={feature.media!} variant="wide" alt="" sizes="100vw" priority />
        </Link>
        <div className="xp-shell pj2-feature__copy" data-reveal>
          <div>
            <p className="pm-kicker">{c.operatingKicker}</p>
            <h2 className="pj2-feature__name"><Link href={featureHref}>{feature.name}</Link></h2>
          </div>
          <div className="pj2-feature__detail">
            <ProjectFacts project={feature} locale={locale} />
            <p className="pj2-feature__line">{storyLine[feature.slug][locale]}</p>
            <ProjectStatus project={feature} locale={locale} />
            <Link className="pm-more" href={featureHref}>{c.open}<Icon /></Link>
          </div>
        </div>
      </section>

      {/* STORIES — three buildings at three scales */}
      <section className="pj2-stories" aria-label={c.operatingKicker}>
        <div className="xp-shell pj2-stories__grid">
          <StoryCard project={getProject("moscova-9")!} locale={locale} variant="major" sizes="(min-width: 1024px) 58vw, 100vw" open={c.open} />
          <StoryCard project={getProject("moscova-20")!} locale={locale} variant="minor" sizes="(min-width: 1024px) 32vw, 100vw" open={c.open} />
          <StoryCard project={getProject("creanga-78")!} locale={locale} variant="flip" sizes="(min-width: 1024px) 46vw, 100vw" open={c.open} />
        </div>
      </section>

      {/* DEVELOPMENT — the dark chapter */}
      <section className="pm-sec pm-sec--ink pj2-dev" id="development">
        <div className="xp-shell">
          <div className="pm-head pm-head--split pm-head--dark" data-reveal>
            <p className="pm-kicker">{c.devKicker}</p>
            <h2 className="pm-h2">{c.devTitle}</h2>
          </div>
          <article className="pj2-dev__main" data-reveal>
            <Link href={p(`/projects/${vatra.slug}`)} className="pj2-dev__media al-reveal" tabIndex={-1} aria-hidden="true">
              <ArtImage media={vatra.media!} variant="wide" alt="" sizes="100vw" />
            </Link>
            <div className="pj2-dev__copy">
              <h3 className="pj2-dev__name"><Link href={p(`/projects/${vatra.slug}`)}>{vatra.name}</Link></h3>
              <div className="pj2-dev__detail">
                <ProjectFacts project={vatra} locale={locale} className="pj-facts--light" />
                <p className="pj2-dev__line">{vatra.line[locale]}</p>
                <Link className="pm-more pm-more--light" href={p(`/projects/${vatra.slug}`)}>{c.openProject}<Icon /></Link>
              </div>
            </div>
          </article>
          <article className="pj2-plate" data-reveal>
            <div className="pj2-plate__figure" aria-hidden="true">
              <span className="pj2-plate__value">{programme.buildings.value[locale]} × {programme.each.value[locale]}</span>
              <span className="pj2-plate__note">{programme.total.value[locale]} · {c.planned}</span>
            </div>
            <div className="pj2-plate__copy">
              <h3 className="pj2-dev__name pj2-dev__name--sm"><Link href={p(`/projects/${daciaDev.slug}`)}>{daciaDev.name}</Link></h3>
              <ProjectFacts project={daciaDev} locale={locale} className="pj-facts--light" />
              <p className="pj2-dev__line">{daciaDev.line[locale]}</p>
              <Link className="pm-more pm-more--light" href={p(`/projects/${daciaDev.slug}`)}>{c.openProject}<Icon /></Link>
            </div>
          </article>
        </div>
      </section>

      {/* LAND — the real plots; the place itself on the map, no invented concepts */}
      <section className="pm-sec pm-sec--paper pj2-land" id="land">
        <div className="xp-shell pj2-land__grid">
          <figure className="pj2-land__figure" data-reveal>
            <SiteMap slug="drochia-gateway" name={drochia.name} label={c.mapLabel} />
          </figure>
          <div className="pj2-land__copy" data-reveal>
            <p className="pm-kicker">{c.landKicker}</p>
            <h2 className="pm-h2">{c.landTitle}</h2>
            <p className="pm-head__lead">{c.landLead}</p>
            <ul className="pj2-land__list">
              {listLand().map((plot) => (
                <li key={plot.slug}>
                  <span className="pj2-land__name">
                    {plot.project ? <Link href={p(`/projects/${plot.project}`)}>{plot.name[locale]}</Link> : plot.name[locale]}
                  </span>
                  <span className="pj2-land__area">{plot.point.value[locale]}</span>
                  <span className="pj2-land__note">{kindLabel.land[locale]}{plot.project ? ` · ${drochiaProfile.status.value[locale]}` : ""}</span>
                </li>
              ))}
              <li className="pj2-land__total">
                <span className="pj2-land__name">{c.landTotal}</span>
                <span className="pj2-land__area">{landTotalExact[locale]}</span>
              </li>
            </ul>
            <Link className="pm-link" href={p(`/projects/${drochia.slug}`)}>{drochia.name}<Icon /></Link>
          </div>
        </div>
      </section>

      {/* CLOSE — calm */}
      <section className="pm-close">
        <div className="xp-shell pm-close__grid">
          <div data-reveal>
            <p className="pm-kicker">{c.closeKicker}</p>
            <h2 className="pm-close__title">{c.closeTitle}</h2>
          </div>
          <nav className="pm-close__routes" aria-label={c.closeKicker} data-reveal>
            {c.routes.map(([label, href]) => {
              const [path, hash] = href.split("#");
              return (
                <Link key={label} href={`${p(path)}${hash ? `#${hash}` : ""}`}>
                  <span>{label}</span>
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
