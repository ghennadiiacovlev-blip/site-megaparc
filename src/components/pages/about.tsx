import Link from "next/link";
import type { CSSProperties } from "react";
import { CompanyFacts } from "@/components/company-facts";
import { ConceptImage, Ledger, MaskTitle, Opening } from "@/components/experience";
import { PageShell } from "@/components/page-shell";
import { ArtImage } from "@/components/primitives";
import { Button, Icon, TextLink } from "@/components/ui";
import { getProject } from "@/content/source";
import { businessStatement, geography, lifecycle, operations, principles, verbs } from "@/lib/business";
import { eras } from "@/lib/history";
import { brand, localePath, publicAsset, type Localized, type SiteLocale } from "@/lib/site-data";

/**
 * ABOUT — the corrected business model (OWNER correction 2026-10-08).
 * MEGAPARC buys real estate and land, develops and revitalises its own
 * projects, leases and operates its own buildings, holds or sells, reinvests.
 * Not a third-party asset manager: owned property operations only.
 * The company history has its own page (/history); About hands over to it.
 * No team or leadership section (OWNER decision 2026-10-08).
 */
const copy = {
  ro: {
    label: "Despre companie",
    lead: "Compania a fost fondată în 2005 și lucrează doar cu obiectele proprii — de la cumpărare la închiriere și întreținere.",
    founded: "Fondată",
    group: "Grupul",
    origins: "Originile afacerii",
    groupSince: "din 1995",
    focus: "Focus pe imobiliare",
    modelLabel: "Cum lucrăm",
    modelTitle: "Șase etape din viața unui obiect.",
    opsLink: "Spațiile libere acum",
    principlesLabel: "Cum decidem",
    principlesTitle: "Patru reguli de proprietar.",
    whereLabel: "Unde",
    whereCta: "Propuneți un obiect sau un teren",
    historyLabel: "Istoric",
    historyTitle: "O cronică ce începe în 1991.",
    historyText: "Comerț, producție, logistică, finanțe, agrobusiness și proiecte internaționale — înainte ca imobiliarele să devină activitatea principală.",
    historyCta: "Citiți cronica",
    closeLabel: "Mai departe",
    closeTitle: "Ce vă interesează?",
    routes: [["Proiectele noastre", "/projects"], ["Spații de închiriat", "/leasing"], ["Propuneți un obiect", "/offer"], ["Cariere", "/careers"]],
  },
  ru: {
    label: "О компании",
    lead: "Компания основана в 2005 году и работает только со своими объектами — от покупки до аренды и обслуживания.",
    founded: "Основана",
    group: "Группа",
    origins: "Истоки бизнеса",
    groupSince: "с 1995 года",
    focus: "Фокус на недвижимости",
    modelLabel: "Как мы работаем",
    modelTitle: "Шесть этапов жизни объекта.",
    opsLink: "Что сдаётся сейчас",
    principlesLabel: "Как мы решаем",
    principlesTitle: "Четыре правила собственника.",
    whereLabel: "Где",
    whereCta: "Предложить объект или землю",
    historyLabel: "История",
    historyTitle: "Хроника, которая начинается в 1991 году.",
    historyText: "Розница, производство, логистика, финансы, агробизнес и международные проекты — до того, как недвижимость стала главным делом.",
    historyCta: "Читать хронику",
    closeLabel: "Дальше",
    closeTitle: "Что вас интересует?",
    routes: [["Наши проекты", "/projects"], ["Помещения в аренду", "/leasing"], ["Предложить объект", "/offer"], ["Вакансии", "/careers"]],
  },
  en: {
    label: "About",
    lead: "Founded in 2005, the company works only with its own properties — from purchase to leasing and upkeep.",
    founded: "Founded",
    group: "The group",
    origins: "Business origins",
    groupSince: "since 1995",
    focus: "Real-estate focus",
    modelLabel: "How we work",
    modelTitle: "Six stages in the life of a property.",
    opsLink: "What is available now",
    principlesLabel: "How we decide",
    principlesTitle: "Four owner's rules.",
    whereLabel: "Where",
    whereCta: "Offer a property or land",
    historyLabel: "History",
    historyTitle: "A chronicle that begins in 1991.",
    historyText: "Retail, manufacturing, logistics, finance, agribusiness and international projects — before real estate became the core business.",
    historyCta: "Read the chronicle",
    closeLabel: "Next",
    closeTitle: "What are you interested in?",
    routes: [["Our projects", "/projects"], ["Space to lease", "/leasing"], ["Offer a property", "/offer"], ["Careers", "/careers"]],
  },
} as const;

