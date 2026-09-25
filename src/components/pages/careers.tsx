import { PageShell } from "@/components/page-shell";
import { ArrowLink, DataPending, PageHero, SectionIndex } from "@/components/primitives";
import { localePath, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    eyebrow: "Cariere",
    title: ["Construit de oameni", "care gândesc ca proprietari."],
    lead: "MEGAPARC reunește gândire investițională, dezvoltare, administrare și execuție într-o platformă construită pentru termen lung.",
    valuesIndex: "Cum lucrăm",
    values: [
      ["Disciplină", "Deciziile pornesc de la economie, utilizare și valoare pe termen lung."],
      ["Responsabilitate", "Fiecare rol privește activul cu mentalitatea proprietarului."],
      ["Perspectivă", "Construim pentru nevoile de astăzi fără a pierde din vedere relevanța de mâine."],
    ],
    openingsIndex: "Poziții publice",
    emptyTitle: "Nu există poziții publicate în acest moment.",
    emptyText: "Rolurile și datele de contact pentru recrutare vor fi publicate după validare. Până atunci, solicitările pot fi transmise prin pagina de contact.",
    pending: "Recrutare · informații publice în curs de validare",
    cta: "Discuție corporate",
  },
  en: {
    eyebrow: "Careers",
    title: ["Built by people", "who think like owners."],
    lead: "MEGAPARC brings together investment thinking, development, management and execution in a platform built for the long term.",
    valuesIndex: "How we work",
    values: [
      ["Discipline", "Decisions begin with economics, use and long-term value."],
      ["Ownership", "Every role looks at the asset with an owner's mindset."],
      ["Perspective", "We build for today's needs without losing sight of tomorrow's relevance."],
    ],
    openingsIndex: "Public openings",
    emptyTitle: "There are no published openings at this time.",
    emptyText: "Roles and recruitment contact details will be published after validation. Until then, enquiries can be sent through the contact page.",
    pending: "Recruitment · public information pending validation",
    cta: "Corporate enquiry",
  },
} as const;

export function CareersPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];

  return (
    <PageShell locale={locale}>
      <PageHero
        index="05"
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

      <section className="principles paper principles--paper">
        <div className="shell">
          <SectionIndex no="06">{c.valuesIndex}</SectionIndex>
          <div className="principles__grid">
            {c.values.map(([title, text], index) => (
              <article key={title} data-reveal>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="empty-state ink">
        <div className="shell">
          <SectionIndex no="07" inverse>{c.openingsIndex}</SectionIndex>
          <div className="empty-state__grid" data-reveal>
            <h2>{c.emptyTitle}</h2>
            <div>
              <p>{c.emptyText}</p>
              <DataPending light>{c.pending}</DataPending>
              <ArrowLink href={localePath(locale, "/contact")} inverse>{c.cta}</ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
