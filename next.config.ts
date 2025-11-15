import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel optimizations
  poweredByHeader: false,
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
