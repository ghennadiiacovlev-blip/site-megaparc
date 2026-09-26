import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { ScaleSection } from "@/components/scale-section";
import { ArrowLink, SectionIndex } from "@/components/primitives";
import { CapitalSection } from "@/components/sections/strategy-sections";
import { developmentProjects, portfolioAssets } from "@/lib/assets";
import { clientJourneys } from "@/lib/client-journeys";
import { investmentMandate } from "@/lib/strategy";
import { brand, localePath, publicAsset, ui, type SiteLocale } from "@/lib/site-data";

/**
 * HOME — Art Direction v3 (OWNER_VISUAL_REDESIGN_BRIEF.md).
 * Visual, commercial, investment-led. Deep strategy lives on /approach and /about.
 * Nine movements: hero · what we do · investment focus · scale · selected
 * portfolio · development · worldwide · work with MEGAPARC · footer.
 */

const img = {
  heroStreet: publicAsset("/assets/home/hero-street.webp"),
  heroLand: publicAsset("/assets/home/hero-land.webp"),
  heroCity: publicAsset("/assets/home/hero-city.webp"),
  doInvest: publicAsset("/assets/home/do-invest.webp"),
  doDevelop: publicAsset("/assets/home/do-develop.webp"),
  doManage: publicAsset("/assets/home/do-manage.webp"),
  focusIncome: publicAsset("/assets/home/focus-income.webp"),
  focusSites: publicAsset("/assets/home/focus-sites.webp"),
  focusReposition: publicAsset("/assets/home/focus-reposition.webp"),
  focusPartners: publicAsset("/assets/home/focus-partners.webp"),
  worldwide: publicAsset("/assets/home/worldwide.webp"),
  development: publicAsset("/assets/home/development.webp"),
};

