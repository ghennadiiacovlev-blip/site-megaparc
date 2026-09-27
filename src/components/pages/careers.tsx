import { existsSync } from "node:fs";
import { join } from "node:path";
import { CareersFilm } from "@/components/careers-film";
import { PageShell } from "@/components/page-shell";
import { Band, Button, Head, Hero, Intro, Quote, Rows, Section, TextLink } from "@/components/ui";
import { portfolioAssets } from "@/lib/assets";
import { employerBrand, openVacancies } from "@/lib/careers";
import { organisationAreas } from "@/lib/team";
import { localePath, publicAsset, type SiteLocale } from "@/lib/site-data";

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
      {/* CINEMATIC HERO — brand film when supplied, poster until then */}
      <Hero
        id="careers-hero"
        media={{ src: publicAsset(POSTER), alt: c.heroAlt }}
        title={<>{c.heroLine[0]}<br />{c.heroLine[1]}</>}
        line={e.kicker[locale]}
        action={<Button href="#positions" variant="light">{e.positions.kicker[locale]}</Button>}
        caption={film ? c.heroNote : undefined}
      >
        <CareersFilm src={film} poster={publicAsset(POSTER)} alt={c.heroAlt} />
      </Hero>

      {/* PEOPLE STATEMENT */}
      <Intro id="why" kicker={c.reasonsIndex} statement={e.why.title[locale]} text={e.lead[locale]} />

      {/* REAL ARCHITECTURE */}
      <Band media={{ src: dacia.media!.wide, alt: `${dacia.name} — ${dacia.positioning[locale]}`, position: dacia.media!.position }} caption={c.breakCaption} height="short" />

      {/* WHY MEGAPARC — three reasons */}
      <Section tone="paper">
        <div className="shell">
          <Rows large rows={e.why.points.map((point, index) => ({ key: point.title.en, no: `0${index + 1}`, title: point.title[locale], text: point.text[locale] }))} />
        </div>
      </Section>

      {/* HOW WE WORK — dark movement */}
      <Section tone="graphite" id="how">
        <div className="shell">
          <Head kicker={c.howIndex} title={e.how.themes[4].title[locale] + "."} />
          <Rows rows={e.how.themes.map((theme, i) => ({ key: theme.title.en, no: `0${i + 1}`, title: theme.title[locale], text: theme.text[locale] }))} />
        </div>
      </Section>

      {/* AREAS */}
      <Section id="areas">
        <div className="shell">
          <Head kicker={c.areasIndex} title={e.areas.title[locale]} />
          <Rows rows={organisationAreas.map((area) => ({ key: area.key, no: area.no, title: area.title[locale], text: area.lead[locale], items: area.responsibilities[locale] }))} />
        </div>
      </Section>

      {/* OPEN VACANCIES — verified Rabota.md roles */}
      <Section tone="paper" id="positions">
        <div className="shell">
          <Head kicker={e.positions.kicker[locale]} title={<>{String(openVacancies.length).padStart(2, "0")} <span className="muted">{e.positions.kicker[locale].toLowerCase()}</span></>} text={e.positions.sourceNote[locale]} />
          {openVacancies.length ? (
            <>
              <Rows large rows={openVacancies.map((vacancy, index) => ({ key: vacancy.slug, no: String(index + 1).padStart(2, "0"), title: vacancy.title[locale], meta: vacancy.location[locale], text: vacancy.summary[locale], href: vacancy.externalUrl, cta: c.rolesCta, external: true }))} />
              <div className="sec__foot" data-reveal>
                <TextLink href={e.positions.allRolesUrl} external>{e.positions.allRoles[locale]}</TextLink>
              </div>
            </>
          ) : (
            <div data-reveal>
              <h3 className="h2">{e.positions.emptyTitle[locale]}</h3>
              <p className="note">{e.positions.emptyText[locale]}</p>
            </div>
          )}
        </div>
      </Section>

      <Quote tone="ink" id="apply" kicker={e.apply.kicker[locale]} statement={e.apply.title[locale]} text={e.apply.text[locale]} action={<Button href={`${p("/contact")}#careers`} variant="light">{e.apply.cta[locale]}</Button>} />
    </PageShell>
  );
}
