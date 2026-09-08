import { SPECIALIST_SEARCH_ANALYTICS_EVENTS } from './contract';

export type SpecialistSearchEvent = (typeof SPECIALIST_SEARCH_ANALYTICS_EVENTS)[number];
export type SpecialistSearchDimensions = {
  hub: 'move';
  intent: string;
  role?: string;
  state?: string;
  hasIdentifier: boolean;
  identifierType?: 'usdot' | 'mc';
  authorityFilter?: string;
  hasStateRegistrationFilter: boolean;
  hasEvidenceFilter: boolean;
  coverageState?: string;
  resultCountBucket?: '0' | '1' | '2-10' | '11-20' | '21+';
};

export function searchResultCountBucket(count: number): SpecialistSearchDimensions['resultCountBucket'] {
  if (count <= 0) return '0';
  if (count === 1) return '1';
  if (count <= 10) return '2-10';
  if (count <= 20) return '11-20';
  return '21+';
}
