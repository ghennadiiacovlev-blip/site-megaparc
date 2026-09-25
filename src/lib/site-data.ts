export type SiteLocale = "ro" | "en";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefixes a public asset path with the GitHub Pages base path when present. */
export function publicAsset(path: string) {
  if (!path.startsWith("/")) return path;
  return `${publicBasePath}${path}`;
}

/** Maps a locale-neutral route to its localised path. */
export function localePath(locale: SiteLocale, path: string) {
  if (locale === "en") return path === "/" ? "/en" : `/en${path}`;
  return path;
}

type Localized = Record<SiteLocale, string>;

/* ------------------------------------------------------------------ */
/* Brand                                                                */
/* ------------------------------------------------------------------ */

export const brand = {
  name: "MEGAPARC",
  wordmark: "Megaparc",
  /** English positioning line is a brand device and is kept in English on every locale. */
  positioning: "Real Estate Investment · Development · Asset Management",
  tagline: { ro: "Construim viitorul", en: "We build the future" } satisfies Localized,
  city: { ro: "Chișinău · Republica Moldova", en: "Chișinău · Republic of Moldova" } satisfies Localized,
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
  menu: { ro: "Meniu", en: "Menu" },
  closeMenu: { ro: "Închide meniul", en: "Close menu" },
  openMenu: { ro: "Deschide meniul", en: "Open menu" },
  languages: { ro: "Limbi", en: "Languages" },
  ruPending: { ro: "Ediția în limba rusă este în pregătire", en: "Russian edition in preparation" },
  navigation: { ro: "Navigație principală", en: "Primary navigation" },
  mobileNavigation: { ro: "Navigație mobilă", en: "Mobile navigation" },
  home: { ro: "Acasă", en: "Home" },
  exploreAsset: { ro: "Explorează activul", en: "Explore asset" },
  photoPending: { ro: "Fotografie în curs de completare", en: "Photography pending" },
  dataPending: { ro: "Date publice în curs de aprobare", en: "Public data pending approval" },
  ownerInput: { ro: "Informații publice în curs de validare", en: "Public information pending validation" },
  legalPending: {
    ro: "Datele publice de contact și informațiile juridice vor fi afișate după validarea finală pentru publicare.",
    en: "Public contact details and legal information will be displayed after final approval for publication.",
  },
  operating: { ro: "Active operaționale", en: "Operating assets" },
  development: { ro: "Dezvoltare", en: "Development" },
  location: { ro: "Localitate", en: "Location" },
  status: { ro: "Status", en: "Status" },
  role: { ro: "Rol MEGAPARC", en: "MEGAPARC role" },
  ownedManaged: { ro: "Deținut / administrat", en: "Owned / managed" },
  assetType: { ro: "Tip", en: "Type" },
  nextAsset: { ro: "Următorul activ", en: "Next asset" },
  allAssets: { ro: "Toate activele", en: "All assets" },
  scroll: { ro: "Derulează", en: "Scroll" },
} satisfies Record<string, Localized>;

/* ------------------------------------------------------------------ */
/* Portfolio                                                            */
/* ------------------------------------------------------------------ */

export type AssetSlug = "dacia-31" | "moscova-9" | "moscova-20" | "creanga-78";

export type PortfolioAsset = {
  slug: AssetSlug;
  name: string;
  /** Production image (null while OWNER photography is pending). */
  image: string | null;
  /** Lighter variant for grid / card use. */
  imageSmall: string | null;
  imagePosition?: string;
  city: string;
  status: Localized;
  kind: Localized;
};

const operating: Localized = { ro: "Activ operațional", en: "Operating asset" };
const portfolioKind: Localized = { ro: "Portofoliu MEGAPARC", en: "MEGAPARC portfolio" };

export const portfolioAssets: PortfolioAsset[] = [
  {
    slug: "dacia-31",
    name: "Dacia 31",
    image: publicAsset("/assets/portfolio/dacia-31.webp"),
    imageSmall: publicAsset("/assets/portfolio/dacia-31-1200.webp"),
    imagePosition: "50% 56%",
    city: "Chișinău",
    status: operating,
    kind: portfolioKind,
  },
  {
    slug: "moscova-9",
    name: "Moscova 9",
    image: publicAsset("/assets/portfolio/moscova-9.webp"),
    imageSmall: publicAsset("/assets/portfolio/moscova-9-960.webp"),
    imagePosition: "50% 50%",
    city: "Chișinău",
    status: operating,
    kind: portfolioKind,
  },
  {
    slug: "moscova-20",
    name: "Moscova 20",
    image: publicAsset("/assets/portfolio/moscova-20.webp"),
    imageSmall: publicAsset("/assets/portfolio/moscova-20-960.webp"),
    imagePosition: "50% 48%",
    city: "Chișinău",
    status: operating,
    kind: portfolioKind,
  },
  {
    slug: "creanga-78",
    name: "Creangă 78",
    image: null,
    imageSmall: null,
    city: "Chișinău",
    status: operating,
    kind: { ro: "Fotografie în curs de completare", en: "Photography pending" },
  },
];

export function getAsset(slug: string) {
  return portfolioAssets.find((asset) => asset.slug === slug);
}

export function getNextAsset(slug: AssetSlug) {
  const index = portfolioAssets.findIndex((asset) => asset.slug === slug);
  return portfolioAssets[(index + 1) % portfolioAssets.length];
}

export const developmentProject = {
  slug: "vatra",
  name: "VATRA",
  image: publicAsset("/assets/development/vatra.webp"),
  imageSmall: publicAsset("/assets/development/vatra-960.webp"),
  status: { ro: "Proiect în dezvoltare", en: "Development project" } satisfies Localized,
} as const;
