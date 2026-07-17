import { Geist, Geist_Mono } from 'next/font/google';

/**
 * LCP weight (600) is self-hosted in public/fonts + critical.css.
 * Single next/font instance for body weights — avoid overwriting --font-geist-sans.
 * size-adjusted fallback reduces CLS when webfonts swap in.
 */
export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: false,
  adjustFontFallback: true,
  fallback: ['system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

/** Mono for DOT/license codes — optional display, admin/deferred UI only. */
export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400'],
  display: 'optional',
  preload: false,
  adjustFontFallback: true,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
});

export const siteFontVariables = [geistSans.variable, geistMono.variable].join(' ');
