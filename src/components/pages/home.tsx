import Link from "next/link";
import type { CSSProperties } from "react";
import { AudienceRouter } from "@/components/audience-router";
import { DirectionTiles } from "@/components/business-stage";
import { ConceptImage, HeroFigures, Ledger, MaskTitle, Opening } from "@/components/experience";
import { UnitCard } from "@/components/leasing/unit-card";
import { PageShell } from "@/components/page-shell";
import { ArtImage } from "@/components/primitives";
import { Button, Icon, TextLink } from "@/components/ui";
import { formatAreaRange, getProject, listProjects, listVacancies, publicSpaces, sortSpaces, spacesCount, spacesFor } from "@/content/source";
import { drochiaProfile, portfolioFigures, vatraProfile } from "@/data/demo-content";
import { CareersMoment } from "@/components/careers-moment";
import { ProjectFacts, ProjectNow } from "@/components/project-facts";
import { eras, historyCopy } from "@/lib/history";
import { areaBands } from "@/lib/leasing";
import { brand, localePath, publicAsset, type Localized, type SiteLocale } from "@/lib/site-data";

/**
 * HOME — the trust journey (OWNER briefs 2026-10-08: "MAKE THE WEBSITE FEEL
 * ALIVE", "BUSINESS MODEL + PREMIUM COLOR SYSTEM RESET", "TRUST, SCALE &
 * DESIRE"):
 *   IMPACT (cinematic hero of real MEGAPARC property, two destinations:
 *   investment partnership · leasing) → proof straight after the promise
 *   ("TRUST & PROOF PASS" 2026-10-09): REAL PROJECTS → REAL AVAILABLE SPACE →
 *   DEVELOPMENT → HISTORY → PARTNERSHIP (figures + discuss an opportunity) →
 *   HOW MEGAPARC WORKS (three directions) → CAREERS (film) → CHOOSE A PATH →
 *   ACT (burgundy close with the four specific actions).
 * Rhythm: image → warm → light → INK → paper → full-bleed → light → film →
 * light → burgundy.
 */
