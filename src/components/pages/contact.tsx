import { PageShell } from "@/components/page-shell";
import { Facts, Head, Hero, Intro, Quote, Section, TextLink } from "@/components/ui";
import { portfolioAssets } from "@/lib/assets";
import { enquiryPaths } from "@/lib/client-journeys";
import { brand, localePath, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    eyebrow: "Contact",
    title: ["Contactați", "MEGAPARC."],
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
    title: ["Связаться с", "MEGAPARC."],
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
    title: ["Contact", "MEGAPARC."],
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
  const tones = ["tile--ink", "tile--paper", "tile--paper", "tile--ink"];

  return (
    <PageShell locale={locale}>
      <Hero size="page" media={{ src: image.media!.wide, alt: `${image.name} — ${image.positioning[locale]}`, position: image.media!.position }} title={<>{c.title[0]} {c.title[1]}</>} line={c.eyebrow} />
      <Intro kicker={c.pathsIndex} statement={c.lead}>
        <ul className="chips">
          {enquiryPaths.map((path) => (
            <li key={path.key}><a href={`#${path.anchor}`}>{path.title[locale]}<b>{path.no}</b></a></li>
          ))}
        </ul>
      </Intro>

      {/* SUBJECTS — four tiles */}
      <Section flush id="subjects" label={c.pathsIndex}>
        <div className="tiles">
          {enquiryPaths.map((path, index) => (
            <article key={path.key} id={path.anchor} className={`tile ${tones[index]}`} data-reveal>
              <span className="tile__no">{path.no}</span>
              <h2 className="tile__title">{path.title[locale]}</h2>
              <span className="tile__meta">{path.meta[locale]}</span>
              <p>{path.text[locale]}</p>
              <span className="kicker">{c.includeLabel}</span>
              <ul className="list list--plain">
                {path.include[locale].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      {/* DETAILS */}
      <Section tone="paper" id="details">
        <div className="shell details" data-reveal>
          <Head kicker={c.detailsIndex} title={brand.name} />
          <div>
            <Facts items={[{ label: c.company, value: c.companyValue }, { label: c.office, value: c.officeValue }, { label: c.careers, value: c.careersValue }]} />
            <div className="sec__actions">
              <TextLink href={localePath(locale, "/careers")}>{c.careersCta}</TextLink>
            </div>
            <p className="note">{c.note}</p>
          </div>
        </div>
      </Section>

      <Quote tone="ink" kicker={c.breakLabel} statement={c.breakStatement} />
    </PageShell>
  );
}
