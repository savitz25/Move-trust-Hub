import { extractEntityType } from '@/lib/fmcsa/carrier-fields';
import type { ServiceType } from '@/types';

/** Shown in Licensing & Compliance when FMCSA data exists but type is unknown. */
export const ENTITY_TYPE_NOT_AVAILABLE = 'Not Available';

const ENTITY_TYPE_LABELS: Record<string, string> = {
  BROKER: 'Broker',
  CARRIER: 'Carrier',
  'CARRIER/BROKER': 'Carrier/Broker',
  'BROKER/CARRIER': 'Carrier/Broker',
};

/** Normalize FMCSA entity type strings for profile display. */
export function formatEntityTypeLabel(raw: string | null | undefined): string | null {
  if (!raw?.trim()) return null;

  const trimmed = raw.trim();
  const key = trimmed.toUpperCase().replace(/\s+/g, '');
  if (ENTITY_TYPE_LABELS[key]) return ENTITY_TYPE_LABELS[key];

  if (/^broker$/i.test(trimmed)) return 'Broker';
  if (/^carrier$/i.test(trimmed)) return 'Carrier';
  if (/carrier\s*\/\s*broker/i.test(trimmed)) return 'Carrier/Broker';
  if (trimmed.toLowerCase() === 'not available') return ENTITY_TYPE_NOT_AVAILABLE;

  return trimmed;
}

/** Last-resort fallback from directory service tags. */
export function deriveEntityTypeFromServices(
  services: ServiceType[] | undefined
): string | null {
  if (!services?.length) return null;
  if (services.includes('Carrier / Broker')) return 'Carrier/Broker';

  const hasBroker = services.includes('Broker');
  const hasCarrier = services.includes('Carrier');
  if (hasBroker && hasCarrier) return 'Carrier/Broker';
  if (hasBroker) return 'Broker';
  if (hasCarrier) return 'Carrier';
  return null;
}

export type EntityTypeResolutionInput = {
  entityType?: string | null;
  fmcsaRaw?: Record<string, unknown> | null;
  services?: ServiceType[];
};

/**
 * Resolve the best entity type label for Licensing & Compliance.
 * Priority: stored field → fmcsa_raw census → fmcsa_raw authority → services.
 */
export function resolveEntityTypeForDisplay(
  input: EntityTypeResolutionInput
): string | null {
  const fromStored = formatEntityTypeLabel(input.entityType);
  if (fromStored) return fromStored;

  const raw = input.fmcsaRaw;
  if (raw && typeof raw === 'object') {
    const fromFmcsa = formatEntityTypeLabel(extractEntityType(raw));
    if (fromFmcsa) return fromFmcsa;
  }

  return formatEntityTypeLabel(deriveEntityTypeFromServices(input.services));
}

/** Canonical entity type for DB storage after an FMCSA refresh. */
export function resolveEntityTypeFromFmcsaRaw(
  raw: Record<string, unknown> | null | undefined
): string {
  if (!raw || typeof raw !== 'object') return ENTITY_TYPE_NOT_AVAILABLE;
  const resolved = formatEntityTypeLabel(extractEntityType(raw));
  return resolved ?? ENTITY_TYPE_NOT_AVAILABLE;
}

/** Profile display label — includes Not Available when FMCSA context exists. */
export function resolveEntityTypeLabelForProfile(
  input: EntityTypeResolutionInput,
  hasFmcsaContext: boolean
): string | null {
  const resolved = resolveEntityTypeForDisplay(input);
  if (resolved) return resolved;
  return hasFmcsaContext ? ENTITY_TYPE_NOT_AVAILABLE : null;
}