const N = " ";
const copy = {
  ro: {
    scroll: "Derulează",
    heroLine: "MEGAPARC · din 2005",
    heroTitle: ["Imobiliare comerciale —", "de la investiție", "la obiectul care funcționează."],
    heroLead: "MEGAPARC investește în imobiliare și terenuri, dezvoltă proiecte proprii și închiriază spații în clădirile sale — cu peste trei decenii de experiență antreprenorială a grupului în spate.",
    ctaPartner: "Parteneriat investițional",
    ctaSpace: "Spații libere",
    ctaOffer: "Propuneți un obiect sau un teren",
    dirLabel: "Direcții",
    dirTitle: "Cum lucrează MEGAPARC cu imobilele.",
    dirLinks: { investment: "Parteneriat investițional", development: "Proiectele de dezvoltare", leasing: "Spații libere" },
    routesLabel: "Pasul următor",
    routesTitle: "Ce vă interesează?",
    routes: {
      space: ["Închiriere", "Spații libere în obiectele MEGAPARC.", "Vezi spațiile libere"],
      partner: ["Parteneriat investițional", "Proiecte pe care le putem discuta împreună.", "Discutăm o oportunitate"],
      offer: ["Propuneți un obiect sau un teren", "Trimiteți un imobil spre evaluare la MEGAPARC.", "Trimiteți informațiile"],
    },
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
    proofLabel: "Parteneriat investițional",
    proofCta: "Discutăm o oportunitate",
    proofCase: "Studiu de caz · Moscova 9",
    proofTitle: "Experiență confirmată de obiecte.",
    proof: { years: "ani de experiență a grupului", founded: "este fondată MEGAPARC", operating: "obiecte în funcțiune", gla: "suprafață închiriabilă", land: "teren pentru dezvoltare" },
    historyLabel: "Istoric",
    historyCta: "Citiți cronica",
    closeLabel: "Contact",
    closeTitle: "Spuneți-ne ce aveți nevoie.",
    closeRoutes: [["Solicită o vizionare", "/contact?subject=lease#occupier"], ["Discutăm o oportunitate", "/contact?subject=partnership#partnership"], ["Propuneți un obiect sau un teren", "/offer"], ["Vezi posturile", "/careers#positions"], ["Întrebare generală", "/contact#question"]],
  },
  ru: {
    scroll: "Листайте",
    heroLine: "MEGAPARC · с 2005 года",
    heroTitle: ["Коммерческая недвижимость —", "от инвестиции", "до работающего объекта."],
    heroLead: `MEGAPARC инвестирует в${N}недвижимость и${N}землю, ведёт девелопмент собственных проектов и${N}сдаёт площади в${N}своих зданиях. За${N}компанией — более трёх десятилетий предпринимательского опыта группы.`,
    ctaPartner: "Инвестиционное партнёрство",
    ctaSpace: "Свободные помещения",
    ctaOffer: `Предложить объект или${N}землю`,
    dirLabel: "Направления",
    dirTitle: `Как MEGAPARC работает с${N}недвижимостью.`,
    dirLinks: { investment: "Инвестиционное партнёрство", development: "Проекты развития", leasing: "Свободные помещения" },
    routesLabel: "Следующий шаг",
    routesTitle: "Что вас интересует?",
    routes: {
      space: ["Аренда", `Свободные помещения в${N}объектах MEGAPARC.`, "Смотреть свободные помещения"],
      partner: ["Инвестиционное партнёрство", `Проекты, которые можно обсудить вместе с${N}MEGAPARC.`, "Обсудить возможность"],
      offer: [`Предложить объект или${N}землю`, `Направить недвижимость на${N}рассмотрение MEGAPARC.`, "Отправить информацию"],
    },
    availableLabel: "Сейчас сдаётся",
    availableTitle: `Свободные помещения в${N}наших зданиях.`,
    availableAll: "Все помещения",
    quick: "Искать по площади",
    projectsLabel: "Проекты",
    projectsTitle: "Недвижимость MEGAPARC.",
    projectsLead: `Действующие коммерческие объекты, проекты развития и земельные участки.`,
    projectsAll: "Все проекты",
    projectsOpen: "Открыть проект",
    spacesHere: (n: number) => (n === 1 ? "1 свободное помещение" : n < 5 ? `${n} свободных помещения` : `${n} свободных помещений`),
    devLabel: "Развитие",
    devTitle: `Строим собственные проекты. И${N}покупаем землю для следующих.`,
    devText: `VATRA уже в${N}работе. Drochia Gateway — наш участок 2,0${N}га на${N}въезде в${N}город; концепцию сейчас оцениваем.`,
    devCta: "Проекты развития",
    stage: "Стадия",
    site: "Участок",
    completion: "Завершение",
    proofLabel: "Инвестиционное партнёрство",
    proofCta: "Обсудить возможность",
    proofCase: "Кейс · Moscova 9",
    proofTitle: "Опыт, подтверждённый объектами.",
    proof: { years: "лет опыта группы", founded: "основана MEGAPARC", operating: "действующих объекта", gla: "арендуемая площадь", land: "земли под развитие" },
    historyLabel: "История",
    historyCta: "Читать хронику",
    closeLabel: "Контакты",
    closeTitle: "Расскажите, что вам нужно.",
    closeRoutes: [["Запросить просмотр", "/contact?subject=lease#occupier"], ["Обсудить возможность", "/contact?subject=partnership#partnership"], [`Предложить объект или${N}землю`, "/offer"], ["Смотреть вакансии", "/careers#positions"], ["Общий вопрос", "/contact#question"]],
  },
  en: {
    scroll: "Scroll",
    heroLine: "MEGAPARC · since 2005",
    heroTitle: ["Commercial real estate —", "from investment", "to a working property."],
    heroLead: "MEGAPARC invests in real estate and land, develops its own projects and leases space in its own buildings — backed by more than three decades of the group's entrepreneurial experience.",
    ctaPartner: "Investment partnership",
    ctaSpace: "Available spaces",
    ctaOffer: "Offer a property or land",
    dirLabel: "Directions",
    dirTitle: "How MEGAPARC works with real estate.",
    dirLinks: { investment: "Investment partnership", development: "Development projects", leasing: "Available spaces" },
    routesLabel: "Next step",
    routesTitle: "What are you looking for?",
    routes: {
      space: ["Leasing", "Available space in MEGAPARC properties.", "See available spaces"],
      partner: ["Investment partnership", "Projects we can discuss together.", "Discuss an opportunity"],
      offer: ["Offer a property or land", "Put a property forward for MEGAPARC to consider.", "Send the details"],
    },
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
    proofLabel: "Investment partnership",
    proofCta: "Discuss an opportunity",
    proofCase: "Case study · Moscova 9",
    proofTitle: "Experience proven by property.",
    proof: { years: "years of the group's experience", founded: "MEGAPARC founded", operating: "operating properties", gla: "lettable area", land: "development land" },
    historyLabel: "History",
    historyCta: "Read the chronicle",
    closeLabel: "Contact",
    closeTitle: "Tell us what you need.",
    closeRoutes: [["Request a viewing", "/contact?subject=lease#occupier"], ["Discuss an opportunity", "/contact?subject=partnership#partnership"], ["Offer a property or land", "/offer"], ["See vacancies", "/careers#positions"], ["General question", "/contact#question"]],
  },
} as const;

