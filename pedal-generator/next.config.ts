import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel optimizations
  poweredByHeader: false,
  compress: true,
  // Production optimizations
  swcMinify: true,
  // Image optimization (Vercel handles this automatically)
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
