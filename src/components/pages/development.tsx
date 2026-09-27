import { ClosingFrame, Index, Movement, Opening, RowList, Split, Statement, Timeline } from "@/components/editorial";
import { PageShell } from "@/components/page-shell";
import { ArrowLink, Note } from "@/components/primitives";
import { developmentProjects } from "@/lib/assets";
import { developmentNarrative } from "@/lib/strategy";
import { localePath, ui, type SiteLocale } from "@/lib/site-data";

/**
 * DEVELOPMENT — a real development story.
 * Full-bleed VATRA under the title → VATRA split (photo + stage + short
 * text) → thin architectural timeline with project markers → Drochia
 * Gateway clearly separated as CONCEPT UNDER EVALUATION → three principles →
 * closing.
 */
const copy = {
  ro: {
    eyebrow: "Dezvoltare",
    title: ["Dezvoltăm imobiliare", "de la idee la obiect în funcțiune."],
    lead: "Un proiect pornește de la un teren sau de la o clădire existentă și trece prin analiză, concept, evaluare economică, proiectare și realizare până la punerea în funcțiune.",
    heroCaption: "VATRA · vedere aeriană a amplasamentului",
    projectIndex: "Proiect în dezvoltare",
    stagesIndex: "Etapele proiectului",
    stagesTitle: "Șase etape.",
    stagesText: "Fiecare proiect este arătat la etapa lui, iar conceptele nu sunt prezentate ca arhitectură finalizată.",
    conceptLabel: "Concept în evaluare",
    conceptIndex: "Concept",
    conceptCta: "Vezi conceptul",
    principlesIndex: "Cum dezvoltăm",
    principles: [
      ["Funcția înaintea formei", "Mai întâi decidem cum va fi folosit și întreținut obiectul, apoi cum arată."],
      ["Controlul bugetului și al termenelor", "Calculăm economia înainte de a începe lucrările și ținem bugetul și graficul sub control la fiecare etapă."],
      ["Calitate gândită pentru exploatare", "Calitatea construcției determină costurile de exploatare și cererea pentru obiect în anii următori."],
    ],
    note: "Conceptele de dezvoltare sunt prezentate pentru discuție și sunt supuse verificărilor urbanistice, inginerești și comerciale.",
    closingTitle: "Aveți un teren sau un proiect?",
    ctaA: "Propune un teren",
    ctaB: "Discută un parteneriat",
  },
  ru: {
    eyebrow: "Девелопмент",
    title: ["Развиваем недвижимость", "от идеи до работающего объекта."],
    lead: "Проект начинается с участка или существующего здания и проходит через анализ, концепцию, экономическую оценку, проектирование и реализацию до ввода в эксплуатацию.",
    heroCaption: "VATRA · площадка с воздуха",
    projectIndex: "Проект в стадии развития",
    stagesIndex: "Этапы проекта",
    stagesTitle: "Шесть этапов.",
    stagesText: "Каждый проект показан на своей стадии, а концепции не представляются как завершённая архитектура.",
    conceptLabel: "Концепция на стадии оценки",
    conceptIndex: "Концепция",
    conceptCta: "Смотреть концепцию",
    principlesIndex: "Как мы развиваем",
    principles: [
      ["Функция прежде формы", "Сначала решаем, как объект будет использоваться и обслуживаться, потом — как он выглядит."],
      ["Контроль бюджета и сроков", "Считаем экономику до начала работ и держим бюджет и график под контролем на каждом этапе."],
      ["Качество, рассчитанное на эксплуатацию", "Качество строительства определяет расходы на эксплуатацию и востребованность объекта на годы вперёд."],
    ],
    note: "Концепции развития представлены для обсуждения и подлежат градостроительной, инженерной и коммерческой проверке.",
    closingTitle: "У вас есть участок или проект?",
    ctaA: "Предложить участок",
    ctaB: "Обсудить партнёрство",
  },
  en: {
    eyebrow: "Development",
    title: ["We take real estate", "from idea to a working building."],
    lead: "A project starts from a site or an existing building and moves through analysis, concept, economic assessment, design and delivery to commissioning.",
    heroCaption: "VATRA · aerial view of the site",
    projectIndex: "Project in development",
    stagesIndex: "Project stages",
    stagesTitle: "Six stages.",
    stagesText: "Each project is shown at its own stage, and concepts are never presented as finished architecture.",
    conceptLabel: "Concept under evaluation",
    conceptIndex: "Concept",
    conceptCta: "View the concept",
    principlesIndex: "How we develop",
    principles: [
      ["Function before form", "First we decide how a building will be used and maintained, then how it looks."],
      ["Budget and schedule control", "We run the numbers before work starts and keep budget and schedule under control at every stage."],
      ["Quality built for operation", "Build quality determines operating costs and demand for the property in the years ahead."],
    ],
    note: "Development concepts are presented for discussion and remain subject to planning, engineering and commercial review.",
    closingTitle: "Do you have a site or a project?",
    ctaA: "Submit a site",
    ctaB: "Discuss a partnership",
  },
} as const;

