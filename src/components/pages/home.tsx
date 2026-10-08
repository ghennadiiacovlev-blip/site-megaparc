import Link from "next/link";
import type { CSSProperties } from "react";
import { AudienceRouter } from "@/components/audience-router";
import { ConceptImage, Ledger, MaskTitle, Opening } from "@/components/experience";
import { UnitCard } from "@/components/leasing/unit-card";
import { PageShell } from "@/components/page-shell";
import { ArtImage } from "@/components/primitives";
import { Button, Icon, TextLink } from "@/components/ui";
import { formatAreaRange, getProject, listProjects, listVacancies, publicSpaces, sortSpaces, spacesCount, spacesFor } from "@/content/source";
import { drochiaProfile, vatraProfile } from "@/data/demo-content";
import { CareersMoment } from "@/components/careers-moment";
import { ProjectFacts } from "@/components/project-facts";
import { eras, historyCopy } from "@/lib/history";
import { areaBands } from "@/lib/leasing";
import { brand, localePath, publicAsset, type SiteLocale } from "@/lib/site-data";

/**
 * HOME — OWNER correction 2026-10-08. The business in ten seconds:
 *   MEGAPARC · ПОКУПАЕМ. РАЗВИВАЕМ. СДАЁМ В АРЕНДУ. · one sentence ·
 *   three routes (I need a space · I want to offer a property or land · I want
 *   to know MEGAPARC) → AVAILABLE NOW → PROJECTS → DEVELOPMENT → HISTORY →
 *   VACANCIES → CONTACT.
 * Light / dark rhythm: daylight hero → white routes → warm available-now →
 * white projects → INK development → paper history → white vacancies → RED close.
 */
