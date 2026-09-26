import { PageShell } from "@/components/page-shell";
import { ArrowLink, ImageBreak, PageHero } from "@/components/primitives";
import { JourneysSection } from "@/components/sections/company-sections";
import { CapitalSection, MandateSection, ManifestoSection, MindsetSection, PlatformSection, PrinciplesSection, SignatureSection, Strategy2030Section, ValueCycleSection } from "@/components/sections/strategy-sections";
import { developmentProjects, portfolioAssets } from "@/lib/assets";
import { brandLayers } from "@/lib/brand";
import { megaparc2030 } from "@/lib/strategy";
import { localePath, type SiteLocale } from "@/lib/site-data";

/**
 * Our approach — 1 how we evaluate · where we invest · 2 what creates value ·
 * 3–4 how we develop and manage · owner's mindset · 5 investment principles ·
 * 6 long-term direction · key figures · ways to work together.
 */
const copy = {
  ro: {
    eyebrow: "Abordarea noastră",
    title: ["Cum lucrează", "MEGAPARC"],
    lead: "Evaluăm obiectele înainte de a investi, creăm valoare la fiecare etapă și administrăm imobiliarele astfel încât să rămână căutate.",
    cta: "Vezi portofoliul",
    breakLabel: "Investiții echilibrate",
    principlesCta: "Direcția pe termen lung",
  },
  ru: {
    eyebrow: "Наш подход",
    title: ["Как работает", "MEGAPARC"],
    lead: "Оцениваем объекты до инвестирования, создаём стоимость на каждом этапе и управляем недвижимостью так, чтобы она оставалась востребованной.",
    cta: "Смотреть портфель",
    breakLabel: "Взвешенные инвестиции",
    principlesCta: "Долгосрочное направление",
  },
  en: {
    eyebrow: "Our approach",
    title: ["How MEGAPARC", "works"],
    lead: "We assess properties before investing, create value at every stage and manage real estate so that it stays in demand.",
    cta: "View the portfolio",
    breakLabel: "Considered investment",
    principlesCta: "Long-term direction",
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

      <ManifestoSection locale={locale} no={no()} surface="paper" />
      <MandateSection locale={locale} no={no()} surface="stone" counts={{ operating: portfolioAssets.length, projects: developmentProjects.length }} />
      <ValueCycleSection locale={locale} no={no()} surface="paper" />
      <PlatformSection locale={locale} no={no()} surface="stone" links={false} />
      <MindsetSection locale={locale} no={no()} surface="paper" />
      <SignatureSection locale={locale} />
      <ImageBreak media={dacia.media!} alt={`${dacia.name} — ${dacia.positioning[locale]}`} statementLabel={c.breakLabel} statement={megaparc2030.pillars[3].idea![locale]} />
      <PrinciplesSection locale={locale} no={no()} surface="stone" cta={{ href: "#megaparc-2030", label: c.principlesCta }} />
      <Strategy2030Section locale={locale} no={no()} surface="paper" />
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
