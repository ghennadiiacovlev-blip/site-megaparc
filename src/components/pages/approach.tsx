import { PageShell } from "@/components/page-shell";
import { Band, Button, Head, Hero, Quote, Rows, Section, Stages, TextLink } from "@/components/ui";
import { developmentProjects, portfolioAssets } from "@/lib/assets";
import { brandLayers } from "@/lib/brand";
import { cycleOutcomes, investmentMandate, investmentPrinciples, megaparc2030, philosophy, valueCycle, valueCycleCopy } from "@/lib/strategy";
import { localePath, type SiteLocale } from "@/lib/site-data";

/**
 * OUR APPROACH — the most sophisticated section of the site.
 * Oversized statement → three lenses → architectural image break →
 * the investment process as a horizontal sequence → where we invest →
 * five principles as editorial rows → owner's mindset (black) → signature
 * red moment → compact MEGAPARC 2030 → closing.
 */
const copy = {
  ro: {
    eyebrow: "Abordarea noastră",
    title: ["Cum lucrează", "MEGAPARC"],
    lead: "Cinci răspunsuri scurte: cum evaluăm un obiect, unde analizăm investiții, cum creăm valoare, cum dezvoltăm și administrăm, ce principii urmăm.",
    lensesIndex: "Trei perspective",
    breakLabel: "Investiții echilibrate",
    processIndex: "Procesul de investiție",
    principlesIndex: "Principii de investiții",
    principlesTitle: "Cinci principii de investiții.",
    mindsetLabel: "Ce contează pentru un proprietar",
    signatureText: "Patru cuvinte care descriu munca MEGAPARC.",
    cta: "Vezi portofoliul",
    ctaB: "Propune un obiect",
    counts: ["Obiecte în funcțiune", "Proiecte de dezvoltare"],
  },
  ru: {
    eyebrow: "Наш подход",
    title: ["Как работает", "MEGAPARC"],
    lead: "Пять коротких ответов: как оцениваем объект, где рассматриваем инвестиции, как создаём стоимость, как развиваем и управляем, какие принципы используем.",
    lensesIndex: "Три взгляда",
    breakLabel: "Взвешенные инвестиции",
    processIndex: "Инвестиционный процесс",
    principlesIndex: "Принципы инвестирования",
    principlesTitle: "Пять принципов инвестирования.",
    mindsetLabel: "Что важно собственнику",
    signatureText: "Четыре слова, которые описывают работу MEGAPARC.",
    cta: "Смотреть портфель",
    ctaB: "Предложить объект",
    counts: ["Действующие объекты", "Проекты развития"],
  },
  en: {
    eyebrow: "Our approach",
    title: ["How MEGAPARC", "works"],
    lead: "Five short answers: how we assess a property, where we consider investments, how we create value, how we develop and manage, which principles we follow.",
    lensesIndex: "Three angles",
    breakLabel: "Considered investment",
    processIndex: "The investment process",
    principlesIndex: "Investment principles",
    principlesTitle: "Five investment principles.",
    mindsetLabel: "What matters to an owner",
    signatureText: "Four words that describe what MEGAPARC does.",
    cta: "View the portfolio",
    ctaB: "Submit a property",
    counts: ["Operating properties", "Development projects"],
  },
} as const;

