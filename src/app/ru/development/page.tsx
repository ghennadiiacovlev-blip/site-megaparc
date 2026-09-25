import type { Metadata } from "next";
import { DevelopmentIndexPage } from "@/components/pages/development";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("ru", "development", "/development");

export default function Page() {
  return <DevelopmentIndexPage locale="ru" />;
}
