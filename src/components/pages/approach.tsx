import { PageShell } from "@/components/page-shell";
import { ArrowLink, ImageBreak, PageHero } from "@/components/primitives";
import { MandateSection, ManifestoSection, MindsetSection, PlatformSection, PrinciplesSection, SignatureSection, Strategy2030Section, ValueCycleSection } from "@/components/sections/strategy-sections";
import { developmentProjects, portfolioAssets } from "@/lib/assets";
import { brandLayers } from "@/lib/brand";
import { megaparc2030 } from "@/lib/strategy";
import { localePath, type SiteLocale } from "@/lib/site-data";

/**
 * Our approach — five questions: how we evaluate a property · where we
 * consider investments · how we create value · how we develop and manage ·
 * which principles we follow. Then the compact long-term direction.
 * Key figures live on the home page only.
 */
const copy = {
  ro: {
    eyebrow: "Abordarea noastră",
    title: ["Cum lucrează", "MEGAPARC"],
    lead: "Cinci răspunsuri scurte: cum evaluăm un obiect, unde analizăm investiții, cum creăm valoare, cum dezvoltăm și administrăm, ce principii urmăm.",
    cta: "Vezi portofoliul",
    breakLabel: "Investiții echilibrate",
    principlesCta: "Direcția pe termen lung",
  },
  ru: {
    eyebrow: "Наш подход",
    title: ["Как работает", "MEGAPARC"],
    lead: "Пять коротких ответов: как оцениваем объект, где рассматриваем инвестиции, как создаём стоимость, как развиваем и управляем, какие принципы используем.",
    cta: "Смотреть портфель",
    breakLabel: "Взвешенные инвестиции",
    principlesCta: "Долгосрочное направление",
  },
  en: {
    eyebrow: "Our approach",
    title: ["How MEGAPARC", "works"],
    lead: "Five short answers: how we assess a property, where we consider investments, how we create value, how we develop and manage, which principles we follow.",
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
      <Strategy2030Section locale={locale} no={no()} surface="ink" />

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
