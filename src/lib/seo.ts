import type { Metadata } from "next";
import { getAsset, getProject } from "@/lib/assets";
import { brand, localePath, locales, type Localized, type SiteLocale } from "@/lib/site-data";

/**
 * Environment-aware site origin.
 * Production: https://megaparc.md. GitHub Pages preview: NEXT_PUBLIC_SITE_URL.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://megaparc.md").replace(/\/$/, "");

const ogLocale: Record<SiteLocale, string> = { ro: "ro_MD", ru: "ru_RU", en: "en_GB" };
const hreflang: Record<SiteLocale, string> = { ro: "ro-MD", ru: "ru", en: "en" };

type PageCopy = { title: Localized; description: Localized };

export const pageSeo = {
  home: {
    title: {
      ro: "MEGAPARC — Investiții imobiliare, dezvoltare și administrarea activelor",
      ru: "MEGAPARC — Инвестиции в недвижимость, девелопмент и управление активами",
      en: "MEGAPARC — Real Estate Investment, Development & Asset Management",
    },
    description: {
      ro: "MEGAPARC dezvoltă, deține și administrează active imobiliare în Republica Moldova cu o perspectivă investițională pe termen lung.",
      ru: "MEGAPARC развивает, владеет и управляет объектами недвижимости в Республике Молдова с долгосрочным инвестиционным подходом.",
      en: "MEGAPARC develops, owns and manages real estate assets in the Republic of Moldova with a long-term investment perspective.",
    },
  },
  about: {
    title: { ro: "Despre MEGAPARC — Platformă de investiții imobiliare", ru: "О компании MEGAPARC — Инвестиционная платформа", en: "About MEGAPARC — Investment Platform" },
    description: {
      ro: "Imobiliare administrate ca capital: investiție, dezvoltare, administrare și parcursul MEGAPARC din 2005.",
      ru: "Недвижимость, управляемая как капитал: инвестиции, девелопмент, управление активами и история MEGAPARC с 2005 года.",
      en: "Real estate managed as capital: investment, development, asset management and the MEGAPARC story since 2005.",
    },
  },
  portfolio: {
    title: { ro: "Portofoliu — Active MEGAPARC", ru: "Портфель — Активы MEGAPARC", en: "Portfolio — MEGAPARC Assets" },
    description: {
      ro: "Active deținute sau administrate de MEGAPARC în Chișinău: Dacia 31, Moscova 9, Moscova 20, Creangă 78 și proiecte în dezvoltare.",
      ru: "Активы во владении или управлении MEGAPARC в Кишинёве: Dacia 31, Moscova 9, Moscova 20, Creangă 78 и проекты в стадии девелопмента.",
      en: "Assets owned or managed by MEGAPARC in Chișinău: Dacia 31, Moscova 9, Moscova 20, Creangă 78 and development projects.",
    },
  },
  development: {
    title: { ro: "Dezvoltare — Proiecte MEGAPARC", ru: "Девелопмент — Проекты MEGAPARC", en: "Development — MEGAPARC Projects" },
    description: {
      ro: "Proiecte de dezvoltare și concepte de investiție MEGAPARC: VATRA și Drochia Gateway.",
      ru: "Девелоперские проекты и инвестиционные концепции MEGAPARC: VATRA и Drochia Gateway.",
      en: "MEGAPARC development projects and investment concepts: VATRA and Drochia Gateway.",
    },
  },
  opportunities: {
    title: { ro: "Disponibilități comerciale — MEGAPARC", ru: "Коммерческие предложения — MEGAPARC", en: "Commercial Opportunities — MEGAPARC" },
    description: {
      ro: "Spații comerciale și de birouri disponibile în portofoliul MEGAPARC din Chișinău.",
      ru: "Торговые и офисные помещения, доступные в портфеле MEGAPARC в Кишинёве.",
      en: "Retail and office space currently available in the MEGAPARC Chișinău portfolio.",
    },
  },
  careers: {
    title: { ro: "Cariere — MEGAPARC", ru: "Карьера — MEGAPARC", en: "Careers — MEGAPARC" },
    description: {
      ro: "Construit de oameni care gândesc ca proprietari.",
      ru: "Команда, которая мыслит как собственник.",
      en: "Built by people who think like owners.",
    },
  },
  contact: {
    title: { ro: "Contact — MEGAPARC", ru: "Контакты — MEGAPARC", en: "Contact — MEGAPARC" },
    description: {
      ro: "Caut un spațiu, propun o proprietate sau discuție corporate cu MEGAPARC.",
      ru: "Поиск помещения, предложение объекта или корпоративный запрос в MEGAPARC.",
      en: "Find a space, submit a property or start a corporate conversation with MEGAPARC.",
    },
  },
} satisfies Record<string, PageCopy>;

export type PageId = keyof typeof pageSeo;

/** Metadata URLs resolve against metadataBase (siteUrl), which already includes any Pages base path. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const metaPath = (src: string) => (basePath && src.startsWith(basePath) ? src.slice(basePath.length) : src);
const ogImage = "/assets/portfolio/dacia-31.webp";

/** Builds locale-aware metadata with canonical + hreflang alternates for a locale-neutral path. */
export function buildMetadata(locale: SiteLocale, path: string, copy: PageCopy): Metadata {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[hreflang[l]] = localePath(l, path);
  languages["x-default"] = localePath("ro", path);
  const title = copy.title[locale];
  const description = copy.description[locale];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: localePath(locale, path), languages },
    openGraph: {
      title,
      description,
      type: "website",
      locale: ogLocale[locale],
      siteName: brand.name,
      url: localePath(locale, path),
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export function pageMetadata(locale: SiteLocale, id: PageId, path: string) {
  return buildMetadata(locale, path, pageSeo[id]);
}

export function assetMetadata(locale: SiteLocale, slug: string): Metadata {
  const asset = getAsset(slug);
  if (!asset) return {};
  const title: Localized = {
    ro: `${asset.name} — ${asset.positioning.ro} · MEGAPARC`,
    ru: `${asset.name} — ${asset.positioning.ru} · MEGAPARC`,
    en: `${asset.name} — ${asset.positioning.en} · MEGAPARC`,
  };
  const meta = buildMetadata(locale, `/portfolio/${asset.slug}`, { title, description: asset.intro });
  if (asset.image) {
    meta.openGraph = { ...meta.openGraph, images: [metaPath(asset.image)] };
    meta.twitter = { ...meta.twitter, images: [metaPath(asset.image)] };
  }
  return meta;
}

export function projectMetadata(locale: SiteLocale, slug: string): Metadata {
  const project = getProject(slug);
  if (!project) return {};
  const title: Localized = {
    ro: `${project.name} — ${project.status.ro} · MEGAPARC`,
    ru: `${project.name} — ${project.status.ru} · MEGAPARC`,
    en: `${project.name} — ${project.status.en} · MEGAPARC`,
  };
  const meta = buildMetadata(locale, `/development/${project.slug}`, { title, description: project.lead });
  if (project.image) {
    meta.openGraph = { ...meta.openGraph, images: [metaPath(project.image)] };
    meta.twitter = { ...meta.twitter, images: [metaPath(project.image)] };
  }
  return meta;
}
