import type { Localized, SiteLocale } from "@/lib/site-data";

/**
 * Ways to work with MEGAPARC and the contact enquiry paths.
 * Editorial source language: Russian (OWNER_EDITORIAL_COPY_BRIEF.md).
 */

export type JourneyKey = "find-space" | "submit-opportunity" | "discuss-partnership";

export type ClientJourney = {
  key: JourneyKey;
  no: string;
  title: Localized;
  audience: Localized;
  lead: Localized;
  /** Kept for data completeness; not rendered as a navigation diagram. */
  steps: Record<SiteLocale, string[]>;
  scope: Record<SiteLocale, string[]>;
  cta: Localized;
  path: string;
  anchor: string;
};

export const clientJourneys: ClientJourney[] = [
  {
    key: "find-space",
    no: "01",
    title: { ro: "Caut un spațiu", ru: "Найти помещение", en: "Find a space" },
    audience: {
      ro: "Companii, branduri de retail, sedii corporative.",
      ru: "Компании, ритейл-бренды, штаб-квартиры.",
      en: "Companies, retail brands, headquarters.",
    },
    lead: {
      ro: "Vă propunem un obiect potrivit din portofoliul în funcțiune și discutăm condițiile direct.",
      ru: "Подберём подходящий объект из действующего портфеля и обсудим условия напрямую.",
      en: "We will find a suitable property in the operating portfolio and discuss terms directly.",
    },
    steps: {
      ro: ["Portofoliu", "Obiect", "Contact"],
      ru: ["Портфель", "Объект", "Контакт"],
      en: ["Portfolio", "Property", "Contact"],
    },
    scope: {
      ro: ["Birou sau sediu central", "Spațiu comercial pe prima linie", "Spațiu comercial în cartier"],
      ru: ["Офис или штаб-квартира", "Торговое помещение первой линии", "Помещение в жилом районе"],
      en: ["Office or headquarters", "First-line retail space", "Neighbourhood retail space"],
    },
    cta: { ro: "Vezi obiectele", ru: "Смотреть объекты", en: "View properties" },
    path: "/opportunities",
    anchor: "occupier",
  },
  {
    key: "submit-opportunity",
    no: "02",
    title: { ro: "Propun un obiect", ru: "Предложить объект", en: "Submit a property" },
    audience: {
      ro: "Proprietari, consultanți, dezvoltatori.",
      ru: "Собственники, консультанты, девелоперы.",
      en: "Owners, advisers, developers.",
    },
    lead: {
      ro: "Analizăm imobiliare generatoare de venit, terenuri, clădiri pentru reconcepere și proiecte de dezvoltare pe piețele internaționale.",
      ru: "Рассматриваем доходную недвижимость, участки, здания под реконцепцию и проекты развития на международных рынках.",
      en: "We consider income-producing property, land, buildings for repositioning and development projects across international markets.",
    },
    steps: {
      ro: ["Propunere", "Evaluare", "Discuție", "Decizie"],
      ru: ["Предложение", "Оценка", "Переговоры", "Решение"],
      en: ["Proposal", "Assessment", "Discussion", "Decision"],
    },
    scope: {
      ro: ["Imobiliare generatoare de venit", "Terenuri de dezvoltare", "Clădiri pentru reconcepere", "Proiecte de dezvoltare", "Proiecte comune"],
      ru: ["Доходная недвижимость", "Площадки под развитие", "Здания под реконцепцию", "Проекты развития", "Совместные проекты"],
      en: ["Income-producing property", "Development sites", "Buildings for repositioning", "Development projects", "Joint projects"],
    },
    cta: { ro: "Propune un obiect", ru: "Предложить объект", en: "Submit a property" },
    path: "/contact",
    anchor: "opportunity",
  },
  {
    key: "discuss-partnership",
    no: "03",
    title: { ro: "Discut un parteneriat", ru: "Обсудить партнёрство", en: "Discuss a partnership" },
    audience: {
      ro: "Bănci, investitori, proprietari de terenuri, dezvoltatori, parteneri profesioniști.",
      ru: "Банки, инвесторы, собственники земли, девелоперы, профессиональные партнёры.",
      en: "Banks, investors, landowners, developers, professional partners.",
    },
    lead: {
      ro: "Suntem deschiși la colaborare cu bănci, investitori, proprietari de terenuri, dezvoltatori și parteneri profesioniști.",
      ru: "Открыты к сотрудничеству с банками, инвесторами, собственниками земли, девелоперами и профессиональными партнёрами.",
      en: "We are open to working with banks, investors, landowners, developers and professional partners.",
    },
    steps: {
      ro: ["Abordare", "Portofoliu", "Contact"],
      ru: ["Подход", "Портфель", "Контакт"],
      en: ["Approach", "Portfolio", "Contact"],
    },
    scope: {
      ro: ["Finanțare", "Investiții comune", "Co-dezvoltare", "Parteneri de proiectare și construcție"],
      ru: ["Финансирование", "Совместные инвестиции", "Со-девелопмент", "Проектные и строительные партнёры"],
      en: ["Financing", "Joint investment", "Co-development", "Design and construction partners"],
    },
    cta: { ro: "Discută un parteneriat", ru: "Обсудить партнёрство", en: "Discuss a partnership" },
    path: "/contact",
    anchor: "partnership",
  },
];

