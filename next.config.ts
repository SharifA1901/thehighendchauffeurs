import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Do NOT set output: 'export'
  images: { unoptimized: false },
  experimental: {},
};

export default nextConfig;
