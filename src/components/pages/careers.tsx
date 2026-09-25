import { PageShell } from "@/components/page-shell";
import { ArrowLink, Note, PageHero, SectionIndex } from "@/components/primitives";
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
    openingsIndex: "Poziții deschise",
    emptyTitle: "Nu există poziții deschise în acest moment.",
    emptyText: "Candidaturile spontane sunt binevenite. Profilurile relevante pentru investiții, dezvoltare, administrarea activelor și operațiuni pot fi transmise prin pagina de contact.",
    cta: "Discuție corporate",
  },
  ru: {
    eyebrow: "Карьера",
    title: ["Команда, которая мыслит", "как собственник."],
    lead: "MEGAPARC объединяет инвестиционное мышление, девелопмент, управление и реализацию в платформе, построенной на долгий срок.",
    valuesIndex: "Как мы работаем",
    values: [
      ["Дисциплина", "Решения начинаются с экономики, назначения и долгосрочной стоимости."],
      ["Ответственность", "Каждая роль смотрит на актив глазами собственника."],
      ["Перспектива", "Строим для сегодняшних потребностей, не теряя из виду актуальность завтрашнего дня."],
    ],
    openingsIndex: "Открытые позиции",
    emptyTitle: "В настоящий момент открытых позиций нет.",
    emptyText: "Мы открыты к инициативным обращениям. Профили, релевантные для инвестиций, девелопмента, управления активами и операционной деятельности, можно направить через страницу контактов.",
    cta: "Корпоративный запрос",
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
    openingsIndex: "Open positions",
    emptyTitle: "There are no open positions at this time.",
    emptyText: "Speculative applications are welcome. Profiles relevant to investment, development, asset management and operations can be sent through the contact page.",
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
              <Note light>{c.emptyText}</Note>
              <ArrowLink href={localePath(locale, "/contact")} inverse>{c.cta}</ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
