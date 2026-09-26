import type { Localized, SiteLocale } from "@/lib/site-data";

/**
 * Three primary client journeys and the contact enquiry paths.
 * Governance: docs/CLIENT_JOURNEYS.md.
 */

export type JourneyKey = "find-space" | "submit-opportunity" | "discuss-partnership";

export type ClientJourney = {
  key: JourneyKey;
  no: string;
  title: Localized;
  /** Who this path is for. */
  audience: Localized;
  lead: Localized;
  /** Route steps, shown as the path a visitor follows. */
  steps: Record<SiteLocale, string[]>;
  /** What MEGAPARC may consider / what the visitor gets. */
  scope: Record<SiteLocale, string[]>;
  cta: Localized;
  /** Locale-neutral path; the contact page anchors carry the enquiry type. */
  path: string;
  /** Contact anchor id. */
  anchor: string;
};

export const clientJourneys: ClientJourney[] = [
  {
    key: "find-space",
    no: "01",
    title: { ro: "Caut un spațiu", ru: "Ищу помещение", en: "Find a space" },
    audience: {
      ro: "Companii, branduri de retail, sedii corporative, directori de expansiune și de real estate.",
      ru: "Компании, ритейл-бренды, корпоративные штаб-квартиры, директора по экспансии и недвижимости.",
      en: "Corporate occupiers, retail brands, headquarters users, expansion and real estate directors.",
    },
    lead: {
      ro: "Active operaționale din portofoliul MEGAPARC, prezentate ca profil de activ: locație, clădire, logică de operare și date verificate.",
      ru: "Операционные активы портфеля MEGAPARC, представленные как профиль объекта: локация, здание, логика эксплуатации и проверенные данные.",
      en: "Operating assets in the MEGAPARC portfolio, presented as asset profiles: location, building, operating logic and verified facts.",
    },
    steps: {
      ro: ["Acasă", "Portofoliu", "Activ", "Locație", "Date", "Contact"],
      ru: ["Главная", "Портфель", "Объект", "Локация", "Данные", "Контакты"],
      en: ["Home", "Portfolio", "Asset", "Location", "Facts", "Contact"],
    },
    scope: {
      ro: ["Sediu corporativ sau campus", "Retail urban pe prima linie", "Spații comerciale de proximitate", "Discuție directă cu proprietarul / administratorul"],
      ru: ["Штаб-квартира или кампус", "Городской ритейл на первой линии", "Торговые помещения шаговой доступности", "Прямой диалог с собственником / управляющим"],
      en: ["Headquarters or campus", "First-line urban retail", "Neighbourhood retail space", "A direct conversation with the owner / manager"],
    },
    cta: { ro: "Vezi activele disponibile", ru: "Смотреть доступные объекты", en: "View available assets" },
    path: "/opportunities",
    anchor: "occupier",
  },
  {
    key: "submit-opportunity",
    no: "02",
    title: { ro: "Propun o oportunitate", ru: "Предложить объект", en: "Submit an opportunity" },
    audience: {
      ro: "Proprietari, consultanți, dezvoltatori și parteneri, din orice geografie: clădiri, terenuri, proprietăți comerciale, amplasamente de dezvoltare sau active subperformante.",
      ru: "Владельцы, консультанты, девелоперы и партнёры из любой географии: здания, участки, коммерческая недвижимость, площадки под развитие или недоиспользуемые активы.",
      en: "Owners, advisers, developers and partners, from any geography: buildings, land, commercial property, development sites or underperforming assets.",
    },
    lead: {
      ro: "MEGAPARC poate analiza achiziții, repoziționări, dezvoltări, parteneriate sau oportunități comune, în Moldova sau pe alte piețe. Fiecare propunere este evaluată după logica sa economică; analiza nu implică o achiziție automată.",
      ru: "MEGAPARC может рассматривать приобретение, репозиционирование, девелопмент, партнёрство или совместные возможности — в Молдове или на других рынках. Каждое предложение оценивается по экономической логике; рассмотрение не означает автоматической покупки.",
      en: "MEGAPARC may consider acquisition, repositioning, development, partnership or a joint opportunity, in Moldova or in other markets. Every proposal is assessed on its economic logic; review does not imply automatic acquisition.",
    },
    steps: {
      ro: ["Propunere", "Evaluare inițială", "Analiză", "Discuție", "Decizie"],
      ru: ["Предложение", "Первичная оценка", "Анализ", "Диалог", "Решение"],
      en: ["Proposal", "Initial review", "Analysis", "Conversation", "Decision"],
    },
    scope: {
      ro: ["Imobiliare generatoare de venit", "Amplasamente de dezvoltare", "Oportunități de repoziționare", "Proiecte imobiliare strategice", "Parteneriate și joint ventures"],
      ru: ["Доходная недвижимость", "Площадки под развитие", "Возможности репозиционирования", "Стратегические проекты недвижимости", "Партнёрства и совместные предприятия"],
      en: ["Income-producing real estate", "Development sites", "Repositioning opportunities", "Strategic real-estate projects", "Partnership and joint-venture opportunities"],
    },
    cta: { ro: "Propune o oportunitate", ru: "Предложить объект", en: "Submit an opportunity" },
    path: "/contact",
    anchor: "opportunity",
  },
  {
    key: "discuss-partnership",
    no: "03",
    title: { ro: "Discut un parteneriat", ru: "Обсудить партнёрство", en: "Discuss a partnership" },
    audience: {
      ro: "Bănci, investitori, instituții financiare, parteneri strategici, dezvoltatori, arhitecți și contrapărți instituționale.",
      ru: "Банки, инвесторы, финансовые институты, стратегические партнёры, девелоперы, архитекторы и институциональные контрагенты.",
      en: "Banks, investors, financial institutions, strategic partners, developers, architects and institutional counterparties.",
    },
    lead: {
      ro: "Înainte de o discuție, strategia, scara, portofoliul, pipeline-ul de dezvoltare, capitalul la lucru și organizația MEGAPARC sunt prezentate public.",
      ru: "До разговора стратегия, масштаб, портфель, девелоперский пайплайн, работающий капитал и организация MEGAPARC представлены публично.",
      en: "Before a conversation, MEGAPARC's strategy, scale, portfolio, development pipeline, capital at work and organisation are presented publicly.",
    },
    steps: {
      ro: ["Acasă", "Abordare", "Strategie", "Portofoliu", "Dezvoltare", "Capital", "Organizație", "Contact"],
      ru: ["Главная", "Подход", "Стратегия", "Портфель", "Девелопмент", "Капитал", "Организация", "Контакты"],
      en: ["Home", "Our approach", "Strategy", "Portfolio", "Development", "Capital", "Organisation", "Contact"],
    },
    scope: {
      ro: ["Finanțare și parteneri de capital", "Joint venture și co-dezvoltare", "Parteneri de proiectare și execuție", "Contrapărți instituționale"],
      ru: ["Финансирование и партнёры по капиталу", "Совместные предприятия и со-девелопмент", "Партнёры по проектированию и строительству", "Институциональные контрагенты"],
      en: ["Financing and capital partners", "Joint ventures and co-development", "Design and delivery partners", "Institutional counterparties"],
    },
    cta: { ro: "Discută un parteneriat", ru: "Обсудить партнёрство", en: "Discuss a partnership" },
    path: "/contact",
    anchor: "partnership",
  },
];

