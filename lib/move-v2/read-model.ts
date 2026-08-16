import type { ProviderClassification, ProviderContact, ProviderIdentity, ProviderServiceArea, Provenance } from './domain';

export interface ProviderProfileV2 {
  identity: ProviderIdentity;
  moveEligibility: { classification: ProviderClassification; local: boolean; intrastate: boolean; interstate: boolean; broker: boolean; needsReview: boolean };
  authority: { federalHhg: 'VALID' | 'NOT_AUTHORIZED' | 'INACTIVE' | 'UNKNOWN'; broker: 'VALID' | 'NOT_AUTHORIZED' | 'INACTIVE' | 'UNKNOWN'; state: Array<{ state: string; status: string; lastCheckedAt: string }> };
  contact: { primary?: ProviderContact; additional: ProviderContact[] };
  business: { googlePlaceId?: string; locations: Array<{ locationId: string; label: string }>; publishedServiceAreas: ProviderServiceArea[]; publishedServices: string[] };
  evidence: Array<{ label: string; value: string; provenance: Provenance }>;
  freshness: Partial<Record<'FMCSA' | 'STATE_REGULATOR' | 'GOOGLE_PLACES' | 'OFFICIAL_WEBSITE', string>>;
}
