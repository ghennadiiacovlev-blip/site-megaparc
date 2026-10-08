import type { Localized, SiteLocale } from "@/lib/site-data";

/**
 * MEGAPARC BUSINESS MODEL — OWNER correction 2026-10-08 ("CRITICAL BUSINESS
 * MODEL CORRECTION"). Authoritative public model:
 *
 *   ACQUIRE → DEVELOP / REDEVELOP / REVITALISE → LEASE OUR OWN REAL ESTATE →
 *   OPERATE OUR OWN PROPERTY AS OWNER → HOLD OR SELL → REINVEST
 *
 * MEGAPARC is NOT a third-party asset manager. It buys existing real estate
 * and land, develops its own projects, renovates and repositions property it
 * owns, leases its own commercial space, operates its own buildings, may sell
 * an asset when that is the right decision, and reinvests.
 * Internal operating work is described as PROPERTY OPERATIONS / LEASING &
 * OPERATIONS of owned property — never as an asset-management service.
 * Not every asset is for sale; the sale step is a decision, not an offer.
 */

export type Titled = { title: Localized; text: Localized };

/** The three public verbs — the first thing every visitor reads. */
export const verbs: Record<SiteLocale, [string, string, string]> = {
  ro: ["Cumpărăm.", "Dezvoltăm.", "Închiriem."],
  ru: ["Покупаем.", "Развиваем.", "Сдаём в аренду."],
  en: ["We acquire.", "We develop.", "We lease."],
};

/** Short positioning line (header menu, footer, metadata). */
export const positioning: Localized = {
  ro: "Cumpărăm · Dezvoltăm · Închiriem",
  ru: "Покупаем · Развиваем · Сдаём в аренду",
  en: "Acquire · Develop · Lease",
};

/** The model in one sentence (OWNER wording, adapted per language). */
export const businessStatement: Localized = {
  ro: "MEGAPARC investește în imobiliare și terenuri, dezvoltă proiecte proprii și închiriază spații comerciale.",
  ru: "MEGAPARC инвестирует в недвижимость и землю, развивает собственные проекты и сдаёт коммерческие площади в аренду.",
  en: "MEGAPARC invests in real estate and land, develops its own projects and leases commercial space.",
};

export type LifecycleStage = { key: "acquire" | "develop" | "lease" | "operate" | "decide" | "reinvest"; title: Localized; short: Localized; text: Localized };

/**
 * Lifecycle of an owned asset. The order is the model; "decide" = hold or sell.
 * `short` is the one-line subtitle under each verb (OWNER microcopy addendum
 * 2026-10-08: short, natural, never technical); `text` is the supporting
 * sentence shown with the active stage. Stage 04 keeps the key "operate" but
 * reads «Поддерживаем» — the owner looks after its buildings and tenants.
 */
export const lifecycle: LifecycleStage[] = [
  {
    key: "acquire",
    title: { ro: "Cumpărăm", ru: "Покупаем", en: "Acquire" },
    short: { ro: "Clădiri și terenuri", ru: "Здания и землю", en: "Buildings and land" },
    text: {
      ro: "Clădiri comerciale — în funcțiune sau care cer o nouă viață — și terenuri pentru dezvoltare.",
      ru: "Коммерческие здания — действующие и те, которым нужна новая жизнь, — и участки под развитие.",
      en: "Commercial buildings — working ones and ones that need a new life — and land for development.",
    },
  },
  {
    key: "develop",
    title: { ro: "Dezvoltăm", ru: "Развиваем", en: "Develop" },
    short: { ro: "Construim, reconstruim, regândim", ru: "Строим, реконструируем, переосмысливаем", en: "Build, rebuild, reimagine" },
    text: {
      ro: "Construim proiecte proprii, renovăm clădirile noastre și le dăm funcții noi.",
      ru: "Строим собственные проекты, реконструируем и перепрофилируем свои здания.",
      en: "We build our own projects and renovate and reposition the buildings we own.",
    },
  },
  {
    key: "lease",
    title: { ro: "Închiriem", ru: "Сдаём в аренду", en: "Lease" },
    short: { ro: "Spații pentru afaceri", ru: "Помещения для бизнеса", en: "Space for business" },
    text: {
      ro: "Spații pentru comerț, birouri și servicii în clădirile noastre.",
      ru: "Торговые, офисные и сервисные помещения в наших зданиях.",
      en: "Retail, office and service space in our own buildings.",
    },
  },
  {
    key: "operate",
    title: { ro: "Avem grijă", ru: "Поддерживаем", en: "Look after" },
    short: { ro: "De clădiri și de chiriași", ru: "Качество зданий и комфорт арендаторов", en: "Building quality and tenant comfort" },
    text: {
      ro: "Ne ocupăm singuri de clădiri: întreținere, relația cu chiriașii, investiții în îmbunătățiri.",
      ru: "Сами обслуживаем свои здания, работаем с арендаторами и вкладываем в улучшения.",
      en: "We look after our buildings ourselves: maintenance, tenants, investment in improvements.",
    },
  },
  {
    key: "decide",
    title: { ro: "Păstrăm sau vindem", ru: "Держим или продаём", en: "Hold or sell" },
    short: { ro: "În funcție de strategia obiectului", ru: "Исходя из стратегии объекта", en: "Guided by each asset's strategy" },
    text: {
      ro: "Majoritatea obiectelor le păstrăm pe termen lung. Vindem atunci când strategia o cere.",
      ru: "Большинство объектов держим долго. Продаём, когда этого требует стратегия.",
      en: "Most assets we hold for the long term. We sell when the strategy calls for it.",
    },
  },
  {
    key: "reinvest",
    title: { ro: "Reinvestim", ru: "Реинвестируем", en: "Reinvest" },
    short: { ro: "În proiecte noi", ru: "В новые проекты", en: "In new projects" },
    text: {
      ro: "Capitalul lucrează din nou — în clădiri, terenuri și proiecte noi.",
      ru: "Капитал снова работает — в новых зданиях, участках и проектах.",
      en: "Capital goes to work again — in new buildings, land and projects.",
    },
  },
];

