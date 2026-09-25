import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Note, PageHero, SectionIndex } from "@/components/primitives";
import { brand, localePath, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    eyebrow: "Contact",
    title: ["Construim", "ce"],
    em: "urmează.",
    lead: "Alege tipul discuției. Răspundem solicitărilor privind spații disponibile, propuneri de proprietăți și parteneriate corporate.",
    intentsIndex: "Tipul discuției",
    intents: [
      ["Caut un spațiu", "Închiriere · disponibilități comerciale", "/opportunities"],
      ["Propun o proprietate", "Investiție · oportunitate de achiziție", "#contact-details"],
      ["Discuție corporate", "Parteneriate · companie · presă", "#contact-details"],
    ],
    detailsIndex: "Date de contact",
    office: "Sediu",
    officeValue: "Chișinău, Republica Moldova",
    company: "Companie",
    companyValue: "MEGAPARC SRL",
    note: "Datele de contact directe și informațiile juridice sunt disponibile la cerere și vor fi publicate odată cu lansarea oficială a site-ului.",
  },
  ru: {
    eyebrow: "Контакты",
    title: ["Строим", "то, что"],
    em: "дальше.",
    lead: "Выберите тему обращения. Мы отвечаем на запросы о доступных помещениях, предложения объектов и корпоративные партнёрства.",
    intentsIndex: "Тема обращения",
    intents: [
      ["Ищу помещение", "Аренда · коммерческие предложения", "/opportunities"],
      ["Предложить объект", "Инвестиция · возможность приобретения", "#contact-details"],
      ["Корпоративный запрос", "Партнёрства · компания · пресса", "#contact-details"],
    ],
    detailsIndex: "Контактные данные",
    office: "Офис",
    officeValue: "Кишинёв, Республика Молдова",
    company: "Компания",
    companyValue: "MEGAPARC SRL",
    note: "Прямые контактные данные и юридическая информация предоставляются по запросу и будут опубликованы с официальным запуском сайта.",
  },
  en: {
    eyebrow: "Contact",
    title: ["We build", "what comes"],
    em: "next.",
    lead: "Choose the purpose of the conversation. We respond to enquiries about available space, property proposals and corporate partnerships.",
    intentsIndex: "Purpose",
    intents: [
      ["Find a space", "Leasing · commercial availability", "/opportunities"],
      ["Submit a property", "Investment · acquisition opportunity", "#contact-details"],
      ["Corporate enquiry", "Partnerships · company · press", "#contact-details"],
    ],
    detailsIndex: "Contact details",
    office: "Office",
    officeValue: "Chișinău, Republic of Moldova",
    company: "Company",
    companyValue: "MEGAPARC SRL",
    note: "Direct contact details and legal information are available on request and will be published with the official launch of the website.",
  },
} as const;

export function ContactPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => (path.startsWith("#") ? path : localePath(locale, path));

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
              <Link key={title} href={p(path)} className="intents__row" data-reveal>
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
            <div>
              <dl className="details__list">
                <div>
                  <dt>{c.company}</dt>
                  <dd>{c.companyValue}</dd>
                </div>
                <div>
                  <dt>{c.office}</dt>
                  <dd>{c.officeValue}</dd>
                </div>
              </dl>
              <Note>{c.note}</Note>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
