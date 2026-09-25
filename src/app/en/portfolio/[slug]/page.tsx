import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AssetDetailPage } from "@/components/asset-detail";
import { portfolioAssets } from "@/lib/site-data";
export function generateStaticParams(){ return portfolioAssets.map((asset)=>({slug:asset.slug})); }

export async function generateMetadata({params}:{params:Promise<{slug:string}>}): Promise<Metadata> {
  const {slug}=await params;
  const asset=portfolioAssets.find((item)=>item.slug===slug);
  if(!asset) return {};
  return {
    title: { absolute: `${asset.name} — MEGAPARC Portfolio` },
    description: `${asset.name} — asset in the public MEGAPARC portfolio.`,
    alternates: {
      canonical: `/en/portfolio/${asset.slug}`,
      languages: {
        "ro-MD": `/portfolio/${asset.slug}`,
        en: `/en/portfolio/${asset.slug}`,
      },
    },
  };
}
export default async function Page({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;
  const asset=portfolioAssets.find((item)=>item.slug===slug);
  if(!asset) notFound();
  return <AssetDetailPage locale="en" asset={asset} />;
}
