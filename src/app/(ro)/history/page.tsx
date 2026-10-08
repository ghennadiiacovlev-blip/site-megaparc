import type { Metadata } from "next";
import { HistoryPage } from "@/components/pages/history";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("ro", "history", "/history");

export default function Page() {
  return <HistoryPage locale="ro" />;
}
