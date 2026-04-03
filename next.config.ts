import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development'

const nextConfig: NextConfig = {
  // Disable static export in development to support API routes
  // For production builds, set OUTPUT=export before building
  output: isDev ? undefined : 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'static.shared.propertyfinder.ae',
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