export const journeysCopy = {
  kicker: { ro: "Lucrează cu MEGAPARC", ru: "Работать с MEGAPARC", en: "Work with MEGAPARC" } satisfies Localized,
  title: { ro: "Trei drumuri. O singură platformă.", ru: "Три пути. Одна платформа.", en: "Three routes. One platform." } satisfies Localized,
  text: {
    ro: "Fiecare interlocutor ajunge la MEGAPARC cu o întrebare diferită. Site-ul răspunde la fiecare, fără să transforme compania într-un catalog.",
    ru: "Каждый собеседник приходит в MEGAPARC с разным вопросом. Сайт отвечает на каждый из них, не превращая компанию в каталог.",
    en: "Every counterparty comes to MEGAPARC with a different question. The site answers each one without turning the company into a catalogue.",
  } satisfies Localized,
  route: { ro: "Traseu", ru: "Маршрут", en: "Route" } satisfies Localized,
  forWhom: { ro: "Pentru cine", ru: "Для кого", en: "For whom" } satisfies Localized,
  scope: { ro: "Ce poate include", ru: "Что может включать", en: "What it can include" } satisfies Localized,
};

/* ------------------------------------------------------------------ */
/* Contact enquiry paths                                                */
/* ------------------------------------------------------------------ */

export type EnquiryPath = {
  key: JourneyKey;
  anchor: string;
  no: string;
  title: Localized;
  meta: Localized;
  text: Localized;
  /** What to include in a first message. */
  include: Record<SiteLocale, string[]>;
};

