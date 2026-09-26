import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { ScaleSection } from "@/components/scale-section";
import { ArrowLink, SectionIndex } from "@/components/primitives";
import { CapitalSection } from "@/components/sections/strategy-sections";
import { developmentProjects, portfolioAssets } from "@/lib/assets";
import { openVacancies } from "@/lib/careers";
import { clientJourneys } from "@/lib/client-journeys";
import { developmentNarrative, investmentMandate } from "@/lib/strategy";
import { brand, localePath, publicAsset, ui, type SiteLocale } from "@/lib/site-data";

/**
 * HOME — Art Direction v4, editorial copy v1 (RU source, RO/EN adaptations).
 * Eleven movements: hero · what we do · investment focus · scale · selected
 * portfolio · development · worldwide · work with MEGAPARC · people ·
 * contact · footer. Deep strategy lives on /approach, /about and /development.
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
  people: publicAsset("/assets/home/people.webp"),
};

const copy = {
  ro: {
    heroId: "acasa",
    title: ["Investim în imobiliare.", "Creăm valoare."],
    line: "Investiții · Dezvoltare · Administrare imobiliară",
    lead: "Investim, dezvoltăm și administrăm imobiliare. Analizăm obiecte și proiecte pe piețele internaționale.",
    ctaA: "Vezi portofoliul",
    ctaB: "Propune un obiect",
    heroAlt: ["Front comercial pe bulevard, Chișinău", "Teren de dezvoltare pe malul apei", "Context urban, Chișinău"],
    doIndex: "Ce facem",
    doTitle: "Investim, dezvoltăm și administrăm imobiliare.",
    do: [
      ["Investiții", "Căutăm obiecte cu o economie clară și potențial de creștere a valorii.", "/approach", "Cum investim"],
      ["Dezvoltare", "Dezvoltăm proiecte de la teren și concept până la obiectul finalizat.", "/development", "Proiecte"],
      ["Administrarea activelor", "Creștem calitatea obiectelor, eficiența exploatării și atractivitatea lor pe termen lung.", "/portfolio", "Portofoliu"],
    ],
    focusIndex: "Focus de investiții",
    focusTitle: "Ce ne interesează",
    focusText: "Ne interesează obiecte generatoare de venit, terenuri de dezvoltare și proiecte în care se poate crea valoare suplimentară.",
    focus: [
      ["Imobiliare generatoare de venit", "Obiecte comerciale cu chiriași și venit stabil."],
      ["Terenuri de dezvoltare", "Terenuri cu o logică urbană clară și posibilitate de realizare."],
      ["Repoziționarea obiectelor existente", "Clădiri cărora li se poate da o nouă destinație sau un nou standard."],
      ["Proiecte comune și parteneriate", "Proiecte alături de proprietari, dezvoltatori și investitori."],
    ],
    focusCardCta: "Propune",
    focusCta: "Propune un obiect",
    selIndex: "Obiecte selectate din portofoliu",
    selTitle: "Activele MEGAPARC",
    selText: "Obiecte comerciale în funcțiune, în Chișinău.",
    selCta: "Toate obiectele",
    devIndex: "Dezvoltare",
    devTitle: "Dezvoltăm imobiliare de la idee la realizare.",
    devText: "VATRA este un amplasament în lucru, prezentat așa cum este. Drochia Gateway este un concept la intrarea în oraș, aflat în verificare.",
    devCta: "Vezi proiectele",
    devAlt: "VATRA — teren de dezvoltare, vedere aeriană",
    worldIndex: "Geografie",
    worldLabel: "Piețe internaționale",
    worldText: "Analizăm imobiliare generatoare de venit, terenuri de dezvoltare, proiecte de repoziționare și investiții comune, acolo unde înțelegem economia, riscurile și potențialul obiectului.",
    worldCta: "Propune un obiect",
    worldAlt: "Chișinău, context urban",
    workIndex: "Colaborare",
    workTitle: "Cum putem colabora",
    peopleIndex: "Echipă",
    peopleTitle: "Lucrați cu noi.",
    peopleText: "MEGAPARC reunește investițiile, finanțele, dezvoltarea, administrarea imobiliară și exploatarea. Posturile deschise sunt publicate pe Rabota.md.",
    peopleRoles: (n: number) => `${String(n).padStart(2, "0")} posturi deschise`,
    peopleCta: "Cariere la MEGAPARC",
    peopleAlt: "Bulevard cu flux pietonal, Chișinău",
    contactIndex: "Contact",
    contactTitle: "Contactați MEGAPARC",
    contactText: "Închiriere de spații, propunerea unui obiect, investiții și parteneriat, carieră.",
  },
  ru: {
    heroId: "home",
    title: ["Инвестируем в недвижимость.", "Создаём стоимость."],
    line: "Инвестиции · Девелопмент · Управление недвижимостью",
    lead: "Инвестируем, развиваем и управляем недвижимостью. Рассматриваем объекты и проекты на международных рынках.",
    ctaA: "Смотреть портфель",
    ctaB: "Предложить объект",
    heroAlt: ["Торговый фасад на бульваре, Кишинёв", "Площадка под развитие у воды", "Городская среда, Кишинёв"],
    doIndex: "Что мы делаем",
    doTitle: "Инвестируем, развиваем и управляем недвижимостью.",
    do: [
      ["Инвестиции", "Ищем объекты с понятной экономикой и потенциалом роста стоимости.", "/approach", "Как мы инвестируем"],
      ["Девелопмент", "Развиваем проекты от площадки и концепции до готового объекта.", "/development", "Проекты"],
      ["Управление активами", "Повышаем качество объектов, эффективность эксплуатации и их долгосрочную востребованность.", "/portfolio", "Портфель"],
    ],
    focusIndex: "Инвестиционный фокус",
    focusTitle: "Что нас интересует",
    focusText: "Нас интересуют доходные объекты, площадки под развитие и проекты, где можно создать дополнительную стоимость.",
    focus: [
      ["Доходная недвижимость", "Коммерческие объекты с арендаторами и стабильным доходом."],
      ["Площадки под развитие", "Участки с понятной городской логикой и возможностью реализации."],
      ["Репозиционирование существующих объектов", "Здания, которым можно дать новое назначение или новый стандарт."],
      ["Совместные проекты и партнёрства", "Проекты вместе с собственниками, девелоперами и инвесторами."],
    ],
    focusCardCta: "Предложить",
    focusCta: "Предложить объект",
    selIndex: "Избранные объекты портфеля",
    selTitle: "Активы MEGAPARC",
    selText: "Действующие коммерческие объекты в Кишинёве.",
    selCta: "Все объекты",
    devIndex: "Девелопмент",
    devTitle: "Развиваем недвижимость от идеи до реализации.",
    devText: "VATRA — площадка в работе, показанная как есть. Drochia Gateway — концепция на въезде в город, которая проходит проверку.",
    devCta: "Смотреть проекты",
    devAlt: "VATRA — площадка под развитие, вид с воздуха",
    worldIndex: "География",
    worldLabel: "Международные рынки",
    worldText: "Рассматриваем доходную недвижимость, площадки под развитие, проекты для репозиционирования и совместные инвестиции — там, где понимаем экономику, риски и потенциал объекта.",
    worldCta: "Предложить объект",
    worldAlt: "Кишинёв, городская среда",
    workIndex: "Сотрудничество",
    workTitle: "Чем мы можем быть полезны",
    peopleIndex: "Команда",
    peopleTitle: "Работайте с нами.",
    peopleText: "MEGAPARC объединяет инвестиции, финансы, девелопмент, управление недвижимостью и эксплуатацию. Открытые вакансии опубликованы на Rabota.md.",
    peopleRoles: (n: number) => `${String(n).padStart(2, "0")} открытых вакансий`,
    peopleCta: "Карьера в MEGAPARC",
    peopleAlt: "Бульвар с пешеходным потоком, Кишинёв",
    contactIndex: "Контакты",
    contactTitle: "Связаться с MEGAPARC",
    contactText: "Аренда помещений, предложение объектов, инвестиции и партнёрство, карьера.",
  },
  en: {
    heroId: "home",
    title: ["We invest in real estate.", "We create value."],
    line: "Investment · Development · Asset Management",
    lead: "We invest in, develop and manage real estate. We consider properties and projects across international markets.",
    ctaA: "View the portfolio",
    ctaB: "Submit a property",
    heroAlt: ["Boulevard retail frontage, Chișinău", "Waterside development site", "Urban setting, Chișinău"],
    doIndex: "What we do",
    doTitle: "We invest in, develop and manage real estate.",
    do: [
      ["Investment", "We look for properties with clear economics and potential for value growth.", "/approach", "How we invest"],
      ["Development", "We take projects from site and concept to a completed building.", "/development", "Projects"],
      ["Asset management", "We improve the quality, operating efficiency and long-term appeal of our properties.", "/portfolio", "Portfolio"],
    ],
    focusIndex: "Investment focus",
    focusTitle: "What we look for",
    focusText: "We are interested in income-producing properties, development sites and projects where additional value can be created.",
    focus: [
      ["Income-producing real estate", "Commercial properties with tenants and stable income."],
      ["Development sites", "Land with a clear urban logic and a realistic path to delivery."],
      ["Repositioning of existing buildings", "Buildings that can be given a new use or a new standard."],
      ["Joint projects and partnerships", "Projects alongside owners, developers and investors."],
    ],
    focusCardCta: "Submit",
    focusCta: "Submit a property",
    selIndex: "Selected properties",
    selTitle: "MEGAPARC assets",
    selText: "Operating commercial properties in Chișinău.",
    selCta: "All properties",
    devIndex: "Development",
    devTitle: "We take real estate from idea to completion.",
    devText: "VATRA is a site under way, shown as it is. Drochia Gateway is a concept at the entrance to the town, currently under review.",
    devCta: "View the projects",
    devAlt: "VATRA — development site, aerial view",
    worldIndex: "Geography",
    worldLabel: "International markets",
    worldText: "We consider income-producing real estate, development sites, repositioning projects and joint investments, wherever we understand the economics, the risks and the potential of the property.",
    worldCta: "Submit a property",
    worldAlt: "Chișinău, urban setting",
    workIndex: "Working with MEGAPARC",
    workTitle: "How we can work together",
    peopleIndex: "Team",
    peopleTitle: "Work with us.",
    peopleText: "MEGAPARC brings together investment, finance, development, asset management and operations. Open vacancies are published on Rabota.md.",
    peopleRoles: (n: number) => `${String(n).padStart(2, "0")} open vacancies`,
    peopleCta: "Careers at MEGAPARC",
    peopleAlt: "Boulevard with pedestrian flow, Chișinău",
    contactIndex: "Contact",
    contactTitle: "Contact MEGAPARC",
    contactText: "Leasing, property proposals, investment and partnership, careers.",
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
      {/* 01 HERO — company first: statement, then a cinematic montage of three real frames */}
      <section className="hero4 white" id={c.heroId}>
        <div className="shell">
          <div className="hero4__top" data-reveal>
            <p className="hero4__brand"><span>{brand.name}</span><i aria-hidden="true" /><span lang="en">{brand.since}</span></p>
            <h1>
              <span>{c.title[0]}</span>
              <span>{c.title[1]}</span>
            </h1>
          </div>
          <div className="hero4__montage" data-reveal>
            <figure className="hero4__frame hero4__frame--a">
              <Image src={img.heroStreet} alt={c.heroAlt[0]} fill priority sizes="(max-width: 720px) 100vw, 60vw" />
            </figure>
            <figure className="hero4__frame hero4__frame--b">
              <Image src={img.heroLand} alt={c.heroAlt[1]} fill priority sizes="(max-width: 720px) 50vw, 36vw" />
            </figure>
            <figure className="hero4__frame hero4__frame--c">
              <Image src={img.heroCity} alt={c.heroAlt[2]} fill sizes="(max-width: 720px) 50vw, 36vw" />
            </figure>
          </div>
          <div className="hero4__foot" data-reveal>
            <p className="hero4__line">{c.line}</p>
            <p className="hero4__lead">{c.lead}</p>
            <div className="hero4__actions">
              <ArrowLink href={p("/portfolio")} strong>{c.ctaA}</ArrowLink>
              <ArrowLink href={`${p("/contact")}#opportunity`}>{c.ctaB}</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* 02 WHAT WE DO — three image-led cards, three proportions */}
      <section className="do paper" id="what-we-do">
        <div className="shell">
          <SectionIndex no={no()}>{c.doIndex}</SectionIndex>
          <h2 className="do__title" data-reveal>{c.doTitle}</h2>
          <div className="do__grid">
            {c.do.map(([title, text, path, label], index) => (
              <Link key={title} href={p(path)} className={`do-card do-card--${index + 1}`} data-reveal>
                <span className="do-card__visual">
                  <Image src={doImages[index]} alt="" fill sizes={index === 1 ? "(max-width: 720px) 100vw, 44vw" : "(max-width: 720px) 100vw, 30vw"} />
                  <span className="focus-card__line" aria-hidden="true" />
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

      {/* 03 INVESTMENT FOCUS — four editorial image cards */}
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
                  <span className="focus-card__cta">{c.focusCardCta} ↗</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="focus__foot" data-reveal>
            <ArrowLink href={`${p("/contact")}#opportunity`} strong>{c.focusCta}</ArrowLink>
          </div>
        </div>
      </section>

      {/* 04 SCALE — verified metrics + review-only key figures */}
      <ScaleSection locale={locale} no={no()} surface="paper" />
      <CapitalSection locale={locale} no="" surface="graphite" compact />

      {/* 05 SELECTED PORTFOLIO — wide / tall / small */}
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

      {/* 06 DEVELOPMENT — split with real VATRA aerial and a quiet stage rail */}
      <section className="dev paper" id="dezvoltare">
        <div className="shell dev__grid">
          <figure className="dev__visual" data-reveal>
            <Image src={img.development} alt={c.devAlt} fill sizes="(max-width: 1100px) 100vw, 52vw" />
          </figure>
          <div className="dev__copy" data-reveal>
            <SectionIndex no={no()}>{c.devIndex}</SectionIndex>
            <h2>{c.devTitle}</h2>
            <p>{c.devText}</p>
            <ol className="dev__rail" aria-label={developmentNarrative.title[locale]}>
              {developmentNarrative.stages.map((stage, index) => (
                <li key={stage.no} className={index === vatra.stage ? "is-current" : undefined}>{stage.title[locale]}</li>
              ))}
            </ol>
            <div className="dev__projects">
              {[vatra, drochia].map((project) => (
                <Link key={project.slug} href={p(`/development/${project.slug}`)}>
                  <span>{project.name} · {project.place[locale]}</span>
                  <span>{project.status[locale]}</span>
                </Link>
              ))}
            </div>
            <ArrowLink href={p("/development")}>{c.devCta}</ArrowLink>
          </div>
        </div>
      </section>

      {/* 07 WORLDWIDE — skyline strip, simple public language */}
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

      {/* 08 WORK WITH MEGAPARC — the only dark movement */}
      <section className="work ink" id="work-with-megaparc">
        <div className="shell">
          <SectionIndex no={no()} inverse>{c.workIndex}</SectionIndex>
          <div className="work__head" data-reveal>
            <h2>{c.workTitle}</h2>
          </div>
          <div className="work__grid">
            {clientJourneys.map((journey) => (
              <Link key={journey.key} href={`${p(journey.path)}#${journey.anchor}`} className="work-card" data-reveal>
                <span className="work-card__no">{journey.no}</span>
                <span className="work-card__title">{journey.title[locale]}</span>
                <span className="work-card__text">{journey.lead[locale]}</span>
                <span className="arrow-link arrow-link--inverse"><span>{journey.cta[locale]}</span><span className="arrow-link__icon" aria-hidden="true">↗</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 09 PEOPLE — organisation and verified open roles */}
      <section className="people white" id="people">
        <div className="shell people__grid">
          <div className="people__copy" data-reveal>
            <SectionIndex no={no()}>{c.peopleIndex}</SectionIndex>
            <h2>{c.peopleTitle}</h2>
            <p>{c.peopleText}</p>
            <div className="people__roles">
              <span className="label label--red">{c.peopleRoles(openVacancies.length)}</span>
              <ul>
                {openVacancies.slice(0, 3).map((vacancy) => (
                  <li key={vacancy.slug}>{vacancy.title[locale]}</li>
                ))}
              </ul>
            </div>
            <ArrowLink href={p("/careers")}>{c.peopleCta}</ArrowLink>
          </div>
          <figure className="people__visual" data-reveal>
            <Image src={img.people} alt={c.peopleAlt} fill sizes="(max-width: 1100px) 100vw, 46vw" />
          </figure>
        </div>
      </section>

      {/* 10 CONTACT — compact close */}
      <section className="close stone" id="contact">
        <div className="shell close__grid" data-reveal>
          <div>
            <SectionIndex no={no()}>{c.contactIndex}</SectionIndex>
            <h2>{c.contactTitle}</h2>
          </div>
          <div className="close__aside">
            <p>{c.contactText}</p>
            <span className="label">{brand.city[locale]}</span>
            <ArrowLink href={p("/contact")} strong>{ui.contactUs[locale]}</ArrowLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
