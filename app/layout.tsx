import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';
import { Suspense } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://interstatemoversusa.com'),
  title: {
    default: 'InterstateMovers USA | Free Quotes from Top Long-Distance Movers',
    template: '%s | InterstateMovers USA',
  },
  description: 'Get free personalized quotes from trusted interstate moving companies. Compare movers, estimate your move with our free calculator, and book with confidence.',
  keywords: [
    'interstate movers',
    'moving companies USA',
    'best interstate moving companies',
    'compare moving companies',
    'FMCSA licensed movers',
    'long distance movers',
    'Allied Van Lines',
    'United Van Lines',
    'North American Van Lines',
    'moving reviews',
  ],
  authors: [{ name: 'InterstateMovers USA' }],
  openGraph: {
    title: 'InterstateMovers USA — Trusted Directory & Reviews for Interstate Movers',
    description: 'Research, compare, and choose reputable interstate moving companies with verified reviews, FMCSA data, and transparent pricing.',
    images: [{ url: '/og-image.png' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InterstateMovers USA',
    description: 'The most trusted directory for comparing interstate moving companies.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a1421' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Suspense fallback={<div className="h-96" />}>
                {children}
              </Suspense>
            </main>
            <Footer />
          </div>
          <Toaster position="top-center" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
