import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/about";
export const metadata: Metadata = { title: { absolute: "About MEGAPARC — Investment Platform" } };
export default function Page(){ return <AboutPage locale="en" />; }
