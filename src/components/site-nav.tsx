"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath, navigation, secondaryNavigation, ui, type SiteLocale } from "@/lib/site-data";

/**
 * Primary navigation with route-aware active state.
 * Used by the header (desktop + mobile panel) and the footer.
 * `secondary` renders the corporate routes (Careers) that stay out of the primary bar.
 */
export function SiteNav({
  locale,
  variant = "desktop",
  secondary = false,
}: {
  locale: SiteLocale;
  variant?: "desktop" | "mobile" | "footer" | "secondary-mobile";
  secondary?: boolean;
}) {
  const pathname = usePathname();
  const items = secondary ? secondaryNavigation[locale] : navigation[locale];
  const label = secondary ? ui.secondaryNavigation[locale] : variant === "mobile" ? ui.mobileNavigation[locale] : ui.navigation[locale];

  return (
    <nav className={`site-nav site-nav--${variant}`} aria-label={label}>
      {items.map((item) => {
        const href = localePath(locale, item.path);
        const normalized = pathname.replace(/\/$/, "") || "/";
        const active = normalized === href || normalized.startsWith(`${href}/`);
        return (
          <Link key={item.path} href={href} aria-current={active ? "page" : undefined}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