/** What MEGAPARC buys — the Offer a property page and its form. */
export const acquisitionTypes: { key: "operating" | "redevelop" | "land" | "project"; title: Localized; text: Localized }[] = [
  {
    key: "operating",
    title: { ro: "Clădiri comerciale în funcțiune", ru: "Действующие коммерческие здания", en: "Operating commercial buildings" },
    text: { ro: "Retail, birouri, servicii — clădiri care lucrează deja sau pot lucra mai bine.", ru: "Торговля, офисы, сервисы — здания, которые уже работают или могут работать лучше.", en: "Retail, offices, services — buildings that already work or could work better." },
  },
  {
    key: "redevelop",
    title: { ro: "Clădiri de renovat sau repoziționat", ru: "Здания под реконструкцию", en: "Buildings to renovate or reposition" },
    text: { ro: "Clădiri vechi sau goale, cu locație bună, care merită o nouă funcție.", ru: "Старые или пустующие здания в хорошем месте, которым нужна новая функция.", en: "Old or empty buildings in a good location that deserve a new use." },
  },
  {
    key: "land",
    title: { ro: "Terenuri pentru dezvoltare", ru: "Земля под развитие", en: "Land for development" },
    text: { ro: "Terenuri în oraș sau la intrarea în oraș, cu acces și potențial clar.", ru: "Участки в городе или на въезде в город — с подъездом и понятным потенциалом.", en: "Plots in town or at its entrance, with access and clear potential." },
  },
  {
    key: "project",
    title: { ro: "Proiecte începute", ru: "Начатые проекты", en: "Projects already started" },
    text: { ro: "Proiecte cu autorizații sau construcție începută, care au nevoie de un proprietar nou.", ru: "Проекты с разрешениями или начатым строительством, которым нужен новый владелец.", en: "Projects with permits or construction under way that need a new owner." },
  },
];

/** What MEGAPARC checks first when an owner offers a property or land. */
export const acquisitionCriteria: Localized[] = [
  { ro: "Locația și accesul", ru: "Локация и подъезд", en: "Location and access" },
  { ro: "Situația juridică clară", ru: "Чистая юридическая ситуация", en: "A clear legal position" },
  { ro: "Starea tehnică", ru: "Техническое состояние", en: "Technical condition" },
  { ro: "Cererea chiriașilor în zonă", ru: "Спрос арендаторов в районе", en: "Tenant demand in the area" },
  { ro: "Ce poate deveni obiectul", ru: "Чем объект может стать", en: "What the property could become" },
  { ro: "Prețul și termenul", ru: "Цена и сроки", en: "Price and timing" },
];

/**
 * Where MEGAPARC looks. OWNER override 2026-09-26 (global mandate) remains:
 * the verified portfolio is in Moldova; offers from other countries are
 * considered. No foreign offices, holdings, ticket sizes or allocations.
 */
export const geography = {
  label: { ro: "Unde căutăm", ru: "Где ищем", en: "Where we look" } satisfies Localized,
  text: {
    ro: "Toate obiectele noastre actuale sunt în Republica Moldova. Analizăm și propuneri din alte țări — fiecare separat.",
    ru: "Все наши объекты сегодня — в Молдове. Предложения из других стран тоже рассматриваем.",
    en: "All our current properties are in the Republic of Moldova. We also consider offers from other countries — each on its own merits.",
  } satisfies Localized,
};

