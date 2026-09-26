import type { Localized, SiteLocale } from "@/lib/site-data";

/**
 * Careers / employer brand — data-driven vacancies.
 *
 * `vacancies` is empty because no OWNER-approved role exists. The page
 * renders a premium empty state. Never add a role here that is not real and
 * approved. Candidate personal data must never be sent to analytics; no
 * application form is wired until a privacy-safe backend is approved.
 */

export type Vacancy = {
  slug: string;
  title: Localized;
  area: "leadership" | "investment-finance" | "development" | "asset-management" | "operations";
  location: Localized;
  summary: Localized;
  /** Only `public: true` roles are rendered. */
  public: boolean;
};

export const vacancies: Vacancy[] = [];

export const openVacancies = vacancies.filter((vacancy) => vacancy.public);

export const employerBrand = {
  kicker: { ro: "Cariere", ru: "Карьера", en: "Careers" } satisfies Localized,
  direction: {
    ro: ["Construim active.", "Construim valoare.", "Construiește cu noi."],
    ru: ["Создаём активы.", "Создаём стоимость.", "Создавайте вместе с нами."],
    en: ["Build assets.", "Build value.", "Build with us."],
  } as Record<SiteLocale, string[]>,
  lead: {
    ro: "MEGAPARC este o platformă imobiliară în curs de instituționalizare. Este locul pentru profesioniști care vor să răspundă de active reale, nu doar de sarcini.",
    ru: "MEGAPARC — платформа недвижимости на этапе институционализации. Это место для профессионалов, готовых отвечать за реальные активы, а не только за задачи.",
    en: "MEGAPARC is a real-estate platform in the process of institutionalisation. It is a place for professionals who want to be responsible for real assets, not only for tasks.",
  } satisfies Localized,
  why: {
    kicker: { ro: "De ce MEGAPARC", ru: "Почему MEGAPARC", en: "Why MEGAPARC" } satisfies Localized,
    title: {
      ro: "Decizii reale, active reale, orizont lung.",
      ru: "Реальные решения, реальные активы, длинный горизонт.",
      en: "Real decisions, real assets, a long horizon.",
    } satisfies Localized,
    points: [
      { title: { ro: "Responsabilitate directă", ru: "Прямая ответственность", en: "Direct responsibility" }, text: { ro: "Fiecare rol vede efectul deciziilor sale în activ, nu într-un raport.", ru: "Каждая роль видит эффект своих решений в активе, а не в отчёте.", en: "Every role sees the effect of its decisions in the asset, not in a report." } },
      { title: { ro: "Ciclul complet", ru: "Полный цикл", en: "The full cycle" }, text: { ro: "Investiție, dezvoltare și administrare într-o singură organizație: contextul întreg, nu o felie.", ru: "Инвестиции, девелопмент и управление в одной организации: весь контекст, а не фрагмент.", en: "Investment, development and management in one organisation: the whole context, not a slice." } },
      { title: { ro: "O platformă în construcție", ru: "Платформа в становлении", en: "A platform being built" }, text: { ro: "Procesele, guvernanța și standardele se construiesc acum. Oamenii care vin acum le definesc.", ru: "Процессы, управление и стандарты формируются сейчас. Люди, которые приходят сейчас, их определяют.", en: "Processes, governance and standards are being built now. The people who join now define them." } },
    ] as { title: Localized; text: Localized }[],
  },
  how: {
    kicker: { ro: "Cum lucrăm", ru: "Как мы работаем", en: "How we work" } satisfies Localized,
    themes: [
      { title: { ro: "Gândește ca un proprietar", ru: "Думай как собственник", en: "Think like an owner" }, text: { ro: "Întrebarea nu este „ce trebuie livrat”, ci „ce rămâne valoros peste zece ani”.", ru: "Вопрос не в том, «что нужно сдать», а в том, «что останется ценным через десять лет».", en: "The question is not what must be delivered, but what stays valuable in ten years." } },
      { title: { ro: "Decide cu date", ru: "Решай на основе данных", en: "Make decisions with data" }, text: { ro: "Locație, utilizare, economie și risc, măsurate înainte de a fi argumentate.", ru: "Локация, назначение, экономика и риск измеряются прежде, чем аргументируются.", en: "Location, use, economics and risk, measured before they are argued." } },
      { title: { ro: "Asumă responsabilitatea", ru: "Бери ответственность", en: "Take responsibility" }, text: { ro: "Deciziile au nume. Rezultatele, la fel.", ru: "У решений есть имена. У результатов — тоже.", en: "Decisions have names. So do outcomes." } },
      { title: { ro: "Construiește pe termen lung", ru: "Строй на долгий срок", en: "Build for the long term" }, text: { ro: "Calitatea execuției este costul de operare al următorilor douăzeci de ani.", ru: "Качество реализации — это стоимость эксплуатации следующих двадцати лет.", en: "Build quality is the operating cost of the next twenty years." } },
      { title: { ro: "Lucrează între discipline", ru: "Работай между дисциплинами", en: "Work across disciplines" }, text: { ro: "Finanțe, arhitectură, inginerie, leasing și operare stau la aceeași masă.", ru: "Финансы, архитектура, инженерия, аренда и эксплуатация — за одним столом.", en: "Finance, architecture, engineering, leasing and operations sit at the same table." } },
    ] as { title: Localized; text: Localized }[],
  },
  areas: {
    kicker: { ro: "Arii de expertiză", ru: "Области экспертизы", en: "Areas of expertise" } satisfies Localized,
    title: { ro: "Unde se construiește valoarea", ru: "Где создаётся стоимость", en: "Where value is built" } satisfies Localized,
  },
  positions: {
    kicker: { ro: "Poziții deschise", ru: "Открытые позиции", en: "Open positions" } satisfies Localized,
    emptyTitle: {
      ro: "Nu există poziții deschise publicate în acest moment.",
      ru: "В настоящий момент опубликованных открытых позиций нет.",
      en: "There are no published open positions at this time.",
    } satisfies Localized,
    emptyText: {
      ro: "Candidaturile spontane sunt binevenite. Profilurile relevante pentru investiții, finanțe, dezvoltare, administrarea activelor și operațiuni pot fi transmise prin pagina de contact.",
      ru: "Инициативные обращения приветствуются. Профили, релевантные для инвестиций, финансов, девелопмента, управления активами и операционной деятельности, можно направить через страницу контактов.",
      en: "Speculative applications are welcome. Profiles relevant to investment, finance, development, asset management and operations can be sent through the contact page.",
    } satisfies Localized,
  },
  apply: {
    kicker: { ro: "Candidatură", ru: "Заявка", en: "Application" } satisfies Localized,
    title: { ro: "Construiește cu noi.", ru: "Создавайте вместе с нами.", en: "Build with us." } satisfies Localized,
    text: {
      ro: "Transmiteți un CV și câteva rânduri despre aria în care doriți să lucrați. Datele personale ale candidaților sunt tratate confidențial și nu sunt folosite în scopuri de marketing sau analiză.",
      ru: "Направьте резюме и несколько строк о сфере, в которой хотите работать. Персональные данные кандидатов обрабатываются конфиденциально и не используются в маркетинговых или аналитических целях.",
      en: "Send a CV and a few lines about the area you would like to work in. Candidate personal data is treated confidentially and is never used for marketing or analytics.",
    } satisfies Localized,
    cta: { ro: "Trimite o candidatură", ru: "Отправить заявку", en: "Send an application" } satisfies Localized,
  },
};
