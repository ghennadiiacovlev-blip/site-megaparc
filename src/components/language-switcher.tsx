"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand, localePath, locales, neutralPath, ui, type SiteLocale } from "@/lib/site-data";

/**
 * Context-preserving RO / RU / EN switch.
 * Every language links to the equivalent of the current page.
 */
export function LanguageSwitcher({
  locale,
  variant = "header",
}: {
  locale: SiteLocale;
  variant?: "header" | "mobile" | "footer";
}) {
  const { path } = neutralPath(usePathname());

  return (
    <nav className={`languages languages--${variant}`} aria-label={ui.languages[locale]}>
      {locales.map((l) =>
        l === locale ? (
          <span key={l} className="is-active" aria-current="true" lang={l} title={brand.languageNames[l]}>
            {l.toUpperCase()}
          </span>
        ) : (
          <Link key={l} href={localePath(l, path)} hrefLang={l} lang={l} title={brand.languageNames[l]}>
            {l.toUpperCase()}
          </Link>
        ),
      )}
    </nav>
  );
}
