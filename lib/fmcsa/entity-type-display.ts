import { extractEntityType } from '@/lib/fmcsa/carrier-fields';
import type { ServiceType } from '@/types';

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