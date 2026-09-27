import { PageShell } from "@/components/page-shell";
import { Button, Head, Hero, Intro, Quote, Rows, Section, TextLink, Years } from "@/components/ui";
import { portfolioAssets } from "@/lib/assets";
import { brandLayers } from "@/lib/brand";
import { portfolioMetrics, scaleMetrics } from "@/lib/metrics";
import { capitalCopy, publicFinancialMetrics } from "@/lib/public-financial-metrics";
import { capabilities, historyAnchors, historyCopy, mission, purpose, responsibility, vision } from "@/lib/strategy";
import { organisationAreas, peopleCopy } from "@/lib/team";
import { brand, localePath, type SiteLocale } from "@/lib/site-data";

/**
 * ABOUT — editorial story: who we are → large architectural image →
 * 1995 / 2005 / 2020 / today as a horizontal timeline → what we do today →
 * organisation → closing statement.
 */
const copy = {
  ro: {
    eyebrow: "Despre",
    title: ["Despre", "MEGAPARC"],
    lead: "MEGAPARC este o companie din domeniul imobiliar care investește, dezvoltă proiecte și administrează active. Compania a fost fondată în 2005 și se bazează pe experiența antreprenorială a grupului din 1995.",
    imageCaption: "Moscova 20 · obiect în funcțiune",
    historyIndex: "Istoric",
    historyTitle: "Trei decenii de experiență.",
    todayIndex: "Astăzi",
    todayTitle: "Investiții, dezvoltare și administrare imobiliară.",
    todayText: "Astăzi MEGAPARC administrează obiecte în funcțiune, dezvoltă proiecte noi și analizează oportunități de investiții la nivel internațional.",
    missionIndex: "Scop · Misiune · Viziune",
    careers: "Cariere la MEGAPARC",
    responsibilityCta: "Abordarea noastră",
    contactCta: "Discută un parteneriat",
    links: [
      ["/approach", "Cum investim"],
      ["/development", "Proiecte"],
      ["/portfolio", "Portofoliu"],
    ],
  },
  ru: {
    eyebrow: "О компании",
    title: ["О компании", "MEGAPARC"],
    lead: "MEGAPARC — компания в сфере недвижимости, которая инвестирует, развивает проекты и управляет активами. Компания основана в 2005 году и опирается на предпринимательский опыт группы с 1995 года.",
    imageCaption: "Moscova 20 · действующий объект",
    historyIndex: "История",
    historyTitle: "Три десятилетия опыта.",
    todayIndex: "Сегодня",
    todayTitle: "Инвестиции, девелопмент и управление недвижимостью.",
    todayText: "Сегодня MEGAPARC управляет действующими объектами, развивает новые проекты и рассматривает инвестиционные возможности по всему миру.",
    missionIndex: "Цель · Миссия · Видение",
    careers: "Карьера в MEGAPARC",
    responsibilityCta: "Наш подход",
    contactCta: "Обсудить партнёрство",
    links: [
      ["/approach", "Как мы инвестируем"],
      ["/development", "Проекты"],
      ["/portfolio", "Портфель"],
    ],
  },
  en: {
    eyebrow: "About",
    title: ["About", "MEGAPARC"],
    lead: "MEGAPARC is a real estate company that invests, develops projects and manages assets. The company was founded in 2005 and builds on the group's entrepreneurial experience since 1995.",
    imageCaption: "Moscova 20 · operating property",
    historyIndex: "History",
    historyTitle: "Three decades of experience.",
    todayIndex: "Today",
    todayTitle: "Investment, development and asset management.",
    todayText: "Today MEGAPARC manages operating properties, develops new projects and considers investment opportunities worldwide.",
    missionIndex: "Purpose · Mission · Vision",
    careers: "Careers at MEGAPARC",
    responsibilityCta: "Our approach",
    contactCta: "Discuss a partnership",
    links: [
      ["/approach", "How we invest"],
      ["/development", "Projects"],
      ["/portfolio", "Portfolio"],
    ],
  },
} as const;

function formatNumber(value: number, locale: SiteLocale, pad = 0) {
  const s = new Intl.NumberFormat(locale === "en" ? "en-GB" : locale === "ru" ? "ru-RU" : "ro-RO").format(value);
  return pad ? s.padStart(pad, "0") : s;
}

