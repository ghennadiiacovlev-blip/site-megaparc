import type { Localized, SiteLocale } from "@/lib/site-data";

/**
 * Corporate strategy and philosophy — the single source for every strategic
 * statement on the site. Governance: docs/BRAND_BOOK_2_0.md, docs/MEGAPARC_2030.md.
 *
 * Nothing here discloses hurdle rates, IRR, payback, thresholds, debt or
 * internal model economics. Public strategic direction only.
 */

export type Titled = { title: Localized; text: Localized };
export type Numbered = Titled & { no: string };

/* ------------------------------------------------------------------ */
/* Philosophy                                                           */
/* ------------------------------------------------------------------ */

export const philosophy = {
  kicker: { ro: "Filosofie", ru: "Философия", en: "Philosophy" } satisfies Localized,
  title: {
    ro: "Imobiliarele nu sunt doar metri pătrați. Sunt capital.",
    ru: "Недвижимость — не просто квадратные метры. Это капитал.",
    en: "Real estate is not merely square metres. It is capital.",
  } satisfies Localized,
  paragraphs: {
    ro: [
      "Valoarea unui activ se formează pe întreg ciclul său de viață, nu doar la achiziție sau la finalizarea construcției.",
      "De aceea privim fiecare obiect simultan ca proprietate, ca afacere în funcțiune, ca decizie de alocare a capitalului, ca loc și ca investiție pe termen lung.",
      "Investim acolo unde vedem potențial. Dezvoltăm acolo unde putem crea valoare suplimentară. Administrăm așa cum administrează un proprietar interesat de calitatea activului peste ani.",
      "Misiunea noastră este să creăm imobiliare care funcționează astăzi și rămân relevante mâine.",
    ],
    ru: [
      "Стоимость актива формируется на протяжении всего его жизненного цикла, а не только в момент приобретения или завершения строительства.",
      "Поэтому мы рассматриваем каждый объект одновременно как недвижимость, как работающий бизнес, как решение о размещении капитала, как место и как долгосрочную инвестицию.",
      "Мы инвестируем там, где видим потенциал. Развиваем там, где можем создать дополнительную стоимость. Управляем так, как управляет собственник, заинтересованный в качестве актива через годы.",
      "Наша задача — создавать недвижимость, которая работает сегодня и остаётся актуальной завтра.",
    ],
    en: [
      "The value of an asset is created across its entire lifecycle, not only at acquisition or at the end of construction.",
      "That is why we assess every property simultaneously as a physical asset, an operating business, a capital allocation decision, a place and a long-term investment.",
      "We invest where we see potential. We develop where we can create additional value. We manage as an owner manages, with an interest in the quality of the asset years from now.",
      "Our task is to create real estate that works today and remains relevant tomorrow.",
    ],
  } as Record<SiteLocale, string[]>,
  /** The five simultaneous lenses. */
  lenses: {
    ro: ["Activ fizic", "Afacere în funcțiune", "Decizie de alocare a capitalului", "Loc", "Investiție pe termen lung"],
    ru: ["Физический актив", "Работающий бизнес", "Решение о размещении капитала", "Место", "Долгосрочная инвестиция"],
    en: ["Physical asset", "Operating business", "Capital allocation decision", "Place", "Long-term investment"],
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
    en: "Create long-term value through real estate.",
  },
};

export const mission: Titled = {
  title: { ro: "Misiune", ru: "Миссия", en: "Mission" },
  text: {
    ro: "Creăm valoare pe termen lung prin investiții, dezvoltare și administrarea responsabilă a activelor imobiliare.",
    ru: "Создавать долгосрочную стоимость через инвестиции, девелопмент и ответственное управление недвижимостью.",
    en: "Create long-term value through investment, development and responsible management of real estate.",
  },
};

export const vision: Titled = {
  title: { ro: "Viziune", ru: "Видение", en: "Vision" },
  text: {
    ro: "O platformă imobiliară integrată, profesionistă, capabilă să creeze, să dezvolte și să păstreze valoare pe întreg ciclul de investiție, cu baza în Moldova, care investește la nivel internațional și are ambiția de a deveni un reper regional.",
    ru: "Профессиональная интегрированная платформа недвижимости, способная создавать, развивать и сохранять стоимость на протяжении всего инвестиционного цикла, с базой в Молдове, инвестирующая по всему миру, с амбицией стать ориентиром в регионе.",
    en: "A professional, integrated real-estate platform capable of creating, developing and preserving value across the full investment cycle, based in Moldova, investing worldwide, with the ambition of becoming a regional reference.",
  },
};

