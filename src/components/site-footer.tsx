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
  editions: { ro: "Limbă", ru: "Язык", en: "Language" },
  legal: {
    ro: "Informații juridice și de confidențialitate disponibile la cerere.",
    ru: "Юридическая информация и политика конфиденциальности предоставляются по запросу.",
    en: "Legal and privacy information available on request.",
  },
  statement: {
    ro: "Investim, dezvoltăm și administrăm imobiliare.",
    ru: "Инвестируем, развиваем и управляем недвижимостью.",
    en: "We invest in, develop and manage real estate.",
  },
} satisfies Record<string, Localized>;

/** Brand finale: wordmark, SINCE 1995, WE BUILD THE FUTURE, navigation, journeys, languages, wave. */
export function SiteFooter({ locale }: { locale: SiteLocale }) {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="site-footer__signature">
          <p className="site-footer__wordmark" aria-hidden="true">{brand.wordmark}</p>
          <div className="site-footer__since">
            <span className="label label--red" lang="en">{brand.since}</span>
            <p>{brand.tagline[locale]}.</p>
          </div>
        </div>

        <div className="site-footer__grid">
          <div className="site-footer__col">
            <span className="label label--light">{brand.name}</span>
            <p className="site-footer__statement">{copy.statement[locale]}</p>
            <span className="site-footer__note">{brandLayers.platform[locale]}</span>
          </div>
          <div className="site-footer__col">
            <span className="label label--light">{copy.navigate[locale]}</span>
            <SiteNav locale={locale} variant="footer" />
            <span className="label label--light">{copy.corporate[locale]}</span>
            <SiteNav locale={locale} variant="footer" secondary />
          </div>
          <div className="site-footer__col">
            <span className="label label--light">{copy.work[locale]}</span>
            <div className="site-footer__journeys">
              {clientJourneys.map((journey) => (
                <Link key={journey.key} href={`${localePath(locale, journey.path)}#${journey.anchor}`}>
                  <span>{journey.title[locale]}</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="site-footer__col">
            <span className="label label--light">{copy.editions[locale]}</span>
            <LanguageSwitcher locale={locale} variant="footer" />
            <span className="site-footer__note">{brand.city[locale]}</span>
            <span className="site-footer__note">{copy.legal[locale]}</span>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>{brand.positioning}</span>
          <span>{brandLayers.model[locale]}</span>
          <span>© {new Date().getFullYear()} {brand.name}</span>
        </div>
      </div>
      <div className="site-footer__wave" aria-hidden="true">
        <span />
        <span />
      </div>
    </footer>
  );
}
