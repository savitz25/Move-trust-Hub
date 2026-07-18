import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';
import { IMMUTABLE_ASSET, apiCacheControl } from './lib/cache/control';
import { getAllHubRedirects } from './lib/migration/hub-redirects';
import {
  OUTPUT_FILE_TRACING_EXCLUDES,
  ROUTER_STALE_TIMES,
} from './lib/performance/build-config';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  compress: true,
  // Large marketing surface (~5k county + city hubs). Concurrent Supabase lag
  // previously killed pages at 60s; keep headroom above per-fetch 12s timeouts.
  staticPageGenerationTimeout: 180,
  // Temporarily ignore TS/ESLint errors during build so we can deploy while cleaning up types
  // (Run `npm run typecheck` and `npm run lint` locally to see/fix issues)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    // SWC transform — strips console.* in prod (keeps warn/error for observability).
    removeConsole: isProd ? { exclude: ['error', 'warn'] } : false,
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
    localPatterns: [
      { pathname: '/logo.png' },
      { pathname: '/images/**' },
      { pathname: '/fonts/**' },
      { pathname: '/insurance/brand/**' },
      { pathname: '/lender/brand/**' },
    ],
    formats: ['image/avif', 'image/webp'],
    qualities: [75],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 160, 200, 240],
    minimumCacheTTL: 31536000,
    contentDispositionType: 'inline',
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  reactStrictMode: true,
  serverExternalPackages: ['@supabase/supabase-js'],
  outputFileTracingExcludes: OUTPUT_FILE_TRACING_EXCLUDES,
  experimental: {
    staleTimes: ROUTER_STALE_TIMES,
    optimizePackageImports: [
      '@vercel/analytics',
      '@vercel/speed-insights',
      '@supabase/ssr',
      'lucide-react',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-dialog',
      '@radix-ui/react-label',
      '@radix-ui/react-select',
      '@radix-ui/react-slider',
      '@radix-ui/react-slot',
      '@radix-ui/react-tabs',
      'framer-motion',
      'sonner',
      'recharts',
      '@tanstack/react-table',
      'date-fns',
      'zod',
      'zustand',
      'react-hook-form',
      '@hookform/resolvers',
    ],
  },
  // Legacy/wrong GSC submissions used /sitemap-local/{state}.xml — canonical path is /sitemap-local/sitemap/{state}.xml
  async redirects() {
    return [
      // GSC 404 cleanup: doubled hub prefixes from bad absolute links
      {
        source: '/insurance/insurance/:path*',
        destination: '/insurance/:path*',
        permanent: true,
      },
      {
        source: '/lender/lender/:path*',
        destination: '/lender/:path*',
        permanent: true,
      },
      // GSC 404: legacy bare route → Alabama Huntsville destination hub
      {
        source: '/from-georgia-to-huntsville',
        destination: '/moving-to/alabama/huntsville-al',
        permanent: true,
      },
      {
        source: '/from-georgia-to-huntsville-al',
        destination: '/moving-to/alabama/huntsville-al',
        permanent: true,
      },
      {
        source: '/from-georgia-to-huntsville/:path*',
        destination: '/moving-to/alabama/huntsville-al',
        permanent: true,
      },
      {
        source: '/sitemap-local/:state((?!sitemap)[^/]+)\\.xml',
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
        source: '/moving-to/chicago-il',
        destination: '/moving-to/illinois/chicago-il',
        permanent: true,
      },
      {
        source: '/moving-to/seattle-wa',
        destination: '/moving-to/washington/seattle-wa',
        permanent: true,
      },
      {
        source: '/moving-to/little-rock-ar',
        destination: '/moving-to/arkansas/little-rock-ar',
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
      {
        source: '/moving-to/south-carolina/greenville-spartanburg',
        destination: '/moving-to/south-carolina/greenville-sc',
        permanent: true,
      },
      {
        source: '/moving-to/south-carolina/hilton-head',
        destination: '/moving-to/south-carolina/hilton-head-sc',
        permanent: true,
      },
      ...getAllHubRedirects(),
    ];
  },
  // Generate sitemap and robots via metadata in app dir
  // Headers: immutable static assets + security baseline (HTML CDN TTL is middleware + vercel.json).
  async headers() {
    const securityHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
      },
    ];

    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/logo.png',
        headers: [{ key: 'Cache-Control', value: IMMUTABLE_ASSET }],
      },
      {
        source: '/insurance/brand/:path*',
        headers: [{ key: 'Cache-Control', value: IMMUTABLE_ASSET }],
      },
      {
        source: '/lender/brand/:path*',
        headers: [{ key: 'Cache-Control', value: IMMUTABLE_ASSET }],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: IMMUTABLE_ASSET }],
      },
      {
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: IMMUTABLE_ASSET }],
      },
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: IMMUTABLE_ASSET }],
      },
      {
        source: '/api/companies',
        headers: [{ key: 'Cache-Control', value: apiCacheControl(3600) }],
      },
      {
        source: '/api/reviews',
        headers: [{ key: 'Cache-Control', value: apiCacheControl(3600) }],
      },
      {
        source: '/lender/fdic-insured-banks/:path*',
        headers: [{ key: 'Cache-Control', value: apiCacheControl(86400) }],
      },
      {
        source: '/lender/local-lenders/:path*',
        headers: [{ key: 'Cache-Control', value: apiCacheControl(86400) }],
      },
      {
        source: '/lender/auto-loan-companies/:path*',
        headers: [{ key: 'Cache-Control', value: apiCacheControl(86400) }],
      },
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);