/* ------------------------------------------------------------------ */
/* Owner's mindset                                                      */
/* ------------------------------------------------------------------ */

export const ownerMindset = {
  title: { ro: "Mentalitate de proprietar", ru: "Мышление собственника", en: "Owner's mindset" } satisfies Localized,
  statement: {
    ro: "Fiecare decizie este luată așa cum ar lua-o un proprietar care va răspunde de activ și peste zece ani.",
    ru: "Каждое решение принимается так, как принял бы его собственник, который будет отвечать за актив и через десять лет.",
    en: "Every decision is taken as an owner would take it, knowing they will still be responsible for the asset in ten years.",
  } satisfies Localized,
  traits: {
    ro: ["Gândire pe termen lung", "Responsabilitate față de capital", "Calitatea activului", "Disciplină operațională", "Conștiința riscului", "Adaptabilitate", "Păstrarea valorii", "Crearea de valoare"],
    ru: ["Долгосрочное мышление", "Ответственность за капитал", "Качество актива", "Операционная дисциплина", "Понимание рисков", "Адаптивность", "Сохранение стоимости", "Создание стоимости"],
    en: ["Long-term thinking", "Capital responsibility", "Asset quality", "Operational discipline", "Downside awareness", "Adaptability", "Value preservation", "Value creation"],
  } as Record<SiteLocale, string[]>,
};

/* ------------------------------------------------------------------ */
/* Global investment mandate — OWNER addendum 2026-09-26                */
/* ------------------------------------------------------------------ */

/**
 * MOLDOVA = current verified operating / portfolio base.
 * WORLDWIDE = investment opportunities are evaluated internationally.
 * No target countries, foreign offices, foreign holdings, ticket sizes,
 * allocations or thresholds are published. Nothing here implies that
 * MEGAPARC already owns or operates assets outside Moldova.
 */
export const investmentMandate = {
  kicker: { ro: "Unde investim", ru: "Где мы инвестируем", en: "Where we invest" } satisfies Localized,
  statement: {
    ro: ["Moldova este baza noastră operațională.", "Analizăm oportunități de investiții imobiliare la nivel internațional."],
    ru: ["Молдова — наша операционная база.", "Инвестиционные возможности рассматриваем по всему миру."],
    en: ["Moldova is our operating base.", "We evaluate real-estate investment opportunities worldwide."],
  } as Record<SiteLocale, string[]>,
  expression: {
    ro: "Investim în imobiliare la nivel internațional.",
    ru: "Инвестируем в недвижимость по всему миру.",
    en: "We invest in real estate worldwide.",
  } satisfies Localized,
  text: {
    ro: "Portofoliul operațional și proiectele de dezvoltare ale MEGAPARC se află în Republica Moldova. Oportunitățile de investiții le analizăm oriunde activul, locația și partenerii îndeplinesc aceleași criterii.",
    ru: "Операционный портфель и девелоперские проекты MEGAPARC находятся в Республике Молдова. Инвестиционные возможности мы рассматриваем везде, где актив, локация и партнёры отвечают тем же критериям.",
    en: "MEGAPARC's operating portfolio and development projects are in the Republic of Moldova. We evaluate investment opportunities wherever the asset, the location and the partners meet the same criteria.",
  } satisfies Localized,
  base: {
    title: { ro: "Moldova", ru: "Молдова", en: "Moldova" } satisfies Localized,
    role: { ro: "Baza operațională verificată", ru: "Проверенная операционная база", en: "Verified operating base" } satisfies Localized,
    points: {
      ro: ["Sediul MEGAPARC, Chișinău", "Portofoliul operațional actual", "Proiectele de dezvoltare actuale", "Moștenire și experiență operațională din 1995"],
      ru: ["Штаб-квартира MEGAPARC, Кишинёв", "Текущий операционный портфель", "Текущие девелоперские проекты", "Наследие и операционный опыт с 1995 года"],
      en: ["MEGAPARC headquarters, Chișinău", "The current operating portfolio", "The current development projects", "Heritage and operating experience since 1995"],
    } as Record<SiteLocale, string[]>,
  },
  global: {
    title: { ro: "Piețe globale", ru: "Глобальные рынки", en: "Global markets" } satisfies Localized,
    role: { ro: "Oportunități de investiții la nivel internațional", ru: "Инвестиционные возможности по всему миру", en: "Investment opportunities worldwide" } satisfies Localized,
    points: {
      ro: ["Imobiliare generatoare de venit", "Amplasamente de dezvoltare", "Oportunități de repoziționare", "Proiecte imobiliare strategice", "Parteneriate și joint ventures"],
      ru: ["Доходная недвижимость", "Площадки под развитие", "Возможности репозиционирования", "Стратегические проекты недвижимости", "Партнёрства и совместные предприятия"],
      en: ["Income-producing real estate", "Development sites", "Repositioning opportunities", "Strategic real-estate projects", "Partnership and joint-venture opportunities"],
    } as Record<SiteLocale, string[]>,
  },
  criteria: {
    label: { ro: "Aceleași criterii, oriunde", ru: "Одни критерии, везде", en: "The same criteria, anywhere" } satisfies Localized,
    points: {
      ro: ["Calitatea locației", "Fundamentele activului", "Utilizare clară", "Fezabilitate juridică și tranzacțională", "Potențial de dezvoltare sau repoziționare", "Reziliență", "Capacitate de execuție", "Creare de valoare pe termen lung", "Disciplina capitalului"],
      ru: ["Качество локации", "Фундаментальные характеристики актива", "Ясное назначение", "Юридическая и транзакционная реализуемость", "Потенциал развития или репозиционирования", "Устойчивость", "Способность к реализации", "Долгосрочное создание стоимости", "Дисциплина капитала"],
      en: ["Location quality", "Asset fundamentals", "Clear use case", "Legal and transaction feasibility", "Development or repositioning potential", "Downside resilience", "Execution capability", "Long-term value creation", "Capital discipline"],
    } as Record<SiteLocale, string[]>,
  },
  note: {
    ro: "Nu publicăm țări-țintă, alocări sau praguri. Fiecare oportunitate este evaluată individual.",
    ru: "Мы не публикуем целевые страны, аллокации или пороги. Каждая возможность оценивается индивидуально.",
    en: "We do not publish target countries, allocations or thresholds. Every opportunity is assessed on its own merits.",
  } satisfies Localized,
  cta: { ro: "Propune o oportunitate", ru: "Предложить объект", en: "Submit an opportunity" } satisfies Localized,
};

