import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteNav } from "@/components/site-nav";
import { brand, localePath, ui, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    statement: "Investim, dezvoltăm și administrăm active imobiliare cu o perspectivă de proprietar pe termen lung.",
    navigate: "Navigare",
    editions: "Ediții",
    enquiry: "Contact",
    enquiryLine: "Alege tipul discuției",
    legal: "Informații juridice · în curs de validare",
    privacy: "Confidențialitate · în curs de validare",
  },
  en: {
    statement: "We invest in, develop and manage real estate assets with a long-term owner's perspective.",
    navigate: "Navigate",
    editions: "Editions",
    enquiry: "Contact",
    enquiryLine: "Choose the purpose of the conversation",
    legal: "Legal information · pending validation",
    privacy: "Privacy · pending validation",
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
          <p className="site-footer__statement">{c.statement}</p>
        </div>

        <div className="site-footer__grid">
          <div className="site-footer__col">
            <span className="label label--light">{c.navigate}</span>
            <SiteNav locale={locale} variant="footer" />
          </div>
          <div className="site-footer__col">
            <span className="label label--light">{c.editions}</span>
            <LanguageSwitcher locale={locale} variant="footer" />
            <span className="site-footer__note">{ui.ruPending[locale]}</span>
          </div>
          <div className="site-footer__col">
            <span className="label label--light">{c.enquiry}</span>
            <Link className="arrow-link arrow-link--inverse" href={localePath(locale, "/contact")}>
              <span>{c.enquiryLine}</span>
              <span className="arrow-link__icon" aria-hidden="true">↗</span>
            </Link>
            <span className="site-footer__note">{ui.legalPending[locale]}</span>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>{brand.positioning}</span>
          <span>{brand.tagline[locale]}</span>
          <span>{brand.city[locale]}</span>
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
