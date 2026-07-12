import type { Company, ServiceType } from '@/types';

const ENTITY_TYPE_SERVICE_MAP: Record<string, ServiceType> = {
  BROKER: 'Broker',
  CARRIER: 'Carrier',
  'CARRIER/BROKER': 'Carrier / Broker',
  'BROKER/CARRIER': 'Carrier / Broker',
};

export function normalizeFmcsaEntityType(
  entityType: string | null | undefined
): string | null {
  if (!entityType) return null;
  const trimmed = entityType.trim();
  if (!trimmed) return null;
  if (trimmed.toLowerCase() === 'not available') return null;
  return trimmed;
}

function entityTypeKey(entityType: string): string {
  return entityType.toUpperCase().replace(/\s+/g, '');
}

/** Map FMCSA entity_type to directory service tags for filtering and display. */
export function deriveServicesFromEntityType(
  entityType: string | null | undefined
): ServiceType[] {
  const normalized = normalizeFmcsaEntityType(entityType);
  if (!normalized) return [];

  const key = entityTypeKey(normalized);
  const mapped = ENTITY_TYPE_SERVICE_MAP[key];
  return mapped ? [mapped] : [];
}

/** Merge stored services with FMCSA entity-type tags (deduped). */
export function mergeServicesWithEntityType(
  services: ServiceType[],
  entityType: string | null | undefined
): ServiceType[] {
  const derived = deriveServicesFromEntityType(entityType);
  if (!derived.length) return services;
  return [...new Set([...services, ...derived])];
}

/** Whether a company matches a single Services Offered filter chip. */
export function companyMatchesServiceFilter(
  company: Pick<Company, 'services' | 'entityType'>,
  service: ServiceType
): boolean {
  const services = Array.isArray(company.services) ? company.services : [];
  if (services.includes(service)) return true;

  const entityType = normalizeFmcsaEntityType(company.entityType);
  if (!entityType) return false;

  const key = entityTypeKey(entityType);
  const mapped = ENTITY_TYPE_SERVICE_MAP[key];
  return mapped === service;
}