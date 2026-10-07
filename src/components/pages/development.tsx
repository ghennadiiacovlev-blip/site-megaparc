import Link from "next/link";
import type { CSSProperties } from "react";
import { ConceptImage, Ledger, MaskTitle, Opening } from "@/components/experience";
import { PageShell } from "@/components/page-shell";
import { ArtImage } from "@/components/primitives";
import { Button, Icon, TextLink } from "@/components/ui";
import { drochiaProfile, portfolioFigures, vatraProfile } from "@/data/demo-content";
import { developmentProjects } from "@/lib/assets";
import { developmentNarrative } from "@/lib/strategy";
import { localePath, type SiteLocale } from "@/lib/site-data";

/**
 * DEVELOPMENT — scale · land · process · transformation · execution · future.
 * Image hero (concept, construction from above) → VATRA, the project in
 * delivery (real aerial, DEMO programme figures) → the six stages as a sticky
 * scroll scene with crossfading frames and the projects marked at their real
 * stage → Drochia Gateway, CONCEPT · UNDER EVALUATION, with an illustrative
 * site diagram that is explicitly not an approved scheme → principles → land
 * owners' next step.
 */
const copy = {
  ro: {
    label: "Dezvoltare",
    title: ["De la teren", "la clădirea care lucrează."],
    lead: "Fiecare proiect pornește de la funcție și economie. Arhitectura vine după — și nu o arătăm înainte de aprobare.",
    projects: "Proiecte",
    land: "Teren pentru dezvoltare",
    vatraStage: "VATRA — etapă",
    drochiaSite: "Drochia — teren",
    vatraLabel: "Proiect în realizare",
    vatraTitle: "VATRA",
    vatraText: "Proiectul este în realizare. Imaginea arată stadiul real al amplasamentului; arhitectura finală nu se publică înainte de aprobare.",
    stage: "Etapă",
    site: "Teren",
    programme: "Program",
    gba: "Suprafață construită",
    start: "Începutul lucrărilor",
    completion: "Finalizare",
    open: "Vezi proiectul",
    stagesLabel: "Cum se naște un proiect",
    stagesTitle: "Șase etape. Fiecare proiect la etapa lui reală.",
    concept: "concept",
    drochiaLabel: "Concept · în evaluare",
    drochiaTitle: "Drochia Gateway",
    drochiaText: "Un teren de 2,0 ha la intrarea în oraș, cu două fronturi stradale. Trei direcții se analizează în paralel; nicio clădire nu este aprobată.",
    potential: "Potențial construit",
    status: "Status",
    decision: "Decizie",
    fronts: "Fronturi stradale",
    plan: "Ilustrativ · nu este o schemă aprobată",
    planRetail: "Comerț — față",
    planLogistics: "Logistică — spate",
    planRoad: "Drum de acces",
    planEntry: "Intrarea în oraș",
    concepts: "Direcții analizate",
    openConcept: "Vezi conceptul",
    principlesLabel: "Cum dezvoltăm",
    principles: [["Funcția înaintea formei", "Mai întâi decidem cum va fi folosit și întreținut obiectul, apoi cum arată."], ["Bugetul și termenele sub control", "Calculăm economia înainte de lucrări și ținem bugetul și graficul la fiecare etapă."], ["Calitate pentru exploatare", "Calitatea construcției decide costurile de exploatare și cererea pentru ani."]],
    closeLabel: "Aveți un teren?",
    closeTitle: "Arătați-ne terenul. Vă spunem ce ar putea deveni.",
    routes: [["Propune un teren sau un obiect", "/opportunities", "owners"], ["Discută un parteneriat", "/opportunities", "partners"], ["Cum evaluăm", "/approach", "screening"]],
  },
  ru: {
    label: "Девелопмент",
    title: ["От участка", "до здания, которое работает."],
    lead: "Каждый проект начинается с функции и экономики. Архитектура — потом, и мы не показываем её до утверждения.",
    projects: "Проекты",
    land: "Земля под развитие",
    vatraStage: "VATRA — стадия",
    drochiaSite: "Дрокия — участок",
    vatraLabel: "Проект в стадии реализации",
    vatraTitle: "VATRA",
    vatraText: "Проект в стадии реализации. Изображение показывает реальное состояние площадки; итоговая архитектура не публикуется до утверждения.",
    stage: "Стадия",
    site: "Участок",
    programme: "Программа",
    gba: "Площадь застройки",
    start: "Начало работ",
    completion: "Ввод",
    open: "Открыть проект",
    stagesLabel: "Как рождается проект",
    stagesTitle: "Шесть этапов. Каждый проект — на своём реальном этапе.",
    concept: "концепция",
    drochiaLabel: "Концепция · на стадии оценки",
    drochiaTitle: "Drochia Gateway",
    drochiaText: "Участок 2,0 га на въезде в город с двумя фронтами к дорогам. Три направления оцениваются параллельно; ни одно здание не утверждено.",
    potential: "Потенциал застройки",
    status: "Статус",
    decision: "Решение",
    fronts: "Фронты к дорогам",
    plan: "Иллюстрация · не утверждённая схема",
    planRetail: "Торговля — фронт",
    planLogistics: "Логистика — тыл",
    planRoad: "Подъездная дорога",
    planEntry: "Въезд в город",
    concepts: "Рассматриваемые направления",
    openConcept: "Смотреть концепцию",
    principlesLabel: "Как мы развиваем",
    principles: [["Функция прежде формы", "Сначала решаем, как объект будет использоваться и обслуживаться, потом — как он выглядит."], ["Бюджет и сроки под контролем", "Считаем экономику до начала работ и держим бюджет и график на каждом этапе."], ["Качество для эксплуатации", "Качество строительства определяет расходы на эксплуатацию и спрос на годы вперёд."]],
    closeLabel: "У вас есть участок?",
    closeTitle: "Покажите нам землю. Расскажем, чем она может стать.",
    routes: [["Предложить участок или объект", "/opportunities", "owners"], ["Обсудить партнёрство", "/opportunities", "partners"], ["Как мы оцениваем", "/approach", "screening"]],
  },
  en: {
    label: "Development",
    title: ["From a site", "to a building that works."],
    lead: "Every project starts from function and economics. Architecture comes after — and we do not show it before approval.",
    projects: "Projects",
    land: "Development land",
    vatraStage: "VATRA — stage",
    drochiaSite: "Drochia — site",
    vatraLabel: "Project in delivery",
    vatraTitle: "VATRA",
    vatraText: "The project is in delivery. The image shows the real state of the site; final architecture is not published before approval.",
    stage: "Stage",
    site: "Site",
    programme: "Programme",
    gba: "Gross building area",
    start: "Works started",
    completion: "Completion",
    open: "View the project",
    stagesLabel: "How a project is made",
    stagesTitle: "Six stages. Each project at its real stage.",
    concept: "concept",
    drochiaLabel: "Concept · under evaluation",
    drochiaTitle: "Drochia Gateway",
    drochiaText: "A 2.0 ha site at the entrance to the town with two road fronts. Three directions are assessed in parallel; no building is approved.",
    potential: "Potential built area",
    status: "Status",
    decision: "Decision",
    fronts: "Road fronts",
    plan: "Illustrative · not an approved scheme",
    planRetail: "Retail — front",
    planLogistics: "Logistics — rear",
    planRoad: "Access road",
    planEntry: "Town entrance",
    concepts: "Directions under assessment",
    openConcept: "View the concept",
    principlesLabel: "How we develop",
    principles: [["Function before form", "First we decide how a building will be used and maintained, then how it looks."], ["Budget and schedule under control", "We run the numbers before works and hold budget and schedule at every stage."], ["Quality built for operation", "Build quality decides operating costs and demand for years."]],
    closeLabel: "Do you have land?",
    closeTitle: "Show us the land. We'll tell you what it could become.",
    routes: [["Submit a site or a property", "/opportunities", "owners"], ["Discuss a partnership", "/opportunities", "partners"], ["How we assess", "/approach", "screening"]],
  },
} as const;

