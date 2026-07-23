/**
 * Catalog / listing description QA — reject scrape placeholders and empty blurbs.
 */

const PLACEHOLDER_PATTERNS: RegExp[] = [
  /^this is my company\.?$/i,
  /\bthis is my company\b/i,
  /^test company\.?$/i,
  /\btest company\b/i,
  /^lorem ipsum\b/i,
  /^placeholder\b/i,
  /^sample company\b/i,
  /^xxx+$/i,
  /^n\/?a$/i,
  /^tbd$/i,
  /^todo\b/i,
  /^coming soon\.?$/i,
];

/** True when a listing description is a known placeholder or effectively empty. */
export function isPlaceholderMoverDescription(description: string | undefined | null): boolean {
  const raw = (description ?? '').trim();
  if (raw.length === 0) return true;
  if (raw.length < 12) return true;
  const lower = raw.toLowerCase();
  return PLACEHOLDER_PATTERNS.some((re) => re.test(lower));
}

/** Safe fallback blurb when a placeholder or empty description is rejected. */
export function buildSafeMoverDescription(
  name: string,
  usdotNumber?: string | null
): string {
  const usdot = (usdotNumber ?? '').replace(/\D/g, '');
  if (usdot) {
    return `${name} — FMCSA-licensed carrier profile in our independent directory (USDOT ${usdot}).`;
  }
  return `${name} — FMCSA-licensed carrier profile in our independent directory.`;
}

/**
 * Return a display-safe short description (never placeholder/scrape artifacts).
 */
export function sanitizeMoverDescription(
  name: string,
  description: string | undefined | null,
  usdotNumber?: string | null
): string {
  if (isPlaceholderMoverDescription(description)) {
    return buildSafeMoverDescription(name, usdotNumber);
  }
  return (description ?? '').trim();
}