/* ------------------------------------------------------------------ */
/* Integrated platform                                                  */
/* ------------------------------------------------------------------ */

export const capabilities: Numbered[] = [
  {
    no: "01",
    title: { ro: "Investiții", ru: "Инвестиции", en: "Investment" },
    text: {
      ro: "Selectăm active și oportunități după logica economică, utilizare și potențial de creare a valorii, nu după volum, în Moldova și pe piețe internaționale. Fiecare investiție concurează pentru capital.",
      ru: "Отбираем активы и возможности по экономической логике, назначению и потенциалу создания стоимости, а не по объёму, — в Молдове и на международных рынках. Каждая инвестиция конкурирует за капитал.",
      en: "We select assets and opportunities on economic logic, use and value-creation potential, not on volume, in Moldova and in international markets. Every investment competes for capital.",
    },
  },
  {
    no: "02",
    title: { ro: "Dezvoltare", ru: "Девелопмент", en: "Development" },
    text: {
      ro: "Transformăm terenuri, clădiri și concepte în active relevante pentru oraș, pentru utilizatori și pentru capital: de la amplasament, la produs, la activ operațional.",
      ru: "Превращаем участки, здания и концепции в активы, значимые для города, арендаторов и капитала: от площадки — к продукту — к операционному активу.",
      en: "We turn land, buildings and concepts into assets that matter to the city, to occupiers and to capital: from site, to product, to operating asset.",
    },
  },
  {
    no: "03",
    title: { ro: "Administrarea activelor", ru: "Управление активами", en: "Asset management" },
    text: {
      ro: "Poziționare, leasing, operare, investiții de capital și repoziționare, tratate ca parte a aceleiași decizii de investiție. Lucrul nu se încheie după achiziție sau construcție.",
      ru: "Позиционирование, аренда, эксплуатация, капитальные улучшения и репозиционирование — как часть одного инвестиционного решения. Работа не заканчивается после покупки или стройки.",
      en: "Positioning, leasing, operations, capital improvement and repositioning, treated as one investment decision. The work does not end after acquisition or construction.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Investment principles                                                */
/* ------------------------------------------------------------------ */

export const investmentPrinciples: Numbered[] = [
  {
    no: "01",
    title: { ro: "Valoare înainte de scară", ru: "Стоимость прежде масштаба", en: "Value before scale" },
    text: {
      ro: "Calitatea capitalului contează mai mult decât acumularea de metri pătrați.",
      ru: "Качество капитала важнее, чем простое накопление квадратных метров.",
      en: "Capital quality matters more than simply accumulating square metres.",
    },
  },
  {
    no: "02",
    title: { ro: "Mentalitate de proprietar", ru: "Мышление собственника", en: "Owner's mindset" },
    text: {
      ro: "Deciziile sunt evaluate din perspectiva unui proprietar pe termen lung.",
      ru: "Решения оцениваются с позиции долгосрочного собственника.",
      en: "Decisions are evaluated from the perspective of a long-term owner.",
    },
  },
  {
    no: "03",
    title: { ro: "Disciplina capitalului", ru: "Дисциплина капитала", en: "Capital discipline" },
    text: {
      ro: "Fiecare activ are nevoie de o logică economică clară și de un drum credibil spre crearea de valoare.",
      ru: "Каждому активу нужна ясная экономическая логика и убедительный путь к созданию стоимости.",
      en: "Each asset needs a clear economic logic and a credible path to value creation.",
    },
  },
  {
    no: "04",
    title: { ro: "Administrare activă", ru: "Активное управление", en: "Active management" },
    text: {
      ro: "Lucrul nu se încheie după achiziție sau construcție.",
      ru: "Работа не заканчивается после приобретения или строительства.",
      en: "The work does not end after acquisition or construction.",
    },
  },
  {
    no: "05",
    title: { ro: "Relevanță pe termen lung", ru: "Долгосрочная актуальность", en: "Long-term relevance" },
    text: {
      ro: "Un activ puternic trebuie să rămână util pe măsură ce piețele, afacerile și orașele se schimbă.",
      ru: "Сильный актив должен оставаться востребованным, когда меняются рынки, бизнесы и города.",
      en: "A strong asset must remain useful as markets, businesses and cities change.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Value creation model                                                 */
/* ------------------------------------------------------------------ */

export type CycleStage = { key: string; no: string; title: Localized; text: Localized };

export const valueCycle: CycleStage[] = [
  { key: "identify", no: "01", title: { ro: "Identificăm", ru: "Находим", en: "Identify" }, text: { ro: "Amplasamente, clădiri și situații în care valoarea nu este încă realizată.", ru: "Площадки, здания и ситуации, где стоимость ещё не реализована.", en: "Sites, buildings and situations where value is not yet realised." } },
  { key: "assess", no: "02", title: { ro: "Evaluăm", ru: "Оцениваем", en: "Assess" }, text: { ro: "Locație, utilizare, potențial fizic, logică economică, reziliență și opționalitate.", ru: "Локация, назначение, физический потенциал, экономическая логика, устойчивость и опциональность.", en: "Location, use, physical potential, economic logic, downside resilience and optionality." } },
  { key: "invest", no: "03", title: { ro: "Investim", ru: "Инвестируем", en: "Invest" }, text: { ro: "Capital alocat doar acolo unde există un drum credibil spre valoare.", ru: "Капитал размещается только там, где есть убедительный путь к стоимости.", en: "Capital is committed only where a credible path to value exists." } },
  { key: "develop", no: "04", title: { ro: "Dezvoltăm", ru: "Развиваем", en: "Develop" }, text: { ro: "De la concept și fezabilitate la proiectare și execuție disciplinată.", ru: "От концепции и технико-экономического обоснования к проектированию и дисциплинированной реализации.", en: "From concept and feasibility to design and disciplined delivery." } },
  { key: "operate", no: "05", title: { ro: "Operăm", ru: "Эксплуатируем", en: "Operate" }, text: { ro: "Leasing, experiența utilizatorului și funcționarea clădirii ca decizie de investiție continuă.", ru: "Аренда, опыт арендатора и работа здания как непрерывное инвестиционное решение.", en: "Leasing, occupier experience and building operations as a continuous investment decision." } },
  { key: "optimise", no: "06", title: { ro: "Optimizăm", ru: "Оптимизируем", en: "Optimise" }, text: { ro: "Investiții de capital, repoziționare și adaptare înainte ca utilizarea să se învechească.", ru: "Капитальные улучшения, репозиционирование и адаптация до того, как использование устареет.", en: "Capital improvement, repositioning and adaptation before use becomes outdated." } },
  { key: "reinvest", no: "07", title: { ro: "Reinvestim", ru: "Реинвестируем", en: "Reinvest" }, text: { ro: "Valoarea creată revine în platformă: următorul activ, următorul proiect.", ru: "Созданная стоимость возвращается в платформу: следующий актив, следующий проект.", en: "Value created returns to the platform: the next asset, the next project." } },
];

export const cycleOutcomes: Record<SiteLocale, string[]> = {
  ro: ["Păstrăm", "Repoziționăm", "Valorificăm", "Reinvestim"],
  ru: ["Держим", "Репозиционируем", "Реализуем", "Реинвестируем"],
  en: ["Hold", "Reposition", "Dispose", "Reinvest"],
};

export const valueCycleCopy = {
  kicker: { ro: "Modelul de creare a valorii", ru: "Модель создания стоимости", en: "Value creation model" } satisfies Localized,
  title: { ro: "Un ciclu. Șapte decizii.", ru: "Один цикл. Семь решений.", en: "One cycle. Seven decisions." } satisfies Localized,
  text: {
    ro: "Investiția nu se încheie la achiziție. Fiecare etapă este o decizie de capital, iar fiecare decizie are un rezultat posibil.",
    ru: "Инвестиция не заканчивается покупкой. Каждый этап — решение о капитале, и у каждого решения есть возможный исход.",
    en: "The investment does not end at acquisition. Each stage is a capital decision, and each decision has a possible outcome.",
  } satisfies Localized,
  outcomesLabel: { ro: "Rezultate posibile", ru: "Возможные исходы", en: "Possible outcomes" } satisfies Localized,
};

/* ------------------------------------------------------------------ */
/* MEGAPARC 2030                                                        */
/* ------------------------------------------------------------------ */

export type Pillar = Numbered & { points: Record<SiteLocale, string[]>; idea?: Localized };

export const megaparc2030 = {
  name: "MEGAPARC 2030",
  subtitle: {
    ro: "De la deținerea de proprietăți la o platformă imobiliară instituțională",
    ru: "От владения недвижимостью к институциональной платформе недвижимости",
    en: "From property ownership to an institutional real estate platform",
  } satisfies Localized,
  intro: {
    ro: "O direcție strategică publică, nu un plan financiar public. Șapte piloni descriu cum MEGAPARC intenționează să crească în calitate, nu doar în scară: cu baza în Moldova și cu oportunități de investiții analizate la nivel internațional.",
    ru: "Публичное стратегическое направление, а не публичный финансовый план. Семь опор описывают, как MEGAPARC намерена расти в качестве, а не только в масштабе: с базой в Молдове и инвестиционными возможностями по всему миру.",
    en: "A public strategic direction, not a public financial plan. Seven pillars describe how MEGAPARC intends to grow in quality, not merely in scale: based in Moldova, evaluating investment opportunities worldwide.",
  } satisfies Localized,
  equation: { ro: "MEGAPARC = capital + active + oameni + disciplină", ru: "MEGAPARC = капитал + активы + люди + дисциплина", en: "MEGAPARC = capital + assets + people + discipline" } satisfies Localized,
  pillars: [
    {
      no: "01",
      title: { ro: "Calitatea portofoliului", ru: "Качество портфеля", en: "Portfolio quality" },
      text: { ro: "Active relevante fizic, comercial și urban, care rămân utile pe măsură ce piața se schimbă.", ru: "Активы, актуальные физически, коммерчески и для города, остающиеся востребованными при изменении рынка.", en: "Assets that are physically, commercially and urbanly relevant, and stay useful as the market changes." },
      points: {
        ro: ["Relevanța activului", "Calitate fizică", "Relevanță pentru utilizatori", "Adaptabilitate", "Eficiență operațională", "Reziliență", "Relevanță pe termen lung"],
        ru: ["Актуальность актива", "Физическое качество", "Востребованность у арендаторов", "Адаптивность", "Операционная эффективность", "Устойчивость", "Долгосрочная актуальность"],
        en: ["Asset relevance", "Physical quality", "Occupier relevance", "Adaptability", "Operating efficiency", "Resilience", "Long-term relevance"],
      },
    },
    {
      no: "02",
      title: { ro: "Pipeline de dezvoltare", ru: "Девелоперский пайплайн", en: "Development pipeline" },
      text: { ro: "Etape disciplinate, de la teren la operare sau exit, fără a sări peste decizia de investiție.", ru: "Дисциплинированные этапы — от участка до эксплуатации или выхода, без пропуска инвестиционного решения.", en: "Disciplined stages from land to operation or exit, never skipping the investment decision." },
      points: {
        ro: ["Teren", "Concept", "Fezabilitate", "Decizie de investiție", "Proiectare", "Dezvoltare", "Operare / exit"],
        ru: ["Участок", "Концепция", "Обоснование", "Инвестиционное решение", "Проектирование", "Девелопмент", "Эксплуатация / выход"],
        en: ["Land", "Concept", "Feasibility", "Investment decision", "Design", "Development", "Operation / exit"],
      },
    },
    {
      no: "03",
      title: { ro: "Administrare activă a activelor", ru: "Активное управление активами", en: "Active asset management" },
      text: { ro: "Activul este administrat ca o afacere: poziționare, leasing, experiența utilizatorului, operare, îmbunătățiri de capital.", ru: "Актив управляется как бизнес: позиционирование, аренда, опыт арендатора, эксплуатация, капитальные улучшения.", en: "The asset is run as a business: positioning, leasing, occupier experience, operations, capital improvement." },
      points: {
        ro: ["Poziționare", "Leasing", "Experiența utilizatorului", "Operarea clădirii", "Îmbunătățiri de capital", "Repoziționare", "Adaptabilitate"],
        ru: ["Позиционирование", "Аренда", "Опыт арендатора", "Эксплуатация здания", "Капитальные улучшения", "Репозиционирование", "Адаптивность"],
        en: ["Positioning", "Leasing", "Occupier experience", "Building operations", "Capital improvement", "Repositioning", "Adaptability"],
      },
    },
    {
      no: "04",
      title: { ro: "Disciplina capitalului", ru: "Дисциплина капитала", en: "Capital discipline" },
      idea: { ro: "Fiecare investiție concurează pentru capital.", ru: "Каждая инвестиция конкурирует за капитал.", en: "Every investment competes for capital." },
      text: { ro: "Locația, utilizarea, potențialul fizic, logica economică, reziliența la scădere și flexibilitatea pe termen lung sunt evaluate înainte de orice angajament, indiferent de geografie.", ru: "Локация, назначение, физический потенциал, экономическая логика, устойчивость к спаду и долгосрочная гибкость оцениваются до любого обязательства, независимо от географии.", en: "Location, use, physical potential, economic logic, downside resilience and long-term optionality are assessed before any commitment, whatever the geography." },
      points: {
        ro: ["Locație", "Utilizare", "Potențial fizic", "Logică economică", "Reziliență", "Flexibilitate pe termen lung"],
        ru: ["Локация", "Назначение", "Физический потенциал", "Экономическая логика", "Устойчивость", "Долгосрочная гибкость"],
        en: ["Location", "Use", "Physical potential", "Economic logic", "Downside resilience", "Optionality"],
      },
    },
    {
      no: "05",
      title: { ro: "Valoare urbană", ru: "Городская ценность", en: "Urban value" },
      text: { ro: "Revitalizare, utilizarea mai bună a activelor existente, medii funcționale, accesibilitate și dezvoltare responsabilă.", ru: "Ревитализация, лучшее использование существующих активов, функциональная среда, доступность и ответственное развитие.", en: "Revitalisation, better use of existing assets, functional environments, accessibility and responsible development." },
      points: {
        ro: ["Revitalizare", "Utilizare mai bună a activelor existente", "Medii funcționale", "Accesibilitate", "Dezvoltare responsabilă"],
        ru: ["Ревитализация", "Лучшее использование существующих активов", "Функциональная среда", "Доступность", "Ответственное развитие"],
        en: ["Revitalisation", "Better use of existing assets", "Functional environments", "Accessibility", "Responsible development"],
      },
    },
    {
      no: "06",
      title: { ro: "Instituționalizare", ru: "Институционализация", en: "Institutionalisation" },
      text: { ro: "De la imobiliare antreprenoriale la o platformă structurată: procese repetabile, guvernanță, dezvoltare disciplinată și administrare bazată pe date.", ru: "От предпринимательской недвижимости к структурированной платформе: повторяемые процессы, управление, дисциплинированный девелопмент и управление на основе данных.", en: "From entrepreneurial real estate to a structured platform: repeatable processes, governance, disciplined development and data-informed management." },
      points: {
        ro: ["Procese repetabile", "Guvernanță", "Dezvoltare disciplinată", "Administrare bazată pe date"],
        ru: ["Повторяемые процессы", "Управление", "Дисциплинированный девелопмент", "Управление на основе данных"],
        en: ["Repeatable processes", "Governance", "Disciplined development", "Data-informed management"],
      },
    },
    {
      no: "07",
      title: { ro: "Oameni și brand", ru: "Люди и бренд", en: "People & brand" },
      text: { ro: "Capital, active și disciplină au nevoie de oameni care gândesc ca proprietari. Brandul este promisiunea că această disciplină se menține.", ru: "Капиталу, активам и дисциплине нужны люди, мыслящие как собственники. Бренд — обещание, что эта дисциплина сохраняется.", en: "Capital, assets and discipline need people who think like owners. The brand is the promise that this discipline holds." },
      points: {
        ro: ["Capital", "Active", "Oameni", "Disciplină"],
        ru: ["Капитал", "Активы", "Люди", "Дисциплина"],
        en: ["Capital", "Assets", "People", "Discipline"],
      },
    },
  ] as Pillar[],
};

/* ------------------------------------------------------------------ */
/* Development stages                                                   */
/* ------------------------------------------------------------------ */

export const developmentNarrative = {
  title: { ro: "De la amplasament, la produs, la activ operațional.", ru: "От площадки — к продукту — к операционному активу.", en: "From site, to product, to operating asset." } satisfies Localized,
  stages: [
    { no: "01", title: { ro: "Amplasament", ru: "Площадка", en: "Site" }, text: { ro: "Teren sau clădire cu o logică urbană și de acces verificabilă.", ru: "Участок или здание с проверяемой городской логикой и доступностью.", en: "Land or a building with a verifiable urban and access logic." } },
    { no: "02", title: { ro: "Concept", ru: "Концепция", en: "Concept" }, text: { ro: "Utilizare, scară și economie definite înainte de imagine.", ru: "Назначение, масштаб и экономика определяются раньше картинки.", en: "Use, scale and economics defined before the image." } },
    { no: "03", title: { ro: "Fezabilitate", ru: "Обоснование", en: "Feasibility" }, text: { ro: "Verificări urbanistice, inginerești și comerciale; decizia de investiție.", ru: "Градостроительная, инженерная и коммерческая проверка; инвестиционное решение.", en: "Planning, engineering and commercial due diligence; the investment decision." } },
    { no: "04", title: { ro: "Proiectare", ru: "Проектирование", en: "Design" }, text: { ro: "Arhitectură și inginerie pentru costul de operare și adaptabilitate, nu doar pentru livrare.", ru: "Архитектура и инженерия ради стоимости эксплуатации и адаптивности, а не только сдачи.", en: "Architecture and engineering for operating cost and adaptability, not just handover." } },
    { no: "05", title: { ro: "Dezvoltare", ru: "Девелопмент", en: "Development" }, text: { ro: "Execuție cu control al calității, costului și termenelor.", ru: "Реализация с контролем качества, затрат и сроков.", en: "Delivery with quality, cost and schedule control." } },
    { no: "06", title: { ro: "Operare", ru: "Эксплуатация", en: "Operation" }, text: { ro: "Activul intră în faza de operare sau în următoarea etapă de investiție, conform strategiei de capital: păstrare, repoziționare, valorificare sau reinvestire.", ru: "Актив переходит в фазу эксплуатации или в следующий инвестиционный этап согласно стратегии капитала: удержание, репозиционирование, реализация или реинвестирование.", en: "The asset enters its operating or next investment phase according to the capital strategy: hold, reposition, dispose or reinvest." } },
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
    title: { ro: "Moștenirea grupului", ru: "Наследие группы", en: "Group heritage" },
    text: {
      ro: "Experiență antreprenorială și investițională acumulată din 1995: retail, investiții, producție, servicii financiare și infrastructură.",
      ru: "Предпринимательский и инвестиционный опыт, накопленный с 1995 года: розница, инвестиции, производство, финансовые услуги и инфраструктура.",
      en: "Entrepreneurial and investment experience accumulated since 1995: retail, investment, manufacturing, financial services and infrastructure.",
    },
  },
  {
    year: "2005",
    scope: "megaparc",
    title: { ro: "MEGAPARC este fondată", ru: "Основана MEGAPARC", en: "MEGAPARC established" },
    text: {
      ro: "MEGAPARC este fondată în 2005, cu o strategie orientată spre achiziția și revitalizarea activelor comerciale amplasate strategic.",
      ru: "MEGAPARC основана в 2005 году со стратегией приобретения и ревитализации стратегически расположенных коммерческих активов.",
      en: "MEGAPARC is established in 2005 with a strategy focused on acquiring and revitalising strategically located commercial assets.",
    },
  },
  {
    year: "2020",
    scope: "megaparc",
    title: { ro: "Focus strategic pe imobiliare", ru: "Стратегический фокус на недвижимости", en: "Strategic real estate focus" },
    text: {
      ro: "Strategia se concentrează pe sectorul imobiliar din Republica Moldova: administrarea activelor, dezvoltare și revitalizare urbană.",
      ru: "Стратегия сосредотачивается на недвижимости в Республике Молдова: управление активами, девелопмент и городская ревитализация.",
      en: "The strategy concentrates on real estate in the Republic of Moldova: asset management, development and urban revitalisation.",
    },
  },
  {
    year: "today",
    scope: "megaparc",
    title: { ro: "Investim · Dezvoltăm · Administrăm", ru: "Инвестируем · Развиваем · Управляем", en: "Invest · Develop · Manage" },
    text: {
      ro: "O platformă integrată de investiții imobiliare cu baza în Moldova: active operaționale, proiecte de dezvoltare, oportunități de investiții analizate la nivel internațional și o direcție strategică până în 2030.",
      ru: "Интегрированная платформа инвестиций в недвижимость с базой в Молдове: операционные активы, девелоперские проекты, инвестиционные возможности, рассматриваемые по всему миру, и стратегическое направление до 2030 года.",
      en: "An integrated real-estate investment platform based in Moldova: operating assets, development projects, investment opportunities evaluated worldwide and a strategic direction to 2030.",
    },
  },
];

export const historyCopy = {
  today: { ro: "Astăzi", ru: "Сегодня", en: "Today" } satisfies Localized,
  group: { ro: "Moștenirea grupului", ru: "Наследие группы", en: "Group heritage" } satisfies Localized,
  megaparc: { ro: "MEGAPARC", ru: "MEGAPARC", en: "MEGAPARC" } satisfies Localized,
  supporting: [
    { year: "1996–1997", title: { ro: "Servicii financiare și agro-industrie", ru: "Финансовые услуги и агропромышленность", en: "Financial services and agro-industry" }, text: { ro: "Extindere în servicii financiare și activități agro-industriale.", ru: "Расширение в сферу финансовых услуг и агропромышленной деятельности.", en: "Expansion into financial services and agro-industrial activities." } },
    { year: "2006–2007", title: { ro: "Diversificare", ru: "Диверсификация", en: "Diversification" }, text: { ro: "Diversificare suplimentară și experiență operațională internațională.", ru: "Дальнейшая диверсификация и международный операционный опыт.", en: "Further diversification and international operating experience." } },
    { year: "2017–2019", title: { ro: "Comerț internațional și logistică", ru: "Международная торговля и логистика", en: "International trade and logistics" }, text: { ro: "Operațiuni de comerț internațional și logistică pe mai multe piețe.", ru: "Международные торговые и логистические операции на нескольких рынках.", en: "International trading and logistics operations across several markets." } },
  ] as { year: string; title: Localized; text: Localized }[],
};

/* ------------------------------------------------------------------ */
/* Responsibility                                                       */
/* ------------------------------------------------------------------ */

export const responsibility: Titled = {
  title: { ro: "Responsabilitate", ru: "Ответственность", en: "Responsibility" },
  text: {
    ro: "Responsabilitatea noastră este față de capital, față de utilizatorii activelor și față de orașul în care ele funcționează: utilizare mai bună a clădirilor existente, medii funcționale și dezvoltare care nu împrumută de la viitor.",
    ru: "Наша ответственность — перед капиталом, перед пользователями активов и перед городом, в котором они работают: лучшее использование существующих зданий, функциональная среда и развитие, которое не берёт взаймы у будущего.",
    en: "Our responsibility is to capital, to the people who use our assets and to the city in which they operate: better use of existing buildings, functional environments and development that does not borrow from the future.",
  },
};
