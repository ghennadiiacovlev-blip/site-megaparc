import type { Metadata } from "next";
import { ProjectsPage } from "@/components/pages/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("ro", "projects", "/projects");

export default function Page() {
  return <ProjectsPage locale="ro" />;
}
