import { assetProfiles, creangaProfile, drochiaProfile, tenantFit, vatraProfile, type DataPoint } from "@/data/demo-content";
import { spaces, type AvailableSpace, type SpaceField, type SpaceProject } from "@/data/leasing-inventory";
import { developmentProjects, portfolioAssets, type AssetMedia, type DevelopmentProject, type PortfolioAsset } from "@/lib/assets";
import { openVacancies, type Vacancy } from "@/lib/careers";
import type { Localized, SiteLocale } from "@/lib/site-data";

/**
 * CONTENT SOURCE — the one read API every page uses for CMS-managed content
 * (OWNER correction 2026-10-08, "CMS / WORDPRESS REQUIREMENT").
 *
 * Today the records live in the repository (src/data/leasing-inventory.ts,
 * src/lib/assets.ts, src/lib/careers.ts). In production they come from
 * WordPress (headless) through the same three collections:
 *   PROJECT          → listProjects() / getProject()
 *   AVAILABLE SPACE  → publicSpaces / spacesFor() / getSpace()
 *   VACANCY          → listVacancies()
 * Pages never read the raw data files directly, so replacing this module's
 * internals with WordPress REST / GraphQL calls changes no page.
 * docs/CMS_ARCHITECTURE.md maps every field to its WordPress field.
 *
 * Publication rules enforced here, not in the pages:
 *  - an Available space with status "leased" is never published;
 *  - a Vacancy is published only while its status is "open";
 *  - "for sale" appears only on projects whose forSale flag is set.
 */

/* ------------------------------------------------------------------ */
/* Formatting (server side — client components receive strings)        */
/* ------------------------------------------------------------------ */

const intl: Record<SiteLocale, string> = { ro: "ro-RO", ru: "ru-RU", en: "en-GB" };

export function formatArea(m2: number, locale: SiteLocale) {
  const n = m2.toLocaleString(intl[locale], { maximumFractionDigits: 2 }).replace(/\s/g, " ");
  return `${n} ${locale === "ru" ? "м²" : "m²"}`;
}

export function formatAreaRange(min: number | undefined, max: number, locale: SiteLocale) {
  if (!min || min === max) return formatArea(max, locale);
  const a = min.toLocaleString(intl[locale], { maximumFractionDigits: 2 }).replace(/\s/g, " ");
  return `${a}–${formatArea(max, locale)}`;
}

