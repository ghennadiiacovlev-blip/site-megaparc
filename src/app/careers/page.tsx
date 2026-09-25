import type { Metadata } from "next";
import { CareersPage } from "@/components/pages/careers";
export const metadata: Metadata = { title: "Cariere" };
export default function Page(){ return <CareersPage locale="ro" />; }