export const journeysCopy = {
  kicker: { ro: "Colaborare", ru: "Сотрудничество", en: "Working with MEGAPARC" } satisfies Localized,
  title: { ro: "Cum putem colabora", ru: "Чем мы можем быть полезны", en: "How we can work together" } satisfies Localized,
  text: {
    ro: "Dacă căutați un spațiu, doriți să propuneți un obiect sau să discutați un proiect comun, contactați-ne.",
    ru: "Если вы ищете помещение, хотите предложить объект или обсудить совместный проект — свяжитесь с нами.",
    en: "If you are looking for a space, want to offer a property or discuss a joint project, get in touch.",
  } satisfies Localized,
  route: { ro: "Etape", ru: "Этапы", en: "Steps" } satisfies Localized,
  forWhom: { ro: "Pentru cine", ru: "Для кого", en: "For whom" } satisfies Localized,
  scope: { ro: "Ce poate include", ru: "Что рассматриваем", en: "What it can include" } satisfies Localized,
};

/* ------------------------------------------------------------------ */
/* Contact enquiry paths                                                */
/* ------------------------------------------------------------------ */

export type EnquiryPath = {
  key: JourneyKey | "careers";
  anchor: string;
  no: string;
  title: Localized;
  meta: Localized;
  text: Localized;
  include: Record<SiteLocale, string[]>;
};

export const enquiryPaths: EnquiryPath[] = [
  {
    key: "find-space",
    anchor: "occupier",
    no: "01",
    title: { ro: "Închiriere / spațiu", ru: "Аренда / помещение", en: "Leasing / space" },
    meta: { ro: "Birou · spațiu comercial", ru: "Офис · торговое помещение", en: "Office · retail space" },
    text: {
      ro: "Pentru companiile care caută un spațiu în obiectele MEGAPARC.",
      ru: "Для компаний, которые ищут помещение в действующих объектах MEGAPARC.",
      en: "For companies looking for space in MEGAPARC's operating properties.",
    },
    include: {
      ro: ["Obiectul sau tipul de spațiu care vă interesează", "Suprafața și termenele", "Compania și persoana de contact"],
      ru: ["Какой объект или тип помещения вас интересует", "Площадь и сроки", "Компания и контактное лицо"],
      en: ["The property or type of space you need", "Area and timing", "Company and contact person"],
    },
  },
  {
    key: "submit-opportunity",
    anchor: "opportunity",
    no: "02",
    title: { ro: "Propun un obiect", ru: "Предложить объект", en: "Submit a property" },
    meta: { ro: "Clădire · teren · proiect", ru: "Здание · участок · проект", en: "Building · land · project" },
    text: {
      ro: "Pentru proprietari, consultanți și dezvoltatori care doresc să propună un obiect sau un proiect.",
      ru: "Для собственников, консультантов и девелоперов, которые хотят предложить объект или проект.",
      en: "For owners, advisers and developers who want to offer a property or a project.",
    },
    include: {
      ro: ["Țara, orașul și tipul obiectului", "Suprafața și situația juridică", "Formatul de colaborare"],
      ru: ["Страна, город и тип объекта", "Площадь и юридический статус", "Формат сотрудничества"],
      en: ["Country, city and type of property", "Area and legal status", "The form of cooperation"],
    },
  },
  {
    key: "discuss-partnership",
    anchor: "partnership",
    no: "03",
    title: { ro: "Investiții și parteneriat", ru: "Инвестиции и партнёрство", en: "Investment and partnership" },
    meta: { ro: "Finanțare · proiecte comune", ru: "Финансирование · совместные проекты", en: "Financing · joint projects" },
    text: {
      ro: "Pentru bănci, investitori, dezvoltatori și parteneri profesioniști.",
      ru: "Для банков, инвесторов, девелоперов и профессиональных партнёров.",
      en: "For banks, investors, developers and professional partners.",
    },
    include: {
      ro: ["Organizația și rolul dumneavoastră", "Subiectul discuției", "Termenele"],
      ru: ["Организация и роль", "Тема обращения", "Сроки"],
      en: ["Your organisation and role", "The subject", "Timing"],
    },
  },
  {
    key: "careers",
    anchor: "careers",
    no: "04",
    title: { ro: "Carieră", ru: "Карьера", en: "Careers" },
    meta: { ro: "Posturi · CV", ru: "Вакансии · резюме", en: "Vacancies · CV" },
    text: {
      ro: "Pentru specialiștii care doresc să lucreze la MEGAPARC. Posturile deschise sunt publicate pe Rabota.md.",
      ru: "Для специалистов, которые хотят работать в MEGAPARC. Открытые вакансии опубликованы на Rabota.md.",
      en: "For professionals who want to work at MEGAPARC. Open vacancies are published on Rabota.md.",
    },
    include: {
      ro: ["Postul sau domeniul care vă interesează", "CV-ul"],
      ru: ["Интересующая позиция или направление", "Резюме"],
      en: ["The role or area you are interested in", "Your CV"],
    },
  },
];
