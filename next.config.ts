import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
