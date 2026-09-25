import type { Metadata } from "next";
import { PortfolioIndexPage } from "@/components/pages/portfolio";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("ru", "portfolio", "/portfolio");

export default function Page() {
  return <PortfolioIndexPage locale="ru" />;
}
