import type { Localized } from "@/lib/site-data";
import type { BusinessType, Requirement } from "@/data/demo-content";

/**
 * Audience journeys — copy and taxonomy (OWNER addendum "PREMIUM UX + AUDIENCE
 * JOURNEYS", 2026-10-07). Editorial wording only; every property value used by
 * these journeys lives in src/data/demo-content.ts with its status.
 *
 * Every journey follows: why it matters → why MEGAPARC → proof → detail → action.
 */

export type AudienceKey = "space" | "owner" | "capital" | "partner" | "career";

export type AudiencePath = {
  key: AudienceKey;
  no: string;
  /** The visitor's own words. */
  title: Localized;
  /** What happens when they choose this path. */
  next: Localized;
  path: string;
  anchor: string;
  /** Real photograph (portfolio slug) or a registered concept placement (src/data/demo-content.ts imageUses). */
  image: { kind: "asset"; slug: string } | { kind: "use"; id: string };
};

export const audienceIntro = {
  kicker: { ro: "Începeți de aici", ru: "Начните отсюда", en: "Start here" } satisfies Localized,
  title: { ro: "Ce vă aduce la MEGAPARC?", ru: "С чем вы пришли в MEGAPARC?", en: "What brings you to MEGAPARC?" } satisfies Localized,
  text: {
    ro: "Alegeți situația care vă descrie. Vă arătăm ce putem face și care este pasul următor.",
    ru: "Выберите свою ситуацию. Покажем, что мы можем сделать, и каким будет следующий шаг.",
    en: "Choose the situation that describes you. We show what we can do and what the next step is.",
  } satisfies Localized,
};

export const audiencePaths: AudiencePath[] = [
  {
    key: "space",
    no: "01",
    title: { ro: "Am nevoie de un spațiu", ru: "Мне нужно помещение", en: "I need a space" },
    next: { ro: "Spuneți-ne ce trebuie să facă spațiul pentru afacerea dumneavoastră — vă arătăm ce se potrivește și de ce.", ru: "Расскажите, что помещение должно делать для вашего бизнеса, — покажем, что подходит и почему.", en: "Tell us what the space must do for your business — we show what fits and why." },
    path: "/opportunities",
    anchor: "occupier",
    image: { kind: "asset", slug: "moscova-20" },
  },
  {
    key: "owner",
    no: "02",
    title: { ro: "Am un obiect sau un teren", ru: "У меня есть объект или земля", en: "I have a property or land" },
    next: { ro: "Vindeți, dezvoltați, repoziționați sau căutați un partener — evaluăm oportunitatea împreună.", ru: "Продать, развивать, репозиционировать или найти партнёра — оценим возможность вместе.", en: "Sell, develop, reposition or find a partner — we assess the opportunity with you." },
    path: "/opportunities",
    anchor: "owners",
    image: { kind: "use", id: "router.owner" },
  },
  {
    key: "capital",
    no: "03",
    title: { ro: "Vreau să investesc sau să finanțez", ru: "Хочу инвестировать или финансировать", en: "I want to invest or finance" },
    next: { ro: "Cum luăm decizii, cum gestionăm riscul și cum creăm valoare — de la principii la cifre.", ru: "Как мы принимаем решения, управляем риском и создаём стоимость — от принципов к цифрам.", en: "How we decide, manage risk and create value — from principles to numbers." },
    path: "/approach",
    anchor: "investors",
    image: { kind: "asset", slug: "dacia-31" },
  },
  {
    key: "partner",
    no: "04",
    title: { ro: "Vreau să discut un parteneriat", ru: "Хочу обсудить партнёрство", en: "I want to discuss a partnership" },
    next: { ro: "Unde colaborăm, ce face un proiect relevant și cum începe o discuție.", ru: "Где мы сотрудничаем, что делает проект интересным и как начинается разговор.", en: "Where we collaborate, what makes a project relevant and how a conversation starts." },
    path: "/opportunities",
    anchor: "partners",
    image: { kind: "use", id: "router.partner" },
  },
  {
    key: "career",
    no: "05",
    title: { ro: "Vreau să lucrez la MEGAPARC", ru: "Хочу работать в MEGAPARC", en: "I want to join MEGAPARC" },
    next: { ro: "Obiecte reale, proiecte reale, responsabilitate reală — și posturile deschise.", ru: "Реальные объекты, реальные проекты, реальная ответственность — и открытые вакансии.", en: "Real assets, real projects, real responsibility — and the open roles." },
    path: "/careers",
    anchor: "work",
    image: { kind: "use", id: "router.career" },
  },
];

