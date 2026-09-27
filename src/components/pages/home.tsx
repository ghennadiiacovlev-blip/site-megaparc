import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Band, Button, Head, Hero, Icon, Intro, Kicker, Quote, Section, Split, Story, TextLink } from "@/components/ui";
import { developmentProjects, portfolioAssets } from "@/lib/assets";
import { openVacancies } from "@/lib/careers";
import { clientJourneys } from "@/lib/client-journeys";
import { developmentNarrative } from "@/lib/strategy";
import { brand, localePath, publicAsset, ui, type SiteLocale } from "@/lib/site-data";

/**
 * HOME — Art Direction v6 (Yellow Tree level, 2026-09-27).
 * Ten movements, ten formats: editorial hero · statement + trio · investment
 * focus composition · full-bleed statement · figures in black · portfolio
 * stories · development image + facts · red moment · people scene · closing frame.
 */

const img = {
  heroStreet: publicAsset("/assets/home/hero-street.webp"),
  heroLand: publicAsset("/assets/home/hero-land.webp"),
  doInvest: publicAsset("/assets/home/do-invest.webp"),
  doDevelop: publicAsset("/assets/home/do-develop.webp"),
  heroCity: publicAsset("/assets/home/hero-city.webp"),
  focusIncome: publicAsset("/assets/home/focus-income.webp"),
  focusSites: publicAsset("/assets/home/focus-sites.webp"),
  focusReposition: publicAsset("/assets/home/focus-reposition.webp"),
  people: publicAsset("/assets/home/people.webp"),
};

