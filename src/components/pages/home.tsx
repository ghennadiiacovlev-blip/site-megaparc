import Link from "next/link";
import { CompanyFacts } from "@/components/company-facts";
import { PageShell } from "@/components/page-shell";
import { ArtImage } from "@/components/primitives";
import { Button, Head, Hero, Icon, Intro, Kicker, Section, Split, TextLink } from "@/components/ui";
import { developmentProjects, portfolioAssets, type AssetMedia } from "@/lib/assets";
import { openVacancies } from "@/lib/careers";
import { clientJourneys } from "@/lib/client-journeys";
import { developmentNarrative, investmentMandate } from "@/lib/strategy";
import { brand, localePath, publicAsset, ui, type SiteLocale } from "@/lib/site-data";

/**
 * HOME — imagery and portfolio-logic correction (2026-09-27).
 *
 * Image strategy (OWNER instruction):
 *   - hero and the two large editorial sections use BRAND imagery
 *     (premium architecture / urban atmosphere, CC0, scripts/brand-imagery.mjs);
 *     they are never named, captioned or linked as MEGAPARC properties;
 *   - Selected portfolio and Development use the real MEGAPARC photographs.
 *
 * Structure: hero · intro · what we do (three cards) · company facts (dark
 * fact board: 1995 · 2005 · 2020, verified scale, model signature) · selected
 * portfolio (three property cards) · development (VATRA, real) · where we
 * invest (brand band) · work with us (three journeys) · closing (brand band +
 * contact).
 */

function brandMedia(key: string, position?: string): AssetMedia {
  const src = publicAsset(`/assets/brand/${key}.webp`);
  return { src, card: src, wide: src, mobile: publicAsset(`/assets/brand/${key}-mobile.webp`), position };
}

const img = {
  hero: brandMedia("hero-glass", "50% 50%"),
  city: brandMedia("city-dusk", "50% 45%"),
  close: brandMedia("facade-grid", "50% 40%"),
};

