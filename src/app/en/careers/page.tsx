import type { Metadata } from "next";
import { CareersPage } from "@/components/pages/careers";
export const metadata: Metadata = { title: { absolute: "Careers at MEGAPARC" } };
export default function Page(){ return <CareersPage locale="en" />; }
