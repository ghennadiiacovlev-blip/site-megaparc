export type SiteLocale = "ro" | "ru" | "en";
export const locales: SiteLocale[] = ["ro", "ru", "en"];
export const defaultLocale: SiteLocale = "ro";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

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
  /** English positioning line is a brand device and is kept in English on every locale. */
  positioning: "Real Estate Investment · Development · Asset Management",
  /** OWNER-approved group heritage marker. Kept in English in every locale. 2005 is the MEGAPARC founding year. */
  since: "Since 1995",
  tagline: { ro: "Construim viitorul", ru: "Строим будущее", en: "We build the future" } satisfies Localized,
  city: { ro: "Chișinău · Republica Moldova", ru: "Кишинёв · Республика Молдова", en: "Chișinău · Republic of Moldova" } satisfies Localized,
  languageNames: { ro: "Română", ru: "Русский", en: "English" } satisfies Localized,
};

/* ------------------------------------------------------------------ */
/* Navigation                                                           */
/* ------------------------------------------------------------------ */

export type NavItem = { label: string; path: string };

export const navigation: Record<SiteLocale, NavItem[]> = {
  ro: [
    { label: "Despre", path: "/about" },
    { label: "Portofoliu", path: "/portfolio" },
    { label: "Dezvoltare", path: "/development" },
    { label: "Disponibilități", path: "/opportunities" },
    { label: "Cariere", path: "/careers" },
    { label: "Contact", path: "/contact" },
  ],
  ru: [
    { label: "О компании", path: "/about" },
    { label: "Портфель", path: "/portfolio" },
    { label: "Девелопмент", path: "/development" },
    { label: "Предложения", path: "/opportunities" },
    { label: "Карьера", path: "/careers" },
    { label: "Контакты", path: "/contact" },
  ],
  en: [
    { label: "About", path: "/about" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "Development", path: "/development" },
    { label: "Opportunities", path: "/opportunities" },
    { label: "Careers", path: "/careers" },
    { label: "Contact", path: "/contact" },
  ],
};

export const ui = {
  menu: { ro: "Meniu", ru: "Меню", en: "Menu" },
  closeMenu: { ro: "Închide meniul", ru: "Закрыть меню", en: "Close menu" },
  openMenu: { ro: "Deschide meniul", ru: "Открыть меню", en: "Open menu" },
  languages: { ro: "Limbi", ru: "Языки", en: "Languages" },
  navigation: { ro: "Navigație principală", ru: "Основная навигация", en: "Primary navigation" },
  mobileNavigation: { ro: "Navigație mobilă", ru: "Мобильная навигация", en: "Mobile navigation" },
  home: { ro: "Acasă", ru: "Главная", en: "Home" },
  exploreAsset: { ro: "Explorează activul", ru: "Открыть объект", en: "Explore asset" },
  exploreProject: { ro: "Explorează proiectul", ru: "Открыть проект", en: "Explore project" },
  photoPending: { ro: "Fotografie în pregătire", ru: "Фотография готовится", en: "Photography in preparation" },
  onRequest: { ro: "Informații suplimentare la cerere", ru: "Дополнительная информация по запросу", en: "Additional information available on request" },
  operating: { ro: "Active operaționale", ru: "Операционные активы", en: "Operating assets" },
  development: { ro: "Dezvoltare", ru: "Девелопмент", en: "Development" },
  location: { ro: "Localizare", ru: "Расположение", en: "Location" },
  status: { ro: "Status", ru: "Статус", en: "Status" },
  role: { ro: "Rol MEGAPARC", ru: "Роль MEGAPARC", en: "MEGAPARC role" },
  ownedManaged: { ro: "Deținut / administrat", ru: "Владение / управление", en: "Owned / managed" },
  use: { ro: "Utilizare", ru: "Назначение", en: "Use" },
  availability: { ro: "Disponibilitate", ru: "Доступность", en: "Availability" },
  totalArea: { ro: "Suprafață totală", ru: "Общая площадь", en: "Total area" },
  askingRent: { ro: "Chirie solicitată", ru: "Арендная ставка", en: "Asking rent" },
  availableFrom: { ro: "Disponibil din", ru: "Доступен с", en: "Available from" },
  nextAsset: { ro: "Următorul activ", ru: "Следующий объект", en: "Next asset" },
  nextProject: { ro: "Următorul proiect", ru: "Следующий проект", en: "Next project" },
  allAssets: { ro: "Toate activele", ru: "Все объекты", en: "All assets" },
  scroll: { ro: "Derulează", ru: "Листайте", en: "Scroll" },
  enquire: { ro: "Solicită informații", ru: "Запросить информацию", en: "Request information" },
  discussAsset: { ro: "Discută despre acest activ", ru: "Обсудить объект", en: "Discuss this asset" },
  discussProject: { ro: "Discută despre proiect", ru: "Обсудить проект", en: "Discuss the project" },
  viewAvailability: { ro: "Vezi disponibilitățile", ru: "Смотреть предложения", en: "View availability" },
  viewPortfolio: { ro: "Vezi portofoliul", ru: "Смотреть портфель", en: "View the portfolio" },
  backToDevelopment: { ro: "Înapoi la Dezvoltare", ru: "Назад к девелопменту", en: "Back to Development" },
  concept: { ro: "Concept în discuție", ru: "Концепция для обсуждения", en: "Concept for discussion" },
  siteArea: { ro: "Suprafața terenului", ru: "Площадь участка", en: "Site area" },
  developer: { ro: "Dezvoltator", ru: "Девелопер", en: "Developer" },
  page404: { ro: "Pagina nu există.", ru: "Страница не найдена.", en: "Page not found." },
  back404: { ro: "Înapoi la MEGAPARC", ru: "Вернуться на MEGAPARC", en: "Back to MEGAPARC" },
} satisfies Record<string, Localized>;
