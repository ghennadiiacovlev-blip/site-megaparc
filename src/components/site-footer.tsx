import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteNav } from "@/components/site-nav";
import { brand, localePath, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    statement: "Investim, dezvoltăm și administrăm active imobiliare cu o perspectivă de proprietar pe termen lung.",
    navigate: "Navigare",
    editions: "Limbă",
    enquiry: "Contact",
    enquiryLine: "Alege tipul discuției",
    office: "Chișinău, Republica Moldova",
    legal: "Informații juridice și de confidențialitate disponibile la cerere.",
  },
  ru: {
    statement: "Мы инвестируем, развиваем и управляем объектами недвижимости с долгосрочной перспективой собственника.",
    navigate: "Навигация",
    editions: "Язык",
    enquiry: "Контакты",
    enquiryLine: "Выберите тему обращения",
    office: "Кишинёв, Республика Молдова",
    legal: "Юридическая информация и политика конфиденциальности предоставляются по запросу.",
  },
  en: {
    statement: "We invest in, develop and manage real estate assets with a long-term owner's perspective.",
    navigate: "Navigate",
    editions: "Language",
    enquiry: "Contact",
    enquiryLine: "Choose the purpose of the conversation",
    office: "Chișinău, Republic of Moldova",
    legal: "Legal and privacy information available on request.",
  },
} as const;

/** Shared brand-moment footer used by every route. */
export function SiteFooter({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="site-footer__top">
          <p className="site-footer__wordmark" aria-hidden="true">{brand.wordmark}</p>
          <div className="site-footer__statement">
            <span className="label label--red" lang="en">{brand.since}</span>
            <p>{c.statement}</p>
          </div>
        </div>

        <div className="site-footer__grid">
          <div className="site-footer__col">
            <span className="label label--light">{c.navigate}</span>
            <SiteNav locale={locale} variant="footer" />
          </div>
          <div className="site-footer__col">
            <span className="label label--light">{c.editions}</span>
            <LanguageSwitcher locale={locale} variant="footer" />
            <span className="site-footer__note">{c.office}</span>
          </div>
          <div className="site-footer__col">
            <span className="label label--light">{c.enquiry}</span>
            <Link className="arrow-link arrow-link--inverse" href={localePath(locale, "/contact")}>
              <span>{c.enquiryLine}</span>
              <span className="arrow-link__icon" aria-hidden="true">↗</span>
            </Link>
            <span className="site-footer__note">{c.legal}</span>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>{brand.positioning}</span>
          <span>{brand.tagline[locale]}</span>
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
