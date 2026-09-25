import type { Metadata } from "next";
import { PortfolioIndexPage } from "@/components/pages/portfolio";
export const metadata: Metadata = { title: { absolute: "MEGAPARC Portfolio" } };
export default function Page(){ return <PortfolioIndexPage locale="en" />; }
