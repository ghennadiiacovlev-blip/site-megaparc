import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { ArrowLink, MediaPlaceholder, Note, PageHero, SectionHead, SectionIndex } from "@/components/primitives";
import { developmentProjects } from "@/lib/assets";
import { developmentNarrative } from "@/lib/strategy";
import { localePath, ui, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    eyebrow: "Dezvoltare",
    title: ["Dezvoltăm proiecte", "de la idee la realizare."],
    lead: "Un proiect pornește de la un teren sau de la o clădire existentă și trece prin concept, evaluare economică, proiectare și construcție până la punerea în funcțiune.",
    stagesIndex: "Etapele proiectului",
    stagesText: "Șase etape. Fiecare proiect este arătat la etapa lui, iar conceptele nu sunt prezentate ca arhitectură finalizată.",
    pipelineIndex: "Proiecte și concepte",
    pipelineTitle: "Două proiecte. Două etape diferite.",
    pipelineText: "VATRA este un amplasament în lucru, cu imagini reale. Drochia Gateway este un concept aflat în verificare urbanistică, inginerească și comercială.",
    principlesIndex: "Cum dezvoltăm",
    principles: [
      ["Funcția înaintea formei", "Mai întâi decidem cum va fi folosit și întreținut obiectul, apoi cum arată."],
      ["Controlul bugetului și al termenelor", "Calculăm economia înainte de a începe lucrările și ținem bugetul și graficul sub control la fiecare etapă."],
      ["Calitate gândită pentru exploatare", "Calitatea construcției determină costurile de exploatare și cererea pentru obiect în anii următori."],
    ],
    note: "Conceptele de dezvoltare sunt prezentate pentru discuție și sunt supuse verificărilor urbanistice, inginerești și comerciale.",
    ctaA: "Propune un teren",
    ctaB: "Discută un parteneriat",
  },
  ru: {
    eyebrow: "Девелопмент",
    title: ["Развиваем проекты", "от идеи до реализации."],
    lead: "Проект начинается с участка или существующего здания и проходит через концепцию, экономическую оценку, проектирование и строительство до ввода в эксплуатацию.",
    stagesIndex: "Этапы проекта",
    stagesText: "Шесть этапов. Каждый проект показан на своей стадии, а концепции не представляются как завершённая архитектура.",
    pipelineIndex: "Проекты и концепции",
    pipelineTitle: "Два проекта. Две разные стадии.",
    pipelineText: "VATRA — площадка в работе с реальными снимками. Drochia Gateway — концепция, которая проходит градостроительную, инженерную и коммерческую проверку.",
    principlesIndex: "Как мы развиваем",
    principles: [
      ["Функция прежде формы", "Сначала решаем, как объект будет использоваться и обслуживаться, потом — как он выглядит."],
      ["Контроль бюджета и сроков", "Считаем экономику до начала работ и держим бюджет и график под контролем на каждом этапе."],
      ["Качество, рассчитанное на эксплуатацию", "Качество строительства определяет расходы на эксплуатацию и востребованность объекта на годы вперёд."],
    ],
    note: "Концепции развития представлены для обсуждения и подлежат градостроительной, инженерной и коммерческой проверке.",
    ctaA: "Предложить участок",
    ctaB: "Обсудить партнёрство",
  },
  en: {
    eyebrow: "Development",
    title: ["We take projects", "from idea to completion."],
    lead: "A project starts from a site or an existing building and moves through concept, economic assessment, design and construction to commissioning.",
    stagesIndex: "Project stages",
    stagesText: "Six stages. Each project is shown at its own stage, and concepts are never presented as finished architecture.",
    pipelineIndex: "Projects and concepts",
    pipelineTitle: "Two projects. Two different stages.",
    pipelineText: "VATRA is a site under way, with real imagery. Drochia Gateway is a concept undergoing planning, engineering and commercial review.",
    principlesIndex: "How we develop",
    principles: [
      ["Function before form", "First we decide how a building will be used and maintained, then how it looks."],
      ["Budget and schedule control", "We run the numbers before work starts and keep budget and schedule under control at every stage."],
      ["Quality built for operation", "Build quality determines operating costs and demand for the property in the years ahead."],
    ],
    note: "Development concepts are presented for discussion and remain subject to planning, engineering and commercial review.",
    ctaA: "Submit a site",
    ctaB: "Discuss a partnership",
  },
} as const;

