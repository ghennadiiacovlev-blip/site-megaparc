import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { ArrowLink, DataPending, PageHero, SectionIndex } from "@/components/primitives";
import { localePath, ui, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    eyebrow: "Disponibilități comerciale",
    title: ["Spațiul potrivit", "pentru următoarea etapă."],
    lead: "Disponibilitățile comerciale sunt prezentate separat de portofoliul instituțional și includ numai spațiile aprobate pentru promovare.",
    distinctionIndex: "Două prezentări distincte",
    distinction: [
      ["Portofoliu instituțional", "Active deținute sau administrate de MEGAPARC, prezentate ca profil de activ: arhitectură, utilizare, status, abordare."],
      ["Disponibilități comerciale", "Spații concrete disponibile pentru închiriere, cu informații actualizate și aprobate: tip, suprafață, disponibilitate."],
    ],
    intentsIndex: "Solicitări",
    intents: [
      ["Spații retail și comerciale", "Parter comercial, showroom, servicii"],
      ["Spații office", "Birouri și spații de business"],
      ["Alte solicitări", "Utilizări speciale, parteneriate, propuneri"],
    ],
    request: "Solicită informații",
    pending: "Lista publică a spațiilor disponibile este în curs de validare. Nu publicăm suprafețe, chirii sau termeni până la aprobare.",
    closingIndex: "Portofoliu",
    closing: "Activele MEGAPARC sunt prezentate ca profil de activ, nu ca anunț.",
    closingCta: "Vezi portofoliul",
  },
  en: {
    eyebrow: "Commercial opportunities",
    title: ["The right space", "for what comes next."],
    lead: "Commercial availability is presented separately from the institutional portfolio and includes only spaces approved for promotion.",
    distinctionIndex: "Two distinct presentations",
    distinction: [
      ["Institutional portfolio", "Assets owned or managed by MEGAPARC, presented as asset profiles: architecture, use, status, approach."],
      ["Commercial availability", "Specific spaces available for lease, with current and approved information: type, area, availability."],
    ],
    intentsIndex: "Enquiries",
    intents: [
      ["Retail and commercial space", "Ground-floor retail, showroom, services"],
      ["Office space", "Offices and business premises"],
      ["Other enquiries", "Special uses, partnerships, proposals"],
    ],
    request: "Request information",
    pending: "The public list of available spaces is pending validation. We do not publish areas, rents or terms before approval.",
    closingIndex: "Portfolio",
    closing: "MEGAPARC assets are presented as asset profiles, not as listings.",
    closingCta: "View the portfolio",
  },
} as const;

export function OpportunitiesPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);

  return (
    <PageShell locale={locale}>
      <PageHero
        index="04"
        eyebrow={c.eyebrow}
        title={
          <>
            {c.title[0]}
            <br />
            <span className="muted-ink">{c.title[1]}</span>
          </>
        }
        lead={c.lead}
      >
        <DataPending>{ui.ownerInput[locale]}</DataPending>
      </PageHero>

      <section className="distinction paper">
        <div className="shell">
          <SectionIndex no="05">{c.distinctionIndex}</SectionIndex>
          <div className="distinction__grid">
            {c.distinction.map(([title, text], index) => (
              <article key={title} data-reveal className={index === 1 ? "is-current" : undefined}>
                <span className="label label--red">0{index + 1}</span>
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="intents ink">
        <div className="shell">
          <SectionIndex no="06" inverse>{c.intentsIndex}</SectionIndex>
          <div className="intents__list">
            {c.intents.map(([title, meta], index) => (
              <Link key={title} href={p("/contact")} className="intents__row" data-reveal>
                <span className="intents__no">0{index + 1}</span>
                <h2>{title}</h2>
                <span className="intents__meta">{meta}</span>
                <span className="intents__cta">{c.request} ↗</span>
              </Link>
            ))}
          </div>
          <DataPending light>{c.pending}</DataPending>
        </div>
      </section>

      <section className="closing paper">
        <div className="shell closing__grid" data-reveal>
          <span className="label label--red">07 / {c.closingIndex}</span>
          <div>
            <p className="closing__statement">{c.closing}</p>
            <ArrowLink href={p("/portfolio")}>{c.closingCta}</ArrowLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
