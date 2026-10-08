export type SiteLocale = "ro" | "ru" | "en";
export const locales: SiteLocale[] = ["ro", "ru", "en"];
export const defaultLocale: SiteLocale = "ro";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** True on the GitHub Pages OWNER approval preview. */
export const isPreviewBuild = process.env.GITHUB_PAGES === "true";

/** Prefixes a public asset path with the GitHub Pages base path when present. */
export function publicAsset(path: string) {
  if (!path.startsWith("/")) return path;
  return `${publicBasePath}${path}`;
}

/** Maps a locale-neutral route to its localised path. */
export function localePath(locale: SiteLocale, path: string) {
  if (locale === "ro") return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Strips a locale prefix and returns the locale-neutral route. */
export function neutralPath(pathname: string) {
  const clean = pathname.replace(/\/$/, "") || "/";
  const match = clean.match(/^\/(ru|en)(?=\/|$)/);
  if (!match) return { locale: "ro" as SiteLocale, path: clean };
  return { locale: match[1] as SiteLocale, path: clean.slice(match[0].length) || "/" };
}

export type Localized = Record<SiteLocale, string>;

/* ------------------------------------------------------------------ */
/* Brand                                                                */
/* ------------------------------------------------------------------ */

export const brand = {
  name: "MEGAPARC",
  wordmark: "Megaparc",
  /** Business positioning (OWNER correction 2026-10-08): acquire · develop · lease — localised. */
  positioning: { ro: "Cumpărăm · Dezvoltăm · Închiriem", ru: "Покупаем · Развиваем · Сдаём в аренду", en: "Acquire · Develop · Lease" } satisfies Localized,
  /** OWNER-approved group heritage marker (group investment structure, 1995). Kept in English in every locale. 1991 = business origins; 2005 = MEGAPARC founded. */
  since: "Since 1995",
  tagline: { ro: "Construim viitorul", ru: "Строим будущее", en: "We build the future" } satisfies Localized,
  city: { ro: "Chișinău · Republica Moldova", ru: "Кишинёв · Республика Молдова", en: "Chișinău · Republic of Moldova" } satisfies Localized,
  languageNames: { ro: "Română", ru: "Русский", en: "English" } satisfies Localized,
};

/* ------------------------------------------------------------------ */
/* Navigation                                                           */
/* ------------------------------------------------------------------ */

/** `also`: further route prefixes that mark the item active (History lives under About). */
export type NavItem = { label: string; path: string; also?: string[] };

/**
 * Primary navigation — OWNER correction 2026-10-08:
 * HOME · ABOUT · PROJECTS · LEASING · OFFER A PROPERTY · CAREERS · CONTACT.
 * Careers is in the top navigation, not only in the footer.
 */
export const navigation: Record<SiteLocale, NavItem[]> = {
  ro: [
    { label: "Acasă", path: "/" },
    { label: "Despre companie", path: "/about", also: ["/history"] },
    { label: "Proiecte", path: "/projects" },
    { label: "Închiriere", path: "/leasing" },
    { label: "Propune un obiect", path: "/offer" },
    { label: "Cariere", path: "/careers" },
    { label: "Contact", path: "/contact" },
  ],
  ru: [
    { label: "Главная", path: "/" },
    { label: "О компании", path: "/about", also: ["/history"] },
    { label: "Проекты", path: "/projects" },
    { label: "Аренда", path: "/leasing" },
    { label: "Предложить объект", path: "/offer" },
    { label: "Вакансии", path: "/careers" },
    { label: "Контакты", path: "/contact" },
  ],
  en: [
    { label: "Home", path: "/" },
    { label: "About", path: "/about", also: ["/history"] },
    { label: "Projects", path: "/projects" },
    { label: "Leasing", path: "/leasing" },
    { label: "Offer a property", path: "/offer" },
    { label: "Careers", path: "/careers" },
    { label: "Contact", path: "/contact" },
  ],
};

/** Secondary routes (mobile menu, footer): the company history. */
export const secondaryNavigation: Record<SiteLocale, NavItem[]> = {
  ro: [{ label: "Istoric", path: "/history" }],
  ru: [{ label: "История", path: "/history" }],
  en: [{ label: "History", path: "/history" }],
};

export const ui = {
  menu: { ro: "Meniu", ru: "Меню", en: "Menu" },
  closeMenu: { ro: "Închide meniul", ru: "Закрыть меню", en: "Close menu" },
  openMenu: { ro: "Deschide meniul", ru: "Открыть меню", en: "Open menu" },
  languages: { ro: "Limbi", ru: "Языки", en: "Languages" },
  navigation: { ro: "Navigație principală", ru: "Основная навигация", en: "Primary navigation" },
  mobileNavigation: { ro: "Navigație mobilă", ru: "Мобильная навигация", en: "Mobile navigation" },
  secondaryNavigation: { ro: "Navigație secundară", ru: "Дополнительная навигация", en: "Secondary navigation" },
  home: { ro: "Acasă", ru: "Главная", en: "Home" },
  exploreAsset: { ro: "Vezi obiectul", ru: "Открыть объект", en: "View property" },
  exploreProject: { ro: "Vezi proiectul", ru: "Открыть проект", en: "View project" },
  photoPending: { ro: "Fotografie în pregătire", ru: "Фотография готовится", en: "Photography in preparation" },
  onRequest: { ro: "Informații suplimentare la cerere", ru: "Дополнительная информация по запросу", en: "Additional information on request" },
  location: { ro: "Localizare", ru: "Расположение", en: "Location" },
  status: { ro: "Status", ru: "Статус", en: "Status" },
  use: { ro: "Destinație", ru: "Назначение", en: "Use" },
  availability: { ro: "Disponibilitate", ru: "Доступность", en: "Availability" },
  totalArea: { ro: "Suprafață", ru: "Площадь", en: "Area" },
  availableFrom: { ro: "Disponibil din", ru: "Доступно с", en: "Available from" },
  nextAsset: { ro: "Următorul obiect", ru: "Следующий объект", en: "Next property" },
  nextProject: { ro: "Următorul proiect", ru: "Следующий проект", en: "Next project" },
  allAssets: { ro: "Toate obiectele", ru: "Все объекты", en: "All properties" },
  scroll: { ro: "Derulează", ru: "Листайте", en: "Scroll" },
  requestDetails: { ro: "Solicită detalii", ru: "Запросить детали", en: "Request details" },
  discussAsset: { ro: "Discută despre acest obiect", ru: "Обсудить объект", en: "Discuss this property" },
  discussProject: { ro: "Discută despre proiect", ru: "Обсудить проект", en: "Discuss the project" },
  contactUs: { ro: "Contactează-ne", ru: "Связаться с нами", en: "Contact us" },
  viewProjects: { ro: "Vezi proiectele", ru: "Смотреть проекты", en: "View the projects" },
  concept: { ro: "Concept în discuție", ru: "Концепция", en: "Concept" },
  siteArea: { ro: "Suprafața terenului", ru: "Площадь участка", en: "Site area" },
  developer: { ro: "Dezvoltator", ru: "Девелопер", en: "Developer" },
  stage: { ro: "Etapă", ru: "Стадия", en: "Stage" },
  page404: { ro: "Pagina nu există.", ru: "Страница не найдена.", en: "Page not found." },
  back404: { ro: "Înapoi la MEGAPARC", ru: "Вернуться на MEGAPARC", en: "Back to MEGAPARC" },
} satisfies Record<string, Localized>;