/** One frame per stage: real MEGAPARC photographs where the stage is visible in a real building, labelled brand frames for the decisions. */
/**
 * One image per stage, telling the story (final craft pass 2026-10-08):
 * buy → land and buildings · develop → VATRA on site · lease → Moscova 20, a
 * finished commercial space · look after → Moscova 9 in daily use · hold or
 * sell → Dacia 31, a mature building · reinvest → earthworks for the next
 * project. Real MEGAPARC photographs for 02–05; 01 and 06 are registered brand
 * frames (src/data/demo-content.ts) and their captions never name a property.
 */
const stageImages: ({ kind: "asset"; slug: string; caption: Localized } | { kind: "use"; id: string; caption: Localized })[] = [
  { kind: "use", id: "about.acquire", caption: { ro: "Clădiri și terenuri — începutul fiecărui proiect", ru: "Здания и земля — начало каждого проекта", en: "Buildings and land — where every project starts" } },
  { kind: "asset", slug: "vatra", caption: { ro: "VATRA — proiect propriu în lucru", ru: "VATRA — собственный проект в работе", en: "VATRA — our own project, under way" } },
  { kind: "asset", slug: "moscova-20", caption: { ro: "Moscova 20 — spațiu pentru afaceri", ru: "Moscova 20 — помещение для бизнеса", en: "Moscova 20 — space for business" } },
  { kind: "asset", slug: "moscova-9", caption: { ro: "Moscova 9 — clădire în funcțiune", ru: "Moscova 9 — действующий объект", en: "Moscova 9 — an operating property" } },
  { kind: "asset", slug: "dacia-31", caption: { ro: "Dacia 31 — o clădire matură în portofoliu", ru: "Dacia 31 — зрелый объект в портфеле", en: "Dacia 31 — a mature building in the portfolio" } },
  { kind: "use", id: "about.reinvest", caption: { ro: "Următorul proiect începe de la teren", ru: "Следующий проект начинается с земли", en: "The next project starts with the land" } },
];

