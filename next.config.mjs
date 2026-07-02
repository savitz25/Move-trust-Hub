/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-*', 'framer-motion', 'sonner'],
  },
  /**
   * No basePath — Move at `/`, Lender at `/lender/*`, Insurance at `/insurance/*`
   * via App Router segment folders.
   */
  async redirects() {
    return [
      {
        source: '/local-lenders',
        destination: '/lender/local-lenders',
        permanent: true,
      },
      {
        source: '/local-lenders/:path*',
        destination: '/lender/local-lenders/:path*',
        permanent: true,
      },
      {
        source: '/fdic-insured-banks',
        destination: '/lender/fdic-insured-banks',
        permanent: true,
      },
      {
        source: '/auto-loan-companies',
        destination: '/lender/auto-loan-companies',
        permanent: true,
      },
      {
        source: '/calculators',
        destination: '/lender/calculators',
        permanent: true,
      },
      {
        source: '/directory/:path*',
        destination: '/insurance/directory/:path*',
        permanent: true,
      },
      {
        source: '/directory',
        destination: '/insurance/directory',
        permanent: true,
      },
      {
        source: '/hubs/:path*',
        destination: '/insurance/hubs/:path*',
        permanent: true,
      },
      {
        source: '/hubs',
        destination: '/insurance/hubs',
        permanent: true,
      },
      {
        source: '/fdic-insured-banks/:path*',
        destination: '/lender/fdic-insured-banks/:path*',
        permanent: true,
      },
      {
        source: '/auto-loan-companies/:path*',
        destination: '/lender/auto-loan-companies/:path*',
        permanent: true,
      },
      {
        source: '/lenders/:path*',
        destination: '/lender/lenders/:path*',
        permanent: true,
      },
      {
        source: '/calculators/:path*',
        destination: '/lender/calculators/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.lendertrusthub.com' }],
        destination: 'https://www.movetrusthub.com/lender/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'lendertrusthub.com' }],
        destination: 'https://www.movetrusthub.com/lender/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.insurancetrusthub.com' }],
        destination: 'https://www.movetrusthub.com/insurance/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'insurancetrusthub.com' }],
        destination: 'https://www.movetrusthub.com/insurance/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;