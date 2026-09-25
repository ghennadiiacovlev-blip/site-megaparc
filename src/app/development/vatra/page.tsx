import type { Metadata } from "next";
import { VatraPage } from "@/components/pages/vatra";
export const metadata: Metadata = { title: "VATRA — Development" };
export default function Page(){ return <VatraPage locale="ro" />; }
