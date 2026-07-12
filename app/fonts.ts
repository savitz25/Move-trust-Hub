import { Geist, Geist_Mono } from 'next/font/google';

/**
 * LCP weight is self-hosted in public/fonts + critical.css (stable preload path).
 * next/font loads 400/700 after first paint — no second blocking font for heroes.
 */
export const geistSansBody = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  fallback: ['system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

export const geistSansBold = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
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

export const siteFontVariables = [
  geistSansBody.variable,
  geistSansBold.variable,
  geistMono.variable,
].join(' ');