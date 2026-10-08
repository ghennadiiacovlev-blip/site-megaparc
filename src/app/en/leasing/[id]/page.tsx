import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UnitPage } from "@/components/pages/unit";
import { getSpace, publicSpaces } from "@/content/source";
import { spaceMetadata } from "@/lib/seo";

export const dynamicParams = false;

/** Only published spaces get a page: a space set to LEASED in the CMS has none. */
export function generateStaticParams() {
  return publicSpaces.map((space) => ({ id: space.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return spaceMetadata("en", id);
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const space = getSpace(id);
  if (!space) notFound();
  return <UnitPage locale="en" space={space} />;
}
