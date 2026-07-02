import type { Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { HubShell } from '@/components/hub/hub-shell';
import { Suspense } from 'react';
import { DeferredWidgets } from '@/components/performance/deferred-widgets';
import { DeferredAnalytics } from '@/components/performance/deferred-analytics';
import { DeferredGtag } from '@/components/performance/deferred-gtag';
import { rootLayoutMetadata } from '@/lib/seo/site-metadata';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  preload: false,
  adjustFontFallback: true,
});

export const metadata = rootLayoutMetadata;

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <HubShell>
          <Suspense fallback={<div className="h-96" />}>{children}</Suspense>
        </HubShell>
        <DeferredWidgets />
        <DeferredGtag />
        <DeferredAnalytics />
      </body>
    </html>
  );
}