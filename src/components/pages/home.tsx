import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { ScaleSection } from "@/components/scale-section";
import { ArrowLink, AssetMedia, MediaPlaceholder, SectionIndex } from "@/components/primitives";
import { availableAssets, developmentProjects, portfolioAssets } from "@/lib/assets";
import { brand, localePath, ui, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    heroId: "acasa",
    title: ["Construim active.", "Creăm valoare", "pe termen lung."],
    lead: "Platformă imobiliară orientată spre investiții, dezvoltare și administrarea activelor, în Republica Moldova.",
    heroCta: "Descoperă portofoliul",
    introIndex: "MEGAPARC",
    introKicker: "Construim viitorul.",
    introTitle: ["Imobiliare privite", "ca"],
    introEm: "capital.",
    introText:
      "MEGAPARC dezvoltă, deține și administrează active imobiliare cu o perspectivă pe termen lung. Ne interesează nu doar clădirea, ci felul în care un activ funcționează, evoluează și rămâne relevant.",
    introCta: "Cum creăm valoare",
    manifestoEyebrow: "Mentalitate de proprietar pe termen lung",
    manifesto: ["Capitalul devine valoare când activul este gândit pentru", "termen lung."],
    manifestoNoteLabel: "Perspectivă investițională",
    manifestoNote: "Selecție disciplinată. Dezvoltare relevantă. Administrare activă.",
    modelIndex: "Model de creare a valorii",
    modelTitle: "Investiția continuă după achiziție.",
    modelText: "Strategie, dezvoltare și administrare reunite într-un singur ciclu de proprietate.",
    pillars: [
      ["Investim", "Selectăm oportunități imobiliare prin prisma potențialului lor de utilizare, dezvoltare și creare de valoare în timp."],
      ["Dezvoltăm", "Transformăm terenuri, clădiri și concepte în active relevante pentru oraș, utilizatori și capital."],
      ["Administrăm", "Privim exploatarea, leasingul și calitatea activului ca parte din aceeași decizie de investiție."],
    ],
    historyIndex: "Parcurs",
    historyYear: "2005",
    historyHeritage: ["Experiență investițională construită din 1995.", "MEGAPARC, fondată în 2005."],
    historyTitle: "Din 2005, transformăm active și dezvoltăm valoare pe termen lung.",
    historyText: "MEGAPARC a fost fondată în 2005, cu o strategie orientată spre achiziția și revitalizarea activelor comerciale amplasate strategic. Din 2020, strategia se concentrează pe sectorul imobiliar din Republica Moldova.",
    historyCta: "Descoperă parcursul MEGAPARC",
    portfolioIndex: "Portofoliu selectat",
    portfolioTitle: ["Active reale.", "Valoare construită în timp."],
    portfolioText:
      "Activele prezentate sunt deținute sau administrate de MEGAPARC. Prezentarea publică păstrează separat activele în exploatare, proiectele în dezvoltare și disponibilitățile comerciale.",
    portfolioFoot: "Operațional · Dezvoltare · Disponibilități",
    portfolioCta: "Vezi portofoliul",
    statementLabel: "MEGAPARC / Portofoliu",
    statement:
      "Nu tratăm proprietățile ca produse izolate. Le privim ca active care trebuie să funcționeze, să se adapteze și să-și păstreze relevanța în timp.",
    developmentIndex: "Dezvoltare",
    developmentTitle: ["De la oportunitate", "la activ durabil."],
    developmentText: "Dezvoltarea este privită ca parte din ciclul investițional: concept, execuție, utilizare și valoare pe termen lung.",
    developmentCta: "Explorează VATRA",
    availabilityIndex: "Disponibilități",
    availabilityEyebrow: "Disponibilități comerciale",
    availabilityTitle: ["Spațiul potrivit", "pentru următoarea etapă."],
    availabilityText: "Spații de birouri și retail disponibile în prezent în portofoliul MEGAPARC din Chișinău, prezentate separat de portofoliul instituțional.",
    availabilityCta: "Vezi toate disponibilitățile",
    principlesIndex: "Principii",
    principlesTitle: ["Valoarea nu este", "un rezultat întâmplător."],
    principles: [
      ["Disciplină", "Deciziile pornesc de la economie, utilizare și valoare pe termen lung."],
      ["Responsabilitate", "Administrăm activele cu mentalitatea proprietarului, nu doar a operatorului."],
      ["Perspectivă", "Construim pentru nevoile de astăzi fără a pierde din vedere relevanța de mâine."],
    ],
    registerIndex: "Prezență",
    registerTitle: ["Active ancorate", "în oraș."],
    registerText: "Portofoliul este prezentat în contextul în care funcționează: locație, utilizare și relația cu mediul urban.",
    registerCaption: "Registru public · Republica Moldova",
    precontact: "Construim active care rămân relevante.",
    contactIndex: "Contact",
    contactTitle: ["Construim", "ce urmează."],
    contactA: "Caut un spațiu",
    contactB: "Propun o proprietate",
    contactC: "Discuție corporate",
  },
  ru: {
    heroId: "home",
    title: ["Создаём активы.", "Формируем стоимость", "на долгий срок."],
    lead: "Платформа недвижимости, ориентированная на инвестиции, девелопмент и управление активами в Республике Молдова.",
    heroCta: "Смотреть портфель",
    introIndex: "MEGAPARC",
    introKicker: "Строим будущее.",
    introTitle: ["Недвижимость", "как"],
    introEm: "капитал.",
    introText:
      "MEGAPARC развивает, владеет и управляет объектами недвижимости с долгосрочной перспективой. Нас интересует не только здание, но и то, как актив работает, развивается и сохраняет свою актуальность.",
    introCta: "Как мы создаём стоимость",
    manifestoEyebrow: "Мышление долгосрочного собственника",
    manifesto: ["Капитал становится стоимостью, когда актив рассчитан на", "долгий срок."],
    manifestoNoteLabel: "Инвестиционный подход",
    manifestoNote: "Дисциплинированный отбор. Осмысленный девелопмент. Активное управление.",
    modelIndex: "Модель создания стоимости",
    modelTitle: "Инвестиция продолжается после приобретения.",
    modelText: "Стратегия, девелопмент и управление объединены в единый цикл владения.",
    pillars: [
      ["Инвестируем", "Отбираем объекты по потенциалу использования, развития и создания стоимости во времени."],
      ["Развиваем", "Превращаем участки, здания и идеи в активы, значимые для города, арендаторов и капитала."],
      ["Управляем", "Эксплуатацию, аренду и качество актива рассматриваем как часть одного инвестиционного решения."],
    ],
    historyIndex: "История",
    historyYear: "2005",
    historyHeritage: ["Инвестиционный опыт, формируемый с 1995 года.", "MEGAPARC основана в 2005 году."],
    historyTitle: "С 2005 года мы трансформируем активы и создаём долгосрочную стоимость.",
    historyText: "MEGAPARC была основана в 2005 году с фокусом на приобретении и ревитализации стратегически расположенных коммерческих активов. С 2020 года стратегический фокус сосредоточен на недвижимости в Республике Молдова.",
    historyCta: "История MEGAPARC",
    portfolioIndex: "Избранные активы",
    portfolioTitle: ["Реальные активы.", "Стоимость, созданная временем."],
    portfolioText:
      "Представленные активы находятся во владении или управлении MEGAPARC. В публичной презентации операционные активы, девелоперские проекты и коммерческие предложения показаны раздельно.",
    portfolioFoot: "Операционные · Девелопмент · Предложения",
    portfolioCta: "Смотреть портфель",
    statementLabel: "MEGAPARC / Портфель",
    statement:
      "Мы не рассматриваем объекты как изолированные продукты. Для нас это активы, которые должны работать, адаптироваться и сохранять актуальность во времени.",
    developmentIndex: "Девелопмент",
    developmentTitle: ["От возможности", "к устойчивому активу."],
    developmentText: "Девелопмент — часть инвестиционного цикла: концепция, реализация, использование и долгосрочная стоимость.",
    developmentCta: "Открыть VATRA",
    availabilityIndex: "Предложения",
    availabilityEyebrow: "Коммерческие предложения",
    availabilityTitle: ["Подходящее пространство", "для следующего этапа."],
    availabilityText: "Офисные и торговые помещения, доступные сейчас в портфеле MEGAPARC в Кишинёве, представлены отдельно от институционального портфеля.",
    availabilityCta: "Все предложения",
    principlesIndex: "Принципы",
    principlesTitle: ["Стоимость —", "не случайный результат."],
    principles: [
      ["Дисциплина", "Решения начинаются с экономики, назначения и долгосрочной стоимости."],
      ["Ответственность", "Управляем активами как собственник, а не только как оператор."],
      ["Перспектива", "Строим для сегодняшних потребностей, не теряя из виду актуальность завтрашнего дня."],
    ],
    registerIndex: "Присутствие",
    registerTitle: ["Активы, укоренённые", "в городе."],
    registerText: "Портфель представлен в контексте, в котором он работает: расположение, назначение и связь с городской средой.",
    registerCaption: "Публичный реестр · Республика Молдова",
    precontact: "Создаём активы, которые остаются актуальными.",
    contactIndex: "Контакты",
    contactTitle: ["Строим", "то, что дальше."],
    contactA: "Ищу помещение",
    contactB: "Предложить объект",
    contactC: "Корпоративный запрос",
  },
  en: {
    heroId: "home",
    title: ["We build assets.", "We create value", "for the long term."],
    lead: "A real estate platform focused on investment, development and active asset management in the Republic of Moldova.",
    heroCta: "Explore the portfolio",
    introIndex: "MEGAPARC",
    introKicker: "We build the future.",
    introTitle: ["Real estate viewed", "as"],
    introEm: "capital.",
    introText:
      "MEGAPARC develops, owns and manages real estate assets with a long-term perspective. We care not only about the building, but about how an asset performs, evolves and stays relevant.",
    introCta: "How we create value",
    manifestoEyebrow: "Long-term ownership mindset",
    manifesto: ["Capital becomes value when the asset is designed for the", "long term."],
    manifestoNoteLabel: "Investment perspective",
    manifestoNote: "Disciplined selection. Relevant development. Active management.",
    modelIndex: "Value-creation model",
    modelTitle: "Investment continues after acquisition.",
    modelText: "Strategy, development and management combined in one ownership cycle.",
    pillars: [
      ["Invest", "We select real estate opportunities for their potential to perform, evolve and create value over time."],
      ["Develop", "We transform land, buildings and ideas into assets that matter to cities, occupiers and capital."],
      ["Manage", "We treat operations, leasing and asset quality as one continuous investment decision."],
    ],
    historyIndex: "Our story",
    historyYear: "2005",
    historyHeritage: ["Investment experience built since 1995.", "MEGAPARC established in 2005."],
    historyTitle: "Since 2005, we have been transforming assets and building long-term value.",
    historyText: "MEGAPARC was established in 2005 with a strategy focused on acquiring and revitalising strategically located commercial assets. Since 2020, the strategic focus has been concentrated on real estate in the Republic of Moldova.",
    historyCta: "Explore our story",
    portfolioIndex: "Selected portfolio",
    portfolioTitle: ["Real assets.", "Value built over time."],
    portfolioText:
      "The assets shown are owned or managed by MEGAPARC. The public presentation keeps operating assets, development projects and commercial availability separate.",
    portfolioFoot: "Operating · Development · Availability",
    portfolioCta: "View the portfolio",
    statementLabel: "MEGAPARC / Portfolio",
    statement:
      "We do not treat properties as isolated products. We see them as assets that must perform, adapt and keep their relevance over time.",
    developmentIndex: "Development",
    developmentTitle: ["From opportunity", "to enduring asset."],
    developmentText: "Development is part of the investment cycle: concept, delivery, use and long-term value.",
    developmentCta: "Explore VATRA",
    availabilityIndex: "Availability",
    availabilityEyebrow: "Commercial opportunities",
    availabilityTitle: ["The right space", "for what comes next."],
    availabilityText: "Office and retail space currently available in the MEGAPARC Chișinău portfolio, presented separately from the institutional portfolio.",
    availabilityCta: "View all availability",
    principlesIndex: "Principles",
    principlesTitle: ["Value is not", "an accidental outcome."],
    principles: [
      ["Discipline", "Decisions begin with economics, use and long-term value."],
      ["Ownership", "We manage assets with an owner's mindset, not merely an operator's."],
      ["Perspective", "We build for today's needs without losing sight of tomorrow's relevance."],
    ],
    registerIndex: "Presence",
    registerTitle: ["Assets anchored", "in the city."],
    registerText: "The portfolio is presented in the context in which it operates: location, use and its relationship with the urban environment.",
    registerCaption: "Public register · Republic of Moldova",
    precontact: "We build assets that stay relevant.",
    contactIndex: "Contact",
    contactTitle: ["We build", "what comes next."],
    contactA: "Find a space",
    contactB: "Submit a property",
    contactC: "Corporate enquiry",
  },
} as const;

