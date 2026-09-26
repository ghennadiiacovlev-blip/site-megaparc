import { PageShell } from "@/components/page-shell";
import { ArrowLink, ImageBreak, PageHero, SectionHead, SectionIndex } from "@/components/primitives";
import { HistorySection, OrganisationSection } from "@/components/sections/company-sections";
import { portfolioAssets } from "@/lib/assets";
import { brandLayers } from "@/lib/brand";
import { mission, purpose, responsibility, vision } from "@/lib/strategy";
import { brand, localePath, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    eyebrow: "Despre",
    title: ["Despre", "MEGAPARC"],
    lead: "MEGAPARC este o companie din domeniul imobiliar care investește, dezvoltă proiecte și administrează active. Compania a fost fondată în 2005 și se bazează pe experiența antreprenorială a grupului din 1995.",
    todayIndex: "Astăzi",
    todayTitle: "Astăzi MEGAPARC administrează obiecte în funcțiune, dezvoltă proiecte noi și analizează oportunități de investiții pe piețele internaționale.",
    todayText: "Investiții, dezvoltare și administrare imobiliară, într-o singură companie.",
    imageCaption: "Moscova 20 · obiect în funcțiune",
    missionIndex: "Scop · Misiune · Viziune",
    responsibilityCta: "Abordarea noastră",
    contactCta: "Discută un parteneriat",
  },
  ru: {
    eyebrow: "О компании",
    title: ["О компании", "MEGAPARC"],
    lead: "MEGAPARC — компания в сфере недвижимости, которая инвестирует, развивает проекты и управляет активами. Компания основана в 2005 году и опирается на предпринимательский опыт группы с 1995 года.",
    todayIndex: "Сегодня",
    todayTitle: "Сегодня MEGAPARC управляет действующими объектами, развивает новые проекты и рассматривает инвестиционные возможности на международных рынках.",
    todayText: "Инвестиции, девелопмент и управление недвижимостью — в одной компании.",
    imageCaption: "Moscova 20 · действующий объект",
    missionIndex: "Цель · Миссия · Видение",
    responsibilityCta: "Наш подход",
    contactCta: "Обсудить партнёрство",
  },
  en: {
    eyebrow: "About",
    title: ["About", "MEGAPARC"],
    lead: "MEGAPARC is a real estate company that invests, develops projects and manages assets. The company was founded in 2005 and builds on the group's entrepreneurial experience since 1995.",
    todayIndex: "Today",
    todayTitle: "Today MEGAPARC manages operating properties, develops new projects and considers investment opportunities across international markets.",
    todayText: "Investment, development and asset management, in one company.",
    imageCaption: "Moscova 20 · operating property",
    missionIndex: "Purpose · Mission · Vision",
    responsibilityCta: "Our approach",
    contactCta: "Discuss a partnership",
  },
} as const;

export function AboutPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const image = portfolioAssets.find((asset) => asset.slug === "moscova-20")!;
  let n = 1;
  const no = () => String(++n).padStart(2, "0");

  return (
    <PageShell locale={locale}>
      <PageHero
        index="01"
        eyebrow={c.eyebrow}
        title={
          <>
            {c.title[0]}
            <br />
            <span className="muted-ink">{c.title[1]}</span>
          </>
        }
        lead={c.lead}
      >
        <span className="label label--red" lang="en">{brand.since}</span>
      </PageHero>

      <section className="pairs stone" id="today">
        <div className="shell">
          <SectionIndex no={no()}>{c.todayIndex}</SectionIndex>
          <SectionHead title={c.todayTitle} text={c.todayText} wide />
        </div>
      </section>

      <HistorySection locale={locale} no={no()} surface="paper" supporting />

      <ImageBreak media={image.media!} alt={`${image.name} — ${image.positioning[locale]}`} caption={c.imageCaption} />

      <section className="pairs stone" id="mission">
        <div className="shell">
          <SectionIndex no={no()}>{c.missionIndex}</SectionIndex>
          <SectionHead title={purpose.text[locale]} />
          <div className="pairs__grid">
            <article data-reveal>
              <h3>{mission.title[locale]}</h3>
              <p>{mission.text[locale]}</p>
            </article>
            <article data-reveal>
              <h3>{vision.title[locale]}</h3>
              <p>{vision.text[locale]}</p>
            </article>
          </div>
        </div>
      </section>

      <OrganisationSection locale={locale} no={no()} />

      <section className="owner stone" id="responsibility">
        <div className="shell">
          <SectionIndex no={no()}>{responsibility.title[locale]}</SectionIndex>
          <div className="owner__grid" data-reveal>
            <p className="owner__statement">{responsibility.text[locale]}</p>
            <div className="owner__actions">
              <span className="label label--red">{brandLayers.model[locale]}</span>
              <ArrowLink href={localePath(locale, "/approach")}>{c.responsibilityCta}</ArrowLink>
              <ArrowLink href={`${localePath(locale, "/contact")}#partnership`}>{c.contactCta}</ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
