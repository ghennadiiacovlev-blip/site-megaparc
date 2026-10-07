import { PageShell } from "@/components/page-shell";
import { ArtImage } from "@/components/primitives";
import { Button, TextLink } from "@/components/ui";
import { developmentProjects, portfolioAssets, type AssetMedia } from "@/lib/assets";
import { brandLayers } from "@/lib/brand";
import { scaleMetrics, type ScaleMetric } from "@/lib/metrics";
import { capitalCopy, publicFinancialMetrics } from "@/lib/public-financial-metrics";
import { capabilities, historyAnchors, historyCopy, mission, purpose, vision } from "@/lib/strategy";
import { brand, localePath, publicAsset, type SiteLocale } from "@/lib/site-data";

/**
 * ABOUT — editorial company history (2026-10-07).
 *
 * One story, told as a magazine spread rather than a corporate timeline:
 *   hero (brand image) · 1995 group heritage · 1996–1997 · image break ·
 *   2005 MEGAPARC established · 2006–2019 group experience · 2020 strategic
 *   real-estate focus (the strongest moment, with the page's red field) ·
 *   today · "value is created by decisions" + purpose / mission / vision ·
 *   closing (WE BUILD THE FUTURE).
 *
 * Public chronology (OWNER rule): 1995 = group heritage, 2005 = MEGAPARC
 * established, 2020 = strategic real-estate focus. Years come from
 * historyAnchors / historyCopy.supporting, never typed into JSX. The group
 * chapters (1995, 1996–1997, 2006–2019) speak about the group, not MEGAPARC.
 *
 * Images: brand / editorial frames (warm monochrome, scripts/brand-imagery.mjs)
 * for the hero, 1995, the break and 2006–2019 — never captioned as MEGAPARC
 * assets or archive photographs. Real MEGAPARC photographs for 2005
 * (Moscova 9), 2020 (VATRA) and today (Dacia 31), captioned as the current
 * portfolio so no date is implied.
 *
 * Editorial source: RU. RO and EN are adaptations.
 */

function brandMedia(key: string, { single = false, position }: { single?: boolean; position?: string } = {}): AssetMedia {
  const src = publicAsset(`/assets/brand/${key}.webp`);
  return { src, card: src, wide: src, mobile: single ? src : publicAsset(`/assets/brand/${key}-mobile.webp`), position };
}

const img = {
  hero: brandMedia("about-hero", { position: "50% 50%" }),
  heritage: brandMedia("about-1995", { single: true }),
  pause: brandMedia("about-break", { position: "50% 60%" }),
  trade: brandMedia("about-trade"),
};

type Lines = readonly string[];

