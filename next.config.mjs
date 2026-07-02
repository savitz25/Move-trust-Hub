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