export function DevelopmentIndexPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const [vatra] = developmentProjects;
  const p = (path: string) => localePath(locale, path);

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
      />

      <section className="dev-stages stone" id="stages">
        <div className="shell">
          <SectionIndex no="02">{c.stagesIndex}</SectionIndex>
          <div className="section-head" data-reveal>
            <h2 className="dev-stages__title">{developmentNarrative.title[locale]}</h2>
            <div className="section-head__aside">
              <p>{c.stagesText}</p>
            </div>
          </div>
          <ol className="dev-stages__list">
            {developmentNarrative.stages.map((stage, index) => {
              const here = developmentProjects.filter((project) => project.stage === index);
              return (
                <li key={stage.no} className={here.length ? "is-current" : undefined} data-reveal>
                  <span>{stage.no}</span>
                  <h3>{stage.title[locale]}</h3>
                  <p>{stage.text[locale]}</p>
                  {here.map((project) => (
                    <span key={project.slug} className="label label--red">{project.name}</span>
                  ))}
                </li>
              );
            })}
          </ol>
          <div className="dev-stages__projects" data-reveal>
            {developmentProjects.map((project) => (
              <Link key={project.slug} href={p(`/development/${project.slug}`)} className="dev-stages__project">
                <span>{project.name} · {project.place[locale]}</span>
                <span>{ui.stage[locale]} {developmentNarrative.stages[project.stage].no} · {developmentNarrative.stages[project.stage].title[locale]}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Link href={p(`/development/${vatra.slug}`)} className="feature-project ink" data-reveal>
        <div className="feature-project__media">
          <Image src={vatra.media!.src} alt={`${vatra.name} — ${vatra.status[locale]}`} fill priority sizes="100vw" className="feature-project__image" data-depth="24" style={{ objectPosition: vatra.media!.position }} />
          <div className="feature-project__veil" />
        </div>
        <div className="shell feature-project__content">
          <span className="eyebrow eyebrow--red">{vatra.status[locale]} · {vatra.place[locale]}</span>
          <h2>{vatra.name}</h2>
          <p>{vatra.lead[locale]}</p>
          <span className="arrow-link arrow-link--inverse">
            <span>{ui.exploreProject[locale]}</span>
            <span className="arrow-link__icon" aria-hidden="true">↗</span>
          </span>
        </div>
      </Link>

      <section className="pipeline-section paper">
        <div className="shell">
          <SectionIndex no="03">{c.pipelineIndex}</SectionIndex>
          <SectionHead title={c.pipelineTitle} text={c.pipelineText} />
          <div className="pipeline pipeline--paper">
            {developmentProjects.map((project, index) => (
              <Link key={project.slug} href={p(`/development/${project.slug}`)} className="pipeline__card" data-reveal>
                <div className="pipeline__visual">
                  {project.media ? (
                    <Image src={project.media.card} alt={`${project.name} — ${project.status[locale]}`} fill sizes="(max-width: 720px) 92vw, 46vw" className="pipeline__image" data-depth="18" style={{ objectPosition: "50% 60%" }} />
                  ) : (
                    <MediaPlaceholder title={project.name} note={project.status[locale]} compact />
                  )}
                  <span className="asset-media__line" aria-hidden="true" />
                </div>
                <div className="pipeline__caption">
                  <div>
                    <span className="pipeline__no">0{index + 1}</span>
                    <h3>{project.name}</h3>
                  </div>
                  <div>
                    <span>{project.status[locale]}</span>
                    <span>{ui.stage[locale]} {developmentNarrative.stages[project.stage].no}</span>
                  </div>
                </div>
                <p className="pipeline__lead">{project.headline[locale]} {project.lead[locale]}</p>
              </Link>
            ))}
          </div>
          <Note>{c.note}</Note>
        </div>
      </section>

      <section className="principles stone">
        <div className="shell">
          <SectionIndex no="04">{c.principlesIndex}</SectionIndex>
          <div className="principles__grid principles__grid--3">
            {c.principles.map(([title, text], index) => (
              <article key={title} data-reveal>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="principles__foot" data-reveal>
            <ArrowLink href={`${p("/contact")}#opportunity`}>{c.ctaA}</ArrowLink>
            <ArrowLink href={`${p("/contact")}#partnership`}>{c.ctaB}</ArrowLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