/** Property operations of OWNED buildings (never a service to third parties). */
export const operations = {
  label: { ro: "Exploatare proprie", ru: "Свои здания", en: "Owned property operations" } satisfies Localized,
  title: { ro: "Clădirile noastre le administrăm noi.", ru: "Свои здания ведём сами.", en: "We run our own buildings ourselves." } satisfies Localized,
  text: {
    ro: "Închirierea, relația cu chiriașii, întreținerea și investițiile în îmbunătățire sunt făcute de echipa MEGAPARC — doar pentru obiectele MEGAPARC. Nu preluăm în administrare clădirile altor proprietari.",
    ru: "Аренду, обслуживание и улучшения ведёт собственная команда MEGAPARC. Здания других собственников в управление не берём.",
    en: "Leasing, tenant relationships, maintenance and investment in improvements are handled by the MEGAPARC team — for MEGAPARC buildings only. We do not take other owners' buildings under management.",
  } satisfies Localized,
  points: [
    { ro: "Închiriere și relația cu chiriașii", ru: "Аренда и работа с арендаторами", en: "Leasing and tenant relationships" },
    { ro: "Întreținere și exploatare tehnică", ru: "Обслуживание и инженерные системы", en: "Maintenance and technical operations" },
    { ro: "Renovare și amenajare pentru chiriași", ru: "Ремонт и подготовка помещений под арендаторов", en: "Renovation and fit-out for tenants" },
    { ro: "Planul fiecărei clădiri pe ani", ru: "План по каждому зданию на годы вперёд", en: "A plan for each building, years ahead" },
  ] as Localized[],
};

/** How MEGAPARC decides — principles carried over from the approved strategy, reworded for the owner model. */
export const principles: Titled[] = [
  { title: { ro: "Cumpărăm ce înțelegem", ru: "Покупаем то, что понимаем", en: "We buy what we understand" }, text: { ro: "Locația, clădirea, piața și riscurile — înainte de preț.", ru: "Локация, здание, рынок и риски — раньше цены.", en: "Location, building, market and risks — before price." } },
  { title: { ro: "Funcția înaintea formei", ru: "Функция прежде формы", en: "Function before form" }, text: { ro: "Mai întâi cine va folosi spațiul și cum, apoi arhitectura.", ru: "Сначала — кто и как будет пользоваться пространством, потом архитектура.", en: "First who will use the space and how, then the architecture." } },
  { title: { ro: "Construim pentru exploatare", ru: "Строим для эксплуатации", en: "We build to operate" }, text: { ro: "Clădirile rămân la noi, deci calitatea se vede în costurile de mâine.", ru: "Здания остаются у нас, поэтому качество видно в завтрашних расходах.", en: "Our buildings stay with us, so quality shows in tomorrow's costs." } },
  { title: { ro: "Chiriașul trebuie să câștige", ru: "Арендатор должен зарабатывать", en: "The tenant must succeed" }, text: { ro: "Un spațiu bun este cel în care afacerea chiriașului merge.", ru: "Хорошее помещение — то, в котором бизнес арендатора работает.", en: "A good space is one where the tenant's business works." } },
];

/** Development process — six stages, used on project pages (index = stage). */
export const developmentStages: { no: string; title: Localized; text: Localized }[] = [
  { no: "01", title: { ro: "Analiză", ru: "Анализ", en: "Analysis" }, text: { ro: "Teren sau clădire existentă: evaluăm locația, destinația și posibilitățile.", ru: "Участок или существующее здание: оцениваем локацию, назначение и возможности.", en: "Site or existing building: we assess location, use and possibilities." } },
  { no: "02", title: { ro: "Concept", ru: "Концепция", en: "Concept" }, text: { ro: "Stabilim destinația, scara și formatul.", ru: "Определяем назначение, масштаб и формат.", en: "We define the use, the scale and the format." } },
  { no: "03", title: { ro: "Evaluare economică", ru: "Экономическая оценка", en: "Economic assessment" }, text: { ro: "Calculăm economia proiectului și verificăm condițiile urbanistice și juridice.", ru: "Считаем экономику, проверяем градостроительные и юридические условия.", en: "We run the economics and check planning and legal conditions." } },
  { no: "04", title: { ro: "Proiectare", ru: "Проектирование", en: "Design" }, text: { ro: "Proiectăm pentru exploatare, nu doar pentru predare.", ru: "Проектируем с расчётом на эксплуатацию, а не только на сдачу.", en: "We design for operation, not just for handover." } },
  { no: "05", title: { ro: "Realizare", ru: "Реализация", en: "Delivery" }, text: { ro: "Construim și controlăm bugetul, termenele și calitatea.", ru: "Строим и контролируем бюджет, сроки и качество.", en: "We build and control budget, schedule and quality." } },
  { no: "06", title: { ro: "Închiriere și exploatare", ru: "Аренда и эксплуатация", en: "Leasing and operation" }, text: { ro: "Obiectul începe să lucreze: chiriași, întreținere, deciziile următoare.", ru: "Объект начинает работать: арендаторы, обслуживание, следующие решения.", en: "The building starts working: tenants, maintenance, the next decisions." } },
];
