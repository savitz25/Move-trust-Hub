/**
 * GA4 — Move Trust Hub production stream (www.movetrusthub.com).
 * Stream ID: 15104924379
 * Override via NEXT_PUBLIC_GA_MEASUREMENT_ID in Vercel if the stream changes.
 */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ||
  process.env.NEXT_PUBLIC_GA4_ID?.trim() ||
  'G-433BDV8MJ';

/** Cross-domain linker — preserves GA4 sessions across 308 legacy → movetrusthub.com */
export const GA_CROSS_DOMAIN_LINKS = [
  'movetrusthub.com',
  'www.movetrusthub.com',
  'lendertrusthub.com',
  'www.lendertrusthub.com',
  'insurancetrusthub.com',
  'www.insurancetrusthub.com',
] as const;

export function isGaConfigured(): boolean {
  return /^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID);
}