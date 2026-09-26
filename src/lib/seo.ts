import type { Metadata } from "next";
import { getAsset, getProject } from "@/lib/assets";
import { brand, isPreviewBuild, localePath, locales, type Localized, type SiteLocale } from "@/lib/site-data";

/**
 * SEO metadata — plain, search-oriented and factual (editorial source: RU).
 * This module must never import src/lib/public-financial-metrics.ts:
 * temporary review-only figures stay out of titles, descriptions, Open Graph
 * and structured data by construction.
 *
 * Robots: GitHub Pages OWNER preview (GITHUB_PAGES=true) is noindex, nofollow;
 * production megaparc.md is index, follow only after OWNER approval.
 */

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://megaparc.md").replace(/\/$/, "");

export const robotsPolicy: NonNullable<Metadata["robots"]> = isPreviewBuild
  ? { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } }
  : { index: true, follow: true };

const ogLocale: Record<SiteLocale, string> = { ro: "ro_MD", ru: "ru_RU", en: "en_GB" };
const hreflang: Record<SiteLocale, string> = { ro: "ro-MD", ru: "ru", en: "en" };

type PageCopy = { title: Localized; description: Localized };

export const pageSeo = {
  home: {
    title: {
      ro: "MEGAPARC — investiții, dezvoltare și administrare imobiliară",
      ru: "MEGAPARC — инвестиции, девелопмент и управление недвижимостью",
      en: "MEGAPARC — real estate investment, development and asset management",
    },
    description: {
      ro: "MEGAPARC investește în imobiliare, dezvoltă proiecte și administrează obiecte comerciale. Analizează oportunități de investiții pe piețele internaționale.",
      ru: "MEGAPARC инвестирует в недвижимость, развивает проекты и управляет коммерческими активами. Рассматривает инвестиционные возможности на международных рынках.",
      en: "MEGAPARC invests in real estate, develops projects and manages commercial properties. It evaluates investment opportunities across international markets.",
    },
  },
  approach: {
    title: { ro: "Abordarea noastră — cum lucrează MEGAPARC", ru: "Наш подход — как работает MEGAPARC", en: "Our approach — how MEGAPARC works" },
    description: {
      ro: "Cum evaluăm obiectele, ce creează valoare, cum dezvoltăm și administrăm, principiile de investiții și direcția pe termen lung.",
      ru: "Как мы оцениваем объекты, что создаёт стоимость, как развиваем и управляем недвижимостью, принципы инвестирования и долгосрочное направление.",
      en: "How we evaluate properties, what creates value, how we develop and manage, our investment principles and long-term direction.",
    },
  },
  about: {
    title: { ro: "Despre MEGAPARC", ru: "О компании MEGAPARC", en: "About MEGAPARC" },
    description: {
      ro: "MEGAPARC investește în imobiliare, dezvoltă proiecte și administrează obiecte. Fondată în 2005, pe experiența antreprenorială a grupului din 1995.",
      ru: "MEGAPARC инвестирует в недвижимость, развивает проекты и управляет объектами. Основана в 2005 году, опирается на предпринимательский опыт группы с 1995 года.",
      en: "MEGAPARC invests in real estate, develops projects and manages properties. Founded in 2005, building on the group's entrepreneurial experience since 1995.",
    },
  },
  portfolio: {
    title: { ro: "Portofoliul imobiliar MEGAPARC", ru: "Портфель недвижимости MEGAPARC", en: "MEGAPARC real estate portfolio" },
    description: {
      ro: "Obiecte comerciale în funcțiune și proiecte de dezvoltare în Chișinău: Dacia 31, Moscova 9, Moscova 20, Creangă 78, VATRA, Drochia Gateway.",
      ru: "Действующие коммерческие объекты и проекты развития в Кишинёве: Dacia 31, Moscova 9, Moscova 20, Creangă 78, VATRA, Drochia Gateway.",
      en: "Operating commercial properties and development projects in Chișinău: Dacia 31, Moscova 9, Moscova 20, Creangă 78, VATRA, Drochia Gateway.",
    },
  },
  development: {
    title: { ro: "Dezvoltare — proiecte MEGAPARC", ru: "Девелопмент — проекты MEGAPARC", en: "Development — MEGAPARC projects" },
    description: {
      ro: "Proiecte de dezvoltare MEGAPARC, de la teren la punerea în funcțiune: VATRA și Drochia Gateway.",
      ru: "Проекты развития MEGAPARC — от участка до ввода в эксплуатацию: VATRA и Drochia Gateway.",
      en: "MEGAPARC development projects, from site to commissioning: VATRA and Drochia Gateway.",
    },
  },
  opportunities: {
    title: { ro: "Colaborare cu MEGAPARC — închiriere, obiecte, parteneriat", ru: "Сотрудничество с MEGAPARC — аренда, объекты, партнёрство", en: "Working with MEGAPARC — leasing, properties, partnership" },
    description: {
      ro: "Închiriere de spații, propunerea de obiecte și parteneriat cu MEGAPARC.",
      ru: "Аренда, предложение объектов и партнёрство с MEGAPARC.",
      en: "Leasing, property proposals and partnership with MEGAPARC.",
    },
  },
  careers: {
    title: { ro: "Cariere — MEGAPARC", ru: "Карьера — MEGAPARC", en: "Careers — MEGAPARC" },
    description: {
      ro: "Posturi deschise la MEGAPARC în investiții, dezvoltare, administrare imobiliară și exploatare.",
      ru: "Открытые вакансии MEGAPARC в инвестициях, девелопменте, управлении недвижимостью и эксплуатации.",
      en: "Open vacancies at MEGAPARC in investment, development, asset management and operations.",
    },
  },
  contact: {
    title: { ro: "Contact — MEGAPARC", ru: "Контакты — MEGAPARC", en: "Contact — MEGAPARC" },
    description: {
      ro: "Contactați MEGAPARC: închiriere, propunerea unui obiect, parteneriat sau carieră.",
      ru: "Связаться с MEGAPARC: аренда, предложение объекта, партнёрство или карьера.",
      en: "Contact MEGAPARC: leasing, a property proposal, partnership or careers.",
    },
  },
  brandSystem: {
    title: { ro: "Brand System 2.0 — revizuire internă", ru: "Brand System 2.0 — внутренний обзор", en: "Brand System 2.0 — internal review" },
    description: {
      ro: "Pagină internă de revizuire a sistemului de brand MEGAPARC.",
      ru: "Внутренняя страница обзора бренд-системы MEGAPARC.",
      en: "Internal review page for the MEGAPARC brand system.",
    },
  },
} satisfies Record<string, PageCopy>;

