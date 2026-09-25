import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AssetDetailPage } from "@/components/asset-detail";
import { getAsset, portfolioAssets } from "@/lib/assets";
import { assetMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioAssets.map((asset) => ({ slug: asset.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return assetMetadata("ro", slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const asset = getAsset(slug);
  if (!asset) notFound();
  return <AssetDetailPage locale="ro" asset={asset} />;
}