const copy = {
  ro: {
    heroId: "acasa",
    title: ["Investim în imobiliare.", "Creăm valoare."],
    line: "Investiții · Dezvoltare · Administrare imobiliară",
    lead: "Cumpărăm și dezvoltăm imobiliare comerciale, administrăm obiecte în funcțiune și analizăm noi oportunități la nivel internațional.",
    ctaA: "Vezi portofoliul",
    ctaB: "Propune un obiect",
    heroAlt: ["Front comercial pe bulevard, Chișinău", "Teren de dezvoltare pe malul apei", "Context urban, Chișinău"],
    heroCaption: ["Chișinău · obiect în funcțiune", "Teren de dezvoltare"],
    doIndex: "Ce facem",
    doTitle: "Investim, dezvoltăm și administrăm imobiliare.",
    doText: "Trei direcții care lucrează ca un singur proces: de la decizia de investiție până la exploatarea obiectului.",
    do: [
      ["Investiții", "Căutăm obiecte cu o economie clară și potențial de creștere a valorii.", "/approach", "Cum investim"],
      ["Dezvoltare", "Dezvoltăm proiecte de la teren și concept până la obiectul finalizat.", "/development", "Proiecte"],
      ["Administrarea activelor", "Creștem calitatea obiectelor, eficiența exploatării și atractivitatea lor pe termen lung.", "/portfolio", "Portofoliu"],
    ],
    focusIndex: "Focus de investiții",
    focusTitle: "Ce ne interesează",
    focusText: "Obiecte generatoare de venit, terenuri de dezvoltare și proiecte în care se poate crea valoare suplimentară.",
    focus: [
      ["Imobiliare generatoare de venit", "Obiecte comerciale cu chiriași și venit stabil."],
      ["Terenuri de dezvoltare", "Terenuri cu o logică urbană clară și posibilitate de realizare."],
      ["Repoziționarea obiectelor existente", "Clădiri cărora li se poate da o nouă destinație sau un nou standard."],
      ["Proiecte comune și parteneriate", "Proiecte alături de proprietari, dezvoltatori și investitori."],
    ],
    focusCta: "Propune un obiect",
    worldIndex: "Geografie",
    worldLabel: "Piețe internaționale",
    worldText: "Analizăm imobiliare generatoare de venit, terenuri de dezvoltare, proiecte de repoziționare și investiții comune, acolo unde înțelegem economia, riscurile și potențialul obiectului.",
    worldCta: "Propune un obiect",
    worldAlt: "Chișinău, context urban",
    scaleIndex: "Portofoliul în cifre",
    scaleTitle: "Obiecte în funcțiune, teren de dezvoltare și trei decenii de experiență.",
    scaleNote: "Suprafețele sunt prezentate pe tipuri distincte și nu sunt însumate. Terenul pentru dezvoltare include amplasamentul Drochia Gateway.",
    selIndex: "Obiecte selectate din portofoliu",
    selTitle: "Activele MEGAPARC",
    selText: "Obiecte comerciale în funcțiune, în Chișinău.",
    selCta: "Toate obiectele",
    devIndex: "Dezvoltare",
    devTitle: "Dezvoltăm imobiliare de la idee la obiect în funcțiune.",
    devText: "VATRA este un amplasament în lucru, prezentat așa cum este. Drochia Gateway este un concept la intrarea în oraș, aflat în verificare.",
    devCta: "Vezi proiectele",
    devAlt: "VATRA — teren de dezvoltare, vedere aeriană",
    concept: "Concept în evaluare",
    peopleIndex: "Echipă",
    peopleTitle: "Lucrați cu noi.",
    peopleText: "MEGAPARC reunește investițiile, finanțele, dezvoltarea, administrarea imobiliară și exploatarea. Posturile deschise sunt publicate pe Rabota.md.",
    peopleRoles: (n: number) => `${String(n).padStart(2, "0")} posturi deschise`,
    peopleCta: "Cariere la MEGAPARC",
    peopleAlt: "Bulevard cu flux pietonal, Chișinău",
    contactIndex: "Contact",
    contactTitle: "Cum putem colabora",
    contactText: "Închiriere de spații, propunerea unui obiect, investiții și parteneriat, carieră.",
  },
  ru: {
    heroId: "home",
    title: ["Инвестируем в недвижимость.", "Создаём стоимость."],
    line: "Инвестиции · Девелопмент · Управление недвижимостью",
    lead: "Покупаем и развиваем коммерческую недвижимость, управляем действующими объектами и рассматриваем новые возможности по всему миру.",
    ctaA: "Смотреть портфель",
    ctaB: "Предложить объект",
    heroAlt: ["Торговый фасад на бульваре, Кишинёв", "Площадка под развитие у воды", "Городская среда, Кишинёв"],
    heroCaption: ["Кишинёв · действующий объект", "Площадка под развитие"],
    doIndex: "Что мы делаем",
    doTitle: "Инвестируем, развиваем и управляем недвижимостью.",
    doText: "Три направления работают как единый процесс: от инвестиционного решения до эксплуатации объекта.",
    do: [
      ["Инвестиции", "Ищем объекты с понятной экономикой и потенциалом роста стоимости.", "/approach", "Как мы инвестируем"],
      ["Девелопмент", "Развиваем проекты от площадки и концепции до готового объекта.", "/development", "Проекты"],
      ["Управление активами", "Повышаем качество объектов, эффективность эксплуатации и их долгосрочную востребованность.", "/portfolio", "Портфель"],
    ],
    focusIndex: "Инвестиционный фокус",
    focusTitle: "Что нас интересует",
    focusText: "Доходные объекты, площадки под развитие и проекты, где можно создать дополнительную стоимость.",
    focus: [
      ["Доходная недвижимость", "Коммерческие объекты с арендаторами и стабильным доходом."],
      ["Площадки под развитие", "Участки с понятной городской логикой и возможностью реализации."],
      ["Репозиционирование существующих объектов", "Здания, которым можно дать новое назначение или новый стандарт."],
      ["Совместные проекты и партнёрства", "Проекты вместе с собственниками, девелоперами и инвесторами."],
    ],
    focusCta: "Предложить объект",
    worldIndex: "География",
    worldLabel: "Международные рынки",
    worldText: "Рассматриваем доходную недвижимость, площадки под развитие, проекты для репозиционирования и совместные инвестиции — там, где понимаем экономику, риски и потенциал объекта.",
    worldCta: "Предложить объект",
    worldAlt: "Кишинёв, городская среда",
    scaleIndex: "Портфель в цифрах",
    scaleTitle: "Действующие объекты, земля под развитие и три десятилетия опыта.",
    scaleNote: "Площади показаны по отдельным категориям и не суммируются. Земля под развитие включает участок Drochia Gateway.",
    selIndex: "Избранные объекты портфеля",
    selTitle: "Активы MEGAPARC",
    selText: "Действующие коммерческие объекты в Кишинёве.",
    selCta: "Все объекты",
    devIndex: "Девелопмент",
    devTitle: "Развиваем недвижимость от идеи до работающего объекта.",
    devText: "VATRA — площадка в работе, показанная как есть. Drochia Gateway — концепция на въезде в город, которая проходит проверку.",
    devCta: "Смотреть проекты",
    devAlt: "VATRA — площадка под развитие, вид с воздуха",
    concept: "Концепция на стадии оценки",
    peopleIndex: "Команда",
    peopleTitle: "Работайте с нами.",
    peopleText: "MEGAPARC объединяет инвестиции, финансы, девелопмент, управление недвижимостью и эксплуатацию. Открытые вакансии опубликованы на Rabota.md.",
    peopleRoles: (n: number) => `${String(n).padStart(2, "0")} открытых вакансий`,
    peopleCta: "Карьера в MEGAPARC",
    peopleAlt: "Бульвар с пешеходным потоком, Кишинёв",
    contactIndex: "Контакты",
    contactTitle: "Чем мы можем быть полезны",
    contactText: "Аренда помещений, предложение объектов, инвестиции и партнёрство, карьера.",
  },
  en: {
    heroId: "home",
    title: ["We invest in real estate.", "We create value."],
    line: "Investment · Development · Asset Management",
    lead: "We buy and develop commercial real estate, manage operating properties and consider new opportunities worldwide.",
    ctaA: "View the portfolio",
    ctaB: "Submit a property",
    heroAlt: ["Boulevard retail frontage, Chișinău", "Waterside development site", "Urban setting, Chișinău"],
    heroCaption: ["Chișinău · operating property", "Development site"],
    doIndex: "What we do",
    doTitle: "We invest in, develop and manage real estate.",
    doText: "Three areas that work as one process: from the investment decision to the operation of the property.",
    do: [
      ["Investment", "We look for properties with clear economics and potential for value growth.", "/approach", "How we invest"],
      ["Development", "We take projects from site and concept to a completed building.", "/development", "Projects"],
      ["Asset management", "We improve the quality, operating efficiency and long-term appeal of our properties.", "/portfolio", "Portfolio"],
    ],
    focusIndex: "Investment focus",
    focusTitle: "What we look for",
    focusText: "Income-producing properties, development sites and projects where additional value can be created.",
    focus: [
      ["Income-producing real estate", "Commercial properties with tenants and stable income."],
      ["Development sites", "Land with a clear urban logic and a realistic path to delivery."],
      ["Repositioning of existing buildings", "Buildings that can be given a new use or a new standard."],
      ["Joint projects and partnerships", "Projects alongside owners, developers and investors."],
    ],
    focusCta: "Submit a property",
    worldIndex: "Geography",
    worldLabel: "International markets",
    worldText: "We consider income-producing real estate, development sites, repositioning projects and joint investments, wherever we understand the economics, the risks and the potential of the property.",
    worldCta: "Submit a property",
    worldAlt: "Chișinău, urban setting",
    scaleIndex: "The portfolio in numbers",
    scaleTitle: "Operating properties, development land and three decades of experience.",
    scaleNote: "Areas are presented by type and are not added together. Development land includes the Drochia Gateway site.",
    selIndex: "Selected properties",
    selTitle: "MEGAPARC assets",
    selText: "Operating commercial properties in Chișinău.",
    selCta: "All properties",
    devIndex: "Development",
    devTitle: "We take real estate from idea to a working building.",
    devText: "VATRA is a site under way, shown as it is. Drochia Gateway is a concept at the entrance to the town, currently under review.",
    devCta: "View the projects",
    devAlt: "VATRA — development site, aerial view",
    concept: "Concept under evaluation",
    peopleIndex: "Team",
    peopleTitle: "Work with us.",
    peopleText: "MEGAPARC brings together investment, finance, development, asset management and operations. Open vacancies are published on Rabota.md.",
    peopleRoles: (n: number) => `${String(n).padStart(2, "0")} open vacancies`,
    peopleCta: "Careers at MEGAPARC",
    peopleAlt: "Boulevard with pedestrian flow, Chișinău",
    contactIndex: "Contact",
    contactTitle: "How we can work together",
    contactText: "Leasing, property proposals, investment and partnership, careers.",
  },
} as const;

