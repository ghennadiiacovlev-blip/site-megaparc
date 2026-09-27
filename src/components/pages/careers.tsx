import { existsSync } from "node:fs";
import { join } from "node:path";
import { CareersFilm } from "@/components/careers-film";
import { Bleed, ClosingFrame, Index, Movement, PropertyList, PropertyRow, RowList, Statement, Timeline } from "@/components/editorial";
import { PageShell } from "@/components/page-shell";
import { ArrowLink, Note } from "@/components/primitives";
import { portfolioAssets } from "@/lib/assets";
import { employerBrand, openVacancies } from "@/lib/careers";
import { organisationAreas } from "@/lib/team";
import { brand, localePath, publicAsset, type SiteLocale } from "@/lib/site-data";

/**
 * CAREERS — PEOPLE · REAL PROJECTS · ARCHITECTURE · RESPONSIBILITY · GROWTH.
 * Video-first hero (poster until the MEGAPARC brand film is supplied),
 * three reasons, how we work as a sequence, an architectural break, four
 * areas, verified Rabota.md roles, one closing frame.
 */
const FILM = "/assets/careers/megaparc-careers-film.mp4";
const POSTER = "/assets/careers/megaparc-careers-poster.webp";

const copy = {
  ro: {
    heroLine: ["Construim echipa", "care construiește viitorul."],
    heroAlt: "Bulevard cu flux pietonal, Chișinău — MEGAPARC",
    heroNote: "Brand film · MEGAPARC",
    reasonsIndex: "De ce MEGAPARC",
    howIndex: "Cum lucrăm",
    breakCaption: "Dacia 31 · obiect în funcțiune",
    areasIndex: "Direcții",
    rolesCta: "Vezi postul",
  },
  ru: {
    heroLine: ["Строим команду,", "которая строит будущее."],
    heroAlt: "Бульвар с пешеходным потоком, Кишинёв — MEGAPARC",
    heroNote: "Бренд-фильм · MEGAPARC",
    reasonsIndex: "Почему MEGAPARC",
    howIndex: "Как мы работаем",
    breakCaption: "Dacia 31 · действующий объект",
    areasIndex: "Направления",
    rolesCta: "Подробнее",
  },
  en: {
    heroLine: ["We build the team", "that builds the future."],
    heroAlt: "Boulevard with pedestrian flow, Chișinău — MEGAPARC",
    heroNote: "Brand film · MEGAPARC",
    reasonsIndex: "Why MEGAPARC",
    howIndex: "How we work",
    breakCaption: "Dacia 31 · operating property",
    areasIndex: "Areas",
    rolesCta: "View role",
  },
} as const;

/** Build-time check: the film is only referenced when the file exists in /public. */
function filmSource() {
  return existsSync(join(process.cwd(), "public", FILM)) ? publicAsset(FILM) : null;
}

export function CareersPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const e = employerBrand;
  const p = (path: string) => localePath(locale, path);
  const dacia = portfolioAssets[0];
  const film = filmSource();

  return (
    <PageShell locale={locale}>
      {/* 01 Video-first hero */}
      <section className="chero" id="careers-hero">
        <CareersFilm src={film} poster={publicAsset(POSTER)} alt={c.heroAlt} />
        <div className="shell chero__copy" data-reveal>
          <p className="chero__brand"><span>{brand.name}</span><i aria-hidden="true" /><span>{e.kicker[locale]}</span></p>
          <h1 className="chero__title">
            <span>{c.heroLine[0]}</span>
            <span>{c.heroLine[1]}</span>
          </h1>
          <div className="chero__actions">
            <ArrowLink href="#positions" inverse strong>{e.positions.kicker[locale]}</ArrowLink>
          </div>
        </div>
        <span className="chero__note" aria-hidden="true">{c.heroNote}</span>
      </section>

      {/* 02 Why — statement + trio */}
      <Movement tone="white" id="why">
        <div className="shell">
          <Statement no="02" kicker={c.reasonsIndex} title={e.why.title[locale]} text={e.lead[locale]} size="xl" />
          <ol className="trio trio--static" data-reveal>
            {e.why.points.map((point, index) => (
              <li key={point.title.en}>
                <span className="trio__item">
                  <span className="trio__no">0{index + 1}</span>
                  <span className="trio__title">{point.title[locale]}</span>
                  <span className="trio__text">{point.text[locale]}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Movement>

      {/* 03 How we work — horizontal sequence */}
      <Movement tone="stone" id="how">
        <div className="shell">
          <Index no="03">{c.howIndex}</Index>
          <Timeline label={c.howIndex} items={e.how.themes.map((theme, i) => ({ key: theme.title.en, mark: `0${i + 1}`, title: theme.title[locale], text: theme.text[locale] }))} />
        </div>
      </Movement>

      {/* 04 Architecture — real projects */}
      <Bleed media={{ src: dacia.media!.wide, alt: `${dacia.name} — ${dacia.positioning[locale]}`, position: dacia.media!.position }} caption={c.breakCaption} meta={brand.positioning} height="short" />

      {/* 05 Areas */}
      <Movement tone="paper" id="areas">
        <div className="shell">
          <Statement no="04" kicker={c.areasIndex} title={e.areas.title[locale]} size="md" />
          <RowList large rows={organisationAreas.map((area) => ({ key: area.key, no: area.no, title: area.title[locale], text: area.lead[locale], items: area.responsibilities[locale] }))} />
        </div>
      </Movement>

      {/* 06 Open vacancies — verified Rabota.md roles */}
      <Movement tone="ink" id="positions">
        <div className="shell">
          <Statement no="05" kicker={e.positions.kicker[locale]} title={<>{String(openVacancies.length).padStart(2, "0")} <span className="muted-light">{e.positions.kicker[locale].toLowerCase()}</span></>} text={e.positions.sourceNote[locale]} size="md" inverse />
          {openVacancies.length ? (
            <>
              <PropertyList inverse>
                {openVacancies.map((vacancy, index) => (
                  <PropertyRow
                    key={vacancy.slug}
                    inverse
                    compact
                    external
                    href={vacancy.externalUrl}
                    index={String(index + 1).padStart(2, "0")}
                    name={vacancy.title[locale]}
                    place={vacancy.location[locale]}
                    line={vacancy.summary[locale]}
                    cta={c.rolesCta}
                  />
                ))}
              </PropertyList>
              <div className="mv__foot" data-reveal>
                <a className="arrow-link arrow-link--inverse" href={e.positions.allRolesUrl} target="_blank" rel="noopener noreferrer">
                  <span>{e.positions.allRoles[locale]}</span>
                  <span className="arrow-link__icon" aria-hidden="true">↗</span>
                </a>
              </div>
            </>
          ) : (
            <div data-reveal>
              <h2 className="stmt__title">{e.positions.emptyTitle[locale]}</h2>
              <Note light>{e.positions.emptyText[locale]}</Note>
            </div>
          )}
        </div>
      </Movement>

      {/* 07 Apply */}
      <ClosingFrame id="apply" tone="paper" kicker={e.apply.kicker[locale]} title={e.apply.title[locale]} text={e.apply.text[locale]} links={[{ href: `${p("/contact")}#careers`, label: e.apply.cta[locale], strong: true }]} />
    </PageShell>
  );
}