export function DevelopmentIndexPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const [vatra, drochia] = developmentProjects;
  const p = (path: string) => localePath(locale, path);
  const stageOf = (i: number) => developmentNarrative.stages[i];

  return (
    <PageShell locale={locale}>
      <Opening
        eyebrow={c.eyebrow}
        title={<>{c.title[0]} <span className="muted-ink">{c.title[1]}</span></>}
        lead={c.lead}
        media={{ src: vatra.media!.wide, alt: `${vatra.name} — ${vatra.status[locale]}`, position: vatra.media!.position }}
        caption={c.heroCaption}
      />

      {/* VATRA — photo + stage + short text */}
      <Movement tone="white" id="vatra">
        <Split media={{ src: vatra.media!.mobile, alt: `${vatra.name} — ${vatra.place[locale]}` }} ratio="4 / 5" href={p(`/development/${vatra.slug}`)} caption={`${vatra.name} · ${vatra.place[locale]}`}>
          <Index no="02">{c.projectIndex}</Index>
          <h2 className="split__title split__title--display">{vatra.name}</h2>
          <p className="split__kicker">{ui.stage[locale]} {stageOf(vatra.stage).no} · {stageOf(vatra.stage).title[locale]}</p>
          <p className="split__text">{vatra.headline[locale]} {vatra.lead[locale]}</p>
          <dl className="split__facts">
            <div><dt>{ui.status[locale]}</dt><dd>{vatra.status[locale]}</dd></div>
            <div><dt>{ui.location[locale]}</dt><dd>{vatra.place[locale]}</dd></div>
          </dl>
          <ArrowLink href={p(`/development/${vatra.slug}`)} strong>{ui.exploreProject[locale]}</ArrowLink>
        </Split>
      </Movement>

      {/* Six stages — thin timeline with project markers */}
      <Movement tone="stone" id="stages">
        <div className="shell">
          <Statement no="03" kicker={c.stagesIndex} title={c.stagesTitle} text={c.stagesText} size="md" />
          <Timeline
            label={c.stagesIndex}
            items={developmentNarrative.stages.map((stage, index) => {
              const here = developmentProjects.filter((project) => project.stage === index);
              return { key: stage.no, mark: stage.no, title: stage.title[locale], text: stage.text[locale], current: here.length > 0, tag: here.map((project) => project.name).join(" · ") || undefined };
            })}
          />
        </div>
      </Movement>

      {/* Drochia Gateway — concept, clearly separated */}
      <Movement tone="ink" id="concept">
        <div className="shell concept" data-reveal>
          <div className="concept__head">
            <Index no="04" inverse>{c.conceptIndex}</Index>
            <span className="concept__tag">{c.conceptLabel}</span>
          </div>
          <div className="concept__grid">
            <div>
              <h2 className="concept__name">{drochia.name}</h2>
              <p className="concept__place">{drochia.place[locale]} · {drochia.kind[locale]}</p>
            </div>
            <div className="concept__body">
              <p className="concept__lead">{drochia.headline[locale]} {drochia.lead[locale]}</p>
              <dl className="split__facts split__facts--inverse">
                <div><dt>{ui.status[locale]}</dt><dd>{drochia.status[locale]}</dd></div>
                <div><dt>{ui.stage[locale]}</dt><dd>{stageOf(drochia.stage).no} · {stageOf(drochia.stage).title[locale]}</dd></div>
              </dl>
              <Note light>{c.note}</Note>
              <ArrowLink href={p(`/development/${drochia.slug}`)} inverse>{c.conceptCta}</ArrowLink>
            </div>
          </div>
        </div>
      </Movement>

      {/* How we develop — three principles */}
      <Movement tone="paper" id="principles">
        <div className="shell">
          <Statement no="05" kicker={c.principlesIndex} title={c.principles[0][0] + "."} size="md" />
          <RowList large rows={c.principles.map(([title, text], i) => ({ key: title, no: `0${i + 1}`, title, text }))} />
        </div>
      </Movement>

      <ClosingFrame
        title={c.closingTitle}
        links={[
          { href: `${p("/contact")}#opportunity`, label: c.ctaA, strong: true },
          { href: `${p("/contact")}#partnership`, label: c.ctaB },
        ]}
      />
    </PageShell>
  );
}