export function HomePage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);
  const [dacia, moscova9, moscova20] = portfolioAssets;
  const [vatra, drochia] = developmentProjects;
  const stage = developmentNarrative.stages[vatra.stage];
  const meta = (asset: typeof dacia) => [asset.district[locale], asset.city[locale], asset.positioning[locale]];

  return (
    <PageShell locale={locale}>
      {/* 01 HERO — architecture first: full viewport, short copy over the image */}
      <Hero
        id={c.heroId}
        media={{ src: img.heroStreet, alt: c.heroAlt[0], position: "50% 55%" }}
        title={<>{c.title[0]}<br />{c.title[1]}</>}
        line={c.line}
        action={
          <>
            <Button href={p("/portfolio")} variant="light">{c.ctaA}</Button>
            <TextLink href={`${p("/contact")}#opportunity`} className="tlink--light">{c.ctaB}</TextLink>
          </>
        }
        caption={c.heroCaption[0]}
      />

      {/* 02 SHORT COMPANY INTRODUCTION */}
      <Intro kicker={`${brand.name} · ${brand.since}`} statement={c.lead} />

      {/* 03 LARGE ARCHITECTURE IMAGE */}
      <Band media={{ src: img.heroCity, alt: c.worldAlt, position: "50% 45%" }} caption={c.worldAlt} />

      {/* 04 WHAT WE DO — three different compositions */}
      <Split media={{ src: img.doInvest, alt: c.do[0][0] }} id="what-we-do">
        <Kicker>{c.doIndex} · 01</Kicker>
        <h2 className="h2">{c.do[0][0]}</h2>
        <p>{c.do[0][1]}</p>
        <TextLink href={p(c.do[0][2])}>{c.do[0][3]}</TextLink>
      </Split>
      <Split media={{ src: img.doDevelop, alt: c.do[1][0] }} flip tone="paper">
        <Kicker>{c.doIndex} · 02</Kicker>
        <h2 className="h2">{c.do[1][0]}</h2>
        <p>{c.do[1][1]}</p>
        <TextLink href={p(c.do[1][2])}>{c.do[1][3]}</TextLink>
      </Split>
      <Quote tone="ink" kicker={`${c.doIndex} · 03`} statement={c.do[2][0]} text={c.do[2][1]} action={<Button href={p(c.do[2][2])} variant="light">{c.do[2][3]}</Button>} />

      {/* 05 SELECTED PORTFOLIO — editorial property stories */}
      <Section id="portofoliu">
        <div className="shell">
          <Head kicker={c.selIndex} title={c.selTitle} text={c.selText} />
          <div className="stories">
            <Story layout="wide" href={p(`/portfolio/${moscova9.slug}`)} media={{ src: moscova9.media!.wide, alt: `${moscova9.name} — ${moscova9.positioning[locale]}`, position: moscova9.media!.position }} name={moscova9.name} meta={meta(moscova9)} line={moscova9.headline[locale]} cta={ui.exploreAsset[locale]} />
            <Story layout="right" href={p(`/portfolio/${moscova20.slug}`)} media={{ src: moscova20.media!.mobile, alt: `${moscova20.name} — ${moscova20.positioning[locale]}`, position: moscova20.media!.position }} name={moscova20.name} meta={meta(moscova20)} line={moscova20.headline[locale]} cta={ui.exploreAsset[locale]} />
            <Story layout="left" href={p(`/portfolio/${dacia.slug}`)} media={{ src: dacia.media!.card, alt: `${dacia.name} — ${dacia.positioning[locale]}`, position: dacia.media!.position }} name={dacia.name} meta={meta(dacia)} line={dacia.headline[locale]} cta={ui.exploreAsset[locale]} />
          </div>
          <div className="sec__foot" data-reveal>
            <Button href={p("/portfolio")} variant="ghost">{c.selCta}</Button>
          </div>
        </div>
      </Section>

      {/* 06 INVESTMENT OPPORTUNITIES */}
      <Section tone="paper" id="investment-focus">
        <div className="shell focus" data-reveal>
          <Head kicker={c.focusIndex} title={c.focusTitle} text={c.focusText} />
          <ul className="list">
            {c.focus.map(([title, text]) => (
              <li key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <div className="sec__actions">
            <Button href={`${p("/contact")}#opportunity`}>{c.focusCta}</Button>
            <TextLink href={p("/opportunities")}>{ui.viewOpportunities[locale]}</TextLink>
          </div>
        </div>
      </Section>

      {/* 07 DEVELOPMENT FEATURE — VATRA large, Drochia Gateway secondary */}
      <section className="feature" id="dezvoltare">
        <div className="feature__media">
          <Image src={vatra.media!.wide} alt={c.devAlt} fill sizes="100vw" style={{ objectFit: "cover", objectPosition: vatra.media!.position }} data-depth="14" />
        </div>
        <div className="feature__veil" aria-hidden="true" />
        <div className="shell feature__copy" data-reveal>
          <Kicker className="kicker--light">{c.devIndex} · {vatra.kind[locale]}</Kicker>
          <h2 className="feature__title">{vatra.name}</h2>
          <p className="feature__text">{vatra.headline[locale]}</p>
          <p className="feature__stage">{ui.stage[locale]} {stage.no} · {stage.title[locale]}</p>
          <div className="hero__actions">
            <Button href={p(`/development/${vatra.slug}`)} variant="light">{ui.exploreProject[locale]}</Button>
          </div>
        </div>
      </section>
      <Section tone="white" tight>
        <div className="shell">
          <Link href={p(`/development/${drochia.slug}`)} className="concept-row" data-reveal>
            <span className="concept-row__tag">{c.concept}</span>
            <span className="concept-row__name">{drochia.name}</span>
            <span className="concept-row__meta">{drochia.place[locale]} · {drochia.status[locale]}</span>
            <Icon name="arrow" size={18} className="concept-row__arrow" />
          </Link>
        </div>
      </Section>

      {/* 08 PEOPLE / CAREERS */}
      <Split media={{ src: img.people, alt: c.peopleAlt }} flip tone="paper" id="people" ratio="4 / 3">
        <Kicker>{c.peopleIndex}</Kicker>
        <h2 className="h2">{c.peopleTitle}</h2>
        <p>{c.peopleText}</p>
        <p className="meta">{c.peopleRoles(openVacancies.length)}</p>
        <Button href={p("/careers")}>{c.peopleCta}</Button>
      </Split>

      {/* 09 CONTACT / CLOSING */}
      <Quote
        tone="ink"
        id="contact"
        kicker={c.contactIndex}
        statement={c.contactTitle}
        text={c.contactText}
        action={
          <>
            <Button href={p("/contact")} variant="light">{ui.contactUs[locale]}</Button>
            <ul className="quote__links">
              {clientJourneys.map((journey) => (
                <li key={journey.key}>
                  <TextLink href={`${p(journey.path)}#${journey.anchor}`} className="tlink--light">{journey.title[locale]}</TextLink>
                </li>
              ))}
            </ul>
          </>
        }
      />
    </PageShell>
  );
}
