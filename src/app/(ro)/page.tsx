import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("ro", "home", "/");

export default function Page() {
  return <HomePage locale="ro" />;
}
