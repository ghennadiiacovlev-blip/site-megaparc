import { Geist } from "next/font/google";
import type { ReactNode } from "react";
import type { SiteLocale } from "@/lib/site-data";

/**
 * Brand Guidelines 2025 specify Canva Sans for headline and body.
 * No licensed Canva Sans webfont is in the repository, so `--font` in
 * globals.css lists "Canva Sans" first and falls back to Geist Sans, then
 * Arial / Helvetica. When the licensed file is supplied, register it here.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext", "cyrillic"],
});

/**
 * Shared <html> document for the three locale root layouts.
 * Each locale tree has its own root layout, so the static HTML carries the
 * correct `lang` before any JavaScript runs.
 */
export function RootDocument({ locale, children }: { locale: SiteLocale; children: ReactNode }) {
  return (
    <html lang={locale} className={`${geistSans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
