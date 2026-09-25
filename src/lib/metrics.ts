import { developmentProjects, portfolioAssets } from "@/lib/assets";
import type { Localized } from "@/lib/site-data";

/**
 * Institutional scale metrics — single data source for the homepage
 * "MEGAPARC at scale" section. Methodology: docs/PORTFOLIO_SCALE_METRICS.md.
 *
 * A metric set to `null` is not rendered. Never hardcode these values in JSX.
 */
export const portfolioMetrics = {
  /**
   * Total real-estate portfolio area (m²). Hidden: Creangă 78 and VATRA have no
   * confirmed area, so a complete, like-for-like total cannot be stated yet.
   * Confirmed partial sum (Dacia 31 + Moscova 9 + Moscova 20) is 7,138.63 m².
   */
  totalAssetArea: null as number | null,
  /**
   * Development land (m²). Confirmed: Drochia Gateway site, 2.0 ha.
   * Published as a minimum ("+") because VATRA land area is not confirmed.
   */
  developmentLandArea: 20000 as number | null,
  developmentLandIsMinimum: true,
  operatingAssets: portfolioAssets.length,
  developmentProjects: developmentProjects.length,
  heritageSince: 1995,
};

export type ScaleMetric = {
  key: string;
  value: number;
  /** Two-digit padding for small counts (04, 02). */
  pad?: number;
  plus?: boolean;
  unit?: Localized;
  secondary?: Localized;
  label: Localized;
};

const m2: Localized = { ro: "m²", ru: "м²", en: "m²" };

/** Only non-null metrics are returned, in display order. */
export function scaleMetrics(): ScaleMetric[] {
  const list: (ScaleMetric | null)[] = [
    portfolioMetrics.totalAssetArea === null
      ? null
      : {
          key: "total",
          value: portfolioMetrics.totalAssetArea,
          plus: true,
          unit: m2,
          label: { ro: "Portofoliu imobiliar total", ru: "Общий портфель недвижимости", en: "Total real estate portfolio" },
        },
    portfolioMetrics.developmentLandArea === null
      ? null
      : {
          key: "land",
          value: portfolioMetrics.developmentLandArea,
          plus: portfolioMetrics.developmentLandIsMinimum,
          unit: m2,
          secondary: {
            ro: `${(portfolioMetrics.developmentLandArea / 10000).toFixed(1).replace(".", ",")} ha`,
            ru: `${(portfolioMetrics.developmentLandArea / 10000).toFixed(1).replace(".", ",")} га`,
            en: `${(portfolioMetrics.developmentLandArea / 10000).toFixed(1)} ha`,
          },
          label: { ro: "Teren pentru dezvoltare", ru: "Земля под девелопмент", en: "Development land" },
        },
    {
      key: "operating",
      value: portfolioMetrics.operatingAssets,
      pad: 2,
      label: { ro: "Active operaționale", ru: "Операционные активы", en: "Operating assets" },
    },
    {
      key: "projects",
      value: portfolioMetrics.developmentProjects,
      pad: 2,
      label: { ro: "Proiecte de dezvoltare", ru: "Девелоперские проекты", en: "Development projects" },
    },
  ];
  return list.filter((item): item is ScaleMetric => item !== null);
}
