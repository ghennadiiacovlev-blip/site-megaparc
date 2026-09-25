import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/about";
export const metadata: Metadata = { title: "Despre MEGAPARC" };
export default function Page(){ return <AboutPage locale="ro" />; }
