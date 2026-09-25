import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("ru", "home", "/");

export default function Page() {
  return <HomePage locale="ru" />;
}
