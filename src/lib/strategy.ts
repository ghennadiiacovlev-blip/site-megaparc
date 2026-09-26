import type { Localized, SiteLocale } from "@/lib/site-data";

/**
 * Public strategy copy — editorial source language is Russian
 * (OWNER_EDITORIAL_COPY_BRIEF.md); RO and EN are professional adaptations.
 * No hurdle rates, IRR, payback, thresholds, debt or internal economics.
 */

export type Titled = { title: Localized; text: Localized };
export type Numbered = Titled & { no: string };

/* ------------------------------------------------------------------ */
/* How we evaluate                                                      */
/* ------------------------------------------------------------------ */

export const philosophy = {
  kicker: { ro: "Cum evaluăm", ru: "Как мы оцениваем объекты", en: "How we evaluate opportunities" } satisfies Localized,
  title: {
    ro: "Privim imobiliarele ca pe un activ de business.",
    ru: "Рассматриваем недвижимость как бизнес-актив.",
    en: "We treat real estate as a business asset.",
  } satisfies Localized,
  paragraphs: {
    ro: [
      "Înainte de a investi, evaluăm locația, destinația, economia proiectului, riscurile și potențialul de creștere a valorii.",
      "Privim fiecare obiect din trei perspective: ca imobil, ca afacere în funcțiune și ca investiție pe termen lung.",
      "Investim acolo unde vedem potențial. Dezvoltăm acolo unde putem adăuga valoare. Administrăm astfel încât obiectul să-și păstreze calitatea și randamentul peste ani.",
      "Scopul nostru: imobiliare care funcționează astăzi și rămân căutate mâine.",
    ],
    ru: [
      "До инвестирования оцениваем локацию, назначение, экономику проекта, риски и потенциал роста стоимости.",
      "Смотрим на объект с трёх сторон: как на недвижимость, как на работающий бизнес и как на долгосрочное вложение.",
      "Инвестируем там, где видим потенциал. Развиваем там, где можем создать дополнительную стоимость. Управляем так, чтобы объект сохранял качество и доходность через годы.",
      "Наша цель — недвижимость, которая работает сегодня и остаётся востребованной завтра.",
    ],
    en: [
      "Before we invest, we assess the location, the use, the project economics, the risks and the potential for value growth.",
      "We look at every property from three angles: as real estate, as an operating business and as a long-term investment.",
      "We invest where we see potential. We develop where we can add value. We manage so that a property keeps its quality and income for years.",
      "Our aim is real estate that works today and stays in demand tomorrow.",
    ],
  } as Record<SiteLocale, string[]>,
  lenses: {
    ro: ["Imobil", "Afacere în funcțiune", "Investiție pe termen lung"],
    ru: ["Недвижимость", "Работающий бизнес", "Долгосрочное вложение"],
    en: ["Real estate", "Operating business", "Long-term investment"],
  } as Record<SiteLocale, string[]>,
};

/* ------------------------------------------------------------------ */
/* Purpose / Mission / Vision                                           */
/* ------------------------------------------------------------------ */

export const purpose: Titled = {
  title: { ro: "Scop", ru: "Цель", en: "Purpose" },
  text: {
    ro: "Creăm valoare pe termen lung prin imobiliare.",
    ru: "Создавать долгосрочную стоимость через недвижимость.",
    en: "To create long-term value through real estate.",
  },
};

export const mission: Titled = {
  title: { ro: "Misiune", ru: "Миссия", en: "Mission" },
  text: {
    ro: "Investim în imobiliare, dezvoltăm proiecte și administrăm obiecte astfel încât să-și păstreze valoarea și să aducă venit.",
    ru: "Инвестировать в недвижимость, развивать проекты и управлять объектами так, чтобы они сохраняли стоимость и приносили доход.",
    en: "To invest in real estate, develop projects and manage properties so that they keep their value and generate income.",
  },
};

export const vision: Titled = {
  title: { ro: "Viziune", ru: "Видение", en: "Vision" },
  text: {
    ro: "O companie care reunește investițiile, dezvoltarea și administrarea imobiliară și lucrează cu obiecte și proiecte pe piețele internaționale.",
    ru: "Компания, которая объединяет инвестиции, девелопмент и управление недвижимостью и работает с объектами и проектами на международных рынках.",
    en: "A company that combines investment, development and asset management and works with properties and projects across international markets.",
  },
};

