import Link from "next/link";
import { ClosingFrame, Movement, Opening, RowList, Statement, Timeline } from "@/components/editorial";
import { PageShell } from "@/components/page-shell";
import { ArrowLink } from "@/components/primitives";
import { portfolioAssets } from "@/lib/assets";
import { brandLayers } from "@/lib/brand";
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

export function AboutPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);
  const image = portfolioAssets.find((asset) => asset.slug === "moscova-20")!;

  return (
    <PageShell locale={locale}>
      {/* 01 Who we are + 02 large architectural image */}
      <Opening
        eyebrow={c.eyebrow}
        title={<>{c.title[0]} <span className="muted-ink">{c.title[1]}</span></>}
        lead={c.lead}
        media={{ src: image.media!.wide, alt: `${image.name} — ${image.positioning[locale]}`, position: image.media!.position }}
        caption={c.imageCaption}
      >
        <span className="label label--red" lang="en">{brand.since}</span>
      </Opening>

      {/* 03 1995 / 2005 / 2020 / today — large horizontal timeline */}
      <Movement tone="paper" id="history">
        <div className="shell">
          <Statement no="02" kicker={c.historyIndex} title={c.historyTitle} size="md" />
          <Timeline
            large
            label={c.historyTitle}
            items={historyAnchors.map((anchor) => ({
              key: anchor.year,
              mark: anchor.year === "today" ? historyCopy.today[locale] : anchor.year,
              scope: anchor.scope === "group" ? historyCopy.group[locale] : historyCopy.megaparc[locale],
              title: anchor.title[locale],
              text: anchor.text[locale],
              current: anchor.year === "today",
            }))}
          />
          <ul className="tl__supporting" data-reveal>
            {historyCopy.supporting.map((item) => (
              <li key={item.year}>
                <span>{item.year} · {historyCopy.group[locale]}</span>
                <strong>{item.title[locale]}</strong>
                <p>{item.text[locale]}</p>
              </li>
            ))}
          </ul>
        </div>
      </Movement>

      {/* 04 What we do today — statement + trio */}
      <Movement tone="stone" id="today">
        <div className="shell">
          <Statement no="03" kicker={c.todayIndex} title={c.todayTitle} text={c.todayText} size="xl" />
          <ol className="trio" data-reveal>
            {capabilities.map((capability, index) => (
              <li key={capability.no}>
                <Link href={p(c.links[index][0])} className="trio__item">
                  <span className="trio__no">{capability.no}</span>
                  <span className="trio__title">{capability.title[locale]}</span>
                  <span className="trio__text">{capability.text[locale]}</span>
                  <span className="trio__cta">{c.links[index][1]}<i aria-hidden="true">↗</i></span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </Movement>

      {/* 05 Purpose · Mission · Vision — statement + pair */}
      <Movement tone="white" id="mission">
        <div className="shell">
          <Statement no="04" kicker={c.missionIndex} title={purpose.text[locale]} size="xl" wide />
          <div className="pair" data-reveal>
            <article>
              <h3>{mission.title[locale]}</h3>
              <p>{mission.text[locale]}</p>
            </article>
            <article>
              <h3>{vision.title[locale]}</h3>
              <p>{vision.text[locale]}</p>
            </article>
          </div>
        </div>
      </Movement>

      {/* 06 Organisation / people */}
      <Movement tone="paper" id="organisation">
        <div className="shell">
          <Statement no="05" kicker={peopleCopy.kicker[locale]} title={peopleCopy.title[locale]} text={peopleCopy.text[locale]} size="md" />
          <RowList
            large
            rows={organisationAreas.map((area) => ({
              key: area.key,
              no: area.no,
              title: area.title[locale],
              text: area.lead[locale],
              items: area.responsibilities[locale],
            }))}
          />
          <div className="mv__foot mv__foot--split" data-reveal>
            <p className="note">{peopleCopy.placeholderNote[locale]}</p>
            <ArrowLink href={p("/careers")}>{c.careers}</ArrowLink>
          </div>
        </div>
      </Movement>

      {/* 07 Closing statement */}
      <ClosingFrame
        id="responsibility"
        kicker={responsibility.title[locale]}
        title={responsibility.text[locale]}
        links={[
          { href: p("/approach"), label: c.responsibilityCta },
          { href: `${p("/contact")}#partnership`, label: c.contactCta, strong: true },
        ]}
        note={brandLayers.model[locale]}
      />
    </PageShell>
  );
}
