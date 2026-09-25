import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home";

export const metadata: Metadata = {
  title: {
    absolute: "MEGAPARC — Real Estate Investment, Development & Asset Management",
  },
  description:
    "MEGAPARC develops, owns and manages real estate assets with a long-term investment perspective.",
  alternates: {
    canonical: "/en",
    languages: {
      "ro-MD": "/",
      en: "/en",
    },
  },
  openGraph: {
    title: "MEGAPARC — We Build the Future",
    description: "Real Estate Investment · Development · Asset Management",
    type: "website",
    locale: "en",
    siteName: "MEGAPARC",
    url: "/en",
    images: ["/assets/portfolio/dacia-31.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "MEGAPARC — We Build the Future",
    description: "Real Estate Investment · Development · Asset Management",
    images: ["/assets/portfolio/dacia-31.webp"],
  },
};

export default function Page() {
  return <HomePage locale="en" />;
}
