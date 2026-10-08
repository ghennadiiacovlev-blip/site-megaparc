import type { Metadata } from "next";
import { LeasingPage } from "@/components/pages/leasing";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("ru", "leasing", "/leasing");

export default function Page() {
  return <LeasingPage locale="ru" />;
}
