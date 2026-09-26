import type { Localized } from "@/lib/site-data";

/**
 * CAPITAL AT WORK — OWNER approval-preview figures.
 *
 * OWNER override (2026-09-26): these four figures are authorised ONLY for the
 * founder / owner approval preview on GitHub Pages. They are temporary,
 * review-only values, tracked in docs/OWNER_DATA_TO_REPLACE.md.
 *
 * Rules enforced in code:
 * - every entry carries `temporary: true`;
 * - never hardcoded in JSX — always rendered from this module;
 * - never referenced from src/lib/seo.ts, JSON-LD, Open Graph or any
 *   structured data (see `financialMetricsPolicy`);
 * - the GitHub preview is served `noindex, nofollow` (src/lib/seo.ts).
 *
 * They must not reach production megaparc.md until replaced or approved.
 */

export type PublicFinancialMetric = {
  key: "portfolio-value" | "capital-invested" | "development-pipeline" | "contracted-rent";
  /** Numeric value in EUR. */
  value: number;
  currency: "EUR";
  /** Display string, e.g. "€25M+". Kept identical across locales as a brand device. */
  display: string;
  label: Localized;
  note: Localized;
  temporary: true;
};

export const publicFinancialMetrics: PublicFinancialMetric[] = [
  {
    key: "portfolio-value",
    value: 25_000_000,
    currency: "EUR",
    display: "€25M+",
    label: { ro: "Valoarea portofoliului", ru: "Стоимость портфеля", en: "Portfolio value" },
    note: { ro: "Active operaționale și în dezvoltare", ru: "Операционные и девелоперские активы", en: "Operating and development assets" },
    temporary: true,
  },
  {
    key: "capital-invested",
    value: 18_000_000,
    currency: "EUR",
    display: "€18M+",
    label: { ro: "Capital investit", ru: "Инвестированный капитал", en: "Capital invested" },
    note: { ro: "Achiziții, dezvoltare și îmbunătățiri de capital", ru: "Приобретения, девелопмент и капитальные улучшения", en: "Acquisitions, development and capital improvement" },
    temporary: true,
  },
  {
    key: "development-pipeline",
    value: 12_000_000,
    currency: "EUR",
    display: "€12M+",
    label: { ro: "Pipeline de dezvoltare", ru: "Девелоперский пайплайн", en: "Development pipeline" },
    note: { ro: "Proiecte și concepte în evaluare", ru: "Проекты и концепции в оценке", en: "Projects and concepts under evaluation" },
    temporary: true,
  },
  {
    key: "contracted-rent",
    value: 2_400_000,
    currency: "EUR",
    display: "€2.4M+",
    label: { ro: "Chirie anuală contractată", ru: "Годовая контрактная аренда", en: "Annual contracted rent" },
    note: { ro: "Venit contractat din activele operaționale", ru: "Контрактный доход операционных активов", en: "Contracted income from operating assets" },
    temporary: true,
  },
];

/** Policy flags checked by the QA scripts; not rendered. */
export const financialMetricsPolicy = {
  reviewOnly: true,
  authorisedBy: "OWNER override 2026-09-26",
  excludedFrom: ["seo", "json-ld", "open-graph", "structured-data", "production"],
  register: "docs/OWNER_DATA_TO_REPLACE.md",
} as const;

/** True when at least one figure is still temporary — the site is not production-ready. */
export const hasTemporaryFinancialMetrics = publicFinancialMetrics.some((metric) => metric.temporary);

export const capitalCopy = {
  kicker: { ro: "Capital la lucru", ru: "Капитал в работе", en: "Capital at work" } satisfies Localized,
  title: {
    ro: "Capitalul se măsoară în active care lucrează.",
    ru: "Капитал измеряется активами, которые работают.",
    en: "Capital is measured in assets that work.",
  } satisfies Localized,
  text: {
    ro: "Valoarea portofoliului, capitalul investit, pipeline-ul de dezvoltare și chiria contractată descriu scara platformei. Cifrele sunt prezentate rotunjit.",
    ru: "Стоимость портфеля, инвестированный капитал, девелоперский пайплайн и контрактная аренда описывают масштаб платформы. Цифры представлены округлённо.",
    en: "Portfolio value, capital invested, development pipeline and contracted rent describe the scale of the platform. Figures are presented rounded.",
  } satisfies Localized,
};
