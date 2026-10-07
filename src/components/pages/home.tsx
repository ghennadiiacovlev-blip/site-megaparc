import Link from "next/link";
import type { CSSProperties } from "react";
import { CompanyFacts } from "@/components/company-facts";
import { ConceptImage, DemoMark, Ledger, MaskTitle, Opening, conceptMedia } from "@/components/experience";
import { AudienceRouterBlock } from "@/components/journey-blocks";
import { PageShell } from "@/components/page-shell";
import { ArtImage } from "@/components/primitives";
import { Button, Icon, TextLink } from "@/components/ui";
import { creangaProfile, imageUse, tenantFit, vatraProfile } from "@/data/demo-content";
import { audienceIntro } from "@/data/journeys";
import { developmentProjects, portfolioAssets } from "@/lib/assets";
import { openVacancies } from "@/lib/careers";
import { investmentMandate } from "@/lib/strategy";
import { brand, localePath, type SiteLocale } from "@/lib/site-data";

/**
 * HOME — the strongest brand expression and the start of every journey
 * (full-experience prototype 2026-10-07).
 *
 * Light / dark rhythm: daylight hero → warm "first ten seconds" (invest ·
 * develop · manage) → white audience routing → warm facts board → white
 * collection → INK development moment → image band (mandate) → warm people →
 * RED closing routes → footer.
 * Imagery: hero, trio, band and people use registered concept visuals
 * (src/data/demo-content.ts); portfolio and development use real MEGAPARC
 * photographs, Creangă 78 its labelled concept placement.
 */

