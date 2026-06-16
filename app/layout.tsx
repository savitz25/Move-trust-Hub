import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';
import { Suspense } from 'react';
import { Chatbot } from '@/components/chatbot';

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
  metadataBase: new URL('https://www.movetrusthub.com'),
  title: {
    default: 'Move Trust Hub | Trusted Directory for Interstate & Long-Distance Movers',
    template: '%s | Move Trust Hub',
  },
  description: 'Find trusted interstate moving companies. Compare movers by reputation, price, reviews & FMCSA data. Get free quotes and book with confidence at Move Trust Hub.',
  keywords: [
    'interstate movers',
    'moving companies USA',
    'best interstate moving companies',
    'compare moving companies',
    'FMCSA licensed movers',
    'long distance movers',
    'trusted movers directory',
    'move trust hub',
    'Allied Van Lines',
    'United Van Lines',
    'moving reviews',
  ],
  authors: [{ name: 'Move Trust Hub' }],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Move Trust Hub — Trusted Directory & Reviews for Interstate Movers',
    description: 'Research, compare, and choose reputable interstate moving companies with verified reviews, FMCSA data, and transparent pricing. Your hub for trusted movers.',
    images: [{ url: '/logo.svg' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Move Trust Hub',
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
    { media: '(prefers-color-scheme: dark)', color: '#0b1629' },
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
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
