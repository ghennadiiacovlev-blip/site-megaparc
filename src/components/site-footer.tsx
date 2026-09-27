import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteNav } from "@/components/site-nav";
import { brandLayers } from "@/lib/brand";
import { clientJourneys } from "@/lib/client-journeys";
import { brand, localePath, type Localized, type SiteLocale } from "@/lib/site-data";

const copy = {
  navigate: { ro: "Navigare", ru: "Навигация", en: "Navigate" },
  corporate: { ro: "Companie", ru: "Компания", en: "Company" },
  work: { ro: "Colaborare", ru: "Сотрудничество", en: "Work with us" },
  contact: { ro: "Contact", ru: "Контакты", en: "Contact" },
  editions: { ro: "Limbă", ru: "Язык", en: "Language" },
  legal: {
    ro: "Informații juridice și de confidențialitate disponibile la cerere.",
    ru: "Юридическая информация и политика конфиденциальности предоставляются по запросу.",
    en: "Legal and privacy information available on request.",
  },
  onRequest: {
    ro: "Date de contact directe la cerere",
    ru: "Прямые контактные данные по запросу",
    en: "Direct contact details on request",
  },
} satisfies Record<string, Localized>;

const lines = ["Real Estate Investment", "Development", "Asset Management"];

/**
 * Corporate closing: wordmark, the three capability lines, navigation,
 * contact, languages, legal, and WE BUILD THE FUTURE as the last word.
 */
export function SiteFooter({ locale }: { locale: SiteLocale }) {
  return (
    <footer className="foot">
      <div className="shell">
        <div className="foot__head">
          <p className="foot__wordmark" aria-hidden="true">{brand.wordmark}</p>
          <ul className="foot__lines" lang="en" aria-label={brand.positioning}>
            {lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <div className="foot__grid">
          <div className="foot__col">
            <span className="foot__label">{copy.navigate[locale]}</span>
            <SiteNav locale={locale} variant="footer" />
          </div>
          <div className="foot__col">
            <span className="foot__label">{copy.work[locale]}</span>
            <ul className="foot__list">
              {clientJourneys.map((journey) => (
                <li key={journey.key}>
                  <Link href={`${localePath(locale, journey.path)}#${journey.anchor}`}>{journey.title[locale]}</Link>
                </li>
              ))}
            </ul>
            <span className="foot__label">{copy.corporate[locale]}</span>
            <SiteNav locale={locale} variant="footer" secondary />
          </div>
          <div className="foot__col">
            <span className="foot__label">{copy.contact[locale]}</span>
            <p className="foot__text">{brand.name} SRL<br />{brand.city[locale]}</p>
            <p className="foot__text foot__text--muted">{copy.onRequest[locale]}</p>
            <Link className="foot__link" href={localePath(locale, "/contact")}>{copy.contact[locale]} ↗</Link>
          </div>
          <div className="foot__col">
            <span className="foot__label">{copy.editions[locale]}</span>
            <LanguageSwitcher locale={locale} variant="footer" />
            <span className="foot__label">{brand.name}</span>
            <p className="foot__text foot__text--muted">{brandLayers.model[locale]}</p>
          </div>
        </div>

        <div className="foot__close">
          <p className="foot__future" lang="en">We build the future.</p>
          {locale !== "en" ? <p className="foot__future foot__future--local">{brand.tagline[locale]}.</p> : null}
        </div>

        <div className="foot__legal">
          <span lang="en">{brand.since}</span>
          <span>{copy.legal[locale]}</span>
          <span>© {new Date().getFullYear()} {brand.name}</span>
        </div>
      </div>
      <div className="foot__wave" aria-hidden="true">
        <span />
        <span />
      </div>
    </footer>
  );
}
