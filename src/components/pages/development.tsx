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
    title: ["Ce creăm", "în continuare?"],
    lead: "Dezvoltarea este integrată în ciclul de investiție: de la amplasament, la produs, la activ operațional. Fiecare proiect trece prin aceleași etape disciplinate, fără a sări peste decizia de investiție.",
    stagesIndex: "Sistemul de dezvoltare",
    stagesText: "Șase etape. Fiecare proiect public este poziționat pe această scară, iar conceptele nu sunt prezentate niciodată ca arhitectură finalizată.",
    positions: "Poziția proiectelor",
    pipelineIndex: "Proiecte și concepte",
    pipelineTitle: "Două proiecte. Două etape diferite.",
    pipelineText: "VATRA este un amplasament în execuție, cu imagini reale. Drochia Gateway este un concept în evaluare, sub rezerva verificărilor urbanistice, inginerești și comerciale.",
    principlesIndex: "Cum dezvoltăm",
    principles: [
      ["Utilizare înainte de formă", "Un proiect pornește de la felul în care va fi folosit și administrat, nu de la imagine."],
      ["Execuție ca decizie de investiție", "Calitatea execuției determină costul de operare și relevanța activului pentru decenii."],
      ["Activ, nu livrabil", "Finalizarea construcției este începutul fazei de operare sau al următoarei etape de investiție, conform strategiei de capital."],
    ],
    note: "Conceptele de dezvoltare sunt prezentate ca subiecte de discuție, sub rezerva verificărilor urbanistice, inginerești și comerciale.",
    ctaA: "Propune un amplasament",
    ctaB: "Discută un parteneriat",
  },
  ru: {
    eyebrow: "Девелопмент",
    title: ["Что мы создаём", "дальше?"],
    lead: "Девелопмент интегрирован в инвестиционный цикл: от площадки — к продукту — к операционному активу. Каждый проект проходит одни и те же дисциплинированные этапы, не пропуская инвестиционное решение.",
    stagesIndex: "Система девелопмента",
    stagesText: "Шесть этапов. Каждый публичный проект позиционируется на этой шкале, а концепции никогда не представляются как завершённая архитектура.",
    positions: "Положение проектов",
    pipelineIndex: "Проекты и концепции",
    pipelineTitle: "Два проекта. Два разных этапа.",
    pipelineText: "VATRA — площадка в реализации с реальными снимками. Drochia Gateway — концепция в оценке, подлежащая градостроительной, инженерной и коммерческой проверке.",
    principlesIndex: "Как мы развиваем",
    principles: [
      ["Назначение прежде формы", "Проект начинается с того, как он будет использоваться и управляться, а не с картинки."],
      ["Реализация как инвестиционное решение", "Качество строительства определяет эксплуатационные затраты и актуальность актива на десятилетия."],
      ["Актив, а не результат стройки", "Завершение строительства — начало фазы эксплуатации или следующего инвестиционного этапа согласно стратегии капитала."],
    ],
    note: "Концепции развития представлены как предмет для обсуждения и подлежат градостроительной, инженерной и коммерческой проверке.",
    ctaA: "Предложить площадку",
    ctaB: "Обсудить партнёрство",
  },
  en: {
    eyebrow: "Development",
    title: ["What are we", "creating next?"],
    lead: "Development is integrated into the investment cycle: from site, to product, to operating asset. Every project passes through the same disciplined stages, never skipping the investment decision.",
    stagesIndex: "The development system",
    stagesText: "Six stages. Every public project is positioned on this scale, and concepts are never presented as completed architecture.",
    positions: "Project positions",
    pipelineIndex: "Projects and concepts",
    pipelineTitle: "Two projects. Two different stages.",
    pipelineText: "VATRA is a site under delivery, with real imagery. Drochia Gateway is a concept under evaluation, subject to planning, engineering and commercial due diligence.",
    principlesIndex: "How we develop",
    principles: [
      ["Use before form", "A project starts from how it will be used and managed, not from its image."],
      ["Delivery as an investment decision", "Build quality determines operating cost and the asset's relevance for decades."],
      ["Asset, not deliverable", "Completion of construction is the beginning of the operating or next investment phase according to the capital strategy."],
    ],
    note: "Development concepts are presented for discussion and remain subject to planning, engineering and commercial due diligence.",
    ctaA: "Submit a site",
    ctaB: "Discuss a partnership",
  },
} as const;

export function DevelopmentIndexPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const [vatra] = developmentProjects;
  const p = (path: string) => localePath(locale, path);
  const [first, ...restTitle] = developmentNarrative.title[locale].split(",");

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
            <h2 className="dev-stages__title">
              {first},<b>{restTitle.join(",")}</b>
            </h2>
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

      <section className="principles ink">
        <div className="shell">
          <SectionIndex no="04" inverse>{c.principlesIndex}</SectionIndex>
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
            <ArrowLink href={`${p("/contact")}#opportunity`} inverse>{c.ctaA}</ArrowLink>
            <ArrowLink href={`${p("/contact")}#partnership`} inverse>{c.ctaB}</ArrowLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