const stageImages = ["development.stage.1", "development.stage.2", "development.stage.3", "development.stage.4", "development.stage.5", "development.stage.6"];

/** Illustrative diagram — zones, not architecture. Rendered in brand line work; labelled as not approved. */
function SitePlan({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  return (
    <figure className="xp-plan" data-reveal aria-label={c.plan}>
      <span className="xp-plan__label">{c.plan}</span>
      <svg viewBox="0 0 400 300" role="img" aria-hidden="true">
        <defs>
          <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeOpacity=".18" strokeWidth="2" />
          </pattern>
        </defs>
        <path d="M0 236 L400 214" stroke="currentColor" strokeOpacity=".35" strokeWidth="14" fill="none" />
        <path d="M58 300 L92 0" stroke="currentColor" strokeOpacity=".22" strokeWidth="10" fill="none" />
        <polygon points="104,62 352,48 360,198 112,210" fill="url(#hatch)" stroke="currentColor" strokeWidth="1.5" />
        <polygon points="114,150 356,140 360,198 112,210" fill="#ed1c2e" fillOpacity=".14" stroke="#ed1c2e" strokeWidth="1.2" />
        <polygon points="106,68 350,56 354,120 110,128" fill="currentColor" fillOpacity=".07" stroke="currentColor" strokeOpacity=".5" strokeDasharray="4 4" />
        <text x="236" y="182" textAnchor="middle" fontSize="11" fill="#ed1c2e" fontWeight="600">{c.planRetail.toUpperCase()}</text>
        <text x="230" y="96" textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity=".7" fontWeight="600">{c.planLogistics.toUpperCase()}</text>
        <text x="300" y="246" textAnchor="middle" fontSize="10" fill="currentColor" fillOpacity=".6">{c.planEntry} →</text>
        <text x="40" y="40" fontSize="10" fill="currentColor" fillOpacity=".6" transform="rotate(-83 40 40)">{c.planRoad}</text>
        <text x="352" y="38" textAnchor="end" fontSize="10" fill="currentColor" fillOpacity=".6">2,0 ha</text>
      </svg>
    </figure>
  );
}

export function DevelopmentIndexPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);
  const [vatra, drochia] = developmentProjects;
  const stages = developmentNarrative.stages;
  const concepts = drochia.sections[0].items ?? [];
  const tagFor = (index: number) => developmentProjects.filter((project) => project.stage === index);

  return (
    <PageShell locale={locale} variant="overlay" experience>
      {/* HERO */}
      <section className="xp-hero xp-hero--page" data-xp-hero>
        <div className="xp-hero__media">
          <div className="xp-hero__frame is-active">
            <ConceptImage id="development.hero" locale={locale} priority />
          </div>
        </div>
        <div className="xp-hero__veil" aria-hidden="true" />
        <div className="xp-shell xp-hero__copy">
          <p className="xp-hero__line">{c.label}</p>
          <MaskTitle as="h1" className="xp-hero__title" lines={[...c.title]} />
          <p className="xp-hero__lead">{c.lead}</p>
        </div>
      </section>

      {/* SCALE */}
      <section className="xp-sec xp-sec--warm xp-sec--tight">
        <div className="xp-shell" data-reveal>
          <Ledger locale={locale} size="lg" items={[
            { label: c.projects, value: String(developmentProjects.length).padStart(2, "0") },
            { label: c.land, point: portfolioFigures.land },
            { label: c.vatraStage, value: vatraProfile.stage.value[locale].split(" · ")[0] },
            { label: c.drochiaSite, value: drochiaProfile.site.value[locale].split(" · ")[0] },
          ]} />
        </div>
      </section>

      {/* VATRA */}
      <section className="xp-sec" id="vatra">
        <div className="xp-shell xp-feature">
          <Link href={p(`/development/${vatra.slug}`)} className="xp-piece__figure" data-reveal>
            <figure className="xp-fig" style={{ "--ratio": "4 / 3" } as CSSProperties}>
              <ArtImage media={vatra.media!} alt={`${vatra.name} — ${vatra.status[locale]}`} sizes="(min-width: 1024px) 58vw, 100vw" depth={14} position="50% 70%" />
              <figcaption>{vatra.name} · {vatra.place[locale]}</figcaption>
            </figure>
          </Link>
          <div className="xp-split__copy" data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">01</span><span>{c.vatraLabel}</span></p>
            <h2 className="xp-piece__name">{c.vatraTitle}</h2>
            <p>{c.vatraText}</p>
            <Ledger locale={locale} className="xp-ledger--pair" items={[
              { label: c.stage, point: vatraProfile.stage },
              { label: c.site, point: vatraProfile.site },
              { label: c.gba, point: vatraProfile.gba },
              { label: c.completion, point: vatraProfile.completion },
            ]} />
            <p className="xp-muted">{c.programme}: {vatraProfile.programme.value[locale]}</p>
            <Button href={p(`/development/${vatra.slug}`)}>{c.open}</Button>
          </div>
        </div>
      </section>

      {/* SIX STAGES — sticky scene */}
      <section className="xp-sec xp-sec--warm" id="stages">
        <div className="xp-shell">
          <Opening no="02" label={c.stagesLabel} title={c.stagesTitle} />
        </div>
        <div className="xp-scene" data-xp-scene data-steps={stages.length} style={{ "--steps": stages.length } as CSSProperties}>
          <div className="xp-shell xp-scene__pin">
            <div className="xp-scene__media">
              {stageImages.map((id) => (
                <div key={id} className="xp-scene__frame">
                  <ConceptImage id={id} locale={locale} sizes="(min-width: 1024px) 55vw, 100vw" />
                </div>
              ))}
            </div>
            <div>
              <span className="xp-scene__bar" aria-hidden="true" />
              <ol className="xp-scene__steps">
                {stages.map((stage, index) => (
                  <li key={stage.no} className="xp-scene__step">
                    <span className="xp-scene__no">{stage.no}</span>
                    <h3 className="xp-scene__title">{stage.title[locale]}</h3>
                    <p className="xp-scene__text">{stage.text[locale]}</p>
                    {tagFor(index).map((project) => (
                      <span key={project.slug} className={`xp-scene__tag${project.media ? "" : " xp-scene__tag--concept"}`}>{project.name}{project.media ? "" : ` · ${c.concept}`}</span>
                    ))}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* DROCHIA GATEWAY — concept under evaluation */}
      <section className="xp-sec" id="concept">
        <div className="xp-shell">
          <div className="xp-feature xp-feature--concept">
            <div className="xp-split__copy" data-reveal>
              <span className="xp-flag">{c.drochiaLabel}</span>
              <h2 className="xp-piece__name">{c.drochiaTitle}</h2>
              <p>{c.drochiaText}</p>
              <Ledger locale={locale} className="xp-ledger--pair" items={[
                { label: c.site, point: drochiaProfile.site },
                { label: c.fronts, point: drochiaProfile.fronts },
                { label: c.potential, point: drochiaProfile.potential },
                { label: c.decision, point: drochiaProfile.decision },
              ]} />
              <p className="xp-label">{c.concepts}</p>
              <ul className="xp-ticks">
                {concepts.map((item) => (
                  <li key={item.en}>{item[locale]}</li>
                ))}
              </ul>
              <TextLink href={p(`/development/${drochia.slug}`)}>{c.openConcept}</TextLink>
            </div>
            <div className="xp-stack" data-reveal>
              <figure className="xp-fig" style={{ "--ratio": "3 / 2" } as CSSProperties}>
                <ConceptImage id="development.drochia" locale={locale} sizes="(min-width: 1024px) 50vw, 100vw" depth={10} />
              </figure>
              <SitePlan locale={locale} />
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="xp-sec xp-sec--stone">
        <div className="xp-shell xp-split xp-split--text">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">04</span><span>{c.principlesLabel}</span></p>
            <h2 className="xp-split__title xp-split__title--gap">{c.principles[0][0]}.</h2>
          </div>
          <ol className="xp-numbered" data-reveal>
            {c.principles.map(([title, text]) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CLOSE — land owners */}
      <section className="xp-sec xp-sec--ink">
        <div className="xp-shell xp-close">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">05</span><span>{c.closeLabel}</span></p>
            <h2 className="xp-close__title">{c.closeTitle}</h2>
          </div>
          <nav className="xp-close__routes" aria-label={c.closeLabel} data-reveal>
            {c.routes.map(([label, path, anchor]) => (
              <Link key={label} href={`${p(path)}#${anchor}`}>
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

