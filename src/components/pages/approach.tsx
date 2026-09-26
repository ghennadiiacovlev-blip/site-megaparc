import { PageShell } from "@/components/page-shell";
import { ArrowLink, ImageBreak, PageHero } from "@/components/primitives";
import { JourneysSection } from "@/components/sections/company-sections";
import { CapitalSection, MandateSection, ManifestoSection, MindsetSection, PlatformSection, PrinciplesSection, Strategy2030Section, ValueCycleSection } from "@/components/sections/strategy-sections";
import { developmentProjects, portfolioAssets } from "@/lib/assets";
import { brandLayers } from "@/lib/brand";
import { megaparc2030 } from "@/lib/strategy";
import { localePath, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    eyebrow: "Abordarea noastră",
    title: ["Cum gândește", "MEGAPARC?"],
    lead: "Imobiliarele nu sunt doar metri pătrați. Sunt capital. Această pagină explică filosofia, principiile, ciclul de creare a valorii și direcția strategică până în 2030.",
    cta: "Vezi portofoliul",
    breakLabel: "Disciplina capitalului",
    principlesCta: "Vezi MEGAPARC 2030",
  },
  ru: {
    eyebrow: "Наш подход",
    title: ["Как мыслит", "MEGAPARC?"],
    lead: "Недвижимость — не просто квадратные метры. Это капитал. Эта страница объясняет философию, принципы, цикл создания стоимости и стратегическое направление до 2030 года.",
    cta: "Смотреть портфель",
    breakLabel: "Дисциплина капитала",
    principlesCta: "Смотреть MEGAPARC 2030",
  },
  en: {
    eyebrow: "Our approach",
    title: ["How does", "MEGAPARC think?"],
    lead: "Real estate is not merely square metres. It is capital. This page explains the philosophy, the principles, the value-creation cycle and the strategic direction to 2030.",
    cta: "View the portfolio",
    breakLabel: "Capital discipline",
    principlesCta: "See MEGAPARC 2030",
  },
} as const;

export function ApproachPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const dacia = portfolioAssets[0];
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
        <span className="label label--red">{brandLayers.strategicIdea[locale]}</span>
      </PageHero>

      <ManifestoSection locale={locale} no={no()} />
      <MandateSection locale={locale} no={no()} surface="stone" counts={{ operating: portfolioAssets.length, projects: developmentProjects.length }} />
      <PlatformSection locale={locale} no={no()} links={false} />
      <ValueCycleSection locale={locale} no={no()} surface="stone" />
      <ImageBreak media={dacia.media!} alt={`${dacia.name} — ${dacia.positioning[locale]}`} statementLabel={c.breakLabel} statement={megaparc2030.pillars[3].idea![locale]} />
      <PrinciplesSection locale={locale} no={no()} cta={{ href: "#megaparc-2030", label: c.principlesCta }} />
      <MindsetSection locale={locale} no={no()} />
      <Strategy2030Section locale={locale} no={no()} surface="graphite" />
      <CapitalSection locale={locale} no={no()} />
      <JourneysSection locale={locale} no={no()} surface="paper" />

      <section className="closing paper">
        <div className="shell closing__grid" data-reveal>
          <span className="label label--red">{String(++n).padStart(2, "0")} / {brandLayers.model[locale]}</span>
          <div>
            <p className="closing__statement">{brandLayers.statement[locale]}</p>
            <ArrowLink href={localePath(locale, "/portfolio")}>{c.cta}</ArrowLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
