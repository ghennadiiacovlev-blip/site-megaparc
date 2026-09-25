"use client";

import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteNav } from "@/components/site-nav";
import { brand, ui, type SiteLocale } from "@/lib/site-data";

/**
 * Full-screen premium navigation for tablet and phone.
 * Large typography, RO · RU · EN with clear current state, Escape to close,
 * closes automatically on route change, locks page scroll while open.
 */
export function MobileMenu({ locale }: { locale: SiteLocale }) {
  const pathname = usePathname();
  // The menu is open only for the path it was opened on, so navigation closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean | ((current: boolean) => boolean)) =>
    setOpenOn((current) => {
      const next = typeof value === "function" ? value(current === pathname) : value;
      return next ? pathname : null;
    });
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenOn(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <div className={`mobile-menu${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="mobile-menu__trigger"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? ui.closeMenu[locale] : ui.openMenu[locale]}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="mobile-menu__label">{open ? ui.closeMenu[locale] : ui.menu[locale]}</span>
        <span className="mobile-menu__icon" aria-hidden="true">
          <i />
          <i />
        </span>
      </button>

      <div id={panelId} className="mobile-menu__panel" hidden={!open}>
        <div className="mobile-menu__inner">
          <SiteNav locale={locale} variant="mobile" />
          <div className="mobile-menu__foot">
            <span className="label">{ui.languages[locale]}</span>
            <LanguageSwitcher locale={locale} variant="mobile" />
            <span className="mobile-menu__positioning">{brand.positioning}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
