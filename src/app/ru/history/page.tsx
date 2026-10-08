import type { Metadata } from "next";
import { HistoryPage } from "@/components/pages/history";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("ru", "history", "/history");

export default function Page() {
  return <HistoryPage locale="ru" />;
}