export function formatDate(iso: string, locale: SiteLocale) {
  return new Intl.DateTimeFormat(intl[locale], { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${iso}T12:00:00Z`)).replace(/\s?г\.$/, "");
}

/** Build date (static export) — availability is evaluated against it. */
export const today = new Date().toISOString().slice(0, 10);

/* ------------------------------------------------------------------ */
/* AVAILABLE SPACE                                                      */
/* ------------------------------------------------------------------ */

/** Everything a tenant may see: available and reserved. Leased records are never published. */
export const publicSpaces: AvailableSpace[] = spaces.filter((space) => space.status !== "leased");

/** Every record, including leased ones — only the internal CMS workflow prototype reads this. */
export const allSpacesForCmsPrototype: AvailableSpace[] = spaces;

export function getSpace(id: string) {
  return publicSpaces.find((space) => space.id === id);
}

export function spacesFor(project: string) {
  return publicSpaces.filter((space) => space.project === project);
}

export type Availability = { key: "now" | "soon" | "reserved"; date: string | null };

export function availabilityOf(space: AvailableSpace): Availability {
  if (space.status === "reserved") return { key: "reserved", date: null };
  if (!space.availableFrom || space.availableFrom <= today) return { key: "now", date: null };
  return { key: "soon", date: space.availableFrom };
}

/** Public order: available now, then soon (by date), then reserved; within a group records built on confirmed facts lead, then by area. */
export function sortSpaces(list: AvailableSpace[]) {
  const rank = (space: AvailableSpace) => ({ now: 0, soon: 1, reserved: 2 })[availabilityOf(space).key];
  const demo = (space: AvailableSpace) => (space.dataStatus === "DEMO" ? 1 : 0);
  return [...list].sort((a, b) => rank(a) - rank(b) || demo(a) - demo(b) || (a.availableFrom ?? "").localeCompare(b.availableFrom ?? "") || a.area - b.area);
}

/** "7 spaces" in each language (RU needs three forms). */
export function spacesCount(n: number, locale: SiteLocale) {
  if (locale === "ru") {
    const m10 = n % 10;
    const m100 = n % 100;
    const form = m10 === 1 && m100 !== 11 ? "помещение" : m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20) ? "помещения" : "помещений";
    return `${n} ${form}`;
  }
  if (locale === "ro") return n === 1 ? "1 spațiu" : `${n} spații`;
  return n === 1 ? "1 space" : `${n} spaces`;
}

/** True when the field is not a confirmed fact (the page shows the DEMO ring). */
export function isDemoField(space: AvailableSpace, field: SpaceField) {
  return space.dataStatus !== "CONFIRMED" && !space.confirmed.includes(field);
}

export const availabilityCopy = {
  now: { ro: "Liber acum", ru: "Свободно сейчас", en: "Available now" } satisfies Localized,
  soon: { ro: "Liber din", ru: "Свободно с", en: "Available from" } satisfies Localized,
  reserved: { ro: "Rezervat", ru: "Забронировано", en: "Reserved" } satisfies Localized,
  leased: { ro: "Închiriat", ru: "Сдано", en: "Leased" } satisfies Localized,
};

export function availabilityLabel(space: AvailableSpace, locale: SiteLocale) {
  const a = availabilityOf(space);
  if (a.key === "soon" && a.date) return `${availabilityCopy.soon[locale]} ${formatDate(a.date, locale)}`;
  return availabilityCopy[a.key][locale];
}

/* ------------------------------------------------------------------ */
/* PROJECT                                                              */
/* ------------------------------------------------------------------ */

export type ProjectKind = "operating" | "development" | "land";

export type ProjectEntry = {
  slug: string;
  name: string;
  kind: ProjectKind;
  template: "income" | "development";
  /** CMS flag "for sale" — false for every project today (not every asset is for sale). */
  forSale: boolean;
  district: Localized;
  city: Localized;
  /** Format / type line. */
  format: Localized;
  formatDemo: boolean;
  /** The reason to care, one line. */
  line: Localized;
  media: AssetMedia | null;
  /** Registered concept placement when no approved photograph exists. */
  conceptUse?: string;
  /** Two facts for cards. */
  facts: { label: Localized; point: DataPoint }[];
  /** Card facts line (final craft pass): place · size · status — read without opening the page. */
  card: { place: Localized; size: Localized; sizeDemo: boolean; status: Localized };
  asset?: PortfolioAsset;
  development?: DevelopmentProject;
};

const label = {
  area: { ro: "Suprafață", ru: "Площадь", en: "Area" } satisfies Localized,
  site: { ro: "Teren", ru: "Участок", en: "Site" } satisfies Localized,
  stage: { ro: "Etapă", ru: "Стадия", en: "Stage" } satisfies Localized,
  status: { ro: "Status", ru: "Статус", en: "Status" } satisfies Localized,
};

const cardStatus = {
  operating: { ro: "Clădire în funcțiune", ru: "Действующий объект", en: "Operating property" },
  development: { ro: "Etapa: realizare", ru: "Стадия: реализация", en: "Stage: delivery" },
  land: { ro: "Teren · concept", ru: "Земля · концепция", en: "Land · concept" },
} satisfies Record<string, Localized>;

const asset = (slug: SpaceProject) => portfolioAssets.find((a) => a.slug === slug)!;
const dev = (slug: string) => developmentProjects.find((p) => p.slug === slug)!;

const operatingEntry = (slug: SpaceProject): ProjectEntry => {
  const a = asset(slug);
  const profile = assetProfiles[slug];
  const isCreanga = !a.media;
  return {
    slug,
    name: a.name,
    kind: "operating",
    template: "income",
    forSale: false,
    district: isCreanga ? creangaProfile.district.value : a.district,
    city: a.city,
    format: profile.format.value,
    formatDemo: profile.format.status === "DEMO",
    line: tenantFit[slug].reason,
    media: a.media,
    conceptUse: isCreanga ? "portfolio.creanga-78" : undefined,
    facts: [{ label: label.area, point: profile.area }],
    card: { place: a.city, size: profile.area.value, sizeDemo: profile.area.status === "DEMO", status: cardStatus.operating },
    asset: a,
  };
};

export const projects: ProjectEntry[] = [
  operatingEntry("moscova-9"),
  operatingEntry("dacia-31"),
  operatingEntry("moscova-20"),
  operatingEntry("creanga-78"),
  {
    slug: "vatra",
    name: "VATRA",
    kind: "development",
    template: "development",
    forSale: false,
    district: dev("vatra").place,
    city: dev("vatra").place,
    format: dev("vatra").status,
    formatDemo: false,
    line: { ro: "Un proiect propriu în realizare — de la teren la clădirea care lucrează.", ru: "Собственный проект: от участка до работающего здания.", en: "An own project in delivery — from site to a working building." },
    media: dev("vatra").media,
    facts: [{ label: label.stage, point: vatraProfile.stage }, { label: label.site, point: vatraProfile.site }],
    card: { place: { ro: "Moldova", ru: "Молдова", en: "Moldova" }, size: vatraProfile.site.value, sizeDemo: vatraProfile.site.status === "DEMO", status: cardStatus.development },
    development: dev("vatra"),
  },
  {
    slug: "drochia-gateway",
    name: "Drochia Gateway",
    kind: "land",
    template: "development",
    forSale: false,
    district: dev("drochia-gateway").place,
    city: dev("drochia-gateway").place,
    format: dev("drochia-gateway").kind,
    formatDemo: false,
    line: { ro: "2,0 ha la intrarea în Drochia — teren propriu, concept în evaluare.", ru: "2,0 га на въезде в Дрокию — наша земля; концепцию сейчас оцениваем.", en: "2.0 ha at the entrance to Drochia — our own land, concept under evaluation." },
    media: null,
    conceptUse: "development.drochia",
    facts: [{ label: label.site, point: drochiaProfile.site }, { label: label.status, point: drochiaProfile.status }],
    card: { place: dev("drochia-gateway").place, size: { ro: "2,0 ha", ru: "2,0 га", en: "2.0 ha" }, sizeDemo: drochiaProfile.site.status === "DEMO", status: cardStatus.land },
    development: dev("drochia-gateway"),
  },
];

export function listProjects() {
  return projects;
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function nextProject(slug: string) {
  const i = projects.findIndex((project) => project.slug === slug);
  return projects[(i + 1) % projects.length];
}

/** Filter tags: kind + "leasing" while a public space exists + "sale" when flagged. */
export function projectTags(project: ProjectEntry) {
  return [project.kind, spacesFor(project.slug).length ? "leasing" : null, project.forSale ? "sale" : null].filter(Boolean) as string[];
}

/* ------------------------------------------------------------------ */
/* VACANCY                                                              */
/* ------------------------------------------------------------------ */

export function listVacancies(): Vacancy[] {
  return openVacancies;
}