const copy = {
  ro: {
    heroId: "acasa",
    title: ["Investim în imobiliare.", "Creăm valoare."],
    line: "Investiții · Dezvoltare · Administrare imobiliară",
    lead: "Cumpărăm și dezvoltăm imobiliare comerciale, administrăm obiecte în funcțiune și analizăm noi oportunități la nivel internațional.",
    ctaA: "Vezi portofoliul",
    ctaB: "Propune un obiect",
    heroAlt: "Arhitectură contemporană — fațadă de sticlă",
    cityAlt: "Siluetă urbană la apus",
    closeAlt: "Fațadă modernă — detaliu",
    doIndex: "Ce facem",
    doTitle: "Investim, dezvoltăm și administrăm imobiliare.",
    doText: "Trei direcții care lucrează ca un singur proces: de la decizia de investiție până la exploatarea obiectului.",
    do: [
      ["Investiții", "Căutăm obiecte cu o economie clară și potențial de creștere a valorii.", "/approach", "Cum investim"],
      ["Dezvoltare", "Dezvoltăm proiecte de la teren și concept până la obiectul finalizat.", "/development", "Proiecte"],
      ["Administrarea activelor", "Creștem calitatea obiectelor, eficiența exploatării și atractivitatea lor pe termen lung.", "/portfolio", "Portofoliu"],
    ],
    selIndex: "Obiecte selectate din portofoliu",
    selTitle: "Activele MEGAPARC",
    selText: "Obiecte comerciale în funcțiune, în Chișinău.",
    selCount: (n: number) => `${String(n).padStart(2, "0")} obiecte în funcțiune`,
    devIndex: "Dezvoltare",
    devTitle: "Dezvoltăm imobiliare de la idee la obiect în funcțiune.",
    devText: "VATRA este un amplasament în lucru, prezentat așa cum este. Drochia Gateway este un concept la intrarea în oraș, aflat în verificare.",
    devCta: "Vezi proiectele",
    devAlt: "VATRA — teren de dezvoltare, vedere aeriană",
    concept: "Concept în evaluare",
    workIndex: "Colaborare",
    workTitle: "Cum putem colabora",
    workText: "Închiriere de spații, propunerea unui obiect, investiții și parteneriat.",
    peopleRoles: (n: number) => `${String(n).padStart(2, "0")} posturi deschise`,
    peopleCta: "Cariere la MEGAPARC",
    closeIndex: "Contact",
    closeTitle: "Discutați cu MEGAPARC despre spații, obiecte și parteneriate.",
  },
  ru: {
    heroId: "home",
    title: ["Инвестируем в недвижимость.", "Создаём стоимость."],
    line: "Инвестиции · Девелопмент · Управление недвижимостью",
    lead: "Покупаем и развиваем коммерческую недвижимость, управляем действующими объектами и рассматриваем новые возможности по всему миру.",
    ctaA: "Смотреть портфель",
    ctaB: "Предложить объект",
    heroAlt: "Современная архитектура — стеклянный фасад",
    cityAlt: "Городской силуэт на закате",
    closeAlt: "Современный фасад — фрагмент",
    doIndex: "Что мы делаем",
    doTitle: "Инвестируем, развиваем и управляем недвижимостью.",
    doText: "Три направления работают как единый процесс: от инвестиционного решения до эксплуатации объекта.",
    do: [
      ["Инвестиции", "Ищем объекты с понятной экономикой и потенциалом роста стоимости.", "/approach", "Как мы инвестируем"],
      ["Девелопмент", "Развиваем проекты от площадки и концепции до готового объекта.", "/development", "Проекты"],
      ["Управление активами", "Повышаем качество объектов, эффективность эксплуатации и их долгосрочную востребованность.", "/portfolio", "Портфель"],
    ],
    selIndex: "Избранные объекты портфеля",
    selTitle: "Активы MEGAPARC",
    selText: "Действующие коммерческие объекты в Кишинёве.",
    selCount: (n: number) => `${String(n).padStart(2, "0")} действующих объекта`,
    devIndex: "Девелопмент",
    devTitle: "Развиваем недвижимость от идеи до работающего объекта.",
    devText: "VATRA — площадка в работе, показанная как есть. Drochia Gateway — концепция на въезде в город, которая проходит проверку.",
    devCta: "Смотреть проекты",
    devAlt: "VATRA — площадка под развитие, вид с воздуха",
    concept: "Концепция на стадии оценки",
    workIndex: "Сотрудничество",
    workTitle: "Чем мы можем быть полезны",
    workText: "Аренда помещений, предложение объектов, инвестиции и партнёрство.",
    peopleRoles: (n: number) => `${String(n).padStart(2, "0")} открытых вакансий`,
    peopleCta: "Карьера в MEGAPARC",
    closeIndex: "Контакты",
    closeTitle: "Обсудите с MEGAPARC помещения, объекты и партнёрство.",
  },
  en: {
    heroId: "home",
    title: ["We invest in real estate.", "We create value."],
    line: "Investment · Development · Asset Management",
    lead: "We buy and develop commercial real estate, manage operating properties and consider new opportunities worldwide.",
    ctaA: "View the portfolio",
    ctaB: "Submit a property",
    heroAlt: "Contemporary architecture — glass facade",
    cityAlt: "City skyline at dusk",
    closeAlt: "Modern facade — detail",
    doIndex: "What we do",
    doTitle: "We invest in, develop and manage real estate.",
    doText: "Three areas that work as one process: from the investment decision to the operation of the property.",
    do: [
      ["Investment", "We look for properties with clear economics and potential for value growth.", "/approach", "How we invest"],
      ["Development", "We take projects from site and concept to a completed building.", "/development", "Projects"],
      ["Asset management", "We improve the quality, operating efficiency and long-term appeal of our properties.", "/portfolio", "Portfolio"],
    ],
    selIndex: "Selected properties",
    selTitle: "MEGAPARC assets",
    selText: "Operating commercial properties in Chișinău.",
    selCount: (n: number) => `${String(n).padStart(2, "0")} operating properties`,
    devIndex: "Development",
    devTitle: "We take real estate from idea to a working building.",
    devText: "VATRA is a site under way, shown as it is. Drochia Gateway is a concept at the entrance to the town, currently under review.",
    devCta: "View the projects",
    devAlt: "VATRA — development site, aerial view",
    concept: "Concept under evaluation",
    workIndex: "Work with us",
    workTitle: "How we can work together",
    workText: "Leasing, property proposals, investment and partnership.",
    peopleRoles: (n: number) => `${String(n).padStart(2, "0")} open vacancies`,
    peopleCta: "Careers at MEGAPARC",
    closeIndex: "Contact",
    closeTitle: "Talk to MEGAPARC about spaces, properties and partnerships.",
  },
} as const;