/* ------------------------------------------------------------------ */
/* Tenant journey                                                       */
/* ------------------------------------------------------------------ */

export const businessTypes: { key: BusinessType; label: Localized; goal: Localized; concerns: Requirement[] }[] = [
  { key: "retail", label: { ro: "Retail", ru: "Ритейл", en: "Retail" }, goal: { ro: "Să atragă clienți", ru: "Привлекать покупателей", en: "Attract customers" }, concerns: ["visibility", "ground", "parking", "delivery", "entrance"] },
  { key: "office", label: { ro: "Birou", ru: "Офис", en: "Office" }, goal: { ro: "Să creeze un sediu", ru: "Создать штаб-квартиру", en: "Create a headquarters" }, concerns: ["entrance", "parking", "flexible", "visibility", "power"] },
  { key: "showroom", label: { ro: "Showroom", ru: "Шоурум", en: "Showroom" }, goal: { ro: "Să arate produsul", ru: "Показывать продукт", en: "Show the product" }, concerns: ["visibility", "ground", "flexible", "parking", "delivery"] },
  { key: "services", label: { ro: "Servicii", ru: "Сервисы", en: "Services" }, goal: { ro: "Să fie la îndemâna clienților", ru: "Быть рядом с клиентами", en: "Be close to customers" }, concerns: ["ground", "entrance", "parking", "visibility", "flexible"] },
  { key: "clinic", label: { ro: "Clinică", ru: "Клиника", en: "Clinic" }, goal: { ro: "Să primească pacienți comod", ru: "Удобно принимать пациентов", en: "Receive patients comfortably" }, concerns: ["ground", "entrance", "parking", "power", "ventilation"] },
  { key: "fnb", label: { ro: "Cafenea / restaurant", ru: "Кафе / ресторан", en: "Café / restaurant" }, goal: { ro: "Flux de oaspeți și seara", ru: "Поток гостей и вечерняя жизнь", en: "Guest flow, day and evening" }, concerns: ["visibility", "power", "ventilation", "delivery", "ground"] },
];

export const requirementCopy: Record<Requirement, { label: Localized; why: Localized }> = {
  visibility: { label: { ro: "Vizibilitate", ru: "Видимость", en: "Visibility" }, why: { ro: "Clienții vă văd înainte să vă caute.", ru: "Клиенты видят вас раньше, чем начинают искать.", en: "Customers see you before they search for you." } },
  ground: { label: { ro: "Parter", ru: "Первый этаж", en: "Ground floor" }, why: { ro: "Intrare fără scări — pentru clienți, pacienți și marfă.", ru: "Вход без лестниц — для клиентов, пациентов и товара.", en: "Step-free entry for customers, patients and goods." } },
  parking: { label: { ro: "Parcare", ru: "Парковка", en: "Parking" }, why: { ro: "Clienții și echipa ajung cu mașina fără efort.", ru: "Клиенты и команда приезжают на машине без проблем.", en: "Customers and staff arrive by car without effort." } },
  entrance: { label: { ro: "Intrare separată", ru: "Отдельный вход", en: "Separate entrance" }, why: { ro: "Propria adresă, propriul program, propriul control.", ru: "Свой адрес, свой режим работы, свой контроль.", en: "Your own address, hours and control." } },
  power: { label: { ro: "Putere electrică", ru: "Электрическая мощность", en: "Power capacity" }, why: { ro: "Echipamente de bucătărie, medicale sau tehnice fără limitări.", ru: "Кухонное, медицинское или техническое оборудование без ограничений.", en: "Kitchen, medical or technical equipment without limits." } },
  ventilation: { label: { ro: "Ventilație", ru: "Вентиляция", en: "Ventilation" }, why: { ro: "Aer, climatizare și evacuare adaptate activității.", ru: "Воздух, климат и вытяжка под вашу деятельность.", en: "Air, cooling and extraction suited to the activity." } },
  delivery: { label: { ro: "Acces pentru livrări", ru: "Подъезд для доставки", en: "Delivery access" }, why: { ro: "Marfa intră pe alt drum decât clienții.", ru: "Товар заходит другим путём, чем покупатели.", en: "Goods come in by a different route from customers." } },
  flexible: { label: { ro: "Planificare flexibilă", ru: "Гибкая планировка", en: "Flexible layout" }, why: { ro: "Spațiul se adaptează când afacerea crește.", ru: "Пространство меняется, когда бизнес растёт.", en: "The space adapts as the business grows." } },
};