export function ApproachPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);
  const [dacia, moscova9] = portfolioAssets;
  const m = investmentMandate;
  const [first, ...rest] = philosophy.paragraphs[locale];

  return (
    <PageShell locale={locale}>
      <Hero size="page" media={{ src: dacia.media!.wide, alt: `${dacia.name} — ${dacia.positioning[locale]}`, position: dacia.media!.position }} title={<>{c.title[0]} {c.title[1]}</>} line={c.eyebrow} />

      {/* 01 HOW WE EVALUATE REAL ESTATE */}
      <Section id="philosophy">
        <div className="shell intro" data-reveal>
          <p className="kicker">01 · {philosophy.kicker[locale]}</p>
          <div className="intro__body">
            <h2 className="statement">{philosophy.title[locale]}</h2>
            <p className="intro__text intro__text--strong">{first}</p>
            {rest.map((paragraph) => (
              <p key={paragraph} className="intro__text">{paragraph}</p>
            ))}
            <ul className="chips" aria-label={c.lensesIndex}>
              {philosophy.lenses[locale].map((lens, index) => (
                <li key={lens}><span>0{index + 1}</span>{lens}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 02 LARGE IMAGE */}
      <Band media={{ src: moscova9.media!.wide, alt: `${moscova9.name} — ${moscova9.positioning[locale]}`, position: moscova9.media!.position }} statement={megaparc2030.pillars[3].idea![locale]} caption={c.breakLabel} />

      {/* 03 PRINCIPLES */}
      <Section tone="paper" id="principles">
        <div className="shell">
          <Head kicker={`03 · ${c.principlesIndex}`} title={c.principlesTitle} />
          <Rows large rows={investmentPrinciples.map((principle) => ({ key: principle.no, no: principle.no, title: principle.title[locale], text: principle.text[locale] }))} />
        </div>
      </Section>

      {/* 04 HOW VALUE IS CREATED */}
      <Section id="cycle">
        <div className="shell">
          <Head kicker={`04 · ${valueCycleCopy.kicker[locale]}`} title={valueCycleCopy.title[locale]} text={valueCycleCopy.text[locale]} />
          <Stages label={c.processIndex} items={valueCycle.map((stage) => ({ key: stage.key, no: stage.no, title: stage.title[locale], text: stage.text[locale] }))} />
          <p className="outcomes" data-reveal>
            <span className="kicker">{valueCycleCopy.outcomesLabel[locale]}</span>
            {cycleOutcomes[locale].map((outcome) => (
              <span key={outcome}>{outcome}</span>
            ))}
          </p>
        </div>
      </Section>

      {/* 05 WHERE WE INVEST */}
      <Section tone="ink" id="mandate">
        <div className="shell">
          <Head kicker={`05 · ${m.kicker[locale]}`} title={<>{m.statement[locale][0]} <span className="accent">{m.statement[locale][1]}</span></>} text={m.text[locale]} />
          <div className="fields" data-reveal>
            <div>
              <span className="kicker kicker--light">{m.base.role[locale]}</span>
              <h3>{m.base.title[locale]}</h3>
              <p className="fields__counts"><b>{String(portfolioAssets.length).padStart(2, "0")}</b> {c.counts[0]} · <b>{String(developmentProjects.length).padStart(2, "0")}</b> {c.counts[1]}</p>
              <ul className="list list--plain">
                {m.base.points[locale].map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="kicker kicker--light">{m.global.role[locale]}</span>
              <h3>{m.global.title[locale]}</h3>
              <ul className="list list--plain">
                {m.global.points[locale].map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Button href={`${p("/contact")}#opportunity`} variant="light">{m.cta[locale]}</Button>
            </div>
          </div>
          <p className="note note--light">{m.criteria.label[locale]}: {m.criteria.points[locale].join(" · ")}. {m.note[locale]}</p>
        </div>
      </Section>

      {/* 06 MEGAPARC 2030 — compact */}
      <Section tone="paper" id="megaparc-2030">
        <div className="shell y2030" data-reveal>
          <div>
            <p className="kicker">06 · {megaparc2030.name}</p>
            <span className="y2030__year" aria-hidden="true">20<b>30</b></span>
          </div>
          <div>
            <h2 className="h2">{megaparc2030.subtitle[locale]}</h2>
            <p className="intro__text">{megaparc2030.intro[locale]}</p>
          </div>
        </div>
        <div className="shell">
          <Rows rows={megaparc2030.pillars.map((pillar) => ({ key: pillar.no, no: pillar.no, title: pillar.title[locale], text: pillar.text[locale] }))} />
          <p className="equation" data-reveal><b>{megaparc2030.equation[locale].split(" = ")[0]}</b> = {megaparc2030.equation[locale].split(" = ")[1]}</p>
        </div>
      </Section>

      <Quote tone="ink" kicker={brandLayers.model[locale]} statement={brandLayers.statement[locale]} action={<><Button href={`${p("/contact")}#opportunity`} variant="light">{c.ctaB}</Button><TextLink href={p("/portfolio")} className="tlink--light">{c.cta}</TextLink></>} />
    </PageShell>
  );
}
