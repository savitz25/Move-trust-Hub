import { formatEntityTypeLabel } from '../fmcsa/entity-type-display';
import type { HomeEntityClass } from './home-types';

/**
 * Map a stored directory entity_type through existing display normalization.
 * Does not invent class logic and does not collapse Carrier/Broker into one role.
 */
export function classifyDirectoryEntityClass(
  raw: string | null | undefined
): HomeEntityClass {
  const label = formatEntityTypeLabel(raw);
  if (label === 'Carrier') return 'Carrier';
  if (label === 'Broker') return 'Broker';
  if (label === 'Carrier/Broker') return 'Carrier/Broker';
  return 'Unknown';
}

/** Stored values that formatEntityTypeLabel resolves to Carrier. */
export const DIRECTORY_CARRIER_ENTITY_TYPES = ['CARRIER', 'Carrier', 'carrier'] as const;

/** Stored values that formatEntityTypeLabel resolves to Broker. */
export const DIRECTORY_BROKER_ENTITY_TYPES = ['BROKER', 'Broker', 'broker'] as const;

/** Stored values that formatEntityTypeLabel resolves to Carrier/Broker. */
export const DIRECTORY_DUAL_ENTITY_TYPES = [
  'CARRIER/BROKER',
  'BROKER/CARRIER',
  'Carrier/Broker',
  'Broker/Carrier',
  'Carrier / Broker',
] as const;