const copy = {
  ro: {
    scroll: "Derulează",
    heroLine: "MEGAPARC · din 2005",
    heroTitle: ["Investim în imobiliare.", "Dezvoltăm proiecte proprii.", "Închiriem spații comerciale."],
    heroLead: "MEGAPARC achiziționează imobile și terenuri, dezvoltă proiecte și creează spații comerciale pentru afaceri.",
    routesLabel: "Direcții",
    routesTitle: "Ce vă interesează?",
    routes: {
      space: ["Închiriere", "Găsiți un spațiu pentru afacerea dumneavoastră.", "Vezi spațiile libere"],
      offer: ["Propuneți un obiect sau un teren", "Trimiteți un imobil spre evaluare la MEGAPARC.", "Propune un obiect"],
      about: ["Despre companie", "Istoria, proiectele și abordarea MEGAPARC.", "Află mai multe"],
    },
    ctaSpace: "Spații libere",
    ctaOffer: "Propuneți un obiect sau un teren",
    ctaAbout: "Despre companie",
    availableLabel: "Acum se închiriază",
    availableTitle: "Spații libere în clădirile noastre.",
    availableAll: "Toate spațiile",
    quick: "Căutați după suprafață",
    projectsLabel: "Proiecte",
    projectsTitle: "Imobiliarele MEGAPARC.",
    projectsLead: "Clădiri comerciale în funcțiune, proiecte de dezvoltare și terenuri.",
    projectsAll: "Toate proiectele",
    projectsOpen: "Vezi proiectul",
    spacesHere: (n: number) => (n === 1 ? "1 spațiu liber" : `${n} spații libere`),
    devLabel: "Dezvoltare",
    devTitle: "Construim proiecte proprii. Și cumpărăm teren pentru următoarele.",
    devText: "VATRA este un proiect propriu în realizare. Drochia Gateway este un teren propriu de 2,0 ha la intrarea în oraș, cu concept în evaluare.",
    devCta: "Proiectele de dezvoltare",
    stage: "Etapă",
    site: "Teren",
    completion: "Finalizare",
    historyLabel: "Istoric",
    historyCta: "Citiți cronica",
    closeLabel: "Contact",
    closeTitle: "Spuneți-ne ce aveți nevoie.",
    closeRoutes: [["Închiriere", "/contact?subject=lease#occupier"], ["Propuneți un obiect sau un teren", "/offer"], ["Cariere", "/careers"], ["Altă întrebare", "/contact"]],
  },
  ru: {
    scroll: "Листайте",
    heroLine: "MEGAPARC · с 2005 года",
    heroTitle: ["Инвестируем в недвижимость.", "Развиваем собственные проекты.", "Сдаём коммерческие площади в аренду."],
    heroLead: "MEGAPARC приобретает недвижимость и землю, развивает проекты и формирует коммерческие пространства для бизнеса.",
    routesLabel: "Направления",
    routesTitle: "Что вас интересует?",
    routes: {
      space: ["Аренда", "Найти помещение для бизнеса.", "Смотреть свободные помещения"],
      offer: ["Предложить объект или землю", "Направить недвижимость на рассмотрение MEGAPARC.", "Предложить объект"],
      about: ["О компании", "История, проекты и подход MEGAPARC.", "Узнать больше"],
    },
    ctaSpace: "Свободные помещения",
    ctaOffer: "Предложить объект или землю",
    ctaAbout: "О компании",
    availableLabel: "Сейчас сдаётся",
    availableTitle: "Свободные помещения в наших зданиях.",
    availableAll: "Все помещения",
    quick: "Искать по площади",
    projectsLabel: "Проекты",
    projectsTitle: "Недвижимость MEGAPARC.",
    projectsLead: "Действующие коммерческие объекты, проекты развития и земельные участки.",
    projectsAll: "Все проекты",
    projectsOpen: "Открыть проект",
    spacesHere: (n: number) => (n === 1 ? "1 свободное помещение" : n < 5 ? `${n} свободных помещения` : `${n} свободных помещений`),
    devLabel: "Развитие",
    devTitle: "Строим собственные проекты. И покупаем землю для следующих.",
    devText: "VATRA уже в работе. Drochia Gateway — наш участок 2,0 га на въезде в город; концепцию сейчас оцениваем.",
    devCta: "Проекты развития",
    stage: "Стадия",
    site: "Участок",
    completion: "Завершение",
    historyLabel: "История",
    historyCta: "Читать хронику",
    closeLabel: "Контакты",
    closeTitle: "Расскажите, что вам нужно.",
    closeRoutes: [["Аренда", "/contact?subject=lease#occupier"], ["Предложить объект или землю", "/offer"], ["Вакансии", "/careers"], ["Другой вопрос", "/contact"]],
  },
  en: {
    scroll: "Scroll",
    heroLine: "MEGAPARC · since 2005",
    heroTitle: ["We invest in real estate.", "We develop our own projects.", "We lease commercial space."],
    heroLead: "MEGAPARC acquires real estate and land, develops projects and creates commercial space for business.",
    routesLabel: "Directions",
    routesTitle: "What are you looking for?",
    routes: {
      space: ["Leasing", "Find a space for your business.", "See available spaces"],
      offer: ["Offer a property or land", "Put a property forward for MEGAPARC to consider.", "Offer a property"],
      about: ["About the company", "MEGAPARC's history, projects and approach.", "Learn more"],
    },
    ctaSpace: "Available spaces",
    ctaOffer: "Offer a property or land",
    ctaAbout: "About the company",
    availableLabel: "Available now",
    availableTitle: "Free space in our buildings.",
    availableAll: "All spaces",
    quick: "Search by area",
    projectsLabel: "Projects",
    projectsTitle: "MEGAPARC real estate.",
    projectsLead: "Operating commercial properties, development projects and land.",
    projectsAll: "All projects",
    projectsOpen: "View the project",
    spacesHere: (n: number) => (n === 1 ? "1 space available" : `${n} spaces available`),
    devLabel: "Development",
    devTitle: "We build our own projects. And buy land for the next ones.",
    devText: "VATRA is our own project in delivery. Drochia Gateway is our own 2.0 ha site at the town entrance, with a concept under evaluation.",
    devCta: "Development projects",
    stage: "Stage",
    site: "Site",
    completion: "Completion",
    historyLabel: "History",
    historyCta: "Read the chronicle",
    closeLabel: "Contact",
    closeTitle: "Tell us what you need.",
    closeRoutes: [["Leasing", "/contact?subject=lease#occupier"], ["Offer a property or land", "/offer"], ["Careers", "/careers"], ["Another question", "/contact"]],
  },
} as const;

const heroFrames = ["home.hero.1", "home.hero.2", "home.hero.3"];
const ribbon = ["1991", "1995", "2005", "2020"];

