import 'server-only';

import type { Json } from '@/types/supabase';
import type { GooglePlacesData, PublicScrapeData } from '@/lib/verification/types';

const MAX_JSONB_BYTES = 120_000;

function byteLength(value: string): number {
  return Buffer.byteLength(value, 'utf8');
}

/**
 * Ensure a value is safe for Postgres JSONB: no undefined, finite numbers only,
 * and within a reasonable size budget.
 */
export function toJsonbColumn(
  value: unknown,
  options?: { maxBytes?: number; label?: string }
): Json | null {
  if (value == null) return null;

  const maxBytes = options?.maxBytes ?? MAX_JSONB_BYTES;

  try {
    const serialized = JSON.stringify(value, (_key, v) => {
      if (v === undefined) return null;
      if (typeof v === 'number' && !Number.isFinite(v)) return null;
      return v;
    });

    if (!serialized || serialized === 'null') return null;

    if (byteLength(serialized) > maxBytes) {
      const parsed = JSON.parse(serialized) as Record<string, unknown>;
      delete parsed.raw_response;
      const trimmed = JSON.stringify(parsed);
      if (byteLength(trimmed) <= maxBytes) {
        return JSON.parse(trimmed) as Json;
      }
      return {
        _truncated: true,
        _label: options?.label ?? 'payload',
        preview: String(serialized).slice(0, 2000),
      } as Json;
    }

    return JSON.parse(serialized) as Json;
  } catch {
    return null;
  }
}

export function toGoogleDataColumn(data: GooglePlacesData | null | undefined): Json | null {
  if (!data) return null;
  return toJsonbColumn(data, { label: 'google_data' });
}

export function toPublicScrapeColumn(
  data: PublicScrapeData | null | undefined
): Json | null {
  if (!data) return null;
  return toJsonbColumn(data, { label: 'public_scrape_data' });
}

export function isMissingEnrichmentColumnError(message?: string | null): boolean {
  if (!message) return false;
  const lower = message.toLowerCase();
  return (
    lower.includes('google_data') ||
    lower.includes('public_scrape_data') ||
    lower.includes('schema cache') ||
    lower.includes('column') && lower.includes('does not exist')
  );
}

export function suggestionInsertErrorMessage(error: {
  code?: string;
  message?: string;
}): string {
  if (error.code === '23505') {
    return 'This company is already pending review. We will add it shortly.';
  }
  if (error.code === '22P02') {
    return 'We could not store the verification snapshot. Please try again in a moment.';
  }
  if (error.code === 'PGRST204' || isMissingEnrichmentColumnError(error.message)) {
    return 'Suggestion saved, but verification columns need a database migration. Contact support if this persists.';
  }
  if (error.message?.toLowerCase().includes('payload too large')) {
    return 'Verification data was too large to save. Please try again or submit with fewer details.';
  }
  return 'Failed to save your suggestion. Please try again.';
}