/* ------------------------------------------------------------------ */
/* Owner's mindset                                                      */
/* ------------------------------------------------------------------ */

export const ownerMindset = {
  title: { ro: "Mentalitate de proprietar", ru: "Мышление собственника", en: "Owner's mindset" } satisfies Localized,
  statement: {
    ro: "Luăm deciziile ca și cum obiectul ar rămâne al nostru pentru mult timp.",
    ru: "Принимаем решения так, как если бы объект оставался у нас надолго.",
    en: "We make decisions as if the property were to stay with us for a long time.",
  } satisfies Localized,
  traits: {
    ro: ["Calitatea construcției", "Costurile de exploatare", "Chiriași de încredere", "Starea obiectului", "Posibilitatea de adaptare"],
    ru: ["Качество строительства", "Эксплуатационные расходы", "Надёжные арендаторы", "Состояние объекта", "Возможность адаптации"],
    en: ["Build quality", "Operating costs", "Reliable tenants", "Condition of the property", "Ability to adapt"],
  } as Record<SiteLocale, string[]>,
};

/* ------------------------------------------------------------------ */
/* Where we invest                                                      */
/* ------------------------------------------------------------------ */

/**
 * Moldova holds the current portfolio; opportunities are evaluated on
 * international markets. No target countries, foreign offices, foreign
 * holdings, ticket sizes, allocations or thresholds are published.
 */
export const investmentMandate = {
  kicker: { ro: "Unde investim", ru: "Где мы инвестируем", en: "Where we invest" } satisfies Localized,
  statement: {
    ro: ["Oportunități de investiții", "la nivel internațional."],
    ru: ["Инвестиционные возможности", "по всему миру."],
    en: ["Investment opportunities", "worldwide."],
  } as Record<SiteLocale, string[]>,
  expression: {
    ro: "Investim în imobiliare la nivel internațional.",
    ru: "Инвестируем в недвижимость по всему миру.",
    en: "We invest in real estate worldwide.",
  } satisfies Localized,
  text: {
    ro: "Analizăm imobiliare generatoare de venit, terenuri de dezvoltare, proiecte de repoziționare și investiții comune pe piețele internaționale.",
    ru: "Рассматриваем доходную недвижимость, площадки под развитие, проекты для репозиционирования и совместные инвестиции на международных рынках.",
    en: "We consider income-producing real estate, development sites, repositioning projects and joint investments across international markets.",
  } satisfies Localized,
  base: {
    title: { ro: "Moldova", ru: "Молдова", en: "Moldova" } satisfies Localized,
    role: { ro: "Portofoliul actual", ru: "Действующий портфель", en: "Current portfolio" } satisfies Localized,
    points: {
      ro: ["Biroul MEGAPARC, Chișinău", "Obiecte comerciale în funcțiune", "Proiecte de dezvoltare", "Experiența grupului din 1995"],
      ru: ["Офис MEGAPARC в Кишинёве", "Действующие коммерческие объекты", "Проекты развития", "Опыт группы с 1995 года"],
      en: ["MEGAPARC office, Chișinău", "Operating commercial properties", "Development projects", "Group experience since 1995"],
    } as Record<SiteLocale, string[]>,
  },
  global: {
    title: { ro: "Piețe internaționale", ru: "Международные рынки", en: "International markets" } satisfies Localized,
    role: { ro: "Ce analizăm", ru: "Что рассматриваем", en: "What we consider" } satisfies Localized,
    points: {
      ro: ["Imobiliare generatoare de venit", "Terenuri de dezvoltare", "Repoziționarea obiectelor existente", "Proiecte strategice", "Proiecte comune și parteneriate"],
      ru: ["Доходная недвижимость", "Площадки под развитие", "Репозиционирование существующих объектов", "Стратегические проекты", "Совместные проекты и партнёрства"],
      en: ["Income-producing real estate", "Development sites", "Repositioning of existing buildings", "Strategic projects", "Joint projects and partnerships"],
    } as Record<SiteLocale, string[]>,
  },
  criteria: {
    label: { ro: "Ce evaluăm", ru: "Что оцениваем", en: "What we assess" } satisfies Localized,
    points: {
      ro: ["Locația", "Destinația", "Economia proiectului", "Claritatea juridică a tranzacției", "Potențialul de îmbunătățire", "Riscurile", "Posibilitatea de realizare"],
      ru: ["Локация", "Назначение", "Экономика проекта", "Юридическая чистота сделки", "Потенциал улучшения", "Риски", "Возможность реализации"],
      en: ["Location", "Use", "Project economics", "Legal clarity of the deal", "Potential to improve", "Risks", "Feasibility"],
    } as Record<SiteLocale, string[]>,
  },
  note: {
    ro: "Fiecare oportunitate este evaluată separat.",
    ru: "Каждую возможность оцениваем отдельно.",
    en: "Every opportunity is assessed individually.",
  } satisfies Localized,
  cta: { ro: "Propune un obiect", ru: "Предложить объект", en: "Submit a property" } satisfies Localized,
};

