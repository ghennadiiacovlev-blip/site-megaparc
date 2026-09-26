import { PageShell } from "@/components/page-shell";
import { ArrowLink, ImageBreak, Note, PageHero, SectionIndex } from "@/components/primitives";
import { portfolioAssets } from "@/lib/assets";
import { enquiryPaths } from "@/lib/client-journeys";
import { brand, localePath, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    eyebrow: "Contact",
    title: "Contactați",
    em: "MEGAPARC.",
    lead: "Alegeți subiectul solicitării: închirierea unui spațiu, propunerea unui obiect, investiții și parteneriat sau carieră.",
    pathsIndex: "Subiectul solicitării",
    includeLabel: "Ce este util într-un prim mesaj",
    detailsIndex: "Date de contact",
    office: "Sediu",
    officeValue: "Chișinău, Republica Moldova",
    company: "Companie",
    companyValue: "MEGAPARC SRL",
    careers: "Cariere",
    careersValue: "CV-urile se transmit prin aceleași date de contact, cu mențiunea „Cariere”. Posturile deschise sunt publicate pe Rabota.md.",
    note: "Datele de contact directe și informațiile juridice sunt disponibile la cerere și vor fi publicate odată cu lansarea oficială a site-ului.",
    careersCta: "Vezi posturile deschise",
    breakLabel: "MEGAPARC · Chișinău",
    breakStatement: "Investim, dezvoltăm și administrăm imobiliare.",
  },
  ru: {
    eyebrow: "Контакты",
    title: "Связаться с",
    em: "MEGAPARC.",
    lead: "Выберите тему обращения: аренда помещения, предложение объекта, инвестиции и партнёрство или карьера.",
    pathsIndex: "Тема обращения",
    includeLabel: "Что полезно указать в первом сообщении",
    detailsIndex: "Контактные данные",
    office: "Офис",
    officeValue: "Кишинёв, Республика Молдова",
    company: "Компания",
    companyValue: "MEGAPARC SRL",
    careers: "Карьера",
    careersValue: "Резюме направляются по тем же контактным данным с пометкой «Карьера». Открытые вакансии опубликованы на Rabota.md.",
    note: "Прямые контактные данные и юридическая информация предоставляются по запросу и будут опубликованы с официальным запуском сайта.",
    careersCta: "Смотреть вакансии",
    breakLabel: "MEGAPARC · Кишинёв",
    breakStatement: "Инвестируем, развиваем и управляем недвижимостью.",
  },
  en: {
    eyebrow: "Contact",
    title: "Contact",
    em: "MEGAPARC.",
    lead: "Choose the subject of your enquiry: leasing a space, proposing a property, investment and partnership, or careers.",
    pathsIndex: "Subject",
    includeLabel: "What helps in a first message",
    detailsIndex: "Contact details",
    office: "Office",
    officeValue: "Chișinău, Republic of Moldova",
    company: "Company",
    companyValue: "MEGAPARC SRL",
    careers: "Careers",
    careersValue: "CVs are sent through the same contact details, marked \"Careers\". Open vacancies are published on Rabota.md.",
    note: "Direct contact details and legal information are available on request and will be published with the official launch of the website.",
    careersCta: "See open vacancies",
    breakLabel: "MEGAPARC · Chișinău",
    breakStatement: "We invest in, develop and manage real estate.",
  },
} as const;

export function ContactPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const image = portfolioAssets[1];

  return (
    <PageShell locale={locale}>
      <PageHero
        index="01"
        eyebrow={c.eyebrow}
        title={
          <>
            {c.title}
            <br />
            <em>{c.em}</em>
          </>
        }
        lead={c.lead}
      >
        <nav className="portfolio__categories" aria-label={c.pathsIndex}>
          {enquiryPaths.map((path) => (
            <a key={path.key} href={`#${path.anchor}`}>{path.no} {path.title[locale]}</a>
          ))}
        </nav>
      </PageHero>

      <section className="enquiry-paths ink">
        <div className="shell">
          <SectionIndex no="02" inverse>{c.pathsIndex}</SectionIndex>
          <div className="enquiry-paths__list">
            {enquiryPaths.map((path) => (
              <article key={path.key} id={path.anchor} className="enquiry-path" data-reveal>
                <span className="enquiry-path__no">{path.no}</span>
                <div>
                  <h2>{path.title[locale]}</h2>
                  <span className="enquiry-path__meta">{path.meta[locale]}</span>
                </div>
                <p className="enquiry-path__text">{path.text[locale]}</p>
                <ul className="enquiry-path__include">
                  <span>{c.includeLabel}</span>
                  {path.include[locale].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="details paper" id="details">
        <div className="shell">
          <SectionIndex no="03">{c.detailsIndex}</SectionIndex>
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
                <div id="careers-details">
                  <dt>{c.careers}</dt>
                  <dd>
                    {c.careersValue}
                    <div style={{ marginTop: "1rem" }}>
                      <ArrowLink href={localePath(locale, "/careers")}>{c.careersCta}</ArrowLink>
                    </div>
                  </dd>
                </div>
              </dl>
              <Note>{c.note}</Note>
            </div>
          </div>
        </div>
      </section>

      <ImageBreak media={image.media!} alt={`${image.name} — ${image.positioning[locale]}`} statementLabel={c.breakLabel} statement={c.breakStatement} />
    </PageShell>
  );
}
