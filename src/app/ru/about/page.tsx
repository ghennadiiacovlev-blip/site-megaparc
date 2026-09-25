import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/about";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("ru", "about", "/about");

export default function Page() {
  return <AboutPage locale="ru" />;
}