const copy = {
  ro: {
    kicker: "Istoric",
    title: ["Experiența", "care ne-a condus", "spre imobiliare."],
    lead: (group: string, company: string, focus: string) => `Povestea grupului începe în ${group}, a MEGAPARC\u00a0— în\u00a0${company}. Din ${focus}, în centrul ei se află imobiliarele.`,
    index: "Cronologie",
    alt: {
      hero: "Arhitectură contemporană — imagine monocromă",
      heritage: "Turn din beton — detaliu arhitectural",
      pause: "Fațada unei clădiri înalte — vedere de jos",
      trade: "Terminal de containere — vedere de sus",
    },
    heritage: {
      title: "Începutul istoriei investiționale a grupului",
      text: "În 1995 începe parcursul antreprenorial al grupului: retail, investiții, producție. Pe această experiență se sprijină astăzi MEGAPARC.",
      quote: ["„Să vezi oportunitatea", "înainte ca ea să devină evidentă.”"] as Lines,
    },
    operating: {
      title: "De la capital la expertiză operațională",
      text: "Grupul intră în serviciile financiare și în agroindustrie. Pe lângă investiție apare a doua competență: administrarea unei afaceri în funcțiune.",
    },
    established: {
      title: "Apare MEGAPARC",
      text: "Este fondată MEGAPARC. Compania achiziționează și modernizează obiecte comerciale și privește fiecare clădire ca pe o afacere în funcțiune.",
      quote: ["„Valoarea unui obiect nu stă doar", "în cât costă.", "Contează cum funcționează.”"] as Lines,
      caption: (name: string) => `${name} · obiect din portofoliul actual`,
    },
    beyond: {
      title: "Experiență dincolo de un singur domeniu",
      text: "Domenii și piețe diferite învață același lucru: să calculezi economia în ansamblu și să vezi riscurile din timp.",
    },
    focus: {
      title: "Imobiliarele devin focusul strategic",
      text: "MEGAPARC se concentrează pe imobiliarele din Moldova: administrarea obiectelor, dezvoltare și modernizarea mediului urban.",
      quote: ["„Imobiliarele nu mai sunt", "una dintre direcțiile afacerii.", "Au devenit centrul ei.”"] as Lines,
      caption: (name: string) => `${name} · proiect de dezvoltare`,
    },
    today: {
      title: "Imobiliarele\u00a0— o activitate pe termen lung",
      text: "MEGAPARC investește în imobiliare, dezvoltă proiecte și administrează obiecte în funcțiune. Portofoliul actual al companiei se află în Moldova. Noile oportunități de investiții compania le analizează la nivel internațional.",
      verbs: ["Investește", "Dezvoltă", "Administrează", "Analizează noi oportunități"],
      links: [
        ["/portfolio", "Portofoliu"],
        ["/development", "Proiecte de dezvoltare"],
        ["/approach", "Abordarea noastră"],
      ],
    },
    value: {
      label: "Scop · Misiune · Viziune",
      quote: ["„Valoarea nu apare de la sine.", "O creează deciziile.”"] as Lines,
    },
    close: {
      title: ["Experiența trecutului.", "Focus pe viitor."],
      contact: "Discută un parteneriat",
      careers: "Cariere la MEGAPARC",
    },
  },
  ru: {
    kicker: "История",
    title: ["Опыт, который", "привёл нас", "к недвижимости."],
    lead: (group: string, company: string, focus: string) => `История группы начинается в\u00a0${group}\u00a0году, MEGAPARC\u00a0— в\u00a0${company}-м. С\u00a0${focus}\u00a0года центр этой истории\u00a0— недвижимость.`,
    index: "Хронология",
    alt: {
      hero: "Современная архитектура — монохромный кадр",
      heritage: "Бетонная башня — архитектурная деталь",
      pause: "Фасад высотного здания — вид снизу",
      trade: "Контейнерный терминал — вид сверху",
    },
    heritage: {
      title: "Начало инвестиционной истории группы",
      text: "В 1995 году начинается предпринимательская история группы: розница, инвестиции, производство. На этот опыт сегодня опирается MEGAPARC.",
      quote: ["«Видеть возможность раньше,", "чем она становится очевидной.»"] as Lines,
    },
    operating: {
      title: "От капитала\u00a0— к\u00a0операционной экспертизе",
      text: "Группа выходит в финансовые услуги и агропромышленный сектор. К умению вкладывать средства добавляется второе\u00a0— управлять работающим бизнесом.",
    },
    established: {
      title: "Появляется MEGAPARC",
      text: "Основана MEGAPARC. Компания покупает и модернизирует коммерческие объекты и оценивает каждое здание как работающий бизнес.",
      quote: ["«Объект ценен не только тем,", "сколько он стоит.", "Важно, как он работает.»"] as Lines,
      caption: (name: string) => `${name} · объект текущего портфеля`,
    },
    beyond: {
      title: "Опыт за пределами одной отрасли",
      text: "Разные отрасли и рынки учат одному: считать экономику целиком и видеть риски заранее.",
    },
    focus: {
      title: "Недвижимость становится стратегическим фокусом",
      text: "MEGAPARC сосредотачивается на недвижимости в Молдове: управление объектами, девелопмент и обновление городской среды.",
      quote: ["«Недвижимость перестала быть", "одним из направлений бизнеса.", "Она стала его центром.»"] as Lines,
      caption: (name: string) => `${name} · проект развития`,
    },
    today: {
      title: "Недвижимость как долгосрочная работа",
      text: "MEGAPARC инвестирует в недвижимость, развивает проекты и управляет действующими объектами. Действующий портфель компании находится в Молдове. Новые инвестиционные возможности компания рассматривает по всему миру.",
      verbs: ["Инвестирует", "Развивает", "Управляет", "Рассматривает новые возможности"],
      links: [
        ["/portfolio", "Портфель"],
        ["/development", "Проекты развития"],
        ["/approach", "Наш подход"],
      ],
    },
    value: {
      label: "Цель · Миссия · Видение",
      quote: ["«Стоимость не появляется сама.", "Её создают решения.»"] as Lines,
    },
    close: {
      title: ["Опыт прошлого.", "Фокус на будущем."],
      contact: "Обсудить партнёрство",
      careers: "Карьера в MEGAPARC",
    },
  },
  en: {
    kicker: "History",
    title: ["The experience", "that led us", "to real estate."],
    lead: (group: string, company: string, focus: string) => `The group's story begins in ${group}, MEGAPARC's in ${company}. Since ${focus}, real estate has been at its centre.`,
    index: "Chronology",
    alt: {
      hero: "Contemporary architecture — monochrome",
      heritage: "Concrete tower — architectural detail",
      pause: "High-rise facade seen from below",
      trade: "Container terminal from above",
    },
    heritage: {
      title: "The start of the group's investment story",
      text: "In 1995 the group's entrepreneurial story begins: retail, investment, manufacturing. MEGAPARC builds on that experience today.",
      quote: ["“Seeing an opportunity", "before it becomes obvious.”"] as Lines,
    },
    operating: {
      title: "From capital to operating expertise",
      text: "The group moves into financial services and agro-industry. Alongside investing comes a second skill: running an operating business.",
    },
    established: {
      title: "MEGAPARC arrives",
      text: "MEGAPARC is founded. The company buys and modernises commercial properties and judges every building as an operating business.",
      quote: ["“A property is not valued only", "by what it costs.", "What matters is how it works.”"] as Lines,
      caption: (name: string) => `${name} · current portfolio`,
    },
    beyond: {
      title: "Experience beyond a single industry",
      text: "Different industries and markets teach the same lesson: look at the economics as a whole and see risks early.",
    },
    focus: {
      title: "Real estate becomes the strategic focus",
      text: "MEGAPARC concentrates on real estate in Moldova: property management, development and urban renewal.",
      quote: ["“Real estate stopped being", "one line of the business.", "It became its centre.”"] as Lines,
      caption: (name: string) => `${name} · development project`,
    },
    today: {
      title: "Real estate as long-term\u00a0work",
      text: "MEGAPARC invests in real estate, develops projects and manages operating properties. The company's current portfolio is in Moldova. It considers new investment opportunities worldwide.",
      verbs: ["Invests", "Develops", "Manages", "Considers new opportunities"],
      links: [
        ["/portfolio", "Portfolio"],
        ["/development", "Development projects"],
        ["/approach", "Our approach"],
      ],
    },
    value: {
      label: "Purpose · Mission · Vision",
      quote: ["“Value does not appear on its own.", "Decisions create it.”"] as Lines,
    },
    close: {
      title: ["Experience of the past.", "Focus on the future."],
      contact: "Discuss a partnership",
      careers: "Careers at MEGAPARC",
    },
  },
} as const;

