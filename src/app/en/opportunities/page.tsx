import type { Metadata } from "next";
import { OpportunitiesPage } from "@/components/pages/opportunities";
export const metadata: Metadata = { title: { absolute: "MEGAPARC Opportunities" } };
export default function Page(){ return <OpportunitiesPage locale="en" />; }
