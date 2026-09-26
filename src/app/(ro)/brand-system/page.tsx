import type { Metadata } from "next";
import { BrandSystemPage } from "@/components/pages/brand-system";
import { pageMetadata } from "@/lib/seo";

/** Internal OWNER review route. noindex; not in navigation; exclude from production unless approved. */
export const metadata: Metadata = pageMetadata("ro", "brandSystem", "/brand-system");

export default function Page() {
  return <BrandSystemPage locale="ro" />;
}