export const fitLevelCopy = {
  strong: { ro: "Potrivire puternică", ru: "Сильная сторона", en: "Strong fit" },
  possible: { ro: "Posibil", ru: "Возможно", en: "Possible" },
  limited: { ro: "Limitat", ru: "Ограничено", en: "Limited" },
} satisfies Record<string, Localized>;

export const timelineOptions: { key: string; label: Localized; by: string | null }[] = [
  { key: "asap", label: { ro: "Cât mai curând", ru: "Как можно скорее", en: "As soon as possible" }, by: "2026-06-30" },
  { key: "2026", label: { ro: "Până la sfârșitul anului 2026", ru: "До конца 2026", en: "By the end of 2026" }, by: "2026-12-31" },
  { key: "2027", label: { ro: "În 2027", ru: "В 2027", en: "In 2027" }, by: "2027-12-31" },
  { key: "open", label: { ro: "Flexibil", ru: "Гибко", en: "Flexible" }, by: null },
];

export const areaOptions: { key: string; label: string; min: number; max: number }[] = [
  { key: "lt150", label: "< 150 m²", min: 0, max: 150 },
  { key: "150-250", label: "150–250 m²", min: 150, max: 250 },
  { key: "250-600", label: "250–600 m²", min: 250, max: 600 },
  { key: "600-1500", label: "600–1 500 m²", min: 600, max: 1500 },
  { key: "gt1500", label: "1 500 m² +", min: 1500, max: 100000 },
];

/* ------------------------------------------------------------------ */
/* Owner journey                                                        */
/* ------------------------------------------------------------------ */

export type OwnerAsset = "land" | "operating" | "reposition" | "project";
export type OwnerIntent = "sell" | "jv" | "develop" | "reposition" | "manage" | "unsure";

export const ownerAssets: { key: OwnerAsset; label: Localized }[] = [
  { key: "land", label: { ro: "Teren", ru: "Земельный участок", en: "Land" } },
  { key: "operating", label: { ro: "Clădire în funcțiune", ru: "Действующее здание", en: "Operating building" } },
  { key: "reposition", label: { ro: "Clădire de repoziționat", ru: "Здание под реконцепцию", en: "Building to reposition" } },
  { key: "project", label: { ro: "Proiect de dezvoltare", ru: "Проект развития", en: "Development project" } },
];

