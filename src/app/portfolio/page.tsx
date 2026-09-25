import type { Metadata } from "next";
import { PortfolioIndexPage } from "@/components/pages/portfolio";
export const metadata: Metadata = { title: "Portofoliu" };
export default function Page(){ return <PortfolioIndexPage locale="ro" />; }
