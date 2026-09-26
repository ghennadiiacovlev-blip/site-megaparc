import type { Metadata } from "next";
import { getAsset, getProject } from "@/lib/assets";
import { brand, isPreviewBuild, localePath, locales, type Localized, type SiteLocale } from "@/lib/site-data";

/**
 * SEO metadata. This module must never import src/lib/public-financial-metrics.ts:
 * temporary review-only financial figures are excluded from titles,
 * descriptions, Open Graph and any structured data by construction.
 *
 * Robots policy:
 * - GitHub Pages OWNER approval preview (GITHUB_PAGES=true): noindex, nofollow.
 * - Production megaparc.md: index, follow — only after real data replacement
 *   and OWNER approval (docs/OWNER_DATA_TO_REPLACE.md).
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
      ro: "MEGAPARC — Investiții imobiliare, dezvoltare și administrarea activelor",
      ru: "MEGAPARC — Инвестиции в недвижимость, девелопмент и управление активами",
      en: "MEGAPARC — Real Estate Investment, Development & Asset Management",
    },
    description: {
      ro: "Imobiliare administrate ca capital. Platformă integrată de investiții imobiliare cu baza în Moldova și un mandat de investiții global: investim, dezvoltăm, administrăm.",
      ru: "Недвижимость, управляемая как капитал. Интегрированная платформа инвестиций в недвижимость с базой в Молдове и глобальным инвестиционным мандатом: инвестируем, развиваем, управляем.",
      en: "Real estate managed as capital. An integrated real-estate investment platform based in Moldova with a global investment mandate: invest, develop, manage.",
    },
  },
  approach: {
    title: { ro: "Abordarea noastră — Cum gândește MEGAPARC", ru: "Наш подход — Как мыслит MEGAPARC", en: "Our Approach — How MEGAPARC Thinks" },
    description: {
      ro: "Filosofie de investiții, mandat global, principii, ciclul de creare a valorii și direcția strategică MEGAPARC 2030.",
      ru: "Инвестиционная философия, глобальный мандат, принципы, цикл создания стоимости и стратегическое направление MEGAPARC 2030.",
      en: "Investment philosophy, global mandate, principles, the value-creation cycle and the MEGAPARC 2030 strategic direction.",
    },
  },
  about: {
    title: { ro: "Despre MEGAPARC — Platformă integrată de investiții imobiliare", ru: "О компании MEGAPARC — Интегрированная инвестиционная платформа", en: "About MEGAPARC — Integrated Real Estate Investment Platform" },
    description: {
      ro: "Cine este MEGAPARC: moștenirea grupului din 1995, compania fondată în 2005, focusul imobiliar din 2020, misiune, viziune și organizație.",
      ru: "Кто такая MEGAPARC: наследие группы с 1995 года, компания, основанная в 2005-м, фокус на недвижимости с 2020-го, миссия, видение и организация.",
      en: "Who MEGAPARC is: group heritage since 1995, the company established in 2005, the real-estate focus since 2020, mission, vision and organisation.",
    },
  },
  portfolio: {
    title: { ro: "Portofoliu — Active MEGAPARC", ru: "Портфель — Активы MEGAPARC", en: "Portfolio — MEGAPARC Assets" },
    description: {
      ro: "Portofoliul MEGAPARC în Chișinău: active operaționale Dacia 31, Moscova 9, Moscova 20, Creangă 78 și proiecte de dezvoltare.",
      ru: "Портфель MEGAPARC в Кишинёве: операционные активы Dacia 31, Moscova 9, Moscova 20, Creangă 78 и девелоперские проекты.",
      en: "The MEGAPARC portfolio in Chișinău: operating assets Dacia 31, Moscova 9, Moscova 20, Creangă 78 and development projects.",
    },
  },
  development: {
    title: { ro: "Dezvoltare — Proiecte MEGAPARC", ru: "Девелопмент — Проекты MEGAPARC", en: "Development — MEGAPARC Projects" },
    description: {
      ro: "De la amplasament la produs, la activ operațional: VATRA și Drochia Gateway în sistemul de dezvoltare MEGAPARC.",
      ru: "От площадки к продукту и операционному активу: VATRA и Drochia Gateway в системе девелопмента MEGAPARC.",
      en: "From site to product to operating asset: VATRA and Drochia Gateway inside the MEGAPARC development system.",
    },
  },
  opportunities: {
    title: { ro: "Oportunități — Lucrează cu MEGAPARC", ru: "Возможности — Работать с MEGAPARC", en: "Opportunities — Work with MEGAPARC" },
    description: {
      ro: "Trei drumuri: caut un spațiu, propun o oportunitate din orice geografie, discut un parteneriat.",
      ru: "Три пути: ищу помещение, предлагаю объект из любой географии, обсуждаю партнёрство.",
      en: "Three routes: find a space, submit an opportunity from any geography, discuss a partnership.",
    },
  },
  careers: {
    title: { ro: "Cariere — MEGAPARC", ru: "Карьера — MEGAPARC", en: "Careers — MEGAPARC" },
    description: {
      ro: "Construim active. Construim valoare. Construiește cu noi.",
      ru: "Создаём активы. Создаём стоимость. Создавайте вместе с нами.",
      en: "Build assets. Build value. Build with us.",
    },
  },
  contact: {
    title: { ro: "Contact — MEGAPARC", ru: "Контакты — MEGAPARC", en: "Contact — MEGAPARC" },
    description: {
      ro: "Corporate / ocupant, proprietate / oportunitate, parteneriat / investiții. Alege tipul discuției.",
      ru: "Корпоративный / арендатор, объект / возможность, партнёрство / инвестиции. Выберите тему обращения.",
      en: "Corporate / occupier, property / opportunity, partnership / investment. Choose the purpose of the conversation.",
    },
  },
  brandSystem: {
    title: { ro: "Brand System 2.0 — Revizuire internă", ru: "Brand System 2.0 — Внутренний обзор", en: "Brand System 2.0 — Internal Review" },
    description: {
      ro: "Pagină de revizuire internă a sistemului de brand MEGAPARC 2.0.",
      ru: "Внутренняя страница обзора бренд-системы MEGAPARC 2.0.",
      en: "Internal review page for the MEGAPARC Brand System 2.0.",
    },
  },
} satisfies Record<string, PageCopy>;

export type PageId = keyof typeof pageSeo;

/** Metadata URLs resolve against metadataBase (siteUrl), which already includes any Pages base path. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const metaPath = (src: string) => (basePath && src.startsWith(basePath) ? src.slice(basePath.length) : src);
const ogImage = "/assets/portfolio/dacia-31-wide.webp";

/** Builds locale-aware metadata with canonical + hreflang alternates for a locale-neutral path. */
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
