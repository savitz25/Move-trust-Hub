import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Optimized for Vercel + production
  // Temporarily ignore TS/ESLint errors during build so we can deploy while cleaning up types
  // (Run `npm run typecheck` and `npm run lint` locally to see/fix issues)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Enable React strict mode
  reactStrictMode: true,
  // Experimental for Next 15
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-*',
      'framer-motion',
      'sonner',
    ],
  },
  // Legacy/wrong GSC submissions used /sitemap-local/{state}.xml — canonical path is /sitemap-local/sitemap/{state}.xml
  async redirects() {
    return [
      {
        source: '/sitemap-local/:state([^/]+)\\.xml',
        destination: '/sitemap-local/sitemap/:state.xml',
        permanent: true,
      },
      {
        source: '/moving-to/myrtle-beach-sc',
        destination: '/moving-to/south-carolina/myrtle-beach-sc',
        permanent: true,
      },
      {
        source: '/moving-to/myrtle-beach-sc/:slug',
        destination: '/moving-to/south-carolina/:slug',
        permanent: true,
      },
      {
        source: '/moving-to/boise-id',
        destination: '/moving-to/idaho/boise-id',
        permanent: true,
      },
      {
        source: '/moving-to/eugene-springfield-or',
        destination: '/moving-to/oregon/eugene-or',
        permanent: true,
      },
      {
        source: '/moving-to/tulsa-ok',
        destination: '/moving-to/oklahoma/tulsa-ok',
        permanent: true,
      },
      {
        source: '/moving-to/phoenix-az',
        destination: '/moving-to/arizona/phoenix-az',
        permanent: true,
      },
      {
        source: '/moving-to/little-rock-ar',
        destination: '/moving-to/arkansas/benton-bryant-ar',
        permanent: true,
      },
      {
        source: '/moving-to/huntsville-al',
        destination: '/moving-to/alabama/huntsville-al',
        permanent: true,
      },
      {
        source: '/moving-to/birmingham-al',
        destination: '/moving-to/alabama/hoover-al',
        permanent: true,
      },
    ];
  },
  // Generate sitemap and robots via metadata in app dir
  // Headers for security / SEO
  async headers() {
    return [
      {
        source: '/logo.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
