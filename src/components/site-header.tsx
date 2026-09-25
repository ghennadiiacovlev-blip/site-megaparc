import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteNav } from "@/components/site-nav";
import { brand, localePath, ui, type SiteLocale } from "@/lib/site-data";

export function Brand({
  locale,
  href,
  light = false,
}: {
  locale: SiteLocale;
  href?: string;
  light?: boolean;
}) {
  return (
    <Link
      className={`brand${light ? " brand--light" : ""}`}
      href={href ?? localePath(locale, "/")}
      aria-label={`${brand.name} — ${ui.home[locale]}`}
    >
      <span className="brand__name">{brand.wordmark}</span>
      <span className="brand__rule" aria-hidden="true" />
      <span className="brand__tag">{brand.tagline[locale]}</span>
    </Link>
  );
}

/**
 * One header for the whole site.
 * `overlay` sits over the homepage hero and darkens on scroll;
 * `solid` is the sticky paper header used on interior routes.
 */
export function SiteHeader({
  locale,
  variant = "solid",
}: {
  locale: SiteLocale;
  variant?: "overlay" | "solid";
}) {
  return (
    <header className={`site-header site-header--${variant}`}>
      <div className="shell site-header__inner">
        <Brand locale={locale} light={variant === "overlay"} />
        <SiteNav locale={locale} />
        <div className="site-header__tools">
          <LanguageSwitcher locale={locale} />
          <details className="mobile-menu">
            <summary aria-label={ui.openMenu[locale]}>
              <span className="mobile-menu__label">{ui.menu[locale]}</span>
              <span className="mobile-menu__icon" aria-hidden="true">
                <i />
                <i />
              </span>
            </summary>
            <div className="mobile-menu__panel">
              <SiteNav locale={locale} variant="mobile" />
              <div className="mobile-menu__foot">
                <LanguageSwitcher locale={locale} variant="mobile" />
                <span className="label">{brand.positioning}</span>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