export function AboutPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);
  const dacia = getProject("dacia-31")!;
  const ribbon = eras.filter((era) => era.range);

  return (
    <PageShell locale={locale} experience>
      {/* 01 HERO — the model in three words */}
      <section className="xp-pagehero ab-hero">
        <div className="xp-shell xp-pagehero__grid">
          <p className="xp-eyebrow" data-reveal><span className="xp-eyebrow__no">{brand.name}</span><span>{c.label}</span></p>
          {/* The three verbs span the full width so every verb keeps one line (final craft pass). */}
          <MaskTitle as="h1" className="ab-hero__title" lines={[...verbs[locale]]} />
          <p className="xp-pagehero__lead" data-reveal>{businessStatement[locale]} {c.lead}</p>
          <div className="xp-pagehero__aside" data-reveal>
            <Ledger locale={locale} className="xp-ledger--pair" items={[
              { label: c.origins, value: "1991" },
              { label: c.group, value: c.groupSince },
              { label: c.founded, value: "2005" },
              { label: c.focus, value: "2020" },
            ]} />
          </div>
        </div>
      </section>

      {/* 02 THE MODEL — sticky scene, six stages */}
      <section className="xp-sec" id="model">
        <div className="xp-shell">
          <Opening no="01" label={c.modelLabel} title={c.modelTitle} />
        </div>
        <div className="xp-scene" data-xp-scene data-steps={lifecycle.length} style={{ "--steps": lifecycle.length } as CSSProperties}>
          <div className="xp-shell xp-scene__pin">
            <div className="xp-scene__media" aria-hidden="true">
              {stageImages.map((frame, index) => {
                const project = frame.kind === "asset" ? getProject(frame.slug) : null;
                return (
                  <figure key={index} className="xp-scene__frame">
                    {project?.media ? (
                      <ArtImage media={project.media} alt={`${project.name} — ${lifecycle[index].title[locale]}`} sizes="(min-width: 1024px) 58vw, 100vw" position={project.slug === "vatra" ? "50% 70%" : undefined} />
                    ) : frame.kind === "use" ? (
                      <ConceptImage id={frame.id} locale={locale} sizes="(min-width: 1024px) 58vw, 100vw" />
                    ) : null}
                    <figcaption className="xp-scene__caption"><span>{String(index + 1).padStart(2, "0")}</span>{frame.caption[locale]}</figcaption>
                  </figure>
                );
              })}
            </div>
            <ol className="xp-scene__steps">
              {lifecycle.map((stage, index) => (
                <li key={stage.key} className="xp-scene__step" style={{ "--i": index } as CSSProperties}>
                  {/* Below 1024px the sticky frame is replaced by one image per stage, so the story survives on phones. */}
                  <figure className="xp-fig xp-scene__thumb" style={{ "--ratio": "3 / 2" } as CSSProperties} aria-hidden="true">
                    {(() => {
                      const frame = stageImages[index];
                      const project = frame.kind === "asset" ? getProject(frame.slug) : null;
                      if (project?.media) return <ArtImage media={project.media} alt="" sizes="100vw" position={project.slug === "vatra" ? "50% 70%" : undefined} />;
                      return frame.kind === "use" ? <ConceptImage id={frame.id} locale={locale} sizes="100vw" /> : null;
                    })()}
                  </figure>
                  <span className="xp-scene__no">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="xp-scene__title">{stage.title[locale]}</h3>
                  <p className="xp-scene__short">{stage.short[locale]}</p>
                  <p className="xp-scene__text">{stage.text[locale]}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 03 OWNED PROPERTY OPERATIONS — never a service to third parties */}
      <section className="xp-sec xp-sec--warm" id="operations">
        <div className="xp-shell xp-split xp-split--wide">
          <Link href={p(`/projects/${dacia.slug}`)} className="xp-piece__figure" data-reveal>
            <figure className="xp-fig" style={{ "--ratio": "3 / 2" } as CSSProperties}>
              <ArtImage media={dacia.media!} alt={`${dacia.name} — ${dacia.format[locale]}`} sizes="(min-width: 1024px) 60vw, 100vw" depth={10} />
              <figcaption>{dacia.name}</figcaption>
            </figure>
          </Link>
          <div className="xp-split__copy" data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">02</span><span>{operations.label[locale]}</span></p>
            <h2 className="xp-split__title">{operations.title[locale]}</h2>
            <p>{operations.text[locale]}</p>
            <ul className="xp-ticks">
              {operations.points.map((point) => (
                <li key={point.en}>{point[locale]}</li>
              ))}
            </ul>
            <TextLink href={`${p("/leasing")}#available`}>{c.opsLink}</TextLink>
          </div>
        </div>
      </section>

      {/* 04 FACTS */}
      <CompanyFacts locale={locale} tone="light" />

      {/* 05 PRINCIPLES */}
      <section className="xp-sec">
        <div className="xp-shell xp-split xp-split--text">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">03</span><span>{c.principlesLabel}</span></p>
            <h2 className="xp-split__title xp-split__title--gap">{c.principlesTitle}</h2>
          </div>
          <ol className="xp-numbered" data-reveal>
            {principles.map((item) => (
              <li key={item.title.en}>
                <h3>{item.title[locale]}</h3>
                <p>{item.text[locale]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 06 WHERE */}
      <section className="xp-sec xp-sec--stone xp-sec--tight">
        <div className="xp-shell xp-split xp-split--text">
          <p className="xp-eyebrow" data-reveal><span className="xp-eyebrow__no">04</span><span>{geography.label[locale]}</span></p>
          <div data-reveal>
            <p className="xp-lead">{geography.text[locale]}</p>
            <div className="xp-actions xp-actions--top"><Button href={p("/offer")}>{c.whereCta}</Button></div>
          </div>
        </div>
      </section>

      {/* 07 HISTORY — hand over to the chronicle */}
      <section className="hs-teaser hs-teaser--about">
        <div className="xp-shell hs-teaser__grid">
          <div className="hs-teaser__copy" data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">05</span><span>{c.historyLabel}</span></p>
            <h2 className="hs-teaser__title">{c.historyTitle}</h2>
            <p className="hs-teaser__lead">{c.historyText}</p>
            <ol className="hs-teaser__ribbon hs-teaser__ribbon--all" aria-label={c.historyLabel}>
              {ribbon.map((era) => (
                <li key={era.key} className={era.scope === "megaparc" ? "is-megaparc" : undefined}>
                  <span>{era.range}</span>
                  <small>{era.label[locale]}</small>
                </li>
              ))}
            </ol>
            <Button href={p("/history")}>{c.historyCta}</Button>
          </div>
          <figure className="hs-teaser__figure" data-reveal>
            <picture>
              <source media="(min-width: 721px)" srcSet={publicAsset("/assets/history/era-retail.webp")} />
              <img src={publicAsset("/assets/history/era-retail-mobile.webp")} alt="" loading="lazy" decoding="async" />
            </picture>
          </figure>
        </div>
      </section>

      {/* 08 CLOSE */}
      <section className="xp-sec xp-sec--red">
        <div className="xp-shell xp-close">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">06</span><span>{c.closeLabel}</span></p>
            <h2 className="xp-close__title">{c.closeTitle}</h2>
          </div>
          <nav className="xp-close__routes" aria-label={c.closeLabel} data-reveal>
            {c.routes.map(([label, path]) => (
              <Link key={path} href={p(path)}>
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
