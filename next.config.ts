import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ❌ Ignore ESLint errors during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // (optional) ignore TS errors during build if you want quick deploys
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
