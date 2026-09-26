import type { Metadata } from "next";
import { ApproachPage } from "@/components/pages/approach";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("ro", "approach", "/approach");

export default function Page() {
  return <ApproachPage locale="ro" />;
}
