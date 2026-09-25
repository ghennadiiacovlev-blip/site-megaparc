import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { DataPending, PageHero, SectionIndex } from "@/components/primitives";
import { brand, localePath, ui, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    eyebrow: "Contact",
    title: ["Construim", "ce"],
    em: "urmează.",
    lead: "Alege tipul discuției. Datele publice de contact și formularele se activează după validarea legală și de confidențialitate.",
    intentsIndex: "Tipul discuției",
    intents: [
      ["Caut un spațiu", "Închiriere · disponibilități comerciale", "/opportunities"],
      ["Propun o proprietate", "Investiție · oportunitate de achiziție", "/contact"],
      ["Discuție corporate", "Parteneriate · companie · presă", "/contact"],
    ],
    detailsIndex: "Date de contact",
    details: [
      ["Sediu", "Chișinău, Republica Moldova"],
      ["Telefon", null],
      ["E-mail", null],
      ["Informații juridice", null],
    ],
  },
  en: {
    eyebrow: "Contact",
    title: ["We build", "what comes"],
    em: "next.",
    lead: "Choose the purpose of the conversation. Public contact details and forms activate after legal and privacy approval.",
    intentsIndex: "Purpose",
    intents: [
      ["Find a space", "Leasing · commercial availability", "/opportunities"],
      ["Submit a property", "Investment · acquisition opportunity", "/contact"],
      ["Corporate enquiry", "Partnerships · company · press", "/contact"],
    ],
    detailsIndex: "Contact details",
    details: [
      ["Office", "Chișinău, Republic of Moldova"],
      ["Telephone", null],
      ["E-mail", null],
      ["Legal information", null],
    ],
  },
} as const;

export function ContactPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);

  return (
    <PageShell locale={locale}>
      <PageHero
        index="06"
        eyebrow={c.eyebrow}
        title={
          <>
            {c.title[0]}
            <br />
            {c.title[1]} <em>{c.em}</em>
          </>
        }
        lead={c.lead}
      />

      <section className="intents ink">
        <div className="shell">
          <SectionIndex no="07" inverse>{c.intentsIndex}</SectionIndex>
          <div className="intents__list">
            {c.intents.map(([title, meta, path], index) => (
              <Link key={title} href={path === "/contact" ? "#contact-details" : p(path)} className="intents__row" data-reveal>
                <span className="intents__no">0{index + 1}</span>
                <h2>{title}</h2>
                <span className="intents__meta">{meta}</span>
                <span className="intents__arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="details paper" id="contact-details">
        <div className="shell">
          <SectionIndex no="08">{c.detailsIndex}</SectionIndex>
          <div className="details__grid" data-reveal>
            <h2>{brand.name}</h2>
            <dl className="details__list">
              {c.details.map(([term, value]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{value ?? <span className="details__pending">{ui.ownerInput[locale]}</span>}</dd>
                </div>
              ))}
            </dl>
          </div>
          <DataPending>{ui.legalPending[locale]}</DataPending>
        </div>
      </section>
    </PageShell>
  );
}
