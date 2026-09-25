import type { Metadata } from "next";
import { VatraPage } from "@/components/pages/vatra";
export const metadata: Metadata = { title: { absolute: "VATRA — MEGAPARC Development" } };
export default function Page(){ return <VatraPage locale="en" />; }