/** Hero: three real MEGAPARC scenes — an operating street-front property, a site in work, an office building in its city. */
const heroScenes: { slug: string; position?: string; caption: Localized }[] = [
  { slug: "moscova-9", position: "50% 60%", caption: { ro: "Moscova 9 · Chișinău · obiect în funcțiune", ru: "Moscova 9 · Кишинёв · действующий объект", en: "Moscova 9 · Chișinău · operating property" } },
  { slug: "vatra", position: "50% 68%", caption: { ro: "VATRA · proiect propriu în lucru", ru: "VATRA · собственный проект в работе", en: "VATRA · our own project, under way" } },
  { slug: "dacia-31", position: "50% 55%", caption: { ro: "Dacia 31 · Chișinău · clădire de birouri", ru: "Dacia 31 · Кишинёв · офисное здание", en: "Dacia 31 · Chișinău · office building" } },
];
const ribbon = ["1991", "1995", "2005", "2020"];
const groupYears = Math.floor((2026 - 1991) / 5) * 5;

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
  const lead = getProject("dacia-31")!;
  const pieces = ["moscova-9", "moscova-20", "creanga-78"].map((slug) => getProject(slug)!);
  const vatra = getProject("vatra")!;
  const drochia = getProject("drochia-gateway")!;
  const vacancies = listVacancies();
  const moscova20 = getProject("moscova-20")!;
  const routes = [
    { key: "space", title: c.routes.space[0], next: c.routes.space[1], cta: c.routes.space[2], href: `${p("/leasing")}#available`, media: <ArtImage media={moscova20.media!} alt={moscova20.name} sizes="(min-width: 1024px) 40vw, 100vw" position="50% 74%" /> },
    { key: "partner", title: c.routes.partner[0], next: c.routes.partner[1], cta: c.routes.partner[2], href: href("/contact?subject=partnership#partnership"), media: <ConceptImage id="home.route.partner" locale={locale} sizes="(min-width: 1024px) 40vw, 100vw" /> },
    { key: "offer", title: c.routes.offer[0], next: c.routes.offer[1], cta: c.routes.offer[2], href: p("/offer"), media: <ConceptImage id="home.route.owner" locale={locale} sizes="(min-width: 1024px) 40vw, 100vw" /> },
  ];

  return (
    <PageShell locale={locale} variant="overlay" experience>
      {/* HERO — real MEGAPARC property in a slow cinematic sequence; two destinations */}
      <section className="xp-hero hm-hero" id="home" data-xp-hero>
        <div className="xp-hero__media" data-xp-seq data-interval="6500">
          {heroScenes.map((scene, index) => {
            const project = getProject(scene.slug)!;
            return (
              <div key={scene.slug} className={`xp-hero__frame${index === 0 ? " is-active" : ""}`} data-xp-frame data-defer={index > 0 ? "" : undefined}>
                <ArtImage media={project.media!} alt={`${project.name} — ${project.format[locale]}`} priority={index === 0} position={scene.position} />
              </div>
            );
          })}
        </div>
        <div className="xp-hero__veil" aria-hidden="true" />
        <div className="xp-shell xp-hero__copy">
          <p className="xp-hero__line">{c.heroLine}</p>
          <MaskTitle as="h1" className="xp-hero__title hm-hero__title" lines={[...c.heroTitle]} />
          <p className="xp-hero__lead">{c.heroLead}</p>
          <div className="xp-actions">
            <Button href={p("/partnership")} variant="light">{c.ctaPartner}</Button>
            <Button href={`${p("/leasing")}#available`} variant="ghost-light">{c.ctaSpace}</Button>
            <TextLink href={p("/offer")} className="tlink--light">{c.ctaOffer}</TextLink>
          </div>
        </div>
        <div className="xp-hero__foot">
          <div className="xp-shell xp-hero__bar">
            <a className="xp-hero__cue" href="#projects">{c.scroll}<Icon name="down" /></a>
            <span className="hm-hero__captions" aria-hidden="true">
              {heroScenes.map((scene) => (
                <span key={scene.slug} className="hm-hero__cap">{scene.caption[locale]}</span>
              ))}
            </span>
            <span className="xp-hero__since">{brand.positioning[locale]}</span>
          </div>
        </div>
      </section>

      {/* 01 REAL PROJECTS — the promise proven at once */}
      <section className="xp-sec xp-sec--warm" id="projects">
        <div className="xp-shell">
          <Opening no="01" label={c.projectsLabel} title={c.projectsTitle} lead={c.projectsLead} className="xp-opening--split" />
          <Link href={p(`/projects/${lead.slug}`)} className="xp-showcase__lead al-reveal" data-reveal>
            <figure className="xp-fig" style={{ "--ratio": "21 / 9" } as CSSProperties}>
              <ArtImage media={lead.media!} alt={`${lead.name} — ${lead.format[locale]}`} sizes="100vw" depth={14} />
            </figure>
            <span className="xp-showcase__caption">
              <span className="xp-showcase__name">{lead.name}</span>
              <ProjectFacts project={lead} locale={locale} />
              <span className="xp-showcase__reason">{lead.line[locale]}</span>
              <ProjectNow project={lead} locale={locale} as="span" />
              <span className="xp-showcase__meta">{spacesFor(lead.slug).length ? c.spacesHere(spacesFor(lead.slug).length) : c.projectsOpen}<Icon name="arrow" /></span>
            </span>
          </Link>
          <ul className="xp-showcase">
            {pieces.map((project) => (
              <li key={project.slug} data-reveal>
                <Link href={p(`/projects/${project.slug}`)} className="xp-showcase__item">
                  <figure className="xp-fig" style={{ "--ratio": "4 / 5" } as CSSProperties}>
                    {project.media ? (
                      <ArtImage media={project.media} alt={`${project.name} — ${project.format[locale]}`} sizes="(min-width: 720px) 33vw, 100vw" depth={10} position={project.slug === "moscova-20" ? "50% 74%" : undefined} />
                    ) : (
                      <ConceptImage id="home.projects.creanga-78" locale={locale} sizes="(min-width: 720px) 33vw, 100vw" depth={10} />
                    )}
                  </figure>
                  <span className="xp-showcase__name">{project.name}</span>
                  <ProjectFacts project={project} locale={locale} />
                  <span className="xp-showcase__reason">{project.line[locale]}</span>
                  <ProjectNow project={project} locale={locale} as="span" />
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

      {/* 02 REAL AVAILABLE SPACE */}
      <section className="xp-sec" id="available">
        <div className="xp-shell">
          <Opening no="02" label={c.availableLabel} title={c.availableTitle} lead={`${spacesCount(spaces.length, locale)} · ${range}`} className="xp-opening--split" />
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

      {/* 03 DEVELOPMENT — the dark signature moment */}
      <section className="xp-sec xp-sec--ink" id="development">
        <div className="xp-shell">
          <Opening no="03" label={c.devLabel} title={c.devTitle} lead={c.devText} tone="dark" className="xp-opening--split" />
          <div className="xp-feature">
            <Link href={p(`/projects/${vatra.slug}`)} className="xp-piece__figure al-reveal" data-reveal>
              <figure className="xp-fig" style={{ "--ratio": "16 / 10" } as CSSProperties}>
                <ArtImage media={vatra.media!} alt={`${vatra.name} — ${vatra.format[locale]}`} sizes="(min-width: 1024px) 58vw, 100vw" depth={16} position="50% 70%" />
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
              <div className="xp-actions">
                <Button href={`${p("/projects")}#collection`} variant="light">{c.devCta}</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 HISTORY — archival teaser */}
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
          <figure className="hs-teaser__figure al-reveal" data-reveal>
            <picture>
              <source media="(min-width: 721px)" srcSet={publicAsset("/assets/history/era-port.webp")} />
              <img src={publicAsset("/assets/history/era-port-mobile.webp")} alt="" loading="lazy" decoding="async" />
            </picture>
          </figure>
        </div>
      </section>

      {/* 05 PARTNERSHIP — figures over a full-bleed scene, then the investor action */}
      <section className="hm-proof" id="proof">
        <figure className="hm-proof__media" aria-hidden="true">
          <ConceptImage id="home.proof" locale={locale} sizes="100vw" />
        </figure>
        <div className="xp-shell hm-proof__copy">
          <p className="xp-eyebrow" data-reveal><span className="xp-eyebrow__no">05</span><span>{c.proofLabel}</span></p>
          <h2 className="hm-proof__title" data-reveal>{c.proofTitle}</h2>
          <div data-reveal>
            <HeroFigures className="hm-proof__figures" items={[
              { value: `${groupYears}+`, label: c.proof.years },
              { value: "2005", label: c.proof.founded },
              { value: portfolioFigures.operating.value[locale], label: c.proof.operating },
              { value: portfolioFigures.gla.value[locale], label: c.proof.gla },
              { value: locale === "en" ? "2.0 ha" : `2,0${N}${locale === "ru" ? "га" : "ha"}`, label: c.proof.land },
            ]} />
          </div>
          <div className="xp-actions" data-reveal>
            <Button href={href("/contact?subject=partnership#partnership")} variant="light">{c.proofCta}</Button>
            <TextLink href={`${p("/partnership")}#case`} className="tlink--light">{c.proofCase}</TextLink>
          </div>
        </div>
      </section>

      {/* 06 HOW MEGAPARC WORKS — three directions, each to its destination */}
      <section className="xp-sec" id="directions">
        <div className="xp-shell">
          <Opening no="06" label={c.dirLabel} title={c.dirTitle} />
          <DirectionTiles locale={locale} links={{
            investment: { href: p("/partnership"), cta: c.dirLinks.investment },
            development: { href: `${p("/projects")}#collection`, cta: c.dirLinks.development },
            leasing: { href: `${p("/leasing")}#available`, cta: c.dirLinks.leasing },
          }} />
        </div>
      </section>

      {/* 07 CAREERS — cinematic film moment */}
      <CareersMoment locale={locale} variant="section" href={`${p("/careers")}#positions`} no="07" count={vacancies.length} />

      {/* 08 CHOOSE A PATH */}
      <section className="xp-sec" id="paths">
        <div className="xp-shell">
          <Opening no="08" label={c.routesLabel} title={c.routesTitle} />
          <AudienceRouter items={routes} label={c.routesTitle} />
        </div>
      </section>

      {/* 09 ACT — the burgundy close */}
      <section className="xp-sec xp-sec--red" id="next">
        <div className="xp-shell xp-close">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">09</span><span>{c.closeLabel}</span></p>
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
