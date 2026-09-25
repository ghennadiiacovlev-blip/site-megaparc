import type { Metadata } from "next";
import { OpportunitiesPage } from "@/components/pages/opportunities";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("en", "opportunities", "/opportunities");

export default function Page() {
  return <OpportunitiesPage locale="en" />;
}