export const enquiryPaths: EnquiryPath[] = [
  {
    key: "find-space",
    anchor: "occupier",
    no: "01",
    title: { ro: "Corporate / Ocupant", ru: "Корпоративный / Арендатор", en: "Corporate / Occupier" },
    meta: { ro: "Sediu · retail · spațiu comercial", ru: "Штаб-квартира · ритейл · торговое помещение", en: "Headquarters · retail · commercial space" },
    text: {
      ro: "Pentru companii care caută un sediu, un spațiu de retail sau un activ din portofoliul MEGAPARC.",
      ru: "Для компаний, которые ищут штаб-квартиру, торговое помещение или объект из портфеля MEGAPARC.",
      en: "For companies looking for a headquarters, a retail space or an asset in the MEGAPARC portfolio.",
    },
    include: {
      ro: ["Activul sau tipul de spațiu care vă interesează", "Suprafața și orizontul de timp", "Compania și persoana de contact"],
      ru: ["Интересующий объект или тип помещения", "Площадь и временной горизонт", "Компания и контактное лицо"],
      en: ["The asset or type of space you are interested in", "Area and timing", "Company and contact person"],
    },
  },
  {
    key: "submit-opportunity",
    anchor: "opportunity",
    no: "02",
    title: { ro: "Proprietate / Oportunitate", ru: "Объект / Возможность", en: "Property / Opportunity" },
    meta: { ro: "Clădire · teren · activ subperformant · orice geografie", ru: "Здание · участок · недоиспользуемый актив · любая география", en: "Building · land · underperforming asset · any geography" },
    text: {
      ro: "Pentru proprietari, consultanți, dezvoltatori și parteneri care doresc să propună imobiliare generatoare de venit, un amplasament de dezvoltare, o repoziționare, un proiect strategic sau un parteneriat, în Moldova sau pe alte piețe.",
      ru: "Для владельцев, консультантов, девелоперов и партнёров, которые хотят предложить доходную недвижимость, площадку под развитие, репозиционирование, стратегический проект или партнёрство — в Молдове или на других рынках.",
      en: "For owners, advisers, developers and partners who wish to propose income-producing real estate, a development site, a repositioning, a strategic project or a partnership, in Moldova or in other markets.",
    },
    include: {
      ro: ["Țara, orașul și tipul proprietății", "Suprafața și situația juridică, pe scurt", "Ce tip de colaborare aveți în vedere"],
      ru: ["Страна, город и тип объекта", "Площадь и юридический статус, кратко", "Какой формат сотрудничества вы рассматриваете"],
      en: ["Country, city and type of property", "Area and legal situation, in brief", "The kind of collaboration you have in mind"],
    },
  },
  {
    key: "discuss-partnership",
    anchor: "partnership",
    no: "03",
    title: { ro: "Parteneriat / Investiții", ru: "Партнёрство / Инвестиции", en: "Partnership / Investment" },
    meta: { ro: "Capital · finanțare · co-dezvoltare · instituțional", ru: "Капитал · финансирование · со-девелопмент · институциональный", en: "Capital · financing · co-development · institutional" },
    text: {
      ro: "Pentru bănci, investitori, parteneri de dezvoltare, arhitecți, contractori, presă și instituții.",
      ru: "Для банков, инвесторов, партнёров по девелопменту, архитекторов, подрядчиков, прессы и институтов.",
      en: "For banks, investors, development partners, architects, contractors, media and institutions.",
    },
    include: {
      ro: ["Instituția și rolul dumneavoastră", "Tema discuției", "Orizontul de timp"],
      ru: ["Ваша организация и роль", "Тема разговора", "Временной горизонт"],
      en: ["Your institution and role", "The subject of the conversation", "Timing"],
    },
  },
];