const copy = {
  ro: {
    title: ["Investim în imobiliare.", "Dezvoltăm proiecte.", "Administrăm active."],
    lead: "MEGAPARC cumpără, dezvoltă și administrează imobiliare comerciale — cu portofoliul în Moldova și oportunități analizate la nivel internațional.",
    ctaA: "Vezi portofoliul",
    ctaB: "Propune un obiect",
    scroll: "Derulează",
    since: "Since 1995 · Chișinău",
    whoLabel: "MEGAPARC în zece secunde",
    who: ["MEGAPARC ", "investește", " în imobiliare, ", "dezvoltă", " proiecte și ", "administrează", " obiecte ca pe o afacere care trebuie să lucreze ani la rând."],
    trio: [
      ["Investiții", "Căutăm obiecte și terenuri cu o economie clară și un drum realist spre creșterea valorii.", "/approach", "Cum luăm decizii"],
      ["Dezvoltare", "Ducem proiectele de la teren și concept până la clădirea care funcționează.", "/development", "Proiectele"],
      ["Administrare", "Chiriași, exploatare, îmbunătățiri — obiectul rămâne căutat și după ani.", "/portfolio", "Portofoliul"],
    ],
    routerLabel: audienceIntro.kicker.ro,
    collectionLabel: "Portofoliu",
    collectionTitle: "Patru obiecte în funcțiune. Fiecare cu rolul lui.",
    collectionLead: "Clădiri pentru sedii, comerț pe prima linie și servicii de cartier — în Chișinău.",
    all: "Tot portofoliul",
    fit: "Găsește spațiul potrivit",
    devLabel: "Dezvoltare",
    devTitle: "De la teren la clădirea care lucrează.",
    devText: "VATRA este un proiect în realizare. Drochia Gateway este un teren de 2,0 ha la intrarea în oraș, în evaluare.",
    devCta: "Vezi dezvoltarea",
    stage: "Etapă",
    site: "Teren",
    completion: "Finalizare",
    drochia: "Drochia Gateway · concept în evaluare",
    mandateCta: "Cum investim",
    peopleLabel: "Oameni",
    peopleTitle: "Echipa care construiește viitorul lucrează cu obiecte reale.",
    peopleText: "Investiții, finanțe, dezvoltare, construcție și exploatare — la aceeași masă și pe aceleași șantiere.",
    roles: (n: number) => `${String(n).padStart(2, "0")} posturi deschise`,
    peopleCta: "Ce veți face la MEGAPARC",
    closeLabel: "Pasul următor",
    closeTitle: "Spuneți-ne ce aveți nevoie. Vă arătăm ce putem face.",
    routes: [["Găsește un spațiu", "/opportunities#occupier"], ["Propune un obiect sau un teren", "/opportunities#owners"], ["Investiții și finanțare", "/approach#investors"], ["Scrie-ne", "/contact"]],
  },
  ru: {
    title: ["Инвестируем в недвижимость.", "Развиваем проекты.", "Управляем активами."],
    lead: "MEGAPARC покупает, развивает и управляет коммерческой недвижимостью: портфель — в Молдове, новые возможности — по всему миру.",
    ctaA: "Смотреть портфель",
    ctaB: "Предложить объект",
    scroll: "Листайте",
    since: "Since 1995 · Chișinău",
    whoLabel: "MEGAPARC за десять секунд",
    who: ["MEGAPARC ", "инвестирует", " в недвижимость, ", "развивает", " проекты и ", "управляет", " объектами как бизнесом, который должен работать годами."],
    trio: [
      ["Инвестиции", "Ищем объекты и участки с понятной экономикой и реалистичным путём к росту стоимости.", "/approach", "Как мы принимаем решения"],
      ["Девелопмент", "Ведём проекты от участка и концепции до здания, которое работает.", "/development", "Проекты"],
      ["Управление", "Арендаторы, эксплуатация, улучшения — объект остаётся востребованным через годы.", "/portfolio", "Портфель"],
    ],
    routerLabel: audienceIntro.kicker.ru,
    collectionLabel: "Портфель",
    collectionTitle: "Четыре действующих объекта. У каждого своя роль.",
    collectionLead: "Здания под штаб-квартиры, торговля первой линии и сервисы районного масштаба — в Кишинёве.",
    all: "Весь портфель",
    fit: "Подобрать помещение",
    devLabel: "Девелопмент",
    devTitle: "От участка до здания, которое работает.",
    devText: "VATRA — проект в стадии реализации. Drochia Gateway — участок 2,0 га на въезде в город, на стадии оценки.",
    devCta: "Смотреть девелопмент",
    stage: "Стадия",
    site: "Участок",
    completion: "Ввод",
    drochia: "Drochia Gateway · концепция на стадии оценки",
    mandateCta: "Как мы инвестируем",
    peopleLabel: "Люди",
    peopleTitle: "Команда, которая строит будущее, работает с реальными объектами.",
    peopleText: "Инвестиции, финансы, девелопмент, строительство и эксплуатация — за одним столом и на одних площадках.",
    roles: (n: number) => `${String(n).padStart(2, "0")} открытых вакансий`,
    peopleCta: "Чем вы будете заниматься",
    closeLabel: "Следующий шаг",
    closeTitle: "Расскажите, что вам нужно. Покажем, что мы можем сделать.",
    routes: [["Подобрать помещение", "/opportunities#occupier"], ["Предложить объект или землю", "/opportunities#owners"], ["Инвестиции и финансирование", "/approach#investors"], ["Написать нам", "/contact"]],
  },
  en: {
    title: ["We invest in real estate.", "We develop projects.", "We manage assets."],
    lead: "MEGAPARC buys, develops and manages commercial real estate — a portfolio in Moldova and opportunities considered worldwide.",
    ctaA: "View the portfolio",
    ctaB: "Submit a property",
    scroll: "Scroll",
    since: "Since 1995 · Chișinău",
    whoLabel: "MEGAPARC in ten seconds",
    who: ["MEGAPARC ", "invests", " in real estate, ", "develops", " projects and ", "manages", " properties as businesses that have to work for years."],
    trio: [
      ["Invest", "We look for properties and land with clear economics and a realistic path to value growth.", "/approach", "How we decide"],
      ["Develop", "We take projects from site and concept to a building that works.", "/development", "Projects"],
      ["Manage", "Tenants, operations, improvements — the property stays in demand for years.", "/portfolio", "Portfolio"],
    ],
    routerLabel: audienceIntro.kicker.en,
    collectionLabel: "Portfolio",
    collectionTitle: "Four operating properties. Each with its own role.",
    collectionLead: "Headquarters buildings, first-line retail and neighbourhood services — in Chișinău.",
    all: "The whole portfolio",
    fit: "Find the right space",
    devLabel: "Development",
    devTitle: "From a site to a building that works.",
    devText: "VATRA is a project in delivery. Drochia Gateway is a 2.0 ha site at the entrance to the town, under evaluation.",
    devCta: "View development",
    stage: "Stage",
    site: "Site",
    completion: "Completion",
    drochia: "Drochia Gateway · concept under evaluation",
    mandateCta: "How we invest",
    peopleLabel: "People",
    peopleTitle: "The team that builds the future works on real properties.",
    peopleText: "Investment, finance, development, construction and operations — at one table and on the same sites.",
    roles: (n: number) => `${String(n).padStart(2, "0")} open vacancies`,
    peopleCta: "What you would work on",
    closeLabel: "Next step",
    closeTitle: "Tell us what you need. We'll show you what we can do.",
    routes: [["Find a space", "/opportunities#occupier"], ["Submit a property or land", "/opportunities#owners"], ["Investment and finance", "/approach#investors"], ["Write to us", "/contact"]],
  },
} as const;

