import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileMenu } from "@/components/mobile-menu";
import { SiteNav } from "@/components/site-nav";
import { brand, localePath, ui, type SiteLocale } from "@/lib/site-data";

export function Brand({ locale, href, light = false }: { locale: SiteLocale; href?: string; light?: boolean }) {
  return (
    <Link className={`brand${light ? " brand--light" : ""}`} href={href ?? localePath(locale, "/")} aria-label={`${brand.name} — ${ui.home[locale]}`}>
      <span className="brand__name">{brand.wordmark}</span>
      <span className="brand__rule" aria-hidden="true" />
    </Link>
  );
}

/**
 * Compact sticky header: wordmark left, menu right.
 * Phone: 72px, logo + menu button only (languages live inside the menu).
 * Desktop: 88px, uppercase navigation right, RO · RU · EN at the far edge.
 */
export function SiteHeader({ locale }: { locale: SiteLocale; variant?: "overlay" | "solid" }) {
  return (
    <header className="hdr">
      <div className="shell hdr__inner">
        <Brand locale={locale} />
        <div className="hdr__right">
          <SiteNav locale={locale} />
          <LanguageSwitcher locale={locale} />
          <MobileMenu locale={locale} />
        </div>
      </div>
    </header>
  );
}