export const ownerIntents: { key: OwnerIntent; label: Localized; thinking: Localized; assess: Localized[] }[] = [
  {
    key: "sell",
    label: { ro: "Să vând", ru: "Продать", en: "Sell" },
    thinking: { ro: "Analizăm ce poate deveni obiectul în mâinile noastre — de aici vine o ofertă argumentată, nu o cifră aruncată.", ru: "Оцениваем, чем объект может стать в наших руках, — отсюда аргументированное предложение, а не случайная цифра.", en: "We assess what the property could become in our hands — that gives a reasoned offer, not a number in the air." },
    assess: [{ ro: "Situația juridică", ru: "Юридический статус", en: "Legal status" }, { ro: "Starea tehnică", ru: "Техническое состояние", en: "Technical condition" }, { ro: "Potențialul locației", ru: "Потенциал локации", en: "Location potential" }],
  },
  {
    key: "jv",
    label: { ro: "Joint venture", ru: "Совместный проект", en: "Joint venture" },
    thinking: { ro: "Proprietarul aduce terenul sau clădirea, MEGAPARC aduce conceptul, finanțarea și execuția. Împărțim valoarea creată.", ru: "Собственник вносит землю или здание, MEGAPARC — концепцию, финансирование и реализацию. Созданную стоимость делим.", en: "The owner brings the land or building, MEGAPARC brings concept, financing and delivery. We share the value created." },
    assess: [{ ro: "Scara posibilă", ru: "Возможный масштаб", en: "Possible scale" }, { ro: "Cererea în zonă", ru: "Спрос в районе", en: "Local demand" }, { ro: "Structura parteneriatului", ru: "Структура партнёрства", en: "Partnership structure" }],
  },
  {
    key: "develop",
    label: { ro: "Să dezvolt", ru: "Развивать", en: "Develop" },
    thinking: { ro: "Pornim de la funcție: ce are nevoie zona, ce se poate autoriza, ce economie are proiectul — apoi forma.", ru: "Начинаем с функции: что нужно району, что можно согласовать, какая экономика у проекта — потом форма.", en: "We start from function: what the area needs, what can be permitted, what the economics are — then the form." },
    assess: [{ ro: "Urbanism și autorizații", ru: "Градостроительство и разрешения", en: "Planning and permits" }, { ro: "Accese și rețele", ru: "Подъезды и сети", en: "Access and utilities" }, { ro: "Concepte posibile", ru: "Возможные концепции", en: "Possible concepts" }],
  },
  {
    key: "reposition",
    label: { ro: "Să repoziționez", ru: "Репозиционировать", en: "Reposition" },
    thinking: { ro: "O clădire veche poate lucra din nou: altă funcție, alți chiriași, alte costuri de exploatare.", ru: "Старое здание может снова работать: другая функция, другие арендаторы, другие эксплуатационные расходы.", en: "An old building can work again: a different use, different tenants, different operating costs." },
    assess: [{ ro: "Structura și instalațiile", ru: "Конструкции и инженерия", en: "Structure and services" }, { ro: "Funcția potrivită", ru: "Подходящая функция", en: "The right use" }, { ro: "Bugetul transformării", ru: "Бюджет трансформации", en: "Transformation budget" }],
  },
  {
    key: "manage",
    label: { ro: "Administrare", ru: "Управление активом", en: "Asset management" },
    thinking: { ro: "Păstrați proprietatea, noi o facem să lucreze mai bine: chiriași, costuri, întreținere, plan pe ani.", ru: "Вы сохраняете собственность, мы делаем так, чтобы она работала лучше: арендаторы, расходы, обслуживание, план на годы.", en: "You keep the property; we make it work better: tenants, costs, maintenance, a plan for the years ahead." },
    assess: [{ ro: "Contractele actuale", ru: "Текущие договоры", en: "Current leases" }, { ro: "Costurile de exploatare", ru: "Эксплуатационные расходы", en: "Operating costs" }, { ro: "Planul de îmbunătățire", ru: "План улучшений", en: "Improvement plan" }],
  },
  {
    key: "unsure",
    label: { ro: "Încă nu știu", ru: "Пока не знаю", en: "Not sure yet" },
    thinking: { ro: "Cel mai des începem exact de aici. O primă evaluare arată ce variantă are sens — vânzare, parteneriat sau dezvoltare.", ru: "Чаще всего разговор начинается именно здесь. Первичная оценка показывает, какой вариант имеет смысл: продажа, партнёрство или развитие.", en: "Most conversations start exactly here. A first assessment shows which option makes sense — a sale, a partnership or development." },
    assess: [{ ro: "Ce aveți", ru: "Что у вас есть", en: "What you have" }, { ro: "Ce vă doriți", ru: "Чего вы хотите", en: "What you want" }, { ro: "Ce permite piața", ru: "Что позволяет рынок", en: "What the market allows" }],
  },
];

/* ------------------------------------------------------------------ */
/* Partner journey                                                      */
/* ------------------------------------------------------------------ */

