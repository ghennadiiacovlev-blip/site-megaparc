import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileMenu } from "@/components/mobile-menu";
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
 * RO · RU · EN are always visible and always active.
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
          <MobileMenu locale={locale} />
        </div>
      </div>
    </header>
  );
}
