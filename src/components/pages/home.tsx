import Image from "next/image";
import Link from "next/link";
import { Bleed, ClosingFrame, Figures, ImageFacts, Index, Moment, Movement, PropertyList, PropertyRow, Split, Statement, Timeline, type Figure } from "@/components/editorial";
import { CountUp } from "@/components/count-up";
import { PageShell } from "@/components/page-shell";
import { ArrowLink } from "@/components/primitives";
import { developmentProjects, portfolioAssets } from "@/lib/assets";
import { signatureWords } from "@/lib/brand";
import { openVacancies } from "@/lib/careers";
import { clientJourneys } from "@/lib/client-journeys";
import { scaleMetrics, portfolioMetrics } from "@/lib/metrics";
import { capitalCopy, publicFinancialMetrics } from "@/lib/public-financial-metrics";
import { developmentNarrative, investmentMandate } from "@/lib/strategy";
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

  const scale: Figure[] = scaleMetrics().map((metric) => ({
    key: metric.key,
    value: (
      <>
        <CountUp value={metric.value} locale={locale} pad={metric.pad} />
        {metric.plus ? <b>+</b> : null}
        {metric.unit ? <small>{metric.unit[locale]}</small> : null}
      </>
    ),
    label: metric.label[locale],
    note: metric.secondary?.[locale],
  }));
  scale.push({ key: "since", value: <>{portfolioMetrics.heritageSince}</>, label: `${brand.name} · since`, note: undefined });

  const capital: Figure[] = publicFinancialMetrics.map((metric) => ({
    key: metric.key,
    value: (
      <span data-temporary={metric.temporary ? "true" : undefined}>
        {metric.display.endsWith("+") ? metric.display.slice(0, -1) : metric.display}
        {metric.display.endsWith("+") ? <b>+</b> : null}
      </span>
    ),
    label: metric.label[locale],
    note: metric.note[locale],
    small: true,
  }));

  return (
    <PageShell locale={locale}>
      {/* 01 HERO — editorial opening spread: text left, dominant frame bleeding right, one fragment */}
      <section className="hero6 white" id={c.heroId}>
        <div className="shell hero6__grid">
          <div className="hero6__copy" data-reveal>
            <p className="hero6__brand"><span>{brand.name}</span><i aria-hidden="true" /><span lang="en">{brand.since}</span></p>
            <h1 className="hero6__title">
              <span>{c.title[0]}</span>
              <span>{c.title[1]}</span>
            </h1>
            <p className="hero6__line">{c.line}</p>
            <p className="hero6__lead">{c.lead}</p>
            <div className="hero6__actions">
              <ArrowLink href={p("/portfolio")} strong>{c.ctaA}</ArrowLink>
              <ArrowLink href={`${p("/contact")}#opportunity`}>{c.ctaB}</ArrowLink>
            </div>
          </div>
          <figure className="hero6__main" data-reveal>
            <Image src={img.heroStreet} alt={c.heroAlt[0]} fill priority sizes="(max-width: 900px) 100vw, 62vw" data-depth="10" />
            <figcaption>{c.heroCaption[0]}</figcaption>
          </figure>
          <figure className="hero6__frag" data-reveal>
            <Image src={img.heroLand} alt={c.heroAlt[1]} fill priority sizes="(max-width: 900px) 46vw, 24vw" />
            <figcaption>{c.heroCaption[1]}</figcaption>
          </figure>
        </div>
      </section>

      {/* 02 WHAT WE DO — statement + typographic trio (no cards) */}
      <Movement tone="white" id="what-we-do">
        <div className="shell">
          <Statement no="01" kicker={c.doIndex} title={c.doTitle} text={c.doText} size="xl" />
          <ol className="trio" data-reveal>
            {c.do.map(([title, text, path, label], index) => (
              <li key={title}>
                <Link href={p(path)} className="trio__item">
                  <span className="trio__no">0{index + 1}</span>
                  <span className="trio__title">{title}</span>
                  <span className="trio__text">{text}</span>
                  <span className="trio__cta">{label}<i aria-hidden="true">↗</i></span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </Movement>

      {/* 03 INVESTMENT FOCUS — one large block, two medium, one typographic */}
      <Movement tone="stone" id="investment-focus">
        <div className="shell">
          <Statement no="02" kicker={c.focusIndex} title={c.focusTitle} text={c.focusText} />
          <div className="focus6">
            <Link href={`${p("/opportunities")}#submit-opportunity`} className="focus6__block focus6__block--a" data-reveal>
              <span className="focus6__visual"><Image src={img.focusIncome} alt="" fill sizes="(max-width: 900px) 100vw, 64vw" /><i className="focus6__line" aria-hidden="true" /></span>
              <span className="focus6__body"><span className="focus6__no">01</span><span className="focus6__title">{c.focus[0][0]}</span><span className="focus6__text">{c.focus[0][1]}</span></span>
            </Link>
            <Link href={`${p("/opportunities")}#submit-opportunity`} className="focus6__block focus6__block--b" data-reveal>
              <span className="focus6__visual"><Image src={img.focusSites} alt="" fill sizes="(max-width: 900px) 50vw, 32vw" /><i className="focus6__line" aria-hidden="true" /></span>
              <span className="focus6__body"><span className="focus6__no">02</span><span className="focus6__title">{c.focus[1][0]}</span><span className="focus6__text">{c.focus[1][1]}</span></span>
            </Link>
            <Link href={`${p("/opportunities")}#submit-opportunity`} className="focus6__block focus6__block--c" data-reveal>
              <span className="focus6__visual"><Image src={img.focusReposition} alt="" fill sizes="(max-width: 900px) 50vw, 32vw" /><i className="focus6__line" aria-hidden="true" /></span>
              <span className="focus6__body"><span className="focus6__no">03</span><span className="focus6__title">{c.focus[2][0]}</span><span className="focus6__text">{c.focus[2][1]}</span></span>
            </Link>
            <Link href={`${p("/opportunities")}#discuss-partnership`} className="focus6__block focus6__block--d" data-reveal>
              <span className="focus6__type">
                <span className="focus6__no">04</span>
                <span className="focus6__big">{c.focus[3][0]}</span>
                <span className="focus6__text">{c.focus[3][1]}</span>
                <span className="focus6__cta">{c.focusCta}<i aria-hidden="true">↗</i></span>
              </span>
            </Link>
          </div>
        </div>
      </Movement>

      {/* 04 WHERE WE INVEST — full-bleed architecture with one statement */}
      <Bleed
        media={{ src: img.heroCity, alt: c.worldAlt, position: "50% 45%" }}
        label={`${c.worldIndex} · ${c.worldLabel}`}
        statement={investmentMandate.statement[locale].join(" ")}
        height="screen"
      >
        <div className="bleed__foot">
          <p>{c.worldText}</p>
          <ArrowLink href={`${p("/contact")}#opportunity`} inverse>{c.worldCta}</ArrowLink>
        </div>
      </Bleed>

      {/* 05 FIGURES — black institutional movement, numbers as typographic objects */}
      <Movement tone="ink" id="scale" label={c.scaleIndex}>
        <div className="shell">
          <Statement no="03" kicker={c.scaleIndex} title={c.scaleTitle} inverse size="md" />
          <Figures items={scale} inverse columns={scale.length} />
          <div className="figures__sub" data-reveal>
            <Index inverse>{capitalCopy.kicker[locale]}</Index>
            <Figures items={capital} inverse columns={4} />
          </div>
          <p className="figures__note">{c.scaleNote}</p>
        </div>
      </Movement>

      {/* 06 SELECTED PORTFOLIO — three stories, three proportions */}
      <Movement tone="white" id="portofoliu">
        <div className="shell">
          <Statement no="04" kicker={c.selIndex} title={c.selTitle} text={c.selText}>
            <ArrowLink href={p("/portfolio")}>{c.selCta}</ArrowLink>
          </Statement>
          <div className="stories">
            {[
              { asset: moscova9, src: moscova9.media!.src, cls: "stories__item--main", sizes: "(max-width: 900px) 100vw, 62vw" },
              { asset: moscova20, src: moscova20.media!.mobile, cls: "stories__item--tall", sizes: "(max-width: 900px) 100vw, 34vw" },
              { asset: dacia, src: dacia.media!.wide, cls: "stories__item--strip", sizes: "100vw" },
            ].map(({ asset, src, cls, sizes }) => (
              <Link key={asset.slug} href={p(`/portfolio/${asset.slug}`)} className={`stories__item ${cls}`} data-reveal>
                <span className="stories__visual">
                  <Image src={src} alt={`${asset.name} — ${asset.positioning[locale]}`} fill sizes={sizes} style={{ objectPosition: asset.media!.position }} data-depth="12" />
                  <i className="stories__line" aria-hidden="true" />
                </span>
                <span className="stories__caption">
                  <span className="stories__name">{asset.name}</span>
                  <span className="stories__meta">{asset.district[locale]} · {asset.city[locale]} · {asset.positioning[locale]}</span>
                  <span className="stories__text">{asset.headline[locale]}</span>
                  <i className="stories__arrow" aria-hidden="true">↗</i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Movement>

      {/* 07 DEVELOPMENT — large image with floating facts, thin timeline, concept row */}
      <Movement tone="paper" id="dezvoltare">
        <div className="shell">
          <Statement no="05" kicker={c.devIndex} title={c.devTitle} text={c.devText} />
          <ImageFacts
            media={{ src: vatra.media!.wide, alt: c.devAlt, position: vatra.media!.position }}
            ratio="21 / 9"
            label={vatra.kind[locale]}
            title={vatra.name}
            text={vatra.lead[locale]}
            facts={[
              { label: ui.status[locale], value: vatra.status[locale] },
              { label: ui.location[locale], value: vatra.place[locale] },
              { label: ui.stage[locale], value: `${stage.no} · ${stage.title[locale]}` },
            ]}
            href={p(`/development/${vatra.slug}`)}
            cta={ui.exploreProject[locale]}
          />
          <Timeline
            label={developmentNarrative.title[locale]}
            items={developmentNarrative.stages.map((s, i) => ({ key: s.no, mark: s.no, title: s.title[locale], current: i === vatra.stage }))}
          />
          <PropertyList>
            <PropertyRow
              href={p(`/development/${drochia.slug}`)}
              index="02"
              compact
              name={drochia.name}
              place={drochia.place[locale]}
              kind={c.concept}
              line={drochia.headline[locale]}
              meta={drochia.status[locale]}
              cta={ui.exploreProject[locale]}
            />
          </PropertyList>
          <div className="mv__foot" data-reveal>
            <ArrowLink href={p("/development")}>{c.devCta}</ArrowLink>
          </div>
        </div>
      </Movement>

      {/* 08 RED MOMENT */}
      <Moment words={signatureWords[locale]} label={brand.since} text={brand.tagline[locale] + "."} />

      {/* 09 PEOPLE — architectural street scene, verified open roles */}
      <Movement tone="stone" id="people">
        <Split media={{ src: img.people, alt: c.peopleAlt }} ratio="3 / 2" flip align="center">
          <Index no="06">{c.peopleIndex}</Index>
          <h2 className="split__title">{c.peopleTitle}</h2>
          <p className="split__text">{c.peopleText}</p>
          <div className="split__list">
            <span className="idx idx--plain"><span className="idx__no">{c.peopleRoles(openVacancies.length)}</span></span>
            <ul>
              {openVacancies.slice(0, 3).map((vacancy) => (
                <li key={vacancy.slug}>{vacancy.title[locale]}</li>
              ))}
            </ul>
          </div>
          <ArrowLink href={p("/careers")}>{c.peopleCta}</ArrowLink>
        </Split>
      </Movement>

      {/* 10 CLOSING FRAME */}
      <ClosingFrame
        id="contact"
        kicker={c.contactIndex}
        title={c.contactTitle}
        text={c.contactText}
        links={[
          ...clientJourneys.map((journey) => ({ href: `${p(journey.path)}#${journey.anchor}`, label: journey.title[locale] })),
          { href: p("/contact"), label: ui.contactUs[locale], strong: true },
        ]}
        note={brand.city[locale]}
      />
    </PageShell>
  );
}