export function AboutPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);
  const image = portfolioAssets[2];

  return (
    <PageShell locale={locale}>
      {/* INTRO — full-width architecture with the page title */}
      <Hero size="page" media={{ src: image.media!.wide, alt: `${image.name} — ${image.positioning[locale]}`, position: image.media!.position }} title={<>{c.title[0]} {c.title[1]}</>} line={c.eyebrow} caption={c.imageCaption} />
      <Intro kicker={`${brand.name} · ${brand.since}`} statement={c.lead} />

      {/* 1995 · 2005 · 2020 · TODAY */}
      <Section tone="paper" id="history">
        <div className="shell">
          <Head kicker={c.historyIndex} title={c.historyTitle} />
          <Years
            items={historyAnchors.map((anchor) => ({
              key: anchor.year,
              mark: anchor.year === "today" ? historyCopy.today[locale] : anchor.year,
              scope: anchor.scope === "group" ? historyCopy.group[locale] : historyCopy.megaparc[locale],
              title: anchor.title[locale],
              text: anchor.text[locale],
              current: anchor.year === "today",
            }))}
          />
        </div>
      </Section>

      {/* IN NUMBERS — verified scale + review-only capital figures */}
      <Section tone="ink" id="numbers" label={brand.name}>
        <div className="shell">
          <Head kicker={brand.name} title={c.todayTitle} />
          <dl className="numbers" data-reveal>
            {scaleMetrics().map((metric) => (
              <div key={metric.key}>
                <dd>
                  {formatNumber(metric.value, locale, metric.pad)}
                  {metric.plus ? <b>+</b> : null}
                  {metric.unit ? <small>{metric.unit[locale]}</small> : null}
                </dd>
                <dt>{metric.label[locale]}</dt>
              </div>
            ))}
            <div>
              <dd>{portfolioMetrics.heritageSince}</dd>
              <dt>{historyCopy.group[locale]}</dt>
            </div>
          </dl>
          <p className="kicker kicker--light numbers__kicker">{capitalCopy.kicker[locale]}</p>
          <dl className="numbers numbers--small" data-reveal>
            {publicFinancialMetrics.map((metric) => (
              <div key={metric.key} data-temporary={metric.temporary ? "true" : undefined}>
                <dd>{metric.display}</dd>
                <dt>{metric.label[locale]}</dt>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* WHAT WE DO */}
      <Section id="today">
        <div className="shell">
          <Head kicker={c.todayIndex} title={c.todayText} />
          <Rows large rows={capabilities.map((capability, index) => ({ key: capability.no, no: capability.no, title: capability.title[locale], text: capability.text[locale], href: p(c.links[index][0]), cta: c.links[index][1] }))} />
        </div>
      </Section>

      {/* PURPOSE · MISSION · VISION */}
      <Intro tone="paper" id="mission" kicker={c.missionIndex} statement={purpose.text[locale]}>
        <div className="pair">
          <div>
            <span className="kicker">{mission.title[locale]}</span>
            <p>{mission.text[locale]}</p>
          </div>
          <div>
            <span className="kicker">{vision.title[locale]}</span>
            <p>{vision.text[locale]}</p>
          </div>
        </div>
      </Intro>

      {/* PEOPLE / ORGANISATION */}
      <Section id="organisation">
        <div className="shell">
          <Head kicker={peopleCopy.kicker[locale]} title={peopleCopy.title[locale]} text={peopleCopy.text[locale]} />
          <Rows rows={organisationAreas.map((area) => ({ key: area.key, no: area.no, title: area.title[locale], text: area.lead[locale] }))} />
          <div className="sec__foot sec__foot--split" data-reveal>
            <p className="note">{peopleCopy.placeholderNote[locale]}</p>
            <TextLink href={p("/careers")}>{c.careers}</TextLink>
          </div>
        </div>
      </Section>

      {/* STRONG CLOSING */}
      <Quote tone="ink" id="responsibility" kicker={responsibility.title[locale]} statement={responsibility.text[locale]} text={brandLayers.model[locale]} action={<><Button href={`${p("/contact")}#partnership`} variant="light">{c.contactCta}</Button><TextLink href={p("/approach")} className="tlink--light">{c.responsibilityCta}</TextLink></>} />
    </PageShell>
  );
}
