import type { Metadata } from "next";
import { DevelopmentIndexPage } from "@/components/pages/development";
export const metadata: Metadata = { title: "Dezvoltare" };
export default function Page(){ return <DevelopmentIndexPage locale="ro" />; }
