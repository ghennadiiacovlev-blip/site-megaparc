import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/contact";
export const metadata: Metadata = { title: { absolute: "Contact MEGAPARC" } };
export default function Page(){ return <ContactPage locale="en" />; }
