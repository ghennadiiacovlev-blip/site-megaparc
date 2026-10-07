import type { ReactNode } from "react";
import { MotionController } from "@/components/motion-controller";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { SiteLocale } from "@/lib/site-data";

/**
 * Global shell: progress signature, header, page content, footer.
 * `overlay`: the header sits over the first movement and turns solid after it
 * (About). `footerStatement={false}` drops the footer's WE BUILD THE FUTURE
 * where the page itself closes on it.
 */
export function PageShell({
  locale,
  variant = "solid",
  footerStatement = true,
  children,
  mainClassName,
}: {
  locale: SiteLocale;
  variant?: "overlay" | "solid";
  footerStatement?: boolean;
  children: ReactNode;
  mainClassName?: string;
}) {
  return (
    <div className={`site site--${variant}`} lang={locale}>
      <MotionController />
      <div className="scroll-progress" aria-hidden="true" />
      <SiteHeader locale={locale} variant={variant} />
      <main id="top" className={mainClassName}>{children}</main>
      <SiteFooter locale={locale} statement={footerStatement} />
    </div>
  );
}