function AssetCaption({
  index,
  title,
  meta,
  positioning,
  href,
  locale,
}: {
  index: string;
  title: string;
  meta: string;
  positioning: string;
  href: string;
  locale: SiteLocale;
}) {
  return (
    <div className="asset-caption">
      <div>
        <span className="asset-caption__index">{index}</span>
        <div>
          <h3>{title}</h3>
          <span className="asset-caption__positioning">{positioning}</span>
        </div>
      </div>
      <div className="asset-caption__meta">
        <span>{meta}</span>
        <Link className="asset-caption__link" href={href}>{ui.exploreAsset[locale]} ↗</Link>
      </div>
    </div>
  );
}

export function HomePage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const [dacia, moscova9, moscova20, creanga] = portfolioAssets;
  const vatra = developmentProjects[0];
  const p = (path: string) => localePath(locale, path);

  return (
    <PageShell locale={locale} variant="overlay">
      <section className="hero" id={c.heroId}>
        <div className="hero__media" aria-hidden="true">
          <Image
            src={dacia.image!}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="hero__image"
            style={{ objectPosition: "52% 60%" }}
          />
          <div className="hero__overlay" />
        </div>

        <div className="hero__content shell">
          <div className="hero__title">
            <p className="hero__brandline">{brand.name}</p>
            <p className="hero__since" lang="en"><i aria-hidden="true" />{brand.since}</p>
            <h1>
              {c.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
          </div>

          <div className="hero__footer">
            <p>{c.lead}</p>
            <ArrowLink href={p("/portfolio")} inverse>{c.heroCta}</ArrowLink>
          </div>

          <a className="scroll-cue" href="#despre" aria-label={ui.scroll[locale]}>
            <span>{ui.scroll[locale]}</span>
            <i />
          </a>
        </div>
      </section>

      <section className="intro paper" id="despre">
        <div className="shell">
          <SectionIndex no="01">{c.introIndex}</SectionIndex>
          <div className="intro__grid" data-reveal>
            <p className="intro__kicker">{c.introKicker}</p>
            <h2>
              {c.introTitle[0]}
              <br />
              {c.introTitle[1]} <em>{c.introEm}</em>
            </h2>
            <div className="intro__copy">
              <p>{c.introText}</p>
              <ArrowLink href={p("/about")}>{c.introCta}</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className="manifesto paper" aria-label={c.manifestoEyebrow}>
        <div className="manifesto__track" aria-hidden="true">
          <span>OWN</span><i>·</i><span>DEVELOP</span><i>·</i><span>MANAGE</span><i>·</i><span>CREATE VALUE</span>
        </div>
        <div className="shell manifesto__grid" data-reveal>
          <p className="manifesto__eyebrow">{c.manifestoEyebrow}</p>
          <blockquote>
            {c.manifesto[0]} <em>{c.manifesto[1]}</em>
          </blockquote>
          <div className="manifesto__note">
            <span>{c.manifestoNoteLabel}</span>
            <p>{c.manifestoNote}</p>
          </div>
        </div>
      </section>

      <section className="model ink" id="model">
        <div className="shell">
          <SectionIndex no="02" inverse>{c.modelIndex}</SectionIndex>
          <div className="model__heading" data-reveal>
            <h2>{c.modelTitle}</h2>
            <p>{c.modelText}</p>
          </div>
          <div className="model__rows">
            {c.pillars.map(([title, text], index) => (
              <article className="model-row" key={title} data-reveal>
                <span className="model-row__no">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="model-row__arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ScaleSection locale={locale} no="03" />

      <section className="history-teaser paper">
        <div className="shell">
          <SectionIndex no="04">{c.historyIndex}</SectionIndex>
          <div className="history-teaser__grid" data-reveal>
            <div className="history-teaser__anchor">
              <span className="label label--red" lang="en">{brand.since}</span>
              <span className="history-teaser__year">{c.historyYear}</span>
            </div>
            <div>
              <p className="history-teaser__heritage">{c.historyHeritage[0]}<br />{c.historyHeritage[1]}</p>
              <p className="history-teaser__title">{c.historyTitle}</p>
              <p className="history-teaser__text">{c.historyText}</p>
              <ArrowLink href={`${p("/about")}#history`}>{c.historyCta}</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio paper" id="portofoliu">
        <div className="shell">
          <SectionIndex no="05">{c.portfolioIndex}</SectionIndex>
          <div className="portfolio__heading" data-reveal>
            <h2>
              {c.portfolioTitle[0]}
              <br />
              {c.portfolioTitle[1]}
            </h2>
            <p>{c.portfolioText}</p>
          </div>

          <article className="asset-feature" data-reveal>
            <AssetMedia src={dacia.image!} alt={`${dacia.name} — MEGAPARC`} position={dacia.imagePosition} sizes="92vw" />
            <AssetCaption index="01" title={dacia.name} positioning={dacia.positioning[locale]} meta={`${dacia.district[locale]} · ${dacia.city[locale]}`} href={p(`/portfolio/${dacia.slug}`)} locale={locale} />
          </article>

          <div className="asset-pair">
            <article className="asset-card asset-card--wide" data-reveal>
              <AssetMedia src={moscova9.image!} alt={`${moscova9.name} — MEGAPARC`} position={moscova9.imagePosition} sizes="(max-width: 720px) 92vw, 56vw" />
              <AssetCaption index="02" title={moscova9.name} positioning={moscova9.positioning[locale]} meta={`${moscova9.district[locale]} · ${moscova9.city[locale]}`} href={p(`/portfolio/${moscova9.slug}`)} locale={locale} />
            </article>
            <article className="asset-card asset-card--tall" data-reveal>
              <AssetMedia src={moscova20.image!} alt={`${moscova20.name} — MEGAPARC`} position={moscova20.imagePosition} sizes="(max-width: 720px) 92vw, 36vw" />
              <AssetCaption index="03" title={moscova20.name} positioning={moscova20.positioning[locale]} meta={`${moscova20.district[locale]} · ${moscova20.city[locale]}`} href={p(`/portfolio/${moscova20.slug}`)} locale={locale} />
            </article>
          </div>

          <article className="asset-card asset-card--placeholder" data-reveal>
            <MediaPlaceholder title={creanga.name} note={ui.photoPending[locale]} />
            <AssetCaption index="04" title={creanga.name} positioning={creanga.positioning[locale]} meta={creanga.city[locale]} href={p(`/portfolio/${creanga.slug}`)} locale={locale} />
          </article>

          <div className="portfolio__footer">
            <span>{c.portfolioFoot}</span>
            <ArrowLink href={p("/portfolio")}>{c.portfolioCta}</ArrowLink>
          </div>

          <div className="portfolio__statement" data-reveal>
            <span>{c.statementLabel}</span>
            <p>{c.statement}</p>
          </div>
        </div>
      </section>

      <section className="development" id="dezvoltare">
        <div className="development__media">
          <Image
            src={vatra.image!}
            alt={`${vatra.name} — MEGAPARC`}
            fill
            sizes="100vw"
            className="development__image"
            data-depth="24"
          />
          <div className="development__shade" />
        </div>
        <div className="development__content shell">
          <SectionIndex no="06" inverse>{c.developmentIndex}</SectionIndex>
          <div className="development__copy" data-reveal>
            <div>
              <p className="eyebrow eyebrow--red">{vatra.name} · {vatra.place[locale]}</p>
              <h2>
                {c.developmentTitle[0]}
                <br />
                {c.developmentTitle[1]}
              </h2>
            </div>
            <div className="development__aside">
              <p>{c.developmentText}</p>
              <div className="development__stages">
                {developmentProjects.map((project) => (
                  <Link key={project.slug} href={p(`/development/${project.slug}`)}>
                    <span>{project.name}</span>
                    <span>{project.status[locale]}</span>
                  </Link>
                ))}
              </div>
              <ArrowLink href={p("/development/vatra")} inverse>{c.developmentCta}</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className="availability paper" id="disponibilitati">
        <div className="shell">
          <SectionIndex no="07">{c.availabilityIndex}</SectionIndex>
          <div className="availability__grid" data-reveal>
            <div>
              <p className="eyebrow eyebrow--red">{c.availabilityEyebrow}</p>
              <h2>
                {c.availabilityTitle[0]}
                <br />
                {c.availabilityTitle[1]}
              </h2>
            </div>
            <div className="availability__copy">
              <p>{c.availabilityText}</p>
              <ArrowLink href={p("/opportunities")}>{c.availabilityCta}</ArrowLink>
            </div>
          </div>
          <div className="availability__list" data-reveal>
            {availableAssets.map((asset) => (
              <Link key={asset.slug} href={p(`/portfolio/${asset.slug}`)} className="availability__row">
                <span className="availability__name">{asset.name}</span>
                <span className="availability__meta">{asset.positioning[locale]} · {asset.district[locale]}</span>
                <span className="availability__area">{asset.availability!.area[locale]}</span>
                <span className="availability__from">{asset.availability!.from ? `${ui.availableFrom[locale]} ${asset.availability!.from[locale]}` : asset.availability!.headline[locale]}</span>
                <span className="availability__arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="principles ink">
        <div className="shell">
          <SectionIndex no="08" inverse>{c.principlesIndex}</SectionIndex>
          <div className="principles__heading" data-reveal>
            <h2>
              {c.principlesTitle[0]}
              <br />
              {c.principlesTitle[1]}
            </h2>
          </div>
          <div className="principles__grid">
            {c.principles.map(([title, text], index) => (
              <article key={title} data-reveal>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="register paper">
        <div className="shell register__grid">
          <div data-reveal>
            <SectionIndex no="09">{c.registerIndex}</SectionIndex>
            <h2>
              {c.registerTitle[0]}
              <br />
              {c.registerTitle[1]}
            </h2>
            <p>{c.registerText}</p>
          </div>
          <div className="register__list" data-reveal>
            {portfolioAssets.map((asset, index) => (
              <Link key={asset.slug} className="register__row" href={p(`/portfolio/${asset.slug}`)}>
                <span className="register__no">0{index + 1}</span>
                <span className="register__name">{asset.name}</span>
                <span className="register__meta">{asset.positioning[locale]}</span>
                <span className="register__meta">{asset.district.en === asset.city.en ? asset.city[locale] : `${asset.district[locale]} · ${asset.city[locale]}`}</span>
                <span className="register__arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
            {developmentProjects.map((project, index) => (
              <Link key={project.slug} className="register__row" href={p(`/development/${project.slug}`)}>
                <span className="register__no">0{portfolioAssets.length + index + 1}</span>
                <span className="register__name">{project.name}</span>
                <span className="register__meta">{project.status[locale]}</span>
                <span className="register__meta">{project.place[locale]}</span>
                <span className="register__arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
            <span className="register__caption">{c.registerCaption}</span>
          </div>
        </div>
      </section>

      <section className="precontact" aria-label={c.precontact}>
        <div className="precontact__media">
          <Image src={moscova9.image!} alt="" fill sizes="100vw" className="precontact__image" data-depth="20" />
          <div className="precontact__veil" />
        </div>
        <div className="shell precontact__content" data-reveal>
          <span>{brand.name} · {brand.city[locale]}</span>
          <p>{c.precontact}</p>
        </div>
      </section>

      <section className="contact ink" id="contact">
        <div className="shell">
          <SectionIndex no="10" inverse>{c.contactIndex}</SectionIndex>
          <div className="contact__grid" data-reveal>
            <h2>
              {c.contactTitle[0]}
              <br />
              {c.contactTitle[1]}
            </h2>
            <div className="contact__actions">
              <ArrowLink href={p("/opportunities")} inverse>{c.contactA}</ArrowLink>
              <ArrowLink href={p("/contact")} inverse>{c.contactB}</ArrowLink>
              <ArrowLink href={p("/contact")} inverse>{c.contactC}</ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
