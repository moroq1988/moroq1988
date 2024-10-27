import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // ビルド時の型チェックを有効化
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
