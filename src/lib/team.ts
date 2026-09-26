import type { Localized, SiteLocale } from "@/lib/site-data";

/**
 * Team and competencies. No public team profiles are approved, so
 * `teamMembers` stays empty and the organisation is shown as functions only.
 * Do not add people without OWNER approval (docs/OWNER_DATA_TO_REPLACE.md).
 */

export type TeamArea = "leadership" | "investment-finance" | "development" | "asset-management";

export type TeamMember = {
  name: string;
  role: Localized;
  area: TeamArea;
  bio: Localized;
  image: string | null;
  linkedin: string | null;
  public: boolean;
  order: number;
};

export const teamMembers: TeamMember[] = [];

export const publicTeam = teamMembers.filter((member) => member.public).sort((a, b) => a.order - b.order);

export type OrganisationArea = {
  key: TeamArea;
  no: string;
  title: Localized;
  lead: Localized;
  responsibilities: Record<SiteLocale, string[]>;
};

export const organisationAreas: OrganisationArea[] = [
  {
    key: "leadership",
    no: "01",
    title: { ro: "Conducere", ru: "Руководство", en: "Leadership" },
    lead: {
      ro: "Strategia companiei, deciziile de investiții și responsabilitatea pentru rezultat.",
      ru: "Стратегия компании, инвестиционные решения и ответственность за результат.",
      en: "Company strategy, investment decisions and accountability for results.",
    },
    responsibilities: {
      ro: ["Strategie și priorități", "Decizii de investiții", "Parteneri și finanțare"],
      ru: ["Стратегия и приоритеты", "Инвестиционные решения", "Партнёры и финансирование"],
      en: ["Strategy and priorities", "Investment decisions", "Partners and financing"],
    },
  },
  {
    key: "investment-finance",
    no: "02",
    title: { ro: "Investiții și finanțe", ru: "Инвестиции и финансы", en: "Investment and finance" },
    lead: {
      ro: "Evaluarea obiectelor, finanțarea tranzacțiilor și controlul financiar.",
      ru: "Оценка объектов, финансирование сделок и финансовый контроль.",
      en: "Property appraisal, deal financing and financial control.",
    },
    responsibilities: {
      ro: ["Evaluare și economia proiectelor", "Finanțare", "Raportare și control"],
      ru: ["Оценка и экономика проектов", "Финансирование", "Отчётность и контроль"],
      en: ["Appraisal and project economics", "Financing", "Reporting and control"],
    },
  },
  {
    key: "development",
    no: "03",
    title: { ro: "Dezvoltare", ru: "Девелопмент", en: "Development" },
    lead: {
      ro: "Proiecte de la concept și proiectare până la construcție și punere în funcțiune.",
      ru: "Проекты от концепции и проектирования до строительства и ввода в эксплуатацию.",
      en: "Projects from concept and design to construction and commissioning.",
    },
    responsibilities: {
      ro: ["Concept și proiectare", "Autorizații", "Construcție și controlul costurilor"],
      ru: ["Концепция и проектирование", "Разрешения", "Строительство и контроль затрат"],
      en: ["Concept and design", "Permits", "Construction and cost control"],
    },
  },
  {
    key: "asset-management",
    no: "04",
    title: { ro: "Administrare și exploatare", ru: "Управление активами и эксплуатация", en: "Asset management and operations" },
    lead: {
      ro: "Închirierea, întreținerea și modernizarea obiectelor în funcțiune.",
      ru: "Аренда, обслуживание и обновление действующих объектов.",
      en: "Leasing, maintenance and renewal of operating properties.",
    },
    responsibilities: {
      ro: ["Închiriere și relația cu chiriașii", "Exploatare tehnică", "Modernizarea obiectelor"],
      ru: ["Аренда и работа с арендаторами", "Техническая эксплуатация", "Обновление объектов"],
      en: ["Leasing and tenant relations", "Technical operations", "Property renewal"],
    },
  },
];

export const peopleCopy = {
  kicker: { ro: "Echipă", ru: "Команда", en: "Team" } satisfies Localized,
  title: { ro: "Echipă și competențe", ru: "Команда и компетенции", en: "Team and competencies" } satisfies Localized,
  text: {
    ro: "Lucrul cu imobiliarele cere colaborarea dintre investiții, finanțe, dezvoltare, administrarea activelor și exploatarea tehnică.",
    ru: "Работа с недвижимостью требует совместной работы инвестиций, финансов, девелопмента, управления активами и технической эксплуатации.",
    en: "Working with real estate takes investment, finance, development, asset management and technical operations working together.",
  } satisfies Localized,
  responsibilities: { ro: "Responsabilități", ru: "Задачи", en: "Responsibilities" } satisfies Localized,
  placeholderNote: {
    ro: "Profilurile publice ale echipei vor fi adăugate după aprobare.",
    ru: "Публичные профили команды будут добавлены после утверждения.",
    en: "Public team profiles will be added once approved.",
  } satisfies Localized,
};
