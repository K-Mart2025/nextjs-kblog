import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.pexels.com', "localhost"],
  },
  output: 'standalone',
};

export default nextConfig;
