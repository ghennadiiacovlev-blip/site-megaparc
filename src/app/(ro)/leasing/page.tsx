import type { Metadata } from "next";
import { LeasingPage } from "@/components/pages/leasing";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("ro", "leasing", "/leasing");

export default function Page() {
  return <LeasingPage locale="ro" />;
}