/* ------------------------------------------------------------------ */
/* What we do                                                           */
/* ------------------------------------------------------------------ */

export const capabilities: Numbered[] = [
  {
    no: "01",
    title: { ro: "Investiții", ru: "Инвестиции", en: "Investment" },
    text: {
      ro: "Căutăm obiecte cu o economie clară și potențial de creștere a valorii.",
      ru: "Ищем объекты с понятной экономикой и потенциалом роста стоимости.",
      en: "We look for properties with clear economics and potential for value growth.",
    },
  },
  {
    no: "02",
    title: { ro: "Dezvoltare", ru: "Девелопмент", en: "Development" },
    text: {
      ro: "Dezvoltăm proiecte de la teren și concept până la obiectul finalizat.",
      ru: "Развиваем проекты от площадки и концепции до готового объекта.",
      en: "We take projects from site and concept to a completed building.",
    },
  },
  {
    no: "03",
    title: { ro: "Administrarea activelor", ru: "Управление активами", en: "Asset management" },
    text: {
      ro: "Creștem calitatea obiectelor, eficiența exploatării și atractivitatea lor pe termen lung.",
      ru: "Повышаем качество объектов, эффективность эксплуатации и их долгосрочную востребованность.",
      en: "We improve the quality, operating efficiency and long-term appeal of our properties.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Investment principles                                                */
/* ------------------------------------------------------------------ */

export const investmentPrinciples: Numbered[] = [
  {
    no: "01",
    title: { ro: "Economie clară", ru: "Понятная экономика", en: "Clear economics" },
    text: {
      ro: "Investim doar acolo unde este limpede cum câștigă obiectul.",
      ru: "Инвестируем только там, где ясно, как объект зарабатывает.",
      en: "We invest only where it is clear how a property earns.",
    },
  },
  {
    no: "02",
    title: { ro: "Locație puternică", ru: "Сильная локация", en: "Strong location" },
    text: {
      ro: "Locul determină cererea, chiriașii și valoarea pentru anii următori.",
      ru: "Место определяет спрос, арендаторов и стоимость на годы вперёд.",
      en: "Location determines demand, tenants and value for years ahead.",
    },
  },
  {
    no: "03",
    title: { ro: "Potențial real de îmbunătățire", ru: "Реальный потенциал улучшения", en: "Real potential to improve" },
    text: {
      ro: "Căutăm obiecte cărora le putem adăuga valoare: reconcepere, reconstrucție, destinație nouă.",
      ru: "Ищем объекты, которым можно добавить стоимость: реконцепция, реконструкция, новое назначение.",
      en: "We look for properties where we can add value: a new concept, reconstruction or a new use.",
    },
  },
  {
    no: "04",
    title: { ro: "Controlul riscurilor", ru: "Контроль рисков", en: "Risk control" },
    text: {
      ro: "Evaluăm riscurile juridice, de construcție și de piață înainte de tranzacție, nu după.",
      ru: "Оцениваем юридические, строительные и рыночные риски до сделки, а не после.",
      en: "We assess legal, construction and market risks before a deal, not after.",
    },
  },
  {
    no: "05",
    title: { ro: "Cerere pe termen lung", ru: "Долгосрочная востребованность", en: "Lasting demand" },
    text: {
      ro: "Alegem obiecte de care chiriașii și orașul vor avea nevoie și peste ani.",
      ru: "Выбираем объекты, которые останутся нужными арендаторам и городу.",
      en: "We choose properties that tenants and the city will still need in years to come.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* What creates value                                                   */
/* ------------------------------------------------------------------ */

export type CycleStage = { key: string; no: string; title: Localized; text: Localized };

export const valueCycle: CycleStage[] = [
  { key: "identify", no: "01", title: { ro: "Identificare", ru: "Поиск", en: "Identify" }, text: { ro: "Căutăm obiecte și terenuri unde valoarea nu este încă valorificată.", ru: "Ищем объекты и площадки, где стоимость ещё не реализована.", en: "We look for properties and sites where value is not yet realised." } },
  { key: "assess", no: "02", title: { ro: "Evaluare", ru: "Оценка", en: "Assess" }, text: { ro: "Evaluăm locația, destinația, economia proiectului și riscurile.", ru: "Оцениваем локацию, назначение, экономику проекта и риски.", en: "We assess the location, the use, the project economics and the risks." } },
  { key: "invest", no: "03", title: { ro: "Investiție", ru: "Инвестиция", en: "Invest" }, text: { ro: "Investim acolo unde drumul spre creșterea valorii este clar.", ru: "Вкладываем средства там, где понятен путь к росту стоимости.", en: "We commit capital where the path to value growth is clear." } },
  { key: "develop", no: "04", title: { ro: "Dezvoltare", ru: "Развитие", en: "Develop" }, text: { ro: "Proiectăm și construim, de la concept până la punerea în funcțiune.", ru: "Проектируем и строим — от концепции до ввода в эксплуатацию.", en: "We design and build, from concept to commissioning." } },
  { key: "operate", no: "05", title: { ro: "Exploatare", ru: "Эксплуатация", en: "Operate" }, text: { ro: "Închiriem și întreținem obiectul ca pe o afacere în funcțiune.", ru: "Сдаём в аренду и обслуживаем объект как работающий бизнес.", en: "We lease and maintain the property as an operating business." } },
  { key: "optimise", no: "06", title: { ro: "Îmbunătățire", ru: "Улучшение", en: "Improve" }, text: { ro: "Modernizăm, reprofilăm și adaptăm obiectul înainte să se învechească.", ru: "Обновляем, перепрофилируем и адаптируем объект, пока он не устарел.", en: "We renew, repurpose and adapt the property before it becomes outdated." } },
  { key: "reinvest", no: "07", title: { ro: "Reinvestire", ru: "Реинвестирование", en: "Reinvest" }, text: { ro: "Direcționăm rezultatul spre următorul obiect sau proiect.", ru: "Направляем результат в следующий объект или проект.", en: "We put the result into the next property or project." } },
];

export const cycleOutcomes: Record<SiteLocale, string[]> = {
  ro: ["Păstrăm", "Modernizăm", "Vindem", "Reinvestim"],
  ru: ["Держим", "Обновляем", "Продаём", "Реинвестируем"],
  en: ["Hold", "Renew", "Sell", "Reinvest"],
};

export const valueCycleCopy = {
  kicker: { ro: "Ce creează valoare", ru: "Что создаёт стоимость", en: "What creates value" } satisfies Localized,
  title: { ro: "Valoarea se creează la fiecare etapă.", ru: "Стоимость создаётся на каждом этапе.", en: "Value is created at every stage." } satisfies Localized,
  text: {
    ro: "Investiția nu se încheie la cumpărare. Fiecare etapă, de la identificare la reinvestire, influențează rezultatul.",
    ru: "Инвестиция не заканчивается покупкой. Каждый этап — от поиска до реинвестирования — влияет на результат.",
    en: "An investment does not end with the purchase. Every stage, from search to reinvestment, shapes the result.",
  } satisfies Localized,
  outcomesLabel: { ro: "Decizii posibile", ru: "Возможные решения", en: "Possible decisions" } satisfies Localized,
};

/* ------------------------------------------------------------------ */
/* MEGAPARC 2030 — long-term direction                                  */
/* ------------------------------------------------------------------ */

export type Pillar = Numbered & { points: Record<SiteLocale, string[]>; idea?: Localized };

export const megaparc2030 = {
  name: "MEGAPARC 2030",
  subtitle: {
    ro: "Direcția companiei pe termen lung",
    ru: "Долгосрочное направление компании",
    en: "The company's long-term direction",
  } satisfies Localized,
  intro: {
    ro: "Șapte direcții arată cum MEGAPARC își dezvoltă portofoliul, proiectele și organizația.",
    ru: "Семь направлений показывают, как MEGAPARC развивает портфель, проекты и организацию.",
    en: "Seven directions show how MEGAPARC is developing its portfolio, projects and organisation.",
  } satisfies Localized,
  equation: { ro: "MEGAPARC = imobiliare + proiecte + echipă", ru: "MEGAPARC = недвижимость + проекты + команда", en: "MEGAPARC = real estate + projects + team" } satisfies Localized,
  pillars: [
    {
      no: "01",
      title: { ro: "Calitatea portofoliului", ru: "Качество портфеля", en: "Portfolio quality" },
      text: { ro: "Obiecte căutate de chiriași și ușor de exploatat.", ru: "Объекты, которые востребованы у арендаторов и удобны в эксплуатации.", en: "Properties that tenants want and that are easy to operate." },
      points: {
        ro: ["Cerere", "Stare tehnică", "Exploatare eficientă", "Posibilitate de adaptare"],
        ru: ["Востребованность", "Техническое состояние", "Эффективная эксплуатация", "Возможность адаптации"],
        en: ["Demand", "Technical condition", "Efficient operation", "Ability to adapt"],
      },
    },
    {
      no: "02",
      title: { ro: "Proiecte de dezvoltare", ru: "Проекты развития", en: "Development projects" },
      text: { ro: "Un proces clar, de la teren până la punerea în funcțiune.", ru: "Понятный процесс от участка до ввода в эксплуатацию.", en: "A clear process from site to commissioning." },
      points: {
        ro: ["Teren", "Concept", "Evaluare economică", "Proiectare", "Construcție", "Punere în funcțiune"],
        ru: ["Участок", "Концепция", "Экономическая оценка", "Проектирование", "Строительство", "Ввод в эксплуатацию"],
        en: ["Site", "Concept", "Economic assessment", "Design", "Construction", "Commissioning"],
      },
    },
    {
      no: "03",
      title: { ro: "Administrarea obiectelor", ru: "Управление объектами", en: "Property management" },
      text: { ro: "Închiriere, întreținere și modernizare ca un singur proces.", ru: "Аренда, обслуживание и обновление объектов как единый процесс.", en: "Leasing, maintenance and renewal as one process." },
      points: {
        ro: ["Închiriere", "Întreținere", "Modernizare", "Relația cu chiriașii"],
        ru: ["Аренда", "Обслуживание", "Обновление", "Работа с арендаторами"],
        en: ["Leasing", "Maintenance", "Renewal", "Tenant relations"],
      },
    },
    {
      no: "04",
      title: { ro: "Investiții echilibrate", ru: "Взвешенные инвестиции", en: "Considered investment" },
      idea: { ro: "Investim acolo unde înțelegem economia obiectului.", ru: "Инвестируем там, где понимаем экономику объекта.", en: "We invest where we understand the economics of the property." },
      text: { ro: "Înainte de a investi, evaluăm locația, destinația, economia proiectului, riscurile și potențialul.", ru: "До инвестирования оцениваем локацию, назначение, экономику проекта, риски и потенциал.", en: "Before investing, we assess the location, the use, the project economics, the risks and the potential." },
      points: {
        ro: ["Locație", "Destinație", "Economie", "Riscuri", "Potențial"],
        ru: ["Локация", "Назначение", "Экономика", "Риски", "Потенциал"],
        en: ["Location", "Use", "Economics", "Risks", "Potential"],
      },
    },
    {
      no: "05",
      title: { ro: "Mediul urban", ru: "Городская среда", en: "Urban environment" },
      text: { ro: "Utilizarea mai bună a clădirilor existente și construcții noi de calitate.", ru: "Лучшее использование существующих зданий и качественная новая застройка.", en: "Better use of existing buildings and good-quality new construction." },
      points: {
        ro: ["Reconstrucție", "Accesibilitate", "Mediu de calitate"],
        ru: ["Реконструкция", "Доступность", "Качественная среда"],
        en: ["Reconstruction", "Accessibility", "Quality environment"],
      },
    },
    {
      no: "06",
      title: { ro: "Organizație", ru: "Организация", en: "Organisation" },
      text: { ro: "Procese clare, control financiar și o echipă profesionistă.", ru: "Понятные процессы, финансовый контроль и профессиональная команда.", en: "Clear processes, financial control and a professional team." },
      points: {
        ro: ["Procese", "Control financiar", "Echipă"],
        ru: ["Процессы", "Финансовый контроль", "Команда"],
        en: ["Processes", "Financial control", "Team"],
      },
    },
    {
      no: "07",
      title: { ro: "Echipă și reputație", ru: "Команда и репутация", en: "Team and reputation" },
      text: { ro: "Compania crește împreună cu oamenii care răspund de rezultat.", ru: "Компания растёт вместе с людьми, которые отвечают за результат.", en: "The company grows with the people who are accountable for results." },
      points: {
        ro: ["Echipă", "Reputație"],
        ru: ["Команда", "Репутация"],
        en: ["Team", "Reputation"],
      },
    },
  ] as Pillar[],
};

/* ------------------------------------------------------------------ */
/* Development process                                                  */
/* ------------------------------------------------------------------ */

export const developmentNarrative = {
  title: { ro: "Dezvoltăm proiecte de la idee la realizare.", ru: "Развиваем проекты от идеи до реализации.", en: "We take projects from idea to completion." } satisfies Localized,
  stages: [
    { no: "01", title: { ro: "Teren / obiect", ru: "Участок / объект", en: "Site / building" }, text: { ro: "Teren sau clădire existentă, cu o logică urbană clară.", ru: "Земля или существующее здание с понятной городской логикой.", en: "Land or an existing building with a clear urban logic." } },
    { no: "02", title: { ro: "Concept", ru: "Концепция", en: "Concept" }, text: { ro: "Stabilim destinația, scara și formatul.", ru: "Определяем назначение, масштаб и формат.", en: "We define the use, the scale and the format." } },
    { no: "03", title: { ro: "Evaluare economică", ru: "Экономическая оценка", en: "Economic assessment" }, text: { ro: "Calculăm economia proiectului și verificăm condițiile urbanistice și juridice.", ru: "Считаем экономику, проверяем градостроительные и юридические условия.", en: "We run the numbers and check planning and legal conditions." } },
    { no: "04", title: { ro: "Proiectare", ru: "Проектирование", en: "Design" }, text: { ro: "Proiectăm pentru exploatare, nu doar pentru predare.", ru: "Проектируем с расчётом на эксплуатацию, а не только на сдачу.", en: "We design for operation, not just for handover." } },
    { no: "05", title: { ro: "Construcție", ru: "Строительство", en: "Construction" }, text: { ro: "Controlăm bugetul, termenele și calitatea.", ru: "Контролируем бюджет, сроки и качество.", en: "We control budget, schedule and quality." } },
    { no: "06", title: { ro: "Punere în funcțiune", ru: "Ввод в эксплуатацию", en: "Commissioning" }, text: { ro: "Obiectul începe să funcționeze: închiriere, întreținere, deciziile următoare.", ru: "Объект начинает работать: аренда, обслуживание, дальнейшие решения.", en: "The building starts working: leasing, maintenance, next decisions." } },
  ] as Numbered[],
};

/* ------------------------------------------------------------------ */
/* History — fixed public chronology                                    */
/* ------------------------------------------------------------------ */

export type HistoryAnchor = { year: string; scope: "group" | "megaparc"; title: Localized; text: Localized };

export const historyAnchors: HistoryAnchor[] = [
  {
    year: "1995",
    scope: "group",
    title: { ro: "Experiența grupului", ru: "Опыт группы", en: "Group experience" },
    text: {
      ro: "Experiență antreprenorială a grupului din 1995: retail, investiții, producție, servicii financiare.",
      ru: "Предпринимательский опыт группы с 1995 года: розница, инвестиции, производство, финансовые услуги.",
      en: "The group's entrepreneurial experience since 1995: retail, investment, manufacturing, financial services.",
    },
  },
  {
    year: "2005",
    scope: "megaparc",
    title: { ro: "Este fondată MEGAPARC", ru: "Основана MEGAPARC", en: "MEGAPARC is founded" },
    text: {
      ro: "MEGAPARC este fondată în 2005: achiziția și modernizarea obiectelor comerciale.",
      ru: "Основана MEGAPARC: покупка и модернизация коммерческих объектов.",
      en: "MEGAPARC is founded in 2005: acquiring and modernising commercial properties.",
    },
  },
  {
    year: "2020",
    scope: "megaparc",
    title: { ro: "Focus pe imobiliare", ru: "Фокус на недвижимости", en: "Focus on real estate" },
    text: {
      ro: "Focus pe imobiliare în Moldova: administrarea obiectelor, dezvoltare și modernizarea mediului urban.",
      ru: "Фокус на недвижимости в Молдове: управление объектами, девелопмент, обновление городской среды.",
      en: "Focus on real estate in Moldova: property management, development and urban renewal.",
    },
  },
  {
    year: "today",
    scope: "megaparc",
    title: { ro: "Investim · Dezvoltăm · Administrăm", ru: "Инвестируем · Развиваем · Управляем", en: "Invest · Develop · Manage" },
    text: {
      ro: "Investiții, dezvoltare și administrare imobiliară. Analizăm obiecte și proiecte pe piețele internaționale.",
      ru: "Инвестиции, девелопмент и управление недвижимостью. Объекты и проекты рассматриваем на международных рынках.",
      en: "Investment, development and asset management. We consider properties and projects across international markets.",
    },
  },
];

export const historyCopy = {
  today: { ro: "Astăzi", ru: "Сегодня", en: "Today" } satisfies Localized,
  group: { ro: "Experiența grupului", ru: "Опыт группы", en: "Group experience" } satisfies Localized,
  megaparc: { ro: "MEGAPARC", ru: "MEGAPARC", en: "MEGAPARC" } satisfies Localized,
  supporting: [
    { year: "1996–1997", title: { ro: "Servicii financiare și agroindustrie", ru: "Финансовые услуги и агропромышленность", en: "Financial services and agro-industry" }, text: { ro: "Extindere în servicii financiare și activități agroindustriale.", ru: "Выход в финансовые услуги и агропромышленный сектор.", en: "Expansion into financial services and agro-industry." } },
    { year: "2006–2007", title: { ro: "Diversificare", ru: "Диверсификация", en: "Diversification" }, text: { ro: "Noi domenii de activitate și experiență operațională internațională.", ru: "Новые направления бизнеса и международный опыт.", en: "New lines of business and international operating experience." } },
    { year: "2017–2019", title: { ro: "Comerț internațional și logistică", ru: "Международная торговля и логистика", en: "International trade and logistics" }, text: { ro: "Operațiuni de comerț și logistică pe mai multe piețe.", ru: "Торговые и логистические операции на нескольких рынках.", en: "Trading and logistics operations across several markets." } },
  ] as { year: string; title: Localized; text: Localized }[],
};

/* ------------------------------------------------------------------ */
/* Responsibility                                                       */
/* ------------------------------------------------------------------ */

export const responsibility: Titled = {
  title: { ro: "Responsabilitate", ru: "Ответственность", en: "Responsibility" },
  text: {
    ro: "Dezvoltăm și administrăm imobiliare astfel încât să-și păstreze valoarea pentru proprietar, să fie comode pentru utilizatori și să îmbunătățească mediul urban.",
    ru: "Развиваем и управляем недвижимостью так, чтобы она сохраняла стоимость для собственника, была удобной для пользователей и улучшала городскую среду.",
    en: "We develop and manage real estate so that it keeps its value for the owner, works well for its users and improves the urban environment.",
  },
};
