import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Three locale root layouts (RO / RU / EN) need a global 404 for unmatched URLs.
  experimental: {
    globalNotFound: true,
  },
  ...(isGitHubPages
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath,
        images: {
          unoptimized: true,
        },
      }
    : {}),
};

export default nextConfig;
