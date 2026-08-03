/**
 * Host-aware Google Analytics 4 configuration for the multi-hub monorepo.
 *
 * Move stream (www.movetrusthub.com):
 *   Measurement ID: G-433BDVV8MJ (stream ID 15104924379)
 *
 * Env (Vercel Production):
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID_MOVE=G-433BDVV8MJ   (preferred)
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-433BDVV8MJ        (legacy alias for Move only)
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID_INSURANCE=G-…       (optional, ITH only)
 *
 * Never send Move hits from insurancetrusthub.com, or ITH hits into the Move stream.
 */

import { isInsuranceStandaloneHost } from '@/lib/hub/domains';

/** Canonical Move Trust Hub web stream (www.movetrusthub.com). */
export const GA_MEASUREMENT_ID_MOVE_CANONICAL = 'G-433BDVV8MJ';

/**
 * Known bad value that was baked into Production env and killed GA for ~30 days.
 * Single-V typo — Google treats it as a different (empty) stream.
 */
const KNOWN_MOVE_ID_TYPOS = new Set([
  'G-433BDV8MJ', // missing one V
  'G-433BDVV8M', // truncated
]);

export type GaHub = 'move' | 'insurance' | 'lender';

function normalizeMeasurementId(raw: string | undefined | null): string {
  return (raw ?? '').trim().toUpperCase();
}

function isValidGaId(id: string): boolean {
  return /^G-[A-Z0-9]+$/.test(id);
}

/** Repair known Move typos; leave unknown IDs alone. */
export function sanitizeMoveMeasurementId(raw: string): string {
  const id = normalizeMeasurementId(raw);
  if (!id) return GA_MEASUREMENT_ID_MOVE_CANONICAL;
  if (KNOWN_MOVE_ID_TYPOS.has(id)) return GA_MEASUREMENT_ID_MOVE_CANONICAL;
  if (id === GA_MEASUREMENT_ID_MOVE_CANONICAL) return id;
  if (isValidGaId(id)) return id;
  return GA_MEASUREMENT_ID_MOVE_CANONICAL;
}

function readMoveIdFromEnv(): string {
  const preferred =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID_MOVE?.trim() ||
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ||
    process.env.NEXT_PUBLIC_GA4_ID?.trim() ||
    '';
  return sanitizeMoveMeasurementId(preferred || GA_MEASUREMENT_ID_MOVE_CANONICAL);
}

function readInsuranceIdFromEnv(): string | null {
  const raw =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID_INSURANCE?.trim() ||
    process.env.NEXT_PUBLIC_GA4_ID_INSURANCE?.trim() ||
    '';
  const id = normalizeMeasurementId(raw);
  if (!id || !isValidGaId(id)) return null;
  // Never allow the Move stream (or its typo) on the insurance host.
  if (id === GA_MEASUREMENT_ID_MOVE_CANONICAL || KNOWN_MOVE_ID_TYPOS.has(id)) {
    return null;
  }
  return id;
}

/**
 * Resolve measurement ID for a request host.
 * - Move / lender paths on movetrusthub.com → Move stream
 * - insurancetrusthub.com → Insurance stream only (no Move fallback)
 */
export function resolveGaMeasurementIdForHost(
  host: string | null | undefined
): { measurementId: string | null; hub: GaHub } {
  if (isInsuranceStandaloneHost(host)) {
    return { measurementId: readInsuranceIdFromEnv(), hub: 'insurance' };
  }
  return { measurementId: readMoveIdFromEnv(), hub: 'move' };
}

/** @deprecated Use resolveGaMeasurementIdForHost — kept for scripts that only target Move. */
export const GA_MEASUREMENT_ID = readMoveIdFromEnv();

export const GA_MEASUREMENT_ID_FALLBACK = GA_MEASUREMENT_ID_MOVE_CANONICAL;

/**
 * Cross-domain linker for Move only (legacy apex domains that 308 into Move).
 * Do NOT include insurancetrusthub.com — ITH is a separate property.
 */
export const GA_CROSS_DOMAIN_LINKS_MOVE = [
  'movetrusthub.com',
  'www.movetrusthub.com',
  'lendertrusthub.com',
  'www.lendertrusthub.com',
] as const;

/** @deprecated Prefer GA_CROSS_DOMAIN_LINKS_MOVE */
export const GA_CROSS_DOMAIN_LINKS = GA_CROSS_DOMAIN_LINKS_MOVE;

export function isGaConfigured(id?: string | null): boolean {
  const candidate = id ?? GA_MEASUREMENT_ID;
  return Boolean(candidate && isValidGaId(candidate));
}

/** Dev-only warnings — never log secrets. */
export function warnIfGaMisconfigured(resolvedId?: string | null, hub?: GaHub): void {
  if (process.env.NODE_ENV === 'production') return;
  const id = resolvedId ?? GA_MEASUREMENT_ID;
  if (hub === 'insurance' && !id) {
    console.info(
      '[GA4] Insurance host: NEXT_PUBLIC_GA_MEASUREMENT_ID_INSURANCE unset — no Move stream loaded (correct).'
    );
    return;
  }
  const envMove =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID_MOVE?.trim() ||
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ||
    '';
  if (envMove && KNOWN_MOVE_ID_TYPOS.has(normalizeMeasurementId(envMove))) {
    console.warn(
      '[GA4] Env had known Move ID typo — sanitized to',
      GA_MEASUREMENT_ID_MOVE_CANONICAL
    );
  }
  if (!isGaConfigured(id)) {
    console.warn('[GA4] Invalid or missing Measurement ID for hub', hub, id);
  }
}