export type PageId = keyof typeof pageSeo;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const metaPath = (src: string) => (basePath && src.startsWith(basePath) ? src.slice(basePath.length) : src);
const ogImage = "/assets/portfolio/dacia-31-wide.webp";

export function buildMetadata(locale: SiteLocale, path: string, copy: PageCopy, options?: { noindex?: boolean }): Metadata {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[hreflang[l]] = localePath(l, path);
  languages["x-default"] = localePath("ro", path);
  const title = copy.title[locale];
  const description = copy.description[locale];
  return {
    title: { absolute: title },
    description,
    robots: options?.noindex ? { index: false, follow: false } : robotsPolicy,
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
  return buildMetadata(locale, path, pageSeo[id], { noindex: id === "brandSystem" });
}

export function assetMetadata(locale: SiteLocale, slug: string): Metadata {
  const asset = getAsset(slug);
  if (!asset) return {};
  const title: Localized = {
    ro: `${asset.name} — ${asset.positioning.ro} · MEGAPARC`,
    ru: `${asset.name} — ${asset.positioning.ru} · MEGAPARC`,
    en: `${asset.name} — ${asset.positioning.en} · MEGAPARC`,
  };
  const meta = buildMetadata(locale, `/portfolio/${asset.slug}`, { title, description: asset.lead });
  if (asset.media) {
    meta.openGraph = { ...meta.openGraph, images: [metaPath(asset.media.wide)] };
    meta.twitter = { ...meta.twitter, images: [metaPath(asset.media.wide)] };
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
  if (project.media) {
    meta.openGraph = { ...meta.openGraph, images: [metaPath(project.media.wide)] };
    meta.twitter = { ...meta.twitter, images: [metaPath(project.media.wide)] };
  }
  return meta;
}