export function HomePage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);
  const [dacia, moscova9, moscova20] = portfolioAssets;
  const [vatra, drochia] = developmentProjects;
  const stage = developmentNarrative.stages[vatra.stage];
  const featured = [moscova9, moscova20, dacia];
  const mandate = investmentMandate.statement[locale];

  return (
    <PageShell locale={locale}>
      {/* 01 HERO — brand architecture image (not a MEGAPARC property), short copy, two CTAs */}
      <Hero
        id={c.heroId}
        media={{ src: img.hero.src, alt: c.heroAlt }}
        title={<>{c.title[0]}<br />{c.title[1]}</>}
        line={c.line}
        action={
          <>
            <Button href={p("/portfolio")} variant="light">{c.ctaA}</Button>
            <Button href={`${p("/contact")}#opportunity`} variant="ghost-light">{c.ctaB}</Button>
          </>
        }
      >
        <ArtImage media={img.hero} alt={c.heroAlt} priority depth={10} position={img.hero.position} />
      </Hero>

      {/* 02 SHORT INTRO */}
      <Intro kicker={`${brand.name} · ${brand.since}`} statement={c.lead} />

      {/* 03 WHAT WE DO — three editorial cards */}
      <Section tone="paper" id="what-we-do">
        <div className="shell">
          <Head kicker={c.doIndex} title={c.doTitle} text={c.doText} />
          <ol className="cards">
            {c.do.map(([title, text, path, label], i) => (
              <li key={title} className="card" data-reveal>
                <span className="card__no">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="card__title">{title}</h3>
                <p>{text}</p>
                <TextLink href={p(path)}>{label}</TextLink>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* 03b COMPANY FACTS — black / graphite / burgundy / red fact board */}
      <CompanyFacts locale={locale} />

      {/* 04 SELECTED PORTFOLIO — real MEGAPARC photographs, clear property cards */}
      <Section id="portofoliu">
        <div className="shell">
          <Head kicker={c.selIndex} title={c.selTitle} text={c.selText}>
            <p className="head__meta">{c.selCount(portfolioAssets.length)}</p>
          </Head>
          <ul className="pcards">
            {featured.map((asset) => (
              <li key={asset.slug}>
                <Link href={p(`/portfolio/${asset.slug}`)} className="pcard" data-reveal>
                  <span className="pcard__media">
                    <ArtImage media={asset.media!} alt={`${asset.name} — ${asset.positioning[locale]}`} depth={12} sizes="(min-width: 720px) 33vw, 100vw" />
                  </span>
                  <span className="pcard__head">
                    <span className="pcard__name">{asset.name}</span>
                    <Icon name="arrow" size={18} className="pcard__arrow" />
                  </span>
                  <span className="pcard__meta">{asset.district[locale]} · {asset.city[locale]}</span>
                  <span className="pcard__type">{asset.positioning[locale]}</span>
                  <span className="pcard__line">{asset.headline[locale]}</span>
                  <span className="pcard__cta">{ui.exploreAsset[locale]}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="sec__foot" data-reveal>
            <Button href={p("/portfolio")}>{ui.allAssets[locale]}</Button>
          </div>
        </div>
      </Section>

      {/* 05 DEVELOPMENT — VATRA (real aerial), separate from the operating assets */}
      <Split media={{ src: vatra.media!.card, alt: c.devAlt, position: vatra.media!.position }} tone="paper" id="dezvoltare" href={p(`/development/${vatra.slug}`)} caption={`${vatra.name} · ${ui.stage[locale]} ${stage.no} · ${stage.title[locale]}`}>
        <Kicker>{c.devIndex}</Kicker>
        <h2 className="h2">{c.devTitle}</h2>
        <p>{c.devText}</p>
        <ul className="split__list">
          <li>
            <TextLink href={p(`/development/${vatra.slug}`)}>{vatra.name} · {vatra.status[locale]}</TextLink>
          </li>
          <li>
            <TextLink href={p(`/development/${drochia.slug}`)}>{drochia.name} · {c.concept}</TextLink>
          </li>
        </ul>
        <Button href={p("/development")}>{c.devCta}</Button>
      </Split>

      {/* 06 WHERE WE INVEST — brand city image, simple worldwide wording */}
      <figure className="band band--statement band--brand" id="geografie">
        <ArtImage media={img.city} alt={c.cityAlt} depth={16} position={img.city.position} />
        <span className="band__veil" aria-hidden="true" />
        <div className="shell band__statement" data-reveal>
          <Kicker className="kicker--light">{investmentMandate.kicker[locale]}</Kicker>
          <p>{mandate[0]}<br />{mandate[1]}</p>
          <span className="band__text">{investmentMandate.text[locale]}</span>
          <div className="hero__actions">
            <Button href={`${p("/contact")}#opportunity`} variant="light">{c.ctaB}</Button>
            <TextLink href={p("/approach")} className="tlink--light">{ui.viewApproach[locale]}</TextLink>
          </div>
        </div>
      </figure>

      {/* 07 WORK WITH US — lease · propose a property · partnership */}
      <Section id="colaborare">
        <div className="shell">
          <Head kicker={c.workIndex} title={c.workTitle} text={c.workText} />
          <ol className="cards cards--line">
            {clientJourneys.map((journey) => (
              <li key={journey.key} className="card" data-reveal>
                <span className="card__no">{journey.no}</span>
                <h3 className="card__title">{journey.scenario[locale]}</h3>
                <p>{journey.lead[locale]}</p>
                <TextLink href={`${p(journey.path)}#${journey.anchor}`}>{journey.cta[locale]}</TextLink>
              </li>
            ))}
          </ol>
          <p className="sec__note" data-reveal>
            <span className="meta">{c.peopleRoles(openVacancies.length)}</span>
            <TextLink href={p("/careers")}>{c.peopleCta}</TextLink>
          </p>
        </div>
      </Section>

      {/* 08 CLOSING — brand facade image + contact */}
      <figure className="band band--statement band--brand band--close" id="contact">
        <ArtImage media={img.close} alt={c.closeAlt} depth={14} position={img.close.position} />
        <span className="band__veil" aria-hidden="true" />
        <div className="shell band__statement" data-reveal>
          <Kicker className="kicker--light">{c.closeIndex}</Kicker>
          <p>{c.closeTitle}</p>
          <div className="hero__actions">
            <Button href={p("/contact")} variant="light">{ui.contactUs[locale]}</Button>
            <TextLink href={p("/opportunities")} className="tlink--light">{ui.viewOpportunities[locale]}</TextLink>
          </div>
        </div>
      </figure>
    </PageShell>
  );
}
