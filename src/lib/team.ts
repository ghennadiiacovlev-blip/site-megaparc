import type { Localized, SiteLocale } from "@/lib/site-data";

/**
 * Organisation / people layer.
 *
 * No real employee names, biographies, portraits or LinkedIn profiles are
 * approved for publication. `teamMembers` therefore stays empty and the
 * organisation is communicated through four areas of capability with
 * branded placeholders. Do not add people here without OWNER approval —
 * see docs/OWNER_DATA_TO_REPLACE.md.
 */

export type TeamArea = "leadership" | "investment-finance" | "development" | "asset-management";

export type TeamMember = {
  name: string;
  role: Localized;
  area: TeamArea;
  bio: Localized;
  image: string | null;
  linkedin: string | null;
  /** Only members with `public: true` are ever rendered. */
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
      ro: "Direcția strategică, alocarea capitalului și responsabilitatea finală pentru calitatea platformei.",
      ru: "Стратегическое направление, распределение капитала и итоговая ответственность за качество платформы.",
      en: "Strategic direction, capital allocation and final responsibility for the quality of the platform.",
    },
    responsibilities: {
      ro: ["Strategie și MEGAPARC 2030", "Decizii de investiție", "Guvernanță și parteneri"],
      ru: ["Стратегия и MEGAPARC 2030", "Инвестиционные решения", "Управление и партнёры"],
      en: ["Strategy and MEGAPARC 2030", "Investment decisions", "Governance and partners"],
    },
  },
  {
    key: "investment-finance",
    no: "02",
    title: { ro: "Investiții și finanțe", ru: "Инвестиции и финансы", en: "Investment & finance" },
    lead: {
      ro: "Evaluarea oportunităților, structurarea capitalului și disciplina financiară pe întreg ciclul.",
      ru: "Оценка возможностей, структурирование капитала и финансовая дисциплина на всём цикле.",
      en: "Opportunity assessment, capital structuring and financial discipline across the cycle.",
    },
    responsibilities: {
      ro: ["Analiză și fezabilitate", "Structurare și finanțare", "Raportare și control"],
      ru: ["Анализ и обоснование", "Структурирование и финансирование", "Отчётность и контроль"],
      en: ["Analysis and feasibility", "Structuring and financing", "Reporting and control"],
    },
  },
  {
    key: "development",
    no: "03",
    title: { ro: "Dezvoltare", ru: "Девелопмент", en: "Development" },
    lead: {
      ro: "De la amplasament la activ operațional: concept, proiectare, autorizare și execuție.",
      ru: "От площадки до операционного актива: концепция, проектирование, разрешения и реализация.",
      en: "From site to operating asset: concept, design, permitting and delivery.",
    },
    responsibilities: {
      ro: ["Concept și program", "Proiectare și autorizare", "Execuție și control al costurilor"],
      ru: ["Концепция и программа", "Проектирование и разрешения", "Реализация и контроль затрат"],
      en: ["Concept and brief", "Design and permitting", "Delivery and cost control"],
    },
  },
  {
    key: "asset-management",
    no: "04",
    title: { ro: "Administrarea activelor", ru: "Управление активами", en: "Asset management" },
    lead: {
      ro: "Poziționare, leasing, operare și investiții de capital pentru active care rămân relevante.",
      ru: "Позиционирование, аренда, эксплуатация и капитальные улучшения для активов, которые остаются актуальными.",
      en: "Positioning, leasing, operations and capital improvement for assets that stay relevant.",
    },
    responsibilities: {
      ro: ["Leasing și relația cu utilizatorii", "Operarea clădirilor", "Repoziționare și îmbunătățiri"],
      ru: ["Аренда и отношения с арендаторами", "Эксплуатация зданий", "Репозиционирование и улучшения"],
      en: ["Leasing and occupier relationships", "Building operations", "Repositioning and improvement"],
    },
  },
];

export const peopleCopy = {
  kicker: { ro: "Organizație", ru: "Организация", en: "Organisation" } satisfies Localized,
  title: { ro: "Oamenii din spatele activelor", ru: "Люди, которые управляют активами", en: "The people behind the assets" } satisfies Localized,
  text: {
    ro: "O platformă imobiliară este capital, active și disciplină, dar mai ales oamenii care iau deciziile. Organizația MEGAPARC este construită pe patru arii de competență, fiecare cu responsabilitate directă pentru calitatea activului.",
    ru: "Платформа недвижимости — это капитал, активы и дисциплина, но прежде всего люди, принимающие решения. Организация MEGAPARC построена на четырёх областях компетенции, каждая из которых несёт прямую ответственность за качество актива.",
    en: "A real-estate platform is capital, assets and discipline, but above all the people who make the decisions. The MEGAPARC organisation is built on four areas of expertise, each with direct responsibility for asset quality.",
  } satisfies Localized,
  responsibilities: { ro: "Responsabilități", ru: "Ответственность", en: "Responsibilities" } satisfies Localized,
  /** Rendered only when publicTeam is empty. */
  placeholderNote: {
    ro: "Profilurile publice ale echipei vor fi publicate odată cu aprobarea lor.",
    ru: "Публичные профили команды будут опубликованы после их утверждения.",
    en: "Public team profiles will be published once approved.",
  } satisfies Localized,
};
