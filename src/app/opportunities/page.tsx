import type { Metadata } from "next";
import { OpportunitiesPage } from "@/components/pages/opportunities";
export const metadata: Metadata = { title: "Disponibilități" };
export default function Page(){ return <OpportunitiesPage locale="ro" />; }
