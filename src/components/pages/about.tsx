import Link from "next/link";
import type { CSSProperties } from "react";
import { BusinessStage } from "@/components/business-stage";
import { CompanyFacts } from "@/components/company-facts";
import { Ledger, MaskTitle, Opening } from "@/components/experience";
import { PageShell } from "@/components/page-shell";
import { ArtImage } from "@/components/primitives";
import { Button, Icon, TextLink } from "@/components/ui";
import { getProject } from "@/content/source";
import { businessStatement, directionLines, geography, operations, principles } from "@/lib/business";
import { eras } from "@/lib/history";
import { brand, localePath, publicAsset, type SiteLocale } from "@/lib/site-data";

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
    modelLabel: "Direcții",
    modelTitle: "Trei direcții ale aceleiași afaceri.",
    stageMore: "Proiectele MEGAPARC",
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
    modelLabel: "Направления",
    modelTitle: "Три направления одного бизнеса.",
    stageMore: "Проекты MEGAPARC",
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
    modelLabel: "Directions",
    modelTitle: "Three directions of one business.",
    stageMore: "MEGAPARC projects",
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

export function AboutPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);
  const moscova20 = getProject("moscova-20")!;
  const ribbon = eras.filter((era) => era.range);

  return (
    <PageShell locale={locale} experience>
      {/* 01 HERO — the three business directions */}
      <section className="xp-pagehero ab-hero">
        <div className="xp-shell xp-pagehero__grid">
          <p className="xp-eyebrow" data-reveal><span className="xp-eyebrow__no">{brand.name}</span><span>{c.label}</span></p>
          {/* The three directions span the full width, one per line (OWNER brief 2026-10-08). */}
          <MaskTitle as="h1" className="ab-hero__title" lines={[...directionLines[locale]]} />
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

      {/* 02 THE BUSINESS — three directions, three cinematic scenes (pinned on desktop) */}
      <section className="xp-sec" id="directions">
        <div className="xp-shell">
          <Opening no="01" label={c.modelLabel} title={c.modelTitle} />
        </div>
        <BusinessStage locale={locale} label={<><span className="xp-eyebrow__no">{brand.name}</span><span>{c.modelLabel}</span></>} more={{ href: p("/projects"), text: c.stageMore }} />
      </section>

      {/* 03 OWNED PROPERTY OPERATIONS — never a service to third parties */}
      <section className="xp-sec xp-sec--warm" id="operations">
        <div className="xp-shell xp-split xp-split--wide">
          <Link href={p(`/projects/${moscova20.slug}`)} className="xp-piece__figure" data-reveal>
            <figure className="xp-fig" style={{ "--ratio": "3 / 2" } as CSSProperties}>
              <ArtImage media={moscova20.media!} alt={`${moscova20.name} — ${moscova20.format[locale]}`} sizes="(min-width: 1024px) 60vw, 100vw" depth={10} position="50% 74%" />
              <figcaption>{moscova20.name}</figcaption>
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
