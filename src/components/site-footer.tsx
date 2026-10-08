import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteNav } from "@/components/site-nav";
import { verbs } from "@/lib/business";
import { brand, localePath, type Localized, type SiteLocale } from "@/lib/site-data";

const copy = {
  navigate: { ro: "Navigare", ru: "Навигация", en: "Navigate" },
  corporate: { ro: "Companie", ru: "Компания", en: "Company" },
  work: { ro: "Pentru dumneavoastră", ru: "Для вас", en: "For you" },
  contact: { ro: "Contact", ru: "Контакты", en: "Contact" },
  editions: { ro: "Limbă", ru: "Язык", en: "Language" },
  legal: {
    ro: "Informații juridice și de confidențialitate disponibile la cerere.",
    ru: "Юридическая информация и политика конфиденциальности — по запросу.",
    en: "Legal and privacy information available on request.",
  },
  onRequest: { ro: "Date de contact directe la cerere", ru: "Контактные данные — по запросу", en: "Direct contact details on request" },
} satisfies Record<string, Localized>;

/** The three routes every visitor may need, whatever page they finish on. */
const routes: { path: string; label: Localized }[] = [
  { path: "/leasing#available", label: { ro: "Spații libere acum", ru: "Сейчас сдаётся", en: "Available now" } },
  { path: "/offer", label: { ro: "Propune un obiect sau teren", ru: "Предложить объект или землю", en: "Offer a property or land" } },
  { path: "/careers", label: { ro: "Posturi deschise", ru: "Открытые вакансии", en: "Open vacancies" } },
];

/**
 * Final brand moment: MEGAPARC, the three verbs (acquire · develop · lease), WE BUILD THE FUTURE, then navigation, routes, contact, languages, legal.
 * `statement={false}` omits WE BUILD THE FUTURE on a page that has just closed on it (About).
 */
export function SiteFooter({ locale, statement = true }: { locale: SiteLocale; statement?: boolean }) {
  return (
    <footer className="ftr">
      <div className="shell">
        <div className="ftr__brand">
          <p className="ftr__wordmark" aria-hidden="true">{brand.name}</p>
          <ul className="ftr__lines" aria-label={brand.positioning[locale]}>
            {verbs[locale].map((line) => (
              <li key={line}>{line.replace(/.$/, "")}</li>
            ))}
          </ul>
          {statement ? <p className="ftr__future" lang="en">We build the future.</p> : null}
          {statement && locale !== "en" ? <p className="ftr__future ftr__future--local">{brand.tagline[locale]}.</p> : null}
        </div>

        <div className="ftr__grid">
          <div className="ftr__col">
            <span className="ftr__label">{copy.navigate[locale]}</span>
            <SiteNav locale={locale} variant="footer" />
            <SiteNav locale={locale} variant="footer" secondary />
          </div>
          <div className="ftr__col">
            <span className="ftr__label">{copy.work[locale]}</span>
            <ul className="ftr__list">
              {routes.map((route) => {
                const [path, hash] = route.path.split("#");
                return (
                  <li key={route.path}>
                    <Link href={`${localePath(locale, path)}${hash ? `#${hash}` : ""}`}>{route.label[locale]}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="ftr__col">
            <span className="ftr__label">{copy.contact[locale]}</span>
            <p className="ftr__text">{brand.name} SRL<br />{brand.city[locale]}</p>
            <p className="ftr__text ftr__text--muted">{copy.onRequest[locale]}</p>
            <Link className="ftr__link" href={localePath(locale, "/contact")}>{copy.contact[locale]}</Link>
          </div>
          <div className="ftr__col">
            <span className="ftr__label">{copy.editions[locale]}</span>
            <LanguageSwitcher locale={locale} variant="footer" />
          </div>
        </div>

        <div className="ftr__legal">
          <span lang="en">{brand.since}</span>
          <span>{copy.legal[locale]}</span>
          <span>© {new Date().getFullYear()} {brand.name}</span>
        </div>
      </div>
      <div className="ftr__wave" aria-hidden="true">
        <span />
        <span />
      </div>
    </footer>
  );
}
