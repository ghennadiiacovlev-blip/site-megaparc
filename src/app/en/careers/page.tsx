import type { Metadata } from "next";
import { CareersPage } from "@/components/pages/careers";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("en", "careers", "/careers");

export default function Page() {
  return <CareersPage locale="en" />;
}
