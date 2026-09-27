import { Bleed, ClosingFrame, Index, Moment, Movement, Opening, RowList, Statement, Timeline } from "@/components/editorial";
import { PageShell } from "@/components/page-shell";
import { ArrowLink } from "@/components/primitives";
import { developmentProjects, portfolioAssets } from "@/lib/assets";
import { brandLayers, signatureWords } from "@/lib/brand";
import { cycleOutcomes, investmentMandate, investmentPrinciples, megaparc2030, ownerMindset, philosophy, valueCycle, valueCycleCopy } from "@/lib/strategy";
import { brand, localePath, type SiteLocale } from "@/lib/site-data";

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
  const dacia = portfolioAssets[0];
  const m = investmentMandate;
  const [first, ...rest] = philosophy.paragraphs[locale];

  return (
    <PageShell locale={locale}>
      <Opening eyebrow={c.eyebrow} title={<>{c.title[0]} <span className="muted-ink">{c.title[1]}</span></>} lead={c.lead}>
        <span className="label label--red">{brandLayers.strategicIdea[locale]}</span>
      </Opening>

      {/* 02 Oversized statement — how we evaluate */}
      <Movement tone="white" id="philosophy">
        <div className="shell">
          <Statement no="02" kicker={philosophy.kicker[locale]} title={philosophy.title[locale]} size="xl">
            <p className="stmt__emphasis">{first}</p>
            {rest.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Statement>
          <ol className="lenses" data-reveal aria-label={c.lensesIndex}>
            {philosophy.lenses[locale].map((lens, index) => (
              <li key={lens}>
                <span>0{index + 1}</span>
                <strong>{lens}</strong>
              </li>
            ))}
          </ol>
        </div>
      </Movement>

      {/* 03 Architectural image break */}
      <Bleed media={{ src: dacia.media!.wide, alt: `${dacia.name} — ${dacia.positioning[locale]}`, position: dacia.media!.position }} label={c.breakLabel} statement={megaparc2030.pillars[3].idea![locale]} />

      {/* 04 The investment process — horizontal sequence */}
      <Movement tone="paper" id="cycle">
        <div className="shell">
          <Statement no="03" kicker={valueCycleCopy.kicker[locale]} title={valueCycleCopy.title[locale]} text={valueCycleCopy.text[locale]} size="md" />
          <Timeline label={c.processIndex} items={valueCycle.map((stage) => ({ key: stage.key, mark: stage.no, title: stage.title[locale], text: stage.text[locale] }))} />
          <p className="outcomes" data-reveal>
            <span className="outcomes__label">{valueCycleCopy.outcomesLabel[locale]}</span>
            {cycleOutcomes[locale].map((outcome) => (
              <span key={outcome}>{outcome}</span>
            ))}
          </p>
        </div>
      </Movement>

      {/* 05 Where we invest */}
      <Movement tone="stone" id="mandate">
        <div className="shell">
          <Statement
            no="04"
            kicker={m.kicker[locale]}
            title={<>{m.statement[locale][0]} <span className="accent">{m.statement[locale][1]}</span></>}
            text={m.text[locale]}
            size="lg"
          />
          <div className="pair pair--fields" data-reveal>
            <article>
              <span className="idx idx--plain"><span>{m.base.role[locale]}</span></span>
              <h3>{m.base.title[locale]}</h3>
              <dl className="counts">
                <div><dd>{String(portfolioAssets.length).padStart(2, "0")}</dd><dt>{c.counts[0]}</dt></div>
                <div><dd>{String(developmentProjects.length).padStart(2, "0")}</dd><dt>{c.counts[1]}</dt></div>
              </dl>
              <ul className="dash-list">
                {m.base.points[locale].map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
            <article>
              <span className="idx idx--plain"><span className="idx__no">{m.global.role[locale]}</span></span>
              <h3>{m.global.title[locale]}</h3>
              <ul className="dash-list dash-list--large">
                {m.global.points[locale].map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <ArrowLink href={`${p("/contact")}#opportunity`} strong>{m.cta[locale]}</ArrowLink>
            </article>
          </div>
          <p className="criteria" data-reveal>
            <span className="criteria__label">{m.criteria.label[locale]}</span>
            {m.criteria.points[locale].map((point) => (
              <span key={point}>{point}</span>
            ))}
            <span className="criteria__note">{m.note[locale]}</span>
          </p>
        </div>
      </Movement>

      {/* 06 Five principles — editorial rows */}
      <Movement tone="white" id="principles">
        <div className="shell">
          <Statement no="05" kicker={c.principlesIndex} title={c.principlesTitle} size="md" />
          <RowList large rows={investmentPrinciples.map((principle) => ({ key: principle.no, no: principle.no, title: principle.title[locale], text: principle.text[locale] }))} />
        </div>
      </Movement>

      {/* 07 Owner's mindset — black */}
      <Movement tone="ink" id="mindset">
        <div className="shell">
          <Statement no="06" kicker={ownerMindset.title[locale]} title={ownerMindset.statement[locale]} size="xl" inverse>
            <span className="idx idx--plain idx--inverse"><span>{c.mindsetLabel}</span></span>
            <ul className="dash-list dash-list--inverse">
              {ownerMindset.traits[locale].map((trait) => (
                <li key={trait}>{trait}</li>
              ))}
            </ul>
          </Statement>
        </div>
      </Movement>

      {/* 08 Signature red moment */}
      <Moment large words={signatureWords[locale]} label={brand.since} text={c.signatureText} />

      {/* 09 MEGAPARC 2030 — compact */}
      <Movement tone="paper" id="megaparc-2030">
        <div className="shell">
          <div className="y2030" data-reveal>
            <div>
              <Index no="07">{megaparc2030.name}</Index>
              <span className="y2030__year" aria-hidden="true">20<b>30</b></span>
            </div>
            <div>
              <h2 className="y2030__title">{megaparc2030.subtitle[locale]}</h2>
              <p className="y2030__intro">{megaparc2030.intro[locale]}</p>
            </div>
          </div>
          <RowList rows={megaparc2030.pillars.map((pillar) => ({ key: pillar.no, no: pillar.no, title: pillar.title[locale], text: pillar.text[locale] }))} />
          <p className="equation" data-reveal>
            <b>{megaparc2030.equation[locale].split(" = ")[0]}</b> = {megaparc2030.equation[locale].split(" = ")[1]}
          </p>
        </div>
      </Movement>

      <ClosingFrame
        kicker={brandLayers.model[locale]}
        title={brandLayers.statement[locale]}
        links={[
          { href: p("/portfolio"), label: c.cta },
          { href: `${p("/contact")}#opportunity`, label: c.ctaB, strong: true },
        ]}
      />
    </PageShell>
  );
}
