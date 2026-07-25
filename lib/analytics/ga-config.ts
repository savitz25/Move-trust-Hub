/**
 * GA4 — Move Trust Hub production stream (www.movetrusthub.com).
 * Prefer NEXT_PUBLIC_GA_MEASUREMENT_ID in Vercel (and local .env).
 * Fallback stream ID used only when env is unset so production never silently drops tracking.
 */
const fromEnv =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ||
  process.env.NEXT_PUBLIC_GA4_ID?.trim() ||
  '';

/** Production Measurement ID (www.movetrusthub.com web stream). */
export const GA_MEASUREMENT_ID_FALLBACK = 'G-433BDVV8MJ';

export const GA_MEASUREMENT_ID = fromEnv || GA_MEASUREMENT_ID_FALLBACK;

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

/** Dev-only warning when the ID is missing or malformed. */
export function warnIfGaMisconfigured(): void {
  if (process.env.NODE_ENV === 'production') return;
  if (!fromEnv) {
    console.warn(
      '[GA4] NEXT_PUBLIC_GA_MEASUREMENT_ID is unset — using fallback',
      GA_MEASUREMENT_ID_FALLBACK
    );
  } else if (!isGaConfigured()) {
    console.warn(
      '[GA4] Invalid Measurement ID (expected G-XXXXXXXX). Got:',
      fromEnv
    );
  }
}
