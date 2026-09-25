import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { ArrowLink, MediaPlaceholder, Note, PageHero, SectionIndex } from "@/components/primitives";
import { developmentProjects } from "@/lib/assets";
import { localePath, ui, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    eyebrow: "Dezvoltare",
    title: ["De la oportunitate", "la activ durabil."],
    lead: "Dezvoltarea este integrată în ciclul investițional: concept, execuție, utilizare și valoare pe termen lung.",
    pipelineIndex: "Proiecte și concepte",
    principlesIndex: "Cum dezvoltăm",
    principles: [
      ["Utilizare înainte de formă", "Un proiect pornește de la felul în care va fi folosit și administrat, nu de la imagine."],
      ["Execuție ca decizie de investiție", "Calitatea execuției determină costul de operare și relevanța activului pentru decenii."],
      ["Activ, nu livrabil", "Finalizarea construcției este începutul vieții activului în portofoliu."],
    ],
    note: "Conceptele de dezvoltare sunt prezentate ca subiecte de discuție, sub rezerva verificărilor urbanistice, inginerești și comerciale.",
  },
  ru: {
    eyebrow: "Девелопмент",
    title: ["От возможности", "к устойчивому активу."],
    lead: "Девелопмент интегрирован в инвестиционный цикл: концепция, реализация, использование и долгосрочная стоимость.",
    pipelineIndex: "Проекты и концепции",
    principlesIndex: "Как мы развиваем",
    principles: [
      ["Назначение прежде формы", "Проект начинается с того, как он будет использоваться и управляться, а не с картинки."],
      ["Реализация как инвестиционное решение", "Качество строительства определяет эксплуатационные затраты и актуальность актива на десятилетия."],
      ["Актив, а не результат стройки", "Завершение строительства — начало жизни актива в портфеле."],
    ],
    note: "Концепции развития представлены как предмет для обсуждения и подлежат градостроительной, инженерной и коммерческой проверке.",
  },
  en: {
    eyebrow: "Development",
    title: ["From opportunity", "to enduring asset."],
    lead: "Development is integrated into the investment cycle: concept, delivery, use and long-term value.",
    pipelineIndex: "Projects and concepts",
    principlesIndex: "How we develop",
    principles: [
      ["Use before form", "A project starts from how it will be used and managed, not from its image."],
      ["Delivery as an investment decision", "Build quality determines operating cost and the asset's relevance for decades."],
      ["Asset, not deliverable", "Completion of construction is the beginning of the asset's life in the portfolio."],
    ],
    note: "Development concepts are presented for discussion and remain subject to planning, engineering and commercial due diligence.",
  },
} as const;

export function DevelopmentIndexPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const [vatra, ...concepts] = developmentProjects;
  const p = (path: string) => localePath(locale, path);

  return (
    <PageShell locale={locale}>
      <PageHero
        index="03"
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

      <Link href={p(`/development/${vatra.slug}`)} className="feature-project ink" data-reveal>
        <div className="feature-project__media">
          <Image
            src={vatra.image!}
            alt={`${vatra.name} — MEGAPARC`}
            fill
            priority
            sizes="100vw"
            className="feature-project__image"
            data-depth="24"
            style={{ objectPosition: "50% 60%" }}
          />
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
          <SectionIndex no="04">{c.pipelineIndex}</SectionIndex>
          <div className="pipeline pipeline--paper">
            {developmentProjects.map((project, index) => (
              <Link key={project.slug} href={p(`/development/${project.slug}`)} className="pipeline__card" data-reveal>
                <div className="pipeline__visual">
                  {project.image ? (
                    <Image
                      src={project.imageSmall ?? project.image}
                      alt={`${project.name} — MEGAPARC`}
                      fill
                      sizes="(max-width: 720px) 92vw, 46vw"
                      className="pipeline__image"
                      data-depth="18"
                      style={{ objectPosition: "50% 62%" }}
                    />
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
                    <span>{project.place[locale]}</span>
                  </div>
                </div>
                <p className="pipeline__lead">{project.lead[locale]}</p>
              </Link>
            ))}
          </div>
          {concepts.length ? <Note>{c.note}</Note> : null}
        </div>
      </section>

      <section className="principles ink">
        <div className="shell">
          <SectionIndex no="05" inverse>{c.principlesIndex}</SectionIndex>
          <div className="principles__grid">
            {c.principles.map(([title, text], index) => (
              <article key={title} data-reveal>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="principles__foot" data-reveal>
            <ArrowLink href={p("/contact")} inverse>{ui.discussProject[locale]}</ArrowLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
