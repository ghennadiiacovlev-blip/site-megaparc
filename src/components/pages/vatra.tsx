import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { ArrowLink, DataPending, SectionIndex } from "@/components/primitives";
import { brand, developmentProject, localePath, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    back: "Dezvoltare",
    status: "Dezvoltare / VATRA",
    lead: "Un proiect de dezvoltare MEGAPARC, prezentat cu conceptul, etapele și materialele aprobate pentru comunicare publică.",
    introIndex: "Proiect",
    introTitle: ["Un proiect gândit", "ca activ, nu ca livrabil."],
    introText:
      "VATRA este privit de la început prin prisma utilizării și a administrării pe termen lung. Dezvoltarea nu se încheie la recepție: atunci începe viața activului în portofoliu.",
    stagesIndex: "Etape",
    stagesTitle: ["De la teren", "la activ."],
    stages: [
      ["Concept", "Definirea utilizării, a scării și a economiei proiectului."],
      ["Planificare", "Proiectare, autorizare și pregătirea execuției."],
      ["Execuție", "Construcție, control al calității și al costului."],
      ["Utilizare pe termen lung", "Administrare ca activ MEGAPARC, cu relevanță protejată în timp."],
    ],
    pending: "Datele tehnice, calendarul și indicatorii publici ai proiectului vor fi completați după aprobare.",
    statement: "Construim pentru utilizarea de mâine.",
    enquiryIndex: "Solicitare",
    enquiry: "Discută despre proiect",
    allProjects: "Înapoi la Dezvoltare",
  },
  en: {
    back: "Development",
    status: "Development / VATRA",
    lead: "A MEGAPARC development project, presented with the concept, stages and material approved for public communication.",
    introIndex: "Project",
    introTitle: ["A project conceived", "as an asset, not a deliverable."],
    introText:
      "VATRA is viewed from the outset through use and long-term management. Development does not end at handover: that is when the asset's life in the portfolio begins.",
    stagesIndex: "Stages",
    stagesTitle: ["From land", "to asset."],
    stages: [
      ["Concept", "Defining use, scale and the economics of the project."],
      ["Planning", "Design, permitting and preparation for delivery."],
      ["Delivery", "Construction, quality and cost control."],
      ["Long-term use", "Managed as a MEGAPARC asset, with relevance protected over time."],
    ],
    pending: "Technical data, timing and public indicators for the project will be added after approval.",
    statement: "We build for tomorrow's use.",
    enquiryIndex: "Enquiry",
    enquiry: "Discuss the project",
    allProjects: "Back to Development",
  },
} as const;

export function VatraPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);

  return (
    <PageShell locale={locale} mainClassName="vatra">
      <section className="vatra-hero">
        <div className="vatra-hero__media" aria-hidden="true">
          <Image
            src={developmentProject.image}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="vatra-hero__image"
            data-depth="28"
            style={{ objectPosition: "50% 62%" }}
          />
          <div className="vatra-hero__veil" />
        </div>
        <div className="shell vatra-hero__top">
          <Link href={p("/development")} className="back-link back-link--light">← {c.back}</Link>
          <span>{c.status}</span>
        </div>
        <div className="shell vatra-hero__copy" data-reveal>
          <p className="eyebrow eyebrow--red">{developmentProject.status[locale]}</p>
          <h1>{developmentProject.name}</h1>
          <p className="vatra-hero__lead">{c.lead}</p>
        </div>
      </section>

      <section className="vatra-intro paper">
        <div className="shell">
          <SectionIndex no="01">{c.introIndex}</SectionIndex>
          <div className="copy-grid" data-reveal>
            <h2>
              {c.introTitle[0]}
              <br />
              <span className="muted-ink">{c.introTitle[1]}</span>
            </h2>
            <div>
              <p className="lead">{c.introText}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stages ink">
        <div className="shell">
          <SectionIndex no="02" inverse>{c.stagesIndex}</SectionIndex>
          <div className="stages__grid">
            <div className="stages__heading" data-reveal>
              <h2>
                {c.stagesTitle[0]}
                <br />
                {c.stagesTitle[1]}
              </h2>
              <DataPending light>{c.pending}</DataPending>
            </div>
            <ol className="stages__list">
              {c.stages.map(([title, text], index) => (
                <li key={title} data-reveal>
                  <span className="stages__no">0{index + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="vatra-depth" aria-label={c.statement}>
        <div className="vatra-depth__media">
          <Image
            src={developmentProject.image}
            alt=""
            fill
            sizes="100vw"
            className="vatra-depth__image"
            data-depth="30"
            style={{ objectPosition: "50% 82%" }}
          />
          <div className="vatra-depth__veil" />
        </div>
        <div className="shell vatra-depth__content" data-reveal>
          <span className="label label--light">{brand.name} · {developmentProject.name}</span>
          <p>{c.statement}</p>
        </div>
      </section>

      <section className="enquiry ink">
        <div className="shell">
          <SectionIndex no="03" inverse>{c.enquiryIndex}</SectionIndex>
          <div className="enquiry__grid" data-reveal>
            <h2>{developmentProject.name}</h2>
            <div className="enquiry__actions">
              <ArrowLink href={p("/contact")} inverse>{c.enquiry}</ArrowLink>
              <ArrowLink href={p("/development")} inverse>{c.allProjects}</ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
