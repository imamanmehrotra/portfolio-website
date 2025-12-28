import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scfzig30xveewmt3.public.blob.vercel-storage.com',
        pathname: '/portfolio_icons/**',
      },
    ],
  },
  output: 'standalone',
};

export default nextConfig;