const heroFrames = ["home.hero.1", "home.hero.2", "home.hero.3"];
const trioImages = ["home.do.invest", "home.do.develop", "home.do.manage"];

export function HomePage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);
  const [dacia, moscova9, moscova20, creanga] = portfolioAssets;
  const [vatra, drochia] = developmentProjects;
  const mandate = investmentMandate.statement[locale];
  const sky = imageUse("home.mandate");
  const pieces = [
    { asset: dacia, ratio: "4 / 5" },
    { asset: moscova20, ratio: "4 / 5" },
    { asset: creanga, ratio: "4 / 5" },
  ];

  return (
    <PageShell locale={locale} variant="overlay" experience>
      {/* 01 HERO — three daylight frames, masked headline, two actions */}
      <section className="xp-hero" id="home" data-xp-hero>
        <div className="xp-hero__media" data-xp-seq data-interval="6500">
          {heroFrames.map((id, index) => (
            <div key={id} className={`xp-hero__frame${index === 0 ? " is-active" : ""}`} data-xp-frame data-defer={index > 0 ? "" : undefined}>
              <ConceptImage id={id} locale={locale} priority={index === 0} />
            </div>
          ))}
        </div>
        <div className="xp-hero__veil" aria-hidden="true" />
        <div className="xp-shell xp-hero__copy">
          <p className="xp-hero__line" lang="en">{brand.positioning}</p>
          <MaskTitle as="h1" className="xp-hero__title" lines={[...c.title]} />
          <p className="xp-hero__lead">{c.lead}</p>
          <div className="xp-actions">
            <Button href={p("/portfolio")} variant="light">{c.ctaA}</Button>
            <Button href={`${p("/opportunities")}#owners`} variant="ghost-light">{c.ctaB}</Button>
          </div>
        </div>
        <div className="xp-hero__foot">
          <div className="xp-shell xp-hero__bar">
            <a className="xp-hero__cue" href="#who">{c.scroll}<Icon name="down" /></a>
            <span className="xp-hero__progress" aria-hidden="true"><i /><i /><i /></span>
            <span lang="en" className="xp-hero__since">{c.since}</span>
          </div>
        </div>
      </section>

      {/* 02 FIRST TEN SECONDS — invest · develop · manage */}
      <section className="xp-sec xp-sec--warm" id="who">
        <div className="xp-shell">
          <p className="xp-eyebrow" data-reveal><span className="xp-eyebrow__no">01</span><span>{c.whoLabel}</span></p>
          <p className="xp-statement" data-reveal>
            {c.who.map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : <span key={i}>{part}</span>))}
          </p>
          <ol className="xp-trio">
            {c.trio.map(([word, text, path, cta], i) => (
              <li key={word} className="xp-trio__item" data-reveal>
                <Link href={p(path)} aria-label={`${word} — ${cta}`}>
                  <figure className="xp-fig">
                    <ConceptImage id={trioImages[i]} locale={locale} sizes="(min-width: 720px) 30vw, 100vw" depth={8} />
                  </figure>
                  <span className="xp-trio__no">0{i + 1}</span>
                  <span className="xp-trio__word">{word}</span>
                </Link>
                <p>{text}</p>
                <TextLink href={p(path)}>{cta}</TextLink>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 03 AUDIENCE ROUTING — what brings you to MEGAPARC */}
      <section className="xp-sec" id="start">
        <div className="xp-shell">
          <Opening no="02" label={c.routerLabel} title={audienceIntro.title[locale]} lead={audienceIntro.text[locale]} className="xp-opening--split" />
          <AudienceRouterBlock locale={locale} />
        </div>
      </section>

      {/* 04 FACTS — light board, verified scale + DEMO indicators */}
      <CompanyFacts locale={locale} tone="light" />

      {/* 05 COLLECTION — real assets at different scales */}
      <section className="xp-sec" id="portfolio">
        <div className="xp-shell">
          <Opening no="04" label={c.collectionLabel} title={c.collectionTitle} lead={c.collectionLead} className="xp-opening--split" />
          <Link href={p(`/portfolio/${moscova9.slug}`)} className="xp-showcase__lead" data-reveal>
            <figure className="xp-fig" style={{ "--ratio": "21 / 9" } as CSSProperties}>
              <ArtImage media={moscova9.media!} alt={`${moscova9.name} — ${moscova9.positioning[locale]}`} sizes="100vw" depth={14} />
            </figure>
            <span className="xp-showcase__caption">
              <span className="xp-showcase__name">{moscova9.name}</span>
              <span className="xp-showcase__reason">{tenantFit[moscova9.slug].reason[locale]}</span>
              <span className="xp-showcase__meta">{moscova9.district[locale]} · {moscova9.positioning[locale]}<Icon name="arrow" /></span>
            </span>
          </Link>
          <ul className="xp-showcase">
            {pieces.map(({ asset, ratio }) => (
              <li key={asset.slug} data-reveal>
                <Link href={p(`/portfolio/${asset.slug}`)} className="xp-showcase__item">
                  <figure className="xp-fig" style={{ "--ratio": ratio } as CSSProperties}>
                    {asset.media ? (
                      <ArtImage media={asset.media} alt={`${asset.name} — ${asset.positioning[locale]}`} sizes="(min-width: 720px) 33vw, 100vw" depth={10} />
                    ) : (
                      <ConceptImage id="home.portfolio.creanga-78" locale={locale} sizes="(min-width: 720px) 33vw, 100vw" depth={10} />
                    )}
                  </figure>
                  <span className="xp-showcase__name">{asset.name}</span>
                  <span className="xp-showcase__reason">{tenantFit[asset.slug].reason[locale]}</span>
                  <span className="xp-showcase__meta">{asset.media ? asset.district[locale] : creangaProfile.district.value[locale]} · {asset.media ? asset.positioning[locale] : creangaProfile.use.value[locale]}{asset.media ? null : <DemoMark />}<Icon name="arrow" /></span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="xp-actions xp-actions--top" data-reveal>
            <Button href={p("/portfolio")}>{c.all}</Button>
            <TextLink href={`${p("/opportunities")}#occupier`}>{c.fit}</TextLink>
          </div>
        </div>
      </section>

      {/* 06 DEVELOPMENT — the dark moment */}
      <section className="xp-sec xp-sec--ink" id="development">
        <div className="xp-shell">
          <Opening no="05" label={c.devLabel} title={c.devTitle} lead={c.devText} tone="dark" className="xp-opening--split" />
          <div className="xp-feature">
            <Link href={p(`/development/${vatra.slug}`)} className="xp-piece__figure" data-reveal>
              <figure className="xp-fig" style={{ "--ratio": "16 / 10" } as CSSProperties}>
                <ArtImage media={vatra.media!} alt={`${vatra.name} — ${vatra.status[locale]}`} sizes="(min-width: 1024px) 58vw, 100vw" depth={16} position="50% 70%" />
                <figcaption>{vatra.name} · {vatra.status[locale]}</figcaption>
              </figure>
            </Link>
            <div className="xp-split__copy" data-reveal>
              <h3 className="xp-piece__name">{vatra.name}</h3>
              <Ledger locale={locale} tone="dark" className="xp-ledger--pair" items={[
                { label: c.stage, point: vatraProfile.stage },
                { label: c.site, point: vatraProfile.site },
                { label: c.completion, point: vatraProfile.completion },
                { label: "GBA", point: vatraProfile.gba },
              ]} />
              <TextLink href={p(`/development/${drochia.slug}`)} className="tlink--light">{c.drochia}</TextLink>
              <Button href={p("/development")} variant="light">{c.devCta}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 07 MANDATE — image band */}
      <section className="xp-band" id="mandate" aria-label={investmentMandate.kicker[locale]}>
        <ArtImage media={conceptMedia(sky.visual)} alt={sky.alt[locale]} depth={18} />
        <div className="xp-shell xp-band__copy" data-reveal>
          <p className="xp-eyebrow"><span className="xp-eyebrow__no">06</span><span>{investmentMandate.kicker[locale]}</span></p>
          <p className="xp-band__title">{mandate[0]} {mandate[1]}</p>
          <p className="xp-band__text">{investmentMandate.text[locale]}</p>
          <div className="xp-actions">
            <Button href={`${p("/opportunities")}#owners`} variant="light">{c.ctaB}</Button>
            <TextLink href={`${p("/approach")}#investors`} className="tlink--light">{c.mandateCta}</TextLink>
          </div>
        </div>
      </section>

      {/* 08 PEOPLE */}
      <section className="xp-sec xp-sec--warm" id="people">
        <div className="xp-shell xp-split xp-split--wide">
          <Link href={`${p("/careers")}#work`} className="xp-piece__figure" data-reveal>
            <figure className="xp-fig" style={{ "--ratio": "3 / 2" } as CSSProperties}>
              <ConceptImage id="careers.hero" locale={locale} sizes="(min-width: 1024px) 60vw, 100vw" depth={10} />
            </figure>
          </Link>
          <div className="xp-split__copy" data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">07</span><span>{c.peopleLabel}</span></p>
            <h2 className="xp-split__title">{c.peopleTitle}</h2>
            <p>{c.peopleText}</p>
            <p className="xp-label">{c.roles(openVacancies.length)}</p>
            <Button href={`${p("/careers")}#work`}>{c.peopleCta}</Button>
          </div>
        </div>
      </section>

      {/* 09 CLOSING — red signature, specific next steps */}
      <section className="xp-sec xp-sec--red" id="next">
        <div className="xp-shell xp-close">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">08</span><span>{c.closeLabel}</span></p>
            <h2 className="xp-close__title">{c.closeTitle}</h2>
          </div>
          <nav className="xp-close__routes" aria-label={c.closeLabel} data-reveal>
            {c.routes.map(([label, href]) => (
              <Link key={href} href={`${p(href.split("#")[0])}${href.includes("#") ? `#${href.split("#")[1]}` : ""}`}>
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