export const partnerCategories: { key: string; label: Localized; how: Localized }[] = [
  { key: "landowners", label: { ro: "Proprietari de terenuri", ru: "Собственники земли", en: "Landowners" }, how: { ro: "Joint venture, dezvoltare, achiziție", ru: "Совместный проект, развитие, покупка", en: "Joint venture, development, acquisition" } },
  { key: "developers", label: { ro: "Dezvoltatori", ru: "Девелоперы", en: "Developers" }, how: { ro: "Co-dezvoltare, preluarea unui proiect", ru: "Со-девелопмент, выкуп проекта", en: "Co-development, project takeover" } },
  { key: "banks", label: { ro: "Bănci", ru: "Банки", en: "Banks" }, how: { ro: "Finanțarea achizițiilor și a proiectelor", ru: "Финансирование покупок и проектов", en: "Financing acquisitions and projects" } },
  { key: "investors", label: { ro: "Investitori", ru: "Инвесторы", en: "Investors" }, how: { ro: "Co-investiții în obiecte și proiecte", ru: "Соинвестиции в объекты и проекты", en: "Co-investment in properties and projects" } },
  { key: "brokers", label: { ro: "Brokeri", ru: "Брокеры", en: "Brokers" }, how: { ro: "Chiriași și obiecte pentru portofoliu", ru: "Арендаторы и объекты для портфеля", en: "Tenants and properties for the portfolio" } },
  { key: "architects", label: { ro: "Arhitecți", ru: "Архитекторы", en: "Architects" }, how: { ro: "Concepte, proiectare, repoziționare", ru: "Концепции, проектирование, реконцепция", en: "Concepts, design, repositioning" } },
  { key: "contractors", label: { ro: "Constructori", ru: "Подрядчики", en: "Contractors" }, how: { ro: "Construcție, renovare, exploatare tehnică", ru: "Строительство, реконструкция, техэксплуатация", en: "Construction, renovation, technical operations" } },
  { key: "professionals", label: { ro: "Parteneri profesioniști", ru: "Профессиональные партнёры", en: "Professional partners" }, how: { ro: "Juridic, evaluare, consultanță", ru: "Право, оценка, консалтинг", en: "Legal, valuation, advisory" } },
];

export const partnerRelevance: Localized[] = [
  { ro: "O locație cu cerere reală", ru: "Локация с реальным спросом", en: "A location with real demand" },
  { ro: "O funcție clară pentru oraș sau regiune", ru: "Понятная функция для города или региона", en: "A clear use for the city or region" },
  { ro: "Situație juridică transparentă", ru: "Прозрачная юридическая ситуация", en: "A transparent legal position" },
  { ro: "Un drum realist spre valoare", ru: "Реалистичный путь к стоимости", en: "A realistic path to value" },
];

export const partnerSteps: { title: Localized; text: Localized }[] = [
  { title: { ro: "Un mesaj scurt", ru: "Короткое сообщение", en: "A short message" }, text: { ro: "Cine sunteți, ce propuneți, unde și în ce termen.", ru: "Кто вы, что предлагаете, где и в какие сроки.", en: "Who you are, what you propose, where and when." } },
  { title: { ro: "O primă discuție", ru: "Первая встреча", en: "A first conversation" }, text: { ro: "Răspundem și stabilim o întâlnire cu persoana responsabilă.", ru: "Отвечаем и назначаем встречу с ответственным специалистом.", en: "We reply and set up a meeting with the person responsible." } },
  { title: { ro: "Materiale și confidențialitate", ru: "Материалы и конфиденциальность", en: "Materials and confidentiality" }, text: { ro: "Schimbăm documentele necesare, sub acord de confidențialitate.", ru: "Обмениваемся нужными документами под соглашение о конфиденциальности.", en: "We exchange the documents needed, under a confidentiality agreement." } },
  { title: { ro: "Evaluare comună", ru: "Совместная оценка", en: "Joint assessment" }, text: { ro: "Analiza comună arată dacă și cum continuăm.", ru: "Совместный анализ показывает, продолжаем ли мы и как.", en: "A joint review shows whether and how we continue." } },
];
