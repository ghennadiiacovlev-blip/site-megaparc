import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { ArrowLink, DataPending, PageHero, SectionIndex } from "@/components/primitives";
import { developmentProject, localePath, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    eyebrow: "Dezvoltare",
    title: ["De la oportunitate", "la activ durabil."],
    lead: "Dezvoltarea este integrată în ciclul investițional: concept, execuție, utilizare și valoare pe termen lung.",
    projectIndex: "Proiect în dezvoltare",
    view: "Explorează VATRA",
    narrative: "Proiectele sunt prezentate numai cu date și materiale aprobate pentru comunicare publică.",
    principlesIndex: "Cum dezvoltăm",
    principles: [
      ["Utilizare înainte de formă", "Un proiect pornește de la felul în care va fi folosit și administrat, nu de la imagine."],
      ["Execuție ca decizie de investiție", "Calitatea execuției determină costul de operare și relevanța activului pentru decenii."],
      ["Activ, nu livrabil", "Finalizarea construcției este începutul vieții activului în portofoliu."],
    ],
    pending: "Calendarul, indicatorii și materialele tehnice ale proiectelor vor fi publicate după aprobare.",
  },
  en: {
    eyebrow: "Development",
    title: ["From opportunity", "to enduring asset."],
    lead: "Development is integrated into the investment cycle: concept, delivery, use and long-term value.",
    projectIndex: "Development project",
    view: "Explore VATRA",
    narrative: "Projects are presented only with data and materials approved for public communication.",
    principlesIndex: "How we develop",
    principles: [
      ["Use before form", "A project starts from how it will be used and managed, not from its image."],
      ["Delivery as an investment decision", "Build quality determines operating cost and the asset's relevance for decades."],
      ["Asset, not deliverable", "Completion of construction is the beginning of the asset's life in the portfolio."],
    ],
    pending: "Project timelines, indicators and technical material will be published after approval.",
  },
} as const;

export function DevelopmentIndexPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];

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

      <Link href={localePath(locale, "/development/vatra")} className="feature-project ink" data-reveal>
        <div className="feature-project__media">
          <Image
            src={developmentProject.image}
            alt={`${developmentProject.name} — MEGAPARC`}
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
          <span className="eyebrow eyebrow--red">{c.projectIndex}</span>
          <h2>{developmentProject.name}</h2>
          <p>{c.narrative}</p>
          <span className="arrow-link arrow-link--inverse">
            <span>{c.view}</span>
            <span className="arrow-link__icon" aria-hidden="true">↗</span>
          </span>
        </div>
      </Link>

      <section className="principles paper principles--paper">
        <div className="shell">
          <SectionIndex no="04">{c.principlesIndex}</SectionIndex>
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
            <DataPending>{c.pending}</DataPending>
            <ArrowLink href={localePath(locale, "/development/vatra")}>{c.view}</ArrowLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