function formatNumber(value: number, locale: SiteLocale, pad = 0) {
  const s = new Intl.NumberFormat(locale === "en" ? "en-GB" : locale === "ru" ? "ru-RU" : "ro-RO").format(value);
  return pad ? s.padStart(pad, "0") : s;
}

/** Fixed line breaks from 720px; on phones the lines run on as one sentence. */
function Broken({ lines }: { lines: Lines }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={line}>
          {line}
          {i < lines.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

function Quote({ lines, className = "" }: { lines: Lines; className?: string }) {
  return (
    <blockquote className={`hx-quote ${className}`.trim()} data-reveal>
      <p>
        <Broken lines={lines} />
      </p>
    </blockquote>
  );
}

export function AboutPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);

  const [heritage, established, focus] = historyAnchors;
  const [early, diversification, trade] = historyCopy.supporting;
  const beyondSpan = `${diversification.year.split("–")[0]}–${trade.year.split("–")[1]}`;
  const today = historyCopy.today[locale];
  const group = historyCopy.group[locale];

  const moscova9 = portfolioAssets.find((asset) => asset.slug === "moscova-9")!;
  const dacia31 = portfolioAssets.find((asset) => asset.slug === "dacia-31")!;
  const vatra = developmentProjects.find((project) => project.slug === "vatra")!;

  const metrics = scaleMetrics();
  const byKey = (key: string) => metrics.find((metric) => metric.key === key);
  const figures = [byKey("operating"), byKey("projects"), byKey("land")].filter((metric): metric is ScaleMetric => Boolean(metric));
  const figureNote: Record<string, string> = {
    operating: dacia31.city[locale],
    projects: developmentProjects.map((project) => project.name).join(" · "),
    land: [byKey("land")?.secondary?.[locale], developmentProjects.find((project) => project.slug === "drochia-gateway")?.name].filter(Boolean).join(" · "),
  };

  const chapters = [
    { id: "y1995", mark: heritage.year },
    { id: "y1996", mark: early.year },
    { id: "y2005", mark: established.year },
    { id: "y2006", mark: beyondSpan },
    { id: "y2020", mark: focus.year },
    { id: "today", mark: today },
  ];

  return (
    <PageShell locale={locale}>
      {/* HERO — brand architecture, the story's title, a chapter index */}
      <section className="hx-hero" aria-labelledby="hx-title">
        <div className="hx-hero__media">
          <ArtImage media={img.hero} alt={c.alt.hero} priority depth={10} position={img.hero.position} />
        </div>
        <span className="hx-hero__veil" aria-hidden="true" />
        <div className="shell hx-hero__copy" data-reveal>
          <p className="hx-kicker hx-kicker--light">{c.kicker}</p>
          <h1 className="hx-hero__title" id="hx-title">
            <Broken lines={c.title} />
          </h1>
          <div className="hx-hero__foot">
            <p className="hx-hero__lead">{c.lead(heritage.year, established.year, focus.year)}</p>
            <nav className="hx-index" aria-label={c.index}>
              <ol>
                {chapters.map((chapter) => (
                  <li key={chapter.id}>
                    <a href={`#${chapter.id}`}>{chapter.mark}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </section>

      {/* 1995 — group heritage: the year as an object beside a concrete tower */}
      <section className="hx-ch hx-ch--paper hx-1995" id="y1995" aria-labelledby="t-1995">
        <div className="shell hx-1995__grid">
          <div className="hx-1995__head" data-reveal>
            <p className="hx-scope">{group}</p>
            <p className="hx-year hx-year--xl" aria-hidden="true">{heritage.year}</p>
          </div>
          <div className="hx-1995__copy" data-reveal>
            <h2 className="hx-title" id="t-1995">
              <span className="sr-only">{heritage.year}. </span>
              {c.heritage.title}
            </h2>
            <p className="hx-text">{c.heritage.text}</p>
          </div>
          <figure className="hx-fig hx-1995__fig" data-reveal>
            <div className="hx-media hx-media--portrait">
              <ArtImage media={img.heritage} alt={c.alt.heritage} depth={12} sizes="(min-width: 900px) 40vw, 80vw" />
            </div>
          </figure>
          <Quote lines={c.heritage.quote} className="hx-1995__quote" />
        </div>
      </section>

      {/* 1996–1997 — from capital to operating expertise (typographic) */}
      <section className="hx-ch hx-ch--paper hx-ch--cont" id="y1996" aria-labelledby="t-1996">
        <div className="shell hx-row" data-reveal>
          <p className="hx-scope hx-row__scope">{group}</p>
          <p className="hx-year hx-year--md hx-row__year" aria-hidden="true">{early.year}</p>
          <div className="hx-row__body">
            <h2 className="hx-title" id="t-1996">
              <span className="sr-only">{early.year}. </span>
              {c.operating.title}
            </h2>
            <p className="hx-text">{c.operating.text}</p>
          </div>
        </div>
      </section>

      {/* IMAGE BREAK — brand architecture, no text */}
      <figure className="hx-break">
        <ArtImage media={img.pause} alt={c.alt.pause} depth={16} position={img.pause.position} />
      </figure>

      {/* 2005 — MEGAPARC established: red year, a real portfolio property */}
      <section className="hx-ch hx-ch--graphite hx-2005" id="y2005" aria-labelledby="t-2005">
        <div className="shell hx-2005__grid">
          <div className="hx-2005__head" data-reveal>
            <p className="hx-scope">{brand.name}</p>
            <p className="hx-year hx-year--lg hx-year--red" aria-hidden="true">{established.year}</p>
            <h2 className="hx-title" id="t-2005">
              <span className="sr-only">{established.year}. </span>
              {c.established.title}
            </h2>
            <p className="hx-text">{c.established.text}</p>
          </div>
          <figure className="hx-fig hx-2005__fig" data-reveal>
            <div className="hx-media hx-media--land hx-media--bleed">
              <ArtImage media={moscova9.media!} alt={`${moscova9.name} — ${moscova9.positioning[locale]}`} depth={12} sizes="(min-width: 900px) 55vw, 100vw" />
            </div>
            <figcaption className="hx-cap">{c.established.caption(moscova9.name)}</figcaption>
          </figure>
          <Quote lines={c.established.quote} className="hx-2005__quote" />
        </div>
      </section>

      {/* 2006–2019 — group experience beyond one industry */}
      <section className="hx-ch hx-ch--paper hx-2006" id="y2006" aria-labelledby="t-2006">
        <div className="shell hx-2006__grid">
          <div className="hx-2006__copy" data-reveal>
            <p className="hx-scope">{group}</p>
            <p className="hx-year hx-year--md" aria-hidden="true">{beyondSpan}</p>
            <h2 className="hx-title" id="t-2006">
              <span className="sr-only">{beyondSpan}. </span>
              {c.beyond.title}
            </h2>
            <p className="hx-text">{c.beyond.text}</p>
          </div>
          <figure className="hx-fig hx-2006__fig" data-reveal>
            <div className="hx-media hx-media--wide hx-media--bleed">
              <ArtImage media={img.trade} alt={c.alt.trade} depth={12} sizes="(min-width: 900px) 58vw, 100vw" />
            </div>
          </figure>
          <dl className="hx-periods hx-2006__periods" data-reveal>
            {[diversification, trade].map((period) => (
              <div key={period.year}>
                <dt>{period.year}</dt>
                <dd>
                  <strong>{period.title[locale]}</strong>
                  <span>{period.text[locale]}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 2020 — the strongest moment: three words and the page's red field */}
      <section className="hx-ch hx-ch--ink hx-2020" id="y2020" aria-labelledby="t-2020">
        <div className="shell">
          <div className="hx-2020__head" data-reveal>
            <div>
              <p className="hx-scope">{brand.name}</p>
              <p className="hx-year hx-year--xl" aria-hidden="true">{focus.year}</p>
            </div>
            <div className="hx-2020__intro">
              <h2 className="hx-title" id="t-2020">
                <span className="sr-only">{focus.year}. </span>
                {c.focus.title}
              </h2>
              <p className="hx-text">{c.focus.text}</p>
            </div>
          </div>
          <ol className="hx-focus">
            {capabilities.map((capability) => (
              <li key={capability.no} data-reveal>
                <span className="hx-focus__no">{capability.no}</span>
                <span className="hx-focus__word">{capability.title[locale]}</span>
                <span className="hx-focus__text">{capability.text[locale]}</span>
              </li>
            ))}
          </ol>
          <div className="hx-2020__close">
            <figure className="hx-fig hx-2020__fig" data-reveal>
              <div className="hx-media hx-media--wide hx-media--bleed">
                <ArtImage media={vatra.media!} alt={`${vatra.name} — ${vatra.status[locale]}`} depth={12} position="50% 100%" sizes="(min-width: 900px) 70vw, 100vw" />
                <figcaption className="hx-cap hx-cap--over">{c.focus.caption(vatra.name)}</figcaption>
              </div>
            </figure>
            <blockquote className="hx-red" data-reveal>
              <p>
                <Broken lines={c.focus.quote} />
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* TODAY — real portfolio, verified scale, review-only key figures */}
      <section className="hx-ch hx-ch--white hx-today" id="today" aria-labelledby="t-today">
        <div className="shell">
          <div className="hx-today__head" data-reveal>
            <p className="hx-scope">{brand.name}</p>
            <p className="hx-year hx-year--word" aria-hidden="true">{today}</p>
            <h2 className="hx-title" id="t-today">
              <span className="sr-only">{today}. </span>
              {c.today.title}
            </h2>
            <p className="hx-text">{c.today.text}</p>
          </div>
          <figure className="hx-fig hx-today__fig" data-reveal>
            <div className="hx-media hx-media--hero hx-media--bleed">
              <ArtImage media={dacia31.media!} alt={`${dacia31.name} — ${dacia31.positioning[locale]}`} depth={14} position={dacia31.media!.position} />
            </div>
            <figcaption className="hx-cap">{dacia31.name} · {dacia31.city[locale]}</figcaption>
          </figure>
          <dl className="hx-figures" data-reveal>
            {figures.map((metric) => (
              <div key={metric.key} className={metric.key === "land" ? "is-wide" : undefined}>
                <dt>{metric.label[locale]}</dt>
                <dd className="hx-figures__value">
                  {formatNumber(metric.value, locale, metric.pad)}
                  {metric.plus ? <b>+</b> : null}
                  {metric.unit ? <small>{metric.unit[locale]}</small> : null}
                </dd>
                <dd className="hx-figures__note">{figureNote[metric.key]}</dd>
              </div>
            ))}
          </dl>
          <p className="hx-scope hx-today__kicker">{capitalCopy.kicker[locale]}</p>
          <dl className="hx-figures hx-figures--small" data-reveal>
            {publicFinancialMetrics.map((metric) => (
              <div key={metric.key} data-temporary={metric.temporary ? "true" : undefined}>
                <dt>{metric.label[locale]}</dt>
                <dd className="hx-figures__value">{metric.display}</dd>
              </div>
            ))}
          </dl>
          <div className="hx-today__foot" data-reveal>
            <ul className="hx-verbs">
              {c.today.verbs.map((verb) => (
                <li key={verb}>{verb}</li>
              ))}
            </ul>
            <div className="hx-links">
              {c.today.links.map(([path, label]) => (
                <TextLink key={path} href={p(path)}>{label}</TextLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUE — "value is created by decisions" + purpose / mission / vision */}
      <section className="hx-ch hx-ch--paper hx-value" aria-label={c.value.label}>
        <div className="shell">
          <blockquote className="hx-statement" data-reveal>
            <p>
              <Broken lines={c.value.quote} />
            </p>
          </blockquote>
          <dl className="hx-pmv" data-reveal>
            {[purpose, mission, vision].map((item) => (
              <div key={item.title.en}>
                <dt>{item.title[locale]}</dt>
                <dd>{item.text[locale]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CLOSING — experience of the past, focus on the future */}
      <section className="hx-ch hx-ch--ink hx-close" aria-labelledby="t-close">
        <div className="shell hx-close__inner" data-reveal>
          <h2 className="hx-close__title" id="t-close">
            <Broken lines={c.close.title} />
          </h2>
          <p className="hx-close__brand">{brandLayers.statement.en}</p>
          <div className="hx-close__actions">
            <Button href={`${p("/contact")}#partnership`} variant="light">{c.close.contact}</Button>
            <TextLink href={p("/careers")} className="tlink--light">{c.close.careers}</TextLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