const copy = {
  ro: {
    heroId: "acasa",
    title: ["Investim în imobiliare.", "Creăm valoare."],
    line: "Investiții · Dezvoltare · Administrarea activelor",
    lead: "Platformă integrată de investiții imobiliare. Baza noastră operațională este în Moldova; analizăm oportunități de investiții la nivel internațional.",
    ctaA: "Portofoliu",
    ctaB: "Propune o oportunitate",
    heroAlt: ["Front comercial pe bulevard, Chișinău", "Amplasament de dezvoltare pe malul apei", "Context urban, Chișinău"],
    doIndex: "Ce facem",
    doTitle: "Trei capabilități. Un singur ciclu de proprietate.",
    do: [
      ["Investim", "Selectăm active după logica economică, nu după volum.", "/approach", "Cum gândim"],
      ["Dezvoltăm", "De la amplasament, la produs, la activ operațional.", "/development", "Dezvoltare"],
      ["Administrăm", "Operăm activele ca un proprietar interesat de valoarea de peste ani.", "/portfolio", "Portofoliu"],
    ],
    focusIndex: "Ce analizăm",
    focusTitle: "Oportunități de investiții",
    focusText: "Patru tipuri de oportunități pe care le evaluăm, în Moldova și la nivel internațional.",
    focus: [
      ["Imobiliare generatoare de venit", "Active comerciale cu chiriași și fluxuri stabile."],
      ["Amplasamente de dezvoltare", "Terenuri și situri cu o logică urbană clară."],
      ["Oportunități de repoziționare", "Clădiri subutilizate care pot fi aduse la un nou standard."],
      ["Parteneriate și joint ventures", "Proiecte strategice alături de proprietari, dezvoltatori și capital."],
    ],
    focusCta: "Propune o oportunitate",
    selIndex: "Portofoliu selectat",
    selTitle: "Active reale, în funcțiune.",
    selText: "Trei dintre activele operaționale ale platformei, prezentate ca profil de activ, nu ca anunț.",
    selCta: "Vezi toate cele 04 active",
    devIndex: "Dezvoltare",
    devTitle: "De la amplasament la activ operațional.",
    devText: "Dezvoltarea face parte din ciclul de investiție. VATRA este un amplasament în execuție, cu imagini reale; Drochia Gateway este un concept în evaluare.",
    devCta: "Explorează dezvoltarea",
    devAlt: "VATRA — amplasament de dezvoltare, vedere aeriană",
    worldIndex: "Unde investim",
    worldLabel: "Chișinău · Moldova · internațional",
    worldText: "Portofoliul operațional și proiectele de dezvoltare se află în Republica Moldova. Oportunitățile de investiții le analizăm oriunde activul, locația și partenerii îndeplinesc aceleași criterii.",
    worldCta: "Propune o oportunitate",
    worldAlt: "Chișinău, context urban",
    workIndex: "Lucrează cu MEGAPARC",
    workTitle: "Trei drumuri. O singură platformă.",
    contactLine: "Un singur interlocutor. Trei tipuri de discuție.",
  },
  ru: {
    heroId: "home",
    title: ["Инвестируем в недвижимость.", "Создаём стоимость."],
    line: "Инвестиции · Девелопмент · Управление активами",
    lead: "Интегрированная платформа инвестиций в недвижимость. Молдова — наша операционная база; инвестиционные возможности рассматриваем по всему миру.",
    ctaA: "Портфель",
    ctaB: "Предложить объект",
    heroAlt: ["Торговый фронт на бульваре, Кишинёв", "Площадка под развитие у воды", "Городской контекст, Кишинёв"],
    doIndex: "Что мы делаем",
    doTitle: "Три компетенции. Один цикл владения.",
    do: [
      ["Инвестируем", "Отбираем активы по экономической логике, а не по объёму.", "/approach", "Как мы мыслим"],
      ["Развиваем", "От площадки — к продукту — к операционному активу.", "/development", "Девелопмент"],
      ["Управляем", "Эксплуатируем активы как собственник, заинтересованный в стоимости через годы.", "/portfolio", "Портфель"],
    ],
    focusIndex: "Что мы рассматриваем",
    focusTitle: "Инвестиционные возможности",
    focusText: "Четыре типа возможностей, которые мы оцениваем — в Молдове и по всему миру.",
    focus: [
      ["Доходная недвижимость", "Коммерческие активы с арендаторами и стабильным потоком."],
      ["Площадки под развитие", "Участки и площадки с ясной городской логикой."],
      ["Репозиционирование", "Недоиспользуемые здания, которые можно вывести на новый стандарт."],
      ["Партнёрства и совместные предприятия", "Стратегические проекты вместе с владельцами, девелоперами и капиталом."],
    ],
    focusCta: "Предложить объект",
    selIndex: "Избранные активы",
    selTitle: "Реальные активы в работе.",
    selText: "Три операционных актива платформы, представленные как профиль объекта, а не как объявление.",
    selCta: "Все 04 актива",
    devIndex: "Девелопмент",
    devTitle: "От площадки к операционному активу.",
    devText: "Девелопмент — часть инвестиционного цикла. VATRA — площадка в реализации с реальными снимками; Drochia Gateway — концепция в оценке.",
    devCta: "Смотреть девелопмент",
    devAlt: "VATRA — площадка под развитие, вид с воздуха",
    worldIndex: "Где мы инвестируем",
    worldLabel: "Кишинёв · Молдова · международно",
    worldText: "Операционный портфель и девелоперские проекты находятся в Республике Молдова. Инвестиционные возможности мы рассматриваем везде, где актив, локация и партнёры отвечают тем же критериям.",
    worldCta: "Предложить объект",
    worldAlt: "Кишинёв, городской контекст",
    workIndex: "Работать с MEGAPARC",
    workTitle: "Три пути. Одна платформа.",
    contactLine: "Один собеседник. Три типа разговора.",
  },
  en: {
    heroId: "home",
    title: ["Investing in real estate.", "Creating long-term value."],
    line: "Investment · Development · Asset Management",
    lead: "An integrated real-estate investment platform. Moldova is our operating base; we evaluate investment opportunities worldwide.",
    ctaA: "Portfolio",
    ctaB: "Submit an opportunity",
    heroAlt: ["Boulevard retail frontage, Chișinău", "Waterside development site", "Urban context, Chișinău"],
    doIndex: "What we do",
    doTitle: "Three capabilities. One ownership cycle.",
    do: [
      ["Invest", "We select assets on economic logic, not on volume.", "/approach", "How we think"],
      ["Develop", "From site, to product, to operating asset.", "/development", "Development"],
      ["Manage", "We run assets as an owner interested in their value years from now.", "/portfolio", "Portfolio"],
    ],
    focusIndex: "What we look for",
    focusTitle: "Investment opportunities",
    focusText: "Four kinds of opportunity we evaluate, in Moldova and worldwide.",
    focus: [
      ["Income-producing real estate", "Commercial assets with occupiers and stable cash flow."],
      ["Development sites", "Land and sites with a clear urban logic."],
      ["Repositioning opportunities", "Under-used buildings that can be brought to a new standard."],
      ["Partnerships and joint ventures", "Strategic projects alongside owners, developers and capital."],
    ],
    focusCta: "Submit an opportunity",
    selIndex: "Selected portfolio",
    selTitle: "Real assets, in operation.",
    selText: "Three of the platform's operating assets, presented as asset profiles, not listings.",
    selCta: "View all 04 assets",
    devIndex: "Development",
    devTitle: "From site to operating asset.",
    devText: "Development is part of the investment cycle. VATRA is a site under delivery with real imagery; Drochia Gateway is a concept under evaluation.",
    devCta: "Explore development",
    devAlt: "VATRA — development site, aerial view",
    worldIndex: "Where we invest",
    worldLabel: "Chișinău · Moldova · worldwide",
    worldText: "The operating portfolio and development projects are in the Republic of Moldova. We evaluate investment opportunities wherever the asset, the location and the partners meet the same criteria.",
    worldCta: "Submit an opportunity",
    worldAlt: "Chișinău, urban context",
    workIndex: "Work with MEGAPARC",
    workTitle: "Three routes. One platform.",
    contactLine: "One counterparty. Three kinds of conversation.",
  },
} as const;

