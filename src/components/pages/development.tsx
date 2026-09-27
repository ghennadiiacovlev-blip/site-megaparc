import { PageShell } from "@/components/page-shell";
import { Button, Facts, Head, Hero, Kicker, Quote, Rows, Section, Split, Stages, TextLink } from "@/components/ui";
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
  const p = (path: string) => localePath(locale, path);
  const [vatra, drochia] = developmentProjects;
  const stageOf = (i: number) => developmentNarrative.stages[i];

  return (
    <PageShell locale={locale}>
      <Hero size="page" media={{ src: vatra.media!.wide, alt: `${vatra.name} — ${vatra.status[locale]}`, position: vatra.media!.position }} title={<>{c.title[0]} {c.title[1]}</>} line={c.eyebrow} caption={c.heroCaption} />

      {/* VATRA — the development story */}
      <Split media={{ src: vatra.media!.mobile, alt: `${vatra.name} — ${vatra.place[locale]}` }} href={p(`/development/${vatra.slug}`)} ratio="4 / 5" id="vatra" caption={`${vatra.name} · ${vatra.place[locale]}`}>
        <Kicker>{c.projectIndex}</Kicker>
        <h2 className="h2 h2--display">{vatra.name}</h2>
        <p>{vatra.headline[locale]} {vatra.lead[locale]}</p>
        <Facts items={[{ label: ui.status[locale], value: vatra.status[locale] }, { label: ui.location[locale], value: vatra.place[locale] }, { label: ui.stage[locale], value: `${stageOf(vatra.stage).no} · ${stageOf(vatra.stage).title[locale]}` }]} />
        <Button href={p(`/development/${vatra.slug}`)}>{ui.exploreProject[locale]}</Button>
      </Split>

      {/* SIX STAGES — minimal indicator */}
      <Section tone="paper" id="stages">
        <div className="shell">
          <Head kicker={c.stagesIndex} title={c.stagesTitle} text={c.stagesText} />
          <Stages
            label={c.stagesIndex}
            items={developmentNarrative.stages.map((stage, index) => {
              const here = developmentProjects.filter((project) => project.stage === index);
              return { key: stage.no, no: stage.no, title: stage.title[locale], current: here.length > 0, tag: here.map((project) => project.name).join(" · ") || undefined };
            })}
          />
        </div>
      </Section>

      {/* DROCHIA GATEWAY — concept under evaluation, visually secondary */}
      <Section tone="ink" id="concept">
        <div className="shell concept" data-reveal>
          <span className="concept__tag">{c.conceptLabel}</span>
          <div className="concept__grid">
            <div>
              <Kicker className="kicker--light">{c.conceptIndex}</Kicker>
              <h2 className="h2">{drochia.name}</h2>
              <p className="meta meta--light">{drochia.place[locale]} · {drochia.kind[locale]}</p>
            </div>
            <div className="concept__body">
              <p>{drochia.headline[locale]} {drochia.lead[locale]}</p>
              <Facts className="facts--light" items={[{ label: ui.status[locale], value: drochia.status[locale] }, { label: ui.stage[locale], value: `${stageOf(drochia.stage).no} · ${stageOf(drochia.stage).title[locale]}` }]} />
              <p className="note note--light">{c.note}</p>
              <TextLink href={p(`/development/${drochia.slug}`)} className="tlink--light">{c.conceptCta}</TextLink>
            </div>
          </div>
        </div>
      </Section>

      {/* HOW WE DEVELOP */}
      <Section id="principles">
        <div className="shell">
          <Head kicker={c.principlesIndex} title={c.principles[0][0] + "."} />
          <Rows large rows={c.principles.map(([title, text], i) => ({ key: title, no: `0${i + 1}`, title, text }))} />
        </div>
      </Section>

      <Quote tone="graphite" statement={c.closingTitle} action={<><Button href={`${p("/contact")}#opportunity`} variant="light">{c.ctaA}</Button><TextLink href={`${p("/contact")}#partnership`} className="tlink--light">{c.ctaB}</TextLink></>} />
    </PageShell>
  );
}
