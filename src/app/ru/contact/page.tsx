import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("ru", "contact", "/contact");

export default function Page() {
  return <ContactPage locale="ru" />;
}
