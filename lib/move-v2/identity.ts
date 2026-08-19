import type { ProviderContact, ProviderServiceArea } from './domain';

export function selectDisplayName(legalName: string, dbaName?: string | null): string {
  const dba = dbaName?.trim();
  return dba || legalName.trim();
}

export interface PlaceMatchSignals {
  name: number;
  address: number;
  phone: number;
  domain: number;
}

export function evaluateGooglePlaceMatch(signals: PlaceMatchSignals): {
  status: 'AUTO_ACCEPTED' | 'IDENTITY_REVIEW' | 'REJECTED';
  confidence: number;
} {
  const confidence = Number((signals.name * 0.25 + signals.address * 0.3 + signals.phone * 0.25 + signals.domain * 0.2).toFixed(3));
  const corroborating = [signals.address, signals.phone, signals.domain].filter((value) => value >= 0.8).length;
  if (confidence >= 0.85 && corroborating >= 2) return { status: 'AUTO_ACCEPTED', confidence };
  if (signals.name >= 0.8 && corroborating === 0) return { status: 'IDENTITY_REVIEW', confidence };
  if (confidence < 0.35) return { status: 'REJECTED', confidence };
  return { status: 'IDENTITY_REVIEW', confidence };
}

export function mergeObservedContacts(existing: ProviderContact[], observed: ProviderContact[]): ProviderContact[] {
  const merged = new Map(existing.map((contact) => [`${contact.contactType}:${contact.normalizedValue}`, contact]));
  for (const contact of observed) merged.set(`${contact.contactType}:${contact.normalizedValue}`, contact);
  return [...merged.values()];
}

export function providerPublishedServiceArea(area: Omit<ProviderServiceArea, 'authorityScope'>): ProviderServiceArea {
  return { ...area, authorityScope: 'PROVIDER_PUBLISHED_SERVICE_AREA' };
}

export function applyPublishedClaimsToClassification<T>(classification: T, _claims: unknown): T {
  void _claims;
  return classification;
}
