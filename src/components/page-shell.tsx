import type { ReactNode } from "react";
import { MotionController } from "@/components/motion-controller";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { SiteLocale } from "@/lib/site-data";

/** Global shell: progress signature, header, page content, footer. */
export function PageShell({
  locale,
  variant = "solid",
  children,
  mainClassName,
}: {
  locale: SiteLocale;
  variant?: "overlay" | "solid";
  children: ReactNode;
  mainClassName?: string;
}) {
  return (
    <div className={`site site--${variant}`} lang={locale}>
      <MotionController />
      <div className="scroll-progress" aria-hidden="true" />
      <SiteHeader locale={locale} variant={variant} />
      <main id="top" className={mainClassName}>{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