export function HomePage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);
  const [dacia, moscova9, moscova20] = portfolioAssets;
  const [vatra, drochia] = developmentProjects;
  const focusImages = [img.focusIncome, img.focusSites, img.focusReposition, img.focusPartners];
  const doImages = [img.doInvest, img.doDevelop, img.doManage];
  let n = 0;
  const no = () => String(++n).padStart(2, "0");

  return (
    <PageShell locale={locale} variant="solid">
      {/* 01 HERO — light, editorial montage of three real frames, no asset names */}
      <section className="hero3 paper" id={c.heroId}>
        <div className="shell hero3__grid">
          <div className="hero3__copy">
            <p className="hero3__brand"><span>{brand.name}</span><i aria-hidden="true" /><span lang="en">{brand.since}</span></p>
            <h1>
              <span>{c.title[0]}</span>
              <span>{c.title[1]}</span>
            </h1>
            <p className="hero3__line">{c.line}</p>
            <p className="hero3__lead">{c.lead}</p>
            <div className="hero3__actions">
              <ArrowLink href={p("/portfolio")} strong>{c.ctaA}</ArrowLink>
              <ArrowLink href={`${p("/contact")}#opportunity`}>{c.ctaB}</ArrowLink>
            </div>
          </div>
          <div className="hero3__montage" data-reveal>
            <figure className="hero3__frame hero3__frame--a">
              <Image src={img.heroStreet} alt={c.heroAlt[0]} fill priority sizes="(max-width: 720px) 100vw, (max-width: 1100px) 60vw, 38vw" />
            </figure>
            <figure className="hero3__frame hero3__frame--b">
              <Image src={img.heroLand} alt={c.heroAlt[1]} fill priority sizes="(max-width: 720px) 50vw, (max-width: 1100px) 40vw, 22vw" />
            </figure>
            <figure className="hero3__frame hero3__frame--c">
              <Image src={img.heroCity} alt={c.heroAlt[2]} fill sizes="(max-width: 720px) 50vw, (max-width: 1100px) 40vw, 22vw" />
            </figure>
          </div>
        </div>
      </section>

      {/* 02 WHAT WE DO — three image-led cards with different proportions */}
      <section className="do white" id="what-we-do">
        <div className="shell">
          <SectionIndex no={no()}>{c.doIndex}</SectionIndex>
          <h2 className="do__title" data-reveal>{c.doTitle}</h2>
          <div className="do__grid">
            {c.do.map(([title, text, path, label], index) => (
              <Link key={title} href={p(path)} className={`do-card do-card--${index + 1}`} data-reveal>
                <span className="do-card__visual">
                  <Image src={doImages[index]} alt="" fill sizes={index === 1 ? "(max-width: 720px) 100vw, 44vw" : "(max-width: 720px) 100vw, 30vw"} />
                </span>
                <span className="do-card__body">
                  <span className="do-card__no">0{index + 1}</span>
                  <span className="do-card__title">{title}</span>
                  <span className="do-card__text">{text}</span>
                  <span className="do-card__link">{label} ↗</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 03 INVESTMENT FOCUS — four editorial image cards + one CTA */}
      <section className="focus stone" id="investment-focus">
        <div className="shell">
          <SectionIndex no={no()}>{c.focusIndex}</SectionIndex>
          <div className="focus__head" data-reveal>
            <h2>{c.focusTitle}</h2>
            <p>{c.focusText}</p>
          </div>
          <div className="focus__grid">
            {c.focus.map(([title, text], index) => (
              <Link key={title} href={`${p("/opportunities")}#submit-opportunity`} className={`focus-card focus-card--${index + 1}`} data-reveal>
                <span className="focus-card__visual">
                  <Image src={focusImages[index]} alt="" fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 40vw" />
                  <span className="focus-card__line" aria-hidden="true" />
                </span>
                <span className="focus-card__body">
                  <span className="focus-card__no">0{index + 1}</span>
                  <span className="focus-card__title">{title}</span>
                  <span className="focus-card__text">{text}</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="focus__foot" data-reveal>
            <ArrowLink href={`${p("/contact")}#opportunity`} strong>{c.focusCta}</ArrowLink>
          </div>
        </div>
      </section>

      {/* 04 MEGAPARC AT SCALE — verified metrics + review-only capital row */}
      <ScaleSection locale={locale} no={no()} surface="paper" />
      <CapitalSection locale={locale} no="" surface="graphite" compact />

      {/* 05 SELECTED PORTFOLIO — three editorial asset stories, mixed sizes */}
      <section className="sel white" id="portofoliu">
        <div className="shell">
          <SectionIndex no={no()}>{c.selIndex}</SectionIndex>
          <div className="sel__head" data-reveal>
            <h2>{c.selTitle}</h2>
            <div className="section-head__aside">
              <p>{c.selText}</p>
              <ArrowLink href={p("/portfolio")}>{c.selCta}</ArrowLink>
            </div>
          </div>
          <div className="sel__grid">
            {[
              { asset: moscova9, src: moscova9.media!.card, cls: "sel-card--wide", sizes: "(max-width: 720px) 100vw, 58vw" },
              { asset: moscova20, src: moscova20.media!.mobile, cls: "sel-card--tall", sizes: "(max-width: 720px) 100vw, 34vw" },
              { asset: dacia, src: dacia.media!.card, cls: "sel-card--small", sizes: "(max-width: 720px) 100vw, 34vw" },
            ].map(({ asset, src, cls, sizes }) => (
              <Link key={asset.slug} href={p(`/portfolio/${asset.slug}`)} className={`sel-card ${cls}`} data-reveal>
                <span className="sel-card__visual">
                  <Image src={src} alt={`${asset.name} — ${asset.positioning[locale]}`} fill sizes={sizes} style={{ objectPosition: asset.media!.position }} />
                  <span className="focus-card__line" aria-hidden="true" />
                </span>
                <span className="sel-card__body">
                  <span className="sel-card__name">{asset.name}</span>
                  <span className="sel-card__meta">{asset.district[locale]} · {asset.city[locale]}</span>
                  <span className="sel-card__line">{asset.headline[locale]}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 06 DEVELOPMENT — split layout, real VATRA aerial */}
      <section className="dev paper" id="dezvoltare">
        <div className="shell dev__grid">
          <figure className="dev__visual" data-reveal>
            <Image src={img.development} alt={c.devAlt} fill sizes="(max-width: 1100px) 100vw, 52vw" />
          </figure>
          <div className="dev__copy" data-reveal>
            <SectionIndex no={no()}>{c.devIndex}</SectionIndex>
            <h2>{c.devTitle}</h2>
            <p>{c.devText}</p>
            <div className="dev__projects">
              {[vatra, drochia].map((project) => (
                <Link key={project.slug} href={p(`/development/${project.slug}`)}>
                  <span>{project.name}</span>
                  <span>{project.status[locale]}</span>
                </Link>
              ))}
            </div>
            <ArrowLink href={p("/development")}>{c.devCta}</ArrowLink>
          </div>
        </div>
      </section>

      {/* 07 WORLDWIDE — simple public language, city context strip */}
      <section className="world stone" id="worldwide">
        <figure className="world__strip">
          <Image src={img.worldwide} alt={c.worldAlt} fill sizes="100vw" />
        </figure>
        <div className="shell world__grid">
          <div data-reveal>
            <SectionIndex no={no()}>{c.worldIndex}</SectionIndex>
            <span className="label label--red world__label">{c.worldLabel}</span>
            <h2>
              <span>{investmentMandate.statement[locale][0]}</span>
              <span>{investmentMandate.statement[locale][1]}</span>
            </h2>
          </div>
          <div className="world__aside" data-reveal>
            <p>{c.worldText}</p>
            <ArrowLink href={`${p("/contact")}#opportunity`}>{c.worldCta}</ArrowLink>
          </div>
        </div>
      </section>

      {/* 08 WORK WITH MEGAPARC / CONTACT — one dark section */}
      <section className="work ink" id="contact">
        <div className="shell">
          <SectionIndex no={no()} inverse>{c.workIndex}</SectionIndex>
          <div className="work__head" data-reveal>
            <h2>{c.workTitle}</h2>
            <span className="label label--light">{c.contactLine}</span>
          </div>
          <div className="work__grid">
            {clientJourneys.map((journey) => (
              <Link key={journey.key} href={`${p(journey.path)}#${journey.anchor}`} className="work-card" data-reveal>
                <span className="work-card__no">{journey.no}</span>
                <span className="work-card__title">{journey.title[locale]}</span>
                <span className="work-card__text">{journey.audience[locale]}</span>
                <span className="arrow-link arrow-link--inverse"><span>{journey.cta[locale]}</span><span className="arrow-link__icon" aria-hidden="true">↗</span></span>
              </Link>
            ))}
          </div>
          <div className="work__foot" data-reveal>
            <span>{brand.city[locale]}</span>
            <ArrowLink href={p("/contact")} inverse strong>{ui.contactUs[locale]}</ArrowLink>
          </div>
        </div>
      </section>

    </PageShell>
  );
}
