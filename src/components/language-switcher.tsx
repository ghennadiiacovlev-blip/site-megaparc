"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ui, type SiteLocale } from "@/lib/site-data";

/**
 * Context-preserving RO / EN switch. RU stays visible but inactive until the
 * Russian edition is approved.
 */
export function LanguageSwitcher({
  locale,
  variant = "header",
}: {
  locale: SiteLocale;
  variant?: "header" | "mobile" | "footer";
}) {
  const pathname = usePathname().replace(/\/$/, "") || "/";
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const roPath = isEnglish ? pathname.replace(/^\/en(?=\/|$)/, "") || "/" : pathname;
  const enPath = isEnglish ? pathname : pathname === "/" ? "/en" : `/en${pathname}`;

  return (
    <div className={`languages languages--${variant}`} aria-label={ui.languages[locale]}>
      {locale === "ro" ? (
        <span className="is-active" aria-current="true">RO</span>
      ) : (
        <Link href={roPath} hrefLang="ro" lang="ro">RO</Link>
      )}
      <span aria-disabled="true" title={ui.ruPending[locale]}>RU</span>
      {locale === "en" ? (
        <span className="is-active" aria-current="true">EN</span>
      ) : (
        <Link href={enPath} hrefLang="en" lang="en">EN</Link>
      )}
    </div>
  );
}
