import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/components/project-detail";
import { developmentProjects, getProject } from "@/lib/assets";
import { projectMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return developmentProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return projectMetadata("en", slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <ProjectDetailPage locale="en" project={project} />;
}
