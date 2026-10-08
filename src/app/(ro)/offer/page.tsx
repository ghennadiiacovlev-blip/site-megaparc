import type { Metadata } from "next";
import { OfferPage } from "@/components/pages/offer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("ro", "offer", "/offer");

export default function Page() {
  return <OfferPage locale="ro" />;
}
