import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteNav } from "@/components/site-nav";
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
  onRequest: { ro: "Date de contact directe la cerere", ru: "Прямые контактные данные по запросу", en: "Direct contact details on request" },
} satisfies Record<string, Localized>;

const lines = ["Real Estate Investment", "Development", "Asset Management"];

/** Final brand moment: MEGAPARC, the three lines, WE BUILD THE FUTURE, then navigation, contact, languages, legal. */
export function SiteFooter({ locale }: { locale: SiteLocale }) {
  return (
    <footer className="ftr">
      <div className="shell">
        <div className="ftr__brand">
          <p className="ftr__wordmark" aria-hidden="true">{brand.name}</p>
          <ul className="ftr__lines" lang="en" aria-label={brand.positioning}>
            {lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="ftr__future" lang="en">We build the future.</p>
          {locale !== "en" ? <p className="ftr__future ftr__future--local">{brand.tagline[locale]}.</p> : null}
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
              {clientJourneys.map((journey) => (
                <li key={journey.key}>
                  <Link href={`${localePath(locale, journey.path)}#${journey.anchor}`}>{journey.title[locale]}</Link>
                </li>
              ))}
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
