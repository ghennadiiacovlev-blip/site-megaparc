import type { Metadata } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://megaparc.md"),
  title: {
    default: "MEGAPARC — Real Estate Investment, Development & Asset Management",
    template: "%s | MEGAPARC",
  },
  description:
    "MEGAPARC dezvoltă, deține și administrează active imobiliare cu o perspectivă pe termen lung.",
  alternates: {
    canonical: "/",
    languages: {
      "ro-MD": "/",
      en: "/en",
    },
  },
  openGraph: {
    title: "MEGAPARC — Construim viitorul",
    description:
      "Real Estate Investment · Development · Asset Management",
    type: "website",
    locale: "ro_MD",
    siteName: "MEGAPARC",
    url: "/",
    images: ["/assets/portfolio/dacia-31.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "MEGAPARC — Construim viitorul",
    description: "Real Estate Investment · Development · Asset Management",
    images: ["/assets/portfolio/dacia-31.webp"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ro"
      className={`${geistSans.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