export function HomePage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);
  const href = (value: string) => {
    const [pathQuery, hash] = value.split("#");
    const [path, query] = pathQuery.split("?");
    return `${p(path)}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`;
  };
  const spaces = sortSpaces(publicSpaces);
  const min = Math.min(...spaces.map((s) => s.areaMin ?? s.area));
  const max = Math.max(...spaces.map((s) => s.area));
  const range = formatAreaRange(min, max, locale);
  const projects = listProjects();
  const lead = getProject("moscova-9")!;
  const pieces = ["dacia-31", "moscova-20", "creanga-78"].map((slug) => getProject(slug)!);
  const vatra = getProject("vatra")!;
  const drochia = getProject("drochia-gateway")!;
  const vacancies = listVacancies();
  const moscova20 = getProject("moscova-20")!;

  const dacia = getProject("dacia-31")!;
  const routes = [
    { key: "space", title: c.routes.space[0], next: c.routes.space[1], cta: c.routes.space[2], href: `${p("/leasing")}#available`, media: <ArtImage media={moscova20.media!} alt={moscova20.name} sizes="(min-width: 1024px) 40vw, 100vw" /> },
    { key: "offer", title: c.routes.offer[0], next: c.routes.offer[1], cta: c.routes.offer[2], href: p("/offer"), media: <ConceptImage id="home.route.owner" locale={locale} sizes="(min-width: 1024px) 40vw, 100vw" /> },
    { key: "about", title: c.routes.about[0], next: c.routes.about[1], cta: c.routes.about[2], href: p("/about"), media: <ArtImage media={dacia.media!} alt={dacia.name} sizes="(min-width: 1024px) 40vw, 100vw" /> },
  ];

  return (
    <PageShell locale={locale} variant="overlay" experience>
      {/* 01 HERO — MEGAPARC · acquire · develop · lease */}
      <section className="xp-hero hm-hero" id="home" data-xp-hero>
        <div className="xp-hero__media" data-xp-seq data-interval="6500">
          {heroFrames.map((id, index) => (
            <div key={id} className={`xp-hero__frame${index === 0 ? " is-active" : ""}`} data-xp-frame data-defer={index > 0 ? "" : undefined}>
              <ConceptImage id={id} locale={locale} priority={index === 0} />
            </div>
          ))}
        </div>
        <div className="xp-hero__veil" aria-hidden="true" />
        <div className="xp-shell xp-hero__copy">
          <p className="xp-hero__line">{c.heroLine}</p>
          <MaskTitle as="h1" className="xp-hero__title hm-hero__title" lines={[...c.heroTitle]} />
          <p className="xp-hero__lead">{c.heroLead}</p>
          <div className="xp-actions">
            <Button href={`${p("/leasing")}#available`} variant="light">{c.ctaSpace}</Button>
            <Button href={p("/offer")} variant="ghost-light">{c.ctaOffer}</Button>
            <TextLink href={p("/about")} className="tlink--light">{c.ctaAbout}</TextLink>
          </div>
        </div>
        <div className="xp-hero__foot">
          <div className="xp-shell xp-hero__bar">
            <a className="xp-hero__cue" href="#start">{c.scroll}<Icon name="down" /></a>
            <span className="xp-hero__progress" aria-hidden="true"><i /><i /><i /></span>
            <span className="xp-hero__since">{brand.positioning[locale]}</span>
          </div>
        </div>
      </section>

      {/* 02 ROUTES — three situations + the model in one line */}
      <section className="xp-sec" id="start">
        <div className="xp-shell">
          <Opening label={c.routesLabel} title={c.routesTitle} />
          <AudienceRouter items={routes} label={c.routesTitle} />
        </div>
      </section>

      {/* 03 AVAILABLE NOW */}
      <section className="xp-sec xp-sec--warm" id="available">
        <div className="xp-shell">
          <Opening no="01" label={c.availableLabel} title={c.availableTitle} lead={`${spacesCount(spaces.length, locale)} · ${range}`} className="xp-opening--split" />
          <div className="lx-rail lx-rail--home">
            {spaces.slice(0, 4).map((space, i) => (
              <UnitCard key={space.id} space={space} locale={locale} compact priority={i === 0} />
            ))}
          </div>
          <div className="hm-quick" data-reveal>
            <span className="xp-label">{c.quick}</span>
            <ul>
              {areaBands.map((band) => (
                <li key={band.key}><Link href={`${p("/leasing")}?area=${band.key}#available`}>{band.label[locale]}</Link></li>
              ))}
            </ul>
            <Button href={`${p("/leasing")}#available`}>{c.availableAll}</Button>
          </div>
        </div>
      </section>

      {/* 04 PROJECTS */}
      <section className="xp-sec" id="projects">
        <div className="xp-shell">
          <Opening no="02" label={c.projectsLabel} title={c.projectsTitle} lead={c.projectsLead} className="xp-opening--split" />
          <Link href={p(`/projects/${lead.slug}`)} className="xp-showcase__lead" data-reveal>
            <figure className="xp-fig" style={{ "--ratio": "21 / 9" } as CSSProperties}>
              <ArtImage media={lead.media!} alt={`${lead.name} — ${lead.format[locale]}`} sizes="100vw" depth={14} />
            </figure>
            <span className="xp-showcase__caption">
              <span className="xp-showcase__name">{lead.name}</span>
              <ProjectFacts project={lead} locale={locale} />
              <span className="xp-showcase__reason">{lead.line[locale]}</span>
              <span className="xp-showcase__meta">{spacesFor(lead.slug).length ? c.spacesHere(spacesFor(lead.slug).length) : c.projectsOpen}<Icon name="arrow" /></span>
            </span>
          </Link>
          <ul className="xp-showcase">
            {pieces.map((project) => (
              <li key={project.slug} data-reveal>
                <Link href={p(`/projects/${project.slug}`)} className="xp-showcase__item">
                  <figure className="xp-fig" style={{ "--ratio": "4 / 5" } as CSSProperties}>
                    {project.media ? (
                      <ArtImage media={project.media} alt={`${project.name} — ${project.format[locale]}`} sizes="(min-width: 720px) 33vw, 100vw" depth={10} />
                    ) : (
                      <ConceptImage id="home.projects.creanga-78" locale={locale} sizes="(min-width: 720px) 33vw, 100vw" depth={10} />
                    )}
                  </figure>
                  <span className="xp-showcase__name">{project.name}</span>
                  <ProjectFacts project={project} locale={locale} />
                  <span className="xp-showcase__reason">{project.line[locale]}</span>
                  <span className="xp-showcase__meta">
                    {spacesFor(project.slug).length ? c.spacesHere(spacesFor(project.slug).length) : c.projectsOpen}
                    <Icon name="arrow" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="xp-actions xp-actions--top" data-reveal>
            <Button href={p("/projects")}>{c.projectsAll} · {String(projects.length).padStart(2, "0")}</Button>
          </div>
        </div>
      </section>

      {/* 05 DEVELOPMENT — the dark moment */}
      <section className="xp-sec xp-sec--ink" id="development">
        <div className="xp-shell">
          <Opening no="03" label={c.devLabel} title={c.devTitle} lead={c.devText} tone="dark" className="xp-opening--split" />
          <div className="xp-feature">
            <Link href={p(`/projects/${vatra.slug}`)} className="xp-piece__figure" data-reveal>
              <figure className="xp-fig" style={{ "--ratio": "16 / 10" } as CSSProperties}>
                <ArtImage media={vatra.media!} alt={`${vatra.name} — ${vatra.format[locale]}`} sizes="(min-width: 1024px) 58vw, 100vw" depth={16} position="50% 70%" />
                <figcaption>{vatra.name} · {vatra.format[locale]}</figcaption>
              </figure>
            </Link>
            <div className="xp-split__copy" data-reveal>
              <h3 className="xp-piece__name">{vatra.name}</h3>
              <Ledger locale={locale} tone="dark" className="xp-ledger--pair" items={[
                { label: c.stage, point: vatraProfile.stage },
                { label: c.site, point: vatraProfile.site },
                { label: c.completion, point: vatraProfile.completion },
                { label: drochia.name, point: drochiaProfile.site },
              ]} />
              <TextLink href={p(`/projects/${drochia.slug}`)} className="tlink--light">{drochia.name} · {drochiaProfile.status.value[locale]}</TextLink>
              <Button href={`${p("/projects")}#collection`} variant="light">{c.devCta}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 06 HISTORY — archival teaser */}
      <section className="hs-teaser" id="history">
        <div className="xp-shell hs-teaser__grid">
          <div className="hs-teaser__copy" data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">04</span><span>{c.historyLabel}</span></p>
            <h2 className="hs-teaser__title">{historyCopy.title[locale].join(" ")}</h2>
            <p className="hs-teaser__lead">{historyCopy.lead[locale]}</p>
            <ol className="hs-teaser__ribbon" aria-label={c.historyLabel}>
              {ribbon.map((year) => {
                const era = eras.find((item) => item.range.startsWith(year)) ?? eras.find((item) => item.range === year)!;
                return (
                  <li key={year} className={era.scope === "megaparc" ? "is-megaparc" : undefined}>
                    <span>{year}</span>
                    <small>{era.label[locale]}</small>
                  </li>
                );
              })}
            </ol>
            <Button href={p("/history")}>{c.historyCta}</Button>
          </div>
          <figure className="hs-teaser__figure" data-reveal>
            <picture>
              <source media="(min-width: 721px)" srcSet={publicAsset("/assets/history/era-port.webp")} />
              <img src={publicAsset("/assets/history/era-port-mobile.webp")} alt="" loading="lazy" decoding="async" />
            </picture>
          </figure>
        </div>
      </section>

      {/* 07 VACANCIES — cinematic film moment (concept footage, labelled) */}
      <CareersMoment locale={locale} variant="section" href={`${p("/careers")}#positions`} no="05" count={vacancies.length} />

      {/* 08 CONTACT — red signature */}
      <section className="xp-sec xp-sec--red" id="next">
        <div className="xp-shell xp-close">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">06</span><span>{c.closeLabel}</span></p>
            <h2 className="xp-close__title">{c.closeTitle}</h2>
          </div>
          <nav className="xp-close__routes" aria-label={c.closeLabel} data-reveal>
            {c.closeRoutes.map(([label, value]) => (
              <Link key={label} href={href(value)}>
                {label}
                <Icon name="arrow" size={18} />
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </PageShell>
  );
}
