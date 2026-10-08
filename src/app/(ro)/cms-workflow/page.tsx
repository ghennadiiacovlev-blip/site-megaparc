import type { Metadata } from "next";
import { CmsWorkflowPage } from "@/components/pages/cms-workflow";
import { pageMetadata } from "@/lib/seo";

/** Internal CMS workflow prototype. noindex; not in navigation; exclude from production unless approved. */
export const metadata: Metadata = pageMetadata("ro", "cmsWorkflow", "/cms-workflow");

export default function Page() {
  return <CmsWorkflowPage locale="ro" />;
}
