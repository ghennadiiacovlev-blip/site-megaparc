import type { Metadata } from "next";
import { PartnershipPage } from "@/components/pages/partnership";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("ro", "partnership", "/partnership");

export default function Page() {
  return <PartnershipPage locale="ro" />;
}
