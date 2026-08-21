export const GOOGLE_PLACES_REQUESTS = 0 as const;
export const TASK_011D2A = '011D.2A' as const;

export type CanonicalizationOutcome =
  | 'CREATED'
  | 'MATCHED_DURING_CANONICALIZATION'
  | 'MOVED_TO_REVIEW'
  | 'SKIPPED_NOT_READY'
  | 'FAILED'
  | 'ALREADY_CANONICALIZED';

export type CanonicalizationManifestRow = {
  stagingId: string;
  companyId: string | null;
  stateCode: 'FL' | 'WA';
  authorityNumber: string;
  legalName: string;
  dba: string | null;
  slug: string | null;
  usdot: string | null;
  phone: string | null;
  email: string | null;
  physicalAddress: string | null;
  city: string | null;
  postalCode: string | null;
  homeCountyFips: string | null;
  homeCountyName: string | null;
  identityMethod: string | null;
  outcome: CanonicalizationOutcome;
  publicationState: 'INGESTED' | null;
  indexable: false;
  source: string;
  sourceUrl: string | null;
  rawSourceKey: string;
  notes: string[];
};

export type StagingCandidateRow = {
  stagingId: string;
  stateCode: 'FL' | 'WA';
  authorityNumber: string;
  authorityType: string;
  roleClass: string;
  statusNormalized: string;
  legalName: string;
  dba: string | null;
  usdot: string | null;
  phone: string | null;
  email: string | null;
  physicalAddress: string | null;
  city: string | null;
  postalCode: string | null;
  disposition: string;
  reviewReason: string | null;
  source: string;
  sourceUrl: string | null;
  rawSourceKey: string;
  regulator: string;
  issueDate: string | null;
  expirationDate: string | null;
  evidenceHash: string | null;
  retrievedAt: string;
};
